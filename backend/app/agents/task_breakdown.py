# Task Breakdown Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

class TaskBreakdownAgent:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-flash-2.0")

    def breakdown_goal(self, goal: str, user_id: str = None) -> list:
        context = f"Goal: {goal}."
        if user_id:
            supabase = get_supabase()
            completed = supabase.table("tasks").select("id").eq("user_id", user_id).eq("status", "accomplished").execute().data
            context += f" User has completed {len(completed)} tasks in the past."
        prompt = (
            "Break down the following goal into a list of actionable, step-by-step tasks, considering the user's context: "
            f"{context}"
        )
        response = self.model.generate_content(prompt)
        # Expecting a numbered or bulleted list in response.text
        tasks = response.text.strip().split('\n') if hasattr(response, "text") else [str(response)]
        return [task for task in tasks if task.strip()] 