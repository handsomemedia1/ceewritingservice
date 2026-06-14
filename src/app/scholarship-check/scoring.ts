/* ============================================================
   Scholarship Readiness Checker — Scoring Engine
   ============================================================ */

import type {
  TrackId, Answer, AIEvaluation, OnboardingProfile,
  CategoryScore, ScoreResult, GapItem, ActionItem, ActionPlan,
  CrossTrackScore, CalibrationEntry, EmploymentPeriod, Question,
  ScoreBand,
} from './types';
import {
  TRACK_WEIGHTS, AI_SCORE_TO_POINTS, TRACKS, TRACK_ORDER,
  scoreGPA, scoreLanguage, getBandForScore, CHEVENING_HOURS_THRESHOLD,
} from './constants';
import type { WeightDistribution } from './constants';
import { TRACK_QUESTIONS } from './questions';

// ───────────────────────────────────────────────────
// 1. Objective question scoring (0–100)
// ───────────────────────────────────────────────────

export function calculateObjectiveScore(
  questionId: string,
  answer: Answer,
  profile: OnboardingProfile,
): number {
  const val = answer.value as string;

  // GPA-type questions
  if (questionId.includes('-acad-1') || questionId === 'hs-acad-1') {
    if (answer.type === 'number' && typeof answer.value === 'number') {
      return scoreGPA(answer.value, profile.gpaScale);
    }
    // Degree classification select
    switch (val) {
      case 'first': return 100;
      case '2-1': return 80;
      case '2-2': return 50;
      case 'third': return 20;
      default: return 50;
    }
  }

  // Language questions
  if (questionId.includes('-lang-1')) {
    switch (val) {
      case 'ielts-7+': case '100+': return 100;
      case 'ielts-6.5': case '90-99': return 80;
      case 'ielts-6': case '80-89': return 60;
      case 'below': case 'below-80': return 20;
      case 'none': return 0;
      default: return scoreLanguage(profile.languageTest, profile.languageScore);
    }
  }

  // Work connection / field relevance
  if (val === 'strong' || val === 'direct' || val === 'confirmed' || val === 'all' || val === 'yes') return 100;
  if (val === 'moderate' || val === 'indirect' || val === 'related' || val === 'some' || val === 'checking' || val === 'partial') return 60;
  if (val === 'weak' || val === 'no' || val === 'none' || val === 'german' || val === 'different') return 20;

  // Numeric select patterns
  if (val === '3+' || val === '5+' || val === '3') return 100;
  if (val === '1-2' || val === '3-4') return 70;
  if (val === '0') return 10;

  // Boolean-ish
  if (val === 'yes') return 100;
  if (val === 'vaguely' || val === 'browsing' || val === 'some') return 50;
  if (val === 'no') return 10;

  // Fulbright-specific
  if (val === 'publications') return 100;
  if (val === 'conferences') return 80;
  if (val === 'research') return 60;
  if (val === 'extended') return 30;
  if (val === 'short') return 70;

  // Chevening experience
  if (val === 'none') return 100; // no undergrad work is ideal
  if (val === 'most') return 40;

  // Chevening academic extras
  if (val === 'both') return 100;
  if (val === 'masters') return 80;
  if (val === 'professional') return 70;

  // Fulbright PhD
  if (val === 'starting') return 50;
  if (val === 'masters' || val === 'na') return 60; // neutral — different track

  // 4-year degree
  if (val === 'unsure') return 50;

  return 50; // fallback
}

// ───────────────────────────────────────────────────
// 2. AI score → points mapping
// ───────────────────────────────────────────────────

export function mapAIScoreToPoints(aiScore: number): number {
  // Clamp to valid range
  const clamped = Math.max(1, Math.min(4, Math.round(aiScore)));
  return AI_SCORE_TO_POINTS[clamped] ?? 0;
}

// ───────────────────────────────────────────────────
// 3. Checklist scoring (% of items checked)
// ───────────────────────────────────────────────────

