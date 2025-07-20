import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.motivation_agent_prompt import MOTIVATION_AGENT_PROMPT

def handle_motivation_action(input_dict):
    # Accept both direct dict and {'input': dict}
    if isinstance(input_dict, dict):
        if set(input_dict.keys()) == {"input"} and isinstance(input_dict["input"], dict):
            input_dict = input_dict["input"]
        elif "input" in input_dict and isinstance(input_dict["input"], dict):
            merged = input_dict["input"].copy()
            merged.update({k: v for k, v in input_dict.items() if k != "input"})
            input_dict = merged
    query = input_dict.get("query")
    if not query:
        return f"Error: Missing required input key 'query'. Got: {input_dict}"
    return f"Motivation for '{query}'"

def get_motivation_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="MotivationTool",
            func=handle_motivation_action,
            description="Provides motivation"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": MOTIVATION_AGENT_PROMPT}
    )
    return agent 