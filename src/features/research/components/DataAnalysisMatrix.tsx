import React from 'react';
import Link from 'next/link';

export default function DataAnalysisMatrix() {
  const tools = [
    { name: 'SPSS',     category: 'Quantitative', active: true  },
    { name: 'R',        category: 'Quantitative', active: true  },
    { name: 'Python',   category: 'Quantitative', active: true  },
    { name: 'Stata',    category: 'Quantitative', active: false },
    { name: 'EViews',   category: 'Quantitative', active: false },
    { name: 'GenStat',  category: 'Quantitative', active: false },
    { name: 'Excel',    category: 'Quantitative', active: true  },
    { name: 'NVivo',    category: 'Qualitative',  active: false },
    { name: 'ATLAS.ti', category: 'Qualitative',  active: false },
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
      background: '#080808',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', marginBottom: '56px' }}>
          <div style={{ maxWidth: '520px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
              Data Analysis
            </div>
            <div className="section-divider" />
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
              color: 'white', letterSpacing: '-0.02em', marginBottom: '14px',
            }}>
              Software-Specific Methodologies
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.4)', lineHeight: 1.7 }}>
              Tutorials, interpretation guides, and troubleshooting steps tailored to your specific statistical package.
            </p>
          </div>
          <Link href="/research/data-analysis" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: '#C5A059', fontWeight: 700, fontSize: '13px',
            textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none',
          }}>
            Enter Data Analysis Hub →
          </Link>
        </div>

        {/* Tool tiles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.active ? `/research/data-analysis?software=${tool.name.toLowerCase()}` : '#'}
              style={{ textDecoration: 'none', cursor: tool.active ? 'pointer' : 'not-allowed' }}
            >
              <div style={{
                padding: '24px 20px', textAlign: 'center', borderRadius: '16px',
                background: tool.active ? 'rgba(255,255,255,0.03)' : 'transparent',
                border: tool.active ? '1px solid rgba(197,160,89,0.15)' : '1px dashed rgba(197,160,89,0.08)',
                opacity: tool.active ? 1 : 0.5,
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { if (tool.active) { (e.currentTarget as HTMLDivElement).style.background = 'rgba(197,160,89,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(197,160,89,0.35)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; } }}
                onMouseLeave={e => { if (tool.active) { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(197,160,89,0.15)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; } }}
              >
                <div style={{
                  fontSize: '15px', fontWeight: 700, color: tool.active ? 'white' : 'rgba(234,234,234,0.4)',
                  marginBottom: '6px', fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {tool.name}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)' }}>
                  {tool.category}
                </div>
                {!tool.active && (
                  <div style={{
                    marginTop: '10px', fontSize: '9px', fontWeight: 700,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: 'rgba(197,160,89,0.4)',
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            </Link>
          ))}

          {/* CTA tile */}
          <div style={{
            padding: '24px 20px', textAlign: 'center', borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(197,160,89,0.12), rgba(197,160,89,0.06))',
            border: '1px solid rgba(197,160,89,0.25)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', fontFamily: "'Space Grotesk', sans-serif" }}>
              Need it done for you?
            </div>
            <Link href="/services" style={{
              fontSize: '12px', color: '#C5A059', fontWeight: 600,
              textDecoration: 'underline', textUnderlineOffset: '3px',
            }}>
              Hire a Data Analyst
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
