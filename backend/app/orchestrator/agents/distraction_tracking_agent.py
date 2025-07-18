import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.distraction_tracking_agent_prompt import DISTRACTION_TRACKING_AGENT_PROMPT

def handle_distraction_tracking_action(input_dict):
    query = input_dict.get("query")
    if not query:
        return f"Error: Missing required input key 'query'. Got: {input_dict}"
    return f"Distraction tracking for '{query}'"

def get_distraction_tracking_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="DistractionTrackingTool",
            func=handle_distraction_tracking_action,
            description="Tracks distractions"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": DISTRACTION_TRACKING_AGENT_PROMPT}
    )
    return agent 