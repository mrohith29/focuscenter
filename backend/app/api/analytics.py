from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from typing import List

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/", response_model=List[dict])
def get_analytics():
    supabase = get_supabase()
    response = supabase.table("analytics").select("*").execute()
    return response.data

@router.post("/", response_model=dict)
def log_analytics(analytics: dict):
    supabase = get_supabase()
    response = supabase.table("analytics").insert(analytics).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.get("/user/{user_id}/summary", response_model=dict)
def get_user_task_summary(user_id: str):
    supabase = get_supabase()
    accomplished = supabase.table("tasks").select("*").eq("user_id", user_id).eq("status", "accomplished").execute()
    pending = supabase.table("tasks").select("*").eq("user_id", user_id).eq("status", "pending").execute()
    return {
        "accomplished": len(accomplished.data),
        "pending": len(pending.data)
    } 