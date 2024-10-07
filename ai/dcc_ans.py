from fastapi import FastAPI
import requests
import uvicorn

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

app = FastAPI()

@app.post("/check-code")
def check_code(question: str, code: str):
    prompt = (
        f"Here is the question: {question}. "
        f"Here is the code: {code}. "
        f"Please check if the code is correct. "
        f"If the code is correct, reply only with 'Correct'. "
        f"If there are errors in the code, correct only the code and respond with only the corrected code. "
        f"Do not repeat any lines of code. "
        f"Respond concisely without any extra explanation or repeated lines."
    )
    
    parameters = {
        "max_new_tokens": 50,  # Limit response size
        "temperature": 0.1,  # Reduce randomness
        "top_p": 0.9,  # Focus on probable responses
        "num_return_sequences": 1
    }
    
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})
    if response.status_code == 200:
        output = response.json()
        return output
    else:
        return f"Failed to check code: {response.text}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)