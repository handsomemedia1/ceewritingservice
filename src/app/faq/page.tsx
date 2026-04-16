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

      {/* ===== Still have questions CTA ===== */}
      <section className="reveal" style={{
        background: '#0B1F3A',
        position: 'relative', overflow: 'hidden',
        padding: '100px 24px', textAlign: 'center',
        borderTop: '2px solid rgba(16,185,129,0.3)',
      }}>
        {/* Subtle geometric pattern / glow */}
        <div style={{
          position: 'absolute', top: '0', right: '0', bottom: '0', left: '0',
          background: 'linear-gradient(45deg, transparent 40%, rgba(16,185,129,0.05) 50%, transparent 60%)',
          backgroundSize: '200% 200%',
          animation: 'meshMove 8s infinite linear',
        }} />

        <div style={{position: 'relative', zIndex: 2, maxWidth: '650px', margin: '0 auto'}}>
          <div className="section-label" style={{ color: '#10b981' }}>
            Instant Assistance
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)',
            color: 'white', marginBottom: '16px', fontWeight: 800, letterSpacing: '-0.5px'
          }}>
            Still Have Burning Questions?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.65)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.6
          }}>
            Don't rummage through FAQs forever. Our support team is online and ready to assist you instantly. You generally get a reply within 2 minutes.
          </p>
          
          <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: '#25D366', color: 'white', padding: '18px 48px',
            borderRadius: '12px', fontWeight: 700, fontSize: '17px', textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
            boxShadow: '0 8px 24px rgba(37,211,102,0.2)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.2)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Text Us Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
