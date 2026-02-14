import numpy as np
from .features import build_feature_row

def make_proxy_swap_effect(dish_vec, cuisine_vec, strength):
    # proxy "swap" nudging dish toward cuisine (weak supervision)
    return (cuisine_vec - dish_vec) * strength

def build_dataset(dishes, cuisine_vectors, n_per_dish=10, seed=42):
    """
    dishes: list of dicts: {"dish_id": str/int, "cuisine_label": str, "vector": np.array(D)}
    cuisine_vectors: dict cuisine_label -> np.array(D)
    Returns: X (num_samples, num_features), y (num_samples,)
    """
    rng = np.random.default_rng(seed)
    cuisines = list(cuisine_vectors.keys())

    X, y = [], []

    for d in dishes:
        dish_vec = d["vector"].astype(np.float32)
        true_cuisine = d["cuisine_label"]
        true_cuisine_vec = cuisine_vectors[true_cuisine].astype(np.float32)

        # -------- POSITIVES (label=1): correct cuisine, helpful effect --------
        for _ in range(n_per_dish // 2):
            strength = float(rng.uniform(0.10, 0.45))
            swap_effect = make_proxy_swap_effect(dish_vec, true_cuisine_vec, strength)

            # slight noise so model doesn't overfit
            swap_effect += rng.normal(0, 0.03, size=swap_effect.shape).astype(np.float32)

            feats = build_feature_row(dish_vec, true_cuisine_vec, swap_effect)
            X.append(feats); y.append(1)

        # -------- NEGATIVES (label=0): wrong cuisine, random/unhelpful effect --------
        for _ in range(n_per_dish // 2):
            wrong_cuisine = rng.choice([c for c in cuisines if c != true_cuisine])
            wrong_vec = cuisine_vectors[wrong_cuisine].astype(np.float32)

            swap_effect = rng.normal(0, 0.20, size=dish_vec.shape).astype(np.float32)

            feats = build_feature_row(dish_vec, wrong_vec, swap_effect)
            X.append(feats); y.append(0)

    X = np.vstack(X).astype(np.float32)
    y = np.array(y, dtype=np.int32)
    return X, y
