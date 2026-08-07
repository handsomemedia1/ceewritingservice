import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

export default async function ProofOfExpertise() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, read_time, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  const fallbackResources = [
    { category: "Research Methodology", title: "Mastering the Lit Review: A Systematic Approach", read_time: "8 min", slug: "#" },
    { category: "Data Analysis", title: "When to use SPSS vs R for Social Sciences", read_time: "12 min", slug: "#" },
    { category: "Scholarship Prep", title: "Deconstructing the Chevening Leadership Essay", read_time: "10 min", slug: "#" }
  ];

  const displayItems = (posts && posts.length >= 3 ? posts : fallbackResources) as Array<{
    category: string; title: string; read_time?: string; slug: string;
  }>;

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: '0',
            minHeight: '600px',
          }}
        >
          {/* Left: image column */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 400px',
              minHeight: '400px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/home/expertise_presentation.jpg"
              alt="Expert presenting academic research"
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Very simple dark overlay for text legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.1) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                right: '40px',
              }}
            >
              <p
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.8)',
                  marginBottom: '16px',
                }}
              >
                Proof of Expertise
              </p>
              <h2
                className="font-space"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#EAEAEA',
                }}
              >
                We don't just offer services.<br />
                <span style={{ color: '#C5A059' }}>We set the standard.</span>
              </h2>
            </div>
          </div>

          {/* Right: article list */}
          <div
            style={{
              flex: '1 1 400px',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid rgba(197,160,89,0.1)',
              borderTop: '1px solid rgba(197,160,89,0.1)',
              borderBottom: '1px solid rgba(197,160,89,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '32px 40px',
                borderBottom: '1px solid rgba(197,160,89,0.1)',
              }}
            >
              <span
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(234,234,234,0.4)',
                }}
              >
                From the Knowledge Hub
              </span>
              <Link
                href="/blog"
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.7)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                View all <span>→</span>
              </Link>
            </div>

            {displayItems.map((item, idx) => (
              <Link
                key={idx}
                href={`/blog/${item.slug}`}
                className="group"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '32px',
                  padding: '40px',
                  borderBottom: idx < displayItems.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                  textDecoration: 'none',
                  flex: 1,
                }}
              >
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(197,160,89,0.4)',
                    paddingTop: '4px',
                    flexShrink: 0,
                  }}
                >
                  0{idx + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    className="font-space"
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(197,160,89,0.6)',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    {item.category}
                  </span>
                  <h3
                    className="font-space group-hover:text-gold"
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#EAEAEA',
                      lineHeight: 1.3,
                      marginBottom: '16px',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="font-inter"
                    style={{
                      fontSize: '12px',
                      color: '#888888',
                      fontWeight: 300,
                    }}
                  >
                    {item.read_time || '5 min'} read
                  </span>
                </div>
                <svg
                  className="group-hover:translate-x-2"
                  style={{ width: '16px', height: '16px', color: 'rgba(197,160,89,0.4)', marginTop: '4px', transition: 'all 0.3s ease' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