function calculateChecklistScore(answer: Answer, question: Question): number {
  if (!question.checklistItems || question.checklistItems.length === 0) return 0;
  const checked = answer.checklistChecked?.length ?? 0;
  return Math.round((checked / question.checklistItems.length) * 100);
}

// ───────────────────────────────────────────────────
// 4. Category score calculation
// ───────────────────────────────────────────────────

export function calculateCategoryScore(
  weightDist: WeightDistribution,
  answers: Record<string, Answer>,
  aiEvaluations: Record<string, AIEvaluation>,
  profile: OnboardingProfile,
  track: TrackId,
): CategoryScore {
  const trackSections = TRACK_QUESTIONS[track];
  const category = weightDist.category;

  // Collect all questions in this category
  const categoryQuestions: Question[] = [];
  for (const section of trackSections) {
    for (const q of section.questions) {
      if (q.section === category) {
        categoryQuestions.push(q);
      }
    }
  }

  if (categoryQuestions.length === 0) {
    return {
      category,
      weight: weightDist.weight,
      rawScore: 50,
      weightedScore: 50 * weightDist.weight,
      type: weightDist.type,
    };
  }

  let totalScore = 0;
  let scoredCount = 0;

  for (const q of categoryQuestions) {
    const answer = answers[q.id];
    if (!answer) continue;

    // Skip gate questions from scoring — they are pass/fail only
    if (q.type === 'gate' || q.type === 'country-route') continue;

    if (q.type === 'self-score-text') {
      // Use AI score when available, otherwise self-score
      const aiEval = aiEvaluations[q.id];
      if (aiEval) {
        totalScore += mapAIScoreToPoints(aiEval.ai_score);
      } else if (answer.selfScore) {
        totalScore += mapAIScoreToPoints(answer.selfScore);
      }
      scoredCount++;
    } else if (q.type === 'checklist') {
      totalScore += calculateChecklistScore(answer, q);
      scoredCount++;
    } else if (q.type === 'calculator') {
      // Chevening work calculator — scored separately
      // Score will be injected from calculateCheveningHours
      scoredCount++;
    } else {
      // objective, select, number
      totalScore += calculateObjectiveScore(q.id, answer, profile);
      scoredCount++;
    }
  }

  const rawScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 50;

  return {
    category,
    weight: weightDist.weight,
    rawScore,
    weightedScore: Math.round(rawScore * weightDist.weight),
    type: weightDist.type,
  };
}

// ───────────────────────────────────────────────────
// 5. Chevening work experience calculator
// ───────────────────────────────────────────────────

export function calculateCheveningHours(periods: EmploymentPeriod[]): {
  totalHours: number;
  validHours: number;
  undergradHoursExcluded: number;
} {
  let totalHours = 0;
  let undergradHours = 0;

  for (const p of periods) {
    const start = new Date(p.startDate + '-01');
    const end = new Date(p.endDate + '-01');

    // Calculate months
    const months = Math.max(0,
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) + 1,
    );

    // Approximate weeks (4.33 weeks per month)
    const weeks = months * 4.33;
    const hours = Math.round(weeks * p.hoursPerWeek);

    totalHours += hours;
    if (p.duringUndergrad) {
      undergradHours += hours;
    }
  }

  return {
    totalHours,
    validHours: totalHours, // Chevening counts all hours but flags undergrad
    undergradHoursExcluded: undergradHours,
  };
}

// ───────────────────────────────────────────────────
// 6. Gap analysis
// ───────────────────────────────────────────────────

