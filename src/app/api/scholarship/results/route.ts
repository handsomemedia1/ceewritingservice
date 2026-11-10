import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { calculateFinalScore } from '../../../scholarship-check/scoring';
import { TRACK_WEIGHTS } from '../../../scholarship-check/constants';
import type { AIEvaluation, Answer, OnboardingProfile, TrackId } from '../../../scholarship-check/types';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_ANSWERS_BYTES = 200_000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTrackId(value: unknown): value is TrackId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(TRACK_WEIGHTS, value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, track, profile, answers } = body ?? {};
    const aiEvaluations = isPlainObject(body?.aiEvaluations) ? body.aiEvaluations : {};

    if (
      !isTrackId(track) ||
      !isPlainObject(profile) ||
      !isPlainObject(answers) ||
      JSON.stringify(answers).length + JSON.stringify(aiEvaluations).length > MAX_ANSWERS_BYTES
    ) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const results = calculateFinalScore(
      track,
      answers as Record<string, Answer>,
      aiEvaluations as Record<string, AIEvaluation>,
      profile as unknown as OnboardingProfile,
    );

    const supabase = createAdminClient();
    if (!supabase || typeof leadId !== 'string' || !UUID_PATTERN.test(leadId)) {
      // The score is still useful to the visitor even when it cannot be stored.
      return NextResponse.json({ success: false, results });
    }

    const { data, error } = await supabase
      .from('assessment_sessions')
      .insert([{
        lead_id: leadId,
        track,
        gate_passed: true,
        final_score: results.finalScore,
        score_band: results.band,
        answers,
        ai_scores: aiEvaluations,
        gaps: results.gaps,
        action_plan: results.actionPlan,
        report_sent: false,
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Error inserting session:', error);
      return NextResponse.json({ success: false, results });
    }

    return NextResponse.json({ success: true, sessionId: data.id, results });
  } catch (err) {
    console.error('Results API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
