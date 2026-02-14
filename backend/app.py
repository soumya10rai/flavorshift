from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

# -------------------------------
# Load ML artifacts
# -------------------------------
BASE_DIR = os.path.dirname(__file__)
ML_DIR = os.path.join(BASE_DIR, "ml")

model = joblib.load(os.path.join(ML_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(ML_DIR, "vectorizer.pkl"))
scaler = joblib.load(os.path.join(ML_DIR, "scaler.pkl"))
cuisine_signatures = joblib.load(os.path.join(ML_DIR, "cuisine_signatures.pkl"))

# -------------------------------
# App setup
# -------------------------------
app = FastAPI(title="FlavorShift Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Schemas
# -------------------------------
class TransformRequest(BaseModel):
    ingredients: str
    calories: float
    protein: float
    fat: float
    carbs: float
    prep_time: int
    cook_time: int
    target_cuisine: str


class TransformResponse(BaseModel):
    source_cuisine: str
    target_cuisine: str
    add_ingredients: list[str]
    reduce_ingredients: list[str]
    explanation: str


# -------------------------------
# Helper: Explain transformation
# -------------------------------
def explain_transformation(original_vec, transformed_vec, vectorizer, top_k=5):
    diff = transformed_vec - original_vec

    feature_names = vectorizer.get_feature_names_out()
    ingredient_diff = diff[: len(feature_names)]

    add_idx = np.argsort(ingredient_diff)[-top_k:][::-1]
    remove_idx = np.argsort(ingredient_diff)[:top_k]

    add = [feature_names[i] for i in add_idx if ingredient_diff[i] > 0]
    remove = [feature_names[i] for i in remove_idx if ingredient_diff[i] < 0]

    return add, remove


# -------------------------------
# Main endpoint
# -------------------------------
@app.post("/transform", response_model=TransformResponse)
def transform(req: TransformRequest):

    # 1️⃣ Vectorize ingredients
    try:
        ingredient_vec = vectorizer.transform([req.ingredients]).toarray().flatten()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ingredient vectorization failed: {e}")

    # 2️⃣ Scale nutrition
    nutrition = np.array([[req.calories, req.protein, req.fat, req.carbs, req.prep_time, req.cook_time]])
    try:
        nutrition_vec = scaler.transform(nutrition).flatten()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Nutrition scaling failed: {e}")

    # 3️⃣ Combine into dish vector
    dish_vector = np.concatenate([ingredient_vec, nutrition_vec])

    # 4️⃣ Predict source cuisine
    try:
        source_cuisine = model.predict([dish_vector])[0]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Cuisine prediction failed: {e}")

    # 5️⃣ Validate target cuisine
    if req.target_cuisine not in cuisine_signatures:
        raise HTTPException(
            status_code=400,
            detail=f"Target cuisine '{req.target_cuisine}' not supported by model"
        )

    # 6️⃣ Transform flavor vector
    source_sig = cuisine_signatures[source_cuisine]
    target_sig = cuisine_signatures[req.target_cuisine]
    transformed_vector = dish_vector - source_sig + target_sig

    # 7️⃣ Explain changes
    add, remove = explain_transformation(
        dish_vector,
        transformed_vector,
        vectorizer
    )

    # 8️⃣ Return human-readable response
    return TransformResponse(
        source_cuisine=source_cuisine,
        target_cuisine=req.target_cuisine,
        add_ingredients=add,
        reduce_ingredients=remove,
        explanation=(
            f"This dish was identified as {source_cuisine}. "
            f"To shift it toward {req.target_cuisine}, the model enhances "
            f"ingredients typical to {req.target_cuisine} cuisine and reduces "
            f"those less commonly used."
        )
    )
