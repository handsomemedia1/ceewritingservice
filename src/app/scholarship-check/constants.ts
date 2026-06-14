/* ============================================================
   Scholarship Readiness Checker — Constants & Reference Data
   ============================================================ */

import type {
  TrackId, TrackProfile, BandInfo, ScoreBand,
} from './types';

// ── Track profiles ──
export const TRACKS: Record<TrackId, TrackProfile> = {
  'helmut-schmidt': {
    id: 'helmut-schmidt',
    name: 'DAAD Helmut-Schmidt',
    destination: 'Germany',
    flag: '🇩🇪',
    degreeLevel: 'Masters',
    fields: 'Governance, public policy, law, economics, administration',
    applicationWindow: '1 June – 31 July (annual)',
    stipend: '~€934/month + health insurance + travel',
    description: 'Masters in governance and public policy for developing-country professionals',
    quickFacts: [
      'Germany Masters',
      'Governance & policy focused',
      'Jun–Jul deadline',
    ],
    keyDistinction: 'Accepts internships and volunteering as experience',
  },
  'epos': {
    id: 'epos',
    name: 'DAAD EPOS',
    destination: 'Germany',
    flag: '🇩🇪',
    degreeLevel: 'Masters / PhD',
    fields: 'All development-related disciplines',
    applicationWindow: 'Varies per course — check EPOS course list',
    stipend: '€992/month (Masters); €1,400/month (PhD)',
    description: 'Masters/PhD in development-related fields — strict 2-year paid experience rule',
    quickFacts: [
      'Germany Masters/PhD',
      '2-year paid work required',
      'Development fields',
    ],
    keyDistinction: 'Internships and voluntary work do NOT count as professional experience',
  },
  'erasmus': {
    id: 'erasmus',
    name: 'Erasmus Mundus',
    destination: 'Europe (2–3 countries)',
    flag: '🇪🇺',
    degreeLevel: 'Joint Masters',
    fields: 'All fields — hundreds of programmes',
    applicationWindow: 'October – January (varies per programme)',
    stipend: '€1,400/month (Partner Country)',
    description: 'Joint Masters across multiple EU universities — motivation letter is primary selector',
    quickFacts: [
      'Multi-country European Masters',
      'Motivation letter is key',
      'Oct–Jan deadline',
    ],
    keyDistinction: 'NOT one scholarship — hundreds of individual programmes, each with own requirements',
  },
  'chevening': {
    id: 'chevening',
    name: 'Chevening',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    degreeLevel: 'Masters (1 year)',
    fields: 'All fields — any eligible UK university',
    applicationWindow: 'August – October (annual)',
    stipend: '£1,378/month (outside London); £1,690/month (London)',
    description: 'UK Masters — leadership identification programme, not academic scholarship',
    quickFacts: [
      'UK Masters — 1 year',
      'Leadership focused',
      'Aug–Oct deadline',
    ],
    keyDistinction: '2% global acceptance rate. Leadership scholarship — NOT primarily academic.',
  },
  'fulbright': {
    id: 'fulbright',
    name: 'Fulbright',
    destination: 'United States',
    flag: '🇺🇸',
    degreeLevel: 'Masters / PhD',
    fields: 'All fields; priority areas published annually',
    applicationWindow: 'February – June 1 (Nigeria deadline)',
    stipend: 'Tuition + stipend + travel + health insurance',
    description: 'Research-focused — Nigeria track is PhD/faculty; Open Study Award for Masters',
    quickFacts: [
      'USA Masters/PhD',
      'Research focused',
      'Feb–Jun deadline',
    ],
    keyDistinction: 'Zero tolerance for plagiarism. Research proposal is the most critical element.',
  },
};

export const TRACK_ORDER: TrackId[] = [
  'helmut-schmidt', 'epos', 'erasmus', 'chevening', 'fulbright',
];

// ── Score bands ──
export const SCORE_BANDS: BandInfo[] = [
  { band: 'green',  label: 'You are competitive. Apply this cycle.', color: '#10b981', action: 'Polish items + deadline reminder', min: 75, max: 100 },
  { band: 'yellow', label: 'You are close. Here are your gaps.', color: '#f59e0b', action: 'Gap list + 60-day plan', min: 50, max: 74 },
  { band: 'orange', label: 'You need 3–6 months of preparation.', color: '#f97316', action: 'Priority gaps + alternative track suggestion', min: 30, max: 49 },
  { band: 'red',    label: 'This scholarship is not the right fit right now — here is why.', color: '#ef4444', action: 'Honest redirect + 6-month roadmap', min: 0, max: 29 },
];

