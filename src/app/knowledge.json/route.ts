import { getKnowledgeCatalog } from '@/lib/knowledge';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function GET() {
  return Response.json(await getKnowledgeCatalog());
}
