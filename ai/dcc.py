from fastapi import FastAPI
from pydantic import BaseModel
import requests
import uvicorn

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

# Define the Pydantic model for input validation
class ProfileKeywords(BaseModel):
    interactions: dict  # Adjust this according to the actual structure of 'profile_keywords'

app = FastAPI()

@app.post("/generate-problem")
def generate_problem(profile_keywords: ProfileKeywords):
    prompt = (
        f"{profile_keywords.interactions} represents the number of interactions a user has with specific topics. "
        f"Based on the topics with the highest interaction, create a concise problem statement "
        f"(maximum 5 lines) relevant to the user. The problem statement should be no longer than "
        f"1500 characters and should only include the problem itself, nothing else."
    )
    len_prompt = len(prompt)
    parameters = {
        "max_new_tokens": 512,
        "temperature": 0.7,
        "top_p": 0.9,
        "num_return_sequences": 1
    }
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})
    if response.status_code == 200:
        output = response.json()
        return output

    else:
        return f"Failed to generate problem statement: {response.text}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
