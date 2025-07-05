import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("REACT_APP_SUPABASE_URL")
SUPABASE_KEY = os.getenv("REACT_APP_SUPABASE_ANON_KEY")

def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY) 