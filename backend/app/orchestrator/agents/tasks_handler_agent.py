import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.tasks_handler_agent_prompt import TASKS_HANDLER_AGENT_PROMPT
import requests

API_BASE_URL = "http://127.0.0.1:8000/tasks"

def handle_task_action(input_dict):
    # Accept both direct dict and {'input': dict} (LangChain may wrap input)
    if isinstance(input_dict, dict) and 'input' in input_dict and isinstance(input_dict['input'], dict):
        input_dict = input_dict['input']
    action = input_dict.get("action")
    # CREATE
    if action == "create":
        payload = {k: v for k, v in input_dict.items() if k not in ["action"]}
        try:
            response = requests.post(f"{API_BASE_URL}/", json=payload)
            if response.status_code in (200, 201):
                return f"Task created: {response.json()}"
            else:
                return f"Failed to create task: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # READ (get all or by id)
    elif action == "read":
        task_id = input_dict.get("task_id")
        try:
            if task_id:
                response = requests.get(f"{API_BASE_URL}/{task_id}")
            else:
                response = requests.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                return f"Task(s) retrieved: {response.json()}"
            else:
                return f"Failed to retrieve task(s): {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # UPDATE
    elif action == "update":
        task_id = input_dict.get("task_id")
        if not task_id:
            return "Error: 'task_id' is required for update."
        payload = {k: v for k, v in input_dict.items() if k not in ["action", "task_id"]}
        try:
            response = requests.put(f"{API_BASE_URL}/{task_id}", json=payload)
            if response.status_code == 200:
                return f"Task updated: {response.json()}"
            else:
                return f"Failed to update task: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    # DELETE
    elif action == "delete":
        task_id = input_dict.get("task_id")
        if not task_id:
            return "Error: 'task_id' is required for delete."
        try:
            response = requests.delete(f"{API_BASE_URL}/{task_id}")
            if response.status_code == 200:
                return f"Task deleted: {response.json()}"
            else:
                return f"Failed to delete task: {response.status_code} {response.text}"
        except Exception as e:
            return f"Error calling backend API: {e}"
    else:
        return f"Error: Unknown or unsupported action '{action}'. Supported actions: create, read, update, delete."

def get_tasks_handler_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="TasksHandlerTool",
            func=handle_task_action,
            description="Handles tasks CRUD (create, read, update, delete)"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": TASKS_HANDLER_AGENT_PROMPT}
    )
    return agent 