"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const blogs = [
  {
    slug: 'chatgpt-turnitin-truth',
    cat: 'AI Detection',
    date: 'Mar 10, 2026',
    reads: 1240,
    title: 'Does ChatGPT Content Fail Turnitin? Here is The Truth',
    excerpt: 'Many students are using AI to write, but does it actually get caught by Turnitin? We break it down.',
    image: '/images/blog/ai-detection.png',
  },
  {
    slug: 'reduce-plagiarism-tips',
    cat: 'Plagiarism',
    date: 'Feb 28, 2026',
    reads: 870,
    title: 'How To Reduce Plagiarism Without Losing Your Voice',
    excerpt: 'A high plagiarism score does not always mean you copied. Sometimes it is about how you cited your sources.',
    image: '/images/blog/plagiarism.png',
  },
  {
    slug: 'nigerian-cv-rejected',
    cat: 'CV Writing',
    date: 'Feb 14, 2026',
    reads: 650,
    title: '5 Reasons Your Nigerian CV Is Getting Rejected',
    excerpt: 'Most Nigerian graduates send the same generic CV. Here is what recruiters actually want to see.',
    image: '/images/blog/cv-writing.png',
  },
];

// Sort by reads descending so most-read is first
const sortedBlogs = [...blogs].sort((a, b) => b.reads - a.reads);

export default function BlogPreview({ showViewAll = true }: { showViewAll?: boolean }) {
  const featured = sortedBlogs[0];
  const others = sortedBlogs.slice(1);

  return (
    <section id="blog" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{textAlign: 'center', marginBottom: '64px'}}>
        <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Tips and Guides</div>
        <h2 className="section-title" style={{color: 'var(--navy)'}}>Most Read Articles</h2>
        <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
          Free tips on writing better and getting ahead.
        </p>
      </div>

      {/* Featured Article — Most Read */}
      <Link href={`/blog/${featured.slug}`} className="glass-card-light blog-featured" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden',
        textDecoration: 'none', color: 'inherit', marginBottom: '32px',
      }}>
        <div style={{ position: 'relative', minHeight: '280px' }}>
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <span style={{
            position: 'absolute', top: '16px', left: '16px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            color: 'white', fontSize: '10px', fontWeight: 700, padding: '6px 14px',
            borderRadius: '50px', letterSpacing: '1px', textTransform: 'uppercase',
          }}>🔥 Most Read</span>
        </div>
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '12px',
          }}>
            <span style={{
              background: 'rgba(201,147,58,0.12)', color: 'var(--gold)',
              fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '50px',
            }}>{featured.cat}</span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{featured.date}</span>
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700,
            color: 'var(--navy)', lineHeight: 1.3, marginBottom: '12px',
          }}>{featured.title}</div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            {featured.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)' }}>Read Article →</span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{featured.reads.toLocaleString()} reads</span>
          </div>
        </div>
      </Link>

      {/* Other Articles Grid */}
      <div className="bento-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px',
      }}>
        {others.map((b, i) => (
          <Link key={i} href={`/blog/${b.slug}`} className="glass-card-light" style={{
            display: 'block', overflow: 'hidden', textDecoration: 'none', color: 'inherit',
          }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <Image
                src={b.image}
                alt={b.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute', top: '12px', left: '14px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px',
                borderRadius: '50px',
              }}>{b.cat}</span>
            </div>
            <div style={{padding: '24px'}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{fontSize: '12px', color: 'var(--muted)'}}>{b.date}</span>
                <span style={{fontSize: '11px', color: 'var(--muted)'}}>· {b.reads.toLocaleString()} reads</span>
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1.35, marginBottom: '10px',
              }}>{b.title}</div>
              <p style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '14px'}}>{b.excerpt}</p>
              <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--gold)'}}>Read Article →</span>
            </div>
          </Link>
        ))}
      </div>

      {showViewAll && (
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--navy)', color: 'white', padding: '14px 32px',
            borderRadius: '50px', fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            View All Articles →
          </Link>
        </div>
      )}
    </section>
  );
}
