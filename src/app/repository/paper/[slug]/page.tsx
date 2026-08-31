import React from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import CitationGenerator from '@/features/repository/components/CitationGenerator';
import PaperDownloadButton from '@/features/repository/components/PaperDownloadButton';
import { RepositoryPaper } from '@/features/repository/types';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: paper } = await supabase
    .from('repository_papers')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!paper) return { title: 'Paper Not Found | Cee Writing Hub Repository' };

  return {
    title: `${paper.title} | Cee Writing Hub Repository`,
    description: paper.abstract.substring(0, 160) + '...',
    alternates: { canonical: `/repository/paper/${slug}` },
    openGraph: {
      title: paper.title,
      description: paper.abstract.substring(0, 160) + '...',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: paper.title,
      description: paper.abstract.substring(0, 160) + '...',
    }
  };
}

export default async function PaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch paper details
  const { data: paperData, error } = await supabase
    .from('repository_papers')
    .select(`
      *,
      repository_paper_authors(
        author_order,
        repository_authors(id, name, slug, institution)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  const paper = paperData ? {
    ...paperData,
    authors: paperData.repository_paper_authors?.map((rpa: any) => rpa.repository_authors) || []
  } : null;

  if (!paper) {
    return (
      <main className="min-h-screen bg-sage/20">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-40 text-center">
          <h1 className="font-serif font-bold text-green-dark text-3xl mb-4">Paper Not Found</h1>
          <p className="text-muted mb-8">This paper may have been removed or the URL is incorrect.</p>
          <Link href="/repository" className="text-green-dark/70 font-bold hover:underline">← Back to Repository</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // ScholarlyArticle schema — publisher references authoritative org entity
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `https://ceewriting.com/repository/paper/${slug}#article`,
    headline: paper.title,
    abstract: paper.abstract,
    url: `https://ceewriting.com/repository/paper/${slug}`,
    datePublished: paper.publication_date,
    author: paper.authors?.map((a: { name: string }) => ({
      '@type': 'Person',
      name: a.name,
    })),
    publisher: {
      '@id': 'https://ceewriting.com/#organization',
    },
  };

  // Server-rendered BreadcrumbList for repository papers
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ceewriting.com' },
      { '@type': 'ListItem', position: 2, name: 'Research Repository', item: 'https://ceewriting.com/repository' },
      { '@type': 'ListItem', position: 3, name: paper.title, item: `https://ceewriting.com/repository/paper/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-sage/20 selection:bg-green-dark/10/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-16 bg-green-dark text-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-full border border-white/20">
              {paper.discipline}
            </span>
            <span className="px-4 py-1.5 bg-green-dark/10/20 text-green-dark/70 font-bold text-xs uppercase tracking-widest rounded-full border border-green-dark/20/30">
              {paper.paper_type}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            {paper.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
            <div className="flex -space-x-4">
              {paper.authors?.map((a: { id: string; name: string; slug: string }, i: number) => (
                <div key={i} className="w-10 h-10 rounded-full bg-green-dark-mid border-2 border-green-dark flex items-center justify-center text-xs font-bold z-10">
                  {a.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              {paper.authors?.map((a: { id: string; name: string; slug: string }, i: number) => (
                <Link key={a.id} href={`/repository/author/${a.slug}`} className="hover:text-green-dark/70 transition-colors">
                  {a.name}{i < (paper.authors?.length || 0) - 1 ? ',' : ''}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col lg:flex-row gap-12">
          
          {/* Main Column */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-green-dark/10">
              <h2 className="text-2xl font-serif font-bold text-green-dark mb-6">Abstract</h2>
              <div className="prose prose-lg text-muted max-w-none">
                <p className="leading-loose text-justify">{paper.abstract}</p>
              </div>
              
              {/* Keywords */}
              {paper.keywords && (
                <div className="mt-8 pt-8 border-t border-green-dark/5">
                  <h3 className="text-sm font-bold text-green-dark mb-3 uppercase tracking-widest">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 bg-sage/20 text-green-dark/70 rounded-full text-xs font-semibold border border-green-dark/5">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <CitationGenerator paper={paper} />
          </div>

          {/* Sidebar / Metadata */}
          <div className="lg:w-80 space-y-6">
            
            {/* Action Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-green-dark/20/30 text-center sticky top-28">
              <h3 className="font-bold text-green-dark mb-4">Access Full Paper</h3>
              <PaperDownloadButton version={paper.version_string || '1.0'} />
              <p className="text-xs text-green-dark/50 font-medium">
                Version {paper.version_string} • {paper.language}
              </p>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-3xl p-6 border border-green-dark/10">
              <h3 className="font-bold text-green-dark mb-4 text-sm uppercase tracking-widest">Metrics</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-muted text-sm">Views</span>
                <span className="font-bold text-green-dark">{paper.views_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-sm">Downloads</span>
                <span className="font-bold text-green-dark">{paper.downloads_count.toLocaleString()}</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-3xl p-6 border border-green-dark/10">
              <h3 className="font-bold text-green-dark mb-4 text-sm uppercase tracking-widest">Details</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-green-dark/50 font-medium mb-1">Published</dt>
                  <dd className="font-bold text-green-dark">{new Date(paper.publication_date).toLocaleDateString()}</dd>
                </div>
                {paper.doi && (
                  <div>
                    <dt className="text-green-dark/50 font-medium mb-1">DOI</dt>
                    <dd className="font-bold text-green-dark hover:text-green-dark/70 transition-colors break-all">
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">{paper.doi}</a>
                    </dd>
                  </div>
                )}
                {paper.institution && (
                  <div>
                    <dt className="text-green-dark/50 font-medium mb-1">Institution</dt>
                    <dd className="font-bold text-green-dark">{paper.institution}</dd>
                  </div>
                )}
                {paper.license && (
                  <div className="pt-4 mt-4 border-t border-green-dark/5">
                    <dt className="text-green-dark/50 font-medium mb-1 flex items-center gap-2">
                      <span>⚖️</span> License
                    </dt>
                    <dd className="text-green-dark text-xs leading-relaxed">{paper.license}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Ecosystem Cross-Link */}
            <div className="bg-green-dark rounded-3xl p-6 text-white text-center">
              <span className="text-4xl block mb-2">📊</span>
              <h3 className="font-bold mb-2">Conducting similar research?</h3>
              <p className="text-white/70 text-sm mb-4">Our experts can assist with data analysis, methodology, and formatting.</p>
              <Link href="/services" className="inline-block px-4 py-2 bg-green-dark/10 text-green-dark font-bold text-sm rounded-lg hover:bg-green-dark/10-light transition-colors">
                View Services
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
