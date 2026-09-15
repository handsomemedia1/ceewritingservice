import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';
import { getRoadmapBySlug, type RoadmapStep } from '@/config/roadmaps';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) return { title: 'Roadmap Not Found | Cee Writing' };
  return {
    title: `${roadmap.title} Roadmap | Cee Writing Research Hub`,
    description: roadmap.description,
    alternates: { canonical: `https://ceewriting.com/research/path/${slug}` },
    openGraph: {
      title: `${roadmap.title} | Research Learning Path`,
      description: roadmap.description,
      type: 'website',
    },
  };
}

interface ArticleRow {
  slug: string;
  title: string;
  content: string | null;
}

function calcReadTime(content: string | null): number | null {
  if (!content) return null;
  return Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').length / 1200));
}

export default async function LearningPathPage({ params }: Props) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);

  if (!roadmap) {
    return (
      <main style={{ minHeight: '100vh', background: '#0A0A0A' }}>
        <Navbar />
        <section style={{ paddingTop: '160px', paddingBottom: '120px', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🗺️</div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
              Roadmap in Development
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.5)', lineHeight: 1.8, marginBottom: '40px' }}>
              Our methodology experts are assembling this learning path. Check back soon.
            </p>
            <Link href="/research" style={{ fontSize: '13px', fontWeight: 700, color: '#C5A059', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Back to Research Hub
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const supabase = await createClient();
  const stepSlugs = roadmap.steps.map((s: RoadmapStep) => s.slug);
  const { data: articles } = await supabase
    .from('blog_posts')
    .select('slug, title, content')
    .in('slug', stepSlugs)
    .eq('status', 'published');

  const articleMap = new Map<string, ArticleRow>(
    (articles || []).map((a: ArticleRow) => [a.slug, a])
  );

  const roadmapJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${roadmap.title} | Research Roadmap`,
    description: roadmap.description,
    url: `https://ceewriting.com/research/path/${slug}`,
    publisher: { '@id': 'https://ceewriting.com/#organization' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ceewriting.com' },
      { '@type': 'ListItem', position: 2, name: 'Research Hub', item: 'https://ceewriting.com/research' },
      { '@type': 'ListItem', position: 3, name: roadmap.title, item: `https://ceewriting.com/research/path/${slug}` },
    ],
  };

  const deeperLinks = [
    { label: 'Statistical Tests', href: '/blog/choose-statistical-test' },
    { label: 'SPSS Tutorials', href: '/research/data-analysis?software=spss' },
    { label: 'Python for Research', href: '/research/data-analysis?software=python' },
    { label: 'R Statistics', href: '/research/data-analysis?software=r' },
    { label: 'Research Methodology', href: '/blog/research-methodology-chapter' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />

      {/* Header */}
      <section style={{
        paddingTop: 'clamp(120px, 14vw, 160px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0d12 100%)',
        borderBottom: '1px solid rgba(197,160,89,0.1)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <Link href="/research" style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(197,160,89,0.6)', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Research Hub
            </Link>
            <span style={{ color: 'rgba(197,160,89,0.3)' }}>›</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', letterSpacing: '1px', textTransform: 'uppercase' }}>{roadmap.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '40px' }}>{roadmap.icon}</span>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800, color: 'white', lineHeight: 1.1,
              letterSpacing: '-0.02em', margin: 0,
            }}>
              {roadmap.title}
            </h1>
          </div>

          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'rgba(234,234,234,0.55)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '600px' }}>
            {roadmap.description}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(234,234,234,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>For:</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(234,234,234,0.75)' }}>{roadmap.audience}</span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)', maxWidth: '940px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '48px' }}>
          Your Research Path — {roadmap.steps.length} Steps
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {roadmap.steps.map((step: RoadmapStep, i: number) => {
            const article = articleMap.get(step.slug);
            const rt = article ? calcReadTime(article.content) : null;
            const isLast = i === roadmap.steps.length - 1;

            return (
              <div key={step.slug} style={{ display: 'flex', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: article ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.04)',
                    border: article ? '2px solid rgba(197,160,89,0.5)' : '2px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 800,
                    color: article ? '#C5A059' : 'rgba(234,234,234,0.25)',
                  }}>
                    {step.step}
                  </div>
                  {!isLast && (
                    <div style={{
                      flex: 1, width: '2px', minHeight: '32px',
                      background: 'linear-gradient(180deg, rgba(197,160,89,0.3) 0%, rgba(197,160,89,0.06) 100%)',
                      margin: '4px 0',
                    }} />
                  )}
                </div>

                <div style={{ flex: 1, paddingLeft: '24px', paddingBottom: isLast ? '0' : '28px' }}>
                  {article ? (
                    <Link href={`/blog/${step.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{
                        padding: '22px 26px', borderRadius: '12px',
                        background: 'rgba(197,160,89,0.04)',
                        border: '1px solid rgba(197,160,89,0.12)',
                      }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(197,160,89,0.55)', marginBottom: '8px' }}>
                          Step {step.step}
                        </div>
                        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'white', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                          {article.title}
                        </h2>
                        <p style={{ fontSize: '14px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.7, margin: 0 }}>
                          {step.short_description}
                        </p>
                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            Read Step {step.step} →
                          </span>
                          {rt && (
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(197,160,89,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                              {rt} min read
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div style={{
                      padding: '22px 26px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.015)',
                      border: '1px dashed rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(234,234,234,0.18)', marginBottom: '8px' }}>
                        Step {step.step} · Coming Soon
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(234,234,234,0.25)', margin: 0 }}>
                        {step.short_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specialized clusters */}
      <section style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(135deg, rgba(197,160,89,0.06) 0%, rgba(197,160,89,0.02) 100%)',
        borderTop: '1px solid rgba(197,160,89,0.1)',
      }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '16px' }}>Go Deeper</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'white', marginBottom: '20px' }}>
            Specialized Knowledge Clusters
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.8, marginBottom: '32px', maxWidth: '520px' }}>
            Each step connects to deeper clusters in statistics, software, and methodology.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {deeperLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: '10px 18px', borderRadius: '8px', textDecoration: 'none',
                background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.2)',
                fontSize: '13px', fontWeight: 700, color: '#C5A059',
              }}>
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
