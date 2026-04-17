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
      <div style={{background: 'var(--cream)', paddingBottom: '40px'}}>
        <BlogPreview showViewAll={false} />
      </div>

      {/* ===== Blog specific CTA ===== */}
      <section style={{
        background: 'var(--cream)', padding: '0 24px 100px',
      }}>
        <div className="glass-card-light" style={{
          maxWidth: '1000px', margin: '0 auto', 
          background: 'white',
          borderRadius: '32px', padding: '64px 32px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.03), inset 0 0 0 4px rgba(255,255,255,0.5)'
        }}>
          {/* Subtle watermark or pattern */}
          <div style={{
            position: 'absolute', top: '-10%', right: '-5%', fontSize: '200px', opacity: 0.02,
            fontFamily: "'Playfair Display', serif", fontWeight: 900, pointerEvents: 'none', lineHeight: 1
          }}>
            &ldquo;
          </div>
          
          <div style={{position: 'relative', zIndex: 2, maxWidth: '650px', margin: '0 auto'}}>
            <div className="section-label" style={{ color: 'var(--gold)' }}>
              Get It Done For You
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)',
              color: 'var(--navy)', marginBottom: '16px', fontWeight: 900, lineHeight: 1.2
            }}>
              Tired of Guessing? <br/> Let the Experts Handle It.
            </h2>
            <p style={{
              color: 'var(--muted)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.7,
            }}>
              Skip the trial and error. Reading guides is great, but having a professional draft it for you guarantees results. Let us perfect your document in 24 hours.
            </p>
            
            <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#25D366', color: 'white', padding: '16px 40px',
              borderRadius: '50px', fontWeight: 700, fontSize: '17px', textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
              boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Skip to the Results
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