export function getBandForScore(score: number): BandInfo {
  return SCORE_BANDS.find(b => score >= b.min && score <= b.max) || SCORE_BANDS[3];
}

export function getBandColor(band: ScoreBand): string {
  const b = SCORE_BANDS.find(x => x.band === band);
  return b?.color || '#ef4444';
}

// ── Self-score labels ──
export const SELF_SCORE_LABELS: Record<number, string> = {
  1: 'Not developed — I have not done this yet',
  2: 'Somewhat developed — I have an example but it is vague',
  3: 'Well developed — I have a specific example with clear outcome',
  4: 'Polished — specific, measurable impact, ready for submission',
};

// ── AI score mapping to 0–100 points ──
export const AI_SCORE_TO_POINTS: Record<number, number> = {
  1: 10,
  2: 40,
  3: 70,
  4: 100,
};

// ── GPA conversion tables ──
export interface GPAConversion {
  minGPA: number;
  maxGPA: number;
  degreeClass: string;
  germanGrade: string;
  us4Scale: string;
  daadSignal: string;
}

export const NIGERIAN_5_0_CONVERSION: GPAConversion[] = [
  { minGPA: 4.50, maxGPA: 5.00, degreeClass: 'First Class',              germanGrade: '1.0–1.3', us4Scale: '3.9–4.0', daadSignal: 'Strong — top tier' },
  { minGPA: 3.50, maxGPA: 4.49, degreeClass: 'Second Class Upper (2:1)', germanGrade: '1.4–2.4', us4Scale: '3.0–3.8', daadSignal: 'Competitive' },
  { minGPA: 3.00, maxGPA: 3.49, degreeClass: 'Second Class Lower (2:2)', germanGrade: '2.5–3.0', us4Scale: '2.5–2.9', daadSignal: 'Borderline' },
  { minGPA: 2.40, maxGPA: 2.99, degreeClass: 'Third Class',              germanGrade: '3.1–3.7', us4Scale: '2.0–2.4', daadSignal: 'Below threshold' },
  { minGPA: 0.00, maxGPA: 2.39, degreeClass: 'Pass',                     germanGrade: '3.8–4.0', us4Scale: 'Below 2.0', daadSignal: 'Does not meet requirement' },
];

export const NIGERIAN_4_0_CONVERSION: GPAConversion[] = [
  { minGPA: 3.60, maxGPA: 4.00, degreeClass: 'Distinction / First Class', germanGrade: '1.0–1.5', us4Scale: '3.9–4.0', daadSignal: 'Strong' },
  { minGPA: 3.00, maxGPA: 3.59, degreeClass: 'Upper Credit',              germanGrade: '1.6–2.4', us4Scale: '3.0–3.8', daadSignal: 'Competitive' },
  { minGPA: 2.50, maxGPA: 2.99, degreeClass: 'Lower Credit',              germanGrade: '2.5–3.0', us4Scale: '2.5–2.9', daadSignal: 'Borderline' },
  { minGPA: 2.00, maxGPA: 2.49, degreeClass: 'Pass',                      germanGrade: '3.1–3.7', us4Scale: '2.0–2.4', daadSignal: 'Below threshold' },
];

export function convertGPA(value: number, scale: string): GPAConversion | null {
  const table = scale === '5.0' ? NIGERIAN_5_0_CONVERSION
    : scale === '4.0' ? NIGERIAN_4_0_CONVERSION
    : null;
  if (!table) return null;
  return table.find(r => value >= r.minGPA && value <= r.maxGPA) || null;
}

// ── GPA score (0–100) for objective scoring ──
export function scoreGPA(value: number | undefined, scale: string | undefined): number {
  if (!value || !scale) return 50; // Default middle score if not provided
  if (scale === 'degree-class') {
    // Direct mapping from degree class text
    return 50; // Will be handled by specific question logic
  }
  if (scale === 'percentage') {
    if (value >= 70) return 100;
    if (value >= 60) return 80;
    if (value >= 50) return 50;
    if (value >= 40) return 20;
    return 0;
  }
  const conv = convertGPA(value, scale);
  if (!conv) return 50;
  if (conv.degreeClass.includes('First')) return 100;
  if (conv.degreeClass.includes('Upper') || conv.degreeClass.includes('Distinction')) return 80;
  if (conv.degreeClass.includes('Lower') || conv.degreeClass.includes('Credit')) return 50;
  if (conv.degreeClass.includes('Third')) return 20;
  return 0;
}