export function generateGaps(
  categoryScores: CategoryScore[],
  track: TrackId,
): GapItem[] {
  const gaps: GapItem[] = [];
  const trackInfo = TRACKS[track];

  for (const cs of categoryScores) {
    if (cs.rawScore >= 75) continue; // No gap for strong categories

    const impact: GapItem['impact'] =
      cs.rawScore < 30 ? 'HIGH' :
      cs.rawScore < 50 ? 'MEDIUM' : 'LOW';

    let recommendation = '';
    let description = '';

    switch (cs.category) {
      case 'academic':
        description = 'Academic credentials may not meet the competitive threshold.';
        recommendation = cs.rawScore < 50
          ? 'Consider retaking language tests, pursuing additional qualifications, or targeting programmes with lower academic thresholds.'
          : 'Strengthen your academic narrative by highlighting relevant coursework, research, or awards.';
        break;
      case 'motivation':
        description = 'Development motivation narrative needs strengthening.';
        recommendation = 'Work with a mentor or advisor to craft specific, measurable examples of development impact. Avoid generic statements.';
        break;
      case 'experience':
        description = `Work experience may not fully meet ${trackInfo.name} requirements.`;
        recommendation = track === 'epos'
          ? 'Ensure you have 2+ years of PAID professional experience with official work certificates on letterhead.'
          : 'Document all work experience clearly, including volunteering and internships where applicable.';
        break;
      case 'leadership':
        description = 'Leadership examples may lack specificity or measurable outcomes.';
        recommendation = 'Develop 2–3 STAR-format stories (Situation, Task, Action, Result) with specific metrics and outcomes.';
        break;
      case 'career':
        description = 'Career plan needs more clarity and specificity.';
        recommendation = 'Create a clear 5-year roadmap showing current role → UK Masters → target role, with specific organisations and positions named.';
        break;
      case 'research':
        description = 'Research proposal needs development.';
        recommendation = 'Develop a clear research question, methodology, and US-specific justification. Identify specific professors or labs. Ensure 100% originality.';
        break;
      case 'programme':
        description = 'Programme selection or connection needs attention.';
        recommendation = 'Research specific programmes thoroughly. Match your profile to programme requirements and articulate why this programme specifically.';
        break;
      case 'documents':
        description = 'Key documents are missing or incomplete.';
        recommendation = 'Create a document checklist with deadlines. Prioritise the most time-consuming items (references, translations, certifications).';
        break;
      case 'language':
        description = 'Language certification may not meet requirements.';
        recommendation = 'Register for the required language test. Most programmes need IELTS 6.0–7.0 or TOEFL 80–100.';
        break;
      case 'university':
        description = 'University course selection is incomplete.';
        recommendation = 'Research and shortlist eligible programmes. Check entry requirements, deadlines, and language needs for each.';
        break;
      case 'priority':
        description = 'Field may not align with priority areas.';
        recommendation = 'While non-priority fields are funded, consider framing your research to highlight connections to priority themes.';
        break;
      case 'impact':
        description = 'Post-study impact narrative needs strengthening.';
        recommendation = 'Articulate specific plans for applying your research/knowledge upon return. Name organisations, roles, or initiatives.';
        break;
      case 'residency':
        description = 'EU residency status affects your scholarship category.';
        recommendation = 'Confirm your Partner/Programme Country status. Partner Country applicants receive higher funding.';
        break;
      default:
        description = `${cs.category} score is below the competitive threshold.`;
        recommendation = 'Review the specific requirements for this area and strengthen your application accordingly.';
    }

    gaps.push({ area: cs.category, impact, description, recommendation });
  }

  // Sort by impact: HIGH → MEDIUM → LOW
  const impactOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  gaps.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);

  return gaps;
}

// ───────────────────────────────────────────────────
// 7. Action plan generation
// ───────────────────────────────────────────────────

