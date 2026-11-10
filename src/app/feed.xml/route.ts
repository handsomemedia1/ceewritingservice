import { getPublishedArticles } from '@/lib/publicContent';

export const dynamic = 'force-static';
export const revalidate = 1800;

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const articles = await getPublishedArticles();

  const items = articles.slice(0, 50).map((article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${article.url}</link>
      <guid isPermaLink="true">${article.url}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
${article.topics.map((topic) => `      <category>${escapeXml(topic)}</category>`).join('\n')}
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cee Writing Knowledge Hub</title>
    <link>https://ceewriting.com/blog</link>
    <description>Guides on research methodology, data analysis and scholarship applications.</description>
    <language>en</language>
    <atom:link href="https://ceewriting.com/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
