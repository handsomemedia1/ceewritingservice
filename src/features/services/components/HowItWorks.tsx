import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Share Your Needs',
    desc: 'Message us on WhatsApp with your document, brief, dataset, or specific requirements. The more context you provide, the better we can match you.',
  },
  {
    number: '02',
    title: 'Expert Assignment',
    desc: 'We pair your project to the most qualified specialist — a researcher, analyst, or writer with direct domain expertise in your subject area.',
  },
  {
    number: '03',
    title: 'Quality Assurance',
    desc: 'Every deliverable undergoes plagiarism checks, grammar review, and senior expert sign-off before it reaches you. No exceptions.',
  },
  {
    number: '04',
    title: 'Delivery and Revisions',
    desc: 'You receive your perfected document on time. Free revisions are included until you are completely satisfied with the result.',
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '120px',
        paddingBottom: '120px',
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
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '80px', alignItems: 'flex-start' }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 400px', position: 'sticky', top: '120px' }}>
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
              Our Process
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                marginBottom: '32px',
              }}
            >
              A seamless process,<br />
              <span style={{ color: '#C5A059' }}>from brief to delivery.</span>
            </h2>
            <p
              className="font-inter"
              style={{
                fontSize: '16px',
                lineHeight: 1.85,
                color: '#999999',
                fontWeight: 300,
                maxWidth: '460px',
              }}
            >
              From first contact to final delivery, we keep you informed and in control at every step.
            </p>
          </div>

          {/* Right Column: Timeline list */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column' }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="group"
                style={{
                  paddingTop: i === 0 ? '0' : '48px',
                  paddingBottom: '48px',
                  borderBottom: i < STEPS.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '32px',
                }}
              >
                <span
                  className="font-space group-hover:text-gold"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(197,160,89,0.4)',
                    letterSpacing: '0.1em',
                    paddingTop: '6px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.number} &mdash;
                </span>
                <div>
                  <h3
                    className="font-space"
                    style={{
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 700,
                      color: '#EAEAEA',
                      marginBottom: '16px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-inter"
                    style={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: '#999999',
                      fontWeight: 300,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
