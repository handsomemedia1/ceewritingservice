import React from 'react';
import Link from 'next/link';

export default function HowWeHelp() {
  const steps = [
    {
      num: '01',
      title: 'Learn & Discover',
      href: '/blog',
      desc: 'Access peer-reviewed guides, methodology tutorials, and scholarship breakdowns in our open-access Knowledge Hub — completely free.'
    },
    {
      num: '02',
      title: 'Assess & Prepare',
      href: '/scholarship-check',
      desc: 'Use our proprietary Scholarship Readiness Check to identify your gaps, measure your profile strength, and plan your application journey.'
    },
    {
      num: '03',
      title: 'Consult & Execute',
      href: '/services',
      desc: 'Work directly with our experts to finalize data analysis, polish your thesis, or draft a winning statement of purpose to global standards.'
    }
  ];

  return (
    <section
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '64px',
        }}
      >
        {/* Left Sticky Column */}
        <div style={{ flex: '1 1 400px', position: 'sticky', top: '140px', alignSelf: 'flex-start' }}>
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
            How We Help
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            One ecosystem.<br />
            <span style={{ color: '#C5A059' }}>Every need.</span>
          </h2>
          <p
            className="font-inter"
            style={{
              fontSize: '16px',
              lineHeight: 1.85,
              color: '#999999',
              fontWeight: 300,
              maxWidth: '380px',
            }}
          >
            Whether you're just starting your literature review or need a final statistical model, our ecosystem is built to support your exact stage of the journey.
          </p>
        </div>

        {/* Right Steps Column */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => (
            <div key={i}>
              <div
                style={{
                  paddingTop: i === 0 ? '0' : '64px',
                  paddingBottom: '64px',
                }}
              >
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(197,160,89,0.4)',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {s.num} &mdash;
                </span>
                <h3
                  className="font-space"
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 48px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: '#EAEAEA',
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.85,
                    color: '#999999',
                    fontWeight: 300,
                    marginBottom: '32px',
                    maxWidth: '460px',
                  }}
                >
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="group"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#C5A059',
                    textDecoration: 'none',
                  }}
                >
                  <span>Explore</span>
                  <span style={{ transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1">→</span>
                </Link>
              </div>
              {/* Thin divider except for last item */}
              {i < steps.length - 1 && (
                <div style={{ borderTop: '1px solid rgba(197,160,89,0.08)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
