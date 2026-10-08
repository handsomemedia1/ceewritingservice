import urllib.request, json, os
from dotenv import load_dotenv

load_dotenv('.env.local')
url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
key = os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')

req = urllib.request.Request(f'{url}/rest/v1/blog_posts?select=slug,title,content,meta_title,meta_description', headers={'apikey': key, 'Authorization': f'Bearer {key}'})
res = urllib.request.urlopen(req).read()
data = json.loads(res)

with open('all_posts.json', 'w', encoding='utf-8') as f:
    json.dump(data, f)

for post in data:
    title = post['title'].lower()
    if any(k in title for k in ['cambridge', 'imperial', 'carleton', 'nvidia', 'trudeau', 'commonwealth', 'africalics']):
        print(f"FOUND: {post['slug']}: {post['title']}")
