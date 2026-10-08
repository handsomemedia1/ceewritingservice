"use client";

import React, { useState, useEffect } from 'react';
import { trackToolStart, trackToolCompletion } from '../../utils/toolAnalytics';
import Link from 'next/link';

type Scale = '4.0' | '100';

export default function GPACalculator() {
  const [cgpa, setCgpa] = useState<string>('');
  const [targetScale, setTargetScale] = useState<Scale>('4.0');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    trackToolStart('gpa_calculator');
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(cgpa);

    if (isNaN(val) || val < 0 || val > 5.0) {
      alert("Please enter a valid CGPA between 0 and 5.0");
      return;
    }

    let calculated = '';
    if (targetScale === '4.0') {
      // Existing linear estimate; this is not an official credential evaluation.
      calculated = ((val / 5.0) * 4.0).toFixed(2);
    } else {
      calculated = ((val / 5.0) * 100).toFixed(1) + '%';
    }

    setResult(calculated);
    trackToolCompletion('gpa_calculator', { input: val, scale: targetScale, result: calculated });
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="border-b border-[var(--border)] bg-white/[0.02] px-5 py-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Conversion estimator</p>
          <h2 className="mt-2 font-display text-xl font-bold text-text-primary sm:text-2xl">Enter your current CGPA</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Choose a destination scale to view a simple linear estimate.</p>
        </div>

        <div className="p-5 sm:p-8">
          <div role="note" className="mb-7 flex gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-4 sm:p-5">
            <span aria-hidden="true" className="mt-0.5 text-lg">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-text-primary">Important disclaimer</p>
              <p className="mt-1 text-sm leading-6 text-muted">Conversion rules differ significantly between institutions. This tool provides a standard linear approximation, not an official credential evaluation. Your target university may assess your transcript differently, so always verify its specific requirements.</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-7">
            <div>
              <label htmlFor="current-cgpa" className="mb-2 block text-sm font-semibold text-text-primary">Your current CGPA <span className="font-normal text-muted">(5.0 scale)</span></label>
              <input
                id="current-cgpa"
                type="number"
                step="0.01"
                min="0"
                max="5"
                required
                value={cgpa}
                onChange={(e) => { setCgpa(e.target.value); setResult(null); }}
                placeholder="e.g. 4.25"
                className="w-full rounded-xl border border-[var(--border)] bg-[#0b0b0b] px-4 py-4 text-base text-text-primary outline-none transition placeholder:text-muted/70 hover:border-gold/30 focus:border-gold focus:ring-4 focus:ring-gold/10"
              />
              <p className="mt-2 text-xs text-muted">Enter a value between 0.00 and 5.00.</p>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-text-primary">Target scale</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" aria-pressed={targetScale === '4.0'} onClick={() => { setTargetScale('4.0'); setResult(null); }} className={`min-h-14 rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${targetScale === '4.0' ? 'border-gold bg-gold/[0.12] text-gold shadow-[inset_0_0_0_1px_rgba(197,160,89,0.12)]' : 'border-[var(--border)] bg-white/[0.02] text-muted hover:border-gold/40 hover:text-text-primary'}`}>
                  <span className="block">US 4.0 scale</span><span className="mt-1 block text-xs font-normal opacity-75">Estimate out of 4.00</span>
                </button>
                <button type="button" aria-pressed={targetScale === '100'} onClick={() => { setTargetScale('100'); setResult(null); }} className={`min-h-14 rounded-xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${targetScale === '100' ? 'border-gold bg-gold/[0.12] text-gold shadow-[inset_0_0_0_1px_rgba(197,160,89,0.12)]' : 'border-[var(--border)] bg-white/[0.02] text-muted hover:border-gold/40 hover:text-text-primary'}`}>
                  <span className="block">UK percentage</span><span className="mt-1 block text-xs font-normal opacity-75">Estimate out of 100%</span>
                </button>
              </div>
            </fieldset>

            <button type="submit" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-4 text-sm font-bold text-[#0A0A0A] transition hover:bg-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              Calculate estimate <span aria-hidden="true">→</span>
            </button>
          </form>

          {result && (
            <section aria-live="polite" aria-label="Conversion result" className="mt-7 overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-br from-gold/[0.12] to-transparent">
              <div className="p-6 text-center sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Estimated equivalent</p>
                <p className="mt-3 font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">{result}</p>
                <p className="mt-3 text-sm leading-6 text-muted">A preliminary estimate only. The receiving institution’s conversion policy takes precedence.</p>
              </div>
              <div className="border-t border-[var(--border)] px-5 py-4 text-center sm:px-8">
                <p className="text-sm text-muted">Planning an international application?</p>
                <Link href="/scholarship-check" className="mt-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">Try the Scholarship Readiness Check <span aria-hidden="true" className="ml-2">→</span></Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
