"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, PenTool, Search, BarChart3, Download, Star, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

const resources = [
  {
    icon: <FileText size={28} strokeWidth={1.5} />,
    title: 'ATS-Friendly CV Template',
    subtitle: 'Nigerian Format • 2026 Edition',
    desc: 'A clean, professional CV template optimized for applicant tracking systems. Instantly editable in Microsoft Word. Used by 200+ successful job seekers.',
    color: 'linear-gradient(135deg, #0B1F3A, #1a3a5c)',
    downloads: '200+',
    rating: '4.9',
    features: ['ATS-optimized layout', 'Easy to customize', 'Word format (.docx)', 'Professional typography'],
    category: 'Career',
  },
  {
    icon: <PenTool size={28} strokeWidth={1.5} />,
    title: 'SOP Writing Masterguide',
    subtitle: '2026 Edition • Step-by-Step',
    desc: 'Complete step-by-step guide to writing a Statement of Purpose that wins admissions to top Masters and PhD programs abroad. Includes real examples.',
    color: 'linear-gradient(135deg, #2d1b5e, #0B1F3A)',
    downloads: '150+',
    rating: '4.8',
    features: ['Real SOP examples', 'University-specific tips', 'Formatting guide', 'Common mistakes to avoid'],
    category: 'Academic',
  },
  {
    icon: <Search size={28} strokeWidth={1.5} />,
    title: 'Plagiarism Reduction Checklist',
    subtitle: 'Academic • Quick Reference',
    desc: 'A practical checklist to review before submitting any academic document. Reduce your similarity score by up to 30% with these proven techniques.',
    color: 'linear-gradient(135deg, #0d3b0d, #0B1F3A)',
    downloads: '300+',
    rating: '4.9',
    features: ['Turnitin-specific tips', 'Citation best practices', 'Paraphrasing techniques', 'Self-review checklist'],
    category: 'Academic',
  },
  {
    icon: <BarChart3 size={28} strokeWidth={1.5} />,
    title: 'Scholarship Essay Templates',
    subtitle: 'Chevening, Commonwealth, DAAD',
    desc: 'Winning essay templates and structures for major international scholarships. Includes Chevening leadership essay examples and DAAD motivation guides.',
    color: 'linear-gradient(135deg, #5c2d0B, #0B1F3A)',
    downloads: '180+',
    rating: '4.7',
    features: ['Chevening templates', 'Commonwealth formats', 'DAAD motivation letter', 'Editing checklist'],
    category: 'Scholarship',
  },
];

const categories = ['All', 'Career', 'Academic', 'Scholarship'];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? resources : resources.filter(r => r.category === activeCategory);

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

      {/* ===== Hero ===== */}
      <section className="gradient-mesh" style={{
        background: 'linear-gradient(160deg, #061428, #0B1F3A, #112d52)',
        paddingTop: '160px', paddingBottom: '100px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div style={{position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 24px'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
            color: '#6ee7b7', fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px',
            marginBottom: '28px',
          }}>
            <Download size={14} />
            100% Free — No Signup
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '20px',
          }}>
            Free Tools &{' '}
            <span className="gradient-text">Resources</span>
          </h1>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.5)', maxWidth: '550px',
            margin: '0 auto 40px', lineHeight: 1.8,
          }}>
            Premium templates, guides, and checklists to level up your writing. Completely free — no payment, no email, no catch.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap',
          }}>
            {[
              { num: '830+', label: 'Downloads' },
              { num: '4', label: 'Free Resources' },
              { num: '4.8', label: 'Avg Rating' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '28px',
                  fontWeight: 900, color: '#E8B96A',
                }}>{s.num}</div>
                <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px'}}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80Z" fill="#FDFAF5"/>
          </svg>
        </div>
      </section>

      {/* ===== Resources Section ===== */}
      <section style={{background: 'var(--cream)', padding: '80px 24px 100px'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>

          {/* Category Filter */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '10px',
            marginBottom: '56px', flexWrap: 'wrap',
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px', borderRadius: '50px', fontSize: '13px',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s',
                  border: activeCategory === cat ? '2px solid var(--gold)' : '2px solid rgba(201,147,58,0.15)',
                  background: activeCategory === cat ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'var(--white)',
                  color: activeCategory === cat ? 'white' : 'var(--navy)',
                  boxShadow: activeCategory === cat ? '0 4px 16px var(--gold-glow)' : 'var(--clay-shadow)',
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resource Cards */}
          <div className="bento-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px',
          }}>
            {filtered.map((r, i) => (
              <div
                key={i}
                className="glass-card-light"
                style={{
                  overflow: 'hidden', display: 'flex', flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hoveredIdx === i ? 'translateY(-8px)' : 'none',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Header with gradient */}
                <div style={{
                  height: '120px', background: r.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 28px', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                  }} />
                  <div style={{color: 'white', zIndex: 1}}>{r.icon}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1}}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(255,255,255,0.1)', padding: '5px 12px',
                      borderRadius: '50px', fontSize: '11px', color: '#E8B96A', fontWeight: 700,
                    }}>
                      <Star size={10} fill="#E8B96A" strokeWidth={0} /> {r.rating}
                    </div>
                    <div style={{
                      fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600,
                    }}>
                      {r.downloads} downloads
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{padding: '28px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{
                    fontSize: '10px', fontWeight: 700, color: 'var(--gold)',
                    textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px',
                  }}>{r.subtitle}</div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '20px',
                    fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3,
                  }}>{r.title}</h3>

                  <p style={{fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '20px'}}>
                    {r.desc}
                  </p>

                  {/* What's Included */}
                  <div style={{
                    background: 'rgba(201,147,58,0.04)', borderRadius: '12px',
                    padding: '16px 18px', marginBottom: '24px',
                    border: '1px solid rgba(201,147,58,0.08)',
                  }}>
                    <div style={{fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px'}}>
                      What&apos;s Included
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px'}}>
                      {r.features.map((f, j) => (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          fontSize: '12px', color: 'var(--muted)',
                        }}>
                          <CheckCircle2 size={12} color="#C9933A" strokeWidth={2} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{marginTop: 'auto'}}>
                    <a
                      href={`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(`Hi, I would like to download the free resource: ${r.title}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                        color: 'white', fontSize: '14px', fontWeight: 600,
                        padding: '14px 24px', borderRadius: '50px', textDecoration: 'none',
                        transition: 'all 0.3s', width: '100%',
                        boxShadow: '0 4px 16px rgba(11,31,58,0.2)',
                      }}
                    >
                      <Download size={16} /> Download Free
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom info */}
          <div className="reveal" style={{
            marginTop: '64px', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(11,31,58,0.04), rgba(201,147,58,0.06))',
            borderRadius: '20px', padding: '40px 32px',
            border: '1px solid rgba(201,147,58,0.12)',
          }}>
            <BookOpen size={32} color="#C9933A" style={{marginBottom: '16px'}} />
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '22px',
              fontWeight: 700, color: 'var(--navy)', marginBottom: '12px',
            }}>Need Something Custom?</h3>
            <p style={{fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 24px'}}>
              If you need a custom template, personalized guide, or professional help with your documents — we have got you covered.
            </p>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" className="btn-gold">
              <span>💬 Chat With Us</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
