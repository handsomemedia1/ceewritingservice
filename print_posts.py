import json
with open('all_posts.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for post in data:
    print(f"{post['slug']}: {post['title']}")
