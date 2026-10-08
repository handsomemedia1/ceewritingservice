import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const glossaryPath = path.join(__dirname, 'src', 'features', 'research', 'data', 'glossary.ts');

let c = fs.readFileSync(glossaryPath, 'utf8');
let j = c.substring(c.indexOf('= [') + 2, c.lastIndexOf(']')+1);
let terms = JSON.parse(j);

const highQualityTerms = {
  "statistical-significance": {
    shortDefinition: "A determination that an observed relationship or difference in data is unlikely to be due to random chance.",
    definition: "Statistical significance indicates that the results of a study (such as a difference between groups or a correlation) are unlikely to have occurred given the null hypothesis is true. It is typically assessed using a p-value compared against a pre-defined threshold (alpha), usually 0.05.",
    whyItMatters: "It helps researchers separate signal from noise, providing a mathematical basis for deciding whether an effect observed in a sample likely exists in the broader population.",
    example: "If a study finds that a new teaching method improves scores by 10 points with p = 0.02, the result is statistically significant at the 5% level, suggesting the teaching method's effect is real, not just a random fluctuation in that specific sample.",
    interpretation: "Statistical significance does NOT mean practical significance. A result can be statistically significant but have an effect size so small that it is meaningless in the real world.",
    commonMistakes: [
      "Equating statistical significance with practical importance.",
      "Assuming p > 0.05 proves that there is no effect (it only means there is insufficient evidence to prove an effect)."
    ],
    relatedTerms: ["p-value", "effect-size", "null-hypothesis"]
  },
  "confidence-interval": {
    term: "Confidence Interval",
    category: "Statistics",
    shortDefinition: "A range of values, derived from sample statistics, that is likely to contain the true population parameter.",
    definition: "A confidence interval (CI) provides a range of plausible values for an unknown population parameter (like a mean or difference in means). It is associated with a confidence level (e.g., 95%), which represents the frequency with which the interval would contain the true parameter if the experiment were repeated indefinitely.",
    whyItMatters: "Unlike a single point estimate (like a sample mean) or a p-value, a confidence interval provides both an estimate of the effect size and a measure of its precision or uncertainty.",
    example: "A poll might state that 60% of voters support a policy, with a 95% confidence interval of [56%, 64%]. This means we can be highly confident the true support level in the population lies within that range.",
    interpretation: "If a 95% confidence interval for a difference between two groups does not include zero, the difference is statistically significant at the p < 0.05 level.",
    commonMistakes: [
      "Stating there is a 95% probability that the true parameter falls within this specific computed interval (in frequentist statistics, the parameter is fixed; it is the interval that either contains it or doesn't)."
    ],
    relatedTerms: ["p-value", "statistical-significance"]
  },
  "type-i-error": {
    term: "Type I Error",
    category: "Statistics",
    shortDefinition: "The incorrect rejection of a true null hypothesis (a false positive).",
    definition: "A Type I error occurs when a researcher concludes that there is a statistically significant effect, difference, or relationship when, in reality, none exists. It is the error of seeing a pattern where there is only random noise.",
    whyItMatters: "Type I errors lead to false discoveries, which can result in wasted resources, ineffective treatments being approved, or invalid theories being accepted into the literature.",
    example: "A medical trial concludes that a new sugar pill cures headaches better than a placebo, purely due to a statistical fluke in the sample data.",
    interpretation: "The probability of making a Type I error is denoted by alpha (α), which is directly controlled by the significance level chosen by the researcher (usually 0.05).",
    commonMistakes: [
      "Failing to correct for multiple comparisons (like applying a Bonferroni correction), which drastically inflates the overall Type I error rate."
    ],
    relatedTerms: ["type-ii-error", "p-value", "statistical-power"]
  },
  "type-ii-error": {
    term: "Type II Error",
    category: "Statistics",
    shortDefinition: "The failure to reject a false null hypothesis (a false negative).",
    definition: "A Type II error occurs when a researcher concludes that there is no statistically significant effect when, in reality, a true effect exists. It is the error of missing a real discovery.",
    whyItMatters: "Type II errors mean missed opportunities, such as failing to approve a life-saving drug because the clinical trial didn't detect its effectiveness.",
    example: "A study evaluates a new reading intervention but uses too few students. The intervention actually works, but because the sample size was too small, the p-value is 0.15, and the researcher incorrectly concludes the intervention is ineffective.",
    interpretation: "The probability of making a Type II error is denoted by beta (β). Statistical power (1 - β) is the probability of correctly rejecting a false null hypothesis.",
    commonMistakes: [
      "Assuming that a non-significant result (p > 0.05) proves the null hypothesis is true, rather than acknowledging it might be a Type II error due to low power."
    ],
    relatedTerms: ["type-i-error", "statistical-power"]
  },
  "statistical-power": {
    term: "Statistical Power",
    category: "Statistics",
    shortDefinition: "The probability that a study will detect a true effect if one exists (i.e., correctly rejecting a false null hypothesis).",
    definition: "Statistical power is the likelihood that a hypothesis test will avoid a Type II error (false negative). It is influenced by the sample size, the effect size, and the chosen significance level (alpha).",
    whyItMatters: "An underpowered study is fundamentally flawed because it is unlikely to find the very effect it is looking for. High power ensures that the study is capable of detecting meaningful differences.",
    example: "A researcher wants to detect a small reduction in blood pressure. If their sample size is only 10 people, the statistical power might be 20%, meaning they only have a 1 in 5 chance of detecting the true effect.",
    interpretation: "Researchers typically aim for a power of 0.80 (80%) or higher when designing a study. This is determined a priori using a power analysis.",
    commonMistakes: [
      "Conducting a study without running an a priori power analysis to determine the required sample size.",
      "Running 'post-hoc' power analysis using the observed effect size, which is mathematically circular and uninformative."
    ],
    relatedTerms: ["type-ii-error", "effect-size"]
  },
  "correlation": {
    term: "Correlation",
    category: "Statistics",
    shortDefinition: "A statistical measure that expresses the extent to which two variables fluctuate together.",
    definition: "Correlation quantifies the direction and strength of the linear relationship between two continuous variables. The most common metric is Pearson's correlation coefficient (r), which ranges from -1 (perfect negative correlation) to +1 (perfect positive correlation), with 0 indicating no linear relationship.",
    whyItMatters: "It allows researchers to identify predictive relationships and underlying patterns between variables in observational data.",
    example: "There is a positive correlation between hours studied and exam scores: as study time increases, exam scores tend to increase. There is a negative correlation between altitude and temperature.",
    interpretation: "An r value of 0.8 indicates a strong positive relationship, while an r of -0.2 indicates a weak negative relationship. The statistical significance of the correlation depends on the sample size.",
    commonMistakes: [
      "Assuming correlation implies causation (e.g., ice cream sales correlate with drowning deaths, but heat causes both).",
      "Using Pearson correlation for non-linear relationships (where a U-shaped relationship might yield an r of 0, missing the pattern entirely)."
    ],
    relatedTerms: ["regression", "pearson-correlation", "spearman-correlation"]
  },
  "regression": {
    term: "Regression",
    category: "Statistics",
    shortDefinition: "A statistical method used to model the relationship between a dependent variable and one or more independent variables.",
    definition: "Regression analysis estimates the conditional expectation of a dependent variable given the independent variables. Unlike correlation, which is symmetric, regression involves proposing a directional model where predictors (X) explain the outcome (Y).",
    whyItMatters: "It goes beyond simple association to allow for prediction, forecasting, and inferring causal relationships (when properly designed). Multiple regression can isolate the effect of one variable while controlling for confounders.",
    example: "A real estate model uses regression to predict a house's price (dependent variable) based on its square footage, number of bedrooms, and distance to the city center (independent variables).",
    interpretation: "The regression coefficients (betas) indicate the average change in the dependent variable for a one-unit increase in the independent variable, holding all other variables constant.",
    commonMistakes: [
      "Extrapolating predictions far outside the range of the observed data.",
      "Ignoring regression assumptions like linearity, independence of errors, and homoscedasticity."
    ],
    relatedTerms: ["linear-regression", "r-squared", "multicollinearity", "endogeneity"]
  },
  "r-squared": {
    term: "R-squared",
    category: "Statistics",
    shortDefinition: "A goodness-of-fit measure for regression models indicating the percentage of variance in the dependent variable explained by the independent variables.",
    definition: "R-squared (the coefficient of determination) is a statistical measure that represents the proportion of the variance for a dependent variable that's explained by an independent variable or variables in a regression model. It ranges from 0 to 1.",
    whyItMatters: "It provides a simple, intuitive metric for how well the regression model fits the observed data.",
    example: "If a regression model predicting salary based on years of education and years of experience has an R-squared of 0.65, it means 65% of the variation in salaries is explained by education and experience.",
    interpretation: "A higher R-squared generally indicates a better fit. However, what constitutes a 'good' R-squared depends heavily on the field (e.g., 0.30 might be excellent in psychology, but 0.90 is expected in physics).",
    commonMistakes: [
      "Believing a high R-squared means the model is practically useful or causally valid (a model predicting today's temperature from yesterday's has a high R-squared but reveals no underlying mechanism).",
      "Using R-squared to compare models with different numbers of predictors (Adjusted R-squared must be used instead to penalize for added complexity)."
    ],
    relatedTerms: ["regression", "adjusted-r-squared"]
  },
  "multicollinearity": {
    term: "Multicollinearity",
    category: "Statistics",
    shortDefinition: "A situation in multiple regression where two or more predictor variables are highly correlated with each other.",
    definition: "Multicollinearity occurs when independent variables in a regression model contain overlapping information. While it doesn't reduce the predictive power of the model as a whole, it makes it mathematically difficult for the model to estimate the individual effect of each collinear predictor.",
    whyItMatters: "It inflates the standard errors of the regression coefficients, making them highly sensitive to small changes in the model and often rendering previously significant variables statistically insignificant.",
    example: "Predicting a person's weight using both their 'height in inches' and 'height in centimeters' as independent variables would result in perfect multicollinearity, breaking the model.",
    interpretation: "Typically detected by looking at the Variance Inflation Factor (VIF). A VIF greater than 5 or 10 indicates problematic multicollinearity.",
    commonMistakes: [
      "Discarding highly correlated predictors indiscriminately, potentially causing omitted variable bias if the discarded variable was theoretically critical."
    ],
    relatedTerms: ["regression", "variance-inflation-factor"]
  },
  "chi-square-test": {
    term: "Chi-Square Test",
    category: "Statistics",
    shortDefinition: "A statistical test used to determine if there is a significant association between categorical variables.",
    definition: "The Chi-Square test of independence compares observed frequencies of categorical data against the frequencies we would expect to see if there was no relationship between the variables in the broader population.",
    whyItMatters: "It is the primary tool for analyzing cross-tabulated categorical data, such as survey responses where data is grouped into buckets rather than measured continuously.",
    example: "Testing whether voting preference (Candidate A, Candidate B) is associated with gender (Male, Female, Non-binary). The test compares the observed vote counts in each gender category against what would be expected if gender had no impact on voting.",
    interpretation: "A significant p-value indicates that the two categorical variables are dependent (associated).",
    commonMistakes: [
      "Using the Chi-Square test when expected cell counts are too small (usually < 5), which invalidates the test approximation (Fisher's Exact Test should be used instead).",
      "Using it for continuous numerical data instead of categorical data."
    ],
    relatedTerms: ["categorical-variable", "p-value"]
  },
  "stationarity": {
    term: "Stationarity",
    category: "Econometrics",
    shortDefinition: "A property of a time series where its statistical properties (mean, variance, autocorrelation) remain constant over time.",
    definition: "A stationary time series is one whose fundamental data-generating process does not change depending on the time at which the series is observed. It has no long-term trend and no seasonal variations.",
    whyItMatters: "Most standard time series forecasting models (like ARIMA) and econometric analyses mathematically require the data to be stationary. Analyzing non-stationary data often leads to spurious regressions (finding a false relationship simply because both variables are trending upward over time).",
    example: "The daily price of a stock is typically non-stationary (it trends upwards or downwards). However, the daily percentage change in the stock's price is often stationary.",
    interpretation: "Stationarity is typically tested using unit root tests, such as the Augmented Dickey-Fuller (ADF) test.",
    commonMistakes: [
      "Running OLS regression on non-stationary variables without checking for cointegration, resulting in meaningless, highly significant but spurious results."
    ],
    relatedTerms: ["unit-root", "cointegration", "augmented-dickey-fuller-test"]
  },
  "cointegration": {
    term: "Cointegration",
    category: "Econometrics",
    shortDefinition: "A statistical property where two or more non-stationary time series share a long-term equilibrium relationship.",
    definition: "If two non-stationary (trending) variables move together over time such that a specific linear combination of them becomes stationary, they are cointegrated. They may drift apart in the short term, but fundamental economic forces bring them back together in the long term.",
    whyItMatters: "It provides a mathematically valid way to run regressions on non-stationary variables without suffering from the spurious regression problem, allowing researchers to model true long-run economic relationships.",
    example: "The price of oil and the price of gasoline are non-stationary. However, because gasoline is refined from oil, their prices cannot drift infinitely far apart. They are cointegrated.",
    interpretation: "If variables are cointegrated, researchers often use an Error Correction Model (ECM) to analyze both their short-term dynamics and long-term equilibrium.",
    commonMistakes: [
      "Confusing correlation with cointegration. Two completely unrelated variables (like US GDP and global temperature) can be highly correlated simply because both grow over time, but they are not cointegrated."
    ],
    relatedTerms: ["stationarity", "error-correction-model"]
  },
  "granger-causality": {
    term: "Granger Causality",
    category: "Econometrics",
    shortDefinition: "A statistical hypothesis test to determine whether one time series is useful in forecasting another.",
    definition: "A variable X is said to 'Granger-cause' Y if past values of X contain information that helps predict Y above and beyond the information contained in past values of Y alone.",
    whyItMatters: "In time-series econometrics, true causality is difficult to prove. Granger causality provides a rigorous empirical test of predictive causality—which variable temporally precedes and forecasts the other.",
    example: "If changes in consumer sentiment indices consistently happen a month before changes in retail sales, and knowing the sentiment improves the forecast of retail sales, then consumer sentiment Granger-causes retail sales.",
    interpretation: "A significant result means X has predictive value for Y. It does NOT prove strict philosophical causality.",
    commonMistakes: [
      "Interpreting Granger causality as true structural causation. It is merely a test of temporal precedence and predictive ability (e.g., lightning 'Granger-causes' thunder, but Christmas card sales might 'Granger-cause' Christmas, which is structurally false)."
    ],
    relatedTerms: ["vector-autoregression"]
  }
};

let modifiedCount = 0;
terms = terms.map(t => {
  if (highQualityTerms[t.slug]) {
    modifiedCount++;
    return { ...t, ...highQualityTerms[t.slug] };
  }
  return t;
});

const newContent = [
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
  `export const glossaryData: GlossaryTerm[] = ${JSON.stringify(terms, null, 2)};`
].join('\n');

fs.writeFileSync(glossaryPath, newContent, 'utf8');
console.log(`Updated ${modifiedCount} terms with high-quality definitions.`);
