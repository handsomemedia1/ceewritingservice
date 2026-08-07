import React from 'react';
import Image from 'next/image';

const pillars = [
  {
    title: 'Advanced Degree Holders',
    desc: 'Our team holds masters and doctoral qualifications across disciplines — not simply writers but active researchers.',
  },
  {
    title: 'Human Reviewed, Always',
    desc: 'Every deliverable is reviewed by a senior expert before it leaves our desk. Automated outputs never reach you.',
  },
  {
    title: 'Full Confidentiality',
    desc: 'Your documents, data, and identity are never shared. We operate under strict non-disclosure standards.',
  },
  {
    title: 'Transparent at Every Step',
    desc: 'Progress updates throughout the project, clear explanations of every recommendation, and open lines of communication.',
  },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      style={{
        backgroundColor: '#111111',
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
          
          {/* Left Column: Big Header & Stats */}
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
              Why Trust Us
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                marginBottom: '40px',
              }}
            >
              Built on expertise,<br />
              <span style={{ color: '#C5A059' }}>not just experience.</span>
            </h2>
            <p
              className="font-inter"
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                marginBottom: '64px',
                maxWidth: '460px',
              }}
            >
              When you are submitting a scholarship application, defending a thesis, or pitching to an investor — you need to fully trust the people supporting you. Here is how we earn that trust.
            </p>

            <div style={{ borderTop: '1px solid rgba(197,160,89,0.2)', paddingTop: '40px' }}>
              <div
                className="font-space"
                style={{
                  fontSize: '80px',
                  fontWeight: 700,
                  color: '#C5A059',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                100%
              </div>
              <div
                className="font-space"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'rgba(197,160,89,0.8)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  marginTop: '16px',
                  marginBottom: '16px',
                }}
              >
                Quality Assured
              </div>
              <p
                className="font-inter"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#888888',
                  maxWidth: '300px',
                }}
              >
                Turnitin-grade checks, detailed grammar reviews, and formatting verification on every deliverable.
              </p>
            </div>
          </div>

          {/* Right Column: Image and Pillars */}
          <div style={{ flex: '1 1 500px' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                marginBottom: '80px',
                filter: 'grayscale(100%)',
              }}
            >
              <Image
                src="/images/services/process.jpg"
                alt="Professional consultation meeting"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{
                    paddingTop: i === 0 ? '0' : '48px',
                    paddingBottom: '48px',
                    borderBottom: i < pillars.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '32px',
                  }}
                >
                  <span
                    className="font-space"
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'rgba(197,160,89,0.4)',
                      letterSpacing: '0.1em',
                      paddingTop: '6px',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      className="font-space"
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#EAEAEA',
                        marginBottom: '16px',
                      }}
                    >
                      {p.title}
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
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
