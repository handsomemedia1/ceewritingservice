import React from 'react';
import Link from 'next/link';

export default function HubPreviewRepository() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-green-dark/70 font-bold tracking-wider uppercase mb-4 block text-sm">Research Repository</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-dark mb-6">
              Browse thousands of successful academic papers.
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Don't start from a blank page. The Cee Writing Repository gives you access to a curated database of high-scoring dissertations, methodology frameworks, and research proposals. Use them as templates or structural inspiration.
            </p>
            <Link href="/resources" className="inline-flex items-center text-green-dark font-semibold hover:text-green-dark/70 transition-colors">
              Search the Repository <span className="ml-2">→</span>
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-sage/20 border border-green-dark/5 rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <input type="text" placeholder="Search topics, e.g., 'Public Health'" className="flex-1 h-12 px-4 rounded-lg border border-green-dark/10 bg-white outline-none focus:border-green-dark/20 transition-colors" disabled />
                <button className="h-12 px-6 bg-green-dark text-white rounded-lg font-medium opacity-50 cursor-not-allowed">Search</button>
              </div>
              <div className="space-y-4">
                {[
                  { title: "The Economic Impact of Microfinance in West Africa", type: "Dissertation • Economics" },
                  { title: "Machine Learning Approaches to Predictive Maintenance", type: "Thesis • Computer Science" },
                  { title: "Nursing Leadership in Post-Pandemic Healthcare", type: "Proposal • Nursing" }
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-green-dark/5 hover:border-green-dark/20/30 transition-colors cursor-pointer">
                    <h4 className="font-bold text-green-dark mb-1">{doc.title}</h4>
                    <div className="text-xs text-muted uppercase tracking-wider">{doc.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
