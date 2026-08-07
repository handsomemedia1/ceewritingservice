import React from 'react';
import Link from 'next/link';

export default function ResearchHero() {
  return (
    <section className="relative overflow-hidden bg-green-dark pt-24 pb-32 border-b border-green-dark/5" style={{ background: 'linear-gradient(160deg, #061428 0%, var(--green-dark) 45%, var(--green-dark) 100%)' }}>
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,147,58,0.03) 0%, transparent 60%)' }} />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-dark/10/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-dark/20/30 bg-green-dark/10/10">
          <span className="text-green-dark/70-light text-xs font-bold tracking-widest uppercase">
            The Definitive Educational Centre
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-sage leading-[1.1] mb-6 tracking-tight">
          Master Research Methodology & <br className="hidden md:block" />
          <span style={{ color: 'var(--sage)' }}>Data Analysis</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-sage/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          From formulating your first research question to publishing your findings. Explore our comprehensive learning journeys, interactive decision tools, and advanced statistical guides.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#roadmaps" className="flex items-center justify-center gap-2 px-8 py-4 rounded-none font-bold text-sm transition-all" style={{ background: 'linear-gradient(135deg, var(--sage), var(--sage))', color: 'var(--green-dark)', boxShadow: '0 8px 32px rgba(201,147,58,0.3)' }}>
            Start a Learning Journey
          </Link>
          <Link href="/research/data-analysis" className="flex items-center justify-center gap-2 px-8 py-4 rounded-none font-bold text-sm text-sage border border-white/20 hover:bg-transparent/10 transition-colors">
            Data Analysis Hub
          </Link>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-[-1px] left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDFAF5"/>
        </svg>
      </div>
    </section>
  );
}
