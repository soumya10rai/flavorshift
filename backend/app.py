from foodoscope_client import fetch_chicken_biryani
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
    recipe_title: str
    ingredients: str | None = None  # Optional for other recipes
    calories: float | None = None  # Optional for other recipes
    protein: float | None = None  # Optional for other recipes
    fat: float | None = None  # Optional for other recipes
    carbs: float | None = None  # Optional for other recipes
    prep_time: int | None = None  # Optional for other recipes
    cook_time: int | None = None  # Optional for other recipes
    target_cuisine: str  # Required
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

    # Only require recipe_title and target_cuisine
    if req.recipe_title.strip().lower() == "chicken biryani":
        try:
            recipe_data = fetch_chicken_biryani()
            ingredients = recipe_data["ingredients"]
            calories = recipe_data["calories"]
            protein = recipe_data["protein"]
            fat = recipe_data["fat"]
            carbs = recipe_data["carbs"]
            prep_time = recipe_data["prep_time"]
            cook_time = recipe_data["cook_time"]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        raise HTTPException(status_code=400, detail="Only 'Chicken Biryani' demo is supported.")

    # -------------------------------
    # 1️⃣ Vectorize ingredients
    # -------------------------------
    ingredient_vec = vectorizer.transform([ingredients]).toarray().flatten()

    # -------------------------------
    # 2️⃣ Scale nutrition
    # -------------------------------
    nutrition = np.array([[calories, protein, fat, carbs, prep_time, cook_time]])
    nutrition_vec = scaler.transform(nutrition).flatten()

    # -------------------------------
    # 3️⃣ Combine dish vector
    # -------------------------------
    dish_vector = np.concatenate([ingredient_vec, nutrition_vec])


    # 4. Force source_cuisine for demo
    source_cuisine = "Indian Subcontinent"


    # 5. Validate target cuisine
    if req.target_cuisine not in cuisine_signatures:
        raise HTTPException(
            status_code=400,
            detail=f"Target cuisine '{req.target_cuisine}' not supported"
        )
    # 6. Flavor transformation
    transformed_vector = (
        dish_vector
        - cuisine_signatures[source_cuisine]
        + cuisine_signatures[req.target_cuisine]
    )
    # 7. Explain transformation
    add, remove = explain_transformation(
        dish_vector,
        transformed_vector,
        vectorizer
    )
    # 8. Final response
    return TransformResponse(
        source_cuisine=source_cuisine,
        target_cuisine=req.target_cuisine,
        add_ingredients=add,
        reduce_ingredients=remove,
        explanation=(
            f"The recipe '{req.recipe_title}' was classified as {source_cuisine}. "
            f"To transform it toward {req.target_cuisine}, the model enhances "
            f"ingredients commonly found in {req.target_cuisine} cuisine and "
            f"reduces those less characteristic, resulting in a culturally aligned dish."
        )
    )
