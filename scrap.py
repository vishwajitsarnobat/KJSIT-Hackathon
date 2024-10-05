from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/India"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
text_content = soup.get_text()

print(text_content)