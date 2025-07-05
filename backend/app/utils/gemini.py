import os
import google.generativeai as genai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_motivational_quote():
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-flask-2.0")
    prompt = "Give me a single, direct, short motivational quote for productivity."
    response = model.generate_content(prompt)
    return response.text.strip() if hasattr(response, "text") else str(response) 