# from google.adk.agents import LlmAgent
# from google.adk.tools.agent_tool import AgentTool

# from .agents.analytics_agent import analytics_agent
# from .agents.motivation_agent import motivation_agent
# from .agents.task_breakdown_agent import task_breakdown_agent
# from .agents.goal_understanding_agent import goal_understanding_agent
# from .agents.distraction_tracking_agent import distraction_tracking_agent

# MODEL = "gemini-2.0-flash"

# ORCHESTRATOR_PROMPT = (
#     "You are a helpful orchestrator agent that coordinates productivity, motivation, and goal management tasks. "
#     "Route user queries to the appropriate specialized agent/tool and return the best possible response."
# )

# orchestration_agent = LlmAgent(
#     name="orchestration_agent",
#     model=MODEL,
#     description=(
#         "Coordinates analytics, motivation, task breakdown, goal understanding, and distraction tracking agents "
#         "to help users manage productivity and focus."
#     ),
#     instruction=ORCHESTRATOR_PROMPT,
#     tools=[
#         AgentTool(agent=analytics_agent),
#         AgentTool(agent=motivation_agent),
#         AgentTool(agent=task_breakdown_agent),
#         AgentTool(agent=goal_understanding_agent),
#         AgentTool(agent=distraction_tracking_agent),
#     ],
# )

# root_agent = orchestration_agent


from fastapi import APIRouter, Request, HTTPException
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

from .analytics_agent import analytics_agent
from .motivation_agent import motivation_agent
from .task_breakdown_agent import task_breakdown_agent
from .goal_understanding_agent import goal_understanding_agent
from .distraction_tracking_agent import distraction_tracking_agent

MODEL = "gemini-2.0-flash"

ORCHESTRATOR_PROMPT = (
    "You are a helpful orchestrator agent that coordinates productivity, motivation, and goal management tasks. "
    "Route user queries to the appropriate specialized agent/tool and return the best possible response."
)

orchestration_agent = LlmAgent(
    name="orchestration_agent",
    model=MODEL,
    description=(
        "Coordinates analytics, motivation, task breakdown, goal understanding, and distraction tracking agents "
        "to help users manage productivity and focus."
    ),
    instruction=ORCHESTRATOR_PROMPT,
    tools=[
        AgentTool(agent=analytics_agent),
        AgentTool(agent=motivation_agent),
        AgentTool(agent=task_breakdown_agent),
        AgentTool(agent=goal_understanding_agent),
        AgentTool(agent=distraction_tracking_agent),
    ],
)

root_agent = orchestration_agent

# FastAPI router for orchestrator
router = APIRouter(prefix="/orchestrator", tags=["orchestrator"])

@router.post("/route")
async def orchestrate(request: Request):
    data = await request.json()
    user_query = data.get("query")
    if not user_query:
        raise HTTPException(status_code=400, detail="Missing 'query' in request body")
    response = root_agent.handle(user_query)
    return response