import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsCatalog from '@/features/tools/components/ToolsCatalog';

export const metadata: Metadata = {
  title: 'Academic & Research Tools | Cee Writing Hub',
  description: 'Interactive utilities for academics and researchers, including GPA converters, statistical test selectors, and scholarship readiness assessments.',
  alternates: { canonical: '/tools' },
};

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-sage/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-green-dark text-sage relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-dark/10/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Work Smarter, <br className="hidden md:block"/> Not Harder
          </h1>
          <p className="text-lg md:text-xl text-sage/70 max-w-2xl mx-auto leading-relaxed">
            Free, privacy-first interactive tools designed to streamline your academic research and international applications.
          </p>
        </div>
      </section>

      <ToolsCatalog />

      <Footer />
    </main>
  );
}
