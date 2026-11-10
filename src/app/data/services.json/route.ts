import { getPublicServices } from '@/lib/publicContent';

export const dynamic = 'force-static';
export const revalidate = 1800;

export async function GET() {
  const services = await getPublicServices();
  return Response.json({ publisher: 'Cee Writing', site: 'https://ceewriting.com', count: services.length, services });
}
