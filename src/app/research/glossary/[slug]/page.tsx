import React from 'react';
import { notFound } from 'next/navigation';
import { glossaryData } from '@/features/research/data/glossary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryData.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const termData = glossaryData.find((t) => t.slug === slug);
  
  if (!termData) {
    return { title: 'Term Not Found' };
  }

  return {
    title: `What is ${termData.term}? | Research Glossary | Cee Writing`,
    description: termData.shortDefinition,
    alternates: {
      canonical: `https://ceewriting.com/research/glossary/${termData.slug}`,
    }
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const termData = glossaryData.find((t) => t.slug === slug);

  if (!termData) {
    notFound();
  }

  // Structured Data (DefinedTerm)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    'name': termData.term,
    'description': termData.shortDefinition,
    'inDefinedTermSet': 'https://ceewriting.com/research/glossary'
  };

  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-muted mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/research" className="hover:text-gold transition-colors">Research</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link href="/research/glossary" className="hover:text-gold transition-colors">Glossary</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-text-primary">{termData.term}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="glass-card-light p-8 md:p-12 mb-12">
            <div className="text-sm text-gold uppercase tracking-widest mb-4">{termData.category}</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">{termData.term}</h1>
            <p className="text-xl text-text-primary opacity-90 leading-relaxed mb-0">
              {termData.shortDefinition}
            </p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none tiptap">
            <h2 className="text-2xl font-serif text-gold mb-4 mt-8">What is {termData.term}?</h2>
            <p className="text-lg text-text-primary/90 mb-6">{termData.definition}</p>

            {termData.whyItMatters && (
              <>
                <h2 className="text-2xl font-serif text-gold mb-4 mt-8">Why {termData.term} Matters</h2>
                <p className="text-lg text-text-primary/90 mb-6">{termData.whyItMatters}</p>
              </>
            )}

            {termData.interpretation && (
              <>
                <h2 className="text-2xl font-serif text-gold mb-4 mt-8">How to Interpret</h2>
                <p className="text-lg text-text-primary/90 mb-6">{termData.interpretation}</p>
              </>
            )}

            {termData.example && (
              <>
                <h2 className="text-2xl font-serif text-gold mb-4 mt-8">Example</h2>
                <div className="p-6 bg-bg-card border border-[var(--border)] rounded-xl mb-6">
                  <p className="text-text-primary/90 m-0 italic">{termData.example}</p>
                </div>
              </>
            )}

            {termData.commonMistakes && termData.commonMistakes.length > 0 && (
              <>
                <h2 className="text-2xl font-serif text-gold mb-4 mt-8">Common Mistakes</h2>
                <ul className="list-disc pl-6 mb-6">
                  {termData.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="text-lg text-text-primary/90 mb-2">{mistake}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Related Links / Explore Further */}
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <h3 className="text-2xl font-serif font-bold text-text-primary mb-8">Explore Further</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                <div>
                  <h4 className="text-sm text-muted uppercase tracking-wider mb-4">Related Concepts</h4>
                  <div className="flex flex-col gap-3">
                    {termData.relatedTerms.map(rt => {
                      const relatedTermData = glossaryData.find(g => g.slug === rt);
                      if (!relatedTermData) return null;
                      return (
                        <Link key={rt} href={`/research/glossary/${rt}`} className="flex items-center gap-3 p-3 bg-bg-card rounded-lg hover:border-gold border border-transparent transition-colors">
                          <span className="text-gold">📖</span>
                          <span className="text-text-primary font-medium">{relatedTermData.term}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {((termData.relatedTools && termData.relatedTools.length > 0) || (termData.relatedServices && termData.relatedServices.length > 0)) && (
                <div>
                  <h4 className="text-sm text-muted uppercase tracking-wider mb-4">Tools & Services</h4>
                  <div className="flex flex-col gap-3">
                    {termData.relatedTools?.map(tool => (
                      <Link key={tool} href={tool} className="flex items-center gap-3 p-3 bg-bg-card rounded-lg hover:border-gold border border-transparent transition-colors">
                        <span className="text-gold">⚙️</span>
                        <span className="text-text-primary font-medium">{tool.includes('statistical') ? 'Statistical Test Selector' : 'Research Tool'}</span>
                      </Link>
                    ))}
                    {termData.relatedServices?.map(service => (
                      <Link key={service} href={service} className="flex items-center gap-3 p-3 bg-bg-card rounded-lg hover:border-gold border border-transparent transition-colors">
                        <span className="text-gold">📝</span>
                        <span className="text-text-primary font-medium">{service.replace('/services/', '').replace(/-/g, ' ')}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
