import React from 'react';
import Link from 'next/link';

const LEVEL_COLORS: Record<string, string> = {
  Beginner:     'rgba(16,185,129,0.15)',
  Intermediate: 'rgba(197,160,89,0.15)',
  Advanced:     'rgba(139,92,246,0.15)',
  Expert:       'rgba(239,68,68,0.15)',
  Professional: 'rgba(59,130,246,0.15)',
};
const LEVEL_TEXT: Record<string, string> = {
  Beginner:     '#10b981',
  Intermediate: '#C5A059',
  Advanced:     '#8b5cf6',
  Expert:       '#ef4444',
  Professional: '#3b82f6',
};

export default function ResearchRoadmaps() {
  const roadmaps = [
    {
      id: 'first-project',
      title: 'First Research Project',
      level: 'Beginner',
      desc: 'Master the basics: Formulating a question, basic literature review, and simple methodology.',
      icon: '🌱',
    },
    {
      id: 'undergrad-dissertation',
      title: 'Undergraduate Dissertation',
      level: 'Intermediate',
      desc: 'Structured guidance on proposals, ethical approval, data collection, and writing up.',
      icon: '🎓',
    },
    {
      id: 'masters-thesis',
      title: "Master's Thesis",
      level: 'Advanced',
      desc: 'Deep dive into complex research designs, advanced statistical analysis, and critical synthesis.',
      icon: '📜',
    },
    {
      id: 'phd-research',
      title: 'PhD Research',
      level: 'Expert',
      desc: 'Original contribution frameworks, longitudinal studies, and defending your methodology.',
      icon: '🏛️',
    },
    {
      id: 'publishing',
      title: 'Publishing Your First Journal Article',
      level: 'Professional',
      desc: 'Navigating peer-review, formatting for high-impact journals, and handling revisions.',
      icon: '📝',
    },
  ];

  return (
    <section id="roadmaps" style={{
      padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
      background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0d12 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle top border line */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.2), transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: '#C5A059', marginBottom: '16px',
          }}>
            Learning Journeys
          </div>
          <div className="section-divider" style={{ margin: '0 auto 24px' }} />
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800,
            color: 'white', marginBottom: '16px', letterSpacing: '-0.02em',
          }}>
            Structured Research Roadmaps
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(234,234,234,0.45)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Don't get lost in isolated articles. Follow our curated paths designed for your specific academic stage.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px',
        }}>
          {roadmaps.map((roadmap) => (
            <Link key={roadmap.id} href={`/research/path/${roadmap.id}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                {/* Level badge + icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                  }}>
                    {roadmap.icon}
                  </div>
                  <span style={{
                    padding: '5px 12px', borderRadius: '50px', fontSize: '10px',
                    fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                    background: LEVEL_COLORS[roadmap.level] || 'rgba(197,160,89,0.1)',
                    color: LEVEL_TEXT[roadmap.level] || '#C5A059',
                  }}>
                    {roadmap.level}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700,
                  color: 'white', marginBottom: '12px', lineHeight: 1.3,
                }}>
                  {roadmap.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.7, flex: 1, marginBottom: '24px' }}>
                  {roadmap.desc}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 700, color: '#C5A059',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>
                  View Roadmap <span>→</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Custom Path CTA */}
          <div style={{
            padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.03) 100%)',
            border: '1px solid rgba(197,160,89,0.2)', borderRadius: '20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,160,89,0.12), transparent)',
            }} />
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>✦</div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px',
              fontWeight: 700, color: 'white', marginBottom: '12px',
            }}>
              Need a Custom Path?
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(197,160,89,0.6)', lineHeight: 1.7, marginBottom: '24px' }}>
              Speak with a research consultant to design a tailored execution plan for your specific project.
            </p>
            <Link href="/services#consultation" style={{
              padding: '12px 24px', borderRadius: '8px',
              background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.3)',
              color: '#C5A059', fontWeight: 700, fontSize: '12px',
              textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
