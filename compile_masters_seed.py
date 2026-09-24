import json
import os
import re

articles_meta = [
    {
        "id": "MASTERS-01",
        "title": "How to Choose a Master's Research Topic That Is Actually Researchable",
        "slug": "choose-masters-research-topic",
        "meta_title": "How to Choose a Master's Research Topic That Is Feasible",
        "meta_description": "Learn how to choose a Master's thesis topic that is not just interesting, but actually researchable, defensible, and feasible within your timeframe.",
        "focus_keyword": "choose a Master's research topic",
        "topic_pillar": "Topic Selection",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-02",
        "title": "How to Identify a Research Gap for a Master's Thesis",
        "slug": "identify-research-gap-masters-thesis",
        "meta_title": "How to Identify a Research Gap for a Master's Thesis",
        "meta_description": "Discover what a genuine research gap means at the Master's level and how to identify methodological, theoretical, and empirical gaps.",
        "focus_keyword": "identify a research gap",
        "topic_pillar": "Research Problem",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-03",
        "title": "How to Conduct a Critical Literature Review for a Master's Thesis",
        "slug": "critical-literature-review-masters-thesis",
        "meta_title": "Critical Literature Review for a Master's Thesis",
        "meta_description": "Move from descriptive summaries to critical synthesis. Learn how to conduct a rigorous literature review for your Master's thesis.",
        "focus_keyword": "critical literature review",
        "topic_pillar": "Literature Review",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-04",
        "title": "How to Build a Conceptual or Theoretical Framework for a Master's Thesis",
        "slug": "conceptual-theoretical-framework-masters",
        "meta_title": "Build a Conceptual or Theoretical Framework for a Master's Thesis",
        "meta_description": "Understand the difference between conceptual and theoretical frameworks and learn how to construct and defend one for your Master's thesis.",
        "focus_keyword": "conceptual or theoretical framework",
        "topic_pillar": "Theoretical Framework",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-05",
        "title": "How to Choose a Research Design for a Master's Thesis",
        "slug": "choose-research-design-masters-thesis",
        "meta_title": "How to Choose a Research Design for a Master's Thesis",
        "meta_description": "Learn how to select and justify the correct research design for your Master's thesis based on your research questions, not just software familiarity.",
        "focus_keyword": "choose a research design",
        "topic_pillar": "Research Methodology",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-06",
        "title": "How to Determine Sample Size and Sampling Strategy for a Master's Study",
        "slug": "sample-size-sampling-strategy-masters",
        "meta_title": "Determine Sample Size and Sampling Strategy for a Master's Study",
        "meta_description": "Treat sampling as a methodological decision. Learn how to justify your sample size and sampling strategy for qualitative and quantitative Master's research.",
        "focus_keyword": "determine sample size and sampling strategy",
        "topic_pillar": "Data Collection",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-07",
        "title": "How to Analyse and Interpret Master's Thesis Data",
        "slug": "analyse-interpret-masters-thesis-data",
        "meta_title": "How to Analyse and Interpret Master's Thesis Data",
        "meta_description": "Learn how to practically analyse and interpret data for your Master's thesis, moving from raw output to scholarly insight.",
        "focus_keyword": "analyse and interpret Master's thesis data",
        "topic_pillar": "Data Analysis",
        "subtopic": "Master's Thesis"
    },
    {
        "id": "MASTERS-08",
        "title": "How to Write and Defend a Master's Thesis: From Results to Discussion",
        "slug": "write-defend-masters-thesis",
        "meta_title": "Write and Defend a Master's Thesis: Results to Discussion",
        "meta_description": "Master the art of interpreting findings, discussing limitations, contributing to knowledge, and defending your Master's thesis successfully.",
        "focus_keyword": "write and defend a Master's thesis",
        "topic_pillar": "Thesis Defense",
        "subtopic": "Master's Thesis"
    }
]

def clean_html(html):
    html = re.sub(r'^```html\s*', '', html)
    html = re.sub(r'```\s*$', '', html)
    
    # Remove H1 tags since we don't want them in the body
    html = re.sub(r'<h1[^>]*>.*?</h1>', '', html, flags=re.IGNORECASE|re.DOTALL)
    
    return html.strip()

payload = []

for i, meta in enumerate(articles_meta):
    file_path = f'scratch/masters_article_{i+1}.html'
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = clean_html(content)
        
        # We assume the subagents appended CTAs, if not, we can ensure they are there.
        # But my prompt explicitly told them to add CTAs.
        
        item = {
            "id": meta["id"],
            "title": meta["title"],
            "slug": meta["slug"],
            "content": content,
            "meta_title": meta["meta_title"],
            "meta_description": meta["meta_description"],
            "focus_keyword": meta["focus_keyword"],
            "topic_pillar": meta["topic_pillar"],
            "subtopic": meta["subtopic"],
            "image": f"/images/blog/masters-roadmap/{meta['slug']}-featured.jpg" # Not really used but good to have
        }
        payload.append(item)
    else:
        print(f"Warning: {file_path} not found.")

if payload:
    # Append to seed_data.json
    try:
        with open('seed_data.json', 'r', encoding='utf-8') as f:
            existing_seed = json.load(f)
    except FileNotFoundError:
        existing_seed = []
        
    # Check for duplicates before appending
    existing_slugs = {x['slug'] for x in existing_seed}
    for p in payload:
        if p['slug'] not in existing_slugs:
            existing_seed.append(p)
            
    with open('seed_data.json', 'w', encoding='utf-8') as f:
        json.dump(existing_seed, f, indent=2, ensure_ascii=False)
        
    print(f"Appended {len(payload)} Master's articles to seed_data.json")
