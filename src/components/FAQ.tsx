"use client";
import React, { useState } from 'react';

interface FaqItem { q: string; a: string; }
interface FaqCategory { category: string; items: FaqItem[]; }

export default function FAQ({ faqs }: { faqs: FaqCategory[] }) {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  return (
    <section
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',       /* Mobile-optimised: max 760px, not wide-screen */
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 48px)',
          paddingRight: 'clamp(20px, 5vw, 48px)',
        }}
      >
        {faqs.map((category, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '64px' }}>
            {/* Category label */}
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

            {/* FAQ items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {category.items.map((faq, qIdx) => {
                const key = `${cIdx}-${qIdx}`;
                const isOpen = openKey === key;
                return (
                  <div
                    key={qIdx}
                    style={{ borderBottom: '1px solid rgba(197,160,89,0.08)' }}
                  >
                    <button
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
                      {/* +/× indicator */}
                      <span
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

                    {/* Answer — smooth expand */}
                    <div
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
