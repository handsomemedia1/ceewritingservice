import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Cee Writing Service',
  description: 'Free tips, guides and insights on writing better, passing plagiarism checks, building strong CVs, and winning scholarships.',
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section style={{
        position: 'relative', overflow: 'hidden', minHeight: '55vh',
        display: 'flex', alignItems: 'center', padding: '160px 24px 80px'
      }}>
        {/* Abstract Background Image */}
        <div style={{position: 'absolute', inset: 0, zIndex: 0}}>
          <Image src="/images/hero/blog-hero.png" alt="Blog Background" fill style={{objectFit: 'cover'}} priority />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #0B1F3A 20%, rgba(11,31,58,0.7) 100%)'}}></div>
        </div>

        {/* Content Container */}
        <div style={{
          position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ animation: 'fadeUp 0.8s ease forwards' }}>
            <div className="section-label" style={{color: '#E8B96A', justifyContent: 'center'}}>Insights &amp; Strategies</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px'
            }}>
              Master Your <span className="gradient-text">Career Story</span>
            </h1>
            <p style={{
              fontSize: '17px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.8,
              margin: '0 auto 32px',
            }}>
              Discover expert advice on CV writing, LinkedIn optimization, and winning scholarships. Actionable tips to elevate your professional brand.
            </p>

            {/* Topics Pills */}
            <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center'}} className="hero-badges">
              {['CV Writing', 'Admissions', 'LinkedIn', 'Career Guides', 'AI Detection', 'Plagiarism'].map((tag, i) => (
                <span key={i} style={{
                  padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 600,
                  background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', cursor: 'pointer'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Squiggly SVG bottom divider */}
        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="var(--cream)"/>
          </svg>
        </div>
      </section>

      {/* Blog articles - hide "View All" since we're already on the blog page */}
      <div style={{background: 'var(--cream)'}}>
        <BlogPreview showViewAll={false} />
      </div>

      <Footer />
    </main>
  );
}
