from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from explanation_engine import build_output

app = FastAPI()

# VERY IMPORTANT: This allows React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/explain")
async def explain(data: dict):
    # This reaches into your explanation_engine.py
    result = build_output(
        data.get("old_ing"), 
        data.get("new_ing"), 
        data.get("user_pref")
    )
    return result
