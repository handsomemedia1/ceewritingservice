import json
import re

def insert_links(text, replacements):
    for pattern_str, repl_str in replacements:
        # Match the word but preserve the exact case found in text
        # Using a lambda to keep the original text while wrapping in <a>
        pattern = re.compile(rf'\b({pattern_str})\b', re.IGNORECASE)
        # We only want to replace once
        text = pattern.sub(rf'<a href="{repl_str}">\1</a>', text, count=1)
    return text

def main():
    with open('seed_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        if 'BEGINNER' not in item.get('id', ''):
            continue
            
        content = item['content']
        
        # ---------------------------------------------
        # HEADING VARIATIONS (Articles 4, 5, 8)
        # ---------------------------------------------
        if item['id'] == 'BEGINNER-04':
            content = content.replace('<h3>What is it?</h3>', '<h3>Understanding the Core Concept</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Step-by-Step Implementation</h3>', 1)
            content = content.replace('<h3>What could go wrong? (The CeeWriting Differentiator)</h3>', '<h3>The Hidden Pitfalls to Avoid</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>Defining the Blueprint</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Mapping Your Action Plan</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Common Beginner Missteps</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>Grasping Predictive Analytics</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Formulating Your Predictions</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Why Untestable Hypotheses Fail</h3>', 1)
            
        elif item['id'] == 'BEGINNER-05':
            content = content.replace('<h3>What is a Search Strategy?</h3>', '<h3>The Foundations of Literature Search</h3>', 1)
            content = content.replace('<h3>How Do I Do It?</h3>', '<h3>Executing Your Search Practically</h3>', 1)
            content = content.replace('<h3>What Could Go Wrong? (The "Keyword Trap")</h3>', '<h3>Avoiding the Keyword Trap</h3>', 1)
            content = content.replace('<h3>What is Screening?</h3>', '<h3>Defining the Screening Process</h3>', 1)
            content = content.replace('<h3>How Do I Do It?</h3>', '<h3>Setting Up Your Filters</h3>', 1)
            content = content.replace('<h3>What is Strategic Reading?</h3>', '<h3>Decoding Academic Texts</h3>', 1)
            content = content.replace('<h3>How Do I Do It?</h3>', '<h3>The Strategic Reading Workflow</h3>', 1)
            content = content.replace('<h3>What is Reference Management and Synthesis?</h3>', '<h3>Organizing Your Literature</h3>', 1)
            content = content.replace('<h3>How Do I Do It?</h3>', '<h3>Managing Citations Effectively</h3>', 1)
            content = content.replace("<h3>What is AI's Role in Research?</h3>", '<h3>Understanding AI Capabilities in Academia</h3>', 1)
            content = content.replace('<h3>How Do I Do It?</h3>', '<h3>Leveraging Modern Tools Responsibly</h3>', 1)

        elif item['id'] == 'BEGINNER-08':
            content = content.replace('<h3>What is it?</h3>', '<h3>Defining the Pre-Collection Phase</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Securing Ethics and Testing Instruments</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>The Dangers of Skipping Pilot Studies</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>The Purpose of Data Cleaning</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Building a Codebook or Data Log</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Losing Original Data Files</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>Grasping Thematic Extraction</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>From Immersion to Coding Themes</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Confusing Topics with Themes</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>The Core of Statistical Analysis</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Categorical Means and False Logic</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Misinterpreting P-Values and Causation</h3>', 1)
            content = content.replace('<h3>What is it?</h3>', '<h3>Translating Results to Meaning</h3>', 1)
            content = content.replace('<h3>How do I do it?</h3>', '<h3>Structuring Your Findings Section</h3>', 1)
            content = content.replace('<h3>What could go wrong?</h3>', '<h3>Overstating Claims and Hiding Flaws</h3>', 1)

        # ---------------------------------------------
        # INTERNAL LINKS & ROADMAP LINKS
        # ---------------------------------------------
        # Roadmap link
        roadmap_link = '/research/path/beginner-research-project'
        content = insert_links(content, [
            ('first research project', roadmap_link),
        ])
        if roadmap_link not in content:
            content = insert_links(content, [('beginner researchers', roadmap_link)])

        # Interlinking specific articles
        if item['id'] == 'BEGINNER-01':
            content = insert_links(content, [
                ('ideation', '/blog/turn-research-idea-into-problem'),
                ('choosing a research topic', '/blog/choose-research-topic-beginners'),
                ('literature review', '/blog/write-literature-review-first-research-project'),
                ('graduate thesis or dissertation', '/research/path/undergrad-dissertation'),
                ('dissertation', '/research/path/undergrad-dissertation')
            ])
        
        elif item['id'] == 'BEGINNER-02':
            content = insert_links(content, [
                ('researchable question', '/blog/turn-research-idea-into-problem'),
                ('methodology', '/blog/choose-research-methodology-first-study'),
                ('literature review', '/blog/write-literature-review-first-research-project')
            ])

        elif item['id'] == 'BEGINNER-03':
            content = insert_links(content, [
                ('research topic', '/blog/choose-research-topic-beginners'),
                ('research question', '/blog/write-research-questions-objectives-hypotheses'),
                ('methodology', '/blog/choose-research-methodology-first-study')
            ])
        
        elif item['id'] == 'BEGINNER-04':
            content = insert_links(content, [
                ('literature review', '/blog/write-literature-review-first-research-project'),
                ('methodology', '/blog/choose-research-methodology-first-study')
            ])

        elif item['id'] == 'BEGINNER-05':
            content = insert_links(content, [
                ('literature review', '/blog/write-literature-review-first-research-project'),
                ('research problem', '/blog/turn-research-idea-into-problem')
            ])

        elif item['id'] == 'BEGINNER-06':
            content = insert_links(content, [
                ('research problem', '/blog/turn-research-idea-into-problem'),
                ('methodology', '/blog/choose-research-methodology-first-study')
            ])

        elif item['id'] == 'BEGINNER-07':
            content = insert_links(content, [
                ('literature review', '/blog/write-literature-review-first-research-project'),
                ('data collection', '/blog/collect-analyze-data-first-research-project'),
                ('research question', '/blog/write-research-questions-objectives-hypotheses')
            ])

        elif item['id'] == 'BEGINNER-08':
            content = insert_links(content, [
                ('research design', '/blog/choose-research-methodology-first-study'),
                ('research questions', '/blog/write-research-questions-objectives-hypotheses')
            ])
            # Dissertation cross-link
            if '<a href="/research/path/undergrad-dissertation">' not in content:
                content += '\n<p>As you transition from this foundational project into more advanced work, you will likely encounter stricter formatting and institutional demands. When that time comes, our <a href="/research/path/undergrad-dissertation">complete undergraduate dissertation guide</a> will help you scale these exact skills to a full thesis.</p>'

        # ---------------------------------------------
        # IMAGE INJECTIONS (3 per article)
        # ---------------------------------------------
        images = []
        if item['id'] == 'BEGINNER-01':
            images = [
                '<img src="/images/blog/beginner-roadmap/research-journey-overview.webp" alt="Research journey overview showing the progression from an initial interest to final data analysis" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/project-planning-workflow.webp" alt="Beginner research project planning workflow emphasizing iterative decision making over rigid linear steps" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/idea-vs-researchable-project.webp" alt="Comparison diagram illustrating a vague research idea versus a highly specific, defensible research project" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-02':
            images = [
                '<img src="/images/blog/beginner-roadmap/topic-selection-decision-framework.webp" alt="Research topic selection decision framework combining personal interest, literature gaps, feasibility, and resource access" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/broad-to-narrow-topic-funnel.webp" alt="Diagram showing the narrowing process from a broad subject area to a specific, researchable topic" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/topic-feasibility-checklist.webp" alt="Feasibility checklist framework evaluating data access, participant availability, and time constraints" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-03':
            images = [
                '<img src="/images/blog/beginner-roadmap/idea-to-problem-evolution.webp" alt="Flowchart tracing the evolution from a vague interest to a concrete idea, topic, problem, and specific research question" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/weak-vs-strong-problem-statement.webp" alt="Visual comparison distinguishing a weak, opinion-based problem statement from a defensible, evidence-backed research problem" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/research-problem-construction.webp" alt="Framework for constructing a research problem detailing context, existing evidence, identified gap, and the study need" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-04':
            images = [
                '<img src="/images/blog/beginner-roadmap/question-objective-hypothesis-alignment.webp" alt="Alignment matrix diagram showing the direct relationship between a research question, its actionable objectives, and testable hypotheses" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/quant-vs-qual-question-structure.webp" alt="Comparison chart highlighting the structural differences between quantitative predictive questions and qualitative exploratory questions" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/hypothesis-testing-logic.webp" alt="Visual explanation of hypothesis testing logic, separating the null hypothesis from the alternative hypothesis" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-05':
            images = [
                '<img src="/images/blog/beginner-roadmap/literature-search-workflow.webp" alt="Comprehensive literature search workflow from keyword selection to database screening and citation management" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/anatomy-of-research-paper.webp" alt="Annotated diagram explaining the anatomy of an academic research paper, including abstract, methodology, and discussion sections" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/beginner-reading-strategy.webp" alt="Strategic reading workflow for beginners emphasizing abstract and conclusion screening before full-text reading" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-06':
            images = [
                '<img src="/images/blog/beginner-roadmap/literature-review-workflow.webp" alt="Iterative workflow for conducting a literature review, moving from source gathering to thematic synthesis" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/summary-vs-synthesis.webp" alt="Visual comparison clearly differentiating a chronological list of summaries from a thematic, integrated synthesis of literature" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/thematic-literature-organization.webp" alt="Diagram illustrating how to organize literature sources by themes and methodological debates rather than by author or year" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-07':
            images = [
                '<img src="/images/blog/beginner-roadmap/research-design-decision-tree.webp" alt="Decision framework helping researchers choose between qualitative, quantitative, and mixed-method designs based on their research question" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/qual-vs-quant-comparison.webp" alt="Detailed comparison table visualizing the epistemological and practical differences between qualitative and quantitative methodologies" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/research-alignment-chain.webp" alt="Methodological alignment chain connecting the research problem to data collection instruments and analysis techniques" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]
        elif item['id'] == 'BEGINNER-08':
            images = [
                '<img src="/images/blog/beginner-roadmap/data-analysis-workflow.webp" alt="Complete data workflow demonstrating the transition from raw data collection to cleaning, coding, analysis, and final interpretation" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/messy-vs-clean-dataset.webp" alt="Visual representation of a messy, raw dataset compared to a cleaned, analysis-ready structured dataset" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />',
                '<img src="/images/blog/beginner-roadmap/analysis-pathways.webp" alt="Diagram showing the divergent pathways for quantitative statistical analysis versus qualitative thematic extraction" style="margin: 2rem 0; width: 100%; border-radius: 8px;" />'
            ]

        parts = re.split(r'(<h[23]>)', content)
        if len(parts) >= 12:
            parts[3] = images[0] + '\n' + parts[3]
            parts[7] = images[1] + '\n' + parts[7]
            parts[11] = images[2] + '\n' + parts[11]
            content = ''.join(parts)
        else:
            content += '\n' + '\n'.join(images)

        item['content'] = content

    with open('seed_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    main()