// ── Language score (0–100) ──
export function scoreLanguage(test: string | undefined, score: number | undefined): number {
  if (!test || test === 'none') return 0;
  if (!score) return 0;
  if (test === 'ielts') {
    if (score >= 7.0) return 100;
    if (score >= 6.5) return 80;
    if (score >= 6.0) return 60;
    return 20;
  }
  if (test === 'toefl') {
    if (score >= 100) return 100;
    if (score >= 90) return 80;
    if (score >= 80) return 60;
    return 20;
  }
  if (test === 'duolingo') {
    if (score >= 120) return 100;
    if (score >= 105) return 80;
    if (score >= 90) return 60;
    return 20;
  }
  return 0;
}

// ── Score weight distributions per track ──
export interface WeightDistribution {
  category: string;
  weight: number;
  type: 'objective' | 'ai-evaluated' | 'checklist';
}

export const TRACK_WEIGHTS: Record<TrackId, WeightDistribution[]> = {
  'helmut-schmidt': [
    { category: 'academic',     weight: 0.25, type: 'objective' },
    { category: 'motivation',   weight: 0.25, type: 'ai-evaluated' },
    { category: 'experience',   weight: 0.20, type: 'ai-evaluated' },
    { category: 'programme',    weight: 0.15, type: 'objective' },
    { category: 'documents',    weight: 0.15, type: 'checklist' },
  ],
  'epos': [
    { category: 'experience',   weight: 0.30, type: 'objective' },
    { category: 'academic',     weight: 0.25, type: 'objective' },
    { category: 'motivation',   weight: 0.20, type: 'ai-evaluated' },
    { category: 'documents',    weight: 0.15, type: 'checklist' },
    { category: 'language',     weight: 0.10, type: 'objective' },
  ],
  'erasmus': [
    { category: 'motivation',   weight: 0.35, type: 'ai-evaluated' },
    { category: 'academic',     weight: 0.25, type: 'objective' },
    { category: 'programme',    weight: 0.20, type: 'objective' },
    { category: 'language',     weight: 0.10, type: 'objective' },
    { category: 'residency',    weight: 0.10, type: 'objective' },
  ],
  'chevening': [
    { category: 'leadership',   weight: 0.30, type: 'ai-evaluated' },
    { category: 'career',       weight: 0.25, type: 'ai-evaluated' },
    { category: 'experience',   weight: 0.20, type: 'objective' },
    { category: 'academic',     weight: 0.15, type: 'objective' },
    { category: 'university',   weight: 0.10, type: 'objective' },
  ],
  'fulbright': [
    { category: 'research',     weight: 0.35, type: 'ai-evaluated' },
    { category: 'academic',     weight: 0.20, type: 'objective' },
    { category: 'language',     weight: 0.20, type: 'objective' },
    { category: 'impact',       weight: 0.15, type: 'ai-evaluated' },
    { category: 'priority',     weight: 0.10, type: 'objective' },
  ],
};

// ── Country lists ──
// DAAD-eligible developing countries (DAC list — most common applicant countries)
export const DAAD_ELIGIBLE_COUNTRIES: string[] = [
  'Afghanistan','Albania','Algeria','Angola','Argentina','Armenia','Azerbaijan',
  'Bangladesh','Belarus','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina',
  'Botswana','Brazil','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon',
  'Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo (Brazzaville)','Congo (DRC)','Costa Rica','Côte d\'Ivoire','Cuba',
  'Djibouti','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea',
  'Eritrea','Eswatini','Ethiopia','Fiji','Gabon','Gambia','Georgia','Ghana',
  'Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','India',
  'Indonesia','Iran','Iraq','Jamaica','Jordan','Kazakhstan','Kenya','Kiribati',
  'Kosovo','Kyrgyzstan','Laos','Lebanon','Lesotho','Liberia','Libya','Madagascar',
  'Malawi','Malaysia','Maldives','Mali','Marshall Islands','Mauritania','Mauritius',
  'Mexico','Micronesia','Moldova','Mongolia','Montenegro','Morocco','Mozambique',
  'Myanmar','Namibia','Nauru','Nepal','Nicaragua','Niger','Nigeria','North Macedonia',
  'Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru',
  'Philippines','Rwanda','Samoa','São Tomé and Príncipe','Senegal','Serbia',
  'Sierra Leone','Solomon Islands','Somalia','South Africa','South Sudan','Sri Lanka',
  'Sudan','Suriname','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste',
  'Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu',
  'Uganda','Ukraine','Uruguay','Uzbekistan','Vanuatu','Venezuela','Vietnam',
  'Yemen','Zambia','Zimbabwe',
];

// Chevening-eligible countries (subset — all African, Asian, and key countries)
export const CHEVENING_ELIGIBLE_COUNTRIES: string[] = [
  ...DAAD_ELIGIBLE_COUNTRIES,
  // Chevening covers 160+ countries — using DAAD list as base since most overlap
];

// Fulbright country routing
export interface FulbrightCountryConfig {
  track: 'ffsp' | 'open-study' | 'standard';
  trackLabel: string;
  notes: string;
  mastersPriority: boolean;
}

export const FULBRIGHT_COUNTRY_ROUTING: Record<string, FulbrightCountryConfig> = {
  'Nigeria': {
    track: 'ffsp',
    trackLabel: 'FFSP (PhD/Faculty) or Open Study Award (Masters)',
    notes: 'Nigeria FFSP targets PhD students/faculty. Masters applicants use Open Study Award.',
    mastersPriority: false,
  },
  'South Africa': {
    track: 'standard',
    trackLabel: 'Masters or PhD',
    notes: 'Both Masters and PhD available.',
    mastersPriority: false,
  },
  'Tanzania': {
    track: 'standard',
    trackLabel: 'Masters (prioritised) or PhD',
    notes: 'Masters is prioritised over PhD.',
    mastersPriority: true,
  },
  'Kenya': {
    track: 'standard',
    trackLabel: 'Masters (prioritised) or PhD',
    notes: 'Masters is prioritised over PhD.',
    mastersPriority: true,
  },
  'Ghana': {
    track: 'standard',
    trackLabel: 'Masters (prioritised) or PhD',
    notes: 'Masters is prioritised over PhD.',
    mastersPriority: true,
  },
};

// Fulbright priority areas 2027/28
export const FULBRIGHT_PRIORITY_FIELDS: string[] = [
  'Artificial Intelligence',
  'Conflict Negotiation',
  'Cybersecurity',
  'Disease Prevention',
  'Health Digitalisation',
  'STEM',
  'Supply Chain Management',
  'Trade',
];

// ── Degree level options for onboarding ──
export const DEGREE_OPTIONS = [
  { value: 'bachelors', label: "Bachelor's Degree" },
  { value: 'masters',   label: "Master's Degree" },
  { value: 'phd',       label: 'PhD' },
  { value: 'enrolled',  label: 'Currently Enrolled' },
];

export const GPA_SCALE_OPTIONS = [
  { value: '5.0',          label: '5.0 Scale (Nigerian University)' },
  { value: '4.0',          label: '4.0 Scale (Polytechnic / US)' },
  { value: 'percentage',   label: 'Percentage' },
  { value: 'degree-class', label: 'Degree Class (First, 2:1, etc.)' },
];

export const LANGUAGE_TEST_OPTIONS = [
  { value: 'ielts',    label: 'IELTS' },
  { value: 'toefl',    label: 'TOEFL' },
  { value: 'duolingo', label: 'Duolingo' },
  { value: 'none',     label: 'None yet' },
];

export const DEGREE_CLASS_OPTIONS = [
  { value: 'first-class', label: 'First Class' },
  { value: '2-1',         label: 'Second Class Upper (2:1)' },
  { value: '2-2',         label: 'Second Class Lower (2:2)' },
  { value: 'third',       label: 'Third Class' },
  { value: 'pass',        label: 'Pass' },
];

// Chevening work experience thresholds
export const CHEVENING_HOURS_THRESHOLD = 2800;
export const CHEVENING_MAX_EMPLOYMENT_PERIODS = 15;
