from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

from ml.ranker import SwapRanker

app = FastAPI()

# CORS (so frontend on localhost:5173 can call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ranker = SwapRanker()

@app.get("/health")
def health():
    return {"status": "ok"}


class Candidate(BaseModel):
    name: str
    swap_effect: List[float]


class TransformRequest(BaseModel):
    dish_vector: List[float]
    cuisine_vector: List[float]
    candidates: List[Candidate]
    prefs: Optional[dict] = None


@app.post("/transform")
def transform(req: TransformRequest):
    dish_vec = np.array(req.dish_vector, dtype=np.float32)
    cuisine_vec = np.array(req.cuisine_vector, dtype=np.float32)

    candidates = [
        {"name": c.name, "swap_effect": np.array(c.swap_effect, dtype=np.float32)}
        for c in req.candidates
    ]

    ranked = ranker.rank(dish_vec, cuisine_vec, candidates, prefs=req.prefs)

    # return top 5 and ensure everything is JSON-serializable
    top5 = ranked[:5]
    safe_top5 = []
    for item in top5:
        safe_top5.append({
            "name": item.get("name"),
            "score": float(item.get("score", 0.0)),
            # include effect as list (optional). remove this line if you don't need it.
            "swap_effect": item["swap_effect"].tolist() if "swap_effect" in item else None
        })

    return {"top": safe_top5}
