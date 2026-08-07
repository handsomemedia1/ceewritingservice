"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '120px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}
    >
      {/* Background image at low opacity */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/home/desk_flatlay.jpg"
          alt="Academic desk workspace"
          fill
          style={{ objectFit: 'cover', opacity: 0.08 }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '60px',
        }}
      >
        {/* Left Column */}
        <div
          style={{
            flex: '1 1 500px',
            borderRight: '1px solid rgba(197,160,89,0.1)',
            paddingRight: 'clamp(24px, 4vw, 80px)',
          }}
        >
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
            Stay Informed
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(36px, 4vw, 60px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '32px',
            }}
          >
            Research insights &amp;<br />
            <span style={{ color: '#C5A059' }}>scholarship deadlines,</span><br />
            delivered to you.
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
            Join 2,000+ scholars getting peer-reviewed guides, scholarship alerts, and exclusive discounts.
          </p>
        </div>

        {/* Right Column - Form */}
        <div style={{ flex: '1 1 300px' }}>
          {submitted ? (
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(197,160,89,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C5A059',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                className="font-space"
                style={{ fontSize: '15px', fontWeight: 700, color: '#C5A059', letterSpacing: '0.05em' }}
              >
                You're in. Welcome to the community.
              </p>
              <p className="font-inter" style={{ fontSize: '13px', color: '#999999', fontWeight: 300 }}>
                Check your inbox for a confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="font-inter"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: inputFocused ? '1px solid #C5A059' : '1px solid rgba(197,160,89,0.3)',
                  paddingBottom: '16px',
                  color: '#EAEAEA',
                  fontSize: '16px',
                  fontWeight: 300,
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  caretColor: '#C5A059',
                }}
              />
              <button
                type="submit"
                className="font-space"
                style={{
                  width: '100%',
                  background: '#C5A059',
                  color: '#0A0A0A',
                  padding: '16px 0',
                  marginTop: '32px',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#D8B470')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C5A059')}
              >
                Subscribe to Newsletter
              </button>
            </form>
          )}

          <p
            className="font-inter"
            style={{
              fontSize: '12px',
              color: '#888888',
              fontWeight: 300,
              marginTop: '24px',
            }}
          >
            No spam. One email per week. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
