import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import FAQClient from '@/components/FAQ';
import ArticleGrid from '@/features/blog/components/ArticleGrid';

export const metadata: Metadata = {
  title: 'Data Analysis Hub | SPSS, R, Python, Stata',
  description: 'Master quantitative and qualitative data analysis. Software-specific methodologies, tutorials, and interpretation guides.',
  alternates: { canonical: 'https://ceewriting.com/research/data-analysis' },
};

const DATA_ANALYSIS_FAQS = [
  {
    category: 'Statistical Software & Analysis',
    items: [
      { q: 'What types of research data analysis do you support?', a: 'We support a wide array of methods including descriptive statistics, regression analysis, ANOVA, Structural Equation Modelling (SEM), and time-series forecasting.' },
      { q: 'When should I use SPSS?', a: 'SPSS is highly recommended for survey-based social science research where you need quick, reliable cross-tabulations, ANOVA, and standard regression models without writing code.' },
      { q: 'When should I use R or Python?', a: 'R and Python are ideal for handling massive datasets, developing complex machine learning models, conducting advanced econometric forecasting, or creating highly customized data visualizations.' },
      { q: 'What is the difference between statistical analysis and statistical modelling?', a: 'Statistical analysis typically focuses on exploring data and testing specific hypotheses (e.g., t-tests). Statistical modelling involves building predictive or explanatory mathematical equations (like regressions) to understand the deeper relationships between variables.' },
      { q: 'Can you help interpret statistical results?', a: 'Yes, we provide detailed written interpretations of complex outputs, translating software tables into academic insights that directly answer your research questions.' },
    ]
  }
];

export default function DataAnalysisHubPage({
  searchParams,
}: {
  searchParams: { software?: string }
}) {
  const selectedSoftware = searchParams.software || 'all';

  return (
    <main className="min-h-screen bg-gold/20 overflow-x-hidden">
      <Navbar />
      
      {/* Sub-Hub Hero */}
      <section className="pt-32 pb-24 bg-transparent border-b border-border/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-bg-main/5 border border-border/10">
            <span className="text-text-primary text-[10px] font-bold tracking-widest uppercase">
              Research Hub / Data Analysis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
             Software-Specific Methodologies
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Select your statistical package to view tailored tutorials, data preparation guides, and result interpretation frameworks.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
             {['all', 'spss', 'r', 'python', 'excel'].map((software) => (
               <Link 
                  key={software}
                  href={`/research/data-analysis${software !== 'all' ? `?software=${software}` : ''}`}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    selectedSoftware === software 
                      ? 'bg-bg-main text-gold border-border' 
                      : 'bg-transparent text-text-primary border-border/20 hover:border-border/50'
                  }`}
               >
                 {software.toUpperCase()}
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-[1280px]">
           <ArticleGrid topicFilter="Data Analysis" />
        </div>
      </section>

      {/* Contextual FAQs */}
      <FAQClient faqs={DATA_ANALYSIS_FAQS} injectSchema={true} />

      <Footer />
    </main>
  );
}
