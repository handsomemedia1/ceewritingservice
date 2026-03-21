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
  description: 'Explore our international-grade writing services: plagiarism checks with official Turnitin, AI humanizing, executive CVs, SOPs, proposals and more.',
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
              Premium Writing Solutions for a <span className="gradient-text">Global Audience</span>
            </h1>
            <p style={{
              fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '540px', lineHeight: 1.8
            }}>
              Whether you are applying to a top-tier university abroad, pitching a multinational investor, or submitting a final thesis, our services guarantee excellence.
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

      {/* Final CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1F3A, #112d52)',
        padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div className="orb" style={{background: 'rgba(201,147,58,0.15)', top: '-50%', left: '20%'}} />
        <div style={{position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)',
            color: 'white', marginBottom: '20px', fontWeight: 700
          }}>Ready to Elevate Your Documents?</h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px'}}>
            Do not let poor writing cost you that job, admission, or contract. Let our experts perfect it for you today.
          </p>
          <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" className="btn-gold" style={{padding: '16px 36px', fontSize: '16px'}}>
            <span>💬 Discuss Your Project on WhatsApp</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
