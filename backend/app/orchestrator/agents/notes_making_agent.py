import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .goal_handler_agent import get_goal_handler_agent
from .tasks_handler_agent import get_tasks_handler_agent
from .notes_handler_agent import get_notes_handler_agent
from .prompts.notes_making_agent_prompt import NOTES_MAKING_AGENT_PROMPT

# Tool to summarize or generate notes using Gemini

def summarize_or_generate_note(input_dict):
    llm = GeminiLLM()
    note_content = input_dict.get("note_content")
    if not note_content:
        return "Error: 'note_content' is required."
    prompt = f"Summarize or organize the following note content for clarity and structure:\n{note_content}"
    return llm._call(prompt)

def get_notes_making_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="GoalHandlerTool",
            func=lambda x: get_goal_handler_agent().run(x),
            description="Handles goals CRUD (create, read, update, delete)"
        ),
        Tool(
            name="TasksHandlerTool",
            func=lambda x: get_tasks_handler_agent().run(x),
            description="Handles tasks CRUD (create, read, update, delete)"
        ),
        Tool(
            name="NotesHandlerTool",
            func=lambda x: get_notes_handler_agent().run(x),
            description="Handles notes CRUD (create, read)"
        ),
        Tool(
            name="SummarizeOrGenerateNote",
            func=summarize_or_generate_note,
            description="Summarizes or organizes handwritten or unstructured notes"
        )
    ]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, handle_parsing_errors=True, agent_kwargs={"prefix": NOTES_MAKING_AGENT_PROMPT}
    )
    return agent 