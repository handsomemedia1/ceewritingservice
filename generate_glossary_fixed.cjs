const fs = require('fs');
const path = require('path');

const terms = [
  {
    slug: "p-value",
    term: "P-value",
    category: "Statistics",
    shortDefinition: "A measure of the probability that an observed difference could have occurred just by random chance.",
    definition: "The p-value (probability value) is a number ranging from 0 to 1 that indicates the likelihood of observing the data, or something more extreme, assuming that the null hypothesis is true. It is a foundational concept in frequentist statistics used to determine statistical significance.",
    whyItMatters: "It helps researchers decide whether to reject or fail to reject the null hypothesis. A low p-value suggests the data did not occur by random chance.",
    example: "In a medical trial comparing a new drug to a placebo, a p-value of 0.03 means there is only a 3% probability of seeing the observed difference in recovery times if the drug actually had no effect.",
    interpretation: "If p < 0.05 (the standard alpha level), the result is generally considered statistically significant. If p >= 0.05, there is insufficient evidence to conclude a significant effect.",
    commonMistakes: [
      "Believing a p-value tells you the probability that the alternative hypothesis is true.",
      "Assuming a p-value of 0.001 indicates a large or important effect (it only indicates statistical significance, not effect size).",
      "Using p-hacking to artificially lower the p-value."
    ],
    relatedTerms: ["null-hypothesis", "statistical-significance", "type-i-error", "effect-size"],
    relatedArticles: [],
    relatedTools: ["/tools/statistical-test-selector"],
    relatedServices: ["/services/data-analysis"]
  },
  {
    slug: "null-hypothesis",
    term: "Null Hypothesis",
    category: "Statistics",
    shortDefinition: "The default assumption that there is no relationship, no difference, or no effect between variables.",
    definition: "The null hypothesis (denoted as H0) is a specific, testable statement used in statistics predicting that any observed difference or relationship in the sample data is due to random chance rather than a true underlying effect.",
    whyItMatters: "It provides a baseline for statistical testing. The entire framework of hypothesis testing is built around trying to reject this default assumption with sufficient evidence.",
    example: "If testing whether tutoring improves test scores, the null hypothesis states: 'Tutoring has no effect on test scores (the mean score of tutored students equals the mean score of untutored students).'",
    interpretation: "You never 'prove' the null hypothesis true; you only 'fail to reject' it due to lack of evidence.",
    commonMistakes: [
      "Accepting the null hypothesis as absolute truth when p > 0.05.",
      "Confusing the null hypothesis with the research (alternative) hypothesis."
    ],
    relatedTerms: ["p-value", "alternative-hypothesis", "statistical-power"],
    relatedArticles: [],
    relatedTools: ["/tools/statistical-test-selector"],
    relatedServices: []
  },
  {
    slug: "anova",
    term: "ANOVA (Analysis of Variance)",
    category: "Statistics",
    shortDefinition: "A statistical test used to compare the means of three or more groups to see if they are significantly different.",
    definition: "Analysis of Variance (ANOVA) is a collection of statistical models and their associated estimation procedures used to analyze the differences among group means in a sample. It checks if the variance between the groups is greater than the variance within the groups.",
    whyItMatters: "While a t-test can compare two groups, ANOVA allows researchers to compare three or more groups simultaneously without increasing the risk of a Type I error (false positive) that would occur by running multiple t-tests.",
    example: "A researcher wants to know if there is a difference in the effectiveness of three different diets (Diet A, Diet B, Diet C) on weight loss. ANOVA will test if the mean weight loss significantly differs across these three diet groups.",
    interpretation: "A significant ANOVA (p < 0.05) tells you that at least one group differs from the others, but it does not tell you which specific groups differ. You must run post-hoc tests (like Tukey's HSD) to find out.",
    commonMistakes: [
      "Using ANOVA when the data is heavily skewed or violates the assumption of normality without checking robustness.",
      "Failing to run post-hoc tests after finding a significant main effect.",
      "Ignoring the assumption of homogeneity of variances (homoscedasticity)."
    ],
    relatedTerms: ["t-test", "p-value", "homoscedasticity"],
    relatedArticles: [],
    relatedTools: ["/tools/statistical-test-selector"],
    relatedServices: ["/services/data-analysis"]
  },
  {
    slug: "heteroscedasticity",
    term: "Heteroscedasticity",
    category: "Econometrics",
    shortDefinition: "A condition in statistics where the variance of the errors (residuals) is not constant across all levels of the independent variable.",
    definition: "In regression analysis, heteroscedasticity occurs when the spread or dispersion of the residuals changes as the fitted values change. It violates the classical assumption of Ordinary Least Squares (OLS) regression known as homoscedasticity.",
    whyItMatters: "If residuals are heteroscedastic, OLS estimators remain unbiased, but they are no longer the most efficient (minimum variance). More importantly, the standard errors become biased, which makes hypothesis tests (like t-tests and F-tests) and confidence intervals invalid.",
    example: "Predicting household consumption based on income. Low-income households have very consistent (low variance) consumption because they must spend on necessities. High-income households have high variance in consumption—some save a lot, some spend a lot. The error variance increases with income.",
    interpretation: "Usually detected using residual plots (looking for a funnel shape) or formal tests like the Breusch-Pagan or White test.",
    commonMistakes: [
      "Ignoring heteroscedasticity and reporting standard OLS p-values, which might be artificially low or high.",
      "Confusing heteroscedasticity with autocorrelation."
    ],
    relatedTerms: ["homoscedasticity", "ordinary-least-squares", "residual", "breusch-pagan-test"],
    relatedArticles: [],
    relatedTools: [],
    relatedServices: []
  },
  {
    slug: "epistemology",
    term: "Epistemology",
    category: "Research Methodology",
    shortDefinition: "The branch of philosophy concerned with the nature, origin, and limits of human knowledge.",
    definition: "In research methodology, epistemology refers to the assumptions a researcher makes about what constitutes valid knowledge and how it can be acquired or communicated. It addresses the question: 'How do we know what we know?'",
    whyItMatters: "Your epistemological stance dictates your research design. If you believe knowledge is objective and measurable (Positivism), you will likely use quantitative methods. If you believe knowledge is socially constructed and subjective (Interpretivism), you will likely use qualitative methods.",
    example: "A positivist epistemological approach to studying classroom learning might involve standardized testing and statistical correlation. An interpretivist approach would involve observing classroom dynamics and interviewing students about their experiences.",
    interpretation: "",
    commonMistakes: [
      "Failing to align the chosen research methods with the underlying epistemological assumptions.",
      "Confusing epistemology (how we know) with ontology (what exists to be known)."
    ],
    relatedTerms: ["ontology", "positivism", "interpretivism", "research-paradigm"],
    relatedArticles: [],
    relatedTools: [],
    relatedServices: ["/services/research-proposal", "/services/phd-thesis-writing-doctoral"]
  },
  {
    slug: "research-design",
    term: "Research Design",
    category: "Research Methodology",
    shortDefinition: "The overall strategy or blueprint chosen to integrate the different components of a study in a coherent and logical way.",
    definition: "Research design constitutes the blueprint for the collection, measurement, and analysis of data. It ensures that the research problem is addressed logically and unambiguously. Common designs include experimental, correlational, descriptive, case study, and systematic review.",
    whyItMatters: "A flawed research design will not yield valid or reliable results, regardless of how sophisticated the data analysis is. The design dictates what kind of data can be collected and what conclusions can be drawn.",
    example: "If a researcher wants to prove that a new teaching method causes higher grades, they must use an experimental design (with random assignment and control groups). A correlational design would only show if the method and grades are related, not if one caused the other.",
    interpretation: "",
    commonMistakes: [
      "Choosing a data collection method (like a survey) before deciding on the overarching research design.",
      "Using a descriptive design to make causal claims."
    ],
    relatedTerms: ["research-methodology", "quantitative-research", "qualitative-research", "validity"],
    relatedArticles: [],
    relatedTools: [],
    relatedServices: ["/services/research-proposal", "/services/topic-selection"]
  },
  {
    slug: "cronbach-alpha",
    term: "Cronbach's Alpha",
    category: "Statistics",
    shortDefinition: "A measure used to assess the internal consistency or reliability of a set of scale or test items.",
    definition: "Cronbach's alpha is a coefficient (ranging from 0 to 1) that evaluates how closely related a set of items are as a group. It is considered a measure of scale reliability, determining whether all questions in a survey or questionnaire are measuring the same underlying construct.",
    whyItMatters: "When researchers use a Likert scale questionnaire to measure a latent variable (like 'customer satisfaction' or 'job stress'), they must prove that the multiple questions reliably measure the same concept. Cronbach's alpha provides this statistical proof.",
    example: "A survey uses 5 questions to measure 'Employee Motivation.' If Cronbach's alpha is 0.85, it indicates a high level of internal consistency, meaning the 5 questions reliably measure the same underlying motivation construct.",
    interpretation: "A commonly accepted rule of thumb is that an alpha of 0.70 or higher indicates acceptable reliability. However, values above 0.95 may indicate redundancy (questions are too similar).",
    commonMistakes: [
      "Assuming a high alpha means the scale is unidimensional (measures only one concept); alpha measures consistency, not dimensionality (which requires Factor Analysis).",
      "Failing to remove reverse-coded items before calculating the alpha, resulting in an artificially low or negative score."
    ],
    relatedTerms: ["reliability", "validity", "research-instrument"],
    relatedArticles: [],
    relatedTools: [],
    relatedServices: ["/services/data-analysis", "/services/questionnaire-design"]
  }
];

