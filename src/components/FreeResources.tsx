"use client";
import React from 'react';
import Link from 'next/link';
import { FileText, PenTool, Search, BarChart3 } from 'lucide-react';

  const resources = [
    { icon: <FileText size={40} strokeWidth={1.5} color="white" />, title: 'Free CV Template', subtitle: 'Nigerian Format', desc: 'A clean, ATS-friendly CV template you can edit in Word. Used by 200+ job seekers.', color: 'linear-gradient(135deg, #0B1F3A, #1a3a5c)', link: '#' },
    { icon: <PenTool size={40} strokeWidth={1.5} color="white" />, title: 'SOP Writing Guide', subtitle: '2026 Edition', desc: 'Step by step guide to writing a Statement of Purpose for Masters and PhD programs abroad.', color: 'linear-gradient(135deg, #2d1b5e, #0B1F3A)', link: '#' },
    { icon: <Search size={40} strokeWidth={1.5} color="white" />, title: 'Plagiarism Checklist', subtitle: 'Reduction Guide', desc: 'A simple checklist to review before submitting any academic document to reduce plagiarism.', color: 'linear-gradient(135deg, #1a3a1a, #0B1F3A)', link: '#' },
    { icon: <BarChart3 size={40} strokeWidth={1.5} color="white" />, title: 'Scholarship Essays', subtitle: 'Template Pack', desc: 'Templates and samples for Chevening, Commonwealth and DAAD scholarship essays.', color: 'linear-gradient(135deg, #5c2d0B, #0B1F3A)', link: '#' },
  ];

export default function FreeResources() {
  return (
    <section id="resources" style={{
      background: 'linear-gradient(180deg, #f5f0e8, #FDFAF5)', padding: '100px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2}}>
        <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Completely Free</div>
          <h2 className="section-title" style={{color: 'var(--navy)'}}>Free Resources For You</h2>
          <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
            Download these free guides and templates. No payment, no signup needed.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}} className="bento-grid">
          {resources.map((r, i) => (
            <div key={i} className="glass-card-light" style={{
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                height: '100px', background: r.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '40px',
              }}>{r.icon}</div>
              <div style={{padding: '24px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                <div style={{
                  fontSize: '10px', fontWeight: 700, color: 'var(--gold)',
                  textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px',
                }}>{r.subtitle}</div>
                <h4 style={{
                  fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px',
                }}>{r.title}</h4>
                <p style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, flex: 1, marginBottom: '18px'}}>{r.desc}</p>
                <a href="https://wa.me/234XXXXXXXXXX?text=Hi%2C%20I%20would%20like%20to%20download%20the%20free%20resource%3A%20" target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                  color: 'white', fontSize: '12px', fontWeight: 600,
                  padding: '10px 18px', borderRadius: '50px', textDecoration: 'none',
                  width: 'fit-content', transition: 'all 0.2s',
                }}>
                  Download Free →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
