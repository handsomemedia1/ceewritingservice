"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 3 real screenshot excerpts for the homepage strip
const SNAPSHOTS = [
  {
    src: '/testimonials/media_1786058442462.png',
    alt: 'Client: Very good work. Pls keep my contact for future work and referring.',
    service: 'PhD Proposal',
    quote: 'Very good work. Keep my contact for future work and referring.',
  },
  {
    src: '/testimonials/media_1786061186325.png',
    alt: 'Client: The 0% AI is shocking them.',
    service: 'AI Humanizing',
    quote: 'The AI check you did for me... The 0% AI is shocking them.',
  },
  {
    src: '/testimonials/media_1786058465056.png',
    alt: 'Client: I was wowed by what I got back. Job well done.',
    service: 'CV Writing',
    quote: 'I was wowed by what I got back from you. A job well done.',
  },
];

export default function HomepageTestimonials() {
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
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px',
            marginBottom: '72px',
          }}
        >
          <div>
            <p
              className="font-space"
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
                textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '20px',
              }}
            >
              Real Clients. Unfiltered.
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700,
                lineHeight: 1.08, letterSpacing: '-0.02em', color: '#EAEAEA',
              }}
            >
              Don't take our word for it.<br />
              <span style={{ color: '#C5A059' }}>Take theirs.</span>
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="font-space"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C5A059')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(197,160,89,0.6)')}
          >
            View all testimonials →
          </Link>
        </div>

        {/* Three-column screenshot + quote layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
          }}
        >
          {SNAPSHOTS.map((s, i) => (
            <div
              key={i}
              style={{
                paddingRight: i < 2 ? 'clamp(24px, 3vw, 48px)' : '0',
                paddingLeft: i > 0 ? 'clamp(24px, 3vw, 48px)' : '0',
                borderRight: i < 2 ? '1px solid rgba(197,160,89,0.08)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Service label */}
              <span
                className="font-space"
                style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)',
                }}
              >
                {s.service}
              </span>

              {/* Screenshot thumbnail */}
              <Link href="/testimonials" style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9/12',
                    overflow: 'hidden',
                    border: '1px solid rgba(197,160,89,0.1)',
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </Link>

              {/* Quote */}
              <p
                className="font-inter"
                style={{
                  fontSize: '15px', lineHeight: 1.75,
                  color: '#AAAAAA', fontWeight: 300, fontStyle: 'italic',
                }}
              >
                "{s.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '32px',
            marginTop: '80px',
            paddingTop: '64px',
            borderTop: '1px solid rgba(197,160,89,0.1)',
          }}
        >
          <Link
            href="/testimonials"
            className="font-space"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              padding: '18px 36px',
              border: '1px solid rgba(197,160,89,0.3)', color: '#EAEAEA',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A059'; e.currentTarget.style.color = '#C5A059'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'; e.currentTarget.style.color = '#EAEAEA'; }}
          >
            See All Client Stories →
          </Link>
          <span
            className="font-space"
            style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555' }}
          >
            500+ satisfied clients
          </span>
        </div>
      </div>
    </section>
  );
}
