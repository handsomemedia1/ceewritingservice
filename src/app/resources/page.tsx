import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourcesClient from '@/components/ResourcesClient';
import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Free Resources | Cee Writing Service',
  description: 'Free CV templates, SOP guides, scholarship checklists and writing tools for Nigerian students and professionals. 830+ downloads. No signup required.',
  alternates: { canonical: '/resources' },
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  const allResources = resources || [];

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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
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

          {/* Stats — static, always visible to crawlers */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {[
              { num: '830+', label: 'Downloads' },
              { num: String(allResources.length || 4), label: 'Free Resources' },
              { num: '4.8', label: 'Avg Rating' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '28px',
                  fontWeight: 900, color: '#E8B96A',
                }}>{s.num}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 3 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80Z" fill="#FDFAF5" />
          </svg>
        </div>
      </section>

      {/* Static resource listing for crawlers — visually hidden but in DOM */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {allResources.map((r: any) => (
          <div key={r.id}>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            {r.file_url && <a href={r.file_url}>Download {r.title}</a>}
          </div>
        ))}
      </div>

      {/* Interactive section — client component with full resources passed as props */}
      <ResourcesClient initialResources={allResources} />

      <Footer />
    </main>
  );
}
