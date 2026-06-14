import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackId, questionId, selfScore, textAnswer } = body;

    // Phase 1 Mock AI Evaluation Logic
    // Plausible mock AI evaluation
    const wordCount = textAnswer ? textAnswer.split(/\s+/).length : 0;
    
    // Simple heuristic: if text is short, penalize. If long, assume it's better.
    let aiScore = selfScore;
    if (wordCount < 100) {
      aiScore = Math.max(1, selfScore - 1);
    } else if (wordCount > 200 && selfScore < 4) {
      aiScore = Math.min(4, selfScore + 1);
    }

    const gap = aiScore - selfScore;
    let gapLabel = 'aligned';
    if (gap <= -2) gapLabel = 'overconfident';
    else if (gap >= 2) gapLabel = 'underconfident';

    // Return the required structure
    return NextResponse.json({
      ai_score: aiScore,
      self_score: selfScore,
      gap: gap,
      gap_label: gapLabel,
      strength: 'Identifies a relevant context.',
      weakness: gap < 0 ? 'Lacks specific, measurable outcomes.' : 'Fails to highlight key impact.',
      feedback: 'Incorporate more concrete metrics and name specific tools or organizations involved.',
      flag: Math.abs(gap) >= 2,
    });
    
  } catch (err) {
    console.error("Evaluate API error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
