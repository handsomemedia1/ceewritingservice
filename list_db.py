import json

def list_articles():
    with open('db_articles.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
    for article in db:
        print(f"{article.get('id', '')[:10]:<10} | {article.get('slug', '')[:30]:<30} | {article.get('title', '')}")
    print(f"\nTotal: {len(db)}")

list_articles()
