import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.notes_handler_agent_prompt import NOTES_HANDLER_AGENT_PROMPT
import requests

API_BASE_URL = "http://127.0.0.1:8000/notes"

def handle_note_action(input_dict):
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
                return f"Note created: {response.json()}"
            else:
                return f"Failed to create note: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # READ (get all)
    elif action == "read":
        try:
            response = requests.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                return f"Note(s) retrieved: {response.json()}"
            else:
                return f"Failed to retrieve notes: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    else:
        return f"Error: Unknown or unsupported action '{action}'. Supported actions: create, read."

def get_notes_handler_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="NotesHandlerTool",
            func=handle_note_action,
            description="Handles notes CRUD (create, read)"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": NOTES_HANDLER_AGENT_PROMPT}
    )
    return agent 