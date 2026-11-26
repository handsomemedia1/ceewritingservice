import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import { COOKIES, NDPC_URL, PRIVACY_CONTACT_EMAIL, PRIVACY_LAST_UPDATED, PROCESSING, PROCESSORS, RIGHTS } from '@/config/privacy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cee Writing',
  description: 'How Cee Writing collects, uses and protects personal data under the Nigeria Data Protection Act 2023, and how to exercise your rights.',
  alternates: { canonical: 'https://ceewriting.com/privacy' },
};

const SECTIONS = [
  ['who-we-are', 'Who we are'],
  ['what-we-collect', 'What we collect and why'],
  ['cookies', 'Cookies and similar technologies'],
  ['sharing', 'Who we share data with'],
  ['transfers', 'International transfers'],
  ['security', 'How we protect your data'],
  ['your-rights', 'Your rights'],
  ['children', 'Children'],
  ['breaches', 'Data breaches'],
  ['changes', 'Changes to this policy'],
  ['contact', 'Contact and complaints'],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.08] pt-10">
      <h2 className="font-space text-2xl font-bold text-text-primary">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <Navbar />

      <article className="mx-auto w-full max-w-4xl flex-1 px-5 pt-36 pb-20 sm:px-8 lg:pt-44">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">Legal</p>
        <h1 className="mt-4 font-space text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-text-muted">Last updated: {PRIVACY_LAST_UPDATED}</p>
        <p className="mt-6 text-lg font-light leading-relaxed text-text-muted">
          This policy explains how Cee Writing collects, uses, shares and protects personal data, in line with the
          Nigeria Data Protection Act 2023 (NDPA), the Nigeria Data Protection Regulation 2019 (NDPR) and the NDPC&apos;s
          General Application and Implementation Directive. It also explains your rights and how to use them.
        </p>

        <nav aria-label="Contents" className="mt-10 rounded-2xl border border-gold/15 bg-bg-card p-6">
          <p className="font-space text-sm font-bold uppercase tracking-wider text-gold">Contents</p>
          <ol className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {SECTIONS.map(([id, title], index) => (
              <li key={id}><a href={`#${id}`} className="text-text-muted hover:text-gold">{index + 1}. {title}</a></li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12">
          <Section id="who-we-are" title="1. Who we are">
            <p>
              Cee Writing (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides research support, data analysis, professional writing
              and scholarship guidance from Nigeria, at <Link href="/" className="text-gold underline">ceewriting.com</Link>.
              We are the data controller for the personal data described here.
            </p>
            <p>
              For any privacy question or request, contact our data protection contact at{' '}
              <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className="text-gold underline">{PRIVACY_CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section id="what-we-collect" title="2. What we collect and why">
            <p>We collect only what we need for each purpose, and we tell you the legal basis we rely on.</p>
            <div className="space-y-4">
              {PROCESSING.map((item) => (
                <div key={item.activity} className="rounded-xl border border-white/[0.06] bg-bg-card p-5">
                  <h3 className="font-space text-lg font-bold text-text-primary">{item.activity}</h3>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-[140px_1fr]">
                    <dt className="font-bold text-gold">Data</dt><dd>{item.data}</dd>
                    <dt className="font-bold text-gold">Purpose</dt><dd>{item.purpose}</dd>
                    <dt className="font-bold text-gold">Legal basis</dt><dd>{item.lawfulBasis}</dd>
                    <dt className="font-bold text-gold">Kept for</dt><dd>{item.retention}</dd>
                  </dl>
                </div>
              ))}
            </div>
            <p>We do not sell personal data, and we do not use it for any purpose that is incompatible with the reason we collected it.</p>
          </Section>

          <Section id="cookies" title="3. Cookies and similar technologies">
            <p>
              Essential storage is always on because the site needs it. Analytics and advertising cookies are only used if you
              agree, and nothing from Google loads before you do. You can change your choice at any time:{' '}
              <CookieSettingsButton className="text-gold underline" />.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-bg-card text-gold">
                  <tr>{['Name', 'Provider', 'Purpose', 'Duration', 'Type'].map((h) => <th key={h} className="px-4 py-3 font-space font-bold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {COOKIES.map((cookie) => (
                    <tr key={cookie.name} className="border-t border-white/[0.06]">
                      <td className="px-4 py-3 font-mono text-xs text-text-primary">{cookie.name}</td>
                      <td className="px-4 py-3">{cookie.provider}</td>
                      <td className="px-4 py-3">{cookie.purpose}</td>
                      <td className="px-4 py-3">{cookie.duration}</td>
                      <td className="px-4 py-3">{cookie.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>If your browser sends a Global Privacy Control signal, we treat it as a refusal of analytics and advertising cookies.</p>
          </Section>

          <Section id="sharing" title="4. Who we share data with">
            <p>
              We share personal data only with service providers that process it on our behalf under written terms, and only
              as far as needed. We may also disclose data where the law requires it.
            </p>
            <ul className="space-y-2">
              {PROCESSORS.map((p) => (
                <li key={p.name}><strong className="text-text-primary">{p.name}</strong>: {p.role}. Location: {p.location}.</li>
              ))}
            </ul>
            <p>Writers working on your order see only the details and documents needed for that order, and are bound by confidentiality.</p>
          </Section>

          <Section id="transfers" title="5. International transfers">
            <p>
              Some of our providers store or process data outside Nigeria. Under Part VIII of the NDPA we only transfer personal
              data abroad where the destination provides an adequate level of protection, or where appropriate safeguards are in
              place, such as the provider&apos;s data processing terms and standard contractual clauses, or where another lawful
              basis in section 43 applies.
            </p>
          </Section>

          <Section id="security" title="6. How we protect your data">
            <p>
              We use encrypted connections (HTTPS), access controls so staff and writers see only what their role requires,
              database row-level security, private storage for client documents with short-lived download links, and security
              reviews of our code and dependencies. No system is perfectly secure, so please contact us immediately if you
              suspect a problem.
            </p>
          </Section>

          <Section id="your-rights" title="7. Your rights">
            <p>Under the NDPA you have the right to:</p>
            <ul className="space-y-3">
              {RIGHTS.map((r) => (<li key={r.right}><strong className="text-text-primary">{r.right}.</strong> {r.detail}</li>))}
            </ul>
            <p>
              To use any of these rights, see <Link href="/data-requests" className="text-gold underline">Your Data Rights</Link>.
              We respond within 30 days, and requests are free unless they are manifestly unfounded or excessive.
            </p>
          </Section>

          <Section id="children" title="8. Children">
            <p>
              Our services are intended for adults. We do not knowingly collect personal data from anyone under 18 without the
              consent of a parent or guardian, as the NDPA requires. If you believe a child has given us data, contact us and we
              will delete it.
            </p>
          </Section>

          <Section id="breaches" title="9. Data breaches">
            <p>
              If a breach of personal data is likely to put your rights at risk, we will notify the Nigeria Data Protection
              Commission within 72 hours of becoming aware of it, and tell you without undue delay where the risk to you is high.
            </p>
          </Section>

          <Section id="changes" title="10. Changes to this policy">
            <p>
              We update this policy when our practices or the law change. The date at the top shows the latest version. If a
              change affects how we use data you gave us with consent, we will ask for your consent again.
            </p>
          </Section>

          <Section id="contact" title="11. Contact and complaints">
            <p>
              Email <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`} className="text-gold underline">{PRIVACY_CONTACT_EMAIL}</a> or
              use our <Link href="/contact" className="text-gold underline">contact page</Link>. If you are not satisfied with our
              response, you can complain to the Nigeria Data Protection Commission at{' '}
              <a href={NDPC_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline">ndpc.gov.ng</a>.
            </p>
          </Section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
