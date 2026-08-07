"use client";

import React from 'react';
import FlexibleCTA from './FlexibleCTA';

export default function ServicesCTA() {
  return (
    <section
      id="consultation"
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '140px',
        paddingBottom: '140px',
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
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.7)',
              marginBottom: '32px',
            }}
          >
            Get Started
          </p>
          
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '40px',
            }}
          >
            Secure your next <br />
            <span style={{ color: '#C5A059' }}>big win today.</span>
          </h2>
          
          <p
            className="font-inter"
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#999999',
              fontWeight: 300,
              marginBottom: '64px',
              maxWidth: '600px',
              margin: '0 auto 64px auto',
            }}
          >
            Do not let a weak document cost you an admission, contract, or opportunity. Our experts are ready to deliver internationally-standard results. Book a consultation to discuss your specific requirements.
          </p>

          <div style={{ display: 'inline-flex', marginBottom: '80px' }}>
            <FlexibleCTA 
              action={{ type: 'whatsapp', label: 'Message on WhatsApp' }}
              className="font-space"
            />
          </div>

          {/* Guarantee strip */}
          <div
            style={{
              paddingTop: '40px',
              borderTop: '1px solid rgba(197,160,89,0.1)',
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
              {[
                'Free initial consultation',
                'Revisions included',
                'Turnitin report provided',
                'Complete confidentiality'
              ].join(' · ')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