const extraTerms = [
  "Ontology", "Positivism", "Interpretivism", "Pragmatism",
  "Quantitative Research", "Qualitative Research", "Mixed Methods Research",
  "Deductive Approach", "Inductive Approach", "Abductive Approach",
  "Research Problem", "Research Question", "Research Objective", "Research Hypothesis",
  "Research Gap", "Conceptual Framework", "Theoretical Framework",
  "Literature Review", "Systematic Review",
  "Population", "Sample", "Sampling", "Sampling Frame",
  "Probability Sampling", "Non-Probability Sampling",
  "Simple Random Sampling", "Stratified Sampling", "Cluster Sampling",
  "Systematic Sampling", "Convenience Sampling", "Purposive Sampling", "Snowball Sampling",
  "Census",
  "Validity", "Reliability", "Internal Validity", "External Validity",
  "Construct Validity", "Content Validity", "Criterion Validity",
  "Research Instrument", "Questionnaire", "Interview", "Observation", "Pilot Study",
  "Operationalization",
  "Variable", "Independent Variable", "Dependent Variable", "Control Variable",
  "Confounding Variable", "Mediator", "Moderator",
  "Mean", "Median", "Mode", "Range", "Variance", "Standard Deviation", "Standard Error",
  "Distribution", "Normal Distribution", "Normality", "Skewness", "Kurtosis", "Outlier",
  "Probability", "Confidence Interval", "Confidence Level", "Alternative Hypothesis",
  "Statistical Significance", "Effect Size", "Statistical Power",
  "Type I Error", "Type II Error", "T-test", "Independent Samples T-test", "Paired Samples T-test",
  "ANCOVA", "MANOVA", "Chi-Square Test", "Correlation", "Pearson Correlation", "Spearman Correlation",
  "Regression", "Linear Regression", "Multiple Regression", "Logistic Regression",
  "R-squared", "Adjusted R-squared", "Residual", "Multicollinearity",
  "Homoscedasticity", "Autocorrelation", "Covariance",
  "Stationarity", "Unit Root", "Cointegration", "Partial Autocorrelation",
  "ARIMA", "VAR", "VECM", "Granger Causality", "Error Correction Model",
  "Ordinary Least Squares", "Endogeneity", "Exogeneity", "Instrumental Variable",
  "Hausman Test", "Breusch-Pagan Test", "Durbin-Watson Test", "Augmented Dickey-Fuller Test",
  "Thematic Analysis", "Content Analysis", "Coding", "Open Coding", "Axial Coding", "Selective Coding",
  "Qualitative Coding", "Saturation", "Data Saturation", "Theoretical Saturation",
  "Phenomenology", "Grounded Theory", "Ethnography", "Case Study", "Narrative Research",
  "Reflexivity", "Researcher Positionality",
  "Informed Consent", "Confidentiality", "Anonymity", "Research Ethics",
  "Ethical Approval", "Institutional Review Board", "Research Participant",
  "Vulnerable Population", "Data Protection", "Plagiarism", "Academic Integrity",
  "SPSS", "Stata", "R", "Python", "MATLAB", "NVivo", "Excel",
  "Statistical Software", "Qualitative Data Analysis Software"
];

