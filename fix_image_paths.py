"""Fix the local image paths in seed_data.json to use web-accessible /images/blog/ paths."""
import json, re

with open('seed_data.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for a in articles:
    img = a['image']
    # If it's a local Windows path, convert to public URL
    if img.startswith('C:\\'):
        # Use the slug to derive the filename
        # The images were copied as /images/blog/{slug}.jpg
        a['image'] = f"/images/blog/{a['slug']}.jpg"
    # Fix Unsplash duplicates pointing to generic image
    generic = 'photo-1551288049-bebda4e38f71'
    if generic in img:
        # Apply per-slug Unsplash replacements
        replacements = {
            'analyse-survey-data-python-likert-scale': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80',
            'pearson-correlation-spss': 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1280&q=80',
            'r-vs-spss-dissertation': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1280&q=80',
            'quantitative-vs-qualitative-research': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1280&q=80',
            'cochran-sample-size-formula': 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1280&q=80',
            'choose-statistical-test': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1280&q=80',
        }
        if a['slug'] in replacements:
            a['image'] = replacements[a['slug']]

print("Final image map:")
for a in articles:
    print(f"  {a['slug']}: {a['image'][:80]}")

with open('seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f"\nDone. {len(articles)} articles saved to seed_data.json")
