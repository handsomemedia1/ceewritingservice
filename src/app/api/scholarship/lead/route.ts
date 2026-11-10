import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function numberInRange(value: unknown, min: number, max: number): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max
    ? value
    : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = text(body?.email, 254)?.toLowerCase() ?? null;
    const fullName = text(body?.fullName, 200);

    if (!email || !EMAIL_PATTERN.test(email) || !fullName || body?.consent !== true) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (!supabase) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const leadData = {
      full_name: fullName,
      email,
      phone: text(body.phone, 40),
      country: text(body.country, 100),
      highest_degree: text(body.highestDegree, 100),
      field_of_study: text(body.fieldOfStudy, 200),
      graduation_year: numberInRange(body.graduationYear, 1950, 2100),
      institution: text(body.institution, 200),
      gpa_value: numberInRange(body.gpaValue, 0, 100),
      gpa_scale: text(body.gpaScale, 20),
      language_test: text(body.languageTest, 40),
      language_score: numberInRange(body.languageScore, 0, 1000),
      years_experience: numberInRange(body.yearsExperience, 0, 80),
      consent: true,
    };

    const { data, error } = await supabase
      .from('scholarship_leads')
      .insert(leadData)
      .select('id')
      .single();

    if (!error) {
      return NextResponse.json({ success: true, leadId: data.id });
    }

    // Unauthenticated callers must never overwrite an existing person's record.
    if (error.code === '23505') {
      const { data: existing } = await supabase
        .from('scholarship_leads')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ success: true, leadId: existing.id });
      }
    }

    console.error('Error inserting lead:', error);
    return NextResponse.json({ error: 'Could not save your details' }, { status: 500 });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
