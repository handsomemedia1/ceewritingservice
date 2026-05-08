"use client";
import React from 'react';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #0B1F3A 0%, #112d52 100%)',
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px',
        background: 'rgba(255, 255, 255, 0.03)', borderRadius: '50%', filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-5%', width: '400px', height: '400px',
        background: 'rgba(201, 147, 58, 0.05)', borderRadius: '50%', filter: 'blur(50px)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
        {/* Trust Badges */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 16px', borderRadius: '50px', marginBottom: '24px',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#E8B96A' }}>★★★★★</span>
          </div>
          <span style={{ fontSize: '13px', color: 'white', fontWeight: 600, letterSpacing: '0.5px' }}>
            Trusted by 500+ Clients Globally
          </span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          Ready to Guarantee Your <br />
          <span className="gradient-text">Success Story?</span>
        </h2>
        
        <p style={{
          fontSize: '17px', color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.7, marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px'
        }}>
          Do not let poor structure or grammar cost you that admission, job offer, or contract. Connect with our expert writers directly and let us perfect your document today.
        </p>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/2349056752549"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            background: '#25D366', color: 'white', padding: '16px 40px',
            borderRadius: '50px', fontWeight: 700, fontSize: '17px', textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.3)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Chat With an Expert on WhatsApp
        </a>

        {/* Small subtext */}
        <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
          Average response time: &lt; 5 mins
        </p>
      </div>
    </section>
  );
}
