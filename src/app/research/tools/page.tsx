import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { researchTools } from '@/features/research/data/tools';
import { glossaryData } from '@/features/research/data/glossary';

export const metadata = {
  title: 'Research Tools for Students & Researchers | Cee Writing',
  description: 'Interactive tools for planning, analyzing, and completing academic research. Use our Statistical Test Selector, GPA Calculator, and more.',
  alternates: {
    canonical: 'https://ceewriting.com/research/tools',
  }
};

export default function ResearchToolsPage({ searchParams }: { searchParams: { category?: string } }) {
  const categoryFilter = searchParams.category || '';

  // Get unique categories for available tools
  const availableTools = researchTools.filter(t => t.status === 'available');
  const plannedTools = researchTools.filter(t => t.status === 'planned');
  
  const categories = Array.from(new Set(availableTools.map(t => t.category))).sort();

  const filteredTools = availableTools.filter(term => {
    return categoryFilter ? term.category === categoryFilter : true;
  });

  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute top-0 right-1/4 w-full max-w-3xl h-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at top right, var(--gold), transparent 70%)' }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="section-label mb-4">Research Tools Hub</div>
          <h1 className="section-title text-text-primary mb-6">Practical Research Tools</h1>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Interactive decision engines, calculators, and utilities designed to streamline your research planning and academic methodology.
          </p>
        </div>
      </section>

      <section className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12">
          
          {/* Sidebar / Categories */}
          <aside className="w-full md:w-64 shrink-0">
            <h2 className="text-xl font-serif font-bold text-gold mb-6">Categories</h2>
            <div className="flex flex-col gap-2">
              <Link 
                href="/research/tools"
                className={`block py-2 px-4 rounded-lg transition-colors ${!categoryFilter ? 'bg-gold/10 text-gold border border-gold/20' : 'text-text-primary hover:bg-bg-card'}`}
              >
                All Tools
              </Link>
              {categories.map(cat => (
                <Link 
                  key={cat}
                  href={`/research/tools?category=${encodeURIComponent(cat)}`}
                  className={`block py-2 px-4 rounded-lg transition-colors ${categoryFilter === cat ? 'bg-gold/10 text-gold border border-gold/20' : 'text-text-primary hover:bg-bg-card'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
            
            <div className="mt-12 p-6 rounded-2xl border border-[var(--border)] bg-bg-card">
              <h3 className="text-lg font-serif font-bold text-text-primary mb-3">Need Hands-on Help?</h3>
              <p className="text-sm text-muted mb-6">
                Explore Cee Writing&apos;s professional data-analysis and methodology consulting services.
              </p>
              <Link href="/services/data-analysis" className="btn-secondary w-full text-center block text-sm">
                View Data Services
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <h2 className="text-3xl font-serif font-bold text-gold mb-8">Available Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {filteredTools.map(tool => (
                <div key={tool.slug} className="glass-card flex flex-col h-full overflow-hidden">
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs font-bold text-gold uppercase tracking-widest">{tool.category}</div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-4">{tool.name}</h3>
                    <p className="text-muted leading-relaxed mb-8 flex-grow">{tool.description}</p>
                    
                    {tool.relatedTerms && tool.relatedTerms.length > 0 && (
                      <div className="mb-8 pt-4 border-t border-[var(--border)]">
                        <div className="text-xs text-muted uppercase tracking-widest mb-3">Related Concepts</div>
                        <div className="flex flex-wrap gap-2">
                          {tool.relatedTerms.slice(0, 4).map(termSlug => {
                            const glossaryItem = glossaryData.find(g => g.slug === termSlug);
                            if (!glossaryItem) return null;
                            return (
                              <Link 
                                key={termSlug} 
                                href={`/research/glossary/${termSlug}`}
                                className="text-xs px-3 py-1 bg-bg-main border border-[var(--border)] rounded-full text-gold hover:bg-gold hover:text-bg-main transition-colors"
                              >
                                {glossaryItem.term}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <Link href={tool.href} className="btn-primary w-full text-center mt-auto">
                      Use {tool.name}
                    </Link>
                  </div>
                </div>
              ))}
              
              {filteredTools.length === 0 && (
                 <div className="p-12 text-center bg-bg-card rounded-2xl border border-[var(--border)] col-span-1 md:col-span-2">
                   <h3 className="text-xl text-text-primary mb-2">No tools found</h3>
                   <p className="text-muted mb-6">There are currently no available tools in this category.</p>
                   <Link href="/research/tools" className="btn-secondary">View All Tools</Link>
                 </div>
              )}
            </div>

            {/* Planned Tools Section */}
            {!categoryFilter && plannedTools.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary mb-8 border-t border-[var(--border)] pt-12">Tools in Development</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plannedTools.map(tool => (
                    <div key={tool.slug} className="p-6 bg-bg-card/50 border border-[var(--border)] rounded-xl opacity-70 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-muted uppercase tracking-widest">{tool.category}</span>
                          <span className="text-xs bg-bg-main px-2 py-1 rounded text-muted">Planned</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-text-primary mb-2">{tool.name}</h3>
                        <p className="text-sm text-muted">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Glossary Cross-sell */}
            <div className="mt-16 p-8 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-gold mb-2">Not sure about a methodology term?</h3>
                <p className="text-muted text-sm max-w-md">Our Research Glossary contains clear, accurate definitions for hundreds of statistical, econometric, and qualitative research concepts.</p>
              </div>
              <Link href="/research/glossary" className="btn-secondary shrink-0">
                Explore Glossary
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
