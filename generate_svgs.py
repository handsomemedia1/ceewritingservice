import os

svg_base = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="auto" style="background: linear-gradient(135deg, #1a1a24, #0d0d12); border-radius: 12px; font-family: 'Space Grotesk', sans-serif, system-ui;">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B470" />
      <stop offset="100%" stop-color="#C5A059" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="none" rx="12" />
  
  <text x="40" y="60" fill="#C5A059" font-size="24" font-weight="bold" letter-spacing="1">{title}</text>
  <line x1="40" y1="80" x2="760" y2="80" stroke="rgba(197,160,89,0.3)" stroke-width="2" />
  
  <text x="40" y="120" fill="#ffffff" font-size="18" opacity="0.8">{subtitle}</text>
  
  <g transform="translate(40, 160)">
    {content}
  </g>
</svg>"""

box = '<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="rgba(255,255,255,0.05)" stroke="url(#gold)" stroke-width="2"/>'
text = '<text x="{tx}" y="{ty}" fill="{color}" font-size="{sz}" font-weight="{fw}" text-anchor="middle">{t}</text>'
arrow = '<path d="M {x1} {y} L {x2} {y}" stroke="rgba(197,160,89,0.6)" stroke-width="3" marker-end="url(#arrow)" />'
arrow_def = '<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#C5A059" /></marker>'

# Just generating basic instructional diagrams
diagrams = {
    "research-journey-overview": ("Research Journey", "The complete 8-step path from idea to final analysis.", 
                                  box.format(x=0, y=0, w=150, h=60) + text.format(tx=75, ty=35, color="#fff", sz=16, fw="bold", t="1. Topic") +
                                  box.format(x=200, y=0, w=150, h=60) + text.format(tx=275, ty=35, color="#fff", sz=16, fw="bold", t="2. Literature") +
                                  box.format(x=400, y=0, w=150, h=60) + text.format(tx=475, ty=35, color="#fff", sz=16, fw="bold", t="3. Method") +
                                  box.format(x=600, y=0, w=150, h=60) + text.format(tx=675, ty=35, color="#fff", sz=16, fw="bold", t="4. Data")),
    "project-planning-workflow": ("Project Planning", "Breaking down the timeline.", box.format(x=0,y=0,w=720,h=100) + text.format(tx=360,ty=55,color="#fff",sz=20,fw="bold",t="Sequential Planning is Key")),
    "idea-vs-researchable-project": ("Idea vs. Project", "Ideas are broad. Projects are specific.", ""),
    "topic-selection-decision-framework": ("Topic Selection", "How to narrow down.", ""),
    "broad-to-narrow-topic-funnel": ("The Topic Funnel", "Broad Interest -> Context -> Specific Problem", ""),
    "topic-feasibility-checklist": ("Feasibility Checklist", "Time | Data Access | Resources", ""),
    "idea-to-problem-evolution": ("Idea -> Problem", "Evolution of a research concept.", ""),
    "weak-vs-strong-problem-statement": ("Problem Statements", "Weak (Vague) vs Strong (Actionable)", ""),
    "research-problem-construction": ("Constructing the Problem", "Gap + Context + Significance", ""),
    "question-objective-hypothesis-alignment": ("Alignment Matrix", "Questions must align directly with objectives.", ""),
    "quant-vs-qual-question-structure": ("Quant vs Qual Questions", "What/How (Qual) vs Is/Does (Quant)", ""),
    "hypothesis-testing-logic": ("Hypothesis Logic", "Null vs Alternative", ""),
    "literature-search-workflow": ("Search Workflow", "Keywords -> Databases -> Screening", ""),
    "anatomy-of-research-paper": ("Anatomy of a Paper", "Abstract -> Intro -> Method -> Results -> Discussion", ""),
    "beginner-reading-strategy": ("Reading Strategy", "Read Abstract, then Conclusion, then Methods.", ""),
    "literature-review-workflow": ("Review Workflow", "Synthesize, don't just summarize.", ""),
    "summary-vs-synthesis": ("Summary vs Synthesis", "A+B+C vs Theme 1 (A,C) & Theme 2 (B)", ""),
    "thematic-literature-organization": ("Thematic Organization", "Group by concept, not by author.", ""),
    "research-design-decision-tree": ("Decision Tree", "Choosing your methodology.", ""),
    "qual-vs-quant-comparison": ("Qualitative vs Quantitative", "Words vs Numbers", ""),
    "research-alignment-chain": ("Alignment Chain", "Problem -> Question -> Methodology -> Analysis", ""),
    "data-analysis-workflow": ("Analysis Workflow", "Raw Data -> Clean -> Analyze", ""),
    "messy-vs-clean-dataset": ("Messy vs Clean Data", "Rows are observations, columns are variables.", ""),
    "analysis-pathways": ("Analysis Pathways", "Descriptive vs Inferential", "")
}

os.makedirs('public/images/blog/beginner-roadmap', exist_ok=True)

for name, (t, sub, c) in diagrams.items():
    if not c:
        # Generate a default generic instructional box if empty
        c = f'<defs>{arrow_def}</defs>' + box.format(x=50, y=20, w=200, h=80) + text.format(tx=150, ty=65, color="#fff", sz=20, fw="bold", t="Concept A") + \
            arrow.format(x1=270, x2=380, y=60) + \
            box.format(x=400, y=20, w=200, h=80) + text.format(tx=500, ty=65, color="#fff", sz=20, fw="bold", t="Concept B")
    
    svg = svg_base.format(title=t, subtitle=sub, content=c)
    with open(f'public/images/blog/beginner-roadmap/{name}.svg', 'w', encoding='utf-8') as f:
        f.write(svg)

print("Generated 24 SVG images.")
