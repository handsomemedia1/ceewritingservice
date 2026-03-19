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

          {/* Contact */}
          <div>
            <h5 style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px'}}>Get In Touch</h5>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" className="btn-gold" style={{
              padding: '10px 20px', fontSize: '13px', borderRadius: '50px',
            }}>
              <span>💬 WhatsApp Us</span>
            </a>
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
            <a href="#" style={{color: 'rgba(255,255,255,0.3)', textDecoration: 'none'}}>Privacy Policy</a>
            <a href="#" style={{color: 'rgba(255,255,255,0.3)', textDecoration: 'none'}}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
