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
