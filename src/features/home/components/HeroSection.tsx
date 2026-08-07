"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

export default function HeroSection() {
  return (
    <section
      className="relative bg-bg-main overflow-hidden"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '140px',
        paddingBottom: '80px',
        width: '100%',
      }}
    >
      {/* Full-bleed image — right 60% */}
      <div
        className="absolute top-0 right-0 h-full z-0 animate-fade-in-up"
        style={{ width: '60%', animationDuration: '1.5s', opacity: 0 }}
      >
        <Image
          src="/images/home/hero_student.jpg"
          alt="Nigerian postgraduate student researching at night"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark fade from left */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #0A0A0A 30%, rgba(10,10,10,0.85) 60%, transparent 100%)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 50%)' }}
        />
      </div>


      {/* Content */}
      <div
        className="relative z-10"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '580px' }}>

          {/* Eyebrow */}
          <p
            className="font-space font-bold uppercase animate-fade-in-up"
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'rgba(197,160,89,0.8)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              opacity: 0,
              animationDelay: '0.2s',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'rgba(197,160,89,0.5)', display: 'block', flexShrink: 0 }} />
            Nigeria&apos;s Premier Academic Ecosystem
          </p>

          {/* Headline */}
          <h1
            className="font-space font-bold text-text-primary animate-fade-in-up"
            style={{
              fontSize: 'clamp(34px, 4vw, 68px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              opacity: 0,
              animationDelay: '0.4s',
            }}
          >
            Your research.<br />
            <span className="text-gradient-gold">Perfected.</span><br />
            Your future, secured.
          </h1>

          {/* Sub */}
          <p
            className="font-inter font-light animate-fade-in-up"
            style={{
              fontSize: '16px',
              lineHeight: 1.85,
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '460px',
              opacity: 0,
              animationDelay: '0.6s',
            }}
          >
            Expert research consultancy, advanced data analysis, and premium academic writing for scholars and professionals who refuse to settle for ordinary.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', opacity: 0, animationDelay: '0.8s' }}
          >
            <Link
              href="/services#consultation"
              onClick={() => trackEvent('consultation_request')}
              className="btn-primary group"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <span>Book a Consultation</span>
              <svg
                style={{ width: '16px', height: '16px' }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/scholarship-check"
              onClick={() => trackEvent('scholarship_assessment_started')}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              Check Scholarship Readiness
            </Link>
          </div>

          {/* Trust line */}
          <div
            className="animate-fade-in-up"
            style={{
              marginTop: '36px',
              paddingLeft: '16px',
              borderLeft: '2px solid rgba(197,160,89,0.4)',
              opacity: 0,
              animationDelay: '1s',
            }}
          >
            <p
              className="font-inter"
              style={{ fontSize: '13px', color: 'rgba(153,153,153,0.85)', letterSpacing: '0.02em' }}
            >
              Trusted by{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>500+</strong>{' '}
              students &amp; professionals across Nigeria and the UK.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute animate-fade-in-up"
        style={{
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0,
          animationDelay: '1.2s',
        }}
      >
        <span
          className="font-space"
          style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)' }}
        >
          Scroll
        </span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(197,160,89,0.6), transparent)' }} />
      </div>
    </section>
  );
}
