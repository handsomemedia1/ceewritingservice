import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GPACalculator from '@/features/tools/gpa-calculator/components/GPACalculator';

export const metadata: Metadata = {
  title: 'GPA Converter & Calculator | Cee Writing Hub',
  description: 'Convert your Nigerian 5.0 scale GPA to the US 4.0 scale or UK percentage standard for international scholarship and university applications.',
  alternates: { canonical: '/tools/gpa-calculator' },
};

export default function GPACalculatorPage() {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GPA Converter & Calculator',
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
              Interactive Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-dark mb-6">
              GPA Converter
            </h1>
            <p className="text-lg text-muted">
              Instantly estimate your Nigerian 5.0 CGPA on international scales.
            </p>
          </div>

          <GPACalculator />
        </div>
      </section>

      <Footer />
    </main>
  );
}