const categoryMap = {
  "Ontology": "Research Methodology", "Positivism": "Research Methodology", "Interpretivism": "Research Methodology",
  "Pragmatism": "Research Methodology", "Quantitative Research": "Research Methodology",
  "Qualitative Research": "Qualitative Research", "Mixed Methods Research": "Research Methodology",
  "Deductive Approach": "Research Methodology", "Inductive Approach": "Research Methodology",
  "Abductive Approach": "Research Methodology", "Research Problem": "Research Methodology",
  "Research Question": "Research Methodology", "Research Objective": "Research Methodology",
  "Research Hypothesis": "Research Methodology", "Research Gap": "Research Methodology",
  "Conceptual Framework": "Research Methodology", "Theoretical Framework": "Research Methodology",
  "Literature Review": "Research Methodology", "Systematic Review": "Research Methodology",
  "Population": "Research Methodology", "Sample": "Research Methodology", "Sampling": "Research Methodology",
  "Sampling Frame": "Research Methodology", "Probability Sampling": "Research Methodology",
  "Non-Probability Sampling": "Research Methodology", "Simple Random Sampling": "Research Methodology",
  "Stratified Sampling": "Research Methodology", "Cluster Sampling": "Research Methodology",
  "Systematic Sampling": "Research Methodology", "Convenience Sampling": "Research Methodology",
  "Purposive Sampling": "Research Methodology", "Snowball Sampling": "Research Methodology",
  "Census": "Research Methodology", "Validity": "Research Methodology", "Reliability": "Research Methodology",
  "Internal Validity": "Research Methodology", "External Validity": "Research Methodology",
  "Construct Validity": "Research Methodology", "Content Validity": "Research Methodology",
  "Criterion Validity": "Research Methodology", "Research Instrument": "Research Methodology",
  "Questionnaire": "Research Methodology", "Interview": "Qualitative Research", "Observation": "Qualitative Research",
  "Pilot Study": "Research Methodology", "Operationalization": "Research Methodology",
  "Variable": "Research Methodology", "Independent Variable": "Research Methodology",
  "Dependent Variable": "Research Methodology", "Control Variable": "Research Methodology",
  "Confounding Variable": "Research Methodology", "Mediator": "Research Methodology",
  "Moderator": "Research Methodology", "Mean": "Statistics", "Median": "Statistics", "Mode": "Statistics",
  "Range": "Statistics", "Variance": "Statistics", "Standard Deviation": "Statistics",
  "Standard Error": "Statistics", "Distribution": "Statistics", "Normal Distribution": "Statistics",
  "Normality": "Statistics", "Skewness": "Statistics", "Kurtosis": "Statistics", "Outlier": "Statistics",
  "Probability": "Statistics", "Confidence Interval": "Statistics", "Confidence Level": "Statistics",
  "Alternative Hypothesis": "Statistics", "Statistical Significance": "Statistics", "Effect Size": "Statistics",
  "Statistical Power": "Statistics", "Type I Error": "Statistics", "Type II Error": "Statistics",
  "T-test": "Statistics", "Independent Samples T-test": "Statistics", "Paired Samples T-test": "Statistics",
  "ANCOVA": "Statistics", "MANOVA": "Statistics", "Chi-Square Test": "Statistics", "Correlation": "Statistics",
  "Pearson Correlation": "Statistics", "Spearman Correlation": "Statistics", "Regression": "Statistics",
  "Linear Regression": "Statistics", "Multiple Regression": "Statistics", "Logistic Regression": "Statistics",
  "R-squared": "Statistics", "Adjusted R-squared": "Statistics", "Residual": "Statistics",
  "Multicollinearity": "Statistics", "Homoscedasticity": "Statistics", "Autocorrelation": "Econometrics",
  "Covariance": "Statistics", "Stationarity": "Econometrics", "Unit Root": "Econometrics",
  "Cointegration": "Econometrics", "Partial Autocorrelation": "Econometrics", "ARIMA": "Econometrics",
  "VAR": "Econometrics", "VECM": "Econometrics", "Granger Causality": "Econometrics",
  "Error Correction Model": "Econometrics", "Ordinary Least Squares": "Econometrics",
  "Endogeneity": "Econometrics", "Exogeneity": "Econometrics", "Instrumental Variable": "Econometrics",
  "Hausman Test": "Econometrics", "Breusch-Pagan Test": "Econometrics", "Durbin-Watson Test": "Econometrics",
  "Augmented Dickey-Fuller Test": "Econometrics", "Thematic Analysis": "Qualitative Research",
  "Content Analysis": "Qualitative Research", "Coding": "Qualitative Research", "Open Coding": "Qualitative Research",
  "Axial Coding": "Qualitative Research", "Selective Coding": "Qualitative Research",
  "Qualitative Coding": "Qualitative Research", "Saturation": "Qualitative Research",
  "Data Saturation": "Qualitative Research", "Theoretical Saturation": "Qualitative Research",
  "Phenomenology": "Qualitative Research", "Grounded Theory": "Qualitative Research",
  "Ethnography": "Qualitative Research", "Case Study": "Qualitative Research", "Narrative Research": "Qualitative Research",
  "Reflexivity": "Qualitative Research", "Researcher Positionality": "Qualitative Research",
  "Informed Consent": "Research Ethics", "Confidentiality": "Research Ethics", "Anonymity": "Research Ethics",
  "Research Ethics": "Research Ethics", "Ethical Approval": "Research Ethics",
  "Institutional Review Board": "Research Ethics", "Research Participant": "Research Ethics",
  "Vulnerable Population": "Research Ethics", "Data Protection": "Research Ethics",
  "Plagiarism": "Research Ethics", "Academic Integrity": "Research Ethics", "SPSS": "Data Analysis Software",
  "Stata": "Data Analysis Software", "R": "Data Analysis Software", "Python": "Data Analysis Software",
  "MATLAB": "Data Analysis Software", "NVivo": "Data Analysis Software", "Excel": "Data Analysis Software",
  "Statistical Software": "Data Analysis Software", "Qualitative Data Analysis Software": "Data Analysis Software"
};

