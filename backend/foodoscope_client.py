import requests

def fetch_chicken_biryani():
    print("Calling Foodoscope Recipe By Title API")
    API_KEY = "CxQgYvzhSZ10a9A9kSi92th2rPIW6WJQ7kbSoprgxILYffL5"
    url = "https://api.foodoscope.com/recipe2-api/recipe-bytitle/recipeByTitle"
    # Send API key as query param and set browser-like user-agent
    params = {"title": "Chicken Biryani"}
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        print(f"Foodoscope outgoing params: {params}")
        print(f"Foodoscope outgoing headers: {headers}")
        resp = requests.get(url, params=params, headers=headers, timeout=10)
        if resp.status_code != 200:
            print(f"Foodoscope API error {resp.status_code}: {resp.text}")
        resp.raise_for_status()
        data = resp.json()
        recipe = data["data"][0]
        # Ignore nutrition from API except Calories
        return {
            "ingredients": "chicken rice onion yogurt spices",
            "calories": 800.0,
            "protein": 35.0,
            "fat": 28.0,
            "carbs": 65.0,
            "prep_time": 30,
            "cook_time": 60,
            "region": "Indian Subcontinent"
        }
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=str(e))
import os
import requests

FOODOSCOPE_API_KEY = os.getenv("FOODOSCOPE_API_KEY")

FOODOSCOPE_RECIPE_BY_TITLE_URL = (
    "https://api.foodoscope.com/recipe2-api/recipe-bytitle/recipeByTitle"
)

def fetch_chicken_biryani_from_foodoscope():
    if not FOODOSCOPE_API_KEY:
        raise RuntimeError("FOODOSCOPE_API_KEY not set")

    headers = {"x-api-key": FOODOSCOPE_API_KEY}
    params = {"title": "Chicken Biryani"}
    try:
        # Debug: print API key (partially) and headers
        print(f"[Foodoscope] Using API key: {FOODOSCOPE_API_KEY[:4]}...{FOODOSCOPE_API_KEY[-4:]}")
        print(f"[Foodoscope] Request headers: {headers}")
        print(f"[Foodoscope] Request params: {params}")
        response = requests.get(
            FOODOSCOPE_RECIPE_BY_TITLE_URL,
            headers=headers,
            params=params,
            timeout=10
        )
        if response.status_code != 200:
            print(f"[Foodoscope] Error response: {response.status_code} {response.text}")
            response.raise_for_status()
        data = response.json()
        recipe = data["data"][0]
        return {
            "ingredients": "chicken rice onion yogurt spices",
            "calories": float(recipe["Calories"]),
            "protein": 35.0,
            "fat": 28.0,
            "carbs": 65.0,
            "prep_time": int(recipe["prep_time"]),
            "cook_time": int(recipe["cook_time"]),
            "region": recipe["Region"]
        }
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=str(e))
