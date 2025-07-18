from fastapi import APIRouter, Request, HTTPException
from ..google_orchestrator import root_agent  # Use relative import

router = APIRouter(prefix="/orchestrator", tags=["orchestrator"])

@router.post("/route")
async def orchestrate(request: Request):
    data = await request.json()
    user_query = data.get("query")
    if not user_query:
        raise HTTPException(status_code=400, detail="Missing 'query' in request body")
    response = root_agent.handle(user_query)
    return response 