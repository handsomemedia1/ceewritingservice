import React from 'react';
import Link from 'next/link';

interface ArticleHeaderProps {
  title: string;
  authorName: string;
  publishedAt: string;
  lastUpdatedAt?: string | null;
  readTime: number;
  tags?: string[] | null;
  topicPillar?: string | null;
  difficulty?: string | null;
  slug: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function ArticleHeader({
  title, authorName, publishedAt, lastUpdatedAt, readTime, tags, topicPillar, difficulty, slug,
}: ArticleHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: '140px',
        paddingBottom: '80px',
        borderBottom: '1px solid rgba(197,160,89,0.15)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 60px)',
          paddingRight: 'clamp(24px, 6vw, 60px)',
        }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-space"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#555555',
            marginBottom: '48px',
          }}
        >
          <Link href="/" style={{ color: '#555555', textDecoration: 'none' }} className="hover:text-[#C5A059]">Home</Link>
          <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
          <Link href="/blog" style={{ color: '#555555', textDecoration: 'none' }} className="hover:text-[#C5A059]">Knowledge Hub</Link>
          {topicPillar && (
            <>
              <span style={{ color: 'rgba(197,160,89,0.3)' }}>—</span>
              <Link
                href={`/blog?topic=${encodeURIComponent(topicPillar)}`}
                style={{ color: '#C5A059', textDecoration: 'none' }}
              >
                {topicPillar}
              </Link>
            </>
          )}
        </nav>

        {/* Category / Read time row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {topicPillar && (
            <span
              className="font-space"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A059',
              }}
            >
              {topicPillar}
            </span>
          )}
          {difficulty && (
            <>
              <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(197,160,89,0.3)' }} />
              <span
                className="font-space"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888888' }}
              >
                {difficulty}
              </span>
            </>
          )}
          <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(197,160,89,0.3)' }} />
          <span
            className="font-space"
            style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888888' }}
          >
            {readTime} MIN READ
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-space"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            color: '#EAEAEA',
            marginBottom: '48px',
          }}
        >
          {title}
        </h1>

        {/* Author + Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(197,160,89,0.15)',
            flexWrap: 'wrap',
          }}
        >
          {/* Author avatar */}
          <div
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span className="font-space" style={{ fontSize: '16px', fontWeight: 700, color: '#0A0A0A' }}>
              {authorName[0]}
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div
              className="font-space"
              style={{ fontSize: '14px', fontWeight: 700, color: '#EAEAEA', marginBottom: '4px' }}
            >
              {authorName}
            </div>
            <div className="font-space" style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              {lastUpdatedAt && lastUpdatedAt !== publishedAt && (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(lastUpdatedAt)}</span>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
