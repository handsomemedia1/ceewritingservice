'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const values = [
  {
    number: '01',
    title: 'Excellence First',
    desc: 'Every document passes at least two quality checks before delivery. No shortcuts, ever.'
  },
  {
    number: '02',
    title: 'Speed You Can Count On',
    desc: 'Most orders delivered within 24 hours. Some in just a few hours. We never miss a deadline.'
  },
  {
    number: '03',
    title: 'Trust Without Question',
    desc: 'Your documents are 100% confidential. We never share, reuse, or store your work.'
  },
  {
    number: '04',
    title: 'Always Ahead',
    desc: 'Turnitin updates, AI detection changes, new formats. We stay ahead so you never fall behind.'
  }
];

const stats = [
  { num: '500+', label: 'Happy Clients' },
  { num: '2,000+', label: 'Documents Delivered' },
  { num: '6+', label: 'Countries Served' },
  { num: '99%', label: 'Satisfaction Rate' },
];

const milestones = [
  {
    year: '2023',
    title: 'The Beginning',
    desc: 'Started as a one-person service, helping students with plagiarism checks and CV writing.'
  },
  {
    year: '2024',
    title: 'Growing Trust',
    desc: 'Reached 200+ clients across Nigeria. Gained official Turnitin access and expanded our core services.'
  },
  {
    year: '2025',
    title: 'Going International',
    desc: 'Started serving Nigerians in the UK, Canada, and USA. Launched AI humanising and business writing.'
  },
  {
    year: '2026',
    title: 'Premium Standard',
    desc: '500+ clients trust us. Now offering international-grade packages from academic documents to corporate proposals.'
  },
];

