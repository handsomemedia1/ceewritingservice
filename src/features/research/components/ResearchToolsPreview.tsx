import React from 'react';
import Link from 'next/link';

export default function ResearchToolsPreview() {
  const tools = [
    {
      title: 'Statistical Test Selector',
      desc: 'Answer a few questions about your variables and get a recommendation on which test to run.',
      icon: '🎯',
    },
    {
      title: 'Sample Size Calculator',
      desc: 'Determine the exact sample size needed for your population, margin of error, and confidence level.',
      icon: '🔢',
    },
    {
      title: 'Methodology Builder',
      desc: 'Interactive tool to help structure your research design, philosophy, and approach.',
      icon: '🏗️',
    },
  ];

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
            Remove the guesswork from your research design. <span style={{ color: '#C5A059' }}>(Tools currently in development)</span>
          </p>
        </div>

        {/* Tool cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {tools.map((tool, idx) => (
            <div key={idx} style={{
              padding: '36px 32px', borderRadius: '20px', position: 'relative', overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(197,160,89,0.15)',
              opacity: 0.7,
            }}>
              {/* Coming Soon badge */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                padding: '4px 10px', borderRadius: '50px',
                background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)',
                fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)',
              }}>
                Coming Soon
              </div>

              <div style={{ fontSize: '36px', marginBottom: '20px', filter: 'grayscale(0.4)' }}>{tool.icon}</div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700,
                color: 'rgba(234,234,234,0.7)', marginBottom: '12px',
              }}>
                {tool.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(234,234,234,0.35)', lineHeight: 1.7 }}>
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
