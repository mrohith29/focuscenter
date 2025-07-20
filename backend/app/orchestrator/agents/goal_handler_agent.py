import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.goal_handler_agent_prompt import GOAL_HANDLER_AGENT_PROMPT
import requests

API_BASE_URL = "http://127.0.0.1:8000/goals"

def handle_goal_action(input_dict):
    # Accept both direct dict and {'input': dict}
    if isinstance(input_dict, dict) and 'input' in input_dict and isinstance(input_dict['input'], dict):
        input_dict = input_dict['input']
    action = input_dict.get("action")
    # CREATE
    if action == "create":
        payload = {k: v for k, v in input_dict.items() if k not in ["action"]}
        try:
            response = requests.post(f"{API_BASE_URL}/", json=payload)
            if response.status_code in (200, 201):
                return f"Goal created: {response.json()}"
            else:
                return f"Failed to create goal: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # READ (get all or by id)
    elif action == "read":
        goal_id = input_dict.get("goal_id")
        try:
            if goal_id:
                response = requests.get(f"{API_BASE_URL}/{goal_id}")
            else:
                response = requests.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                return f"Goal(s) retrieved: {response.json()}"
            else:
                return f"Failed to retrieve goal(s): {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # UPDATE
    elif action == "update":
        goal_id = input_dict.get("goal_id")
        if not goal_id:
            return "Error: 'goal_id' is required for update."
        payload = {k: v for k, v in input_dict.items() if k not in ["action", "goal_id"]}
        try:
            response = requests.put(f"{API_BASE_URL}/{goal_id}", json=payload)
            if response.status_code == 200:
                return f"Goal updated: {response.json()}"
            else:
                return f"Failed to update goal: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # DELETE
    elif action == "delete":
        goal_id = input_dict.get("goal_id")
        if not goal_id:
            return "Error: 'goal_id' is required for delete."
        try:
            response = requests.delete(f"{API_BASE_URL}/{goal_id}")
            if response.status_code == 200:
                return f"Goal deleted: {response.json()}"
            else:
                return f"Failed to delete goal: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    else:
        return f"Error: Unknown or unsupported action '{action}'. Supported actions: create, read, update, delete."

def get_goal_handler_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="GoalHandlerTool",
            func=handle_goal_action,
            description="Handles goals CRUD (create, read, update, delete)"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": GOAL_HANDLER_AGENT_PROMPT}
    )
    return agent 