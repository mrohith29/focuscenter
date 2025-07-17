# Task Breakdown Agent Stub

import os
import google.generativeai as genai
from app.database import get_supabase
from google.adk import Agent
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

API_BASE_URL = "http://localhost:8000"

def get_tasks(goal_id: str = None, user_id: str = None):
    params = {}
    if goal_id:
        params["goal_id"] = goal_id
    if user_id:
        params["user_id"] = user_id
    resp = requests.get(f"{API_BASE_URL}/tasks", params=params)
    resp.raise_for_status()
    return resp.json()

def create_task(task: dict):
    resp = requests.post(f"{API_BASE_URL}/tasks", json=task)
    resp.raise_for_status()
    return resp.json()

def update_task(task_id: str, updates: dict):
    resp = requests.put(f"{API_BASE_URL}/tasks/{task_id}", json=updates)
    resp.raise_for_status()
    return resp.json()

def delete_task(task_id: str):
    resp = requests.delete(f"{API_BASE_URL}/tasks/{task_id}")
    resp.raise_for_status()
    return resp.json()

MODEL = "gemini-2.0-flash"

task_breakdown_agent = Agent(
    model=MODEL,
    name="task_breakdown_agent",
    instruction="You are an agent for task CRUD operations.",
    tools=[get_tasks, create_task, update_task, delete_task],
) 