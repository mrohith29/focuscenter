from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from typing import List

router = APIRouter(prefix="/notes", tags=["notes"])

@router.get("/", response_model=List[dict])
def get_notes():
    supabase = get_supabase()
    response = supabase.table("notes").select("*").execute()
    return response.data

@router.post("/", response_model=dict)
def create_note(note: dict):
    supabase = get_supabase()
    response = supabase.table("notes").insert(note).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0] 