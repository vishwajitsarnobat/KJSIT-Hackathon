from fastapi import FastAPI, Body
import requests
import re
import uvicorn

# def clean_text(text):
#     text = re.sub(r'\s+', ' ', text)
#     text = re.sub(r'[^\w\s]', '', text)
#     return text.lower()

# def truncate(text):
#     x = 0
#     return text[x : x + 4096]

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

app = FastAPI()

@app.post("/generate")
async def generate_questions(input_text: str = Body(..., embed=True)):
    # Using the input_text directly in the prompt
    prompt = (
        f"The user wants to learn {input_text} topic. Frame 5 small theoretical multiple choice questions based on {input_text} "
        f"to know how much the user knows about the topic. Include correct answers for each question at the very end. "
        f"Just include exactly whatever I have said and not a single extra thing."
    )
    len_prompt = len(prompt)

    parameters = {
        "max_new_tokens": 512,  # Adjust based on how long the expected output is
        "temperature": 0.7,     # Controls randomness, lower is more deterministic
        "top_p": 0.9,           # Use top-p sampling to allow diversity in generation
        "num_return_sequences": 1  # To ensure only one sequence is generated
    }

    # Sending request to the HuggingFace model API
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})

    if response.status_code == 200:
        output = response.json()
        return {"result": output}
    else:
        return {"error": f"Failed to generate questions: {response.text}"}
        

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)
