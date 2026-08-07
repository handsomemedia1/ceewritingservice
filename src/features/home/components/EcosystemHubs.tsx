"use client";
import React from 'react';
import Link from 'next/link';

export default function EcosystemHubs() {
  const hubs = [
    {
      index: '01',
      title: "Knowledge Hub",
      desc: "Peer-reviewed guides, methodology tutorials, and academic insights — free and open to all scholars.",
      href: "/blog",
      cta: "Browse Articles",
    },
    {
      index: '02',
      title: "Scholarship Hub",
      desc: "Readiness assessments, personalised application pathways, and expert-curated scholarship tracks.",
      href: "/scholarship-check",
      cta: "Check Readiness",
    },
    {
      index: '03',
      title: "Resources Hub",
      desc: "Free templates, CV layouts, research checklists, and curated datasets for immediate use.",
      href: "/resources",
      cta: "Get Resources",
    },
    {
      index: '04',
      title: "Research Repository",
      desc: "An archive of past methodologies, academic findings, and project frameworks for reference.",
      href: "/repository",
      cta: "Explore Repository",
    }
  ];

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
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
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.7)',
              marginBottom: '20px',
            }}
          >
            The Ecosystem
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
            }}
          >
            Everything you need,<br />
            <span style={{ color: '#C5A059' }}>under one roof.</span>
          </h2>
        </div>

        {/* Hub rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderTop: '1px solid rgba(197,160,89,0.08)' }} />
          {hubs.map((hub, idx) => (
            <Link
              key={idx}
              href={hub.href}
              className="group"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '60px',
                paddingBottom: '60px',
                borderBottom: '1px solid rgba(197,160,89,0.08)',
                textDecoration: 'none',
                overflow: 'hidden',
                gap: '40px',
              }}
            >
              {/* Giant background number */}
              <div
                className="font-space"
                style={{
                  position: 'absolute',
                  left: '-10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 'clamp(80px, 12vw, 160px)',
                  fontWeight: 700,
                  color: 'rgba(197,160,89,0.03)',
                  lineHeight: 1,
                  zIndex: 0,
                  userSelect: 'none',
                }}
              >
                {hub.index}
              </div>

              {/* Left content */}
              <div style={{ position: 'relative', zIndex: 1, flex: '1 1 400px', paddingLeft: 'clamp(20px, 4vw, 80px)' }}>
                <h3
                  className="font-space group-hover:text-gold"
                  style={{
                    fontSize: 'clamp(28px, 3vw, 44px)',
                    fontWeight: 700,
                    color: '#EAEAEA',
                    marginBottom: '16px',
                    lineHeight: 1.1,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {hub.title}
                </h3>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.85,
                    color: '#999999',
                    fontWeight: 300,
                    maxWidth: '480px',
                  }}
                >
                  {hub.desc}
                </p>
              </div>

              {/* Right CTA */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingLeft: 'clamp(20px, 4vw, 80px)',
                }}
              >
                <span
                  className="font-space group-hover:text-gold"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(197,160,89,0.6)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {hub.cta}
                </span>
                <span
                  className="group-hover:translate-x-2"
                  style={{
                    color: '#C5A059',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
