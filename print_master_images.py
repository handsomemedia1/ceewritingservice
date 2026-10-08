import json
import re

with open('masters_seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for a in data:
    images = re.findall(r'<img src="([^"]+)"', a['content'])
    print(f"{a['slug']}: {images}")
