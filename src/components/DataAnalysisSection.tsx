"use client";
import React from 'react';
import { BarChart3, PieChart, FileSearch, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function DataAnalysisSection() {
  const features = [
    {
      icon: <FileSearch size={24} color="#C9933A" strokeWidth={2} />,
      title: "In-Depth Academic Research",
      desc: "Comprehensive literature reviews, methodology design, and qualitative research to back up your thesis or business proposal."
    },
    {
      icon: <BarChart3 size={24} color="#C9933A" strokeWidth={2} />,
      title: "Statistical Analysis",
      desc: "Rigorous testing (ANOVA, T-Tests, Regression) using advanced software to ensure your data holds up under scrutiny."
    },
    {
      icon: <PieChart size={24} color="#C9933A" strokeWidth={2} />,
      title: "Python & R Data Processing",
      desc: "We process raw, unstructured data sets into clean, readable formats using Python (Pandas/NumPy) and R."
    },
    {
      icon: <TrendingUp size={24} color="#C9933A" strokeWidth={2} />,
      title: "Actionable Insights",
      desc: "We do not just hand you spreadsheets. We provide complete, written interpretations of what your data actually means."
    }
  ];

  return (
    <section className="reveal" style={{
      padding: '100px 24px', 
      background: 'white',
      position: 'relative', 
      overflow: 'hidden',
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div style={{
          display: 'grid', 
          gridTemplateColumns: '1fr 1.2fr', 
          gap: '80px', 
          alignItems: 'center',
        }} className="data-grid">
          
          {/* Left - Text Content */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div className="section-label" style={{color: 'var(--gold)', marginBottom: '16px'}}>
              Research & Analytics
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 900, 
              color: 'var(--navy)', 
              lineHeight: 1.15, 
              marginBottom: '24px',
            }}>
              Turn Raw Data into <span className="gradient-text">Clear Answers.</span>
            </h2>
            <p style={{
              fontSize: '17px', 
              color: 'var(--muted)', 
              lineHeight: 1.8, 
              marginBottom: '32px'
            }}>
              Whether you are defending a master&apos;s thesis or making a critical business decision, bad data analysis will cost you. Our team of statisticians and researchers specialize in advanced data processing using Python and R. We handle the complex math so you can focus on the results.
            </p>
            
            <ul style={{
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 40px 0', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px'
            }}>
              {['Custom Methodology Design', 'Data Cleaning & Structuring', 'Predictive Modeling & Forecasting'].map((item, i) => (
                <li key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--navy)', fontWeight: 600}}>
                  <CheckCircle2 size={20} color="#10b981" />
                  {item}
                </li>
              ))}
            </ul>

            <a href="https://wa.me/2349056752549" target="_blank" rel="noreferrer" className="btn-gold" style={{boxShadow: '0 10px 30px rgba(201,147,58,0.2)'}}>
              <span>Discuss Your Research Needs</span>
            </a>
          </div>

          {/* Right - Bento Grid */}
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px',
            position: 'relative'
          }} className="data-cards">
            {/* Background Blob for aesthetic */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(201,147,58,0.08) 0%, transparent 70%)',
              zIndex: 0, pointerEvents: 'none'
            }} />
            
            {features.map((f, i) => (
              <div key={i} className="glass-card-light" style={{
                padding: '32px 24px', 
                background: 'var(--cream)',
                border: '1px solid rgba(201,147,58,0.1)',
                position: 'relative',
                zIndex: 1,
                transform: i % 2 !== 0 ? 'translateY(30px)' : 'none' // Staggered grid effect
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'white', border: '1px solid rgba(201,147,58,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                }}>
                  {f.icon}
                </div>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '18px',
                  color: 'var(--navy)', marginBottom: '12px', fontWeight: 700,
                }}>{f.title}</h4>
                <p style={{fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Embedded CSS for responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          .data-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .data-cards {
            grid-template-columns: 1fr !important;
          }
          .data-cards > div {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
