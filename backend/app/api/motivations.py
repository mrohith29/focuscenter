from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from typing import List

router = APIRouter(prefix="/motivations", tags=["motivations"])

@router.get("/", response_model=List[dict])
def get_motivations():
    supabase = get_supabase()
    response = supabase.table("motivations").select("*").execute()
    return response.data

@router.post("/", response_model=dict)
def create_motivation(motivation: dict):
    supabase = get_supabase()
    response = supabase.table("motivations").insert(motivation).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0] 