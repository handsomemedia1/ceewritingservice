'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Real WhatsApp screenshot testimonials
const SCREENSHOT_TESTIMONIALS = [
  {
    id: 'phd-proposal',
    src: '/testimonials/media_1786058442462.png',
    alt: 'WhatsApp testimonial — PhD Proposal client: Very good work. Pls keep my contact for future work and referring.',
    service: 'PhD Proposal Writing',
    quote: 'Very good work. Pls keep my contact for future work and referring.',
  },
  {
    id: 'ai-humanizing',
    src: '/testimonials/media_1786061186325.png',
    alt: 'WhatsApp testimonial — AI humanizing: The 0% AI is shocking them.',
    service: 'AI Humanizing',
    quote: 'The AI check you did for me... The 0% AI is shocking them.',
  },
  {
    id: 'cv-writing',
    src: '/testimonials/media_1786058465056.png',
    alt: 'WhatsApp testimonial — CV Writing client: I was wowed by what I got back. I will highly recommend you.',
    service: 'CV Writing',
    quote: 'I was wowed by what I got back from you. It was so amazing and I will highly recommend you to anyone who wants to repackage their CV.',
  },
  {
    id: 'lifesaver',
    src: '/testimonials/media_1786058478205.png',
    alt: 'WhatsApp testimonial — client: You\'re a lifesaver. I truly appreciate this.',
    service: 'Academic Support',
    quote: "You're a lifesaver... I truly appreciate this and I'll reach out later when I have more questions.",
  },
];

// Written testimonials
const TEXT_TESTIMONIALS = [
  {
    name: 'Amaka O.',
    role: 'Postgraduate Student, UK',
    service: 'Plagiarism Check + AI Humanizing',
    quote: 'My lecturer flagged my dissertation for AI. Cee Writing completely transformed it — the similarity dropped from 38% to 4% and the AI score hit 0%. I defended it with zero issues.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'MSc Finance Graduate',
    service: 'Thesis Editing',
    quote: 'My thesis was rejected due to high AI similarity. Cee Writing restructured my arguments and completely humanized the text. Passed with distinction on resubmission.',
    rating: 5,
  },
  {
    name: 'Tunde B.',
    role: 'Chevening Scholar, 2024',
    service: 'SOP & Scholarship Editing',
    quote: 'The readiness check highlighted that my leadership examples were too vague. After the editing session, my SOP was transformed. I got the Chevening scholarship.',
    rating: 5,
  },
  {
    name: 'Sarah M.',
    role: 'Erasmus Mundus Recipient',
    service: 'Scholarship Application',
    quote: 'Their scholarship checker identified my exact gaps. Their team polished my essays to perfection. I won the Erasmus scholarship. I don\'t think I\'d have made it without them.',
    rating: 5,
  },
  {
    name: 'Ngozi A.',
    role: 'PhD Applicant, Germany',
    service: 'Research Proposal',
    quote: 'The research proposal they wrote for me was exceptional. My supervisor said it was one of the most clearly structured proposals she had reviewed. DAAD approved.',
    rating: 5,
  },
  {
    name: 'Emmanuel T.',
    role: 'Undergraduate, Lagos',
    service: 'CV Writing',
    quote: 'I needed a CV for a competitive internship. The CV they built for me was completely different from what I submitted before — professional, clean, and targeted. I got the role.',
    rating: 5,
  },
];

export default function TestimonialsClient() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {/* Screenshot gallery section */}
      <section
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '16px',
            }}
          >
            Unfiltered Screenshots
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.02em', color: '#EAEAEA',
              marginBottom: '12px',
            }}
          >
            From their phone. Unedited.
          </h2>
          <p
            className="font-inter"
            style={{ fontSize: '16px', lineHeight: 1.7, color: '#888888', fontWeight: 300, maxWidth: '520px', marginBottom: '56px' }}
          >
            These are real WhatsApp conversations. Click any screenshot to enlarge.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2px',
            }}
          >
            {SCREENSHOT_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
              >
                {/* Service tag */}
                <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(197,160,89,0.1)', marginBottom: '12px' }}>
                  <span
                    className="font-space"
                    style={{
                      fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)',
                    }}
                  >
                    {t.service}
                  </span>
                </div>

                {/* Screenshot */}
                <button
                  onClick={() => setLightboxSrc(t.src)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(197,160,89,0.1)',
                    cursor: 'pointer',
                    padding: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '9/16',
                    display: 'block',
                    width: '100%',
                    transition: 'border-color 0.2s ease',
                  }}
                  aria-label={`View testimonial: ${t.service}`}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(197,160,89,0.1)')}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'rgba(10,10,10,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    className="group-hover:opacity-100"
                  >
                    <span className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C5A059' }}>
                      View
                    </span>
                  </div>
                </button>

                {/* Caption */}
                <p
                  className="font-inter"
                  style={{
                    marginTop: '12px',
                    fontSize: '13px', lineHeight: 1.6, color: '#666666',
                    fontWeight: 300, fontStyle: 'italic',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text testimonials — editorial pull quotes */}
      <section
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '64px',
            }}
          >
            Written Feedback
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TEXT_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '48px',
                  alignItems: 'start',
                  paddingTop: '48px',
                  paddingBottom: '48px',
                  borderBottom: '1px solid rgba(197,160,89,0.08)',
                }}
              >
                {/* Left: name + info */}
                <div>
                  <div
                    className="font-space"
                    style={{ fontSize: '14px', fontWeight: 700, color: '#EAEAEA', marginBottom: '6px' }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="font-space"
                    style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)', marginBottom: '8px' }}
                  >
                    {t.service}
                  </div>
                  <div
                    className="font-inter"
                    style={{ fontSize: '12px', color: '#555555', fontWeight: 300 }}
                  >
                    {t.role}
                  </div>
                  {/* Stars */}
                  <div style={{ marginTop: '12px', display: 'flex', gap: '3px' }}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s} style={{ color: '#C5A059', fontSize: '12px' }}>★</span>
                    ))}
                  </div>
                </div>

                {/* Right: quote */}
                <div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: '64px', lineHeight: 1, color: 'rgba(197,160,89,0.06)',
                      fontWeight: 700, marginBottom: '-20px', userSelect: 'none',
                    }}
                  >
                    "
                  </div>
                  <p
                    className="font-inter"
                    style={{
                      fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.75,
                      color: '#CCCCCC', fontWeight: 300, fontStyle: 'italic',
                    }}
                  >
                    {t.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <div style={{ position: 'relative', maxHeight: '90vh', maxWidth: '400px', width: '100%' }}>
            <Image
              src={lightboxSrc}
              alt="Client testimonial screenshot"
              width={400}
              height={700}
              style={{ objectFit: 'contain', maxHeight: '90vh', width: '100%', height: 'auto' }}
            />
          </div>
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(197,160,89,0.2)',
              color: '#EAEAEA', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '18px', fontWeight: 300,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
