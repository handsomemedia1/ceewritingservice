import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Try to get country from Vercel headers first (fastest and most reliable in prod)
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    return NextResponse.json({ country: vercelCountry });
  }

  // Fallback for local development or non-Vercel environments
  try {
    const res = await fetch('https://ipapi.co/json/', { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data && data.country_code) {
      return NextResponse.json({ country: data.country_code });
    }
  } catch (error) {
    console.error('Geo fallback error:', error);
  }

  // Default to NG if all fails
  return NextResponse.json({ country: 'NG' });
}
