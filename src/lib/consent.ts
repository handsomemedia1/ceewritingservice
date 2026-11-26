/**
 * Visitor consent for non-essential processing (NDPA 2023 s.25-26; NDPR 2019 reg 2.3).
 * Nothing non-essential runs until the visitor has said yes, and they can change their mind
 * at any time from "Cookie settings" in the footer.
 */

export interface ConsentChoice {
  /** Google Analytics: anonymous usage statistics. */
  analytics: boolean;
  /** Advertising measurement (Google Ads conversion and remarketing tags). */
  ads: boolean;
  /** When the choice was made (ISO 8601). Kept as evidence of consent. */
  decidedAt: string;
  /** Policy version the visitor saw. Bump it to ask everyone again after material changes. */
  version: number;
}

export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'cee_consent';
const CHANGE_EVENT = 'cee:consent-change';
const OPEN_EVENT = 'cee:consent-open';

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    return parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Pick<ConsentChoice, 'analytics' | 'ads'>): ConsentChoice {
  const record: ConsentChoice = { ...choice, decidedAt: new Date().toISOString(), version: CONSENT_VERSION };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private browsing can block storage; the choice still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: record }));
  return record;
}

export function onConsentChange(listener: (choice: ConsentChoice) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Reopens the preferences panel, e.g. from the footer. */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentPreferencesRequested(listener: () => void): () => void {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

/** Global Privacy Control: a browser-level request not to be tracked, treated as a refusal. */
export function browserRequestsNoTracking(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true;
}
