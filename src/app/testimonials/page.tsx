import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import TestimonialsClient from '@/features/testimonials/TestimonialsClient';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Client Testimonials | Cee Writing Hub — Real Results, Real Clients',
  description: 'Read real testimonials from clients across Nigeria, UK, and the diaspora. See WhatsApp conversations, CV results, PhD proposals, and scholarship wins — all from real people.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Real Client Results | Cee Writing Hub Testimonials',
    description: '500+ delivered projects. See what clients say about our writing, plagiarism, CV, and scholarship services.',
    type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};

const testimonialsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cee Writing Hub',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Anonymous Client' },
      reviewBody: 'Very good work. Pls keep my contact for future work and referring.',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Anonymous Client' },
      reviewBody: 'When I sent you my first academic CV it wasn\'t good enough for the purpose it was meant for, but I was wowed by what I got back from you. It was so amazing and I will highly recommend you.',
    },
  ],
};

export default function TestimonialsPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsJsonLd) }} />
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Testimonials', href: '/testimonials' }]} />
        <p className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '28px' }}>
          Client Testimonials
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h1
              className="font-space"
              style={{ fontSize: 'clamp(38px, 6.5vw, 84px)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '28px' }}
            >
              Real clients.<br /><span style={{ color: '#C5A059' }}>Real results.</span>
            </h1>
            <p className="font-inter" style={{ fontSize: '18px', lineHeight: 1.8, color: '#888888', fontWeight: 300, maxWidth: '520px' }}>
              Every screenshot is from an actual WhatsApp conversation. No fabricated reviews, no stock photos — just honest feedback from clients who trusted us with their most important work.
            </p>
          </div>
          {/* Submit CTA */}
          <div style={{ flex: '0 1 auto' }}>
            <Link
              href="https://wa.me/2349056752549?text=Hi%2C%20I%20would%20like%20to%20share%20my%20experience%20with%20Cee%20Writing%20Hub"
              target="_blank" rel="noreferrer"
              className="font-space"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                padding: '18px 32px',
                border: '1px solid rgba(197,160,89,0.3)', color: '#C5A059',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
            >
              Share Your Story
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            marginTop: '64px',
            borderTop: '1px solid rgba(197,160,89,0.1)',
          }}
        >
          {[
            { num: '500+', label: 'Projects Delivered' },
            { num: '100%', label: 'Human-Written Work' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '0%', label: 'Plagiarism Rate' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 120px',
                paddingTop: '40px',
                paddingBottom: '24px',
                paddingRight: '40px',
                borderRight: i < 3 ? '1px solid rgba(197,160,89,0.08)' : 'none',
              }}
            >
              <div className="font-space" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#C5A059', marginBottom: '8px' }}>{stat.num}</div>
              <div className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555555' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot gallery + text testimonials */}
      <TestimonialsClient />

      {/* Submit testimonial section */}
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
                Your Turn
              </p>
              <h2 className="font-space" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '20px' }}>
                Worked with us before?<br />We'd love to hear from you.
              </h2>
              <p className="font-inter" style={{ fontSize: '17px', lineHeight: 1.8, color: '#888888', fontWeight: 300 }}>
                Share your experience on WhatsApp and we'll feature it here. Your story could be the nudge another student needs.
              </p>
            </div>
            <div style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link
                href="https://wa.me/2349056752549?text=Hi%2C%20I%20want%20to%20share%20my%20testimonial%20for%20Cee%20Writing%20Hub"
                target="_blank" rel="noreferrer"
                className="font-space"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                  padding: '20px 40px',
                  backgroundColor: '#C5A059', color: '#0A0A0A',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Share on WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <p className="font-space" style={{ textAlign: 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555' }}>
                Takes less than 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
