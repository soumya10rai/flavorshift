from fastapi import APIRouter

router = APIRouter()

@router.post("/vectorize")
def vectorize():
    return {"message": "vectorize stub"}

@router.post("/transform")
def transform():
    return {"message": "transform stub"}

@router.get("/similar/{dish_id}")
def similar(dish_id: str):
    return {"dish_id": dish_id, "similar": []}

@router.post("/explain")
def explain():
    return {"message": "explain stub"}