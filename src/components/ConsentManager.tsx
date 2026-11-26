'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  type ConsentChoice,
  browserRequestsNoTracking,
  onConsentPreferencesRequested,
  readConsent,
  saveConsent,
} from '@/lib/consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Cookie banner, preferences panel and consent-gated Google tag.
 *
 * Google Consent Mode v2 defaults every signal to "denied", and the Google tag itself is not
 * loaded until the visitor opts in ("basic" consent mode), so no data reaches Google before consent.
 */
export default function ConsentManager({ gaId, adsId }: { gaId?: string; adsId?: string }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setChoice(stored);
    } else if (browserRequestsNoTracking()) {
      setChoice(saveConsent({ analytics: false, ads: false }));
    } else {
      setBannerOpen(true);
    }
    setReady(true);

    return onConsentPreferencesRequested(() => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setAds(current?.ads ?? false);
      setPanelOpen(true);
    });
  }, []);

  // Tell the Google tag about changes made after it has loaded.
  useEffect(() => {
    if (!choice || !window.gtag) return;
    window.gtag('consent', 'update', consentSignals(choice));
  }, [choice]);

  const decide = (next: { analytics: boolean; ads: boolean }) => {
    setChoice(saveConsent(next));
    setBannerOpen(false);
    setPanelOpen(false);
  };

  const tagIds = [choice?.analytics ? gaId : undefined, choice?.ads ? adsId : undefined].filter(Boolean) as string[];

  return (
    <>
      {ready && tagIds.length > 0 && choice && (
        <>
          <Script id="google-consent-default" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', ${JSON.stringify({ ...consentSignals({ analytics: false, ads: false }), wait_for_update: 500 })});
            gtag('consent', 'update', ${JSON.stringify(consentSignals(choice))});
            gtag('js', new Date());
            ${tagIds.map((id) => `gtag('config', '${id}', { anonymize_ip: true });`).join('\n')}
          `}</Script>
          <Script id="google-tag" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${tagIds[0]}`} />
        </>
      )}

      {bannerOpen && !panelOpen && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[1000] mx-auto max-w-3xl rounded-2xl border border-gold/25 bg-[#111111] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.6)] sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <p className="font-space text-base font-bold text-text-primary">Your privacy choices</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            We use essential storage to run this site. With your permission we also use Google Analytics to understand
            how the site is used, and advertising cookies to measure our ads. You can change your choice at any time
            from &ldquo;Cookie settings&rdquo; in the footer. See our <Link href="/privacy#cookies" className="text-gold underline">Privacy Policy</Link>.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => decide({ analytics: true, ads: true })} className="min-h-11 flex-1 rounded-xl bg-gold px-5 font-space text-sm font-bold text-bg-main transition hover:bg-gold-hover">
              Accept all
            </button>
            <button type="button" onClick={() => decide({ analytics: false, ads: false })} className="min-h-11 flex-1 rounded-xl bg-text-primary px-5 font-space text-sm font-bold text-bg-main transition hover:bg-white">
              Reject non-essential
            </button>
            <button type="button" onClick={() => { setAnalytics(false); setAds(false); setPanelOpen(true); }} className="min-h-11 rounded-xl px-5 font-space text-sm font-bold text-gold underline-offset-4 hover:underline">
              Choose
            </button>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-[1001] flex items-end justify-center bg-black/70 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="consent-title">
          <div className="w-full max-w-lg rounded-2xl border border-gold/25 bg-[#111111] p-6">
            <h2 id="consent-title" className="font-space text-xl font-bold text-text-primary">Cookie settings</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">Choose which optional technologies we may use. Essential storage is always on because the site needs it.</p>

            <ul className="mt-5 space-y-4">
              <ConsentRow title="Essential" text="Keeps you signed in, remembers your currency and these choices. Always on." checked disabled />
              <ConsentRow title="Analytics" text="Google Analytics: which pages are visited and how the site performs. IP addresses are anonymised." checked={analytics} onChange={setAnalytics} />
              <ConsentRow title="Advertising" text="Google Ads measurement, so we can tell which ads lead to enquiries." checked={ads} onChange={setAds} />
            </ul>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => decide({ analytics, ads })} className="min-h-11 flex-1 rounded-xl bg-gold px-5 font-space text-sm font-bold text-bg-main transition hover:bg-gold-hover">
                Save choices
              </button>
              <button type="button" onClick={() => decide({ analytics: false, ads: false })} className="min-h-11 flex-1 rounded-xl bg-text-primary px-5 font-space text-sm font-bold text-bg-main transition hover:bg-white">
                Reject non-essential
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ConsentRow({ title, text, checked, disabled, onChange }: { title: string; text: string; checked: boolean; disabled?: boolean; onChange?: (value: boolean) => void }) {
  return (
    <li className="flex items-start justify-between gap-4 border-t border-white/[0.06] pt-4">
      <div>
        <p className="font-space text-sm font-bold text-text-primary">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{text}</p>
      </div>
      <label className="relative mt-1 inline-flex shrink-0 cursor-pointer items-center">
        <span className="sr-only">{title}</span>
        <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} />
        <span className="h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-gold peer-disabled:opacity-60" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
      </label>
    </li>
  );
}

function consentSignals(choice: Pick<ConsentChoice, 'analytics' | 'ads'>) {
  const ad = choice.ads ? 'granted' : 'denied';
  return {
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
  };
}
