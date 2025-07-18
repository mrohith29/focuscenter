import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.task_breakdown_agent_prompt import TASK_BREAKDOWN_AGENT_PROMPT

def handle_task_breakdown_action(input_dict):
    query = input_dict.get("query")
    if not query:
        return f"Error: Missing required input key 'query'. Got: {input_dict}"
    return f"Task breakdown for '{query}'"

def get_task_breakdown_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="TaskBreakdownTool",
            func=handle_task_breakdown_action,
            description="Breaks down complex tasks into subtasks"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": TASK_BREAKDOWN_AGENT_PROMPT}
    )
    return agent 