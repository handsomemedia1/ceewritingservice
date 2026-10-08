import json
import re

with open('seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for a in data:
    images = re.findall(r'<img src="([^"]+)"', a['content'])
    print(f"{a['slug']}: featured={a.get('featured_image')} | internal={images}")
