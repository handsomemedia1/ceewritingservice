import json
import re

def build_remediation():
    with open('db_articles.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
    
    # CTA mapping
    ctas = {
        'start-first-research-project-beginners': {
            'title': 'Ready to map out your entire research journey?',
            'text': 'Once you understand the basic components of a research project, the next step is following a structured path so you don\'t get lost. Explore our First Research Project roadmap for a step-by-step guide.',
            'link': '/research/path/first-project',
            'button': 'Explore the Roadmap →'
        },
        'choose-research-topic-beginners': {
            'title': 'Ready for the next stage?',
            'text': 'Once you have a workable topic, the next challenge is turning it into a clear research problem. Continue with our guide to developing a research problem.',
            'link': '/blog/turn-research-idea-into-problem',
            'button': 'Develop Your Research Problem →'
        },
        'turn-research-idea-into-problem': {
            'title': 'Translate your problem into actionable questions',
            'text': 'Now that you have a defensible research problem, you need to break it down into specific research questions and objectives. Learn how to align them perfectly.',
            'link': '/blog/write-research-questions-objectives-hypotheses',
            'button': 'Write Your Research Questions →'
        },
        'write-research-questions-objectives-hypotheses': {
            'title': 'Time to find the evidence',
            'text': 'With clear research questions in hand, you need to find the existing academic literature that addresses your topic. Learn how to search for and read papers strategically.',
            'link': '/blog/find-read-research-papers-beginners',
            'button': 'Master Literature Search →'
        },
        'find-read-research-papers-beginners': {
            'title': 'Turn your reading into a structured review',
            'text': 'Once you have found and read the relevant papers, the next step is writing the literature review. Learn how to synthesize sources rather than just summarizing them.',
            'link': '/blog/write-literature-review-first-research-project',
            'button': 'Write Your Literature Review →'
        },
        'write-literature-review-first-research-project': {
            'title': 'How will you answer your research question?',
            'text': 'After reviewing the literature, you need a clear methodology to collect your own data. Explore our guide on choosing the right methodology for your first study.',
            'link': '/blog/choose-research-methodology-first-study',
            'button': 'Choose Your Methodology →'
        },
        'choose-research-methodology-first-study': {
            'title': 'Ready to collect and analyze data?',
            'text': 'Now that you have selected your methodology, it is time to execute it. Discover how to collect, clean, and analyze your data without getting overwhelmed.',
            'link': '/blog/collect-analyze-data-first-research-project',
            'button': 'Collect & Analyze Data →'
        },
        'collect-analyze-data-first-research-project': {
            'title': 'Need advanced data analysis support?',
            'text': 'If you are ready for advanced statistical testing in SPSS, R, or Python but feel unsure of how to interpret the output, CeeWriting provides expert data analysis services to ensure your results are robust and accurate.',
            'link': '/services',
            'button': 'Explore Data Analysis Services →'
        },
        'analyse-survey-data-python-likert-scale': {
            'title': 'Need help interpreting your Python output?',
            'text': 'If your survey analysis is producing complex output that you are unsure how to interpret or report in your thesis, CeeWriting provides expert data analysis and research guidance.',
            'link': '/services',
            'button': 'Get Data Analysis Support →'
        },
        'python-regression-analysis-research-data': {
            'title': 'Struggling with advanced statistical models?',
            'text': 'Regression analysis can be tricky to report correctly. If you need help refining your model or interpreting the coefficients for your research chapter, our data analysis experts can assist.',
            'link': '/services',
            'button': 'Explore Research Services →'
        },
        'visualise-research-results-matplotlib-seaborn': {
            'title': 'Ensure your methodology matches your data',
            'text': 'Beautiful visualizations are only helpful if the underlying methodology is sound. If you are writing your methodology chapter, explore our comprehensive guide.',
            'link': '/blog/research-methodology-chapter',
            'button': 'Write Your Methodology Chapter →'
        },
        'pearson-correlation-spss': {
            'title': 'Before you run correlations, check for normality',
            'text': 'Pearson correlation assumes normally distributed data. If you haven\'t checked your data\'s distribution yet, learn how to test for normality in SPSS.',
            'link': '/blog/test-normality-spss',
            'button': 'Test for Normality in SPSS →'
        },
        'spss-anova': {
            'title': 'Which statistical test is right for your data?',
            'text': 'Not sure if ANOVA is the right choice for your specific variables? Use our statistical test decision tree to confirm you are using the correct analysis.',
            'link': '/blog/choose-statistical-test',
            'button': 'View the Decision Tree →'
        },
        'test-normality-spss': {
            'title': 'Need to choose the right statistical test?',
            'text': 'Once you know whether your data is normally distributed (parametric) or not (non-parametric), you can confidently select the right statistical test for your analysis.',
            'link': '/blog/choose-statistical-test',
            'button': 'Choose Your Statistical Test →'
        },
        'r-vs-spss-dissertation': {
            'title': 'Need expert statistical analysis?',
            'text': 'Whether you choose R, SPSS, or Python, executing the analysis perfectly is crucial for your dissertation. CeeWriting offers professional data analysis services to guarantee accurate results.',
            'link': '/services',
            'button': 'Explore Data Analysis Services →'
        },
        'multiple-regression-r': {
            'title': 'What sample size do you need for regression?',
            'text': 'Multiple regression requires a sufficient sample size to be statistically valid. Learn how to calculate the correct sample size using Cochran\'s formula.',
            'link': '/blog/cochran-sample-size-formula',
            'button': 'Calculate Your Sample Size →'
        },
        'quantitative-vs-qualitative-research': {
            'title': 'Need a structured research roadmap?',
            'text': 'CeeWriting\'s Undergraduate Dissertation roadmap takes you through the entire process, from choosing your methodology to final data analysis and writing.',
            'link': '/research/path/undergrad-dissertation',
            'button': 'View the Dissertation Roadmap →'
        },
        'research-methodology-chapter': {
            'title': 'Need an expert eye on your methodology?',
            'text': 'The methodology chapter is the foundation of your research defense. If you are stuck or need professional validation, CeeWriting consultants can review or help draft your methodology.',
            'link': '/services',
            'button': 'Explore Research Support →'
        },
        'cochran-sample-size-formula': {
            'title': 'Moving to data collection and analysis',
            'text': 'Once your sample size is justified, the next step is actually analyzing the data you collect. Learn how to structure your statistical analysis chapter effectively.',
            'link': '/blog/statistical-analysis-undergraduate-research',
            'button': 'Read the Data Analysis Guide →'
        },
        'choose-statistical-test': {
            'title': 'Expert execution of statistical tests',
            'text': 'Knowing which test to run is only half the battle. If you need professional assistance executing the tests in SPSS or R, our data analysis team can deliver guaranteed results.',
            'link': '/services',
            'button': 'Get Data Analysis Support →'
        },
        'literature-review-published': {
            'title': 'Check your work for unintended plagiarism',
            'text': 'When synthesizing a large volume of academic literature, it is easy to unintentionally trigger similarity matches. Ensure your work is original with our guide to avoiding academic plagiarism.',
            'link': '/blog/plagiarism-academic-research',
            'button': 'Read the Plagiarism Guide →'
        },
        'plagiarism-academic-research': {
            'title': 'Need a real Turnitin plagiarism check?',
            'text': 'Don\'t wait for your university to scan your final submission. CeeWriting provides professional, no-repository Turnitin checks to verify your originality before you submit.',
            'link': '/services',
            'button': 'Get a Turnitin Check →'
        },
        'masters-dissertation-proposal': {
            'title': 'Need comprehensive master\'s dissertation support?',
            'text': 'From refining your proposal to complex statistical analysis and final chapter drafting, CeeWriting provides end-to-end support for master\'s and PhD candidates.',
            'link': '/services',
            'button': 'Explore Dissertation Services →'
        }
    }
    
    payload = []
    
    for article in db:
        slug = article.get('slug')
        if slug in ctas:
            content = article.get('content', '')
            
            # Fix WebP to SVG for the beginner articles
            content = re.sub(r'src=[\"\'](/images/blog/beginner-roadmap/[^\"\']+)\.webp[\"\']', r'src="\1.svg"', content)
            
            # Append CTA if it doesn't already have it
            if 'cee-conversion-cta' not in content:
                cta_info = ctas[slug]
                cta_html = f"""
<div class="cee-conversion-cta" style="margin-top: 48px; padding: 32px; background: rgba(197,160,89,0.05); border: 1px solid rgba(197,160,89,0.15); border-radius: 12px; margin-bottom: 48px;">
  <h3 style="color: #C5A059; font-size: 20px; font-weight: bold; margin-bottom: 12px; font-family: 'Space Grotesk', sans-serif;">{cta_info['title']}</h3>
  <p style="color: rgba(234,234,234,0.8); line-height: 1.6; margin-bottom: 24px; font-size: 15px;">{cta_info['text']}</p>
  <a href="{cta_info['link']}" style="display: inline-block; background: #C5A059; color: #0A0A0A; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">{cta_info['button']}</a>
</div>
"""
                content += cta_html
                
            payload.append({
                'slug': slug,
                'content': content
            })

    with open('remediation_payload.json', 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        
    print(f"Generated remediation payload for {len(payload)} articles.")

build_remediation()
