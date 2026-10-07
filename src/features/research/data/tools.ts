export interface ResearchTool {
  name: string;
  slug: string;
  description: string;
  category: string;
  href: string;
  status: "available" | "planned";
  relatedTerms?: string[];
  relatedArticles?: string[];
}

export const researchTools: ResearchTool[] = [
  {
    name: "Statistical Test Selector",
    slug: "statistical-test-selector",
    description: "Not sure which statistical test fits your research question? Use this selector to narrow down appropriate tests based on your variables, groups, and study design.",
    category: "Statistics & Data Analysis",
    href: "/tools/statistical-test-selector",
    status: "available",
    relatedTerms: [
      "p-value",
      "statistical-significance",
      "anova",
      "t-test",
      "chi-square-test",
      "correlation",
      "regression",
      "alternative-hypothesis"
    ],
    relatedArticles: []
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    description: "Convert your local GPA scale to international standards (e.g., 4.0 scale or UK percentages) for postgraduate applications and research scholarship planning.",
    category: "Academic Utilities",
    href: "/tools/gpa-calculator",
    status: "available",
    relatedTerms: [
      "academic-integrity"
    ],
    relatedArticles: []
  },
  {
    name: "Scholarship Readiness Check",
    slug: "scholarship-readiness",
    description: "Evaluate your academic profile and research potential against top global scholarships like Chevening, Erasmus, and PTDF.",
    category: "Academic Utilities",
    href: "/scholarship-check",
    status: "available",
    relatedTerms: [],
    relatedArticles: []
  },
  {
    name: "Sample Size Calculator",
    slug: "sample-size-calculator",
    description: "Calculate the exact sample size needed for your study to achieve adequate statistical precision and confidence.",
    category: "Research Planning",
    href: "/tools/sample-size-calculator",
    status: "available",
    relatedTerms: [
      "sample-size",
      "population",
      "sample",
      "confidence-interval",
      "margin-of-error"
    ],
    relatedArticles: []
  },
  {
    name: "Statistical Power Calculator",
    slug: "statistical-power-calculator",
    description: "Determine the statistical power of your hypothesis tests based on your anticipated effect size and sample size.",
    category: "Statistics & Data Analysis",
    href: "#",
    status: "planned"
  },
  {
    name: "Methodology Builder",
    slug: "methodology-builder",
    description: "Step-by-step guidance to choose the right research philosophy, design, and approach for your thesis.",
    category: "Research Planning",
    href: "#",
    status: "planned"
  }
];
