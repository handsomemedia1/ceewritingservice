/* ============================================================
   Scholarship Readiness Checker — Eligibility Pre-Check
   Runs on onboarding profile data only — no AI required.
   Returns a badge (green/yellow/red) per track.
   ============================================================ */

import type { TrackId, OnboardingProfile, EligibilityCheck } from './types';
import { DAAD_ELIGIBLE_COUNTRIES, CHEVENING_ELIGIBLE_COUNTRIES, FULBRIGHT_COUNTRY_ROUTING } from './constants';

// ── Social-science related fields (for Helmut-Schmidt) ──
const HELMUT_SCHMIDT_FIELDS = [
  'governance', 'public policy', 'public administration', 'political science',
  'politics', 'law', 'economics', 'international relations', 'international development',
  'development studies', 'social science', 'sociology', 'public health',
  'administration', 'management', 'policy', 'diplomacy', 'human rights',
  'peace', 'conflict', 'security studies', 'urban planning', 'environmental policy',
];

function fieldMatchesHelmutSchmidt(field: string): boolean {
  const lower = field.toLowerCase();
  return HELMUT_SCHMIDT_FIELDS.some(f => lower.includes(f));
}

function isCountryEligible(country: string, list: string[]): boolean {
  return list.some(c => c.toLowerCase() === country.toLowerCase());
}

// ── Main check per track ──

function checkHelmutSchmidt(profile: OnboardingProfile): EligibilityCheck {
  const reasons: string[] = [];
  let hasBlocker = false;
  let hasWarning = false;

  // Country check
  if (!isCountryEligible(profile.country, DAAD_ELIGIBLE_COUNTRIES)) {
    reasons.push(`${profile.country} may not be on the DAAD-eligible country list.`);
    hasBlocker = true;
  } else {
    reasons.push('Country eligibility confirmed.');
  }

  // Field check
  if (!fieldMatchesHelmutSchmidt(profile.fieldOfStudy)) {
    reasons.push(`Your field "${profile.fieldOfStudy}" may not align with governance/policy focus. Verify during the assessment.`);
    hasWarning = true;
  } else {
    reasons.push('Field of study aligns with programme focus.');
  }

  // Experience check (any type counts for HS)
  if (profile.yearsExperience === undefined || profile.yearsExperience === 0) {
    reasons.push('Some form of experience is expected (internships and volunteering count).');
    hasWarning = true;
  } else {
    reasons.push(`${profile.yearsExperience} year(s) of experience noted.`);
  }

  // Degree check
  if (profile.highestDegree === 'enrolled') {
    reasons.push('You need a completed degree to apply.');
    hasWarning = true;
  }

  if (hasBlocker) {
    return { status: 'ineligible', badgeColor: 'red', badgeText: 'Likely Ineligible', reasons };
  }
  if (hasWarning) {
    return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Check Required', reasons };
  }
  return { status: 'eligible', badgeColor: 'green', badgeText: 'Likely Eligible', reasons };
}

function checkEPOS(profile: OnboardingProfile): EligibilityCheck {
  const reasons: string[] = [];
  let hasBlocker = false;
  let hasWarning = false;

  // Country check
  if (!isCountryEligible(profile.country, DAAD_ELIGIBLE_COUNTRIES)) {
    reasons.push(`${profile.country} may not be on the DAAD-eligible country list.`);
    hasBlocker = true;
  } else {
    reasons.push('Country eligibility confirmed.');
  }

  // Strict 2-year paid experience check
  if (profile.yearsExperience === undefined || profile.yearsExperience < 2) {
    reasons.push(`EPOS requires at least 2 years of PAID professional experience (excluding internships, volunteering, part-time). You reported ${profile.yearsExperience ?? 0} year(s).`);
    hasBlocker = true;
  } else {
    reasons.push(`${profile.yearsExperience} years of experience meets the minimum requirement.`);
  }

  // Degree age check (graduation within 6 years)
  const currentYear = new Date().getFullYear();
  const degreeAge = currentYear - profile.graduationYear;
  if (degreeAge > 6) {
    reasons.push(`Your degree is ${degreeAge} years old. EPOS generally requires degrees under 6 years old.`);
    hasWarning = true;
  } else {
    reasons.push('Degree age is within the expected range.');
  }

  // Degree level check (needs at least bachelors)
  if (profile.highestDegree === 'enrolled') {
    reasons.push('You need a completed Bachelor\'s degree to apply.');
    hasBlocker = true;
  } else {
    reasons.push('Degree level requirement met.');
  }

  if (hasBlocker) {
    return { status: 'ineligible', badgeColor: 'red', badgeText: 'Likely Ineligible', reasons };
  }
  if (hasWarning) {
    return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Check Required', reasons };
  }
  return { status: 'eligible', badgeColor: 'green', badgeText: 'Likely Eligible', reasons };
}

function checkErasmus(profile: OnboardingProfile): EligibilityCheck {
  const reasons: string[] = [];
  let hasBlocker = false;
  let hasWarning = false;

  // Bachelor's degree check — the main hard gate
  if (profile.highestDegree === 'enrolled') {
    reasons.push('Erasmus Mundus requires a completed Bachelor\'s degree (or completion before programme start).');
    hasBlocker = true;
  } else {
    reasons.push('Degree requirement met.');
  }

  // GPA check — soft signal
  if (profile.gpaValue && profile.gpaScale) {
    if (profile.gpaScale === '5.0' && profile.gpaValue < 3.0) {
      reasons.push('Your GPA may be below competitive thresholds for some programmes.');
      hasWarning = true;
    } else if (profile.gpaScale === '4.0' && profile.gpaValue < 2.5) {
      reasons.push('Your GPA may be below competitive thresholds for some programmes.');
      hasWarning = true;
    } else {
      reasons.push('Academic standing appears competitive.');
    }
  }

  // Very open — few hard gates
  if (!hasBlocker && !hasWarning) {
    reasons.push('Erasmus Mundus has broad eligibility. Focus on programme selection and motivation letters.');
  }

  if (hasBlocker) {
    return { status: 'ineligible', badgeColor: 'red', badgeText: 'Likely Ineligible', reasons };
  }
  if (hasWarning) {
    return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Check Required', reasons };
  }
  return { status: 'eligible', badgeColor: 'green', badgeText: 'Likely Eligible', reasons };
}

