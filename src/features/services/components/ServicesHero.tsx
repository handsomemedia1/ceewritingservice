"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const SERVICES_CTAS = {
  primary: { label: 'Book a Consultation', href: '/services#consultation' },
  secondary: { label: 'Browse Services', href: '/services#catalog' },
  whatsapp: 'https://wa.me/2349056752549',
};

export default function ServicesHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '80px',
      }}
    >
      {/* Full-bleed background image - subtle grayscale */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/services/hero.jpg"
          alt="Professional academic researcher working at desk"
          fill
          style={{ objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.6 }}
          priority
        />
        {/* Gradients for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0A0A0A 10%, rgba(10,10,10,0.5) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 60%)' }} />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <p
            className="font-space animate-fade-in-up"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.8)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'rgba(197,160,89,0.5)', display: 'block', flexShrink: 0 }} />
            Specialized Writing &amp; Research
          </p>

          <h1
            className="font-space animate-fade-in-up"
            style={{
              fontSize: 'clamp(42px, 6vw, 84px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '32px',
              animationDelay: '0.1s',
            }}
          >
            Precision writing.<br />
            <span style={{ color: '#C5A059' }}>Zero compromise.</span>
          </h1>

          <p
            className="font-inter animate-fade-in-up"
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#999999',
              fontWeight: 300,
              marginBottom: '48px',
              maxWidth: '540px',
              animationDelay: '0.2s',
            }}
          >
            Professional academic, business, and data analysis services. We deliver authentic, heavily researched, and human-crafted documents that perform on the highest stage.
          </p>

          <div
            className="animate-fade-in-up"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', animationDelay: '0.3s' }}
          >
            <Link href="#consultation" className="btn-primary">
              Book a Consultation
            </Link>
            <Link
              href="#catalog"
              className="font-space"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(234,234,234,0.7)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(234,234,234,0.3)',
                paddingBottom: '4px',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C5A059'; e.currentTarget.style.borderColor = '#C5A059'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(234,234,234,0.7)'; e.currentTarget.style.borderColor = 'rgba(234,234,234,0.3)'; }}
            >
              Browse All Services
            </Link>
          </div>

          {/* Trust micro-strip */}
          <div
            className="animate-fade-in-up"
            style={{
              marginTop: '64px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(197,160,89,0.2)',
              animationDelay: '0.4s',
            }}
          >
            <p
              className="font-space"
              style={{
                fontSize: '11px',
                color: 'rgba(153,153,153,0.8)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                lineHeight: 1.6,
              }}
            >
              {['500+ Projects', 'Turnitin Verified', 'Confidential', '48hr Delivery'].join(' · ')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
