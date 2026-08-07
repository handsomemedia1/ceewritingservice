import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorProfileHeader from '@/features/repository/components/AuthorProfileHeader';
import PaperCard from '@/features/repository/components/PaperCard';
import { RepositoryAuthor, RepositoryPaper } from '@/features/repository/types';

type Props = { params: Promise<{ slug: string }> };

// Mock Data for Phase 11 UI demonstration
const MOCK_AUTHOR: RepositoryAuthor = {
  id: 'a2',
  name: 'Amina Bello',
  slug: 'amina-bello',
  bio: 'Amina Bello is a public health researcher at the University of Lagos specializing in the intersection of climate change and infectious disease epidemiology in West Africa.',
  institution: 'University of Lagos',
  orcid: '0000-0002-1825-0097'
};

const MOCK_AUTHOR_PAPERS: RepositoryPaper[] = [
  {
    id: '2',
    title: 'Predictive Modeling of Malaria Outbreaks using Machine Learning',
    slug: 'predictive-modeling-malaria-ml',
    abstract: 'We present a novel machine learning pipeline integrating climate data and historical epidemiological records to predict localized malaria outbreaks in Sub-Saharan Africa with 87% accuracy, up to 4 weeks in advance.',
    discipline: 'Public Health',
    paper_type: 'Working Paper',
    publication_date: '2026-02-10',
    language: 'English',
    version_string: '2.1',
    status: 'published',
    views_count: 890,
    downloads_count: 210,
    authors: [MOCK_AUTHOR]
  }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // In real app, fetch author by slug
  if (slug !== 'amina-bello') return { title: 'Author Not Found' };

  return {
    title: `${MOCK_AUTHOR.name} | Cee Writing Hub Repository`,
    description: MOCK_AUTHOR.bio || `Research publications by ${MOCK_AUTHOR.name}.`,
    alternates: { canonical: `/repository/author/${slug}` },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  
  if (slug !== 'amina-bello') {
    return (
      <main className="min-h-screen bg-sage/20 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-40 text-center flex-grow">
          <h1 className="font-serif font-bold text-green-dark text-3xl mb-4">Author Not Found</h1>
          <p className="text-muted">This researcher profile does not exist or has been removed.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // JSON-LD Person Schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: MOCK_AUTHOR.name,
    description: MOCK_AUTHOR.bio,
    affiliation: {
      '@type': 'Organization',
      name: MOCK_AUTHOR.institution
    },
    url: `https://ceewriting.com/repository/author/${MOCK_AUTHOR.slug}`
  };

  return (
    <main className="min-h-screen bg-sage/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <AuthorProfileHeader author={MOCK_AUTHOR} />
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="flex justify-between items-end mb-8 border-b border-green-dark/10 pb-4">
            <h2 className="text-2xl font-serif font-bold text-green-dark">Published Research</h2>
            <div className="text-sm font-bold text-green-dark/60 bg-white px-3 py-1 rounded-full border border-green-dark/10">
              {MOCK_AUTHOR_PAPERS.length} {MOCK_AUTHOR_PAPERS.length === 1 ? 'Paper' : 'Papers'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {MOCK_AUTHOR_PAPERS.map(paper => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
