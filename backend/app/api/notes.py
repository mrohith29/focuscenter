from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from typing import List

router = APIRouter(prefix="/notes", tags=["notes"])

@router.get("/", response_model=List[dict])
def get_notes():
    supabase = get_supabase()
    response = supabase.table("notes").select("*").execute()
    return response.data

@router.get("/{note_id}")
def get_note(note_id: str):
    supabase = get_supabase()
    response = supabase.table("notes").select("*").eq("id", note_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Note not found")
    return response.data

@router.post("/", response_model=dict)
def create_note(note: dict):
    supabase = get_supabase()
    response = supabase.table("notes").insert(note).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.put("/{note_id}")
def update_note(note_id: str, note: dict):
    supabase = get_supabase()
    response = supabase.table("notes").update(note).eq("id", note_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Note updated"}

@router.delete("/{note_id}")
def delete_note(note_id: str):
    supabase = get_supabase()
    response = supabase.table("notes").delete().eq("id", note_id).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return {"message": "Note deleted"} 