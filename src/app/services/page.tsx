import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import Packages from '@/components/Packages';
import { FileText, PenTool, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Premium Services | Cee Writing Service',
  description: 'Explore our professional services: in depth research, data analysis using Python and R, plagiarism checks with Turnitin, executive CVs, SOP writing, and proposals. Serving clients in the USA, UK, Canada, UAE, and Kuwait.',
};

export default function ServicesPage() {
  const steps = [
    { icon: <FileText size={28} color="white" strokeWidth={1.5} />, title: '1. Share Your Needs', desc: 'Message us on WhatsApp with your document, instructions, or specific requirements.' },
    { icon: <PenTool size={28} color="white" strokeWidth={1.5} />, title: '2. Expert Drafting', desc: 'Our specialist writers craft, edit, or humanize your content to international standards.' },
    { icon: <ShieldCheck size={28} color="white" strokeWidth={1.5} />, title: '3. Quality Assurance', desc: 'Every document undergoes strict plagiarism and grammar checks before it leaves our desk.' },
    { icon: <CheckCircle2 size={28} color="white" strokeWidth={1.5} />, title: '4. Final Delivery', desc: 'You receive the perfected document. We offer free revisions until you are 100% satisfied.' },
  ];

  return (
    <main>
      <Navbar />

      {/* Premium Hero Section with Image */}
      <section className="gradient-mesh" style={{
        background: 'linear-gradient(160deg, #061428 0%, #0B1F3A 40%, #112d52 100%)',
        minHeight: '70vh', display: 'flex', alignItems: 'center',
        padding: '160px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div style={{
          maxWidth: '1280px', margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px',
          alignItems: 'center', position: 'relative', zIndex: 2,
        }}>
          <div style={{ animation: 'fadeUp 0.8s ease forwards' }}>
            <div className="section-label" style={{color: '#E8B96A', marginBottom: '20px'}}>
              Global Standards
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '24px',
              letterSpacing: '-1px'
            }}>
              Professional Writing, Research, and <span className="gradient-text">Data Analysis</span>
            </h1>
            <p style={{
              fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.8
            }}>
              Whether you are applying to a top university abroad, pitching a multinational investor, or analyzing complex data with Python and R, our expert team delivers reliable and accurate results.
            </p>
          </div>

          <div style={{ position: 'relative', animation: 'fadeUp 0.8s ease forwards 0.2s', opacity: 0 }}>
            {/* Explicit Image on the right */}
            <div style={{
              width: '100%', height: '400px', borderRadius: '24px', position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Image src="/images/hero/services-hero.png" alt="Premium Writing Services" fill style={{ objectFit: 'cover' }} priority />
            </div>
            <div style={{
              position: 'absolute', bottom: '-20px', left: '-30px',
              background: 'rgba(11,31,58,0.8)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,147,58,0.3)', borderRadius: '16px',
              padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#E8B96A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F3A'
              }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{color: 'white', fontWeight: 700, fontSize: '14px'}}>500+ Projects</div>
                <div style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px'}}>Successfully Delivered</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3}}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', width: '100%'}}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,50 1380,40 1440,30 L1440,60 L0,60Z" fill="#FDF8F2"/>
          </svg>
        </div>
      </section>

      {/* How It Works (International Flow) */}
      <section style={{background: 'var(--cream)', padding: '60px 24px 40px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '32px',
              fontWeight: 700, color: 'var(--navy)', marginBottom: '12px'
            }}>How We Work</h2>
            <p style={{color: 'var(--muted)', fontSize: '15px'}}>A seamless, professional process from start to finish.</p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px'
          }}>
            {steps.map((step, i) => (
              <div key={i} className="glass-card-light" style={{
                padding: '32px 24px', textAlign: 'center', position: 'relative'
              }}>
                <div style={{
                  width: '64px', height: '64px', margin: '0 auto 20px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(11,31,58,0.2)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px'
                }}>{step.title}</h3>
                <p style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <div style={{background: 'var(--cream)'}}>
        <div style={{height: '1px', background: 'var(--border)', maxWidth: '1280px', margin: '0 auto'}} />
        <ServicesSection />
      </div>

      {/* Pricing / Packages */}
      <Packages />

      {/* ===== Final CTA (Services Page) ===== */}
      <section style={{
        position: 'relative',
        background: 'var(--navy-deep)',
        padding: '120px 24px', 
        textAlign: 'center',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Orbs background for depth */}
        <div style={{
          position: 'absolute', top: '10%', left: '10%', 
          width: '300px', height: '300px', 
          background: 'rgba(201,147,58,0.15)',
          filter: 'blur(80px)', pointerEvents: 'none',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%', 
          width: '300px', height: '300px', 
          background: 'rgba(37,211,102,0.12)',
          filter: 'blur(80px)', pointerEvents: 'none',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ color: '#E8B96A' }}>
            Transform Your Outcomes
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", 
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: 'white', 
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '24px',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)'
          }}>
            Secure Your Next <span className="gradient-text">Big Win</span>.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '18px', 
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            Do not let bad copy or a grammatical error cost you an admission or contract. Let our experts perfect your document to international standards today.
          </p>
          
          <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            background: '#25D366', color: 'white', padding: '18px 48px',
            borderRadius: '50px', fontWeight: 700, fontSize: '18px', textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
            boxShadow: '0 10px 30px rgba(37,211,102,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
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
