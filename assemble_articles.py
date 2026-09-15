"""
Assembles the 15 article HTML files into a production-ready seed_data.json.
Reads each HTML file, extracts the image from the <!-- IMAGE: ... --> comment,
strips the comment, and builds the complete JSON payload.
"""
import json
import re
import os

ARTICLES_DIR = "scratch/articles"

ARTICLE_META = [
    {
        "id": "PYTHON-01",
        "file": "PYTHON-01.html",
        "title": "How to Analyse Survey Data in Python (Likert Scale Step-by-Step)",
        "slug": "analyse-survey-data-python-likert-scale",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Intermediate",
        "focus_keyword": "analyse survey data in Python",
        "meta_title": "How to Analyse Survey Data in Python (Likert Scale Step-by-Step)",
        "meta_description": "Step-by-step guide to analysing Likert scale survey data in Python using pandas, numpy, and seaborn. Covers data cleaning, reliability testing, and academic reporting.",
        "default_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "PYTHON-02",
        "file": "PYTHON-02.html",
        "title": "Python for Beginners: Regression Analysis with Real Research Data",
        "slug": "python-regression-analysis-research-data",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Beginner",
        "focus_keyword": "Python regression analysis",
        "meta_title": "Python Regression Analysis for Beginners: Step-by-Step Guide",
        "meta_description": "Beginner's tutorial on running simple and multiple regression in Python with statsmodels. Covers assumptions, coefficients, R-squared, and APA reporting.",
        "default_image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "PYTHON-03",
        "file": "PYTHON-03.html",
        "title": "How to Visualise Your Research Results with Matplotlib & Seaborn",
        "slug": "visualise-research-results-matplotlib-seaborn",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Beginner",
        "focus_keyword": "visualise research results Python",
        "meta_title": "How to Visualise Research Results with Matplotlib & Seaborn",
        "meta_description": "Create publication-quality academic charts in Python. Practical guide to bar charts, histograms, box plots, scatter plots, and seaborn statistical graphics.",
        "default_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "SPSS-01",
        "file": "SPSS-01.html",
        "title": "How to Run a Pearson Correlation in SPSS (With Interpretation Guide)",
        "slug": "pearson-correlation-spss",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Beginner",
        "focus_keyword": "Pearson correlation in SPSS",
        "meta_title": "Pearson Correlation in SPSS: Step-by-Step With Interpretation",
        "meta_description": "Run and interpret a Pearson correlation in SPSS. Covers assumptions, exact menu steps, output, r-value, p-value, effect size, and dissertation reporting.",
        "default_image": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "SPSS-02",
        "file": "SPSS-02.html",
        "title": "SPSS ANOVA: Step-by-Step for Undergraduate Dissertations",
        "slug": "spss-anova",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Intermediate",
        "focus_keyword": "SPSS ANOVA",
        "meta_title": "SPSS ANOVA Step-by-Step: Complete Guide for Dissertations",
        "meta_description": "Run a One-Way ANOVA in SPSS from start to finish. Assumptions, Levene's test, post-hoc analysis, effect sizes, and APA reporting for undergraduate dissertations.",
        "default_image": "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "SPSS-03",
        "file": "SPSS-03.html",
        "title": "How to Test for Normality in SPSS Before Running Any Analysis",
        "slug": "test-normality-spss",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Intermediate",
        "focus_keyword": "test for normality in SPSS",
        "meta_title": "Testing Normality in SPSS: Shapiro-Wilk, Q-Q Plots & More",
        "meta_description": "A statistically rigorous guide to normality testing in SPSS. Covers Shapiro-Wilk, histograms, Q-Q plots, skewness, and what to do when data are not normal.",
        "default_image": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "R-01",
        "file": "R-01.html",
        "title": "R vs SPSS: Which Should You Use for Your Dissertation?",
        "slug": "r-vs-spss-dissertation",
        "topic_pillar": "Data Analysis",
        "subtopic": "Software Comparison",
        "difficulty": "Beginner",
        "focus_keyword": "R vs SPSS",
        "meta_title": "R vs SPSS for Your Dissertation: An Honest Comparison",
        "meta_description": "Compare R and SPSS for academic research. Covers learning curve, reproducibility, cost, visualization, and which is right for your dissertation.",
        "default_image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "R-02",
        "file": "R-02.html",
        "title": "How to Run Multiple Regression in R (With Output Interpretation)",
        "slug": "multiple-regression-r",
        "topic_pillar": "Data Analysis",
        "subtopic": "R",
        "difficulty": "Intermediate",
        "focus_keyword": "multiple regression in R",
        "meta_title": "Multiple Regression in R: Step-by-Step Output Interpretation",
        "meta_description": "Complete guide to running multiple linear regression in R with lm(). Covers model syntax, diagnostic plots, coefficients, adjusted R-squared, and APA reporting.",
        "default_image": "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "METHODOLOGY-01",
        "file": "METHODOLOGY-01.html",
        "title": "Quantitative vs Qualitative Research: Which Is Right for Your Study?",
        "slug": "quantitative-vs-qualitative-research",
        "topic_pillar": "Research Methodology",
        "subtopic": "Research Design",
        "difficulty": "Beginner",
        "focus_keyword": "quantitative vs qualitative research",
        "meta_title": "Quantitative vs Qualitative Research: Which Is Right for You?",
        "meta_description": "Understand when to choose quantitative or qualitative research. Covers philosophical assumptions, methods, mixed methods, and a practical decision framework.",
        "default_image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "METHODOLOGY-02",
        "file": "METHODOLOGY-02.html",
        "title": "How to Write a Research Methodology Chapter (With Examples)",
        "slug": "research-methodology-chapter",
        "topic_pillar": "Research Methodology",
        "subtopic": "Academic Writing",
        "difficulty": "Intermediate",
        "focus_keyword": "research methodology chapter",
        "meta_title": "How to Write a Research Methodology Chapter (With Examples)",
        "meta_description": "Write a rigorous research methodology chapter. Covers philosophy, design, sampling, instruments, validity, ethics, and examples of weak vs strong writing.",
        "default_image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "METHODOLOGY-03",
        "file": "METHODOLOGY-03.html",
        "title": "What Sample Size Do You Need? A Researcher's Guide to Cochran's Formula",
        "slug": "cochran-sample-size-formula",
        "topic_pillar": "Research Methodology",
        "subtopic": "Sampling",
        "difficulty": "Advanced",
        "focus_keyword": "Cochran's formula sample size",
        "meta_title": "Cochran's Formula: How to Calculate the Right Sample Size",
        "meta_description": "Calculate your required sample size using Cochran's formula. Worked examples, finite population correction, assumptions, and when to use power analysis instead.",
        "default_image": "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "METHODOLOGY-04",
        "file": "METHODOLOGY-04.html",
        "title": "How to Choose the Right Statistical Test (Decision Tree Included)",
        "slug": "choose-statistical-test",
        "topic_pillar": "Research Methodology",
        "subtopic": "Statistics",
        "difficulty": "Intermediate",
        "focus_keyword": "choose statistical test",
        "meta_title": "How to Choose the Right Statistical Test: A Decision Framework",
        "meta_description": "Stop guessing which statistical test to run. Our complete decision framework covers t-tests, ANOVA, correlation, chi-square, and regression by variable type and research question.",
        "default_image": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "DISSERTATION-01",
        "file": "DISSERTATION-01.html",
        "title": "How to Write a Literature Review That Gets Published",
        "slug": "literature-review-published",
        "topic_pillar": "Dissertation",
        "subtopic": "Literature Review",
        "difficulty": "Advanced",
        "focus_keyword": "write a literature review",
        "meta_title": "How to Write a Literature Review: From Summary to Synthesis",
        "meta_description": "Master the art of synthesising research literature. Covers search strategy, critical analysis, thematic structure, gap identification, and academic reporting.",
        "default_image": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "DISSERTATION-02",
        "file": "DISSERTATION-02.html",
        "title": "Plagiarism in Academic Research: What Counts and How to Avoid It",
        "slug": "plagiarism-academic-research",
        "topic_pillar": "Dissertation",
        "subtopic": "Academic Integrity",
        "difficulty": "Beginner",
        "focus_keyword": "plagiarism in academic research",
        "meta_title": "Plagiarism in Academic Research: What Counts and How to Avoid It",
        "meta_description": "Understand direct, mosaic, and self-plagiarism. Covers proper paraphrasing, citation practices, AI-assisted writing, and academic integrity principles.",
        "default_image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1280&q=80"
    },
    {
        "id": "DISSERTATION-03",
        "file": "DISSERTATION-03.html",
        "title": "The Complete Guide to Writing a Master's Dissertation Proposal",
        "slug": "masters-dissertation-proposal",
        "topic_pillar": "Dissertation",
        "subtopic": "Proposal Writing",
        "difficulty": "Intermediate",
        "focus_keyword": "Master's dissertation proposal",
        "meta_title": "The Complete Guide to Writing a Master's Dissertation Proposal",
        "meta_description": "Write a compelling Master's dissertation proposal. Covers title, problem statement, objectives, research questions, methodology, timeline, and common mistakes.",
        "default_image": "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=1280&q=80"
    }
]

