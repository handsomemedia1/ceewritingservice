"use client";
import React from 'react';

const testimonials = [
  { text: "My thesis went from 45% plagiarism to 6% after they helped me rewrite and check it. Got the Turnitin report same day. Absolutely worth every naira!", author: "Adaeze O.", role: "Final Year Student, UNILAG", initial: "A" },
  { text: "I got my CV, cover letter and LinkedIn done as a package. Within 2 weeks I had 3 interview calls. These people know what they are doing!", author: "Kelechi M.", role: "Graduate Job Seeker, Abuja", initial: "K" },
  { text: "I needed an SOP for my UK Masters urgently. They delivered a well-written, thoughtful statement in 24 hours. I got my admission!", author: "Tolu A.", role: "Masters Applicant, UK", initial: "T" },
  { text: "My content went from 78% AI detected to 2% after the humanizing service. Turnitin report showed clean results. Fast and affordable!", author: "Emeka C.", role: "Content Creator, Lagos", initial: "E" },
  { text: "They wrote my business proposal for a bank loan and it was approved. Clear, professional and exactly what the bank wanted!", author: "Bisi R.", role: "Small Business Owner, Ibadan", initial: "B" },
  { text: "My seminar defence slides content was written overnight. My supervisor said it was one of the best presentations in the department!", author: "Fatima B.", role: "Postgraduate Student, ABU Zaria", initial: "F" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="glass-card" style={{
      padding: '28px 24px', minWidth: '340px', maxWidth: '400px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => (
          <span key={j} style={{
            width: '16px', height: '16px', borderRadius: '3px',
            background: 'rgba(201,147,58,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '9px', color: '#E8B96A',
          }}>★</span>
        ))}
      </div>
      <p style={{
        fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75,
        marginBottom: '20px',
      }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Playfair Display', serif", fontSize: '16px',
          fontWeight: 700, color: 'white', flexShrink: 0,
        }}>{t.initial}</div>
        <div>
          <div style={{fontSize: '13px', fontWeight: 600, color: 'white'}}>{t.author}</div>
          <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)'}}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section style={{
      background: 'linear-gradient(160deg, #061428, #0B1F3A)',
      padding: '80px 0', position: 'relative', overflow: 'hidden',
    }}>
      {/* Wave top */}
      <div style={{position: 'absolute', top: '-1px', left: 0, right: 0, zIndex: 3}}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%', transform: 'rotate(180deg)'}}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDFAF5"/>
        </svg>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2}}>
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <div className="section-label" style={{color: '#E8B96A', justifyContent: 'center'}}>Client Love</div>
          <h2 className="section-title" style={{color: 'white'}}>
            Trusted by <span className="gradient-text">500+</span> Clients
          </h2>
        </div>
      </div>

      {/* Scrolling marquee row 1 */}
      <div style={{
        overflow: 'hidden', position: 'relative', zIndex: 2,
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}>
        <div style={{
          display: 'flex', gap: '20px', padding: '0 20px',
          animation: 'marqueeLeft 40s linear infinite',
          width: 'max-content',
        }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDFAF5"/>
        </svg>
      </div>
    </section>
  );
}
