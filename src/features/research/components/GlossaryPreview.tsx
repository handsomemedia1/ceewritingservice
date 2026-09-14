import React from 'react';

export default function GlossaryPreview() {
  const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

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
        <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.4)', lineHeight: 1.7, marginBottom: '48px' }}>
          Confused by terms like "heteroscedasticity" or "ontology"? Search our definitive glossary of research and statistical terminology.
        </p>

        {/* Glossary widget (coming soon) */}
        <div style={{
          padding: '48px 40px', borderRadius: '24px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(197,160,89,0.12)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Coming Soon label */}
          <div style={{
            position: 'absolute', top: '20px', right: '20px',
            padding: '6px 14px', borderRadius: '50px',
            background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)',
            fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: '#C5A059',
          }}>
            Coming Soon
          </div>

          {/* Letter tiles */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '8px', marginBottom: '32px', opacity: 0.45, pointerEvents: 'none',
          }}>
            {letters.map((letter) => (
              <div key={letter} style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(197,160,89,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700, color: 'rgba(234,234,234,0.5)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                {letter}
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: '480px', margin: '0 auto', opacity: 0.4, pointerEvents: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(197,160,89,0.12)',
              borderRadius: '50px', padding: '14px 24px',
            }}>
              <span style={{ color: 'rgba(197,160,89,0.5)', fontSize: '16px' }}>🔍</span>
              <span style={{ color: 'rgba(234,234,234,0.3)', fontSize: '14px' }}>
                Search a term (e.g., ANOVA, Null Hypothesis)...
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
