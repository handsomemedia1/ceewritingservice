import React from 'react';

const FEATURES = [
  {
    index: '01',
    title: 'Personalised Scoring',
    desc: 'Evaluate your readiness for DAAD, Chevening, Erasmus, and Fulbright with weighted, criterion-based scoring tailored to each programme.',
  },
  {
    index: '02',
    title: 'Immediate Results',
    desc: 'Get honest feedback on your academic, professional, and leadership profile the moment you finish — no email wall, no waiting.',
  },
  {
    index: '03',
    title: 'Actionable Roadmap',
    desc: 'Know exactly what to fix and when. A prioritised 30/60/90-day plan built around the specific gaps in your profile.',
  },
];

export default function ScholarshipFeatures() {
  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
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
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          <div style={{ flex: '1 1 400px' }}>
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
              What You Get
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
              Everything you need<br />to compete confidently.
            </h2>
          </div>
          <p
            className="font-inter"
            style={{
              flex: '1 1 280px',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#888888',
              fontWeight: 300,
              maxWidth: '360px',
            }}
          >
            A structured, data-driven assessment that replaces guesswork with strategy.
          </p>
        </div>

        {/* Features — editorial rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FEATURES.map((f) => (
            <div
              key={f.index}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                gap: '48px',
                paddingTop: '56px',
                paddingBottom: '56px',
                borderBottom: '1px solid rgba(197,160,89,0.1)',
              }}
            >
              <div style={{ flexShrink: 0, width: '48px' }}>
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(197,160,89,0.3)',
                  }}
                >
                  {f.index}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
                  style={{
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    fontWeight: 700,
                    marginBottom: '20px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.8,
                    color: '#888888',
                    fontWeight: 300,
                    maxWidth: '600px',
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
