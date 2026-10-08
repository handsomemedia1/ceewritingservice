import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ML_APPROACHES, 
  ML_WORKFLOW, 
  ML_MISTAKES, 
  ML_RELATED_ARTICLES 
} from '@/features/research/data/machineLearning';

export const metadata: Metadata = {
  title: 'Machine Learning for Research | Predictive Analytics & Modelling',
  description: 'Learn how to use machine learning responsibly in academic research. Understand when to use ML, core algorithms, data preparation, evaluation, and common pitfalls.',
  alternates: { canonical: 'https://ceewriting.com/research/machine-learning' },
};

export default function MachineLearningHubPage() {
  return (
    <main className="min-h-screen bg-bg-main">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-bg-main border-b border-border/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-bg-main/5 border border-border/10">
            <Link href="/research" className="text-text-primary text-[10px] font-bold tracking-widest uppercase hover:text-gold transition-colors">
              Research Hub
            </Link>
            <span className="text-muted text-[10px]">/</span>
            <span className="text-gold text-[10px] font-bold tracking-widest uppercase">
              Machine Learning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-6">
            Machine Learning for Research
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Learn how machine learning can be used to analyse data, build predictive models, discover patterns, and answer research questions responsibly. 
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="bg-gold text-bg-main px-8 py-3 rounded-full font-bold hover:bg-gold-light transition-colors text-sm uppercase tracking-wider">
              Get Data Analysis Support
            </Link>
            <Link href="/research/data-analysis" className="bg-transparent border border-border/20 text-text-primary px-8 py-3 rounded-full font-bold hover:border-border/50 transition-colors text-sm uppercase tracking-wider">
              Explore Statistical Software
            </Link>
          </div>
        </div>
      </section>

      {/* Section B - When to Use ML */}
      <section className="py-24 bg-[#080808] border-b border-border/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-6">
              When Should Researchers Use Machine Learning?
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Machine learning is a powerful tool for complex datasets, but it is not a universal replacement for classical statistics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-border/10">
              <h3 className="text-xl font-bold text-white mb-4">When ML is Appropriate</h3>
              <ul className="space-y-4 text-muted">
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Prediction:</strong> When the primary goal is forecasting an outcome accurately rather than interpreting the specific effect of a single variable.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Classification:</strong> Categorizing complex observations automatically.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>High-Dimensional Data:</strong> Handling datasets with thousands of variables where traditional methods struggle with multicollinearity.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Nonlinear Relationships:</strong> Discovering complex, hidden interactions without manually specifying them.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Pattern Discovery:</strong> Using unsupervised learning for exploratory grouping.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-border/10">
              <h3 className="text-xl font-bold text-white mb-4">When Conventional Statistics is Better</h3>
              <ul className="space-y-4 text-muted">
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Inference:</strong> Testing specific hypotheses about population parameters.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Interpretability:</strong> When you must clearly explain how each variable affects the outcome.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Small Datasets:</strong> ML often requires substantial data to avoid overfitting; classical models are more robust on small samples.</li>
                <li className="flex gap-3"><span className="text-gold">✓</span> <strong>Established Theory:</strong> When domain theory clearly dictates the functional form of the relationship.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section C - Core Approaches */}
      <section className="py-24 bg-bg-main border-b border-border/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">Core Machine Learning Approaches</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              The foundational categories of ML algorithms used in research methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {ML_APPROACHES.map(approach => (
              <div key={approach.id} className="p-8 rounded-2xl bg-[#0B1F3A] border border-border/10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-3">{approach.title}</h3>
                <p className="text-muted mb-6 leading-relaxed flex-grow">{approach.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-3">Key Characteristics</h4>
                  <ul className="space-y-2">
                    {approach.keyPoints.map((point, i) => (
                      <li key={i} className="text-sm text-muted/90 flex gap-2">
                        <span className="text-gold/50">•</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">When To Use</h4>
                  <p className="text-sm text-muted/90">{approach.whenToUse}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">Methodological Limitations</h4>
                  <p className="text-sm text-muted/90">{approach.limitations}</p>
                </div>

                {approach.glossarySlugs && approach.glossarySlugs.length > 0 && (
                  <div className="pt-4 mt-auto border-t border-border/10">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-muted font-semibold my-auto mr-2">Related Glossary:</span>
                      {approach.glossarySlugs.map(slug => (
                        <Link 
                          key={slug} 
                          href={`/research/glossary/${slug}`}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white hover:bg-gold/20 hover:border-gold/50 transition-colors"
                        >
                          {slug.replace('-', ' ')}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D - Workflow */}
      <section className="py-24 bg-[#080808] border-b border-border/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">The Research ML Workflow</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Machine learning is not merely "uploading data to an algorithm". A rigorous research pipeline requires careful methodological planning before model selection.
            </p>
          </div>

          <div className="relative border-l border-gold/20 ml-4 md:ml-8 space-y-12">
            {ML_WORKFLOW.map(step => (
              <div key={step.step} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#0B1F3A] border border-gold flex items-center justify-center text-gold font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
                {step.warning && (
                  <div className="mt-3 inline-flex gap-2 items-start text-sm text-red-400/90 bg-red-900/10 px-4 py-2 rounded-lg border border-red-900/30">
                    <span className="font-bold">⚠ Important:</span>
                    <span>{step.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section E & F - Data Prep and Evaluation */}
      <section className="py-24 bg-bg-main border-b border-border/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Data Preparation */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary mb-6">Data Preparation</h2>
              <p className="text-muted mb-6">
                Raw data is rarely ready for machine learning. Preprocessing choices profoundly affect research outcomes.
              </p>
              <ul className="space-y-4">
                <li className="p-4 rounded-xl bg-white/5 border border-border/5">
                  <h4 className="text-white font-bold mb-1">Handling Missing Data & Outliers</h4>
                  <p className="text-sm text-muted">Imputing missing values and managing structural errors must be documented. Removing outliers changes the population you are modeling.</p>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-border/5">
                  <h4 className="text-white font-bold mb-1">Encoding & Scaling</h4>
                  <p className="text-sm text-muted">Algorithms require numerical inputs. Categorical data must be encoded (e.g., One-Hot), and numerical features often require scaling (Standardization or Normalization) so large values don't dominate.</p>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-border/5 border-l-4 border-l-red-500/50">
                  <h4 className="text-white font-bold mb-1">Avoiding Data Leakage</h4>
                  <p className="text-sm text-muted">Data leakage occurs when information from outside the training dataset is used to create the model. <strong className="text-white">Always split your data before scaling or imputing.</strong></p>
                </li>
              </ul>
            </div>

            {/* Model Evaluation */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary mb-6">Model Evaluation</h2>
              <p className="text-muted mb-6">
                Evaluation metrics should be chosen based on the research problem and data structure, not just default settings.
              </p>
              <ul className="space-y-4">
                <li className="p-4 rounded-xl bg-white/5 border border-border/5">
                  <h4 className="text-white font-bold mb-1">Classification Metrics</h4>
                  <p className="text-sm text-muted">Do not rely solely on accuracy. Examine Precision, Recall, F1-score, and the Confusion Matrix to understand how your model fails.</p>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-border/5">
                  <h4 className="text-white font-bold mb-1">Regression Metrics</h4>
                  <p className="text-sm text-muted">Use Mean Absolute Error (MAE) or Root Mean Squared Error (RMSE). Evaluate <Link href="/research/glossary/r-squared" className="text-gold hover:underline">R²</Link> contextually.</p>
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-border/5 border-l-4 border-l-gold/50">
                  <h4 className="text-white font-bold mb-1">Cross-Validation</h4>
                  <p className="text-sm text-muted">Use k-fold cross-validation to estimate out-of-sample performance more reliably than a single train/test split, especially for smaller datasets.</p>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Section G & J - Common Research Mistakes */}
      <section className="py-24 bg-[#080808] border-b border-border/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">Methodological Quality & Common Mistakes</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Applying machine learning responsibly means understanding its limitations. Avoid these common pitfalls to preserve the integrity of your research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ML_MISTAKES.map((mistake, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 border border-border/10">
                <div className="w-10 h-10 rounded-full bg-red-900/20 text-red-400 flex items-center justify-center font-bold mb-4">
                  !
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mistake.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{mistake.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section H - Ecosystem and Tools */}
      <section className="py-24 bg-bg-main border-b border-border/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-text-primary mb-6">Software & Implementation</h2>
              <p className="text-muted mb-6 leading-relaxed">
                Modern machine learning research is primarily conducted in Python and R. The choice of software depends on your discipline's conventions and the specific models required.
              </p>
              
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border/10 bg-[#0B1F3A]">
                  <h4 className="text-xl font-bold text-white mb-2">Python Ecosystem</h4>
                  <p className="text-sm text-muted/90 mb-4">The dominant language for ML research, offering unmatched libraries for deep learning and predictive modeling.</p>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• <strong>scikit-learn:</strong> Standard for traditional machine learning algorithms.</li>
                    <li>• <strong>pandas & NumPy:</strong> Essential for data manipulation and numerical computing.</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/research/data-analysis?software=python" className="text-gold text-sm font-semibold hover:underline">
                      Explore Python resources →
                    </Link>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border/10 bg-white/5">
                  <h4 className="text-xl font-bold text-white mb-2">R Ecosystem</h4>
                  <p className="text-sm text-muted/90 mb-4">Excellent for statistical learning, inference, and bioinformatics where traditional statistics blurs into machine learning.</p>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• <strong>tidymodels:</strong> A robust, consistent framework for modeling and ML in R.</li>
                    <li>• <strong>caret:</strong> A comprehensive package for training regression and classification models.</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/research/data-analysis?software=r" className="text-gold text-sm font-semibold hover:underline">
                      Explore R resources →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles & Tools */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-[#080808] border border-border/10">
                <h3 className="text-xl font-bold text-white mb-6">Related Research Guides</h3>
                <div className="space-y-4">
                  {ML_RELATED_ARTICLES.map(article => (
                    <Link 
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-border/20"
                    >
                      <h4 className="text-sm font-bold text-white mb-1">{article.title}</h4>
                      <span className="text-xs text-gold">Read Article →</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gold/5 border border-gold/20">
                <h3 className="text-xl font-bold text-white mb-2">Research Tools Hub</h3>
                <p className="text-sm text-muted mb-6">
                  Explore practical tools for planning your methodology, sizing your sample, and selecting statistical tests before diving into complex modeling.
                </p>
                <div className="space-y-3">
                  <Link href="/tools/statistical-test-selector" className="block text-sm text-gold hover:underline font-semibold">
                    Statistical Test Selector →
                  </Link>
                  <Link href="/tools/sample-size-calculator" className="block text-sm text-gold hover:underline font-semibold">
                    Sample Size Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
