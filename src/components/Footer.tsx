"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SERVICES = ['Plagiarism Check', 'AI Humanizing', 'Proofreading', 'CV Writing', 'SOP Writing', 'Research & Analysis'];
const EXPLORE = [
  { name: 'Knowledge Hub', href: '/blog' },
  { name: 'Free Resources', href: '/resources' },
  { name: 'Scholarship Check', href: '/scholarship-check' },
  { name: 'FAQ', href: '/faq' },
  { name: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(197,160,89,0.12)' }}>
      
      {/* Main footer body */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          paddingTop: '80px',
          paddingBottom: '64px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', width: '32px', height: '32px', flexShrink: 0 }}>
                <Image src="/logo.png" alt="Cee Writing" fill className="rounded-full object-cover" />
              </div>
              <span className="font-space" style={{ fontSize: '18px', fontWeight: 700, color: '#EAEAEA', letterSpacing: '-0.02em' }}>
                Cee Writing
              </span>
            </div>
            <p
              className="font-inter"
              style={{ fontSize: '14px', lineHeight: 1.8, color: '#666666', fontWeight: 300, maxWidth: '260px', marginBottom: '32px' }}
            >
              Nigeria's trusted academic writing, editing, and plagiarism service — serving students and professionals globally.
            </p>
            {/* Contact strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://wa.me/2349056752549" target="_blank" rel="noreferrer"
                className="font-space"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  backgroundColor: '#C5A059',
                  color: '#0A0A0A',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="mailto:ceewritingservices@gmail.com"
                className="font-space"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  border: '1px solid rgba(197,160,89,0.2)',
                  color: '#888888',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Email Us
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p
              className="font-space"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '24px' }}
            >
              Services
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SERVICES.map((item) => (
                <li key={item}>
                  <a
                    href="/services"
                    className="font-inter"
                    style={{ fontSize: '14px', color: '#666666', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#666666')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <p
              className="font-space"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '24px' }}
            >
              Explore
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {EXPLORE.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-inter"
                    style={{ fontSize: '14px', color: '#666666', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#666666')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <p
              className="font-space"
              style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '24px' }}
            >
              Stay Updated
            </p>
            <p
              className="font-inter"
              style={{ fontSize: '14px', lineHeight: 1.7, color: '#666666', fontWeight: 300, marginBottom: '24px' }}
            >
              Scholarship deadlines, writing tips, and resource drops. Weekly. No spam.
            </p>
            <a
              href="https://t.me/ceewritingservice" target="_blank" rel="noreferrer"
              className="font-space"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(197,160,89,0.7)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C5A059')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(197,160,89,0.7)')}
            >
              Join Telegram Channel
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(197,160,89,0.08)',
          paddingTop: '24px',
          paddingBottom: '24px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <span
          className="font-inter"
          style={{ fontSize: '12px', color: '#444444', fontWeight: 300 }}
        >
          © {new Date().getFullYear()} Cee Writing Hub · All rights reserved
        </span>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="/privacy" className="font-inter" style={{ fontSize: '12px', color: '#444444', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444444')}
          >Privacy Policy</a>
          <a href="/terms" className="font-inter" style={{ fontSize: '12px', color: '#444444', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444444')}
          >Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
