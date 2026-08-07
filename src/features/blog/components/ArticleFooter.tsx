import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  featured_image: string | null;
  topic_pillar: string | null;
  estimated_read_time: number | null;
  published_at: string | null;
}

interface ArticleFooterProps {
  authorName: string;
  currentPostId: string;
  tags?: string[] | null;
  topicPillar?: string | null;
  referencesText?: string | null;
  prevPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
}

const RELATED_SERVICES: Record<string, { label: string; href: string }[]> = {
  'Research': [
    { label: 'Research Assistance', href: '/services' },
    { label: 'Data Analysis', href: '/services' },
  ],
  'Scholarships': [
    { label: 'Scholarship Readiness Check', href: '/scholarship-check' },
    { label: 'SOP Writing', href: '/services' },
  ],
  'Academic Writing': [
    { label: 'Essay & Report Writing', href: '/services' },
    { label: 'Plagiarism Check', href: '/services' },
  ],
  'Career Development': [
    { label: 'CV Writing', href: '/services' },
    { label: 'LinkedIn Optimisation', href: '/services' },
  ],
  'Data Analysis': [
    { label: 'SPSS / R / Python Analysis', href: '/services' },
    { label: 'Research Assistance', href: '/services' },
  ],
};

async function getRelatedPosts(currentId: string, tags: string[], topicPillar: string | null): Promise<RelatedPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, featured_image, topic_pillar, estimated_read_time, published_at')
    .eq('status', 'published')
    .neq('id', currentId)
    .or(
      topicPillar
        ? `topic_pillar.eq.${topicPillar},tags.ov.{${tags.slice(0, 3).join(',')}}`
        : `tags.ov.{${tags.slice(0, 3).join(',')}}`
    )
    .limit(3);
  return (data as RelatedPost[]) || [];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function ArticleFooter({
  authorName, currentPostId, tags, topicPillar, referencesText, prevPost, nextPost,
}: ArticleFooterProps) {
  const relatedPosts = tags && tags.length > 0
    ? await getRelatedPosts(currentPostId, tags, topicPillar || null)
    : [];

  const relatedServices = topicPillar ? (RELATED_SERVICES[topicPillar] || []) : [];

  return (
    <footer
      style={{
        marginTop: '120px',
        borderTop: '2px solid rgba(197,160,89,0.2)',
        paddingTop: '80px',
      }}
    >
      {/* Author bio — editorial typographic strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '32px',
          paddingBottom: '80px',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          marginBottom: '80px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#C5A059',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span className="font-space" style={{ fontSize: '22px', fontWeight: 700, color: '#0A0A0A' }}>
            {authorName[0]}
          </span>
        </div>
        <div>
          <p
            className="font-space"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '8px',
            }}
          >
            Written by
          </p>
          <p className="font-space" style={{ fontSize: '20px', fontWeight: 700, color: '#EAEAEA', marginBottom: '12px' }}>
            {authorName}
          </p>
          <p className="font-inter" style={{ fontSize: '15px', lineHeight: 1.7, color: '#888888', fontWeight: 300 }}>
            Expert consultant at Cee Writing Hub specialising in academic writing, research methodology, and scholarship strategy.
          </p>
        </div>
      </div>

      {/* References — no card */}
      {referencesText && (
        <div style={{ marginBottom: '80px', borderBottom: '1px solid rgba(197,160,89,0.1)', paddingBottom: '80px' }}>
          <h3
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '32px',
            }}
          >
            References &amp; Further Reading
          </h3>
          <div
            className="font-inter"
            style={{
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#888888',
              whiteSpace: 'pre-line',
            }}
          >
            {referencesText}
          </div>
        </div>
      )}

      {/* Related services — editorial link list */}
      {relatedServices.length > 0 && (
        <div style={{ marginBottom: '80px', borderBottom: '1px solid rgba(197,160,89,0.1)', paddingBottom: '80px' }}>
          <h3
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '32px',
            }}
          >
            Related Services
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {relatedServices.map((svc) => (
              <Link
                key={svc.label}
                href={svc.href}
                className="font-space"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#888888',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(197,160,89,0.3)',
                  paddingBottom: '4px',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {svc.label} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related articles — editorial row list */}
      {relatedPosts.length > 0 && (
        <div style={{ marginBottom: '80px', borderBottom: '1px solid rgba(197,160,89,0.1)', paddingBottom: '80px' }}>
          <h3
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '40px',
            }}
          >
            Continue Reading
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {relatedPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '32px',
                  paddingTop: '32px',
                  paddingBottom: '32px',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(197,160,89,0.08)',
                  textDecoration: 'none',
                }}
              >
                {post.featured_image && (
                  <div style={{ flex: '0 0 96px', height: '64px', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      width={96}
                      height={64}
                      style={{ objectFit: 'cover', width: '100%', height: '100%', filter: 'grayscale(30%)' }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  {post.topic_pillar && (
                    <span
                      className="font-space"
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(197,160,89,0.6)',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {post.topic_pillar}
                    </span>
                  )}
                  <h4
                    className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {post.title}
                  </h4>
                </div>
                {post.estimated_read_time && (
                  <span
                    className="font-space"
                    style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666', flexShrink: 0 }}
                  >
                    {post.estimated_read_time} MIN
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <span
                className="font-space"
                style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', display: 'block', marginBottom: '12px' }}
              >
                ← Previous
              </span>
              <span
                className="font-space"
                style={{ fontSize: '16px', fontWeight: 700, color: '#EAEAEA', lineHeight: 1.3 }}
              >
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              style={{ textDecoration: 'none', textAlign: 'right' }}
            >
              <span
                className="font-space"
                style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', display: 'block', marginBottom: '12px' }}
              >
                Next →
              </span>
              <span
                className="font-space"
                style={{ fontSize: '16px', fontWeight: 700, color: '#EAEAEA', lineHeight: 1.3 }}
              >
                {nextPost.title}
              </span>
            </Link>
          )}
        </div>
      )}

      {/* Final CTA */}
      <div
        style={{
          padding: '80px 0',
          borderTop: '1px solid rgba(197,160,89,0.2)',
          textAlign: 'center',
        }}
      >
        <p
          className="font-space"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.7)', marginBottom: '32px' }}
        >
          Need Expert Help?
        </p>
        <h3
          className="font-space"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#EAEAEA', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '-0.02em' }}
        >
          Let us handle it<br />
          <span style={{ color: '#C5A059' }}>professionally.</span>
        </h3>
        <p
          className="font-inter"
          style={{ fontSize: '17px', lineHeight: 1.8, color: '#888888', marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px auto' }}
        >
          From research and data analysis to CV writing and scholarship applications — our experts deliver results in 24 hours.
        </p>
        <a
          href="https://wa.me/2349056752549"
          target="_blank"
          rel="noreferrer"
          className="font-space"
          style={{
            display: 'inline-block',
            padding: '20px 48px',
            backgroundColor: '#EAEAEA',
            color: '#0A0A0A',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Chat Us on WhatsApp
        </a>
      </div>
    </footer>
  );
}
