export interface RoadmapStep {
  step: number;
  slug: string;
  short_description: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  audience: string;
  icon: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Record<string, Roadmap> = {
  'masters-thesis': {
    id: 'masters-thesis',
    title: 'Master\'s Thesis',
    description: 'Deep dive into complex research designs, advanced statistical analysis, and critical synthesis to defend a rigorous Master\'s thesis.',
    audience: 'Master\'s students, postgraduate researchers',
    icon: '🎓',
    steps: [
      {
        step: 1,
        slug: 'choose-masters-research-topic',
        short_description: 'Move beyond broad interests and identify a focused, feasible, and defensible Master\'s-level topic.'
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
  },
  'undergrad-dissertation': {
    id: 'undergrad-dissertation',
    title: 'Undergraduate Dissertation',
    description: 'A complete step-by-step learning path guiding you from topic selection through to writing your final undergraduate dissertation chapter.',
    audience: 'Undergraduate students, final-year researchers',
    icon: '🎓',
    steps: [
      {
        step: 1,
        slug: 'how-to-choose-final-year-project-topic-nigeria',
        short_description: 'Learn how to identify a viable, researchable topic and narrow down broad interests into a feasible study.'
      },
      {
        step: 2,
        slug: 'undergraduate-dissertation-proposal',
        short_description: 'Master the structure of a dissertation proposal, including problem statements, objectives, and significance.'
      },
      {
        step: 3,
        slug: 'how-to-write-literature-review-final-year-project-nigeria',
        short_description: 'Discover how to find, organize, and synthesize academic sources to identify gaps and build theoretical foundations.'
      },
      {
        step: 4,
        slug: 'research-methodology-chapter',
        short_description: 'Understand how to choose and justify your research design, sampling strategy, and methodological approach.'
      },
      {
        step: 5,
        slug: 'research-ethics-approval-undergraduate',
        short_description: 'Navigate informed consent, confidentiality, and institutional ethical approval before touching your data.'
      },
      {
        step: 6,
        slug: 'data-collection-undergraduate-dissertation',
        short_description: 'Practical guidance on developing instruments and collecting primary or secondary data ethically and accurately.'
      },
      {
        step: 7,
        slug: 'statistical-analysis-undergraduate-research',
        short_description: 'Learn the framework for analyzing data, testing hypotheses, and choosing the right tests for your variables.'
      },
      {
        step: 8,
        slug: 'final-year-project-nigeria-guide',
        short_description: 'Bring it all together: how to structure, format, and write up the final dissertation document.'
      }
    ]
  },
  'first-project': {
    id: 'first-project',
    title: 'First Research Project',
    description: 'A practical, step-by-step beginner curriculum. Move from an unclear research idea to understanding how to design and execute a defensible first research project.',
    audience: 'Beginner researchers, first-time students',
    icon: '🌱',
    steps: [
      {
        step: 1,
        slug: 'start-first-research-project-beginners',
        short_description: 'Understand what a research project actually consists of and how to turn uncertainty into a sequence of decisions.'
      },
      {
        step: 2,
        slug: 'choose-research-topic-beginners',
        short_description: 'Learn how to evaluate a topic for feasibility, resources, and relevance—not just how interesting it sounds.'
      },
      {
        step: 3,
        slug: 'turn-research-idea-into-problem',
        short_description: 'Progression from a vague idea to a defensible research problem and finding the actual research gap.'
      },
      {
        step: 4,
        slug: 'write-research-questions-objectives-hypotheses',
        short_description: 'Write aligned research questions, objectives, and hypotheses, and understand when hypotheses are appropriate.'
      },
      {
        step: 5,
        slug: 'find-read-research-papers-beginners',
        short_description: 'Develop a strategic literature search workflow, learn how to screen papers, and read them strategically.'
      },
      {
        step: 6,
        slug: 'write-literature-review-first-research-project',
        short_description: 'Synthesize research instead of just summarizing it. Understand themes, contradictions, and methodological differences.'
      },
      {
        step: 7,
        slug: 'choose-research-methodology-first-study',
        short_description: 'Let your research question determine your methodology. Covering qualitative, quantitative, mixed methods, and ethics.'
      },
      {
        step: 8,
        slug: 'collect-analyze-data-first-research-project',
        short_description: 'A realistic overview of collecting, organizing, cleaning, and analyzing your data without getting lost in software.'
      }
    ]
  }
};

export function getRoadmapBySlug(slug: string): Roadmap | null {
  return ROADMAPS[slug] || null;
}

export function getRoadmapsForArticle(articleSlug: string): { roadmap: Roadmap, step: RoadmapStep }[] {
  const matches = [];
  for (const roadmapId in ROADMAPS) {
    const roadmap = ROADMAPS[roadmapId];
    const step = roadmap.steps.find(s => s.slug === articleSlug);
    if (step) {
      matches.push({ roadmap, step });
    }
  }
  return matches;
}
