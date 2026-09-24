import json
import re

with open('public/remediation_payload.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

keywords = [
    'pilot study', 'validity', 'reliability', 'research ethics', 
    'thematic analysis', 'grounded theory', 'systematic review', 
    'meta-analysis', 'mixed methods', 'case study', 'phenomenology',
    'purposive sampling', 'snowball sampling'
]

results = []
for article in data:
    # strip HTML
    text = re.sub(r'<[^>]+>', ' ', article['content']).lower()
    found = []
    for k in keywords:
        # Check if keyword is in text but NOT in an a tag
        # Actually just finding it in the stripped text is enough to know it's discussed.
        if re.search(r'\b' + k + r'\b', text):
            found.append(k)
    if found:
        results.append({"slug": article['slug'], "mentions": found})

for r in results:
    print(f"{r['slug']}: {', '.join(r['mentions'])}")
