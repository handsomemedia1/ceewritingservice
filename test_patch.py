import urllib.request
import json

req = urllib.request.Request(
    'https://tsyiylazielwbelfzsqo.supabase.co/rest/v1/blog_posts?slug=eq.start-first-research-project-beginners',
    data=json.dumps({"title": "Test"}).encode('utf-8'),
    headers={
        'apikey': 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh',
        'Authorization': 'Bearer sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },
    method='PATCH'
)

try:
    print(urllib.request.urlopen(req).read())
except Exception as e:
    print(e)
