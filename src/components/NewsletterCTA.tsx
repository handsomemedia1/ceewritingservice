'use client';

import React, { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    trackEvent('newsletter_signup', { location: 'blog_footer' });
    
    // Simulate API call
    setEmail('');
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '160px',
        paddingBottom: '160px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, filter: 'grayscale(100%)', pointerEvents: 'none' }}>
        <Image
          src="/images/services/process.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

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
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 400px' }}>
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
              Stay Ahead
            </p>

            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                marginBottom: '32px',
              }}
            >
              Get weekly research <br />
              <span style={{ color: '#C5A059' }}>&amp; scholarship insights.</span>
            </h2>

            <p
              className="font-inter"
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                maxWidth: '480px',
              }}
            >
              Join thousands of Nigerian students and researchers who receive our weekly newsletter — exclusive scholarship alerts, writing strategies, and research guides.
            </p>
          </div>

          {/* Right Column: Form */}
          <div
            style={{
              flex: '1 1 400px',
              paddingLeft: 'clamp(0px, 4vw, 80px)',
              borderLeft: '1px solid rgba(197,160,89,0.1)',
            }}
          >
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="font-inter"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(197,160,89,0.3)',
                  paddingBottom: '16px',
                  color: '#EAEAEA',
                  fontSize: '16px',
                  fontWeight: 300,
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  caretColor: '#C5A059',
                  marginBottom: '32px',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#C5A059'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'; }}
              />
              
              <button
                type="submit"
                className="font-space"
                style={{
                  width: '100%',
                  padding: '20px 0',
                  backgroundColor: status === 'success' ? '#EAEAEA' : '#C5A059',
                  color: '#0A0A0A',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {status === 'success' ? 'Subscribed!' : 'Subscribe Free'}
              </button>
              
              <p
                className="font-inter"
                style={{
                  fontSize: '11px',
                  color: '#666666',
                  marginTop: '16px',
                  textAlign: 'center',
                }}
              >
                No spam. One email per week. Unsubscribe anytime.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
