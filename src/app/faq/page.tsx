"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { MessageCircleQuestion, Clock, Shield, CreditCard } from 'lucide-react';

const quickAnswers = [
  { icon: <Clock size={20} strokeWidth={1.5} />, title: 'Delivery Time', answer: 'Most orders: 24 hours. Plagiarism checks: a few hours.' },
  { icon: <Shield size={20} strokeWidth={1.5} />, title: 'Confidentiality', answer: '100% confidential. We never share or reuse your documents.' },
  { icon: <CreditCard size={20} strokeWidth={1.5} />, title: 'Payment', answer: 'Bank transfer, online payment, or international options available.' },
  { icon: <MessageCircleQuestion size={20} strokeWidth={1.5} />, title: 'Revisions', answer: 'Free revisions until you are completely satisfied.' },
];

export default function FAQPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
      });
    }, 100);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="gradient-mesh" style={{
        background: 'linear-gradient(160deg, #061428, #0B1F3A, #112d52)',
        paddingTop: '160px', paddingBottom: '80px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-1" />
        <div className="orb orb-3" />

        <div style={{position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(201,147,58,0.12)', border: '1px solid rgba(201,147,58,0.25)',
            color: '#E8B96A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px',
            marginBottom: '28px',
          }}>
            <MessageCircleQuestion size={14} />
            Help Center
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Got <span className="gradient-text">Questions?</span>
          </h1>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '500px',
            margin: '0 auto 48px', lineHeight: 1.8,
          }}>
            Everything you need to know before placing your order. Can&apos;t find what you&apos;re looking for? Message us on WhatsApp.
          </p>

          {/* Quick Answer Cards */}
          <div className="bento-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
            maxWidth: '800px', margin: '0 auto',
          }}>
            {quickAnswers.map((qa, i) => (
              <div key={i} className="glass-card" style={{
                padding: '20px 16px', textAlign: 'center',
              }}>
                <div style={{color: '#E8B96A', marginBottom: '10px', display: 'flex', justifyContent: 'center'}}>{qa.icon}</div>
                <div style={{fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '6px'}}>{qa.title}</div>
                <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5}}>{qa.answer}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDFAF5"/>
          </svg>
        </div>
      </section>

      <div style={{background: 'var(--cream)'}}>
        <FAQ />
      </div>

      {/* Still have questions CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
        padding: '64px 24px', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)',
          color: 'white', marginBottom: '12px',
        }}>Still Have Questions?</h2>
        <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px'}}>
          Message us directly. We respond within minutes.
        </p>
        <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'white', color: 'var(--navy)', padding: '16px 36px',
          borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}>
          💬 Ask on WhatsApp
        </a>
      </section>

      <Footer />
    </main>
  );
}
