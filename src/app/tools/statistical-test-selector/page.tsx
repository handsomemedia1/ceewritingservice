import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatTestSelector from '@/features/tools/statistical-test-selector/components/StatTestSelector';

export const metadata: Metadata = {
  title: 'Statistical Test Selector | Cee Writing Hub',
  description: 'Interactive decision engine to help researchers and students choose the correct statistical test (ANOVA, T-Test, Chi-Square, etc.) for their data analysis.',
  alternates: { canonical: '/tools/statistical-test-selector' },
};

export default function StatTestSelectorPage() {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Statistical Test Selector',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: metadata.description,
    provider: {
      '@type': 'Organization',
      name: 'Cee Writing Hub'
    }
  };

  return (
    <main className="min-h-screen bg-sage/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <Navbar />
      
      <section className="pt-40 pb-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-green-dark/70 border border-green-dark/20/20 bg-green-dark/10/5 mb-6">
              Decision Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-6">
              Statistical Test Selector
            </h1>
            <p className="text-lg text-muted">
              Answer three quick questions about your research variables to discover exactly which statistical test you should use.
            </p>
          </div>

          <StatTestSelector />
        </div>
      </section>

      <Footer />
    </main>
  );
}
