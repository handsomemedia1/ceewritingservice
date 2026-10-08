import React from 'react';
import Link from 'next/link';
import { researchTools } from '../data/tools';

export default function ResearchToolsPreview() {
  // Select a few representative tools for the preview
  const previewToolSlugs = ['statistical-test-selector', 'sample-size-calculator', 'methodology-builder'];
  const previewTools = previewToolSlugs.map(slug => researchTools.find(t => t.slug === slug)).filter(Boolean) as typeof researchTools;

  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
      background: '#0A0A0A',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
            Interactive Tools
          </div>
          <div className="section-divider" style={{ margin: '0 auto 24px' }} />
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
            color: 'white', letterSpacing: '-0.02em', marginBottom: '14px',
          }}>
            Research Decision Tools
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.4)', lineHeight: 1.7 }}>
            Remove the guesswork from your research design.
          </p>
        </div>

        {/* Tool cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {previewTools.map((tool, idx) => {
            const isPlanned = tool.status === 'planned';
            const icon = tool.slug === 'statistical-test-selector' ? '🎯' : tool.slug === 'sample-size-calculator' ? '🔢' : '🏗️';

            const CardContent = (
              <div style={{
                padding: '36px 32px', borderRadius: '20px', position: 'relative', overflow: 'hidden',
                background: isPlanned ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                border: isPlanned ? '1px dashed rgba(197,160,89,0.15)' : '1px solid rgba(197,160,89,0.2)',
                opacity: isPlanned ? 0.7 : 1,
                cursor: isPlanned ? 'default' : 'pointer',
                height: '100%',
                transition: 'border-color 0.3s, background 0.3s'
              }}
              onMouseEnter={(e) => { if(!isPlanned) { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; } }}
              onMouseLeave={(e) => { if(!isPlanned) { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
              >
                {/* Coming Soon badge */}
                {isPlanned && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    padding: '4px 10px', borderRadius: '50px',
                    background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px',
                    textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)',
                  }}>
                    Planned
                  </div>
                )}

                <div style={{ fontSize: '36px', marginBottom: '20px', filter: isPlanned ? 'grayscale(0.4)' : 'none' }}>{icon}</div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700,
                  color: isPlanned ? 'rgba(234,234,234,0.7)' : 'white', marginBottom: '12px',
                }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(234,234,234,0.35)', lineHeight: 1.7 }}>
                  {tool.description}
                </p>
              </div>
            );

            return isPlanned ? (
              <div key={idx}>{CardContent}</div>
            ) : (
              <Link key={idx} href={tool.href} style={{ textDecoration: 'none' }}>
                {CardContent}
              </Link>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/research/tools" style={{
            display: 'inline-block', padding: '14px 28px', borderRadius: '50px',
            background: 'rgba(197,160,89,0.1)', color: '#C5A059',
            fontSize: '13px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(197,160,89,0.3)'
          }}>
            View All Research Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
