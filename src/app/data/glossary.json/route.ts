import { glossaryData } from '@/features/research/data/glossary';

export const dynamic = 'force-static';

export async function GET() {
  const terms = glossaryData.map((term) => ({ ...term, url: `https://ceewriting.com/research/glossary/${term.slug}` }));
  return Response.json({ publisher: 'Cee Writing', site: 'https://ceewriting.com', count: terms.length, terms });
}
