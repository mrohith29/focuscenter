# Analytics Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

class AnalyticsAgent:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-flash-2.0")

    def analyze_progress(self, user_id: str) -> dict:
        supabase = get_supabase()
        accomplished = supabase.table("tasks").select("id").eq("user_id", user_id).eq("status", "accomplished").execute().data
        pending = supabase.table("tasks").select("id").eq("user_id", user_id).eq("status", "pending").execute().data
        context = f"Accomplished: {len(accomplished)}, Pending: {len(pending)}"
        prompt = (
            "Summarize the user's progress and suggest next steps based on the following analytics log: "
            f"{context}"
        )
        response = self.model.generate_content(prompt)
        summary = response.text.strip() if hasattr(response, "text") else str(response)
        return {"summary": summary} 