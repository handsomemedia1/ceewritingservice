import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function FeaturedOpportunities() {
  const supabase = await createClient();

  const [blogRes, resourceRes, scholarshipRes] = await Promise.all([
    supabase.from('blog_posts').select('title, slug, category').eq('status', 'published').order('published_at', { ascending: false }).limit(1).single(),
    supabase.from('resources').select('title, category').order('created_at', { ascending: false }).limit(1).single(),
    supabase.from('scholarship_tracks').select('name, slug').eq('is_active', true).order('created_at', { ascending: false }).limit(1).single()
  ]);

  const opportunities = [];

  opportunities.push({
    type: 'Scholarship Track',
    title: scholarshipRes.data?.name || 'Chevening Scholarship 2026',
    tag: scholarshipRes.data ? 'New' : 'Open Now',
    href: scholarshipRes.data ? `/scholarship-check/${scholarshipRes.data.slug}` : '/scholarship-check',
    index: '01',
  });

  if (blogRes.data) {
    opportunities.push({
      type: 'Knowledge Hub',
      title: blogRes.data.title,
      tag: blogRes.data.category || 'Article',
      href: `/blog/${blogRes.data.slug}`,
      index: '02',
    });
  } else {
    opportunities.push({
      type: 'Knowledge Hub',
      title: 'Mastering the Literature Review',
      tag: 'Guide',
      href: '/blog',
      index: '02',
    });
  }

  if (resourceRes.data) {
    opportunities.push({
      type: 'Free Resource',
      title: resourceRes.data.title,
      tag: resourceRes.data.category || 'Template',
      href: '/resources',
      index: '03',
    });
  } else {
    opportunities.push({
      type: 'Professional Service',
      title: 'Premium Data Analysis for PhD Researchers',
      tag: 'Featured',
      href: '/services',
      index: '03',
    });
  }

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
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <p
              className="font-space"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(197,160,89,0.7)',
                marginBottom: '20px',
              }}
            >
              Discover
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(30px, 3.5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
              }}
            >
              Latest opportunities<br />
              <span style={{ color: '#C5A059' }}>&amp; resources for you.</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-space"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(197,160,89,0.8)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              paddingBottom: '12px',
            }}
          >
            Explore all <span>→</span>
          </Link>
        </div>

        {/* Thick divider below header */}
        <div style={{ borderTop: '1px solid rgba(197,160,89,0.2)', marginBottom: '16px' }} />

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {opportunities.slice(0, 3).map((opp, idx) => (
            <Link
              key={idx}
              href={opp.href}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                paddingTop: '32px',
                paddingBottom: '32px',
                borderBottom: '1px solid rgba(197,160,89,0.08)',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1, minWidth: 0 }}>
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(197,160,89,0.4)',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}
                >
                  {opp.index}
                </span>
                <div style={{ minWidth: 0 }}>
                  <span
                    className="font-space"
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(197,160,89,0.6)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {opp.type}
                  </span>
                  <h3
                    className="font-space group-hover:text-gold"
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 28px)',
                      fontWeight: 700,
                      color: '#EAEAEA',
                      lineHeight: 1.2,
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {opp.title}
                  </h3>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
                <span
                  className="font-space hidden sm:block"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#999999',
                  }}
                >
                  {opp.tag}
                </span>
                <span
                  className="group-hover:translate-x-2"
                  style={{
                    color: 'rgba(197,160,89,0.5)',
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
