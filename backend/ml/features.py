import numpy as np

def cosine(a, b, eps=1e-9):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + eps))

def build_feature_row(dish_vec, cuisine_vec, swap_effect, spice_pen=0.0, diet_pen=0.0):
    dish_vec = dish_vec.astype(np.float32)
    cuisine_vec = cuisine_vec.astype(np.float32)
    swap_effect = swap_effect.astype(np.float32)

    sim_before = cosine(dish_vec, cuisine_vec)
    sim_after  = cosine(dish_vec + swap_effect, cuisine_vec)
    gain = sim_after - sim_before

    delta = cuisine_vec - dish_vec
    delta_norm = float(np.linalg.norm(delta))
    swap_norm  = float(np.linalg.norm(swap_effect))

    # how aligned swap is with needed delta direction
    alignment = float(
        np.dot(swap_effect, delta) /
        (np.linalg.norm(swap_effect) * np.linalg.norm(delta) + 1e-9)
    )

    return np.array([
        sim_before,
        sim_after,
        gain,
        delta_norm,
        swap_norm,
        alignment,
        spice_pen,
        diet_pen
    ], dtype=np.float32)
