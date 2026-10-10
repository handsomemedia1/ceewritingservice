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
      calculated = ((val / 5.0) * 4.0).toFixed(2);
    } else {
      calculated = ((val / 5.0) * 100).toFixed(1) + '%';
    }

    setResult(calculated);
    trackToolCompletion('gpa_calculator', { input: val, scale: targetScale, result: calculated });
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] sm:p-8 md:p-10">
        
        {/* Academic Disclaimer */}
        <div className="mb-8 flex items-start gap-3.5 rounded-xl border border-[rgba(197,160,89,0.2)] bg-[rgba(197,160,89,0.06)] p-4 sm:p-5">
          <div className="text-xl" aria-hidden="true">💡</div>
          <p className="text-xs sm:text-sm leading-relaxed text-[#CCCCCC]">
            <strong className="text-[#C5A059]">Important Advisory:</strong> Academic grading criteria differ across international credential evaluation services (such as WES, ECE) and individual universities. This tool provides a standard linear approximation for planning purposes. Always verify requirements directly with your prospective institutions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#EAEAEA]">
              Current CGPA (5.0 Nigerian Standard Scale)
            </label>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              max="5.0"
              required
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g. 4.35"
              className="w-full rounded-xl border border-[rgba(197,160,89,0.2)] bg-[#0A0A0A] px-4 py-3.5 text-base text-[#EAEAEA] outline-none transition placeholder:text-[#666666] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#EAEAEA]">
              Select Target Scale
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setTargetScale('4.0')}
                className={`rounded-xl border py-3 text-sm font-bold transition-all ${
                  targetScale === '4.0' 
                    ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] shadow-[0_2px_12px_rgba(197,160,89,0.25)]' 
                    : 'border-white/[0.08] bg-[#0A0A0A] text-[#999999] hover:border-[rgba(197,160,89,0.3)] hover:text-white'
                }`}
              >
                US 4.0 Scale
              </button>
              <button 
                type="button"
                onClick={() => setTargetScale('100')}
                className={`rounded-xl border py-3 text-sm font-bold transition-all ${
                  targetScale === '100' 
                    ? 'border-[#C5A059] bg-[#C5A059] text-[#0A0A0A] shadow-[0_2px_12px_rgba(197,160,89,0.25)]' 
                    : 'border-white/[0.08] bg-[#0A0A0A] text-[#999999] hover:border-[rgba(197,160,89,0.3)] hover:text-white'
                }`}
              >
                UK Percentage
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full rounded-xl bg-[#C5A059] py-3.5 text-base font-bold text-[#0A0A0A] shadow-[0_4px_20px_rgba(197,160,89,0.25)] transition hover:bg-[#D8B470] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
          >
            Calculate Estimated Conversion
          </button>
        </form>

        {/* Calculation Result */}
        {result && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[rgba(197,160,89,0.35)] bg-[#0A0A0A] text-center shadow-[0_0_30px_rgba(197,160,89,0.08)]">
            <div className="p-8 sm:p-10">
              <p className="text-xs font-bold tracking-widest uppercase text-[#C5A059]">Estimated Result</p>
              <div className="mt-2 font-display text-5xl font-extrabold text-white sm:text-6xl tracking-tight">
                {result}
              </div>
              <p className="mt-2 text-xs text-[#888888]">
                Equivalent on {targetScale === '4.0' ? 'US 4.0 Scale' : 'UK Percentage Standard'}
              </p>
            </div>
            
            <div className="border-t border-white/[0.08] bg-[#141414] p-5 sm:p-6">
              <p className="text-xs sm:text-sm text-[#CCCCCC]">
                Preparing for fully-funded international scholarship opportunities?
              </p>
              <Link
                href="/scholarship-check"
                className="mt-3.5 inline-flex items-center justify-center rounded-xl border border-[#C5A059] bg-[rgba(197,160,89,0.12)] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#0A0A0A]"
              >
                Evaluate Scholarship Profile Readiness &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
