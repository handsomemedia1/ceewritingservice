import json
import os

articles_spec = [
    {
        "id": "BEGINNER-01",
        "title": "How to Start Your First Research Project: A Practical Guide for Beginners",
        "slug": "start-first-research-project-beginners",
        "topic_pillar": "Beginner Research",
        "subtopic": "Research Fundamentals",
        "difficulty": "Beginner",
        "focus_keyword": "start first research project",
        "meta_title": "How to Start Your First Research Project: Practical Guide",
        "meta_description": "A step-by-step practical guide to starting your first research project. Learn what research actually is, the major stages, and how to avoid early mistakes.",
        "image": "/images/blog/start_first_research_project.jpg",
    },
    {
        "id": "BEGINNER-02",
        "title": "How to Choose a Research Topic When You Don't Know What to Research",
        "slug": "choose-research-topic-beginners",
        "topic_pillar": "Beginner Research",
        "subtopic": "Topic Selection",
        "difficulty": "Beginner",
        "focus_keyword": "choose research topic beginners",
        "meta_title": "How to Choose a Research Topic When You Don't Know What to Research",
        "meta_description": "Stop guessing your research topic. Learn how to evaluate feasibility, data access, and relevance to choose a topic that will actually work in practice.",
        "image": "/images/blog/choose_research_topic.jpg",
    },
    {
        "id": "BEGINNER-03",
        "title": "How to Turn a Research Idea Into a Research Problem",
        "slug": "turn-research-idea-into-problem",
        "topic_pillar": "Beginner Research",
        "subtopic": "Research Problem",
        "difficulty": "Beginner",
        "focus_keyword": "turn research idea into problem",
        "meta_title": "How to Turn a Vague Idea Into a Defensible Research Problem",
        "meta_description": "An idea is not a research problem. Discover the step-by-step process of narrowing your interests into a rigorous, defensible research gap and problem statement.",
        "image": "/images/blog/research_idea_to_problem.jpg",
    },
    {
        "id": "BEGINNER-04",
        "title": "How to Write Research Questions, Objectives, and Hypotheses",
        "slug": "write-research-questions-objectives-hypotheses",
        "topic_pillar": "Beginner Research",
        "subtopic": "Research Questions",
        "difficulty": "Beginner",
        "focus_keyword": "write research questions and objectives",
        "meta_title": "How to Write Aligned Research Questions, Objectives, & Hypotheses",
        "meta_description": "Learn the logic behind structuring research questions, objectives, and hypotheses. Ensure perfect alignment in your first research project.",
        "image": "/images/blog/research_questions_objectives.jpg",
    },
    {
        "id": "BEGINNER-05",
        "title": "How to Find and Read Research Papers When You Are a Beginner",
        "slug": "find-read-research-papers-beginners",
        "topic_pillar": "Beginner Research",
        "subtopic": "Literature Search",
        "difficulty": "Beginner",
        "focus_keyword": "find and read research papers",
        "meta_title": "How to Find and Read Research Papers (Without Getting Overwhelmed)",
        "meta_description": "A strategic guide to academic literature search for beginners. Learn how to screen papers, read abstracts, and manage references effectively.",
        "image": "/images/blog/find_read_papers.jpg",
    },
    {
        "id": "BEGINNER-06",
        "title": "How to Write a Literature Review for Your First Research Project",
        "slug": "write-literature-review-first-research-project",
        "topic_pillar": "Beginner Research",
        "subtopic": "Literature Review",
        "difficulty": "Intermediate",
        "focus_keyword": "write literature review first project",
        "meta_title": "How to Write a Literature Review (Synthesis, Not Summaries)",
        "meta_description": "A literature review is not a collection of summaries. Learn how to synthesize sources, compare methods, and identify gaps for your first research project.",
        "image": "/images/blog/write_literature_review_beginner.jpg",
    },
    {
        "id": "BEGINNER-07",
        "title": "How to Choose a Research Methodology for Your First Study",
        "slug": "choose-research-methodology-first-study",
        "topic_pillar": "Beginner Research",
        "subtopic": "Research Design",
        "difficulty": "Intermediate",
        "focus_keyword": "choose research methodology beginners",
        "meta_title": "How to Choose the Right Research Methodology for Your First Study",
        "meta_description": "Let your research question decide your methodology. Explore qualitative, quantitative, mixed methods, and sampling strategies for beginners.",
        "image": "/images/blog/choose_research_methodology.jpg",
    },
    {
        "id": "BEGINNER-08",
        "title": "How to Collect and Analyze Data in Your First Research Project",
        "slug": "collect-analyze-data-first-research-project",
        "topic_pillar": "Beginner Research",
        "subtopic": "Data Analysis",
        "difficulty": "Intermediate",
        "focus_keyword": "collect and analyze data beginners",
        "meta_title": "Data Collection and Analysis for Your First Research Project",
        "meta_description": "A realistic overview of collecting, cleaning, and analyzing your research data. Avoid common beginner errors in quantitative and qualitative analysis.",
        "image": "/images/blog/collect_analyze_data.jpg",
    }
]

def main():
    generated_articles = []
    
    for i, spec in enumerate(articles_spec):
        file_path = os.path.join("scratch", f"article_{i+1}.html")
        if not os.path.exists(file_path):
            print(f"Warning: {file_path} not found.")
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            html_content = f.read().strip()
            
        if html_content.startswith("```html"):
            html_content = html_content[7:]
        if html_content.endswith("```"):
            html_content = html_content[:-3]
            
        spec['content'] = html_content.strip()
        generated_articles.append(spec)
        print(f"Loaded article {i+1} successfully.")

    existing_data = []
    if os.path.exists('seed_data.json'):
        with open('seed_data.json', 'r', encoding='utf-8') as f:
            try:
                existing_data = json.load(f)
            except:
                pass
    
    new_slugs = {s['slug'] for s in generated_articles}
    filtered_existing = [e for e in existing_data if e.get('slug') not in new_slugs]
    
    combined_data = filtered_existing + generated_articles

    with open('seed_data.json', 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, indent=2, ensure_ascii=False)

    print(f"Done combining {len(generated_articles)} new articles into seed_data.json.")

if __name__ == '__main__':
    main()
