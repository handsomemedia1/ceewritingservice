"use client";
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HotServices from '@/components/HotServices';
import WhyUs from '@/components/WhyUs';
import DataAnalysisSection from '@/components/DataAnalysisSection';
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

      <DataAnalysisSection />

      <Testimonials />

      <div style={{background: 'var(--cream)'}}>
        <BlogPreview featuredOnly={true} />
      </div>

      {/* Final CTA */}
      <section className="reveal" style={{
        position: 'relative',
        background: 'var(--navy-deep)',
        padding: '100px 24px', 
        textAlign: 'center',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201, 147, 58, 0.15)'
      }}>
        {/* Background elements */}
        <div style={{
          position: 'absolute', top: '-50%', left: '-10%', 
          width: '500px', height: '500px', 
          background: 'radial-gradient(circle, rgba(201,147,58,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40%', right: '-10%', 
          width: '400px', height: '400px', 
          background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ color: 'var(--gold-light)' }}>
            Elevate Your Brand
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: 'white', 
            lineHeight: 1.15,
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            Stop Settling for Mediocre Content. Let's Build Your <span className="gradient-text">Authority</span> Today.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.75)', 
            fontSize: '18px', 
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Join 500+ successful founders, researchers, and creators who scaled their impact with our professional writing and data analysis services. Do not let poor copy or inaccurate data cost you another opportunity.
          </p>
          
          <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: '#25D366', color: 'white', padding: '18px 48px',
            borderRadius: '50px', fontWeight: 700, fontSize: '18px', textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
            boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(37,211,102,0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.3)';
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Chat With Us on WhatsApp
          </a>

          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', letterSpacing: '0.5px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            100% Confidential & Secure
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
