import React from 'react';
import Link from 'next/link';

const SCHOLARSHIPS = [
  { name: 'DAAD', flag: '🇩🇪' },
  { name: 'Chevening', flag: '🇬🇧' },
  { name: 'Erasmus', flag: '🇪🇺' },
  { name: 'Fulbright', flag: '🇺🇸' },
];

const STATS = [
  { num: '5', label: 'Scholarship Tracks' },
  { num: '15min', label: 'Assessment Time' },
  { num: '100%', label: 'Free, Always' },
];

export default function ScholarshipHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Full-bleed background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/scholarship-hero.jpg"
          alt="Student preparing scholarship application"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0A0A0A 40%, rgba(10,10,10,0.7) 70%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 20%, rgba(10,10,10,0.2) 60%, transparent)' }} />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          paddingBottom: '100px',
        }}
      >
        <div style={{ maxWidth: '680px' }}>

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
            Scholarship Readiness Checker
          </p>

          <h1
            className="font-space"
            style={{
              fontSize: 'clamp(42px, 6.5vw, 88px)',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '32px',
            }}
          >
            Are you ready<br />
            for that{' '}
            <span style={{ color: '#C5A059' }}>scholarship?</span>
          </h1>

          <p
            className="font-inter"
            style={{
              fontSize: '20px',
              lineHeight: 1.8,
              color: '#AAAAAA',
              fontWeight: 300,
              maxWidth: '520px',
              marginBottom: '56px',
            }}
          >
            Stop guessing. Evaluate your profile against real selection criteria and get a personalised action plan built around your gaps.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginBottom: '64px' }}>
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
                transition: 'background-color 0.3s ease',
              }}
            >
              Start Free Assessment
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
                color: '#666666',
              }}
            >
              Free. No email required.
            </span>
          </div>

          {/* Scholarship badges + stats */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '24px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(197,160,89,0.1)',
            }}
          >
            <span
              className="font-space"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555555' }}
            >
              Covering
            </span>
            {SCHOLARSHIPS.map(({ name, flag }) => (
              <span
                key={name}
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#AAAAAA',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{flag}</span>
                {name}
              </span>
            ))}
            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(197,160,89,0.2)', margin: '0 8px' }} />
            {STATS.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#EAEAEA' }}>{s.num}</span>
                <span className="font-space" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555' }}>{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
