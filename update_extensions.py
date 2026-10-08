import json

with open('scholarships_seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for article in data:
    # Update featured_image from .svg to .jpg
    if article.get('featured_image'):
        article['featured_image'] = article['featured_image'].replace('.svg', '.jpg')
    
    # Update content images
    content = article['content']
    content = content.replace('-hero.svg', '-hero.jpg')
    content = content.replace('-timeline.svg', '-timeline.png')
    content = content.replace('-checklist.svg', '-checklist.png')
    
    article['content'] = content

with open('scholarships_seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Updated image extensions to .jpg and .png in seed data.")
