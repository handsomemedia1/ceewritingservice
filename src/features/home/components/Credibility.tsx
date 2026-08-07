import React from 'react';

export default function Credibility() {
  const pillars = [
    { value: "500+", label: "Projects Delivered", sub: "Nigeria, UK & diaspora" },
    { value: "100%", label: "Human-Written", sub: "Zero AI in final copy" },
    { value: "0%", label: "Plagiarism Rate", sub: "Turnitin-verified" },
    { value: "48hr", label: "Turnaround", sub: "Standard engagements" },
  ];

  const tools = ['SPSS', 'Stata', 'R Studio', 'Python', 'EViews', 'NVivo', 'Excel'];

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(197,160,89,0.1)',
      }}
    >
      {/* Top: Headline + description */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          paddingTop: '120px',
          paddingBottom: '80px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          gap: '60px',
        }}
      >
        <div style={{ flex: '1 1 500px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.7)',
              marginBottom: '24px',
            }}
          >
            Why Choose Us
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
            }}
          >
            World-class expertise.<br />
            <span style={{ color: '#C5A059' }}>Absolute integrity.</span>
          </h2>
        </div>
        <p
          className="font-inter"
          style={{
            flex: '1 1 300px',
            fontSize: '16px',
            lineHeight: 1.85,
            color: '#999999',
            fontWeight: 300,
            maxWidth: '480px',
            paddingBottom: '8px',
          }}
        >
          We combine post-graduate academic rigour with responsible methodology to deliver work that meets the highest global standards — every single time.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(197,160,89,0.1)' }} />

      {/* Stats row */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {pillars.map((p, i) => (
          <div
            key={i}
            style={{
              paddingTop: '60px',
              paddingBottom: '60px',
              paddingRight: '32px',
              borderRight: i < pillars.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
              paddingLeft: i > 0 ? '32px' : '0',
            }}
          >
            <div
              className="font-space text-gradient-gold"
              style={{
                fontSize: 'clamp(44px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: '16px',
              }}
            >
              {p.value}
            </div>
            <div
              className="font-space"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#EAEAEA',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}
            >
              {p.label}
            </div>
            <div
              className="font-inter"
              style={{
                fontSize: '13px',
                color: '#888888',
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(197,160,89,0.1)' }} />

      {/* Tools strip (strictly typographic) */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          paddingTop: '32px',
          paddingBottom: '32px',
        }}
      >
        <p
          className="font-space"
          style={{
            fontSize: '12px',
            color: '#888888',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: 'rgba(197,160,89,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginRight: '16px' }}>
            Tools we use &mdash;
          </span>
          {tools.join(' · ')}
        </p>
      </div>
    </section>
  );
}
