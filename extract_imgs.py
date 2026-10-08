import json
import re
import os

def extract_and_generate():
    with open('db_articles.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    for article in db:
        if 'BEGINNER' not in article.get('id', '') and 'start-first' not in article.get('slug', '') and 'choose-research' not in article.get('slug', ''):
            pass
            
    # I'll just extract directly using regex from seed_data.json since it's easier
    with open('seed_data.json', 'r', encoding='utf-8') as f:
        seed = json.load(f)
        
    imgs = []
    for s in seed:
        if 'BEGINNER' in s.get('id', ''):
            found = re.findall(r'<img[^>]+src=[\"\'](.*?)[\"\']', s.get('content', ''))
            imgs.extend(found)
            
    print("Found images:", len(imgs))
    for i in imgs:
        print(i)

extract_and_generate()
