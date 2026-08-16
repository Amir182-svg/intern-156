from google import genai
import config

print("API key loaded:", bool(config.GEMINI_API_KEY))
print("Model:", config.LLM_MODEL)

client = genai.Client(
    api_key=config.GEMINI_API_KEY
)

response = client.models.generate_content(
    model=config.LLM_MODEL,
    contents="Say hello in one short sentence."
)

print("\nGemini response:")
print(response.text)