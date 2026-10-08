import os
import urllib.request
import json

url = f"{os.environ.get('NEXT_PUBLIC_SUPABASE_URL')}/rest/v1/blog_posts?select=slug,featured_image"
req = urllib.request.Request(url)
req.add_header("apikey", os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY"))
req.add_header("Authorization", f"Bearer {os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')}")

response = urllib.request.urlopen(req)
data = json.loads(response.read())

for post in data:
    if 'beginners' in post['slug'] or 'questions' in post['slug']:
        print(f"SLUG: {post['slug']}")
        print(f"IMAGE: {post['featured_image']}")
        if post['featured_image']:
            try:
                img_url = f"https://ceewriting.com{post['featured_image']}"
                code = urllib.request.urlopen(img_url).getcode()
                print(f"STATUS: {code}")
            except Exception as e:
                print(f"ERROR: {e}")
        print("---")
