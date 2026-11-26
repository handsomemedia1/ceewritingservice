import { ROADMAPS } from '@/config/roadmaps';
import { FAQ_SECTIONS } from '@/config/faq';
import { displayTopic } from '@/config/articleTopics';
import { PRIVACY_CONTACT_EMAIL, PRIVACY_LAST_UPDATED, RIGHTS } from '@/config/privacy';
import { glossaryData } from '@/features/research/data/glossary';
import { getPublicServices, getPublishedArticles } from '@/lib/publicContent';

const SITE = 'https://ceewriting.com';

/** Stable facts about the organisation, stated once for every AI-facing surface. */
export const ORGANIZATION = {
  name: 'Cee Writing',
  legalName: 'Cee Writing Service',
  alternateNames: ['Cee Writing Service', 'Cee Writing Hub'],
  url: SITE,
  description:
    'Research support, data analysis, professional writing and scholarship guidance for students, researchers and professionals in Nigeria and internationally. Publishes free research guides, a research glossary and free academic tools.',
  basedIn: 'Nigeria',
  areaServed: ['Nigeria', 'United Kingdom', 'United States', 'Canada', 'United Arab Emirates', 'Kuwait'],
  contact: {
    email: PRIVACY_CONTACT_EMAIL,
    whatsapp: '+234 905 675 2549',
    whatsappUrl: 'https://wa.me/2349056752549',
    telegramChannel: 'https://t.me/ceewritingservice',
    contactPage: `${SITE}/contact`,
  },
  hours: 'Monday to Sunday, 08:00 to 22:00 West Africa Time',
  currency: 'Prices are listed in Nigerian naira (NGN); international visitors see converted estimates.',
};

/** Customer-facing policies, summarised from the Terms of Service and Privacy Policy. */
export const POLICIES = [
  { topic: 'Ordering', summary: 'Orders are placed through the website, WhatsApp or email. Payment is usually required before work starts; custom or complex orders are quoted separately.', url: `${SITE}/terms` },
  { topic: 'Delivery', summary: 'Standard delivery is typically 2 to 5 business days depending on the service. Rush delivery is available at extra cost.', url: `${SITE}/terms` },
  { topic: 'Revisions', summary: 'Reasonable revisions within the original scope are included if requested within 7 days of delivery.', url: `${SITE}/terms` },
  { topic: 'Refunds', summary: 'Refunds are considered case by case, for example for a missed deadline, work fundamentally different from the brief, or a duplicate payment. Requests must be made within 14 days of delivery.', url: `${SITE}/terms` },
  { topic: 'Confidentiality', summary: 'Client documents are kept confidential, stored privately and shared only with the writer assigned to the order.', url: `${SITE}/privacy` },
  { topic: 'Privacy', summary: `Personal data is handled under the Nigeria Data Protection Act 2023. Analytics and advertising cookies run only with consent. Data rights requests are answered within 30 days. Policy last updated ${PRIVACY_LAST_UPDATED}.`, url: `${SITE}/privacy` },
];

export const TOOLS = [
  { name: 'Statistical Test Selector', url: `${SITE}/tools/statistical-test-selector`, description: 'Answer three questions about groups, measurement level and study design to get a suitable statistical test, including non-parametric options, with its assumptions.' },
  { name: 'Nigerian CGPA Converter', url: `${SITE}/tools/gpa-calculator`, description: 'Convert a Nigerian 5.0 CGPA to an estimated US 4.0 GPA and see the Nigerian degree classification.' },
  { name: 'Scholarship Readiness Check', url: `${SITE}/scholarship-check`, description: 'Assess readiness for DAAD Helmut-Schmidt, DAAD EPOS, Erasmus Mundus, Chevening and Fulbright, with a personalised action plan.' },
  { name: 'Job and Scholarship Alerts', url: `${SITE}/job-alerts`, description: 'Free Telegram channel posting Nigerian, NYSC and remote jobs plus funded scholarships for African applicants.' },
];

export const DATA_FEEDS = [
  { name: 'Knowledge catalog (JSON)', url: `${SITE}/knowledge.json`, format: 'application/json', description: 'This catalog: organisation, services and prices, policies, tools, learning paths, articles, glossary and FAQ.' },
  { name: 'Full content (Markdown)', url: `${SITE}/llms-full.txt`, format: 'text/markdown', description: 'Every article and glossary entry in full.' },
  { name: 'Site guide for AI (Markdown)', url: `${SITE}/llms.txt`, format: 'text/markdown', description: 'A short map of the site.' },
  { name: 'Articles (JSON)', url: `${SITE}/data/articles.json`, format: 'application/json', description: 'Every published article with its full text in Markdown.' },
  { name: 'Glossary (JSON)', url: `${SITE}/data/glossary.json`, format: 'application/json', description: 'All research and statistics glossary entries.' },
  { name: 'Services (JSON)', url: `${SITE}/data/services.json`, format: 'application/json', description: 'Every service with its price.' },
  { name: 'RSS feed', url: `${SITE}/feed.xml`, format: 'application/rss+xml', description: 'Latest articles.' },
];

/** The whole catalog, assembled from the live content sources. */
export async function getKnowledgeCatalog() {
  const [articles, services] = await Promise.all([getPublishedArticles(), getPublicServices()]);

  return {
    catalog: 'Cee Writing knowledge catalog',
    description: 'A structured index of everything published on ceewriting.com, for search engines and AI assistants. Please cite the URL given with each item.',
    generatedAt: new Date().toISOString(),
    license: 'Content is © Cee Writing. Quoting with attribution and a link to the source URL is welcome.',
    organization: ORGANIZATION,
    policies: POLICIES,
    services: services.map((s) => ({ name: s.name, url: s.url, category: s.category, description: s.description, price: s.price || 'On request', priceFrom: s.priceFrom, priceTo: s.priceTo, priceUnit: s.priceUnit, currency: s.currency })),
    tools: TOOLS,
    learningPaths: Object.values(ROADMAPS).map((path) => ({
      title: path.title,
      url: `${SITE}/research/path/${path.id}`,
      audience: path.audience,
      description: path.description,
      steps: path.steps.map((step) => ({ step: step.step, url: `${SITE}/blog/${step.slug}`, summary: step.short_description })),
    })),
    articles: articles.map((a) => ({ title: a.title, url: a.url, topic: displayTopic(a.topics), summary: a.summary, published: a.publishedAt.slice(0, 10), words: a.wordCount })),
    glossary: glossaryData.map((t) => ({ term: t.term, url: `${SITE}/research/glossary/${t.slug}`, category: t.category, definition: t.shortDefinition })),
    faq: FAQ_SECTIONS.flatMap((section) => section.items.map((item) => ({ category: section.category, question: item.q, answer: item.a }))),
    dataRights: RIGHTS.map((r) => r.right),
    feeds: DATA_FEEDS,
  };
}

export type KnowledgeCatalog = Awaited<ReturnType<typeof getKnowledgeCatalog>>;
