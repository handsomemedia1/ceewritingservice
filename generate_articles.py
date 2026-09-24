import os
import json
import time
from groq import Groq

# Load Groq API Key
key = os.environ.get('GROQ_API_KEY', 'your-api-key-here')
client = Groq(api_key=key)

articles_spec = [
    {
        "id": "PYTHON-01",
        "title": "How to Analyse Survey Data in Python (Likert Scale Step-by-Step)",
        "slug": "analyse-survey-data-python-likert-scale",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Intermediate",
        "focus_keyword": "analyse survey data in Python",
        "meta_title": "How to Analyse Survey Data in Python (Likert Scale)",
        "meta_description": "Learn how to analyse Likert scale survey data in Python using pandas. Step-by-step guide covering descriptive statistics, Cronbach's alpha, and visualization.",
        "image": "/images/blog/python_likert_survey_1789403343057.jpg",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Analyse Survey Data in Python (Likert Scale Step-by-Step)".
Cover: Likert scales, Likert items, coding responses, pandas, descriptive statistics, frequencies, mean, median, standard deviation, reliability, Cronbach's alpha, visualization, interpreting results, and research reporting.
Provide Python code examples. Do not fabricate research claims. Add a clear decision-making framework. Include 4-8 FAQs. Add a CTA to Cee Writing services for data analysis help. Output ONLY valid HTML for the article body (without <html>, <head>, or <body> tags, just the inner HTML starting with <p> or <h2>). Use semantic HTML tags. Do not use markdown backticks around the HTML. Ensure it is at least 1500 words conceptually (make it detailed and thorough)."""
    },
    {
        "id": "PYTHON-02",
        "title": "Python for Beginners: Regression Analysis with Real Research Data",
        "slug": "python-regression-analysis-research-data",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Beginner",
        "focus_keyword": "Python regression analysis",
        "meta_title": "Python for Beginners: Regression Analysis Step-by-Step",
        "meta_description": "Beginner's guide to running simple and multiple regression analysis in Python. Learn to fit models, interpret p-values, R-squared, and report results.",
        "image": "/images/blog/python_regression_analysis_1789403354246.jpg",
        "prompt": """Write a comprehensive, professional academic SEO article titled "Python for Beginners: Regression Analysis with Real Research Data".
Cover: what regression analysis is, when researchers use it, dependent/independent variables, simple linear regression, multiple regression, assumptions, data preparation, Python libraries (statsmodels/scikit-learn), fitting a model, coefficients, R², p-values, confidence intervals, residuals, interpretation, and reporting in a dissertation.
Provide illustrative Python code. Output ONLY valid HTML for the article body. Use semantic HTML."""
    },
    {
        "id": "PYTHON-03",
        "title": "How to Visualise Your Research Results with Matplotlib & Seaborn",
        "slug": "visualise-research-results-matplotlib-seaborn",
        "topic_pillar": "Data Analysis",
        "subtopic": "Python",
        "difficulty": "Beginner",
        "focus_keyword": "visualise research results Python",
        "meta_title": "Visualise Research Results with Matplotlib & Seaborn",
        "meta_description": "Master data visualization for your dissertation using Python's Matplotlib and Seaborn. Learn to create publication-quality charts and avoid common mistakes.",
        "image": "/images/blog/python_data_visualization_1789403365547.jpg",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Visualise Your Research Results with Matplotlib & Seaborn".
Cover: why visualization matters, bar charts, histograms, box plots, scatter plots, line charts, correlation visualization, distribution visualization, choosing the right chart, academic publication-quality figures, common visualization mistakes, accessibility, interpretation, and exporting figures. Provide Python code examples. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "SPSS-01",
        "title": "How to Run a Pearson Correlation in SPSS (With Interpretation Guide)",
        "slug": "pearson-correlation-spss",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Beginner",
        "focus_keyword": "Pearson correlation in SPSS",
        "meta_title": "How to Run a Pearson Correlation in SPSS (Interpretation Guide)",
        "meta_description": "Step-by-step guide to running and interpreting a Pearson correlation in SPSS. Learn about assumptions, p-values, effect size, and APA reporting.",
        "image": "/images/blog/spss_pearson_correlation_1789403376928.jpg",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Run a Pearson Correlation in SPSS (With Interpretation Guide)".
Cover: Pearson correlation, when to use it, variables required, assumptions, SPSS setup, step-by-step procedure, output interpretation, Pearson's r, significance/p-value, strength and direction, correlation vs causation, reporting APA-style results, and common mistakes. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "SPSS-02",
        "title": "SPSS ANOVA: Step-by-Step for Undergraduate Dissertations",
        "slug": "spss-anova",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Intermediate",
        "focus_keyword": "SPSS ANOVA",
        "meta_title": "SPSS ANOVA: Step-by-Step for Undergraduate Dissertations",
        "meta_description": "Learn how to conduct a One-Way ANOVA in SPSS. A beginner-friendly guide covering assumptions, post-hoc tests, effect size, and APA reporting.",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "SPSS ANOVA: Step-by-Step for Undergraduate Dissertations".
Cover: what ANOVA is, when to use one-way ANOVA, variables, assumptions, SPSS procedure, descriptive statistics, ANOVA table, F-statistic, p-value, post-hoc tests, effect size, interpretation, reporting, and common mistakes. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "SPSS-03",
        "title": "How to Test for Normality in SPSS Before Running Any Analysis",
        "slug": "test-normality-spss",
        "topic_pillar": "Data Analysis",
        "subtopic": "SPSS",
        "difficulty": "Intermediate",
        "focus_keyword": "test for normality in SPSS",
        "meta_title": "How to Test for Normality in SPSS Before Analysis",
        "meta_description": "Determine if your research data is normally distributed in SPSS. Covers Shapiro-Wilk, Kolmogorov-Smirnov, Q-Q plots, histograms, skewness, and kurtosis.",
        "image": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Test for Normality in SPSS Before Running Any Analysis".
Cover: what normality means, why it matters, when normality matters, histograms, Q-Q plots, Shapiro-Wilk, skewness, kurtosis, sample size considerations, statistical vs visual assessment, what to do when data are non-normal, and common misconceptions. Explicitly avoid the simplistic rule "p > .05 means data are normal". Output ONLY valid HTML for the article body."""
    },
    {
        "id": "R-01",
        "title": "R vs SPSS: Which Should You Use for Your Dissertation?",
        "slug": "r-vs-spss-dissertation",
        "topic_pillar": "Data Analysis",
        "subtopic": "Software Comparison",
        "difficulty": "Beginner",
        "focus_keyword": "R vs SPSS",
        "meta_title": "R vs SPSS: Which Should You Use for Your Dissertation?",
        "meta_description": "Compare R and SPSS for academic research and dissertations. Discover which statistical software is best for your learning curve, goals, and analysis needs.",
        "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "R vs SPSS: Which Should You Use for Your Dissertation?".
Create a genuine comparison covering: learning curve, cost, reproducibility, statistical capabilities, visualization, data cleaning, regression, advanced analysis, reporting, collaboration, academic research, automation, beginner friendliness, and long-term research skills. Do not declare one universally superior. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "R-02",
        "title": "How to Run Multiple Regression in R (With Output Interpretation)",
        "slug": "multiple-regression-r",
        "topic_pillar": "Data Analysis",
        "subtopic": "R",
        "difficulty": "Intermediate",
        "focus_keyword": "multiple regression in R",
        "meta_title": "How to Run Multiple Regression in R (Output Interpretation)",
        "meta_description": "Step-by-step tutorial on multiple linear regression in R. Learn model specification, assumption checking, diagnostic plots, and interpreting coefficients.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Run Multiple Regression in R (With Output Interpretation)".
Cover: multiple regression, research questions, variables, assumptions, data preparation, model specification, R code, output, coefficients, significance, R², adjusted R², confidence intervals, diagnostics, interpretation, and dissertation reporting. Use an illustrative dataset. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "METHODOLOGY-01",
        "title": "Quantitative vs Qualitative Research: Which Is Right for Your Study?",
        "slug": "quantitative-vs-qualitative-research",
        "topic_pillar": "Research Methodology",
        "subtopic": "Research Design",
        "difficulty": "Beginner",
        "focus_keyword": "quantitative vs qualitative research",
        "meta_title": "Quantitative vs Qualitative Research: Which Is Right?",
        "meta_description": "Understand the core differences between quantitative and qualitative research methods, their strengths, limitations, and how to choose the right approach for your dissertation.",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "Quantitative vs Qualitative Research: Which Is Right for Your Study?".
Cover: quantitative research, qualitative research, mixed methods, research questions, hypotheses, interviews, surveys, experiments, thematic analysis, statistical analysis, strengths, limitations, examples, and include a clear decision framework. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "METHODOLOGY-02",
        "title": "How to Write a Research Methodology Chapter (With Examples)",
        "slug": "research-methodology-chapter",
        "topic_pillar": "Research Methodology",
        "subtopic": "Academic Writing",
        "difficulty": "Intermediate",
        "focus_keyword": "research methodology chapter",
        "meta_title": "How to Write a Research Methodology Chapter (With Examples)",
        "meta_description": "A complete guide to writing a stellar research methodology chapter for your dissertation. Covers philosophy, design, sampling, instruments, and data analysis.",
        "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Write a Research Methodology Chapter (With Examples)".
Cover: methodology vs methods, research philosophy, research approach, research design, population, sample, sampling technique, instruments, data collection, validity, reliability, ethical considerations, data analysis, limitations, chapter structure, and examples of strong vs weak methodology writing. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "METHODOLOGY-03",
        "title": "What Sample Size Do You Need? A Researcher's Guide to Cochran's Formula",
        "slug": "cochran-sample-size-formula",
        "topic_pillar": "Research Methodology",
        "subtopic": "Sampling",
        "difficulty": "Advanced",
        "focus_keyword": "Cochran's formula sample size",
        "meta_title": "What Sample Size Do You Need? A Guide to Cochran's Formula",
        "meta_description": "Calculate the perfect sample size for your research using Cochran's formula. Learn about confidence levels, margin of error, and finite population correction.",
        "image": "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "What Sample Size Do You Need? A Researcher's Guide to Cochran's Formula".
Cover: why sample size matters, population size, confidence level, margin of error, estimated proportion, Cochran's formula, finite population correction, worked examples, when Cochran's formula is appropriate, when it is not, power analysis vs Cochran, and common mistakes. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "METHODOLOGY-04",
        "title": "How to Choose the Right Statistical Test (Decision Tree Included)",
        "slug": "choose-statistical-test",
        "topic_pillar": "Research Methodology",
        "subtopic": "Statistics",
        "difficulty": "Intermediate",
        "focus_keyword": "choose statistical test",
        "meta_title": "How to Choose the Right Statistical Test (Decision Tree)",
        "meta_description": "Stop guessing which statistical test to use. Our comprehensive guide and decision tree help you select the exact test for your research design and variables.",
        "image": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Choose the Right Statistical Test (Decision Tree Included)".
Cover: research question, variable types, categorical vs continuous variables, independent vs paired observations, normality, number of groups, correlation, prediction, comparison, and categorical association. Detail tests: Pearson, Spearman, independent/paired t-test, one-way/repeated ANOVA, chi-square, Mann-Whitney, Wilcoxon, Kruskal-Wallis, regression. Structure it as a logical decision framework. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "DISSERTATION-01",
        "title": "How to Write a Literature Review That Gets Published",
        "slug": "literature-review-published",
        "topic_pillar": "Dissertation",
        "subtopic": "Literature Review",
        "difficulty": "Advanced",
        "focus_keyword": "write a literature review",
        "meta_title": "How to Write a Publication-Ready Literature Review",
        "meta_description": "Master the art of synthesizing research. Learn how to write a critical literature review that identifies gaps, builds frameworks, and meets publication standards.",
        "image": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "How to Write a Literature Review That Gets Published".
Cover: purpose of literature review, searching literature, databases, inclusion/exclusion, synthesis, critical analysis, research gaps, theoretical frameworks, conceptual frameworks, citation management, structure, common mistakes, writing for journal publication, and dissertation vs journal literature review. Do not promise publication. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "DISSERTATION-02",
        "title": "Plagiarism in Academic Research: What Counts and How to Avoid It",
        "slug": "plagiarism-academic-research",
        "topic_pillar": "Dissertation",
        "subtopic": "Academic Integrity",
        "difficulty": "Beginner",
        "focus_keyword": "plagiarism in academic research",
        "meta_title": "Plagiarism in Academic Research: What Counts & How to Avoid It",
        "meta_description": "Protect your academic integrity. Understand direct, mosaic, and self-plagiarism, and learn how to properly paraphrase and cite sources in your dissertation.",
        "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "Plagiarism in Academic Research: What Counts and How to Avoid It".
Cover: plagiarism, direct plagiarism, paraphrasing plagiarism, mosaic plagiarism, self-plagiarism, citation issues, accidental plagiarism, AI-assisted writing, source attribution, quotation, paraphrasing, reference management, and academic integrity. Output ONLY valid HTML for the article body."""
    },
    {
        "id": "DISSERTATION-03",
        "title": "The Complete Guide to Writing a Master's Dissertation Proposal",
        "slug": "masters-dissertation-proposal",
        "topic_pillar": "Dissertation",
        "subtopic": "Proposal Writing",
        "difficulty": "Intermediate",
        "focus_keyword": "Master's dissertation proposal",
        "meta_title": "The Complete Guide to Writing a Master's Dissertation Proposal",
        "meta_description": "Learn how to structure, format, and write a winning Master's dissertation proposal. Covers problem statements, research questions, methodology, and timelines.",
        "image": "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=1280&q=80",
        "prompt": """Write a comprehensive, professional academic SEO article titled "The Complete Guide to Writing a Master's Dissertation Proposal".
Cover: title, introduction, background, problem statement, objectives, research questions, hypotheses, literature review, methodology, significance, scope, limitations, references, timeline, proposal structure, common mistakes, and proposal checklist. Output ONLY valid HTML for the article body."""
    }
]

generated_articles = []

for spec in articles_spec:
    print(f"Generating content for {spec['id']}...")
    try:
        response = client.chat.completions.create(
            model="qwen/qwen3.8-27b",
            messages=[
                {"role": "system", "content": "You are a senior academic researcher, statistician, and SEO content writer. Your ultimate objective is to explain what textbooks say, but also what actually happens in practice (The CeeWriting Differentiator). Every article must contain a layer of expert insight that goes beyond obvious explanations. Include practical workflows, common beginner mistakes, and hidden knowledge that only experienced researchers know (e.g. 'On paper this looks straightforward. In practice, the difficult part is...'). Answer three levels of questions: What is it? How do I do it? What could go wrong? You output ONLY semantic HTML inside your response. Do not use markdown backticks around the HTML. Do not output <html>, <head>, or <body>. Do not include a title <h1> (that is handled by the template). Start directly with an introductory paragraph or <h2>."},
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

with open('seed_data.json', 'w', encoding='utf-8') as f:
    json.dump(generated_articles, f, indent=2, ensure_ascii=False)

print("Done generating 15 articles to seed_data.json.")
