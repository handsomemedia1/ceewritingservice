import os
import json
import time
from dotenv import load_dotenv
from groq import Groq

load_dotenv('.env.local')

# Load Groq API Key
key = os.environ.get('GROQ_API_KEY', 'your-api-key-here')
client = Groq(api_key=key)

SYSTEM_PROMPT = """You are a senior academic researcher, statistician, and SEO content writer writing for CeeWriting. 
Your target audience is beginner researchers doing their FIRST research project.
CRITICAL INSTRUCTION: You must implement the 'WHAT 90% OF BEGINNERS DON'T KNOW' principle. 
For every concept, answer:
1. What is it? (Beginner concept)
2. How do I do it? (Practical process)
3. What could go wrong, and what does an experienced researcher know? (The CeeWriting Differentiator)
Combine academic evidence + experienced research reasoning + practical workflow + common mistakes + hidden knowledge.
Target: Beginner accessibility + expert depth.
You output ONLY semantic HTML inside your response. Do not use markdown backticks around the HTML. Do not output <html>, <head>, or <body>. Do not include a title <h1> (that is handled by the template). Start directly with an introductory paragraph or <h2>. Write substantial content (1500-3000 words conceptually)."""

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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Start Your First Research Project: A Practical Guide for Beginners".
Cover: what research actually is, what a research project consists of, where beginners should start, how the major stages fit together, what they should NOT worry about yet, and how to turn uncertainty into a sequence of decisions. Give the reader a mental model of the entire research process. Do not use generic filler. Make it deeply practical and apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Choose a Research Topic When You Don't Know What to Research".
Cover: interest vs researchable topic, broad vs narrow topics, feasibility, access to data, access to participants, time, resources, existing literature, relevance, originality, and institutional requirements. Explain why a topic can sound excellent but still be a terrible research project if it cannot realistically be investigated. Show how an experienced researcher evaluates topic feasibility. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Turn a Research Idea Into a Research Problem".
Clearly distinguish: interest, topic, research problem, research gap, and research question. Explain why 'I want to study X' is not automatically a research problem. Show the progression from a vague idea to a defensible research problem using realistic examples. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Write Research Questions, Objectives, and Hypotheses".
Explain: research questions, research objectives, hypotheses, the relationship between them, qualitative vs quantitative differences, when hypotheses may or may not be appropriate, and alignment. Teach the reader to understand the logic rather than memorize formulas. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Find and Read Research Papers When You Are a Beginner".
Cover: search strategy, keywords, databases/search engines, identifying useful studies, reading abstracts, screening papers, assessing relevance, reading strategically, taking notes, reference management, and avoiding downloading dozens of papers without understanding them. Explain how experienced researchers approach literature differently from beginners. Mention modern/AI tools responsibly. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Write a Literature Review for Your First Research Project".
Make the distinction extremely clear: A literature review is NOT a collection of summaries. Explain: synthesis, themes, comparison, contradictions, methodological differences, evidence, gaps, and connection to the research problem. Show examples of weak vs stronger literature-review thinking. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Choose a Research Methodology for Your First Study".
Cover: qualitative research, quantitative research, mixed methods, research design, population, sampling, variables, instruments, validity/reliability, qualitative quality criteria, ethics, and alignment between question and methodology. Core principle: The research question should help determine the method, not the other way around. Apply the CeeWriting Differentiator."""
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
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Collect and Analyze Data in Your First Research Project".
Give beginners a realistic overview of: preparing for data collection, ethics, organizing data, cleaning data, qualitative analysis, quantitative analysis, descriptive statistics, introductory inferential analysis, coding qualitative data, software, interpretation, common errors, and connecting analysis back to research questions. Do NOT turn this into a generic SPSS/R/Python tutorial. Apply the CeeWriting Differentiator."""
    }
]

def main():
    generated_articles = []
    
    for spec in articles_spec:
        print(f"Generating content for {spec['id']}...")
        try:
            response = client.chat.completions.create(
                model="qwen/qwen3.8-27b",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": spec['prompt']}
                ],
                temperature=0.7,
                max_tokens=4000
            )
            html_content = response.choices[0].message.content.strip()
            # Remove any leading/trailing markdown if the model hallucinated it
            if html_content.startswith("```html"):
                html_content = html_content[7:]
            if html_content.endswith("```"):
                html_content = html_content[:-3]
                
            spec['content'] = html_content.strip()
            generated_articles.append(spec)
            print(f"  -> Success: {len(html_content)} bytes")
        except Exception as e:
            print(f"  -> Error: {e}")
        
        time.sleep(1.5)  # Rate limiting

    # Merge with existing seed_data.json if exists
    existing_data = []
    if os.path.exists('seed_data.json'):
        with open('seed_data.json', 'r', encoding='utf-8') as f:
            try:
                existing_data = json.load(f)
            except:
                pass
    
    # Filter out any duplicates based on slug
    new_slugs = {s['slug'] for s in generated_articles}
    filtered_existing = [e for e in existing_data if e.get('slug') not in new_slugs]
    
    combined_data = filtered_existing + generated_articles

    with open('seed_data.json', 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, indent=2, ensure_ascii=False)

    print(f"Done generating {len(generated_articles)} articles. Saved to seed_data.json.")

if __name__ == '__main__':
    main()
