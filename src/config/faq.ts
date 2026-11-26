import type { FaqCategory } from '@/components/FAQ';

/** Shared by the FAQ page and the AI knowledge catalog. */
export const FAQ_SECTIONS: FaqCategory[] = [
  {
    category: 'Research Support',
    items: [
      { q: 'What research methodology support do you provide?', a: 'We guide you through selecting and justifying your research design, whether quantitative, qualitative, or mixed-methods. Our support extends from formulating the initial research gap to structuring the final methodology chapter.' },
      { q: 'Do you support PhD-level research?', a: 'Yes. Our team frequently assists PhD candidates and early-career researchers with complex thesis structuring, theoretical framework alignment, and rigorous literature reviews tailored to institutional standards.' },
      { q: 'Can you help with quantitative and qualitative research?', a: 'Absolutely. We support both paradigms. For qualitative research, we assist with thematic analysis and NVivo. For quantitative research, we handle survey design, data collection strategies, and advanced statistical analysis.' },
    ],
  },
  {
    category: 'Data Analysis',
    items: [
      { q: 'What statistical tools do you support?', a: 'We specialize in SPSS, R, Python, Stata, and EViews. The choice of tool depends entirely on your research objectives, dataset size, and institutional requirements.' },
      { q: 'When should I use SPSS vs R or Python?', a: 'SPSS is excellent for standard social science surveys and straightforward hypothesis testing. R and Python are preferred for advanced econometric modelling, large datasets, and custom visualizations. We will advise you on the best tool during our consultation.' },
      { q: 'Can you help interpret statistical results?', a: 'Yes. We don\'t just run the numbers; we provide comprehensive write-ups interpreting what the outputs (like p-values and confidence intervals) mean in the context of your specific research questions.' },
      { q: 'Do you support advanced statistical modelling?', a: 'Yes, including Structural Equation Modelling (SEM), time-series forecasting, regression analysis, and multivariate testing.' },
    ],
  },
  {
    category: 'Academic Writing & Editing',
    items: [
      { q: 'Do you edit theses and dissertations?', a: 'Yes, we provide comprehensive developmental editing and proofreading for full theses, dissertations, and journal articles. We focus on academic tone, flow, argument structure, and strict adherence to formatting guidelines.' },
      { q: 'How do you handle plagiarism and AI detection?', a: 'We use official Turnitin instructor reports to check your work. If your similarity or AI scores are high, our human editors can restructure arguments and rephrase text at the root level to ensure academic integrity.' },
      { q: 'Do you write Statements of Purpose (SOPs) or CVs?', a: 'Yes, we craft tailored SOPs, academic CVs, and professional resumes designed to meet international standards for graduate admissions and competitive academic roles.' },
    ],
  },
  {
    category: 'Scholarships',
    items: [
      { q: 'What is the Scholarship Readiness Checker?', a: 'Our free Scholarship Readiness Checker evaluates your profile against the actual selection criteria for major programmes (like Chevening, Erasmus, and DAAD). It provides a personalized readiness score and an actionable preparation plan. You can access it at the Scholarship Hub.' },
      { q: 'Can you help me prepare my scholarship application?', a: 'Yes, we offer strategic guidance for scholarship applications, including refining your essays, aligning your narrative with the funding body\'s goals, and reviewing your application package.' },
    ],
  },
  {
    category: 'Repository / Research',
    items: [
      { q: 'What is the Research Repository?', a: 'The Cee Writing Research Repository is an open archive of past methodologies, academic findings, and project frameworks. It is designed to serve as a reference point and inspiration for your own academic work.' },
      { q: 'Can I access full research papers in the repository?', a: 'Yes, the repository hosts public summaries and full-text references for selected academic projects, allowing you to study real-world examples of rigorous academic writing.' },
    ],
  },
];
