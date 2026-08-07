"use client";

import React from 'react';
import Link from 'next/link';

const ACTIVE_TOOLS = [
  {
    id: 'gpa-calculator',
    title: 'GPA Converter & Calculator',
    description: 'Convert your Nigerian 5.0 scale GPA to a 4.0 scale or UK percentage standard for international applications.',
    icon: '🧮',
    href: '/tools/gpa-calculator',
    badge: 'Popular',
    type: 'Calculator'
  },
  {
    id: 'statistical-test-selector',
    title: 'Statistical Test Selector',
    description: 'Answer a few questions about your variables to discover exactly which statistical test you should use for your research.',
    icon: '📊',
    href: '/tools/statistical-test-selector',
    badge: 'New',
    type: 'Decision Engine'
  },
  {
    id: 'scholarship-readiness',
    title: 'Scholarship Readiness Check',
    description: 'Evaluate your academic profile against top global scholarships (Chevening, Erasmus, PTDF).',
    icon: '🎓',
    href: '/scholarship-check',
    badge: 'Flagship',
    type: 'Assessment'
  }
];

const UPCOMING_TOOLS = [
  { title: 'Sample Size Calculator', type: 'Calculator' },
  { title: 'Research Design Selector', type: 'Decision Engine' },
  { title: 'Citation Generator', type: 'Utility' }
];

export default function ToolsCatalog() {
  return (
    <section style={{ background: 'var(--sage)', padding: '120px 0', display: 'block', width: '100%' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700, color: 'var(--green-dark)', letterSpacing: '-0.02em'
          }}>Available Tools</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0', borderTop: '2px solid rgba(2,58,34,0.1)', borderLeft: '2px solid rgba(2,58,34,0.1)', marginBottom: '120px' }}>
          {ACTIVE_TOOLS.map((tool, idx) => (
            <Link key={tool.id} href={tool.href} style={{
              display: 'flex', flexDirection: 'column', padding: '48px 32px',
              borderRight: '2px solid rgba(2,58,34,0.1)', borderBottom: '2px solid rgba(2,58,34,0.1)',
              textDecoration: 'none', transition: 'background 0.2s', background: 'transparent'
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(2,58,34,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div style={{ fontSize: '40px' }}>{tool.icon}</div>
                {tool.badge && (
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--sage)',
                    background: 'var(--green-dark)', padding: '4px 12px'
                  }}>
                    {tool.badge}
                  </span>
                )}
              </div>
              
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--green-dark)', opacity: 0.5, marginBottom: '8px'
              }}>{tool.type}</div>
              
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700,
                color: 'var(--green-dark)', marginBottom: '16px', lineHeight: 1.2
              }}>{tool.title}</h3>
              
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.7,
                color: 'var(--green-dark)', opacity: 0.8, flex: 1, marginBottom: '32px'
              }}>{tool.description}</p>
              
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--green-dark)',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                Launch Tool <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div style={{
          background: 'var(--green-dark)', padding: '64px',
          display: 'flex', flexDirection: 'column', gap: '48px'
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700,
              color: 'var(--sage)', marginBottom: '16px', letterSpacing: '-0.02em'
            }}>More tools in development</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'var(--sage)', opacity: 0.8,
              maxWidth: '480px', marginBottom: '32px', lineHeight: 1.7
            }}>
              We are constantly building new utilities to streamline your academic journey. Join the waitlist for early access.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {UPCOMING_TOOLS.map(t => (
                <span key={t.title} style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 600,
                  color: 'var(--green-dark)', background: 'var(--sage)', padding: '6px 16px'
                }}>
                  {t.title}
                </span>
              ))}
            </div>
          </div>
          
          <form style={{ display: 'flex', gap: '0', maxWidth: '400px' }} onSubmit={(e) => {
            e.preventDefault();
            import('@/lib/analytics').then(({ trackEvent }) => trackEvent('newsletter_signup', { location: 'tools_waitlist' }));
            alert('Added to waitlist!');
          }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              style={{
                flex: 1, height: '56px', padding: '0 20px',
                background: 'rgba(205,224,201,0.1)', border: '1px solid rgba(205,224,201,0.3)',
                borderRight: 'none', outline: 'none', color: 'var(--sage)',
                fontFamily: "'Inter', sans-serif", fontSize: '15px'
              }}
            />
            <button style={{
              height: '56px', padding: '0 24px', flexShrink: 0,
              background: 'var(--sage)', color: 'var(--green-dark)',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
              border: 'none', cursor: 'pointer', transition: 'opacity 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px'
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Waitlist
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
