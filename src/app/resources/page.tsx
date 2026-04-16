"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, PenTool, Search, BarChart3, Download, Star, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const categories = ['All', 'Career', 'Academic', 'Scholarship'];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={28} strokeWidth={1.5} />,
  PenTool: <PenTool size={28} strokeWidth={1.5} />,
  Search: <Search size={28} strokeWidth={1.5} />,
  BarChart3: <BarChart3 size={28} strokeWidth={1.5} />,
  BookOpen: <BookOpen size={28} strokeWidth={1.5} />,
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
      if (data) setResources(data);
      setLoading(false);
    };
    fetchResources();
  }, []);

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
                  <div style={{color: 'white', zIndex: 1}}>{iconMap[r.icon] || <FileText size={28} strokeWidth={1.5} />}</div>
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
                    {r.description}
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
                      {(r.features || []).map((f: string, j: number) => (
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
                      href={r.file_url || `https://wa.me/2349056752549?text=${encodeURIComponent(`Hi, I would like to download the free resource: ${r.title}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        const supabase = createClient();
                        supabase.rpc('increment_resource_download', { row_id: r.id }).then();
                        
                        // Optimistically update UI
                        setResources(prev => prev.map(res => 
                          res.id === r.id ? { ...res, downloads: (res.downloads || 0) + 1 } : res
                        ));
                      }}
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

          {/* ====== Custom Services CTA ====== */}
          <div className="reveal" style={{
            marginTop: '64px',
            background: 'linear-gradient(135deg, #061428, #16213E, #112d52)',
            borderRadius: '32px', padding: '64px 32px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            {/* Elegant overlay blobs */}
            <div style={{
              position: 'absolute', top: '-20%', left: '-10%', 
              width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(201,147,58,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none'
            }} />
            
            <div style={{ 
              position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', 
              alignItems: 'center', textAlign: 'center', maxWidth: '700px', margin: '0 auto' 
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,147,58,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                border: '1px solid rgba(201,147,58,0.2)'
              }}>
                <BookOpen size={28} color="#E8B96A" strokeWidth={1.5} />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 900, color: 'white', marginBottom: '16px', lineHeight: 1.2
              }}>
                Need More Than Just a <span className="gradient-text">Template</span>?
              </h3>
              
              <p style={{
                fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, 
                marginBottom: '36px'
              }}>
                A template can only do so much. Get a fully personalized, custom-written document tailored specifically for your profile. Turnkey perfection delivered in 24 hours.
              </p>

              <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: '#25D366', color: 'white', padding: '16px 48px',
                borderRadius: '50px', fontWeight: 700, fontSize: '17px', textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                boxShadow: '0 10px 30px rgba(37,211,102,0.2)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(37,211,102,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,211,102,0.2)';
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Request Custom Writing
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
