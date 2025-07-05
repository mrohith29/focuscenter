# Distraction Tracking Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

class DistractionTrackingAgent:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-flash-2.0")

    def track_distractions(self, user_id: str) -> dict:
        supabase = get_supabase()
        distractions = supabase.table("analytics").select("*").eq("user_id", user_id).eq("metric_type", "distraction").execute().data
        context = f"Distraction log: {distractions}"
        prompt = (
            "Analyze the following distraction log and suggest ways to reduce distractions: "
            f"{context}"
        )
        response = self.model.generate_content(prompt)
        suggestions = response.text.strip() if hasattr(response, "text") else str(response)
        return {"suggestions": suggestions} 