export function generateActionPlan(
  gaps: GapItem[],
  band: ScoreBand,
  track: TrackId,
): ActionPlan {
  const thirtyDays: ActionItem[] = [];
  const sixtyDays: ActionItem[] = [];
  const ninetyDays: ActionItem[] = [];

  // High-impact gaps → 30-day actions
  const highGaps = gaps.filter(g => g.impact === 'HIGH');
  const medGaps = gaps.filter(g => g.impact === 'MEDIUM');
  const lowGaps = gaps.filter(g => g.impact === 'LOW');

  for (const gap of highGaps) {
    thirtyDays.push({
      task: gap.recommendation,
      category: gap.area,
      priority: 'HIGH',
    });
  }

  for (const gap of medGaps) {
    sixtyDays.push({
      task: gap.recommendation,
      category: gap.area,
      priority: 'MEDIUM',
    });
  }

  for (const gap of lowGaps) {
    ninetyDays.push({
      task: gap.recommendation,
      category: gap.area,
      priority: 'LOW',
    });
  }

  // Add track-specific actions based on band
  if (band === 'green') {
    thirtyDays.push({
      task: `Polish your application materials and set deadline reminders for ${TRACKS[track].applicationWindow}.`,
      category: 'general',
      priority: 'MEDIUM',
    });
  } else if (band === 'yellow') {
    thirtyDays.push({
      task: 'Address the top 2 gaps identified above before the application window opens.',
      category: 'general',
      priority: 'HIGH',
    });
  } else if (band === 'orange') {
    thirtyDays.push({
      task: 'Focus on the highest-impact gaps. Consider whether an alternative track may be a better fit for this cycle.',
      category: 'general',
      priority: 'HIGH',
    });
    ninetyDays.push({
      task: 'If gaps remain significant, target the next application cycle with a 6-month preparation plan.',
      category: 'general',
      priority: 'MEDIUM',
    });
  } else if (band === 'red') {
    thirtyDays.push({
      task: 'Review the cross-track scores below — a different scholarship may be a stronger fit right now.',
      category: 'general',
      priority: 'HIGH',
    });
    sixtyDays.push({
      task: 'Build a 6-month roadmap addressing the fundamental gaps identified.',
      category: 'general',
      priority: 'HIGH',
    });
    ninetyDays.push({
      task: 'Reassess readiness and consider applying in the next cycle.',
      category: 'general',
      priority: 'MEDIUM',
    });
  }

  return { thirtyDays, sixtyDays, ninetyDays };
}

// ───────────────────────────────────────────────────
// 8. Cross-track estimates
// ───────────────────────────────────────────────────

export function generateCrossTrackEstimates(
  profile: OnboardingProfile,
  answers: Record<string, Answer>,
  assessedTrack?: TrackId,
  assessedScore?: number,
): CrossTrackScore[] {
  return TRACK_ORDER.map(trackId => {
    const isAssessed = trackId === assessedTrack;

    if (isAssessed && assessedScore !== undefined) {
      const bandInfo = getBandForScore(assessedScore);
      return {
        track: trackId,
        trackName: TRACKS[trackId].name,
        estimatedScore: assessedScore,
        band: bandInfo.band,
        isAssessed: true,
      };
    }

    // Estimate based on profile data
    let estimate = 50; // baseline
    const weights = TRACK_WEIGHTS[trackId];

    for (const w of weights) {
      let categoryEstimate = 50;

      switch (w.category) {
        case 'academic':
          categoryEstimate = scoreGPA(profile.gpaValue, profile.gpaScale);
          break;
        case 'language':
          categoryEstimate = scoreLanguage(profile.languageTest, profile.languageScore);
          break;
        case 'experience':
          if (trackId === 'epos') {
            categoryEstimate = (profile.yearsExperience ?? 0) >= 2 ? 70 : 20;
          } else {
            categoryEstimate = (profile.yearsExperience ?? 0) >= 1 ? 60 : 30;
          }
          break;
        default:
          categoryEstimate = 50; // Can't estimate AI-scored categories
      }

      estimate += (categoryEstimate - 50) * w.weight;
    }

    estimate = Math.max(0, Math.min(100, Math.round(estimate)));
    const bandInfo = getBandForScore(estimate);

    return {
      track: trackId,
      trackName: TRACKS[trackId].name,
      estimatedScore: estimate,
      band: bandInfo.band,
      isAssessed: false,
    };
  });
}

// ───────────────────────────────────────────────────
// 9. Strength identification
// ───────────────────────────────────────────────────

