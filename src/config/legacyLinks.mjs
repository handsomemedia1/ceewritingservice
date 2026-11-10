/**
 * Old or mistyped internal URLs and where they now live. Used in two places:
 * next.config.mjs (permanent redirects) and the article pipeline (rewrites links
 * inside stored article HTML so readers and crawlers never take a redirect hop).
 */
export const LEGACY_LINKS = {
  '/research/tools': '/tools',
  '/contact-us': '/contact',
  '/masters-roadmap': '/research/path/masters-thesis',
  '/quantitative-vs-qualitative-research': '/blog/quantitative-vs-qualitative-research',
  '/how-to-write-a-literature-review': '/blog/write-literature-review-first-research-project',
  '/undergraduate-dissertation-roadmap-step-1-topic': '/research/path/undergrad-dissertation',

  '/blog/how-to-choose-the-right-statistical-test': '/blog/choose-statistical-test',
  '/blog/publishing-your-first-journal-article': '/blog/literature-review-published',
  '/blog/literature-review-that-gets-published': '/blog/literature-review-published',
  '/blog/cochrans-sample-size-formula': '/blog/cochran-sample-size-formula',
  '/blog/identify-research-gap': '/blog/identify-research-gap-masters-thesis',
  '/blog/masters-thesis-roadmap': '/research/path/masters-thesis',
  '/blog/developing-research-methodology': '/blog/choose-research-methodology-first-study',
  '/blog/survey-design-best-practices': '/blog/data-collection-undergraduate-dissertation',
  '/blog/data-analysis/spss-data-preparation-guide': '/blog/test-normality-spss',
  '/blog/data-analysis/python-pandas-cleaning': '/blog/analyse-survey-data-python-likert-scale',
  '/blog/data-analysis/descriptive-statistics-r-studio': '/blog/multiple-regression-r',
  '/blog/data-analysis/anova-guide-masters-thesis': '/blog/spss-anova',
  '/blog/data-analysis/multiple-regression-interpretation': '/blog/how-to-interpret-spss-regression-output-without-mistakes',
  '/blog/data-analysis/qualitative-coding-software-comparison': '/blog/quantitative-vs-qualitative-research',

  '/research/path/masters-thesis/critical-literature-review': '/blog/critical-literature-review-masters-thesis',
  '/research/path/masters-thesis/analyse-and-interpret-data': '/blog/analyse-interpret-masters-thesis-data',
  '/research/path/masters-thesis/research-design': '/blog/choose-research-design-masters-thesis',

  '/services/academic-writing': '/services',
  '/services/academic-editing': '/services',
  '/services/research-consultation': '/contact',
  '/services/methodology-consulting': '/contact',
  '/services/dissertation-consulting': '/contact',
  '/services/dissertation-editing': '/services',
  '/services/statistical-analysis': '/research/data-analysis',
};
