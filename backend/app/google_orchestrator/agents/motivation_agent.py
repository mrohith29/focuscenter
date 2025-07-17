# Motivation Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase
from google.adk import Agent
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

API_BASE_URL = "http://localhost:8000"

def get_motivations(user_id: str = None):
    params = {"user_id": user_id} if user_id else {}
    resp = requests.get(f"{API_BASE_URL}/motivations", params=params)
    resp.raise_for_status()
    return resp.json()

def create_motivation(motivation: dict):
    resp = requests.post(f"{API_BASE_URL}/motivations", json=motivation)
    resp.raise_for_status()
    return resp.json()

def update_motivation(motivation_id: str, updates: dict):
    resp = requests.put(f"{API_BASE_URL}/motivations/{motivation_id}", json=updates)
    resp.raise_for_status()
    return resp.json()

def delete_motivation(motivation_id: str):
    resp = requests.delete(f"{API_BASE_URL}/motivations/{motivation_id}")
    resp.raise_for_status()
    return resp.json()

MODEL = "gemini-2.0-flash"

motivation_agent = Agent(
    model=MODEL,
    name="motivation_agent",
    instruction="You are an agent for motivation CRUD operations.",
    tools=[get_motivations, create_motivation, update_motivation, delete_motivation],
) 