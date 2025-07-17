# Goal Understanding Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase
from google.adk import Agent
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

API_BASE_URL = "http://localhost:8000"

def get_goals(user_id: str = None):
    params = {"user_id": user_id} if user_id else {}
    resp = requests.get(f"{API_BASE_URL}/goals", params=params)
    resp.raise_for_status()
    return resp.json()

def create_goal(goal: dict):
    resp = requests.post(f"{API_BASE_URL}/goals", json=goal)
    resp.raise_for_status()
    return resp.json()

def update_goal(goal_id: str, updates: dict):
    resp = requests.put(f"{API_BASE_URL}/goals/{goal_id}", json=updates)
    resp.raise_for_status()
    return resp.json()

def delete_goal(goal_id: str):
    resp = requests.delete(f"{API_BASE_URL}/goals/{goal_id}")
    resp.raise_for_status()
    return resp.json()

MODEL = "gemini-2.0-flash"

goal_understanding_agent = Agent(
    model=MODEL,
    name="goal_understanding_agent",
    instruction="You are an agent for goal CRUD operations.",
    tools=[get_goals, create_goal, update_goal, delete_goal],
) 