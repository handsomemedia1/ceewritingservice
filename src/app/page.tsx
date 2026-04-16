"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HotServices from '@/components/HotServices';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

export default function Home() {
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
      <Hero />
      <Stats />
      <HotServices />

      <div style={{background: 'var(--cream)'}}>
        <WhyUs />
      </div>

      <Testimonials />

      <div style={{background: 'var(--cream)'}}>
        <BlogPreview featuredOnly={true} />
      </div>

      {/* Final CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
        padding: '64px 24px', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 5vw, 44px)',
          color: 'white', marginBottom: '12px',
        }}>
          Ready to Get Your Writing Done Right?
        </h2>
        <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px'}}>
          500+ clients trust us. You are next. Message us on WhatsApp now.
        </p>
        <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'white', color: 'var(--navy)', padding: '16px 40px',
          borderRadius: '50px', fontWeight: 700, fontSize: '16px', textDecoration: 'none',
          transition: 'all 0.3s', boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}>
          Chat With Us on WhatsApp
        </a>
      </section>

      <Footer />
    </main>
  );
}
