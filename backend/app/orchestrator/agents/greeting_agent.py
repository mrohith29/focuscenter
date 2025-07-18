import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import Tool
from backend.app.utils.gemini import GeminiLLM

class GreetingAgent:
    def __init__(self):
        self.llm = GeminiLLM()

    def run(self, query: str) -> str:
        # Simple greeting detection
        greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"]
        if any(greet in query.lower() for greet in greetings):
            return "Hello! How can I help you today?"
        # Otherwise, use LLM for small talk or fallback
        prompt = (
            "You are a friendly assistant. If the user greets you or makes small talk, respond appropriately. "
            "If the user asks a general question not related to productivity, goals, motivation, or analytics, respond as a helpful conversational agent."
            f"\nUser: {query}\nAssistant:"
        )
        return self.llm._call(prompt)

def get_greeting_agent():
    return GreetingAgent()

greeting_tool = Tool(
    name="GreetingAgent",
    func=lambda x: get_greeting_agent().run(x),
    description="Handles greetings and general conversation when no other agent is appropriate."
) 