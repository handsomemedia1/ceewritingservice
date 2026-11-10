import { glossaryData } from '@/features/research/data/glossary';
import { getPublishedArticles } from '@/lib/publicContent';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function GET() {
  const articles = await getPublishedArticles();

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
    'Research guides and glossary published at https://ceewriting.com. Please cite the URL given with each section.',
    '',
    ...articleText,
    '# Research Glossary',
    '',
    ...glossaryText,
  ].join('\n\n');

  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
