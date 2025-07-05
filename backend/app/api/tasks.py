from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from typing import List

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[dict])
def get_tasks():
    supabase = get_supabase()
    response = supabase.table("tasks").select("*").execute()
    return response.data

@router.get("/{task_id}")
def get_task(task_id: str):
    supabase = get_supabase()
    response = supabase.table("tasks").select("*").eq("id", task_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found")
    return response.data

@router.post("/")
def create_task(task: dict):
    supabase = get_supabase()
    response = supabase.table("tasks").insert(task).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.put("/{task_id}")
def update_task(task_id: str, task: dict):
    supabase = get_supabase()
    response = supabase.table("tasks").update(task).eq("id", task_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Task updated"}

@router.delete("/{task_id}")
def delete_task(task_id: str):
    supabase = get_supabase()
    response = supabase.table("tasks").delete().eq("id", task_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Task deleted"}

@router.get("/goals/{goal_id}/tasks/{parent_task_id}/children", response_model=List[dict])
def get_child_tasks(goal_id: str, parent_task_id: str):
    supabase = get_supabase()
    response = supabase.table("tasks").select("*") \
        .eq("goal_id", goal_id) \
        .eq("parent_task_id", parent_task_id) \
        .execute()
    return response.data 