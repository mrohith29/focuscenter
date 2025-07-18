import google.generativeai as genai
import os

api_key = "AIzaSyD94XxXtuF6e1pcYb-94C1BHSWU4733CxE"  # Or use os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# List available models
models = genai.list_models()
print("Available models:")
for model in models:
    print(model.name)

# Use a valid model name from the above list
model_name = "models/gemini-2.5-pro"  # Replace with your available model
model = genai.GenerativeModel(model_name)
prompt = "Say hello in one sentence."

response = model.generate_content(prompt)
print(response.text.strip() if hasattr(response, "text") else str(response))