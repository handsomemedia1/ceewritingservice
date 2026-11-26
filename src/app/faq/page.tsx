import React from 'react';
import type { Metadata } from 'next';
import { FAQ_SECTIONS } from '@/config/faq';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQClient from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'FAQ: Writing, Research and Data Analysis Questions | Cee Writing',
  description: 'Answers to every question about our advanced research, data analysis, academic writing, and scholarship intelligence services.',
  alternates: { canonical: 'https://ceewriting.com/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Cee Writing',
    description: 'Everything you need to know about our advanced research support, statistical modelling, and academic editing.',
    type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};


export default function FAQPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />
        <p
          className="font-space"
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.6)', marginBottom: '32px',
          }}
        >
          Help Center
        </p>
        <h1
          className="font-space"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.04,
            letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '32px',
          }}
        >
          Got <span style={{ color: '#C5A059' }}>Questions?</span><br />We have answers.
        </h1>
        <p
          className="font-inter"
          style={{
            fontSize: '18px', lineHeight: 1.8, color: '#888888', fontWeight: 300,
            maxWidth: '560px',
          }}
        >
          Everything you need to know before placing your order. Can't find what you're looking for? Message us on WhatsApp — we reply in minutes.
        </p>
      </section>

      {/* FAQ content */}
      <FAQClient faqs={FAQ_SECTIONS} injectSchema={true} />

      {/* Bottom CTA */}
      <section
        style={{
          backgroundColor: '#111111',
          borderTop: '1px solid rgba(197,160,89,0.1)',
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
            <div style={{ flex: '1 1 400px' }}>
              <p className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '24px' }}>
                Still Need Help?
              </p>
              <h2
                className="font-space"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '16px' }}
              >
                Talk to us directly.<br />We reply in <span style={{ color: '#C5A059' }}>under 2 minutes.</span>
              </h2>
              <p className="font-inter" style={{ fontSize: '17px', lineHeight: 1.8, color: '#888888', fontWeight: 300 }}>
                Our team is online and ready. No bots, no ticket queues — just a real person who knows the answer.
              </p>
            </div>
            <div style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="https://wa.me/2349056752549" target="_blank" rel="noreferrer"
                className="font-space"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '20px 40px', backgroundColor: '#C5A059', color: '#0A0A0A',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                WhatsApp Us Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <p className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555', textAlign: 'center' }}>
                Free. No obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
