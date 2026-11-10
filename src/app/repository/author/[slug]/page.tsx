import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorProfileHeader from '@/features/repository/components/AuthorProfileHeader';
import PaperCard from '@/features/repository/components/PaperCard';
import { RepositoryAuthor, RepositoryPaper } from '@/features/repository/types';
import { createClient } from '@/utils/supabase/public';
import { serializeJsonLd } from '@/lib/jsonLd';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

export async function generateStaticParams() {
  return [];
}

async function getAuthor(slug: string): Promise<RepositoryAuthor | null> {
  const { data } = await createClient().from('repository_authors').select('*').eq('slug', slug).maybeSingle();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) return { title: 'Author Not Found | Cee Writing', robots: { index: false } };

  return {
    title: `${author.name} | Cee Writing Repository`,
    description: author.bio || `Research publications by ${author.name}.`,
    alternates: { canonical: `https://ceewriting.com/repository/author/${slug}` },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) notFound();

  const { data: links } = await createClient()
    .from('repository_paper_authors')
    .select('repository_papers(*)')
    .eq('author_id', author.id);

  const papers = (links ?? [])
    .map((link) => link.repository_papers as unknown as RepositoryPaper | null)
    .filter((paper): paper is RepositoryPaper => paper?.status === 'published');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    ...(author.institution ? { affiliation: { '@type': 'Organization', name: author.institution } } : {}),
    url: `https://ceewriting.com/repository/author/${author.slug}`,
  };

  return (
    <main className="min-h-screen bg-bg-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <AuthorProfileHeader author={author} />
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-between items-end mb-8 border-b border-border/10 pb-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Published Research</h2>
            <div className="text-sm font-bold text-text-primary/60 bg-bg-card px-3 py-1 rounded-full border border-border/10">
              {papers.length} {papers.length === 1 ? 'Paper' : 'Papers'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