export function generateStrengths(categoryScores: CategoryScore[]): string[] {
  // Sort by raw score descending, take top 3
  const sorted = [...categoryScores].sort((a, b) => b.rawScore - a.rawScore);
  const strengths: string[] = [];

  const categoryLabels: Record<string, string> = {
    academic: 'Strong academic credentials',
    motivation: 'Compelling development motivation',
    experience: 'Solid professional experience',
    leadership: 'Demonstrated leadership ability',
    career: 'Clear career plan',
    research: 'Well-developed research proposal',
    programme: 'Good programme alignment',
    documents: 'Document preparation on track',
    language: 'Language requirements met',
    university: 'University choices identified',
    priority: 'Field aligns with priority areas',
    impact: 'Strong post-study impact narrative',
    residency: 'Favourable residency status',
  };

  for (const cs of sorted.slice(0, 3)) {
    if (cs.rawScore >= 50) {
      const label = categoryLabels[cs.category] ?? `Strong ${cs.category} profile`;
      const qualifier = cs.rawScore >= 80 ? ' — excellent' : cs.rawScore >= 65 ? ' — good' : '';
      strengths.push(`${label}${qualifier}`);
    }
  }

  if (strengths.length === 0) {
    strengths.push('Assessment completed — review gaps for improvement areas');
  }

  return strengths;
}

// ───────────────────────────────────────────────────
// 10. Calibration entries (self vs AI)
// ───────────────────────────────────────────────────

export function generateCalibrationEntries(
  answers: Record<string, Answer>,
  aiEvaluations: Record<string, AIEvaluation>,
  questions: Question[],
): CalibrationEntry[] {
  const entries: CalibrationEntry[] = [];

  for (const q of questions) {
    if (q.type !== 'self-score-text') continue;

    const answer = answers[q.id];
    const aiEval = aiEvaluations[q.id];

    if (!answer || !aiEval) continue;

    const selfScore = answer.selfScore ?? 0;
    const aiScore = aiEval.ai_score;
    const gap = aiScore - selfScore;

    let meaning = '';
    if (Math.abs(gap) <= 0.5) {
      meaning = 'Aligned — your self-assessment matches the AI evaluation.';
    } else if (gap > 0) {
      meaning = 'Underconfident — you rated yourself lower than the AI assessment. Your response is stronger than you think.';
    } else {
      meaning = 'Overconfident — you rated yourself higher than the AI assessment. Consider strengthening this area.';
    }

    entries.push({
      questionId: q.id,
      questionText: q.text,
      selfScore,
      aiScore,
      gap,
      meaning,
    });
  }

  return entries;
}

// ───────────────────────────────────────────────────
// 11. Final score calculation
// ───────────────────────────────────────────────────

export function calculateFinalScore(
  track: TrackId,
  answers: Record<string, Answer>,
  aiEvaluations: Record<string, AIEvaluation>,
  profile: OnboardingProfile,
): ScoreResult {
  const weights = TRACK_WEIGHTS[track];

  // Calculate each category score
  const categoryScores = weights.map(w =>
    calculateCategoryScore(w, answers, aiEvaluations, profile, track),
  );

  // Final weighted score
  const finalScore = Math.min(100, Math.max(0,
    categoryScores.reduce((sum, cs) => sum + cs.weightedScore, 0),
  ));

  const bandInfo = getBandForScore(finalScore);

  // Get all questions for calibration
  const allQuestions = TRACK_QUESTIONS[track].flatMap(s => s.questions);

  // Generate all supporting data
  const gaps = generateGaps(categoryScores, track);
  const strengths = generateStrengths(categoryScores);
  const calibrationEntries = generateCalibrationEntries(answers, aiEvaluations, allQuestions);
  const crossTrackScores = generateCrossTrackEstimates(profile, answers, track, finalScore);
  const actionPlan = generateActionPlan(gaps, bandInfo.band, track);

  return {
    track,
    finalScore,
    band: bandInfo.band,
    bandInfo,
    categoryScores,
    strengths,
    gaps,
    calibrationEntries,
    crossTrackScores,
    actionPlan,
  };
}
