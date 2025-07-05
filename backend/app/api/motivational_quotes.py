from fastapi import APIRouter, HTTPException
from app.database import get_supabase
from app.utils.gemini import get_motivational_quote
from typing import List
from datetime import date

router = APIRouter(prefix="/motivational-quotes", tags=["motivational_quotes"])

@router.get("/", response_model=List[dict])
def get_quotes():
    supabase = get_supabase()
    response = supabase.table("motivational_quotes").select("*").execute()
    return response.data

@router.post("/", response_model=dict)
def create_quote(quote: dict):
    supabase = get_supabase()
    response = supabase.table("motivational_quotes").insert(quote).execute()
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    return response.data[0]

@router.get("/llm/{user_id}", response_model=dict)
def get_daily_quote(user_id: str):
    supabase = get_supabase()
    today = str(date.today())
    # Check if a quote already exists for today
    response = supabase.table("motivations").select("*").eq("user_id", user_id).eq("provided_at", today).single().execute()
    if response.data:
        # Fetch the quote from motivational_quotes
        quote_id = response.data["quote_id"]
        quote_resp = supabase.table("motivational_quotes").select("*").eq("id", quote_id).single().execute()
        return quote_resp.data
    # Otherwise, get a new quote from Gemini, store it, and log in motivations
    quote_text = get_motivational_quote()
    quote_insert = supabase.table("motivational_quotes").insert({"text": quote_text}).execute()
    quote_id = quote_insert.data[0]["id"]
    motivation_insert = supabase.table("motivations").insert({
        "user_id": user_id,
        "quote_id": quote_id,
        "provided_at": today
    }).execute()
    return {"text": quote_text} 