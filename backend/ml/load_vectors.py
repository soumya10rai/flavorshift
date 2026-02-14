import numpy as np

def load_vectors_npz(path: str):
    data = np.load(path, allow_pickle=True)

    dish_vectors = data["dish_vectors"].astype(np.float32)          # (N, D)
    dish_labels  = data["dish_cuisine_labels"].astype(str)          # (N,)
    cuisine_vecs = data["cuisine_vectors"].astype(np.float32)       # (C, D)
    cuisine_names = data["cuisine_names"].astype(str)               # (C,)

    cuisine_vectors = {cuisine_names[i]: cuisine_vecs[i] for i in range(len(cuisine_names))}
    dishes = [
        {"dish_id": i, "cuisine_label": dish_labels[i], "vector": dish_vectors[i]}
        for i in range(len(dish_vectors))
        if dish_labels[i] in cuisine_vectors
    ]
    return dishes, cuisine_vectors