function checkChevening(profile: OnboardingProfile): EligibilityCheck {
  const reasons: string[] = [];
  let hasBlocker = false;
  let hasWarning = false;

  // Country check
  if (!isCountryEligible(profile.country, CHEVENING_ELIGIBLE_COUNTRIES)) {
    reasons.push(`${profile.country} may not be a Chevening-eligible country.`);
    hasBlocker = true;
  } else {
    reasons.push('Country eligibility confirmed.');
  }

  // Graduation year check (before Oct 2023 → graduated 2023 or earlier)
  if (profile.graduationYear > 2023) {
    reasons.push(`You graduated in ${profile.graduationYear}. Chevening typically requires graduation before October 2023 for the current cycle.`);
    hasWarning = true;
  } else {
    reasons.push('Graduation timeline meets requirement.');
  }

  // Degree class check (if GPA provided)
  if (profile.gpaValue && profile.gpaScale) {
    let meets21 = false;
    if (profile.gpaScale === '5.0') {
      meets21 = profile.gpaValue >= 3.5;
    } else if (profile.gpaScale === '4.0') {
      meets21 = profile.gpaValue >= 3.0;
    } else if (profile.gpaScale === 'percentage') {
      meets21 = profile.gpaValue >= 60;
    }

    if (!meets21 && profile.gpaScale !== 'degree-class') {
      reasons.push('Your GPA may be below the 2:1 equivalent required by Chevening.');
      hasWarning = true;
    } else if (profile.gpaScale !== 'degree-class') {
      reasons.push('Academic standing appears to meet the 2:1 requirement.');
    }
  }

  // Degree level
  if (profile.highestDegree === 'enrolled') {
    reasons.push('You need a completed undergraduate degree to apply.');
    hasBlocker = true;
  }

  // Experience indicator
  if (profile.yearsExperience !== undefined && profile.yearsExperience < 1) {
    reasons.push('Chevening requires 2,800 hours of work experience (~1.5 years full-time). Build more experience.');
    hasWarning = true;
  }

  if (hasBlocker) {
    return { status: 'ineligible', badgeColor: 'red', badgeText: 'Likely Ineligible', reasons };
  }
  if (hasWarning) {
    return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Check Required', reasons };
  }
  return { status: 'eligible', badgeColor: 'green', badgeText: 'Likely Eligible', reasons };
}

function checkFulbright(profile: OnboardingProfile): EligibilityCheck {
  const reasons: string[] = [];
  let hasWarning = false;

  // Country routing check
  const routing = FULBRIGHT_COUNTRY_ROUTING[profile.country];
  if (routing) {
    reasons.push(`${profile.country} Fulbright track: ${routing.trackLabel}. ${routing.notes}`);
  } else {
    reasons.push(`${profile.country} is not in our Fulbright routing database. Check with the US Embassy in your country for available programmes.`);
    hasWarning = true;
  }

  // Degree check
  if (profile.highestDegree === 'enrolled') {
    reasons.push('You typically need a completed degree to apply for Fulbright.');
    hasWarning = true;
  } else {
    reasons.push('Degree requirement met.');
  }

  // GPA soft signal
  if (profile.gpaValue && profile.gpaScale) {
    if (profile.gpaScale === '5.0' && profile.gpaValue < 3.5) {
      reasons.push('Fulbright is academically competitive. A stronger GPA would help.');
      hasWarning = true;
    } else if (profile.gpaScale === '4.0' && profile.gpaValue < 3.0) {
      reasons.push('Fulbright is academically competitive. A stronger GPA would help.');
      hasWarning = true;
    } else {
      reasons.push('Academic standing appears competitive.');
    }
  }

  // Fulbright has few hard gates — mostly soft signals
  if (!hasWarning) {
    reasons.push('Fulbright has broad eligibility. Focus on your research proposal — it is the most critical element.');
  }

  if (hasWarning) {
    return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Check Required', reasons };
  }
  return { status: 'eligible', badgeColor: 'green', badgeText: 'Likely Eligible', reasons };
}

// ── Public API ──

export function checkTrackEligibility(track: TrackId, profile: OnboardingProfile): EligibilityCheck {
  switch (track) {
    case 'helmut-schmidt':
      return checkHelmutSchmidt(profile);
    case 'epos':
      return checkEPOS(profile);
    case 'erasmus':
      return checkErasmus(profile);
    case 'chevening':
      return checkChevening(profile);
    case 'fulbright':
      return checkFulbright(profile);
    default:
      return { status: 'possible-issue', badgeColor: 'yellow', badgeText: 'Unknown Track', reasons: ['Track not recognised.'] };
  }
}

/** Check eligibility for all tracks at once */
export function checkAllTrackEligibility(profile: OnboardingProfile): Record<TrackId, EligibilityCheck> {
  return {
    'helmut-schmidt': checkHelmutSchmidt(profile),
    'epos': checkEPOS(profile),
    'erasmus': checkErasmus(profile),
    'chevening': checkChevening(profile),
    'fulbright': checkFulbright(profile),
  };
}
