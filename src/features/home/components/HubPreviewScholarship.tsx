import React from 'react';
import Link from 'next/link';

export default function HubPreviewScholarship() {
  return (
    <section className="py-24 bg-gold/20 relative">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-text-primary/70 font-bold tracking-wider uppercase mb-4 block text-sm">The Scholarship Hub</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-primary mb-6">
            Are you qualified for a global scholarship? Stop guessing.
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Applying for Chevening, Erasmus Mundus, or Fulbright is highly competitive. Don't waste months on an application if your profile isn't aligned. Our proprietary AI assessment tool evaluates your profile against actual selection criteria and provides a personalized readiness report.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/scholarship-check" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-gold to-gold-light text-white font-bold hover:-translate-y-1 transition-transform shadow-[0_10px_20px_rgba(201,147,58,0.2)]">
              Take the Free Readiness Check
            </Link>
            <Link href="/scholarship-check/tracks" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-bg-card text-text-primary font-bold border border-border/10 hover:border-border/20/50 transition-colors">
              Browse Available Scholarships
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
