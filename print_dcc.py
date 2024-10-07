import requests
import json

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

def generate_problem(profile_keywords: dict):
    """
    Function to generate a problem statement based on user interactions.
    """
    prompt = (
        f"{profile_keywords} represents the number of interactions a user has with specific topics. "
        f"Based on the topics with the highest interaction, create a concise problem statement "
        f"(maximum 5 lines) relevant to the user. The problem statement should be no longer than "
        f"1500 characters and should only include the problem itself, nothing else."
    )

    len_prompt = len(prompt)  # For debugging if needed
    print(f"Generated prompt (length: {len_prompt}):\n{prompt}\n")

    # Parameters for the Hugging Face API
    parameters = {
        "max_new_tokens": 512,
        "temperature": 0.7,
        "top_p": 0.9,
        "num_return_sequences": 1
    }

    # Making the request to Hugging Face API
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})

    if response.status_code == 200:
        output = response.json()

        # Extracting the generated text cleanly
        generated_text = output[0]['generated_text']

        # Print formatted output with line breaks
        print("Generated Problem Statement:\n")
        print(generated_text.strip())  # Strip leading/trailing whitespace
        print("\nEnd of Problem Statement")
    else:
        print(f"Failed to generate problem statement: {response.text}")

# Hardcoded profile keywords for testing
profile_keywords = {
    "AI": 10,
    "machine learning": 8,
    "deep learning": 5,
    "blockchain": 3
}

# Call the function to generate and print the problem statement
generate_problem(profile_keywords)
