import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeHubHero from '@/features/blog/components/KnowledgeHubHero';
import ArticleGrid from '@/features/blog/components/ArticleGrid';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Knowledge Hub | Cee Writing Hub',
  description: 'Expert guides on research methodology, data analysis, scholarship strategy, academic writing, and career development for Nigerian students and researchers with global ambitions.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Knowledge Hub | Cee Writing Hub',
    description: 'Expert guides on research, scholarships, data analysis, and academic writing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Hub | Cee Writing Hub',
    description: 'Expert guides on research, scholarships, data analysis, and academic writing.',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ topic?: string; difficulty?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { topic, difficulty } = await searchParams;

  return (
    <main className="bg-bg-main min-h-screen text-text-primary selection:bg-gold/20 selection:text-gold">
      <Navbar />
      <KnowledgeHubHero />
      <ArticleGrid
        showViewAll={false}
        limit={100}
        topicFilter={topic || null}
        difficultyFilter={difficulty || null}
      />
      <NewsletterCTA />
      <Footer />
    </main>
  );
}
