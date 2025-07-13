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

# You can keep update/delete endpoints for user profile management if needed, but remove any password or auth logic. 