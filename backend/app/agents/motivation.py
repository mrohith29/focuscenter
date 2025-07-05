# Motivation Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

class MotivationAgent:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-flash-2.0")

    def motivate_user(self, user_id: str) -> str:
        supabase = get_supabase()
        completed = supabase.table("tasks").select("id").eq("user_id", user_id).eq("status", "accomplished").execute().data
        context = f"User has completed {len(completed)} tasks. Needs motivation to continue."
        prompt = (
            "Generate a personalized motivational message for the following user context: "
            f"{context}"
        )
        response = self.model.generate_content(prompt)
        return response.text.strip() if hasattr(response, "text") else str(response) 