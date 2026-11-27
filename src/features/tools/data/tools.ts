// The tools listed on /tools. Shared by the catalog and the page's structured data.
export const TOOLS = [
  {
    id: 'gpa-calculator',
    title: 'GPA Converter & Calculator',
    description: 'Convert a Nigerian 5.0-scale GPA to an estimated 4.0 GPA and degree classification for international applications.',
    icon: 'cap' as const,
    href: '/tools/gpa-calculator',
    category: 'Calculators',
    tag: 'Academic Planning',
    feature: '4.0 GPA and Degree Class',
  },
  {
    id: 'statistical-test-selector',
    title: 'Statistical Test Selector',
    description: 'Answer a few guided questions about your variables and study design to identify the most suitable statistical test.',
    icon: 'target' as const,
    href: '/tools/statistical-test-selector',
    category: 'Research',
    tag: 'Decision Engine',
    feature: 'Parametric & Non-Parametric Tests',
  },
  {
    id: 'scholarship-readiness',
    title: 'Scholarship Readiness Check',
    description: 'Review your academic profile against real application criteria for DAAD, Chevening, Erasmus, and Fulbright.',
    icon: 'globe' as const,
    href: '/scholarship-check',
    category: 'Applications',
    tag: 'Global Assessment',
    feature: 'Under 15-Minute Personalized Scoring',
  },
];
