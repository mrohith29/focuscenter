import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

from langchain.agents import initialize_agent, Tool, AgentType
from backend.app.utils.gemini import GeminiLLM
from .analytics_agent import get_analytics_agent
from .distraction_tracking_agent import get_distraction_tracking_agent
from .goal_understanding_agent import get_goal_understanding_agent
from .tasks_handler_agent import get_tasks_handler_agent
from .task_breakdown_agent import get_task_breakdown_agent
from .motivation_agent import get_motivation_agent
from .greeting_agent import greeting_tool
from .prompts.orchestrator_prompt import ORCHESTRATOR_PROMPT

def get_orchestration_agent():
    llm = GeminiLLM()
    tools = [
        Tool(
            name="AnalyticsAgent",
            func=lambda x: get_analytics_agent().run(x),
            description="Handles analytics"
        ),
        Tool(
            name="DistractionTrackingAgent",
            func=lambda x: get_distraction_tracking_agent().run(x),
            description="Handles distraction tracking"
        ),
        Tool(
            name="GoalUnderstandingAgent",
            func=lambda x: get_goal_understanding_agent().run(x),
            description="Handles goal understanding"
        ),
        Tool(
            name="TasksHandlerAgent",
            func=lambda x: get_tasks_handler_agent().run(x),
            description="Handles tasks CRUD (create, read, update, delete)"
        ),
        Tool(
            name="TaskBreakdownAgent",
            func=lambda x: get_task_breakdown_agent().run(x),
            description="Breaks down complex tasks into subtasks"
        ),
        Tool(
            name="MotivationAgent",
            func=lambda x: get_motivation_agent().run(x),
            description="Handles motivation"
        ),
        greeting_tool  # Add greeting tool last as fallback
    ]
    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        handle_parsing_errors=True,
        agent_kwargs={"prefix": ORCHESTRATOR_PROMPT}
    )
    return agent 