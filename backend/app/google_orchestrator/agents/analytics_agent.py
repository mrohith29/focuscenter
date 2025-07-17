# Analytics Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase
from google.adk import Agent
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# CRUD functions

def get_analytics(user_id: str = None):
    params = {"user_id": user_id} if user_id else {}
    resp = requests.get(f"{API_BASE_URL}/analytics", params=params)
    resp.raise_for_status()
    return resp.json()

def create_analytics(analytics: dict):
    resp = requests.post(f"{API_BASE_URL}/analytics", json=analytics)
    resp.raise_for_status()
    return resp.json()

def update_analytics(analytics_id: str, updates: dict):
    resp = requests.put(f"{API_BASE_URL}/analytics/{analytics_id}", json=updates)
    resp.raise_for_status()
    return resp.json()

def delete_analytics(analytics_id: str):
    resp = requests.delete(f"{API_BASE_URL}/analytics/{analytics_id}")
    resp.raise_for_status()
    return resp.json()

API_BASE_URL = "http://localhost:8000"

MODEL = "gemini-2.0-flash"

analytics_agent = Agent(
    model=MODEL,
    name="analytics_agent",
    instruction="You are an agent for analytics CRUD operations.",
    tools=[get_analytics, create_analytics, update_analytics, delete_analytics],
) 