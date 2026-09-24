import os

svg_base = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="auto" style="background: linear-gradient(135deg, #1a1a24, #0d0d12); border-radius: 12px; font-family: 'Space Grotesk', sans-serif, system-ui;">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B470" />
      <stop offset="100%" stop-color="#C5A059" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#C5A059" />
    </marker>
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
arrow_down = '<path d="M {x} {y1} L {x} {y2}" stroke="rgba(197,160,89,0.6)" stroke-width="3" marker-end="url(#arrow)" />'

diagrams = {
    # Article 1
    "masters-topic-feasibility-matrix": ("Feasibility Matrix", "Evaluating Topic Scope vs Resources", ""),
    "topic-scope-funnel": ("Scope Funnel", "Discipline -> Domain -> Niche -> Problem", ""),
    "masters-vs-undergrad-topic": ("Master's vs Undergrad Topic", "Complexity & Contribution Depth", ""),
    
    # Article 2
    "types-of-research-gaps": ("Types of Gaps", "Empirical | Methodological | Theoretical | Contextual", ""),
    "gap-identification-workflow": ("Gap Workflow", "Literature -> Contradictions -> Proposed Study", ""),
    "literature-mapping-matrix": ("Literature Matrix", "Mapping what is known vs unknown", ""),
    
    # Article 3
    "descriptive-vs-critical-synthesis": ("Synthesis Progression", "Summary (A+B) vs Synthesis (A opposes B due to X)", ""),
    "thematic-synthesis-matrix": ("Thematic Matrix", "Grouping by Concept, not by Author", ""),
    "evidence-evaluation-framework": ("Evaluating Evidence", "Methodological Rigor & Relevance", ""),
    
    # Article 4
    "conceptual-vs-theoretical-framework": ("Conceptual vs Theoretical", "Constructs & Variables vs Established Theory", ""),
    "variables-constructs-mapping": ("Construct Mapping", "Independent -> Mediating -> Dependent", ""),
    "framework-to-methodology-alignment": ("Framework Alignment", "Theory dictates Methodological choices", ""),
    
    # Article 5
    "masters-research-design-decision-tree": ("Design Decision Tree", "Research Question -> Methodological Paradigm", ""),
    "methodological-justification-framework": ("Justification Framework", "Why this method and not another?", ""),
    "mixed-methods-typology": ("Mixed Methods Typology", "Sequential Explanatory vs Exploratory vs Convergent", ""),
    
    # Article 6
    "probability-vs-nonprobability-sampling": ("Sampling Branches", "Random/Stratified vs Purposive/Snowball", ""),
    "sample-size-determination-factors": ("Sample Size Factors", "Power, Effect Size, Population, Design", ""),
    "sampling-bias-mitigation": ("Bias Mitigation", "Selection Bias vs Response Bias", ""),
    
    # Article 7
    "data-analysis-interpretation-cycle": ("Analysis Cycle", "Clean -> Analyze -> Interpret -> Contextualize", ""),
    "statistical-significance-vs-practical-importance": ("Significance vs Importance", "p-value vs Effect Size", ""),
    "qualitative-thematic-coding-workflow": ("Qualitative Coding", "Familiarization -> Codes -> Themes -> Narrative", ""),
    
    # Article 8
    "results-vs-discussion-structure": ("Results vs Discussion", "What you found vs What it means", ""),
    "thesis-defense-preparation-matrix": ("Defense Matrix", "Methodological defense and Limitations handling", ""),
    "contribution-to-knowledge-framework": ("Contribution Framework", "How your findings advance the field", "")
}

os.makedirs('public/images/blog/masters-roadmap', exist_ok=True)

for name, (t, sub, c) in diagrams.items():
    if not c:
        # Generate default box flow if no custom content
        c = box.format(x=50, y=20, w=200, h=80) + text.format(tx=150, ty=65, color="#fff", sz=18, fw="bold", t="Concept A") + \
            arrow.format(x1=270, x2=380, y=60) + \
            box.format(x=400, y=20, w=200, h=80) + text.format(tx=500, ty=65, color="#fff", sz=18, fw="bold", t="Concept B")
    
    svg = svg_base.format(title=t, subtitle=sub, content=c)
    with open(f'public/images/blog/masters-roadmap/{name}.svg', 'w', encoding='utf-8') as f:
        f.write(svg)

print("Generated 24 SVG images for Master's cluster.")
