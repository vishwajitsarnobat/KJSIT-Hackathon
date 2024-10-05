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
        f"{question} is the question and {code} is the code, check only for errors in the code and specify if any, "
        f"else just say the code is correct. Keep your answer below 15000 letters. Just answer whatever I have specified to, nothing else."
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
        if isinstance(output, list) and len(output) > 0 and "generated_text" in output[0]:
            final_output = output[0]["generated_text"][len_prompt:].strip()
            return final_output
        else:
            return "Failed to check code: Unexpected response format"
    else:
        return f"Failed to check code: {response.text}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)