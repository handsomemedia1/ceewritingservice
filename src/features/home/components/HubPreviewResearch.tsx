import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function HubPreviewResearch() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-green-dark/5 blur-[80px] rounded-full" />
             <Card variant="glass-light" className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-green-dark/5">
                  <div className="w-12 h-12 rounded-full bg-green-dark flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-green-dark">Research Proposal Review</div>
                    <div className="text-sm text-muted">Awaiting Expert Feedback</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-green-dark/5 rounded w-full"></div>
                  <div className="h-4 bg-green-dark/5 rounded w-5/6"></div>
                  <div className="h-4 bg-green-dark/5 rounded w-4/6"></div>
                </div>
                <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-green-800">
                  <strong className="block mb-1">Consultant Note:</strong>
                  Your methodology section is strong, but we need to better define the qualitative sampling parameters to ensure academic rigor.
                </div>
             </Card>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-4 block text-sm">The Research Hub</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-6">
              Need a mentor to guide your academic project?
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Writing a dissertation or a high-impact journal article is a lonely journey. The Research Hub connects you with subject-matter experts for 1-on-1 consulting, proposal reviews, and data analysis support.
            </p>
            <ul className="space-y-4 mb-10 text-muted">
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70 mt-1">✓</span>
                <span>Data methodology design and execution.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70 mt-1">✓</span>
                <span>Critical review of literature and findings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-dark/70 mt-1">✓</span>
                <span>Journal targeting and peer-review prep.</span>
              </li>
            </ul>
            <Link href="/services" className="inline-flex items-center text-green-dark font-semibold hover:text-green-dark/70 transition-colors">
              Book a Research Consultation <span className="ml-2">→</span>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
