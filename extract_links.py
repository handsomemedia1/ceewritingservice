import json
import re

with open('public/remediation_payload.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

links = []
for article in data:
    found = re.findall(r'href=[\"\'](/?(?:blog|research|services|resources)[^\"\']*)[\"\']', article['content'])
    for link in found:
        links.append({'slug': article['slug'], 'link': link})

# Print unique links for validation
unique_links = sorted(list(set(l['link'] for l in links)))
print("Unique Internal Links found in articles:")
for l in unique_links:
    sources = [x['slug'] for x in links if x['link'] == l]
    print(f"- {l} (Used in: {len(sources)} articles)")
