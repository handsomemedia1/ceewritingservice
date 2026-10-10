import React from 'react';
import Link from 'next/link';

export default function GlossaryPreview() {
  const letters = ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V'];

  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
      background: '#080808',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
          Terminology
        </div>
        <div className="section-divider" style={{ margin: '0 auto 24px' }} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
          color: 'white', letterSpacing: '-0.02em', marginBottom: '16px',
        }}>
          The Research Glossary
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.5)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '640px', marginInline: 'auto' }}>
          Demystify concepts like &ldquo;heteroscedasticity,&rdquo; &ldquo;p-value,&rdquo; or &ldquo;epistemology.&rdquo; Explore 156 peer-reviewed academic definitions with real-world research examples.
        </p>

        {/* Glossary active portal widget */}
        <div style={{
          padding: '48px 40px', borderRadius: '24px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(197,160,89,0.18)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Active Badge */}
          <div style={{
            position: 'absolute', top: '20px', right: '20px',
            padding: '6px 14px', borderRadius: '50px',
            background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.25)',
            fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: '#C5A059',
          }}>
            156 Terms Active
          </div>

          {/* Letter tiles */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '8px', marginBottom: '32px',
          }}>
            {letters.map((letter) => (
              <Link
                key={letter}
                href="/research/glossary"
                style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(197,160,89,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#C5A059',
                  fontFamily: "'Space Grotesk', sans-serif",
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {letter}
              </Link>
            ))}
          </div>

          {/* Search CTA Box */}
          <div style={{ maxWidth: '520px', margin: '0 auto' }}>
            <Link
              href="/research/glossary"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(197,160,89,0.3)',
                borderRadius: '50px', padding: '12px 24px', textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#C5A059', fontSize: '16px' }}>🔍</span>
                <span style={{ color: 'rgba(234,234,234,0.7)', fontSize: '14px', fontWeight: 500 }}>
                  Search 156 research terms &amp; definitions...
                </span>
              </div>
              <span style={{
                background: '#C5A059', color: '#0A0A0A', fontSize: '12px', fontWeight: 700,
                padding: '6px 14px', borderRadius: '20px',
              }}>
                Explore &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
