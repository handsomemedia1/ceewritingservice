import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Mapping camelCase from frontend to snake_case for Supabase
    const leadData = {
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      highest_degree: body.highestDegree,
      field_of_study: body.fieldOfStudy,
      graduation_year: body.graduationYear,
      institution: body.institution,
      gpa_value: body.gpaValue,
      gpa_scale: body.gpaScale,
      language_test: body.languageTest,
      language_score: body.languageScore,
      years_experience: body.yearsExperience,
      consent: body.consent,
    };

    // Upsert on email (if lead exists, we can just update or use existing ID)
    // Note: requires unique constraint on email in scholarship_leads
    const { data, error } = await supabase
      .from('scholarship_leads')
      .upsert(leadData, { onConflict: 'email' })
      .select('id')
      .single();

    if (error) {
      console.error("Error inserting lead:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leadId: data.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
