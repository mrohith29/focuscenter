from fastapi import APIRouter, HTTPException
from ..database import get_supabase
from typing import List

router = APIRouter(prefix="/goals", tags=["goals"])

@router.get("/", response_model=List[dict])
def get_goals():
    supabase = get_supabase()
    response = supabase.table("goals").select("*").execute()
    return response.data

@router.get("/{goal_id}")
def get_goal(goal_id: str):
    supabase = get_supabase()
    response = supabase.table("goals").select("*").eq("id", goal_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Goal not found")
    return response.data

@router.post("/")
def create_goal(goal: dict):
    supabase = get_supabase()
    response = supabase.table("goals").insert(goal).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.put("/{goal_id}")
def update_goal(goal_id: str, goal: dict):
    supabase = get_supabase()
    response = supabase.table("goals").update(goal).eq("id", goal_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Goal updated"}

@router.delete("/{goal_id}")
def delete_goal(goal_id: str):
    supabase = get_supabase()
    response = supabase.table("goals").delete().eq("id", goal_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Goal deleted"} 