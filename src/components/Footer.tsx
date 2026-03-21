"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #061428, #0B1F3A)',
      padding: '60px 24px 32px', color: 'rgba(255,255,255,0.45)',
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px'}}>
              <img src="/logo.png" alt="Cee Writing" style={{
                width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover',
                border: '2px solid rgba(201,147,58,0.3)',
              }} />
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 900,
                background: 'linear-gradient(135deg, #C9933A, #E8B96A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Cee Writing</span>
            </div>
            <p style={{fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.35)', maxWidth: '320px'}}>
              Nigeria&apos;s trusted writing, editing and plagiarism service. Serving students, professionals and businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px'}}>Services</h5>
            <ul style={{listStyle: 'none'}}>
              {['Plagiarism Check', 'AI Humanizing', 'Proofreading', 'CV Writing', 'SOP Writing'].map((item, i) => (
                <li key={i} style={{marginBottom: '10px'}}>
                  <a href="/services" className="nav-link" style={{fontSize: '14px', color: 'rgba(255,255,255,0.35)', padding: 0}}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px'}}>Quick Links</h5>
            <ul style={{listStyle: 'none'}}>
              {[
                {name: 'Blog', href: '/blog'}, {name: 'Free Resources', href: '/resources'},
                {name: 'FAQ', href: '/faq'}, {name: 'About', href: '/about'},
              ].map((item, i) => (
                <li key={i} style={{marginBottom: '10px'}}>
                  <a href={item.href} className="nav-link" style={{fontSize: '14px', color: 'rgba(255,255,255,0.35)', padding: 0}}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px'}}>Connect With Us</h5>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: '#25D366', color: 'white',
                borderRadius: '50px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                textAlign: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(37,211,102,0.3)', transition: 'transform 0.2s',
              }}>
                💬 WhatsApp Us
              </a>
              <a href="mailto:ceewritingservices@gmail.com" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)',
                borderRadius: '50px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                textAlign: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)',
              }}>
                ✉️ Email Us
              </a>
              <a href="https://www.linkedin.com/company/cee-writing-services/?viewAsMember=true" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: '#0e76a8', color: 'white',
                borderRadius: '50px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                textAlign: 'center', justifyContent: 'center',
                transition: 'transform 0.2s',
              }}>
                💼 Follow on LinkedIn
              </a>
              <a href="https://t.me/ceewritingservice" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                background: 'linear-gradient(135deg, #0088cc, #229ED9)', color: 'white',
                borderRadius: '50px', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                textAlign: 'center', justifyContent: 'center',
                transition: 'transform 0.2s',
              }}>
                ✈️ Join Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{fontSize: '12px'}}>© {new Date().getFullYear()} Cee Writing Service · All rights reserved</div>
          <div style={{fontSize: '12px', display: 'flex', gap: '20px'}}>
            <a href="/privacy" style={{color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s'}}>Privacy Policy</a>
            <a href="/terms" style={{color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s'}}>Terms of Service</a>
          </div>
        </div>

        {/* Elitech Hub Badge */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://elitechub.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.9))',
              border: '1px solid rgba(100,116,139,0.2)',
              padding: '10px 24px', borderRadius: '50px',
              textDecoration: 'none', transition: 'all 0.3s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(148,163,184,0.8)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Built &amp; Secured by
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.5px' }}>
                ELITECH HUB
              </span>
            </div>
            <span style={{
              fontSize: '9px', fontWeight: 700, color: '#60a5fa',
              background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)',
              padding: '3px 10px', borderRadius: '50px', letterSpacing: '1px',
            }}>
              2026 AUDITED
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
