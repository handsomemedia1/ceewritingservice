import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SampleSizeCalculator from '@/features/tools/sample-size-calculator/components/SampleSizeCalculator';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sample Size Calculator for Research | Cee Writing',
  description: 'Estimate the sample size needed for a proportion-based study under specified precision and confidence assumptions.',
  alternates: { canonical: 'https://ceewriting.com/tools/sample-size-calculator' },
};

export default function SampleSizeCalculatorPage() {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sample Size Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: metadata.description,
    provider: {
      '@id': 'https://ceewriting.com/#organization'
    }
  };

  return (
    <main className="min-h-screen bg-bg-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <Navbar />
      
      <section className="pt-40 pb-16 relative border-b border-[var(--border)]">
        <div className="absolute top-0 left-1/4 w-full max-w-3xl h-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle at top left, var(--gold), transparent 70%)' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-gold border border-gold/20 bg-gold/5 mb-6">
              Research Planning Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
              Sample Size Calculator
            </h1>
            <p className="text-lg text-muted mb-8">
              Estimate the sample size needed for a proportion-based study under specified precision and confidence assumptions.
            </p>
            <div className="flex justify-center gap-4 text-sm">
               <Link href="/research/tools" className="text-muted hover:text-gold transition-colors">
                 ? Back to Research Tools
               </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <SampleSizeCalculator />
        </div>
      </section>

      <section className="py-16 bg-bg-card border-t border-[var(--border)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-text-primary mb-8 text-center">Understanding Sample Size</h2>
          
          <div className="space-y-8 text-muted leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-gold mb-3">What is Sample Size?</h3>
              <p>
                In quantitative research, sample size refers to the number of subjects or observations included in a study. Because it is rarely feasible to collect data from an entire <Link href="/research/glossary/population" className="text-text-primary underline">population</Link>, researchers collect data from a smaller subset (a <Link href="/research/glossary/sample" className="text-text-primary underline">sample</Link>) and use statistical methods to make inferences about the larger group.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gold mb-3">Why Does It Matter?</h3>
              <p>
                Choosing the correct sample size is a critical methodological decision. If your sample is too small, your results may lack precision and you run a high risk of drawing inaccurate conclusions. If your sample is unnecessarily large, you waste time, money, and resources. An appropriate sample size balances statistical accuracy with practical feasibility.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gold mb-3">What is the Margin of Error?</h3>
              <p>
                The <Link href="/research/glossary/margin-of-error" className="text-text-primary underline">margin of error</Link> is a measure of precision. It indicates how much the results from your sample might differ from the true population value. A smaller margin of error requires a significantly larger sample size.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-3">What Does Confidence Level Mean?</h3>
              <p>
                The <Link href="/research/glossary/confidence-level" className="text-text-primary underline">confidence level</Link> refers to the long-run coverage of the confidence interval procedure. It does not mean there is a 95% probability that the true population value lies inside your specific calculated interval. Rather, it means that if you repeated your sampling process under identical conditions indefinitely, 95% of the calculated intervals would contain the true population parameter.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-3">When This Calculator Is Not Sufficient</h3>
              <p>
                This calculator provides precision-based sample size estimates primarily used for proportion estimation (e.g., surveys, prevalence studies) under simple random sampling assumptions. 
                If you are performing complex hypothesis testing (e.g., comparing groups in an experiment), you should perform a formal <Link href="/research/glossary/statistical-power" className="text-text-primary underline">power analysis</Link> based on your expected effect size. Additionally, complex sampling designs like stratified or cluster sampling require specialized adjustments.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
