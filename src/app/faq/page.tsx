import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQClient from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'FAQ | Cee Writing Hub — Common Questions Answered',
  description: 'Answers to every question about our advanced research, data analysis, academic writing, and scholarship intelligence services.',
  alternates: { canonical: 'https://ceewriting.com/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Cee Writing Hub',
    description: 'Everything you need to know about our advanced research support, statistical modelling, and academic editing.',
    type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};

const ALL_FAQS = [
  {
    category: 'Research Support',
    items: [
      { q: 'What research methodology support do you provide?', a: 'We guide you through selecting and justifying your research design, whether quantitative, qualitative, or mixed-methods. Our support extends from formulating the initial research gap to structuring the final methodology chapter.' },
      { q: 'Do you support PhD-level research?', a: 'Yes. Our team frequently assists PhD candidates and early-career researchers with complex thesis structuring, theoretical framework alignment, and rigorous literature reviews tailored to institutional standards.' },
      { q: 'Can you help with quantitative and qualitative research?', a: 'Absolutely. We support both paradigms. For qualitative research, we assist with thematic analysis and NVivo. For quantitative research, we handle survey design, data collection strategies, and advanced statistical analysis.' },
    ],
  },
  {
    category: 'Data Analysis',
    items: [
      { q: 'What statistical tools do you support?', a: 'We specialize in SPSS, R, Python, Stata, and EViews. The choice of tool depends entirely on your research objectives, dataset size, and institutional requirements.' },
      { q: 'When should I use SPSS vs R or Python?', a: 'SPSS is excellent for standard social science surveys and straightforward hypothesis testing. R and Python are preferred for advanced econometric modelling, large datasets, and custom visualizations. We will advise you on the best tool during our consultation.' },
      { q: 'Can you help interpret statistical results?', a: 'Yes. We don\'t just run the numbers; we provide comprehensive write-ups interpreting what the outputs (like p-values and confidence intervals) mean in the context of your specific research questions.' },
      { q: 'Do you support advanced statistical modelling?', a: 'Yes, including Structural Equation Modelling (SEM), time-series forecasting, regression analysis, and multivariate testing.' },
    ],
  },
  {
    category: 'Academic Writing & Editing',
    items: [
      { q: 'Do you edit theses and dissertations?', a: 'Yes, we provide comprehensive developmental editing and proofreading for full theses, dissertations, and journal articles. We focus on academic tone, flow, argument structure, and strict adherence to formatting guidelines.' },
      { q: 'How do you handle plagiarism and AI detection?', a: 'We use official Turnitin instructor reports to check your work. If your similarity or AI scores are high, our human editors can restructure arguments and rephrase text at the root level to ensure academic integrity.' },
      { q: 'Do you write Statements of Purpose (SOPs) or CVs?', a: 'Yes, we craft tailored SOPs, academic CVs, and professional resumes designed to meet international standards for graduate admissions and competitive academic roles.' },
    ],
  },
  {
    category: 'Scholarships',
    items: [
      { q: 'What is the Scholarship Readiness Checker?', a: 'Our free Scholarship Readiness Checker evaluates your profile against the actual selection criteria for major programmes (like Chevening, Erasmus, and DAAD). It provides a personalized readiness score and an actionable preparation plan. You can access it at the Scholarship Hub.' },
      { q: 'Can you help me prepare my scholarship application?', a: 'Yes, we offer strategic guidance for scholarship applications, including refining your essays, aligning your narrative with the funding body\'s goals, and reviewing your application package.' },
    ],
  },
  {
    category: 'Repository / Research',
    items: [
      { q: 'What is the Research Repository?', a: 'The Cee Writing Research Repository is an open archive of past methodologies, academic findings, and project frameworks. It is designed to serve as a reference point and inspiration for your own academic work.' },
      { q: 'Can I access full research papers in the repository?', a: 'Yes, the repository hosts public summaries and full-text references for selected academic projects, allowing you to study real-world examples of rigorous academic writing.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]} />
        <p
          className="font-space"
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.6)', marginBottom: '32px',
          }}
        >
          Help Center
        </p>
        <h1
          className="font-space"
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.04,
            letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '32px',
          }}
        >
          Got <span style={{ color: '#C5A059' }}>Questions?</span><br />We have answers.
        </h1>
        <p
          className="font-inter"
          style={{
            fontSize: '18px', lineHeight: 1.8, color: '#888888', fontWeight: 300,
            maxWidth: '560px',
          }}
        >
          Everything you need to know before placing your order. Can't find what you're looking for? Message us on WhatsApp — we reply in minutes.
        </p>
      </section>

      {/* FAQ content */}
      <FAQClient faqs={ALL_FAQS} injectSchema={true} />

      {/* Bottom CTA */}
      <section
        style={{
          backgroundColor: '#111111',
          borderTop: '1px solid rgba(197,160,89,0.1)',
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
            <div style={{ flex: '1 1 400px' }}>
              <p className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '24px' }}>
                Still Need Help?
              </p>
              <h2
                className="font-space"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '16px' }}
              >
                Talk to us directly.<br />We reply in <span style={{ color: '#C5A059' }}>under 2 minutes.</span>
              </h2>
              <p className="font-inter" style={{ fontSize: '17px', lineHeight: 1.8, color: '#888888', fontWeight: 300 }}>
                Our team is online and ready. No bots, no ticket queues — just a real person who knows the answer.
              </p>
            </div>
            <div style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href="https://wa.me/2349056752549" target="_blank" rel="noreferrer"
                className="font-space"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '20px 40px', backgroundColor: '#C5A059', color: '#0A0A0A',
                  fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                WhatsApp Us Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <p className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555555', textAlign: 'center' }}>
                Free. No obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
