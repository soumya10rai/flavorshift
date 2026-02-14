from fastapi import FastAPI
from api.routes import router

app = FastAPI(
    title="Flavor Transformation Engine",
    version="1.0.0",
    description="Vector-based cuisine transformation system"
)

app.include_router(router)

@app.get("/")
def health():
    return {"status": "ok"}