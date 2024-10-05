from fastapi import FastAPI
import requests
import re

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.lower()

def truncate(text):
    x = 0
    return text[x : x + 4096]

def get_profile_keywords():
    return # dict

def get_course_name():
    return 'react' # string

# profile_keywords = get_profile_keywords()
course_name = get_course_name()

API_TOKEN = "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"

api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"

headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

prompt = (
        f"The user wants to learn {course_name} topic. Frame 5 small thereotical multiple choice questions based on {course_name} to know how much user knows about the topic. Include correct answers for each question at the very end. Just include exactly whatever i have said and not a single extra thing."
)

len_prompt = len(prompt)

parameters = {
    "max_new_tokens": 512,  # Adjust based on how long the expected output is
    "temperature": 0.7,     # Controls randomness, lower is more deterministic
    "top_p": 0.9,           # Use top-p sampling to allow diversity in generation
    "num_return_sequences": 1  # To ensure only one sequence is generated
}

response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})

# Check the response status and output
if response.status_code == 200:
    output = response.json()
    if isinstance(output, list) and "generated_text" in output[0]:
        # Slice the generated text to remove the prompt section
        final_output = output[0]["generated_text"][len_prompt:]

        # Print the modified output
        print(final_output)

        # FastAPI app
        app = FastAPI()

        @app.get("/")
        async def root():
            return {"message": final_output}
