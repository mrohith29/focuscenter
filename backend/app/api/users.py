from fastapi import APIRouter, HTTPException
from ..database import get_supabase
from typing import List

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[dict])
def get_users():
    supabase = get_supabase()
    response = supabase.table("users").select("*").execute()
    return response.data

@router.get("/{user_id}")
def get_user(user_id: str):
    supabase = get_supabase()
    response = supabase.table("users").select("*").eq("id", user_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data

@router.post("/")
def create_user(user: dict):
    supabase = get_supabase()
    response = supabase.table("users").insert(user).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.put("/{user_id}")
def update_user(user_id: str, user: dict):
    supabase = get_supabase()
    response = supabase.table("users").update(user).eq("id", user_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "User updated"}

@router.delete("/{user_id}")
def delete_user(user_id: str):
    supabase = get_supabase()
    response = supabase.table("users").delete().eq("id", user_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "User deleted"} 