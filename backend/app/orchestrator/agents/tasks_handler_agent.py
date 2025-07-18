import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.tasks_handler_agent_prompt import TASKS_HANDLER_AGENT_PROMPT

def handle_task_action(input_dict):
    # Accept both direct dict and {'input': dict} (LangChain may wrap input)
    if isinstance(input_dict, dict) and 'input' in input_dict and isinstance(input_dict['input'], dict):
        input_dict = input_dict['input']
    action = input_dict.get("action")
    task_name = input_dict.get("task_name")
    due_date = input_dict.get("due_date")
    user_name = input_dict.get("user_name")
    missing = [k for k in ["action", "task_name", "due_date", "user_name"] if not input_dict.get(k)]
    if missing:
        return f"Error: Missing required input keys: {missing}. Got: {input_dict}"
    return f"Handled {action} for task '{task_name}' due '{due_date}' for user '{user_name}'"

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