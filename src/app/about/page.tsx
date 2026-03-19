"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Timer, Handshake, Lightbulb, Users, FileCheck, Globe, Award } from 'lucide-react';

const values = [
  { icon: <Target size={32} strokeWidth={1.5} />, title: 'Excellence First', desc: 'Every document passes at least two quality checks before delivery. No shortcuts, ever.' },
  { icon: <Timer size={32} strokeWidth={1.5} />, title: 'Speed You Can Count On', desc: 'Most orders delivered within 24 hours. Some in just a few hours.' },
  { icon: <Handshake size={32} strokeWidth={1.5} />, title: 'Trust Without Question', desc: 'Your documents are 100% confidential. We never share, reuse, or store your work.' },
  { icon: <Lightbulb size={32} strokeWidth={1.5} />, title: 'Always Ahead', desc: 'Turnitin updates, AI detection changes, new formats. We stay ahead so you never fall behind.' },
];

const stats = [
  { num: '500+', label: 'Happy Clients', icon: <Users size={20} strokeWidth={1.5} /> },
  { num: '2,000+', label: 'Documents Delivered', icon: <FileCheck size={20} strokeWidth={1.5} /> },
  { num: '6+', label: 'Countries Served', icon: <Globe size={20} strokeWidth={1.5} /> },
  { num: '99%', label: 'Satisfaction Rate', icon: <Award size={20} strokeWidth={1.5} /> },
];

const milestones = [
  { year: '2023', title: 'The Beginning', desc: 'Started as a one-person service, helping students with plagiarism checks and CV writing.' },
  { year: '2024', title: 'Growing Trust', desc: 'Reached 200+ clients across Nigeria. Got official Turnitin access and expanded services.' },
  { year: '2025', title: 'Going International', desc: 'Started serving Nigerians in UK, Canada, USA. Launched AI humanizing and business writing.' },
  { year: '2026', title: 'Premium Standard', desc: '500+ clients trust us. Now offering international-grade packages from documents to proposals.' },
];

