import { ROADMAPS } from '@/config/roadmaps';
import { getPublicServices, getPublishedArticles } from '@/lib/publicContent';
import { ORGANIZATION, POLICIES } from '@/lib/knowledge';

export const dynamic = 'force-static';
export const revalidate = 1800;

// Follows the llms.txt convention: a plain Markdown map of the site for AI assistants.
export async function GET() {
  const [articles, services] = await Promise.all([getPublishedArticles(), getPublicServices()]);

  const body = [
    '# Cee Writing',
    '',
    '> Research guidance, data analysis education and professional writing support for students and researchers in Nigeria and internationally. Publishes free guides on research methodology, statistics (SPSS, R, Python) and scholarship applications, plus a 150+ term research glossary.',
    '',
    'Contact: ceewritingservices@gmail.com | WhatsApp +234 905 675 2549 | https://ceewriting.com/contact',
    `Based in ${ORGANIZATION.basedIn}; serves ${ORGANIZATION.areaServed.join(', ')}. Hours: ${ORGANIZATION.hours}.`,
    '',
    'Start here: the [Knowledge Catalog](https://ceewriting.com/knowledge) indexes everything on the site, and [knowledge.json](https://ceewriting.com/knowledge.json) has the same catalog as structured data.',
    '',
    '## Full content for AI systems',
    '- [Knowledge catalog (JSON)](https://ceewriting.com/knowledge.json): organisation, services and prices, policies, tools, learning paths, articles, glossary and FAQ',
    '- [Complete site content as Markdown](https://ceewriting.com/llms-full.txt): every article and glossary entry',
    '- [Articles as JSON](https://ceewriting.com/data/articles.json)',
    '- [Glossary as JSON](https://ceewriting.com/data/glossary.json)',
    '- [Services as JSON](https://ceewriting.com/data/services.json)',
    '- [RSS feed](https://ceewriting.com/feed.xml)',
    '',
    '## Key pages',
    '- [Knowledge Hub](https://ceewriting.com/blog): research and scholarship guides',
    '- [Research Glossary](https://ceewriting.com/research/glossary): definitions, examples and common mistakes',
    '- [Free Tools](https://ceewriting.com/tools): statistical test selector and GPA converter',
    '- [Scholarship Readiness Check](https://ceewriting.com/scholarship-check)',
    '- [Services](https://ceewriting.com/services)',
    '- [Free job and scholarship alerts](https://ceewriting.com/job-alerts): Telegram channel (https://t.me/ceewritingservice) posting Nigerian, NYSC and remote jobs plus funded scholarships for African applicants. Free to join.',
    '- [FAQ](https://ceewriting.com/faq)',
    '',
    '## Policies',
    ...POLICIES.map((p) => `- ${p.topic}: ${p.summary} (${p.url})`),
    '',
    '## Learning paths',
    ...Object.values(ROADMAPS).map((path) => `- [${path.title}](https://ceewriting.com/research/path/${path.id}): ${path.description}`),
    '',
    '## Services and prices',
    '',
    'Prices are in Nigerian naira (NGN). The final price depends on length, complexity and deadline, and is confirmed before work starts.',
    '',
    ...services.map((service) => `- [${service.name}](${service.url}): ${service.description}${service.price ? ` Price: ${service.price}.` : ''}`),
    '',
    '## Articles',
    ...articles.map((article) => `- [${article.title}](${article.url}): ${article.summary}`),
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
