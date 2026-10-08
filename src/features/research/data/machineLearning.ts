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

export interface MLResearchExample {
  title: string;
  description: string;
  details: string[];
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
    glossarySlugs: []
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
    title: "Regression",
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
  },
  {
    id: "clustering",
    title: "Clustering",
    description: "An unsupervised approach that explores naturally occurring groups within observations without predefined labels.",
    keyPoints: [
      "Unsupervised method (no ground-truth labels).",
      "Algorithms (e.g., k-means, hierarchical) group data based on feature similarity.",
      "Requires researchers to define the number of clusters or similarity thresholds."
    ],
    whenToUse: "When segmenting a population (e.g., identifying distinct patient profiles based on symptom clusters) for exploratory analysis.",
    limitations: "A clustering algorithm will almost always find clusters, even in random data. Discovered clusters do not automatically represent theoretically meaningful groups and require domain interpretation.",
    glossarySlugs: []
  },
  {
    id: "dimensionality-reduction",
    title: "Dimensionality Reduction",
    description: "Methods like Principal Component Analysis (PCA) that condense high-dimensional datasets into fewer, uncorrelated features.",
    keyPoints: [
      "Reduces the number of input variables while retaining most of the variance.",
      "Highly useful for visualizing complex data (e.g., gene expression datasets).",
      "Helps mitigate the 'curse of dimensionality' before training other models."
    ],
    whenToUse: "When you have hundreds or thousands of features and need to distill them into a manageable set of components for modeling or visualization.",
    limitations: "Reduced dimensions (components) are linear or non-linear combinations of original features, which may not map directly to theoretically meaningful constructs.",
    glossarySlugs: []
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
    warning: "Advanced models cannot fix fundamentally flawed data."
  },
  {
    step: 3,
    title: "Exploratory Analysis (EDA)",
    description: "Understand distributions, correlations, and underlying patterns before modeling."
  },
  {
    step: 4,
    title: "Feature Engineering & Preparation",
    description: "Scale variables, encode categorical data, and construct new meaningful variables. Ensure proper methodology to avoid leakage."
  },
  {
    step: 5,
    title: "Validation Methodology (Splitting)",
    description: "Partition data into Training (to fit model parameters), Validation or Cross-Validation (to select models and tune hyperparameters), and a strictly isolated Test set (held back for unbiased final evaluation). Cross-validation estimates out-of-sample performance without repeatedly relying on the final test set. Standard random splitting (like k-fold) is not always appropriate; grouped observations, longitudinal data, and time-series require specialized splitting strategies (e.g., temporal splits or leave-one-group-out). For classification, stratified splitting ensures rare classes are represented evenly."
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

export const ML_RESEARCH_EXAMPLES: MLResearchExample[] = [
  {
    title: "Classification Example",
    description: "Predicting whether a patient will be readmitted to a hospital within 30 days.",
    details: [
      "Target: Categorical class (Readmitted vs. Not Readmitted).",
      "Predictors: Patient demographics, lab results, previous admissions.",
      "Training: Model learns associations between predictors and readmission on historical data.",
      "Evaluation: Prioritizes Recall (minimizing false negatives) because failing to flag a readmission is riskier than a false alarm."
    ]
  },
  {
    title: "Regression Example",
    description: "Predicting a region's continuous daily electricity consumption.",
    details: [
      "Target: Continuous numerical value (megawatt-hours).",
      "Predictors: Weather forecasts, historical usage, day of week, holidays.",
      "Prediction: Outputs a specific continuous estimate for future days.",
      "Evaluation: Evaluated using RMSE or MAE to understand the average magnitude of the prediction error."
    ]
  },
  {
    title: "Clustering Example",
    description: "Exploring natural groupings in student learning behaviors.",
    details: [
      "Target: None (Unsupervised).",
      "Features: Login frequency, assignment submission times, forum participation.",
      "Process: The algorithm clusters students into naturally occurring behavioral groups.",
      "Interpretation: The researcher must examine the clusters and theoretically name them (e.g., 'Procrastinators', 'Consistent Planners')."
    ]
  },
  {
    title: "Prediction vs Inference Distinction",
    description: "Understanding the difference between predicting an outcome and inferring a relationship.",
    details: [
      "Prediction Question: 'Can we accurately predict a student's final grade based on their demographics and past performance?' (ML excels here).",
      "Inference Question: 'Does a specific teaching intervention cause an improvement in student grades, holding other variables constant?' (Classical statistical inference is usually required here).",
      "Core Limitation: Predictive association does not by itself establish causation."
    ]
  }
];

export const ML_MODEL_FIT = [
  {
    title: "Overfitting",
    description: "A model fits the training data too closely, learning noise or idiosyncratic patterns, and therefore performs substantially worse on unseen data.",
    signal: "Very strong training performance combined with materially weaker validation/test performance.",
    remedies: [
      "Use simpler models",
      "Apply regularization (e.g., L1/L2)",
      "Reduce unnecessary features",
      "Use better validation strategies",
      "Gather more representative training data",
      "Avoid excessive hyperparameter tuning"
    ]
  },
  {
    title: "Underfitting",
    description: "A model is too simple or insufficiently trained to capture important structure in the data.",
    signal: "Poor training performance and similarly poor validation/test performance.",
    remedies: [
      "Improve feature representation",
      "Use a more flexible/appropriate model",
      "Reduce excessive regularization",
      "Allow sufficient model training where applicable"
    ]
  }
];

export const ML_QUALITY_ISSUES = [
  {
    title: "Reproducibility",
    description: "Researchers must document all preprocessing, feature construction, model specification, hyperparameters, evaluation strategies, software packages, and random seeds. A model that cannot be reproduced cannot contribute to reliable science."
  },
  {
    title: "Bias and Fairness",
    description: "Machine learning does not automatically remove human bias. Models can reproduce or even amplify biases present in sampling, measurement, historical data, or labels."
  },
  {
    title: "Interpretability",
    description: "Some models (like decision trees or linear models) are inherently easier to interpret than complex ensembles or deep learning networks. Research goals often dictate that interpretability must be weighed alongside accuracy."
  },
  {
    title: "External Validation",
    description: "Excellent performance on one dataset (internal validation) does not guarantee the model generalizes to another population, institution, location, or time period."
  },
  {
    title: "Model Selection Bias",
    description: "Repeatedly trying different algorithms and hyperparameters and selecting the 'best' result against the same evaluation data produces an optimistic, biased estimate of true performance."
  }
];

export const ML_MISTAKES = [
  {
    title: "Choosing ML for the wrong reasons",
    description: "Using complex algorithms just because they sound advanced, when a simple statistical test or linear model would answer the research question more transparently."
  },
  {
    title: "Data Leakage",
    description: "Information from the validation or test data must not influence model fitting or preprocessing. For example, scaling or imputing based on the entire dataset before splitting causes leakage. Preprocessing must be fitted on training data and applied to test data."
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
