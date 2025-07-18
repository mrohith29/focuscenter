import os
import google.generativeai as genai
from dotenv import load_dotenv
from langchain.llms.base import LLM
from typing import Optional, List

load_dotenv()
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")  # Or use os.getenv("GOOGLE_API_KEY") if you prefer

class GeminiLLM(LLM):
    model: str = "models/gemini-2.5-pro"
    api_key: Optional[str] = GOOGLE_API_KEY

    @property
    def _llm_type(self) -> str:
        return "gemini"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        genai.configure(api_key=self.api_key)
        model = genai.GenerativeModel(self.model)
        response = model.generate_content(prompt)
        return response.text.strip() if hasattr(response, "text") else str(response)

def get_motivational_quote():
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("models/gemini-2.0-Flash")
    prompt = "Give me a single, direct, short motivational quote for productivity."
    response = model.generate_content(prompt)
    return response.text.strip() if hasattr(response, "text") else str(response) 