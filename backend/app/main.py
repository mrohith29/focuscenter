from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.api import users_router, goals_router, tasks_router, motivational_quotes_router, motivations_router, analytics_router, notes_router
from app.database import get_supabase, SUPABASE_URL, SUPABASE_KEY
from jose import jwt
import os

app = FastAPI()

# JWT verification dependency
SUPABASE_JWT_SECRET = SUPABASE_KEY  # Use the Supabase service key as the JWT secret

def get_current_user(request: Request):
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid auth header")
    token = auth.split(" ")[1]
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# Allow CORS from both http and https for localhost:5173 (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(goals_router)
app.include_router(tasks_router)
app.include_router(motivational_quotes_router)
app.include_router(motivations_router)
app.include_router(analytics_router)
app.include_router(notes_router)

@app.get("/")
def root():
    return {"message": "FocusCenter API is running"}

@app.get("/credentials")
def credentials():
    return {
        "supabaseUrl": SUPABASE_URL,
        "supabaseKey": SUPABASE_KEY
    }

# Example protected endpoint
@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": "You are authenticated", "user": user}

# Only run the server if this script is executed directly
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True) # python -m app.main