import { TRACK_QUESTIONS } from '@/app/scholarship-check/questions';
import { calculateFinalScore } from '@/app/scholarship-check/scoring';
import type {
  Answer,
  EmploymentPeriod,
  OnboardingProfile,
  Question,
  ScoreResult,
  TrackId,
} from '@/app/scholarship-check/types';

/** Raw answers as the one-question-at-a-time form stores them in localStorage. */
export type RawAnswers = Record<string, unknown>;

export function trackQuestions(track: TrackId): Question[] {
  return (TRACK_QUESTIONS[track] ?? []).flatMap((s) => s.questions);
}

/** Converts the form's raw answers into the Answer records the scoring engine expects. */
export function toEngineAnswers(track: TrackId, raw: RawAnswers): Record<string, Answer> {
  const out: Record<string, Answer> = {};
  for (const q of trackQuestions(track)) {
    const value = raw[q.id];
    if (value === undefined || value === null || value === '') continue;

    const base = { questionId: q.id, type: q.type };
    switch (q.type) {
      case 'number': {
        const n = Number(value);
        if (Number.isFinite(n)) out[q.id] = { ...base, value: n };
        break;
      }
      case 'self-score-text': {
        const score = Number(raw[`${q.id}_score`]);
        out[q.id] = {
          ...base,
          textAnswer: String(value),
          selfScore: Number.isFinite(score) ? score : undefined,
        };
        break;
      }
      case 'checklist':
        out[q.id] = { ...base, checklistChecked: Array.isArray(value) ? value.map(String) : [] };
        break;
      case 'calculator':
        out[q.id] = { ...base, employmentPeriods: Array.isArray(value) ? (value as EmploymentPeriod[]) : [] };
        break;
      default:
        out[q.id] = { ...base, value: String(value) };
    }
  }
  return out;
}

/** Eligibility gates the visitor answered "no" to. */
export function failedGates(track: TrackId, raw: RawAnswers): Question[] {
  return trackQuestions(track).filter((q) => q.type === 'gate' && raw[q.id] === 'no');
}

/** How many of the track's questions have an answer. */
export function answeredCount(track: TrackId, raw: RawAnswers): number {
  return trackQuestions(track).filter((q) => {
    const v = raw[q.id];
    return v !== undefined && v !== null && v !== '';
  }).length;
}

// Used only when the session lost the "about you" profile (e.g. a new tab).
// The engine then falls back to the answers themselves for GPA and language.
const NEUTRAL_PROFILE: OnboardingProfile = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  highestDegree: 'bachelors',
  fieldOfStudy: '',
  graduationYear: new Date().getFullYear(),
  institution: '',
  consent: false,
};

export function computeAssessment(
  track: TrackId,
  raw: RawAnswers,
  profile: OnboardingProfile | null,
): { result: ScoreResult; answers: Record<string, Answer>; gates: Question[] } {
  const answers = toEngineAnswers(track, raw);
  const result = calculateFinalScore(track, answers, {}, profile ?? NEUTRAL_PROFILE);
  return { result, answers, gates: failedGates(track, raw) };
}
