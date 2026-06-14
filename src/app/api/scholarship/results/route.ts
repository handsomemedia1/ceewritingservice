import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
// We'll calculate the final results here or accept them from the client
import { calculateFinalScore } from '../../../scholarship-check/scoring';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, track, profile, answers, aiEvaluations } = body;
    
    const supabase = await createClient();

    // 1. Calculate final results using our scoring engine
    const results = calculateFinalScore(track, answers, aiEvaluations, profile);

    // 2. Save session to DB
    const sessionData = {
      lead_id: leadId,
      track: track,
      gate_passed: true, // Assuming they reached here
      final_score: results.finalScore,
      score_band: results.band,
      answers: answers,
      ai_scores: aiEvaluations,
      gaps: results.gaps,
      action_plan: results.actionPlan,
      report_sent: false
    };

    const { data, error } = await supabase
      .from('assessment_sessions')
      .insert([sessionData])
      .select('id')
      .single();

    if (error) {
      console.error("Error inserting session:", error);
      // We still return results so the user isn't blocked by DB error
      return NextResponse.json({ success: false, error: error.message, results });
    }

    // 3. Return the calculated results to the frontend
    return NextResponse.json({ success: true, sessionId: data.id, results });

  } catch (err) {
    console.error("Results API error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
