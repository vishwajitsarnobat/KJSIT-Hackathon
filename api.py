import requests
from bs4 import BeautifulSoup
import re

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.lower()

def truncate(text):
    x = 0
    return text[x : x + 4096]

url = "https://www.w3schools.com/REACT/DEFAULT.ASP"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
text_content = soup.get_text()

clean_content = clean_text(text_content)

API_TOKEN = "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"

api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"

headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

scraped_content = truncate(clean_content)

prompt = (
    f"Based on the given information, generate five multiple choice questions with four options and provide their correct answers separately.\n"
    f"Passage:\n{scraped_content}\n\n"
    f"MCQ 1:\n"
)

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
        print(output[0]["generated_text"])
    else:
        print("Unexpected response format:", output)
else:
    print(f"Error: {response.status_code}, {response.text}")
