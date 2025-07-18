from fastapi import APIRouter, Request, HTTPException
from app.orchestrator.agents.orchestration_agent import get_orchestration_agent

orchestrator_router = APIRouter()

@orchestrator_router.post("/orchestrate")
async def orchestrate(request: Request):
    try:
        data = await request.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid or missing JSON body: {str(e)}")
    query = data.get("query", "")
    if not query:
        raise HTTPException(status_code=400, detail="Missing 'query' in request body")
    try:
        agent = get_orchestration_agent()
        result = agent.run(query)
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}\nTraceback:\n{tb}")
    return {"result": result} 