import React from 'react';
import Link from 'next/link';

const STORIES = [
  {
    name: 'Tunde B.',
    scholarship: 'Chevening 2024 Scholar',
    quote: 'The readiness check highlighted that my leadership examples were too vague. Following the action plan, I rewrote my essays and secured the interview.',
  },
  {
    name: 'Amaka E.',
    scholarship: 'Erasmus Mundus Scholar',
    quote: 'I thought I was ready until I saw my score. The 90-day gap analysis gave me the exact blueprint to improve my research proposal before the deadline.',
  },
];

export default function ScholarshipTestimonials() {
  return (
    <section
      style={{
        backgroundColor: '#111111',
        paddingTop: '120px',
        paddingBottom: '120px',
        borderTop: '1px solid rgba(197,160,89,0.1)',
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
        <div style={{ marginBottom: '80px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.6)',
              marginBottom: '24px',
            }}
          >
            Real Results
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
            }}
          >
            Don't apply blindly.<br />Prepare systematically.
          </h2>
        </div>

        {/* Testimonials — pure pull-quotes in 2-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '0',
          }}
        >
          {STORIES.map((story, idx) => (
            <div
              key={idx}
              style={{
                paddingTop: '48px',
                paddingBottom: '48px',
                paddingRight: idx === 0 ? 'clamp(24px, 4vw, 64px)' : '0',
                paddingLeft: idx === 1 ? 'clamp(24px, 4vw, 64px)' : '0',
                borderRight: idx === 0 ? '1px solid rgba(197,160,89,0.1)' : 'none',
              }}
            >
              {/* Large decorative quote mark */}
              <div
                className="font-space"
                style={{
                  fontSize: '96px',
                  lineHeight: 1,
                  color: 'rgba(197,160,89,0.08)',
                  fontWeight: 700,
                  marginBottom: '-32px',
                  userSelect: 'none',
                }}
              >
                "
              </div>
              <p
                className="font-inter"
                style={{
                  fontSize: '20px',
                  lineHeight: 1.7,
                  color: '#CCCCCC',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  marginBottom: '40px',
                }}
              >
                {story.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div
                  style={{
                    width: '1px',
                    height: '40px',
                    backgroundColor: '#C5A059',
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#EAEAEA',
                      marginBottom: '4px',
                    }}
                  >
                    {story.name}
                  </div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(197,160,89,0.6)',
                    }}
                  >
                    {story.scholarship}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '32px',
            marginTop: '80px',
            paddingTop: '64px',
            borderTop: '1px solid rgba(197,160,89,0.1)',
          }}
        >
          <Link
            href="/scholarship-check/tracks"
            className="font-space"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 40px',
              backgroundColor: '#C5A059',
              color: '#0A0A0A',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Check My Readiness
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <span
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#555555',
            }}
          >
            Free assessment. Under 15 minutes.
          </span>
        </div>

      </div>
    </section>
  );
}
