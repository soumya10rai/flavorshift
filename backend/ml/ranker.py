import os
import joblib
import numpy as np
from .features import build_feature_row


class SwapRanker:
    def __init__(self, model_path="ml/model/ranker_xgb.joblib"):
        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"Model not found at {model_path}. Train first: python -m ml.train_ranker"
            )
        self.model = joblib.load(model_path)

    def rank(self, dish_vec, cuisine_vec, candidates, prefs=None):
        """
        candidates: list of dicts, each with:
          - "name": str
          - "swap_effect": np.array(D,)
          Optional for penalties:
          - "spice_delta": float (positive means more spice)
          - "diet_violation": bool
        prefs: dict e.g. {"low_spice": True, "veg": True}
        """
        prefs = prefs or {}

        X = []
        for c in candidates:
            eff = c["swap_effect"].astype(np.float32)

            spice_pen = 0.0
            diet_pen = 0.0

            if prefs.get("low_spice") and c.get("spice_delta", 0.0) > 0:
                spice_pen = float(c["spice_delta"])

            if prefs.get("veg") and c.get("diet_violation", False):
                diet_pen = 1.0

            X.append(build_feature_row(dish_vec, cuisine_vec, eff, spice_pen, diet_pen))

        X = np.vstack(X).astype(np.float32)
        probs = self.model.predict_proba(X)[:, 1]

        scored = []
        for i, c in enumerate(candidates):
            scored.append({
                "name": c.get("name"),
                "score": float(probs[i]),
                "swap_effect": c.get("swap_effect"),  # keep as np.array; main.py converts to list
            })

        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored
