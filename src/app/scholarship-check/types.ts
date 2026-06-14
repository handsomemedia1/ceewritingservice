/* ============================================================
   Scholarship Readiness Checker — Type Definitions
   ============================================================ */

// ── Track identifiers ──
export type TrackId =
  | 'helmut-schmidt'
  | 'epos'
  | 'erasmus'
  | 'chevening'
  | 'fulbright';

// ── Score bands ──
export type ScoreBand = 'green' | 'yellow' | 'orange' | 'red';

export interface BandInfo {
  band: ScoreBand;
  label: string;
  color: string;
  action: string;
  min: number;
  max: number;
}

// ── Onboarding profile ──
export type DegreeLevel = 'bachelors' | 'masters' | 'phd' | 'enrolled';
export type GPAScale = '5.0' | '4.0' | 'percentage' | 'degree-class';
export type LanguageTest = 'ielts' | 'toefl' | 'duolingo' | 'none';

export interface OnboardingProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  highestDegree: DegreeLevel;
  fieldOfStudy: string;
  graduationYear: number;
  institution: string;
  gpaValue?: number;
  gpaScale?: GPAScale;
  languageTest?: LanguageTest;
  languageScore?: number;
  yearsExperience?: number;
  consent: boolean;
}

// ── Questions ──
export type QuestionType =
  | 'gate'           // Pass/fail eligibility
  | 'objective'      // Scored directly (GPA, hours, etc.)
  | 'self-score-text' // Self-score (1–4) + open-text answer
  | 'checklist'      // Document readiness checklist
  | 'calculator'     // Work experience calculator (Chevening)
  | 'select'         // Single-select dropdown
  | 'number'         // Numeric input
  | 'country-route'; // Fulbright country routing

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  section: string;
  sectionIndex: number;
  helpText?: string;
  options?: QuestionOption[];
  minWords?: number;
  maxWords?: number;
  gateFailMessage?: string;
  gateRecommendedTrack?: TrackId;
  required?: boolean;
  checklistItems?: string[];
}

export interface QuestionSection {
  id: string;
  title: string;
  estimatedMinutes: number;
  questions: Question[];
}

// ── Answers ──
export interface Answer {
  questionId: string;
  type: QuestionType;
  value?: string | number | boolean | string[];
  selfScore?: number; // 1–4 for self-score-text questions
  textAnswer?: string; // Open-text for self-score-text questions
  checklistChecked?: string[]; // For checklist questions
}

// ── AI evaluation ──
export interface AIEvaluation {
  ai_score: number;       // 1–4
  self_score: number;     // 1–4 (echoed back)
  gap: number;            // ai_score - self_score
  gap_label: 'overconfident' | 'aligned' | 'underconfident';
  strength: string;       // Max 20 words
  weakness: string;       // Max 20 words
  feedback: string;       // Max 40 words — actionable improvement
  flag: boolean;          // True if |gap| ≥ 2
}

// ── Scoring ──
export interface CategoryScore {
  category: string;
  weight: number;
  rawScore: number;       // 0–100
  weightedScore: number;  // rawScore × weight
  type: 'objective' | 'ai-evaluated' | 'checklist';
}

export interface GapItem {
  area: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  recommendation: string;
}

export interface ActionItem {
  task: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ActionPlan {
  thirtyDays: ActionItem[];
  sixtyDays: ActionItem[];
  ninetyDays: ActionItem[];
}

export interface ScoreResult {
  track: TrackId;
  finalScore: number;         // 0–100
  band: ScoreBand;
  bandInfo: BandInfo;
  categoryScores: CategoryScore[];
  strengths: string[];        // Max 3
  gaps: GapItem[];            // Ordered by impact
  calibrationEntries: CalibrationEntry[];
  crossTrackScores: CrossTrackScore[];
  actionPlan: ActionPlan;
}

export interface CalibrationEntry {
  questionId: string;
  questionText: string;
  selfScore: number;
  aiScore: number;
  gap: number;
  meaning: string;
}

export interface CrossTrackScore {
  track: TrackId;
  trackName: string;
  estimatedScore: number;
  band: ScoreBand;
  isAssessed: boolean;       // True for the track that was actually assessed
}

// ── Eligibility ──
export type EligibilityStatus = 'eligible' | 'possible-issue' | 'ineligible';

export interface EligibilityCheck {
  status: EligibilityStatus;
  badgeColor: 'green' | 'yellow' | 'red';
  badgeText: string;
  reasons: string[];
}

// ── Track metadata ──
export interface TrackProfile {
  id: TrackId;
  name: string;
  destination: string;
  flag: string;              // Emoji flag
  degreeLevel: string;
  fields: string;
  applicationWindow: string;
  stipend: string;
  description: string;
  quickFacts: string[];
  keyDistinction: string;
}

// ── Work experience period (Chevening calculator) ──
export interface EmploymentPeriod {
  id: string;
  startDate: string;         // YYYY-MM
  endDate: string;           // YYYY-MM
  hoursPerWeek: number;
  type: 'full-time' | 'part-time' | 'voluntary' | 'self-employed' | 'internship';
  duringUndergrad: boolean;
  description?: string;
}

// ── Assessment session state ──
export interface AssessmentState {
  profile: OnboardingProfile | null;
  selectedTrack: TrackId | null;
  currentSectionIndex: number;
  answers: Record<string, Answer>;
  aiEvaluations: Record<string, AIEvaluation>;
  gatePassed: boolean;
  gateFailedAt?: string;     // Question ID where gate failed
  employmentPeriods: EmploymentPeriod[]; // Chevening calculator
  results: ScoreResult | null;
  isLoading: boolean;
  leadId: string | null;
}

// ── Context actions ──
export type AssessmentAction =
  | { type: 'SET_PROFILE'; payload: OnboardingProfile }
  | { type: 'SET_LEAD_ID'; payload: string }
  | { type: 'SELECT_TRACK'; payload: TrackId }
  | { type: 'SET_SECTION'; payload: number }
  | { type: 'SAVE_ANSWER'; payload: Answer }
  | { type: 'SET_AI_EVALUATION'; payload: { questionId: string; evaluation: AIEvaluation } }
  | { type: 'GATE_FAILED'; payload: string }
  | { type: 'GATE_PASSED' }
  | { type: 'ADD_EMPLOYMENT_PERIOD'; payload: EmploymentPeriod }
  | { type: 'REMOVE_EMPLOYMENT_PERIOD'; payload: string }
  | { type: 'UPDATE_EMPLOYMENT_PERIOD'; payload: EmploymentPeriod }
  | { type: 'SET_RESULTS'; payload: ScoreResult }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' };

// ── Fulbright routing ──
export type FulbrightTrack = 'ffsp' | 'open-study' | 'standard';

export interface FulbrightRouting {
  country: string;
  track: FulbrightTrack;
  trackLabel: string;
  notes: string;
}

// ── Document review (Phase 2) ──
export interface DocumentReviewResult {
  overall_score: number;
  missing_elements: string[];
  priority_fix: string;
  secondary_fix?: string;
  [key: string]: unknown; // Track-specific fields
}
