import re

def update_roadmaps():
    with open('src/config/roadmaps.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    if 'masters-thesis' in content:
        print("masters-thesis already in roadmaps.ts")
        return

    masters_roadmap = """
  'masters-thesis': {
    id: 'masters-thesis',
    title: 'Master\\'s Thesis',
    description: 'Deep dive into complex research designs, advanced statistical analysis, and critical synthesis to defend a rigorous Master\\'s thesis.',
    audience: 'Master\\'s students, postgraduate researchers',
    icon: '🎓',
    steps: [
      {
        step: 1,
        slug: 'choose-masters-research-topic',
        short_description: 'Move beyond broad interests and identify a focused, feasible, and defensible Master\\'s-level topic.'
      },
      {
        step: 2,
        slug: 'identify-research-gap-masters-thesis',
        short_description: 'Learn to distinguish between "few studies exist" and a meaningful empirical, theoretical, or methodological gap.'
      },
      {
        step: 3,
        slug: 'critical-literature-review-masters-thesis',
        short_description: 'Transition from descriptive summaries to critical synthesis by evaluating evidence and thematic relationships.'
      },
      {
        step: 4,
        slug: 'conceptual-theoretical-framework-masters',
        short_description: 'Position your study conceptually and learn how theories dictate methodological choices without "theory dumping".'
      },
      {
        step: 5,
        slug: 'choose-research-design-masters-thesis',
        short_description: 'Justify your research design based on your research questions rather than software familiarity or convenience.'
      },
      {
        step: 6,
        slug: 'sample-size-sampling-strategy-masters',
        short_description: 'Treat sampling as a methodological decision. Master probability logic, power, and selection bias.'
      },
      {
        step: 7,
        slug: 'analyse-interpret-masters-thesis-data',
        short_description: 'Connect methodology to analytical reasoning. Move from raw software output to scholarly insight.'
      },
      {
        step: 8,
        slug: 'write-defend-masters-thesis',
        short_description: 'Turn your findings into a scholarly argument. Interpret results, discuss limitations, and prepare for your defense.'
      }
    ]
  },"""

    # Insert it right before the last closing brace of ROADMAPS
    # The ROADMAPS object is exported as: export const ROADMAPS: Record<string, Roadmap> = { ... };
    
    # Let's find the closing brace of ROADMAPS object.
    # It might be safer to replace `export const ROADMAPS: Record<string, Roadmap> = {`
    # with `export const ROADMAPS: Record<string, Roadmap> = {` + masters_roadmap
    
    content = content.replace(
        "export const ROADMAPS: Record<string, Roadmap> = {",
        "export const ROADMAPS: Record<string, Roadmap> = {" + masters_roadmap
    )
    
    with open('src/config/roadmaps.ts', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Added masters-thesis to roadmaps.ts")

update_roadmaps()
