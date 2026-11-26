import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DATA_FEEDS, getKnowledgeCatalog } from '@/lib/knowledge';
import { serializeJsonLd } from '@/lib/jsonLd';

export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Knowledge Catalog: Everything on Cee Writing',
  description: 'A complete index of Cee Writing: services and prices, policies, free tools, learning paths, research guides, glossary terms and FAQ, with machine-readable feeds.',
  alternates: { canonical: 'https://ceewriting.com/knowledge' },
};

function Block({ id, title, count, children }: { id: string; title: string; count?: number; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.08] pt-10" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="font-space text-2xl font-bold text-text-primary">
        {title} {count !== undefined && <span className="text-base font-medium text-text-muted">({count})</span>}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function KnowledgePage() {
  const k = await getKnowledgeCatalog();
  const glossaryByCategory = Object.entries(
    k.glossary.reduce<Record<string, typeof k.glossary>>((acc, term) => ((acc[term.category] ??= []).push(term), acc), {}),
  );
  const articlesByTopic = Object.entries(
    k.articles.reduce<Record<string, typeof k.articles>>((acc, a) => ((acc[a.topic] ??= []).push(a), acc), {}),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    '@id': 'https://ceewriting.com/knowledge#catalog',
    name: 'Cee Writing knowledge catalog',
    url: 'https://ceewriting.com/knowledge',
    description: metadata.description,
    publisher: { '@id': 'https://ceewriting.com/#organization' },
    inLanguage: 'en',
    dataset: DATA_FEEDS.map((feed) => ({
      '@type': 'Dataset',
      name: feed.name,
      description: feed.description,
      url: feed.url,
      creator: { '@id': 'https://ceewriting.com/#organization' },
      distribution: { '@type': 'DataDownload', encodingFormat: feed.format, contentUrl: feed.url },
    })),
  };

  const sections = [
    ['about', 'About'], ['services', 'Services and prices'], ['policies', 'Policies'], ['tools', 'Free tools'],
    ['paths', 'Learning paths'], ['articles', 'Guides'], ['glossary', 'Glossary'], ['faq', 'FAQ'], ['feeds', 'Machine-readable feeds'],
  ];

  return (
    <main className="min-h-screen bg-bg-main flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Navbar />

      <article className="mx-auto w-full max-w-5xl flex-1 px-5 pt-36 pb-20 sm:px-8 lg:pt-44">
        <p className="font-space text-xs font-bold uppercase tracking-[0.2em] text-gold">Knowledge catalog</p>
        <h1 className="mt-4 font-space text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">Everything on Cee Writing, in one place</h1>
        <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-text-muted">
          A complete, structured index of our services, prices, policies, free tools, research guides and glossary. It is
          written for people and for AI assistants alike, and every item links to its source page.
        </p>

        <nav aria-label="Catalog sections" className="mt-8 flex flex-wrap gap-2">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-gold/25 px-4 py-2 font-space text-sm font-semibold text-text-muted transition hover:border-gold hover:text-gold">{label}</a>
          ))}
        </nav>

        <div className="mt-12 space-y-12">
          <Block id="about" title="About">
            <dl className="grid gap-4 rounded-2xl border border-white/[0.06] bg-bg-card p-6 text-sm sm:grid-cols-[180px_1fr]">
              <dt className="font-bold text-gold">Organisation</dt><dd className="text-text-muted">{k.organization.name} ({k.organization.legalName})</dd>
              <dt className="font-bold text-gold">What we do</dt><dd className="text-text-muted">{k.organization.description}</dd>
              <dt className="font-bold text-gold">Based in</dt><dd className="text-text-muted">{k.organization.basedIn}; serving {k.organization.areaServed.join(', ')}</dd>
              <dt className="font-bold text-gold">Hours</dt><dd className="text-text-muted">{k.organization.hours}</dd>
              <dt className="font-bold text-gold">Contact</dt>
              <dd className="text-text-muted">
                <a href={`mailto:${k.organization.contact.email}`} className="text-gold underline">{k.organization.contact.email}</a> · WhatsApp {k.organization.contact.whatsapp} ·{' '}
                <Link href="/contact" className="text-gold underline">Contact page</Link>
              </dd>
              <dt className="font-bold text-gold">Prices</dt><dd className="text-text-muted">{k.organization.currency}</dd>
            </dl>
          </Block>

          <Block id="services" title="Services and prices" count={k.services.length}>
            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-bg-card text-gold">
                  <tr><th className="px-4 py-3 font-space">Service</th><th className="px-4 py-3 font-space">Category</th><th className="px-4 py-3 font-space">Price</th></tr>
                </thead>
                <tbody>
                  {k.services.map((s) => (
                    <tr key={s.url} className="border-t border-white/[0.06]">
                      <td className="px-4 py-3"><a href={s.url} className="text-text-primary hover:text-gold">{s.name}</a></td>
                      <td className="px-4 py-3 text-text-muted">{s.category}</td>
                      <td className="px-4 py-3 text-text-muted">{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <Block id="policies" title="Policies">
            <dl className="space-y-4">
              {k.policies.map((p) => (
                <div key={p.topic} className="rounded-xl border border-white/[0.06] bg-bg-card p-5">
                  <dt className="font-space font-bold text-text-primary">{p.topic}</dt>
                  <dd className="mt-1 text-text-muted">{p.summary} <a href={p.url} className="text-gold underline">Source</a></dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="tools" title="Free tools" count={k.tools.length}>
            <ul className="grid gap-3 md:grid-cols-2">
              {k.tools.map((t) => (
                <li key={t.url} className="rounded-xl border border-white/[0.06] bg-bg-card p-5">
                  <a href={t.url} className="font-space font-bold text-text-primary hover:text-gold">{t.name}</a>
                  <p className="mt-1 text-sm text-text-muted">{t.description}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="paths" title="Learning paths" count={k.learningPaths.length}>
            <ul className="space-y-4">
              {k.learningPaths.map((path) => (
                <li key={path.url} className="rounded-xl border border-white/[0.06] bg-bg-card p-5">
                  <a href={path.url} className="font-space text-lg font-bold text-text-primary hover:text-gold">{path.title}</a>
                  <p className="mt-1 text-sm text-text-muted">{path.description}</p>
                  <p className="mt-2 text-xs text-text-muted">{path.steps.length} steps · for {path.audience}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="articles" title="Guides" count={k.articles.length}>
            <div className="space-y-8">
              {articlesByTopic.map(([topic, list]) => (
                <div key={topic}>
                  <h3 className="font-space text-lg font-bold text-gold">{topic}</h3>
                  <ul className="mt-3 space-y-3">
                    {list.map((a) => (
                      <li key={a.url}>
                        <a href={a.url} className="font-medium text-text-primary hover:text-gold">{a.title}</a>
                        {a.summary && <p className="text-sm text-text-muted">{a.summary}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block id="glossary" title="Glossary" count={k.glossary.length}>
            <div className="space-y-6">
              {glossaryByCategory.map(([category, terms]) => (
                <div key={category}>
                  <h3 className="font-space text-lg font-bold text-gold">{category}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {terms.map((t) => (<li key={t.url}><a href={t.url} title={t.definition} className="text-text-muted hover:text-gold">{t.term}</a></li>))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block id="faq" title="Frequently asked questions" count={k.faq.length}>
            <div className="space-y-5">
              {k.faq.map((f) => (
                <div key={f.question} className="border-t border-white/[0.06] pt-4">
                  <h3 className="font-space font-bold text-text-primary">{f.question}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{f.answer}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="feeds" title="Machine-readable feeds">
            <p className="mb-4 text-text-muted">For search engines, AI assistants and developers. All feeds are public and refresh automatically.</p>
            <ul className="space-y-3">
              {k.feeds.map((f) => (
                <li key={f.url} className="rounded-xl border border-white/[0.06] bg-bg-card p-4">
                  <a href={f.url} className="font-mono text-sm text-gold underline">{f.url.replace('https://ceewriting.com', '')}</a>
                  <span className="ml-2 text-sm text-text-muted">{f.name}: {f.description}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </article>

      <Footer />
    </main>
  );
}
