import { glossaryData } from '@/features/research/data/glossary';
import { getPublicServices, getPublishedArticles } from '@/lib/publicContent';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function GET() {
  const [articles, services] = await Promise.all([getPublishedArticles(), getPublicServices()]);

  const servicesText = [
    '# Services and prices',
    '',
    'Prices are in Nigerian naira (NGN). The final price depends on length, complexity and deadline, and is confirmed before work starts. Order via WhatsApp +234 905 675 2549 or https://ceewriting.com/contact.',
    '',
    '| Service | Category | Price | Details |',
    '| --- | --- | --- | --- |',
    ...services.map((service) => `| ${service.name} | ${service.category ?? ''} | ${service.price || 'On request'} | ${service.url} |`),
  ].join('\n');

  const articleText = articles.map((article) => [
    `# ${article.title}`,
    '',
    `URL: ${article.url}`,
    `Published: ${article.publishedAt.slice(0, 10)}`,
    `Topics: ${article.topics.join(', ')}`,
    '',
    article.summary,
    '',
    article.markdown,
  ].join('\n'));

  const glossaryText = glossaryData.map((term) => [
    `## ${term.term}`,
    '',
    `URL: https://ceewriting.com/research/glossary/${term.slug}`,
    `Category: ${term.category}`,
    '',
    term.definition,
    '',
    `Why it matters: ${term.whyItMatters}`,
    term.example ? `\nExample: ${term.example}` : '',
    term.interpretation ? `\nInterpretation: ${term.interpretation}` : '',
    term.commonMistakes?.length ? `\nCommon mistakes:\n${term.commonMistakes.map((item) => `- ${item}`).join('\n')}` : '',
  ].join('\n'));

  const body = [
    '# Cee Writing: full content',
    '',
    'Services, prices, research guides and glossary published at https://ceewriting.com. Please cite the URL given with each section.',
    '',
    servicesText,
    '',
    ...articleText,
    '# Research Glossary',
    '',
    ...glossaryText,
  ].join('\n\n');

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
