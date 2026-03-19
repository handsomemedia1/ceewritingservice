"use client";
import React, { useState } from 'react';

const faqs = [
  { q: "Is your Turnitin access real? Can I trust the report?", a: "Yes. We use a legitimate institutional Turnitin account. The report we send you is an official PDF from Turnitin itself, not a screenshot or fake. It includes your similarity score, AI detection percentage and source breakdown." },
  { q: "How long does an order take?", a: "Most orders are delivered within 24 hours. Plagiarism checks are usually done within a few hours. For longer documents like proposals or SOPs, we typically take 1 to 3 days. Same-day delivery is available. Just let us know it is urgent." },
  { q: "Is my document kept confidential?", a: "Absolutely. We treat every document with full confidentiality. We never share, reuse, publish or distribute your work to anyone. Your privacy is our priority." },
  { q: "What if I'm not happy with the result?", a: "We offer free revisions until you are satisfied. If we genuinely cannot meet your requirements after revisions, we will discuss a refund. Your satisfaction is non-negotiable." },
  { q: "How do I place an order?", a: "Simply click the WhatsApp button, tell us what service you need, send us your document (if applicable), and we'll give you a price and timeline. It's that simple!" },
  { q: "Can you handle urgent same-day orders?", a: "Yes! Plagiarism checks, proofreading and short documents can often be done within hours. Just message us on WhatsApp stating your deadline and we'll confirm." },
  { q: "Do you work with clients outside Nigeria?", a: "Yes! We serve Nigerians in the UK, Canada, USA, and other countries. We accept international payments and deliver everything digitally." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" style={{
      padding: '100px 24px', background: 'var(--cream)',
    }}>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Got Questions?</div>
          <h2 className="section-title" style={{color: 'var(--navy)'}}>Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
            Everything you need to know before placing your order.
          </p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} style={{
                background: isOpen ? 'var(--white)' : 'rgba(255,255,255,0.6)',
                border: `1.5px solid ${isOpen ? 'var(--gold)' : 'rgba(201,147,58,0.1)'}`,
                borderRadius: '16px', overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isOpen ? '0 8px 30px rgba(201,147,58,0.1)' : 'none',
              }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%', padding: '22px 26px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', gap: '16px', background: 'transparent',
                    border: 'none', textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <span style={{
                    fontSize: '15px', fontWeight: 600, color: 'var(--navy)',
                    lineHeight: 1.4,
                  }}>{faq.q}</span>
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: isOpen ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'rgba(201,147,58,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', color: isOpen ? 'white' : 'var(--gold)',
                    flexShrink: 0, transition: 'all 0.3s',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div style={{
                    padding: '0 26px 22px', fontSize: '14px', color: 'var(--muted)',
                    lineHeight: 1.75,
                  }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
