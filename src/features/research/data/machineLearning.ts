export interface MLConcept {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  whenToUse: string;
  limitations: string;
  glossarySlugs?: string[];
}

export interface MLWorkflowStep {
  step: number;
  title: string;
  description: string;
  warning?: string;
}

export const ML_APPROACHES: MLConcept[] = [
  {
    id: "supervised-learning",
    title: "Supervised Learning",
    description: "Models trained on labelled data to predict outcomes or classify observations. The algorithm learns the relationship between input features and known target variables.",
    keyPoints: [
      "Requires ground-truth labelled datasets.",
      "Used for mapping inputs to specific outputs.",
      "Can handle both continuous and categorical targets."
    ],
    whenToUse: "When your research question involves predicting a specific known outcome (e.g., predicting student dropout rates based on past academic performance).",
    limitations: "Highly dependent on the quality and volume of labelled data. Cannot discover entirely new outcome categories.",
    glossarySlugs: ["regression", "logistic-regression"]
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning",
    description: "Models that identify hidden patterns or intrinsic structures in data without pre-existing labels or categories.",
    keyPoints: [
      "No labelled outcome variable is provided.",
      "Groups similar observations automatically.",
      "Reduces dataset dimensionality for exploratory analysis."
    ],
    whenToUse: "When conducting exploratory research to discover natural segments, typologies, or hidden factors within your dataset.",
    limitations: "Discovered patterns require subjective interpretation. Groups may not reflect theoretically meaningful constructs.",
    glossarySlugs: []
  },
  {
    id: "regression",
    title: "Regression (ML Context)",
    description: "In machine learning, regression refers to algorithms that predict a continuous numerical value. While related to classical statistical regression, ML focuses heavily on predictive accuracy and complex non-linear relationships rather than parameter inference.",
    keyPoints: [
      "Predicts continuous quantities (e.g., prices, scores, temperatures).",
      "Often employs regularisation (Lasso, Ridge) to handle high dimensionality.",
      "Can capture highly non-linear feature interactions (e.g., Random Forest Regression)."
    ],
    whenToUse: "When you need to forecast a continuous variable and predictive performance is more critical than interpreting the exact effect of each individual variable.",
    limitations: "Complex ML regression models are often 'black boxes', making it difficult to extract causal or easily interpretable mechanisms.",
    glossarySlugs: ["regression", "linear-regression", "multiple-regression"]
  },
  {
    id: "classification",
    title: "Classification",
    description: "Algorithms designed to predict which category or class an observation belongs to. Outcomes are discrete labels.",
    keyPoints: [
      "Can be binary (two classes) or multiclass.",
      "Outputs can be deterministic labels or probabilities.",
      "Evaluation requires examining error types (False Positives vs False Negatives)."
    ],
    whenToUse: "When categorizing observations (e.g., classifying a tumor as benign or malignant based on imaging data).",
    limitations: "Performance can be severely degraded by imbalanced datasets (where one class heavily outnumbers the other).",
    glossarySlugs: ["logistic-regression"]
  }
];

export const ML_WORKFLOW: MLWorkflowStep[] = [
  {
    step: 1,
    title: "Research Question & Study Design",
    description: "Define the problem theoretically before touching data. Identify whether the problem is genuinely predictive, exploratory, or inferential.",
    warning: "Do not choose a model before defining the research problem."
  },
  {
    step: 2,
    title: "Data Collection & Cleaning",
    description: "Gather data and address missing values, outliers, and structural errors.",
    warning: "Garbage in, garbage out. Advanced models cannot fix fundamentally flawed data."
  },
  {
    step: 3,
    title: "Exploratory Analysis (EDA)",
    description: "Understand distributions, correlations, and underlying patterns before modeling."
  },
  {
    step: 4,
    title: "Feature Engineering & Preparation",
    description: "Scale variables, encode categorical data, and construct new meaningful variables.",
    warning: "Beware of data leakage: do not use information from outside the training set to create features."
  },
  {
    step: 5,
    title: "Train / Validation / Test Splitting",
    description: "Partition data to ensure the model is evaluated on unseen data, simulating real-world performance."
  },
  {
    step: 6,
    title: "Model Selection & Training",
    description: "Select appropriate algorithms and fit them to the training data. Tune hyperparameters using the validation set."
  },
  {
    step: 7,
    title: "Evaluation & Interpretation",
    description: "Assess the model on the isolated test set using metrics aligned with your research goals.",
    warning: "Never tune your model based on test set performance."
  },
  {
    step: 8,
    title: "Reporting",
    description: "Document the methodology transparently, including preprocessing steps, hyperparameter choices, and evaluation metrics to ensure reproducibility."
  }
];

export const ML_MISTAKES = [
  {
    title: "Choosing ML for the wrong reasons",
    description: "Using complex algorithms just because they sound advanced, when a simple statistical test or linear model would answer the research question more transparently."
  },
  {
    title: "Data Leakage",
    description: "Allowing information from the test set to leak into the training process (e.g., scaling the entire dataset before splitting). This creates artificially high performance that will not generalize."
  },
  {
    title: "Confusing Prediction with Causation",
    description: "Assuming that because a variable strongly predicts an outcome in an ML model, it causes that outcome. Predictive power does not equal causal evidence."
  },
  {
    title: "Ignoring Class Imbalance",
    description: "Training a classifier on a dataset where 99% of examples are 'Negative' and 1% are 'Positive', and celebrating 99% accuracy (which the model achieved by simply guessing 'Negative' every time)."
  },
  {
    title: "Tuning on the Test Set",
    description: "Adjusting model parameters based on test set results. The test set must be locked away until the final evaluation; otherwise, you are overfitting to the test data."
  }
];

export const ML_RELATED_ARTICLES = [
  { slug: "machine-learning-social-science-research", title: "Machine Learning in Social Science Research" },
  { slug: "spss-vs-r-vs-python-for-phd-research", title: "SPSS vs R vs Python for PhD Research" },
  { slug: "python-regression-analysis-research-data", title: "Python Regression Analysis for Research Data" }
];
