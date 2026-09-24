import json

with open('public/remediation_payload.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

repairs_made = []
for article in data:
    orig = article['content']
    
    # 1. Fix roadmap slug
    content = orig.replace('/research/path/beginner-research-project', '/research/path/first-project')
    
    # 2. Fix broken services links
    broken_services = [
        '/services/academic-editing', 
        '/services/research-consultation', 
        '/services/dissertation-consulting', 
        '/services/methodology-consulting', 
        '/services/statistical-analysis'
    ]
    for bs in broken_services:
        content = content.replace(bs, '/services')
        
    if orig != content:
        article['content'] = content
        repairs_made.append(article['slug'])

with open('public/remediation_payload.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Made repairs in {len(repairs_made)} articles: {repairs_made}')
