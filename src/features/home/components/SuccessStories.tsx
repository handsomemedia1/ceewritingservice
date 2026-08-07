import React from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Adebayo O.",
    role: "Post-Doc Researcher, UK",
    quote: "The statistical analysis provided for my methodology chapter was flawless. They didn't just run the numbers — they explained the rationale so I could defend it perfectly in my viva.",
  },
  {
    id: "2",
    name: "Sarah M.",
    role: "Chevening Scholar, 2024",
    quote: "Their readiness check identified my exact strengths. Their editing team polished my essays to perfection. I won the scholarship. I don't think I'd have made it without Cee Writing.",
  },
  {
    id: "3",
    name: "David K.",
    role: "MSc Finance Graduate",
    quote: "My thesis was rejected due to high AI similarity. Cee Writing Hub restructured my arguments and completely humanized the text. Passed with distinction on resubmission.",
  },
];

export default function SuccessStories() {
  return (
    <section
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '100px',
        paddingBottom: '100px',
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
        <div style={{ marginBottom: '80px' }}>
          <p
            className="font-space"
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(197,160,89,0.7)',
              marginBottom: '20px',
            }}
          >
            Success Stories
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
            }}
          >
            Trusted by scholars<br />
            <span style={{ color: '#C5A059' }}>across the world.</span>
          </h2>
        </div>

        {/* Testimonial grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '0',
                paddingBottom: '40px',
                paddingRight: idx === testimonials.length - 1 ? '0' : '48px',
                paddingLeft: idx === 0 ? '0' : '48px',
                borderRight: idx < testimonials.length - 1 ? '1px solid rgba(197,160,89,0.08)' : 'none',
              }}
            >
              <div
                className="font-space"
                style={{
                  fontSize: '80px',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: 'rgba(197,160,89,0.3)',
                  marginBottom: '16px',
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </div>
              <p
                className="font-inter"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.9,
                  color: '#EAEAEA',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  marginBottom: '40px',
                  flex: 1,
                }}
              >
                {t.quote}
              </p>
              <div style={{ borderBottom: '1px solid rgba(197,160,89,0.3)', width: '40px', marginBottom: '24px' }} />
              <div>
                <div
                  className="font-space"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#C5A059',
                    marginBottom: '4px',
                  }}
                >
                  {t.name}
                </div>
                <div
                  className="font-inter"
                  style={{
                    fontSize: '12px',
                    color: '#888888',
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
