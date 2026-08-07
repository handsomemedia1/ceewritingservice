import React from 'react';

interface ResourcesHeroProps {
  totalCount: number;
}

const STATS = [
  { num: '830+', label: 'Downloads' },
  { num: '100%', label: 'Free, always' },
  { num: '4.8', label: 'Avg Rating' },
];

export default function ResourcesHero({ totalCount }: ResourcesHeroProps) {
  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        borderBottom: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '160px',
        paddingBottom: '80px',
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
        <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
          
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
            Free Resources
          </p>

          <h1
            className="font-space"
            style={{
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '40px',
            }}
          >
            Free Tools &amp;<br />
            <span style={{ color: '#C5A059' }}>Resources.</span>
          </h1>

          <p
            className="font-inter"
            style={{
              fontSize: '20px',
              lineHeight: 1.8,
              color: '#999999',
              fontWeight: 300,
              maxWidth: '640px',
            }}
          >
            Premium templates, guides, and checklists to level up your writing and research. Completely free — no payment, no email, no catch.
          </p>

        </div>

        {/* Stats strip - redesigned for luxury typographic menu */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            borderTop: '1px solid rgba(197,160,89,0.1)',
            paddingTop: '32px',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span
                className="font-space"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#EAEAEA',
                }}
              >
                {stat.num}
              </span>
              <span
                className="font-space"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#666666',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
          {totalCount > 0 && (
            <>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(197,160,89,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span
                  className="font-space"
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#C5A059',
                  }}
                >
                  {totalCount}
                </span>
                <span
                  className="font-space"
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#666666',
                  }}
                >
                  Resources
                </span>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
