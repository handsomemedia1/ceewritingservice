"use client";
import React, { useState } from 'react';

export interface FaqItem { q: string; a: string; }
export interface FaqCategory { category: string; items: FaqItem[]; }

interface FAQProps {
  faqs: FaqCategory[];
  injectSchema?: boolean;
}

export default function FAQ({ faqs, injectSchema = false }: FAQProps) {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  // Generate FAQ schema dynamically
  const faqJsonLd = injectSchema ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap(c => c.items).map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <section
      aria-labelledby="faq-section-title"
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <h2 id="faq-section-title" className="sr-only" style={{ display: 'none' }}>Frequently Asked Questions</h2>
      
      {injectSchema && faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 48px)',
          paddingRight: 'clamp(20px, 5vw, 48px)',
        }}
      >
        {faqs.map((category, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '64px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(197,160,89,0.15)',
              }}
            >
              <span
                className="font-space"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.6)',
                }}
              >
                {String(cIdx + 1).padStart(2, '0')}
              </span>
              <span
                className="font-space"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#EAEAEA',
                }}
              >
                {category.category}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} role="list">
              {category.items.map((faq, qIdx) => {
                const key = `${cIdx}-${qIdx}`;
                const isOpen = openKey === key;
                const panelId = `faq-panel-${key}`;
                const buttonId = `faq-button-${key}`;

                return (
                  <div
                    key={qIdx}
                    role="listitem"
                    style={{ borderBottom: '1px solid rgba(197,160,89,0.08)' }}
                  >
                    <button
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      style={{
                        width: '100%',
                        padding: '24px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '24px',
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        className="font-space"
                        style={{
                          fontSize: 'clamp(15px, 2.5vw, 17px)',
                          fontWeight: 600,
                          color: isOpen ? '#C5A059' : '#EAEAEA',
                          lineHeight: 1.4,
                          flex: 1,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isOpen ? '#C5A059' : '#666666',
                          fontSize: '20px',
                          fontWeight: 300,
                          lineHeight: 1,
                          transition: 'all 0.3s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          marginTop: '2px',
                        }}
                      >
                        +
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      style={{
                        maxHeight: isOpen ? '600px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <p
                        className="font-inter"
                        style={{
                          paddingBottom: '28px',
                          paddingRight: '40px',
                          fontSize: '15px',
                          lineHeight: 1.85,
                          color: '#999999',
                          fontWeight: 300,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
