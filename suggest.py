import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import Dict, List
import io

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    return ' '.join([word for word in word_tokenize(str(text).lower()) if word.isalpha() and word not in stop_words])

def recommend_hackathons(keyword_dict: Dict[str, int], hackathon_data: pd.DataFrame) -> List[str]:
    hackathon_data['processed_description'] = hackathon_data['description'].apply(preprocess_text)
    
    keyword_profile = ' '.join([f"{k} " * v for k, v in keyword_dict.items()])
    all_descriptions = hackathon_data['processed_description'].tolist() + [keyword_profile]
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_descriptions)
    
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    
    hackathon_data['similarity'] = cosine_sim.flatten()
    ranked_suggestions = hackathon_data.sort_values(by='similarity', ascending=False)
    
    return ranked_suggestions['title'].tolist()

app = FastAPI()

class KeywordDict(BaseModel):
    keyword_dict: Dict[str, int]

@app.post("/recommend-hackathons")
async def api_recommend_hackathons(keyword_dict: KeywordDict, file: UploadFile = File(...)):
    content = await file.read()
    hackathon_data = pd.read_csv(io.StringIO(content.decode('utf-8')))
    recommendations = recommend_hackathons(keyword_dict.keyword_dict, hackathon_data)
    return recommendations

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)