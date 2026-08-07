"use client";
import React from 'react';
import TableOfContents from './TableOfContents';
import Link from 'next/link';

interface ArticleSidebarProps {
  topicPillar?: string;
  subtopic?: string;
}

export default function ArticleSidebar({ topicPillar, subtopic }: ArticleSidebarProps) {
  const isResearch = topicPillar === 'Research' || topicPillar === 'Data Analysis';

  return (
    <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Table of Contents */}
      <TableOfContents contentId="article-prose" />

      {/* Related Resources — editorial list, no card */}
      {isResearch && (
        <div style={{ borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '40px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '24px',
            }}
          >
            Related Resources
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: `${subtopic || 'Methodology'} Template`, href: '/resources' },
              { label: 'Quality Checklist', href: '/resources' },
              { label: 'Example Document', href: '/resources' },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#888888',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                    display: 'inline-block',
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
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Consultation CTA — no card, just stark typography */}
      <div
        style={{
          borderTop: '1px solid rgba(197,160,89,0.1)',
          paddingTop: '40px',
        }}
      >
        <p
          className="font-space"
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.6)',
            marginBottom: '16px',
          }}
        >
          {isResearch ? 'Need Expert Execution?' : 'Get Expert Help'}
        </p>
        <p
          className="font-inter"
          style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#777777',
            fontWeight: 300,
            marginBottom: '24px',
          }}
        >
          {isResearch
            ? 'Stuck on your methodology or data analysis? Our consultants can deliver guaranteed results.'
            : 'Need professional support with your research, writing, or applications?'}
        </p>
        <Link
          href="/services"
          className="font-space"
          style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            backgroundColor: '#C5A059',
            padding: '12px 20px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8C980'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C5A059'; }}
        >
          {isResearch ? 'Hire a Research Consultant' : 'View Our Services'}
        </Link>
      </div>

      {/* Inline newsletter — no card */}
      <div style={{ borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '40px' }}>
        <p
          className="font-space"
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.6)',
            marginBottom: '16px',
          }}
        >
          Weekly Insights
        </p>
        <p className="font-inter" style={{ fontSize: '13px', lineHeight: 1.7, color: '#777777', marginBottom: '20px' }}>
          Scholarship alerts, writing tips, and research guides — straight to your inbox.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="font-inter"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid rgba(197,160,89,0.3)',
            paddingBottom: '12px',
            color: '#EAEAEA',
            fontSize: '14px',
            outline: 'none',
            marginBottom: '16px',
          }}
        />
        <button
          className="font-space"
          style={{
            width: '100%',
            padding: '12px 0',
            backgroundColor: '#EAEAEA',
            color: '#0A0A0A',
            border: 'none',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Subscribe Free
        </button>
      </div>
    </aside>
  );
}
