from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.api import users_router, goals_router

app = FastAPI()

# Allow CORS from both http and https for localhost:5173 (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(goals_router)

@app.get("/")
def root():
    return {"message": "FocusCenter API is running"}

# Only run the server if this script is executed directly
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)