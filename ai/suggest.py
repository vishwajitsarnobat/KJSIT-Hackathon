import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import json
import os

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

stop_words = set(stopwords.words('english'))

def preprocess_text(text: str) -> str:
    tokens = word_tokenize(str(text).lower())
    return ' '.join(word for word in tokens if word.isalpha() and word not in stop_words)

def recommend_hackathons(keyword_dict: dict, hackathon_data: pd.DataFrame) -> pd.DataFrame:
    hackathon_data['processed_description'] = hackathon_data['details'].apply(preprocess_text)

    # Print the hard-coded keyword dictionary
    print("Keyword Dictionary:", keyword_dict)

    # Continue with the TF-IDF and cosine similarity calculation
    keyword_profile = ' '.join([f"{k} " * v for k, v in keyword_dict.items()])
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(hackathon_data['processed_description'].tolist() + [keyword_profile])

    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    hackathon_data['similarity'] = cosine_sim.flatten()
    ranked_suggestions = hackathon_data.sort_values(by='similarity', ascending=False)

    return ranked_suggestions.head(5)

# Use a relative path for the CSV file
STATIC_CSV_PATH = os.path.join(os.path.dirname('/home/vishwajitsarnobat/workspace/kjhackathon/'), "data.csv")

# Load the data
try:
    hackathon_data = pd.read_csv(STATIC_CSV_PATH, skipinitialspace=True)
except pd.errors.EmptyDataError:
    print("Error: CSV file is empty or invalid")
except FileNotFoundError:
    print("Error: CSV file not found")

# Hard-coded keyword dictionary for testing
keyword_dict = {
    "AI": 3,
    "machine": 2,
    "learning": 2,
    "blockchain": 1
}

# Ensure hackathon_data has necessary columns
if 'details' in hackathon_data.columns and 'names' in hackathon_data.columns:
    # Get the top 5 recommendations
    top_5_recommendations = recommend_hackathons(keyword_dict, hackathon_data)

    # Convert DataFrame to dictionary and print
    result = top_5_recommendations[['names', 'details', 'similarity']].to_dict('records')
    print("Top 5 Hackathon Recommendations:", json.dumps(result, indent=2))
else:
    print("Error: CSV file must contain 'details' and 'names' columns")
