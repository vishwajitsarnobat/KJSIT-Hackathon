import requests
import json

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

def check_code(question: str, code: str):
    """
    Function to check if the given code for a question is correct.
    """
    prompt = (
        f"Here is the question: {question}. "
        f"Here is the code: {code}. "
        f"Please check if the code is correct. "
        f"If the code is correct, reply only with 'Correct'. "
        f"If there are errors in the code, correct only the code and respond with only the corrected code. "
        f"Do not repeat any lines of code. "
        f"Respond concisely without any extra explanation or repeated lines."
    )

    # Parameters for the Hugging Face API
    parameters = {
        "max_new_tokens": 50,  # Limit response size
        "temperature": 0.1,    # Reduce randomness
        "top_p": 0.9,          # Focus on probable responses
        "num_return_sequences": 1
    }

    # Making the request to Hugging Face API
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})

    if response.status_code == 200:
        output = response.json()

        # Extract the result cleanly
        generated_text = output[0]['generated_text']

        # Print the result in a clean format
        print("Code Check Result:\n")
        print(generated_text.strip())  # Remove unnecessary spaces/newlines
        print("\nEnd of Code Check")
    else:
        print(f"Failed to check code: {response.text}")

# Hardcoded example question and code for testing
question = "Write a Python function to find the sum of two numbers."
code = """
def sum_two_numbers(a, b):
    return a + b
"""

# Call the function to check the code and print the result
check_code(question, code)
