import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .prompts.analytics_agent_prompt import ANALYTICS_AGENT_PROMPT

def handle_analytics_action(input_dict):
    query = input_dict.get("query")
    if not query:
        return f"Error: Missing required input key 'query'. Got: {input_dict}"
    return f"Analytics result for '{query}'"

def get_analytics_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="AnalyticsTool",
            func=handle_analytics_action,
            description="Performs analytics"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": ANALYTICS_AGENT_PROMPT}
    )
    return agent 