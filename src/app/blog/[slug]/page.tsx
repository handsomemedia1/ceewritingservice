import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleHeader from '@/features/blog/components/ArticleHeader';
import ArticleProse from '@/features/blog/components/ArticleProse';
import ArticleSidebar from '@/features/blog/components/ArticleSidebar';
import ArticleFooter from '@/features/blog/components/ArticleFooter';
import ReadingProgressBar from '@/features/blog/components/ReadingProgressBar';
import { createClient } from '@/utils/supabase/server';
import { getRoadmapsForArticle, ROADMAPS } from '@/config/roadmaps';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_title, meta_description, featured_image, tags, published_at, created_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return { title: 'Article Not Found | Cee Writing Hub' };

  const title = post.meta_title || `${post.title} | Cee Writing Hub`;
  const description = post.meta_description || `Read ${post.title} on the Cee Writing Knowledge Hub.`;
  const imageUrl = post.featured_image || '/images/og-default.png';

  return {
    title,
    description,
    alternates: { canonical: `https://ceewriting.com/blog/${slug}` },
    openGraph: {
      title: post.meta_title || post.title,
      description,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      authors: ['Cee Writing Hub'],
      tags: post.tags || [],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description,
      images: [imageUrl],
    },
    // Robots: always indexable — full server render, no client-only gating
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*, profiles(full_name, role)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post || error) notFound();


  // Read tracking (cookie-based deduplication — fire-and-forget, never blocks render)
  cookies().then((cookieStore) => {
    const viewedCookie = cookieStore.get('viewed_posts');
    let viewedPosts: string[] = [];
    try { if (viewedCookie?.value) viewedPosts = JSON.parse(viewedCookie.value); } catch {}
    if (!viewedPosts.includes(post.id)) {
      supabase.from('blog_posts').update({ reads: (post.reads || 0) + 1 }).eq('id', post.id).then(() => {});
    }
  }).catch(() => {});

  // Reading time
  const readTime = post.estimated_read_time
    || Math.max(1, Math.ceil((post.content?.replace(/<[^>]+>/g, '').length || 0) / 1200));

  const authorName = post.profiles?.role === 'admin'
    ? 'Mercy Ogunwale'
    : (post.profiles?.full_name || 'Cee Writing Hub');

  // --- Roadmap awareness ---
  const roadmapMemberships = getRoadmapsForArticle(slug);
  const primaryMembership = roadmapMemberships[0] || null;

  let prevPost: { title: string; slug: string } | null = null;
  let nextPost: { title: string; slug: string } | null = null;

  if (primaryMembership) {
    // Roadmap-ordered prev/next: fetch sibling articles from DB
    const { roadmap, step } = primaryMembership;
    const prevStep = roadmap.steps.find(s => s.step === step.step - 1);
    const nextStep = roadmap.steps.find(s => s.step === step.step + 1);

    if (prevStep) {
      const { data: prevData } = await supabase
        .from('blog_posts').select('title, slug').eq('slug', prevStep.slug).eq('status', 'published').single();
      if (prevData) prevPost = prevData;
    }
    if (nextStep) {
      const { data: nextData } = await supabase
        .from('blog_posts').select('title, slug').eq('slug', nextStep.slug).eq('status', 'published').single();
      if (nextData) nextPost = nextData;
    }
  } else {
    // Fall back to chronological prev/next for non-roadmap articles
    const { data: adjacent } = await supabase
      .from('blog_posts')
      .select('id, title, slug, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: true });

    const allPosts = adjacent || [];
    const currentIndex = allPosts.findIndex((p) => p.id === post.id);
    prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  }

  // Breadcrumb items
  const breadcrumbItems = primaryMembership
    ? [
        { label: 'Home', href: '/' },
        { label: 'Research', href: '/research' },
        { label: primaryMembership.roadmap.title, href: `/research/path/${primaryMembership.roadmap.id}` },
        { label: post.title, href: `/blog/${slug}` },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Knowledge Hub', href: '/blog' },
        { label: post.title, href: `/blog/${slug}` },
      ];

  // JSON-LD structured data — Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || '',
    image: post.featured_image || '',
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://ceewriting.com/about',
    },
    publisher: {
      '@id': 'https://ceewriting.com/#organization',
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.last_updated_at || post.published_at || post.created_at,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://ceewriting.com/blog/${slug}` },
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    keywords: post.tags?.join(', ') || '',
    articleSection: post.tags?.[0] || 'Knowledge Hub',
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://ceewriting.com${item.href}`,
    })),
  };

  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <ReadingProgressBar />
      <Navbar />

      {/* Roadmap progress banner — shown only for roadmap articles */}
      {primaryMembership && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(197,160,89,0.06) 0%, rgba(197,160,89,0.02) 100%)',
          borderBottom: '1px solid rgba(197,160,89,0.15)',
          padding: '12px clamp(24px, 6vw, 100px)',
          marginTop: '64px',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C5A059' }}>
              {primaryMembership.roadmap.title}
            </span>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>·</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(234,234,234,0.5)' }}>
              Step {primaryMembership.step.step} of {primaryMembership.roadmap.steps.length}
            </span>
            <span style={{ marginLeft: 'auto' }}>
              <a href={`/research/path/${primaryMembership.roadmap.id}`}
                style={{ fontSize: '11px', fontWeight: 700, color: '#C5A059', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>
                View Full Roadmap →
              </a>
            </span>
          </div>
        </div>
      )}


      {/* Editorial Article Header */}
      <ArticleHeader
        title={post.title}
        authorName={authorName}
        publishedAt={post.published_at || post.created_at}
        lastUpdatedAt={post.published_at || post.created_at}
        readTime={readTime}
        tags={post.tags}
        topicPillar={post.tags?.[0] || 'Knowledge Hub'}
        difficulty={'Guide'}
        slug={slug}
      />

      {/* Full-bleed featured image — below header, full width */}
      {post.featured_image && (
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
            paddingTop: '64px',
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxHeight: '560px', overflow: 'hidden' }}>
            <Image
              src={post.featured_image}
              alt={post.title}
              width={1280}
              height={560}
              priority
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      {/* Article body + sidebar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          paddingTop: '80px',
          paddingBottom: '40px',
        }}
      >
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-20 items-start">
          {/* Main content — fully server-rendered HTML, crawlable immediately */}
          <article>
            <ArticleProse html={post.content || ''} id="article-prose" />
            <ArticleFooter
              authorName={authorName}
              currentPostId={post.id}
              tags={post.tags}
              topicPillar={post.tags?.[0] || 'Knowledge Hub'}
              referencesText={null}
              prevPost={prevPost}
              nextPost={nextPost}
            />
          </article>

          {/* Sticky sidebar — desktop only */}
          <div
            className="hidden lg:block"
            style={{ borderLeft: '1px solid rgba(197,160,89,0.1)', paddingLeft: '60px' }}
          >
            <ArticleSidebar topicPillar={post.tags?.[0] || 'Knowledge Hub'} subtopic={post.tags?.[1] || null} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}