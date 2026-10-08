import json
with open('db_articles.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for p in data:
    if '2027' in p['slug']:
        print(f"{p['slug']} => {p.get('featured_image')}")