def extract_image_and_content(filepath, default_image):
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read()

    # Extract image from HTML comment at top
    img_match = re.search(r'<!--\s*IMAGE:\s*(.+?)\s*-->', raw)
    image = img_match.group(1).strip() if img_match else default_image

    # Remove the image comment from content
    content = re.sub(r'<!--\s*IMAGE:\s*.+?\s*-->', '', raw, count=1).strip()

    return image, content

output = []
for meta in ARTICLE_META:
    filepath = os.path.join(ARTICLES_DIR, meta['file'])
    if not os.path.exists(filepath):
        print(f"MISSING: {filepath}")
        continue

    image, content = extract_image_and_content(filepath, meta['default_image'])

    # Count approximate word count from plain text
    text = re.sub(r'<[^>]+>', ' ', content)
    words = len(text.split())

    print(f"[{meta['id']}] ~{words} words | image: {image[:60]}...")

    record = {
        "id": meta["id"],
        "title": meta["title"],
        "slug": meta["slug"],
        "topic_pillar": meta["topic_pillar"],
        "subtopic": meta["subtopic"],
        "difficulty": meta["difficulty"],
        "focus_keyword": meta["focus_keyword"],
        "meta_title": meta["meta_title"],
        "meta_description": meta["meta_description"],
        "image": image,
        "content": content
    }
    output.append(record)

with open('seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\n✅ Assembled {len(output)} articles into seed_data.json")
