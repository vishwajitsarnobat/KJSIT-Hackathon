import requests
import json

API_TOKEN = "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"
api_url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct"
headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

def generate_questions(input_text: str):
    """
    Function to generate theoretical multiple-choice questions based on a given topic.
    """
    # Using the input_text directly in the prompt
    prompt = (
        f"The user wants to learn {input_text} topic. Frame 5 small theoretical multiple choice questions based on {input_text} "
        f"to know how much the user knows about the topic. Include correct answers for each question at the very end. "
        f"Just include exactly whatever I have said and not a single extra thing."
    )
    
    # Parameters for the Hugging Face API
    parameters = {
        "max_new_tokens": 512,  # Adjust based on expected output length
        "temperature": 0.7,     # Controls randomness, lower is more deterministic
        "top_p": 0.9,           # Use top-p sampling for diversity
        "num_return_sequences": 1  # Ensure only one sequence is generated
    }

    # Sending request to the Hugging Face API
    response = requests.post(api_url, headers=headers, json={"inputs": prompt, "parameters": parameters})

    if response.status_code == 200:
        output = response.json()

        # Extracting the generated text cleanly
        generated_text = output[0]['generated_text']

        # Print formatted output with line breaks
        print("Generated Questions:\n")
        print(generated_text.strip())  # Remove unnecessary whitespace
        print("\nEnd of Generated Questions")
    else:
        print(f"Failed to generate questions: {response.text}")

# Hardcoded topic for testing
input_text = "machine learning"

# Call the function to generate and print the questions
generate_questions(input_text)
