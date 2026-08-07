"use client";
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const TOPIC_PILLARS = [
  { label: 'Research', icon: '01' },
  { label: 'Methodology', icon: '02' },
  { label: 'Data Analysis', icon: '03' },
  { label: 'Scholarships', icon: '04' },
  { label: 'Academic Writing', icon: '05' },
  { label: 'Career', icon: '06' },
];

export default function KnowledgeHubHero() {
  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '160px',
        paddingBottom: '80px',
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/blog' }]} />
        <div style={{ maxWidth: '800px', marginBottom: '80px' }}>
          
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.7)',
              marginBottom: '32px',
            }}
          >
            The Knowledge Hub
          </p>

          <h1
            className="font-space"
            style={{
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '40px',
            }}
          >
            Learn. Research.<br />
            <span style={{ color: '#C5A059' }}>Advance.</span>
          </h1>

          <p
            className="font-inter"
            style={{
              fontSize: '20px',
              lineHeight: 1.8,
              color: '#999999',
              fontWeight: 300,
              maxWidth: '640px',
            }}
          >
            Expert guides on research methodology, data analysis, scholarship strategy, and academic writing — built for Nigerian researchers with global ambitions.
          </p>

        </div>

        {/* Topic filter shortcuts - redesigned for luxury typographic menu */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            borderTop: '1px solid rgba(197,160,89,0.1)',
            paddingTop: '32px',
          }}
        >
          {TOPIC_PILLARS.map(({ label }) => (
            <a
              key={label}
              href={`/blog?topic=${encodeURIComponent(label)}`}
              className="font-space group"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#888888',
                textDecoration: 'none',
                paddingBottom: '8px',
                borderBottom: '1px solid transparent',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#C5A059';
                e.currentTarget.style.borderColor = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#888888';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
