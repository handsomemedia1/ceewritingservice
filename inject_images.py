import json
import re

def inject_images(content, slug, alt_data):
    # Image 1 (Hero) goes at the top
    img1 = f'\n<img src="/images/blog/scholarships/{slug}-hero.svg" alt="{alt_data["hero"]}" class="w-full h-auto rounded-xl my-8 shadow-md" />\n'
    
    # Image 2 (Timeline)
    img2 = f'\n<img src="/images/blog/scholarships/{slug}-timeline.svg" alt="{alt_data["timeline"]}" class="w-full h-auto rounded-xl my-8 shadow-md" />\n'
    
    # Image 3 (Checklist)
    img3 = f'\n<img src="/images/blog/scholarships/{slug}-checklist.svg" alt="{alt_data["checklist"]}" class="w-full h-auto rounded-xl my-8 shadow-md" />\n'
    
    # Insert Hero at the beginning
    content = img1 + content
    
    # Regex to find headings
    h2_pattern = re.compile(r'(<h2[^>]*>.*?</h2>)', re.IGNORECASE | re.DOTALL)
    
    parts = h2_pattern.split(content)
    
    injected_timeline = False
    injected_checklist = False
    
    new_content = ""
    for i, part in enumerate(parts):
        lower_part = part.lower()
        if not injected_timeline and i % 2 != 0 and any(k in lower_part for k in ['deadline', 'timeline', 'funding', 'eligib', 'date']):
            new_content += img2 + part
            injected_timeline = True
        elif not injected_checklist and i % 2 != 0 and any(k in lower_part for k in ['apply', 'checklist', 'process', 'step', 'how to']):
            new_content += img3 + part
            injected_checklist = True
        else:
            new_content += part
            
    # Fallbacks if keywords not found
    if not injected_timeline:
        new_content += img2
    if not injected_checklist:
        new_content += img3

    return new_content

with open('scholarships_seed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for article in data:
    slug = article['slug']
    title = article['title']
    alt_data = {
        "hero": f"{title} 2027 visual guide and overview",
        "timeline": f"{title} 2027 application timeline and key deadlines",
        "checklist": f"{title} 2027 application checklist and preparation steps"
    }
    
    article['content'] = inject_images(article['content'], slug, alt_data)

with open('scholarships_seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Injected images successfully.")