export default function AboutPage() {
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

      {/* ===== Premium Hero ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden', minHeight: '80vh',
        display: 'flex', alignItems: 'center', padding: '0',
      }}>
        {/* Background image */}
        <div style={{position: 'absolute', inset: 0, zIndex: 0}}>
          <Image src="/images/hero/about-hero.png" alt="About Cee Writing Service" fill style={{objectFit: 'cover'}} priority />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(6,20,40,0.92) 0%, rgba(11,31,58,0.85) 50%, rgba(6,20,40,0.95) 100%)',
          }} />
        </div>

        {/* Orbs */}
        <div className="gradient-mesh" style={{position: 'absolute', inset: 0, zIndex: 1, opacity: 0.5}}>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div style={{
          position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto',
          textAlign: 'center', padding: '180px 24px 100px',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(201,147,58,0.12)', border: '1px solid rgba(201,147,58,0.25)',
            color: '#E8B96A', fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px',
            marginBottom: '32px',
          }}>
            Our Story
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900,
            lineHeight: 1.1, color: 'white', marginBottom: '24px',
            letterSpacing: '-1px',
          }}>
            We Do Not Just Write.{' '}
            <br />
            <span className="gradient-text">We Build Confidence.</span>
          </h1>

          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.55)', maxWidth: '600px',
            margin: '0 auto 40px', lineHeight: 1.8,
          }}>
            When you submit something we created, you submit it knowing it is excellent. That feeling is what we work for, every single time.
          </p>

          {/* Stats row in hero */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0',
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
            padding: '0', overflow: 'hidden', maxWidth: '700px', margin: '0 auto',
          }} className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '28px 16px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{color: '#E8B96A', marginBottom: '8px', display: 'flex', justifyContent: 'center'}}>{s.icon}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '28px',
                  fontWeight: 900, color: 'white', marginBottom: '4px',
                }}>{s.num}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80Z" fill="#FDFAF5"/>
          </svg>
        </div>
      </section>

      {/* ===== Our Story ===== */}
      <section style={{background: 'var(--cream)', padding: '100px 24px'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center',
          }} className="hero-grid">
            {/* Left — text */}
            <div className="reveal-left">
              <div className="section-label" style={{color: 'var(--gold)'}}>Why We Exist</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 900, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.2,
              }}>
                Born From Frustration.<br/>
                <span style={{color: 'var(--gold)'}}>Built on Trust.</span>
              </h2>
              <p style={{fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '20px'}}>
                Let us be honest. If you are a Nigerian student or professional, you have probably experienced this: you pay someone to help with your document, and they deliver something poorly written, full of errors, or worse — plagiarized.
              </p>
              <p style={{fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '20px'}}>
                That is exactly why Cee Writing Service was created. We saw how many writing services were cutting corners, using fake plagiarism tools, and delivering work that could get students in serious trouble.
              </p>
              <p style={{fontSize: '16px', color: 'var(--navy)', lineHeight: 1.85, fontWeight: 600}}>
                We decided enough was enough. We built a service that actually delivers.
              </p>
            </div>

            {/* Right — highlight card */}
            <div className="reveal-right">
              <div style={{
                background: 'linear-gradient(160deg, #0B1F3A, #112d52)',
                borderRadius: '24px', padding: '48px 36px', position: 'relative', overflow: 'hidden',
              }}>
                <div className="orb" style={{width: '200px', height: '200px', background: 'rgba(201,147,58,0.15)', top: '-30%', right: '-10%', filter: 'blur(60px)', position: 'absolute'}} />
                <div style={{position: 'relative', zIndex: 2}}>
                  <div style={{
                    fontSize: '48px', marginBottom: '20px', lineHeight: 1,
                  }}>💡</div>
                  <p style={{
                    fontSize: '20px', fontFamily: "'Playfair Display', serif",
                    color: 'white', lineHeight: 1.6, fontWeight: 600, fontStyle: 'italic',
                    marginBottom: '24px',
                  }}>
                    &ldquo;We do not just write documents. We build confidence. When you submit a CV we wrote, a proposal we polished, or a statement we crafted — you submit it knowing it is excellent.&rdquo;
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #C9933A, #E8B96A)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 'bold', color: '#0B1F3A', fontSize: '16px',
                    }}>C</div>
                    <div>
                      <div style={{color: 'white', fontSize: '14px', fontWeight: 600}}>Cee Writing Team</div>
                      <div style={{color: 'rgba(255,255,255,0.4)', fontSize: '12px'}}>Founder&apos;s Vision</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Journey Timeline ===== */}
      <section style={{background: 'var(--white)', padding: '100px 24px'}}>
        <div style={{maxWidth: '900px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
            <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Our Journey</div>
            <h2 className="section-title" style={{color: 'var(--navy)'}}>How We Got Here</h2>
          </div>

          <div style={{position: 'relative', paddingLeft: '40px'}}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '15px', top: '8px', bottom: '8px',
              width: '2px', background: 'linear-gradient(to bottom, var(--gold), var(--gold-light), transparent)',
            }} />

            {milestones.map((m, i) => (
              <div key={i} className="reveal" style={{
                marginBottom: i < milestones.length - 1 ? '48px' : '0',
                position: 'relative',
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-33px', top: '4px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  boxShadow: '0 0 16px var(--gold-glow)',
                  border: '3px solid var(--white)',
                }} />

                <div style={{
                  background: 'var(--cream)', borderRadius: '16px', padding: '28px 32px',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    fontSize: '12px', fontWeight: 700, color: 'var(--gold)',
                    letterSpacing: '2px', marginBottom: '8px',
                  }}>{m.year}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '20px',
                    fontWeight: 700, color: 'var(--navy)', marginBottom: '8px',
                  }}>{m.title}</h3>
                  <p style={{fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7}}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section style={{background: 'linear-gradient(160deg, #061428, #0B1F3A, #112d52)', padding: '100px 24px', position: 'relative', overflow: 'hidden'}}>
        <div className="orb orb-1" />
        <div className="orb orb-3" />
        <div style={{maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2}}>
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
            <div className="section-label" style={{color: '#E8B96A', justifyContent: 'center'}}>What Drives Us</div>
            <h2 className="section-title" style={{color: 'white'}}>Our Core Values</h2>
            <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.45)', margin: '0 auto'}}>
              The principles behind every document we deliver.
            </p>
          </div>

          <div className="bento-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px',
          }}>
            {values.map((v, i) => (
              <div key={i} className="glass-card reveal-scale" style={{
                padding: '36px 24px', textAlign: 'center',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(201,147,58,0.15)', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#E8B96A',
                }}>
                  {v.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '18px',
                  fontWeight: 700, color: 'white', marginBottom: '10px',
                }}>{v.title}</h3>
                <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Where We Are Today ===== */}
      <section style={{background: 'var(--cream)', padding: '100px 24px'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Today</div>
          <h2 className="section-title" style={{color: 'var(--navy)'}}>Where We Are Now</h2>
          <p style={{fontSize: '17px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '24px'}}>
            Over 500 clients across Nigeria and the diaspora trust us with their most important documents. From final year students at UNILAG to professionals applying for jobs in the UK, from startup founders writing grant proposals to scholarship applicants aiming for Chevening.
          </p>
          <p style={{fontSize: '17px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '40px'}}>
            Whether you need a quick plagiarism check or a full document written from scratch, we treat every order like our own reputation is on the line. Because it is.
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
        padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px',
          background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)',
        }} />
        <div style={{position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 44px)',
            color: 'white', marginBottom: '16px', fontWeight: 900,
          }}>Ready to Work With a Team That Actually Delivers?</h2>
          <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.7}}>
            Join 500+ clients who trust us with their most important documents.
          </p>
          <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'white', color: 'var(--navy)', padding: '18px 40px',
            borderRadius: '50px', fontWeight: 700, fontSize: '16px', textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)', transition: 'all 0.3s',
          }}>
            💬 Chat With Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
