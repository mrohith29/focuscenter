import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.goal_understanding_agent_prompt import GOAL_UNDERSTANDING_AGENT_PROMPT

def handle_goal_understanding_action(input_dict):
    query = input_dict.get("query")
    if not query:
        return f"Error: Missing required input key 'query'. Got: {input_dict}"
    return f"Goal understanding for '{query}'"

def get_goal_understanding_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="GoalUnderstandingTool",
            func=handle_goal_understanding_action,
            description="Understands user goals"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": GOAL_UNDERSTANDING_AGENT_PROMPT}
    )
    return agent 