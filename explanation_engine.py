flavor_map = {
    "cumin": ["smoky", "earthy", "warm"],
    "oregano": ["herbal", "fresh"],
    "garlic": ["pungent", "savory"],
    "ginger": ["spicy", "citrus"],
    "pepper": ["spicy"],
    "basil": ["herbal", "sweet"]
}
def get_flavor_difference(old_ing, new_ing):
    old_features = set(flavor_map.get(old_ing, []))
    new_features = set(flavor_map.get(new_ing, []))

    gained = new_features - old_features
    lost = old_features - new_features

    return gained, lost
def generate_explanation(old_ing, new_ing):
    gained, lost = get_flavor_difference(old_ing, new_ing)

    gained_text = ", ".join(gained) if gained else "no new flavors"
    lost_text = ", ".join(lost) if lost else "no major flavors"

    sentence = f"Replacing {old_ing} with {new_ing} increases {gained_text} and reduces {lost_text}."
    return sentence
def apply_personalization(ingredient, user_pref):
    if user_pref["spice_tolerance"] == "low" and "spicy" in flavor_map.get(ingredient, []):
        return False
    if user_pref["diet"] == "vegan" and ingredient in ["chicken", "beef"]:
        return False
    return True
import random

def build_output(old_ing, new_ing, user_pref):
    explanation = generate_explanation(old_ing, new_ing)
    gained, lost = get_flavor_difference(old_ing, new_ing)

    output = {
        "swap": f"{old_ing} → {new_ing}",
        "impact": f"+{', '.join(gained)} -{', '.join(lost)}",
        "confidence": round(random.uniform(0.7, 0.95), 2),
        "explanation": explanation,
        "personalized_for": user_pref
    }

    return output
user_pref = {
    "spice_tolerance": "low",
    "diet": "vegan",
    "low_sodium": True
}

print(build_output("cumin", "oregano", user_pref))