export default function AboutClient() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <Navbar />

      {/* ===== Premium Hero ===== */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '160px',
          paddingBottom: '80px',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
        }}
      >
        {/* Subtle Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/services/hero.jpg"
            alt="About Cee Writing Service"
            fill
            style={{ objectFit: 'cover', opacity: 0.15, filter: 'grayscale(100%)' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0A0A0A 20%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 80%)' }} />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
          }}
        >
          {/* Top Content Area */}
          <div style={{ maxWidth: '800px', marginBottom: '120px' }}>
            <p
              className="font-space"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(197,160,89,0.7)',
                marginBottom: '32px',
              }}
            >
              Our Story
            </p>

            <h1
              className="font-space"
              style={{
                fontSize: 'clamp(44px, 6vw, 84px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                marginBottom: '40px',
              }}
            >
              We do not just write.<br />
              <span style={{ color: '#C5A059' }}>We build confidence.</span>
            </h1>

            <p
              className="font-inter"
              style={{
                fontSize: '20px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                maxWidth: '600px',
              }}
            >
              When you submit something we created, you submit it knowing it is excellent. That feeling is what we work for, every single time.
            </p>
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(197,160,89,0.2)',
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 200px',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '40px',
                  paddingBottom: '40px',
                  paddingRight: '32px',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                  paddingLeft: i > 0 ? '32px' : '0',
                }}
              >
                <span
                  className="font-space"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 700,
                    color: '#EAEAEA',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="font-space"
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'rgba(197,160,89,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== Why We Exist ===== */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '160px',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '80px', alignItems: 'stretch' }}>
            
            <div style={{ flex: '1 1 400px' }}>
              <p
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.7)',
                  marginBottom: '24px',
                }}
              >
                Why We Exist
              </p>
              <h2
                className="font-space"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  color: '#EAEAEA',
                  marginBottom: '40px',
                }}
              >
                Born from frustration.<br />
                <span style={{ color: '#C5A059' }}>Built on trust.</span>
              </h2>
              
              <div
                className="font-inter"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.9,
                  color: '#999999',
                  fontWeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  maxWidth: '480px',
                }}
              >
                <p>
                  Let us be honest. If you are a Nigerian student or professional, you have probably experienced this: you pay someone to help with your document, and they deliver something poorly written, full of errors, or worse — plagiarized.
                </p>
                <p>
                  That is exactly why Cee Writing Service was created. We saw how many writing services were cutting corners, using fake plagiarism tools, and delivering work that could get students in serious trouble.
                </p>
                <p style={{ color: '#EAEAEA', fontWeight: 400 }}>
                  We decided enough was enough. We built a service that actually delivers.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div
              style={{
                flex: '1 1 450px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 'clamp(0px, 4vw, 80px)',
                borderLeft: '1px solid rgba(197,160,89,0.1)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '120px',
                  color: 'rgba(197,160,89,0.2)',
                  lineHeight: 0.8,
                  marginBottom: '16px',
                }}
              >
                &ldquo;
              </span>
              <p
                className="font-space"
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: '#EAEAEA',
                  marginBottom: '48px',
                }}
              >
                We do not just write documents. We build confidence. When you submit a CV we wrote, a proposal we polished, or a statement we crafted — you submit it knowing it is excellent.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '32px' }}>
                <div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#EAEAEA',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                    }}
                  >
                    Cee Writing Team
                  </div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#888888',
                    }}
                  >
                    Founder's Vision
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Journey Timeline ===== */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '160px',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          backgroundColor: '#111111',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '100px', textAlign: 'center' }}>
              <p
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.7)',
                  marginBottom: '24px',
                }}
              >
                Our Journey
              </p>
              <h2
                className="font-space"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  color: '#EAEAEA',
                }}
              >
                How we got here.
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {milestones.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    gap: '40px',
                    paddingTop: '60px',
                    paddingBottom: '60px',
                    borderTop: '1px solid rgba(197,160,89,0.1)',
                  }}
                >
                  <div style={{ flex: '1 1 200px' }}>
                    <span
                      className="font-space"
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#C5A059',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      {m.year} &mdash;
                    </span>
                  </div>
                  <div style={{ flex: '3 1 400px' }}>
                    <h3
                      className="font-space"
                      style={{
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 700,
                        color: '#EAEAEA',
                        marginBottom: '24px',
                        lineHeight: 1.1,
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="font-inter"
                      style={{
                        fontSize: '17px',
                        lineHeight: 1.85,
                        color: '#999999',
                        fontWeight: 300,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '160px',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px', marginBottom: '100px' }}>
            <div>
              <p
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.7)',
                  marginBottom: '24px',
                }}
              >
                What Drives Us
              </p>
              <h2
                className="font-space"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.02em',
                  color: '#EAEAEA',
                }}
              >
                Our core <span style={{ color: '#C5A059' }}>values.</span>
              </h2>
            </div>
            <p
              className="font-inter"
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                maxWidth: '400px',
                paddingBottom: '12px',
              }}
            >
              The principles behind every document we deliver. We don't compromise on these.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              borderTop: '1px solid rgba(197,160,89,0.1)',
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '64px',
                  paddingBottom: '64px',
                  paddingRight: '40px',
                  borderRight: i < values.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                  paddingLeft: i > 0 ? '40px' : '0',
                }}
              >
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(197,160,89,0.4)',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: '32px',
                  }}
                >
                  {v.number} &mdash;
                </span>
                <h3
                  className="font-space"
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#EAEAEA',
                    marginBottom: '24px',
                    lineHeight: 1.2,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.85,
                    color: '#999999',
                    fontWeight: 300,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '160px',
          backgroundColor: '#111111',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 6vw, 100px)',
            paddingRight: 'clamp(24px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p
              className="font-space"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(197,160,89,0.7)',
                marginBottom: '32px',
              }}
            >
              Your Success Partner
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                marginBottom: '40px',
              }}
            >
              Ready to write your<br />
              <span style={{ color: '#C5A059' }}>next chapter?</span>
            </h2>
            <p
              className="font-inter"
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#999999',
                fontWeight: 300,
                marginBottom: '64px',
                maxWidth: '600px',
                margin: '0 auto 64px auto',
              }}
            >
              Join 500+ successful professionals, scholars, and founders who have entrusted their career stories to our experts.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <a
                href="https://wa.me/2349056752549"
                target="_blank"
                rel="noreferrer"
                className="font-space"
                style={{
                  backgroundColor: '#EAEAEA',
                  color: '#0A0A0A',
                  padding: '20px 40px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Chat With Us on WhatsApp
              </a>
              <p
                className="font-inter"
                style={{
                  fontSize: '13px',
                  color: '#666666',
                  letterSpacing: '0.02em',
                }}
              >
                100% Confidential &amp; Secure. We reply within 2 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
