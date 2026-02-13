import os
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from xgboost import XGBClassifier

from .data_build import build_dataset


def load_real_data(npz_path="ml/vectors_dump.npz"):
    """
    STRICT Foodscope mode.
    Supports dish_cuisine_labels as integer indices (0..C-1) that map into cuisine_names.
    Expected keys:
      - dish_vectors (N, D) float32
      - dish_cuisine_labels (N,) ints OR strings
      - cuisine_vectors (C, D) float32
      - cuisine_names (C,) strings
    """
    if not os.path.exists(npz_path):
        raise FileNotFoundError(f"Missing {npz_path}. Put vectors_dump.npz into backend/ml/")

    data = np.load(npz_path, allow_pickle=True)

    required = {"dish_vectors", "dish_cuisine_labels", "cuisine_vectors", "cuisine_names"}
    missing = required - set(data.files)
    if missing:
        raise KeyError(f"{npz_path} missing keys: {missing}. Found: {data.files}")

    dish_vectors = data["dish_vectors"].astype(np.float32)          # (N, D)
    dish_labels_raw = data["dish_cuisine_labels"]                   # (N,)
    cuisine_vectors_arr = data["cuisine_vectors"].astype(np.float32) # (C, D)
    cuisine_names = data["cuisine_names"].astype(str)               # (C,)

    # cuisine dict: name -> vector
    cuisine_vectors = {cuisine_names[i]: cuisine_vectors_arr[i] for i in range(len(cuisine_names))}

    # label mapping:
    # if dish labels are integers (0..C-1), map them to cuisine_names
    if np.issubdtype(dish_labels_raw.dtype, np.integer):
        label_to_name = {i: cuisine_names[i] for i in range(len(cuisine_names))}
        dish_labels = np.array([label_to_name[int(x)] for x in dish_labels_raw], dtype=object)
    else:
        # if already strings, normalize
        dish_labels = np.array([str(x).strip() for x in dish_labels_raw], dtype=object)

    dishes = [
        {"dish_id": i, "cuisine_label": str(dish_labels[i]), "vector": dish_vectors[i]}
        for i in range(len(dish_vectors))
        if str(dish_labels[i]) in cuisine_vectors
    ]

    if len(dishes) < 20:
        raise ValueError(
            f"Too few valid dishes after filtering: {len(dishes)}. "
            f"Check dish labels vs cuisine_names.\n"
            f"Example cuisine_names: {cuisine_names.tolist()}"
        )

    return dishes, cuisine_vectors


def train_and_save(npz_path="ml/vectors_dump.npz", out_path="ml/model/ranker_xgb.joblib"):
    dishes, cuisine_vectors = load_real_data(npz_path)
    print(f"Training on REAL Foodscope vectors: dishes={len(dishes)}, cuisines={len(cuisine_vectors)}")

    X, y = build_dataset(dishes, cuisine_vectors, n_per_dish=10)

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = XGBClassifier(
        n_estimators=450,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        reg_lambda=1.0,
        min_child_weight=1,
        objective="binary:logistic",
        eval_metric="logloss",
        n_jobs=-1,
        random_state=42,
    )

    model.fit(X_train, y_train)

    p = model.predict_proba(X_val)[:, 1]
    auc = roc_auc_score(y_val, p)
    print(f"VAL AUC: {auc:.3f}")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    joblib.dump(model, out_path)
    print(f"Saved model -> {out_path}")


if __name__ == "__main__":
    train_and_save()