const makeSlug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

for (const term of extraTerms) {
  terms.push({
    slug: makeSlug(term),
    term: term,
    category: categoryMap[term] || "Research Methodology",
    shortDefinition: "A fundamental concept in " + (categoryMap[term]?.toLowerCase() || "research") + " used to design, analyze, or evaluate academic studies.",
    definition: term + " is a critical methodological or statistical concept. In the context of academic research, understanding this concept ensures rigorous design and accurate interpretation of data.",
    whyItMatters: "Proper application of this concept minimizes bias, controls errors, and enhances the validity and reliability of research findings.",
    example: "For example, a researcher employing " + term + " would systematically structure their approach to ensure robust and defensible conclusions.",
    interpretation: "",
    commonMistakes: [
      "Misinterpreting its application in different study contexts.",
      "Applying it without checking underlying assumptions."
    ],
    relatedTerms: [],
    relatedArticles: [],
    relatedTools: [],
    relatedServices: []
  });
}

// Generate the TypeScript file
const fileContent = [
  "export interface GlossaryTerm {",
  "  slug: string;",
  "  term: string;",
  "  category: string;",
  "  shortDefinition: string;",
  "  definition: string;",
  "  whyItMatters: string;",
  "  example: string;",
  "  interpretation?: string;",
  "  commonMistakes?: string[];",
  "  relatedTerms?: string[];",
  "  relatedArticles?: string[];",
  "  relatedTools?: string[];",
  "  relatedServices?: string[];",
  "}",
  "",
  "export const glossaryData: GlossaryTerm[] = " + JSON.stringify(terms, null, 2) + ";"
].join("\\n");

const dir = path.join(__dirname, 'src', 'features', 'research', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(path.join(dir, 'glossary.ts'), fileContent, 'utf-8');
console.log('glossary.ts generated.');
