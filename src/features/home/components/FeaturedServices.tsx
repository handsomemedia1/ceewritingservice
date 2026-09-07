import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Research Methodology & PhD Support',
    description: 'Comprehensive consultancy for PhD and master\'s research. From formulating research gaps and theoretical frameworks to thesis defense preparation.',
    href: '/research',
    image: '/images/home/expertise_presentation.jpg',
  },
  {
    number: '02',
    title: 'Advanced Data Analysis & Statistics',
    description: 'Quantitative and qualitative analysis using SPSS, AMOS, and SmartPLS. Expertise in Structural Equation Modeling (SEM), CFA, and advanced multivariate analysis.',
    href: '/research/data-analysis',
    image: '/images/home/services_book.jpg',
  },
  {
    number: '03',
    title: 'R, Python & Econometrics',
    description: 'Advanced statistical computing, time-series forecasting, and mathematical modeling using R, Python, and EViews for complex research data.',
    href: '/services#data-analysis',
    image: '/images/hero/hero_academic_research.jpg', // Reusing an existing image
  },
  {
    number: '04',
    title: 'Academic Writing & Editing Support',
    description: 'Dissertation editing, proposal refinement, SOPs, and rigorous Turnitin plagiarism/AI checks tailored for researchers with global ambitions.',
    href: '/services#writing',
    image: '/images/home/editing_hands.jpg',
  },
];

export default function FeaturedServices() {
  return (
    <section
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '120px',
        paddingBottom: '120px',
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
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '32px',
            marginBottom: '80px',
          }}
        >
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
              Our Services
            </p>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
              }}
            >
              How we deliver<br />
              <span style={{ color: '#C5A059' }}>exceptional results.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="font-space"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(197,160,89,0.8)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(197,160,89,0.3)',
              paddingBottom: '12px',
            }}
          >
            View All Services <span>→</span>
          </Link>
        </div>

        {/* Services Editorial Spread */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(40px, 8vw, 120px)',
              }}
            >
              {/* Image side */}
              <Link
                href={s.href}
                className="img-zoom-wrap"
                style={{
                  position: 'relative',
                  flex: '1 1 400px',
                  height: 'clamp(400px, 60vh, 600px)',
                  order: i % 2 === 1 ? 2 : 1, // alternate
                  display: 'block',
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.8s ease, transform 0.8s ease',
                  }}
                  className="group-hover:grayscale-0"
                />
              </Link>

              {/* Text side */}
              <div
                style={{
                  flex: '1 1 350px',
                  order: i % 2 === 1 ? 1 : 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: i % 2 === 1 ? 'flex-end' : 'flex-start',
                  textAlign: i % 2 === 1 ? 'right' : 'left',
                }}
              >
                <span
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: 'rgba(197,160,89,0.4)',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    display: 'block',
                  }}
                >
                  {s.number}
                </span>
                <Link href={s.href} style={{ textDecoration: 'none' }}>
                  <h3
                    className="font-space group-hover:text-gold"
                    style={{
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: '#EAEAEA',
                      marginBottom: '32px',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {s.title}
                  </h3>
                </Link>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.85,
                    color: '#999999',
                    fontWeight: 300,
                    marginBottom: '40px',
                    maxWidth: '440px',
                  }}
                >
                  {s.description}
                </p>
                <Link
                  href={s.href}
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(197,160,89,0.6)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span>Learn more</span>
                  <span
                    className="group-hover:translate-x-2"
                    style={{ transition: 'transform 0.3s ease', color: '#C5A059' }}
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
