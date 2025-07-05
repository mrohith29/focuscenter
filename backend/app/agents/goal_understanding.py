# Goal Understanding Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

class GoalUnderstandingAgent:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-flash-2.0")

    def clarify_goal(self, user_input: str, user_id: str = None) -> dict:
        context = f"User's stated goal: {user_input}."
        if user_id:
            supabase = get_supabase()
            past_goals = supabase.table("goals").select("title").eq("user_id", user_id).execute().data
            if past_goals:
                context += f" Past goals: {[g['title'] for g in past_goals]}"
        prompt = (
            "You are a productivity assistant. "
            "Clarify the following user goal, making it specific, actionable, and measurable: "
            f"{context}"
        )
        response = self.model.generate_content(prompt)
        clarified = response.text.strip() if hasattr(response, "text") else str(response)
        return {"clarified_goal": clarified} 