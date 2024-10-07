from bs4 import BeautifulSoup
import requests
import re

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.lower()

url = "https://en.wikipedia.org/wiki/India"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
text_content = soup.get_text()

clean_content = clean_text(text_content)
print(clean_content)