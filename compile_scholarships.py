import json
import os

titles = {
    "1": {"slug": "cambridge-phd-applications-2027", "title": "University of Cambridge PhD Applications 2027/28"},
    "2": {"slug": "imperial-college-london-phd-applications-2027", "title": "Imperial College London PhD Applications 2027"},
    "3": {"slug": "carleton-university-phd-applications-2027", "title": "Carleton University PhD Applications 2027"},
    "4": {"slug": "nvidia-graduate-fellowship-2027", "title": "NVIDIA Graduate Fellowship 2027–28"},
    "5": {"slug": "pierre-elliott-trudeau-foundation-doctoral-scholarship-2027", "title": "Pierre Elliott Trudeau Foundation Doctoral Scholarship 2027"},
    "6": {"slug": "commonwealth-phd-scholarship-2027", "title": "Commonwealth PhD Scholarship 2027/28"},
    "7": {"slug": "africalics-phd-visiting-fellowship-2027", "title": "AfricaLics PhD Visiting Fellowship 2027"}
}

articles = []

for i in range(1, 8):
    html_file = f'scratch/scholarship_{i}.html'
    if not os.path.exists(html_file):
        print(f'Missing {html_file}')
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    meta = titles[str(i)]
    slug = meta["slug"]
    
    articles.append({
        "title": meta["title"],
        "slug": slug,
        "content": content,
        "featured_image": f"/images/blog/scholarships/{slug}.svg",
        "tags": ["Scholarships", "PhD", "Study Abroad"],
        "meta_title": f"{meta['title']} | Complete Guide & Deadlines",
        "meta_description": f"Complete, verified guide for the {meta['title']}. Covers exact 2026/2027 deadlines, funding details, eligibility, and how to apply.",
        "published_at": "2026-10-02T00:00:00Z"
    })

with open('scholarships_seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, indent=2, ensure_ascii=False)

print(f'Compiled {len(articles)} scholarship articles into scholarships_seed_data.json')
