import { getPublishedArticles } from '@/lib/publicContent';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function GET() {
  const articles = await getPublishedArticles();
  return Response.json({ publisher: 'Cee Writing', site: 'https://ceewriting.com', count: articles.length, articles });
}
