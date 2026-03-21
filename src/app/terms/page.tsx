import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Cee Writing Service',
  description: 'Terms and conditions for using Cee Writing Service\'s professional writing, editing, and plagiarism services.',
};

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            Last updated: March 21, 2026
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>1. Acceptance of Terms</h2>
            <p style={paraStyle}>
              By accessing or using the Cee Writing Service website and placing an order for any of our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>2. Services Offered</h2>
            <p style={paraStyle}>
              Cee Writing Service provides professional writing, editing, proofreading, and related services including but not limited to:
            </p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Professional CV and Resume Writing</li>
              <li style={{ marginBottom: '8px' }}>Statement of Purpose (SOP) and Admission Essay Writing</li>
              <li style={{ marginBottom: '8px' }}>Cover Letter Writing</li>
              <li style={{ marginBottom: '8px' }}>LinkedIn Profile Optimization</li>
              <li style={{ marginBottom: '8px' }}>Plagiarism Checking and Reduction</li>
              <li style={{ marginBottom: '8px' }}>AI Content Humanizing</li>
              <li style={{ marginBottom: '8px' }}>Proofreading and Editing</li>
              <li style={{ marginBottom: '8px' }}>Scholarship Application Assistance</li>
            </ul>
            <p style={paraStyle}>
              All work produced is original and custom-made for each client. We do not provide pre-written or recycled content.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>3. Order Process</h2>
            <p style={paraStyle}>
              Orders can be placed through our website, via WhatsApp, or email. Upon placing an order, you agree to provide accurate and complete information regarding your requirements, deadlines, and any supporting documents. Incomplete information may lead to delays or results that do not fully match your expectations.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>4. Pricing and Payment</h2>
            <p style={paraStyle}>
              Service pricing is displayed on our website and is subject to change without prior notice. Payment is required before work commences unless otherwise agreed upon. We accept bank transfers and other payment methods as communicated during the order process.
            </p>
            <p style={paraStyle}>
              Custom or complex orders may be quoted separately based on scope, length, and urgency.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>5. Delivery and Deadlines</h2>
            <p style={paraStyle}>
              We strive to deliver all orders within the agreed timeframe. Standard delivery is typically 2–5 business days depending on the service type. Rush orders are available at an additional cost.
            </p>
            <p style={paraStyle}>
              While we make every effort to meet deadlines, delays caused by incomplete client information or force majeure events are not our responsibility.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>6. Revisions Policy</h2>
            <p style={paraStyle}>
              We offer reasonable revisions to ensure your satisfaction. Revision requests must be submitted within 7 days of delivery. Revisions are limited to the original scope of work — requests for entirely new content or significant changes to the brief may incur additional charges.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>7. Refund Policy</h2>
            <p style={paraStyle}>
              Refunds are handled on a case-by-case basis. A partial or full refund may be issued if:
            </p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>The order was not delivered within the agreed deadline (and no extension was communicated)</li>
              <li style={{ marginBottom: '8px' }}>The delivered work is fundamentally different from what was requested</li>
              <li style={{ marginBottom: '8px' }}>A duplicate payment was made in error</li>
            </ul>
            <p style={paraStyle}>
              Refund requests must be submitted within 14 days of delivery. No refunds will be issued after revisions have been accepted or the document has been submitted for its intended purpose.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>8. Intellectual Property</h2>
            <p style={paraStyle}>
              Upon full payment, all rights to the delivered work transfer to you, the client. You are free to use, modify, and distribute the work as your own. Cee Writing Service retains no ownership over completed and delivered orders.
            </p>
            <p style={paraStyle}>
              However, you may not resell, redistribute, or publicly attribute any work produced by Cee Writing Service as a commercial product.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>9. Client Responsibilities</h2>
            <p style={paraStyle}>By using our services, you agree to:</p>
            <ul style={{ ...paraStyle, paddingLeft: '24px' }}>
              <li style={{ marginBottom: '8px' }}>Provide truthful and accurate information about yourself and your requirements</li>
              <li style={{ marginBottom: '8px' }}>Use our services for lawful purposes only</li>
              <li style={{ marginBottom: '8px' }}>Not submit our work as part of any fraudulent activity</li>
              <li style={{ marginBottom: '8px' }}>Take responsibility for the final submission of documents to any institution or employer</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>10. Limitation of Liability</h2>
            <p style={paraStyle}>
              Cee Writing Service provides professional writing assistance. We do not guarantee specific outcomes such as job offers, university admissions, or scholarship awards. Our work is designed to maximize your chances, but the final decision lies with the reviewing institution or employer.
            </p>
            <p style={paraStyle}>
              We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>11. Confidentiality</h2>
            <p style={paraStyle}>
              All client information and documents are kept strictly confidential. We do not share, publish, or reuse any client materials. Our writers and team members are bound by confidentiality agreements.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>12. Changes to Terms</h2>
            <p style={paraStyle}>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>13. Contact Us</h2>
            <p style={paraStyle}>
              For questions about these Terms, please contact us:
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
