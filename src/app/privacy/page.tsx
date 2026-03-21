import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cee Writing Service',
  description: 'How Cee Writing Service collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
  const sectionStyle = { marginBottom: '40px' };
  const headingStyle = {
    fontFamily: "'Playfair Display', serif", fontSize: '20px',
    fontWeight: 700 as const, color: 'var(--navy)', marginBottom: '16px',
  };
  const paraStyle = {
    fontSize: '15px', color: 'var(--text)', lineHeight: 1.85, marginBottom: '12px',
  };

  return (
    <main>
      <Navbar />
      <section style={{
        background: 'linear-gradient(160deg, #061428, #0B1F3A)',
        paddingTop: '160px', paddingBottom: '60px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 900, color: 'white', marginBottom: '16px',
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            Last updated: March 21, 2026
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>1. Introduction</h2>
            <p style={paraStyle}>
              Cee Writing Service (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of our clients, writers, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including CV writing, essay editing, plagiarism checking, AI humanizing, and other professional writing services.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>2. Information We Collect</h2>
            <p style={paraStyle}><strong>Personal Information:</strong> When you place an order, sign up, or contact us, we may collect your name, email address, phone number, and WhatsApp contact details.</p>
            <p style={paraStyle}><strong>Order Documents:</strong> We collect documents you upload for our services, such as CVs, essays, dissertations, statements of purpose, and any reference materials you provide.</p>
            <p style={paraStyle}><strong>Payment Information:</strong> We do not directly store payment card details. Payments are handled through third-party processors (bank transfers, WhatsApp-based invoicing).</p>
            <p style={paraStyle}><strong>Usage Data:</strong> We may collect anonymized data about how you interact with our website, including pages visited, time spent, and browser type, to improve user experience.</p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>3. How We Use Your Information</h2>
            <p style={paraStyle}>We use the information we collect to:</p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Deliver the writing, editing, or plagiarism services you ordered</li>
              <li style={{ marginBottom: '8px' }}>Communicate with you about your order via email or WhatsApp</li>
              <li style={{ marginBottom: '8px' }}>Assign your work to a qualified writer on our team</li>
              <li style={{ marginBottom: '8px' }}>Improve our website, content, and service offerings</li>
              <li style={{ marginBottom: '8px' }}>Send you updates about blog articles, free resources, or promotional offers (only if you opted in)</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>4. Document Confidentiality</h2>
            <p style={paraStyle}>
              All documents you submit (CVs, essays, SOPs, dissertations, etc.) are treated as strictly confidential. We do not share, publish, resell, or reuse your documents for any purpose other than fulfilling your specific order. Writers assigned to your project are contractually bound to maintain confidentiality.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>5. Data Sharing</h2>
            <p style={paraStyle}>We do not sell your personal data to third parties. We may share information only in the following cases:</p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>With our internal writing team, solely to complete your order</li>
              <li style={{ marginBottom: '8px' }}>With service providers who help us operate our platform (e.g., Supabase for data hosting)</li>
              <li style={{ marginBottom: '8px' }}>When required by law or to protect our legal rights</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>6. Data Security</h2>
            <p style={paraStyle}>
              We employ industry-standard security protocols to protect your data, including encrypted storage, row-level security policies, and secure file transfer. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>7. Cookies</h2>
            <p style={paraStyle}>
              Our website uses essential cookies for authentication and session management. We do not use tracking or advertising cookies. By using our site, you consent to the use of these essential cookies.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>8. Your Rights</h2>
            <p style={paraStyle}>You have the right to:</p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Request a copy of your personal data we hold</li>
              <li style={{ marginBottom: '8px' }}>Request correction or deletion of your personal information</li>
              <li style={{ marginBottom: '8px' }}>Withdraw consent for marketing communications at any time</li>
            </ul>
            <p style={paraStyle}>
              To exercise any of these rights, please contact us at <a href="mailto:ceewritingservices@gmail.com" style={{ color: 'var(--gold)', fontWeight: 600 }}>ceewritingservices@gmail.com</a>.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>9. Contact Us</h2>
            <p style={paraStyle}>
              If you have any questions about this Privacy Policy, please reach out to us:
            </p>
            <p style={paraStyle}>
              📧 Email: <a href="mailto:ceewritingservices@gmail.com" style={{ color: 'var(--gold)', fontWeight: 600 }}>ceewritingservices@gmail.com</a><br />
              💬 WhatsApp: <a href="https://wa.me/2349056752549" style={{ color: 'var(--gold)', fontWeight: 600 }}>+234 905 675 2549</a>
            </p>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
