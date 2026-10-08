import json
import re

def list_images():
    with open('db_articles.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
    
    target_slugs = [
        # Beginner
        'start-first-research-project-beginners', 
        'choose-research-topic-beginners', 
        'turn-research-idea-into-problem', 
        'write-research-questions-objectives-hypotheses', 
        'find-read-research-papers-beginners', 
        'write-literature-review-first-research-project', 
        'choose-research-methodology-first-study', 
        'collect-analyze-data-first-research-project',
        # Advanced
        'analyse-survey-data-python-likert-scale', 
        'python-regression-analysis-research-data', 
        'visualise-research-results-matplotlib-seaborn', 
        'pearson-correlation-spss', 
        'spss-anova', 
        'test-normality-spss', 
        'r-vs-spss-dissertation', 
        'multiple-regression-r', 
        'quantitative-vs-qualitative-research', 
        'research-methodology-chapter', 
        'cochran-sample-size-formula', 
        'choose-statistical-test', 
        'literature-review-published', 
        'plagiarism-academic-research', 
        'masters-dissertation-proposal'
    ]
    
    for article in db:
        if article.get('slug') in target_slugs:
            content = article.get('content', '')
            imgs = re.findall(r'<img[^>]+src=[\"\'](.*?)[\"\']', content)
            print(f"{article.get('slug')[:35]:<35} | Imgs: {len(imgs)} | {imgs}")

list_images()
