import React from 'react';
import Link from 'next/link';

export default function ComputationalResearchPreview() {
  const hubs = [
    {
      title: 'Machine Learning',
      desc: 'Predictive analytics, deep learning models, and algorithm design for advanced computational research.',
      href: '/research/machine-learning',
      icon: '🤖',
      tools: ['Python', 'TensorFlow', 'Scikit-learn', 'PyTorch'],
      accent: 'rgba(139,92,246,0.12)',
      accentBorder: 'rgba(139,92,246,0.25)',
      accentText: '#a78bfa',
    },
    {
      title: 'Mathematical Modelling',
      desc: 'Formulate, simulate, and analyze complex systems using differential equations and dynamic models.',
      href: '/research/mathematical-modelling',
      icon: '📐',
      tools: ['MATLAB', 'Simulink', 'Optimization', 'Systems Dynamics'],
      accent: 'rgba(59,130,246,0.12)',
      accentBorder: 'rgba(59,130,246,0.25)',
      accentText: '#60a5fa',
    },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
      background: 'linear-gradient(180deg, #080808 0%, #0d0d12 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
            Advanced Research
          </div>
          <div className="section-divider" />
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
            color: 'white', letterSpacing: '-0.02em', marginBottom: '14px',
          }}>
            Computational &amp; Predictive Hubs
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.4)', lineHeight: 1.7, maxWidth: '520px' }}>
            Push the boundaries of your PhD research with advanced machine learning architectures and robust mathematical simulations.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {hubs.map((hub) => (
            <div key={hub.title} className="glass-card" style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column' }}>
              {/* Icon */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: hub.accent, border: `1px solid ${hub.accentBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '24px',
              }}>
                {hub.icon}
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700,
                color: 'white', marginBottom: '12px',
              }}>
                {hub.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                {hub.desc}
              </p>

              {/* Tool tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {hub.tools.map((tool) => (
                  <span key={tool} style={{
                    padding: '5px 12px', borderRadius: '50px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '11px', fontWeight: 600, color: 'rgba(234,234,234,0.5)',
                  }}>
                    {tool}
                  </span>
                ))}
              </div>

              <Link href={hub.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: hub.accentText, fontWeight: 700, fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '1.5px', textDecoration: 'none',
              }}>
                Enter {hub.title} Hub →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
