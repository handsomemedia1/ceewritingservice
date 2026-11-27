import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KnowledgeHubHero from '@/features/blog/components/KnowledgeHubHero';
import ArticleGrid from '@/features/blog/components/ArticleGrid';
import NewsletterCTA from '@/components/NewsletterCTA';
import { createClient } from '@/utils/supabase/public';
import { LEGACY_LINKS } from '@/config/legacyLinks.mjs';
import { serializeJsonLd } from '@/lib/jsonLd';

const redirected = LEGACY_LINKS as Record<string, string>;

async function blogJsonLd() {
  const { data } = await createClient()
    .from('blog_posts')
    .select('slug, title')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  const posts = (data ?? []).filter((p) => p.slug && !redirected[`/blog/${p.slug}`]);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: 'https://ceewriting.com/blog',
    name: 'Cee Writing Knowledge Hub',
    isPartOf: { '@id': 'https://ceewriting.com/#website' },
    publisher: { '@id': 'https://ceewriting.com/#organization' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://ceewriting.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };
}

export const metadata: Metadata = {
  title: 'Knowledge Hub | Cee Writing',
  description: 'Expert guides on research methodology, data analysis, scholarships, academic writing and careers for Nigerian students and researchers.',
  alternates: { canonical: 'https://ceewriting.com/blog' },
  openGraph: {
    title: 'Knowledge Hub | Cee Writing',
    description: 'Expert guides on research, scholarships, data analysis, and academic writing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Hub | Cee Writing',
    description: 'Expert guides on research, scholarships, data analysis, and academic writing.',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ topic?: string; difficulty?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { topic, difficulty } = await searchParams;
  const jsonLd = await blogJsonLd();

  return (
    <main className="bg-bg-main min-h-screen text-text-primary selection:bg-gold/20 selection:text-gold">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
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
