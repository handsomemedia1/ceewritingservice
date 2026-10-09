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
      <div className="rounded-2xl border border-[#d1d9cd] bg-white p-6 shadow-sm sm:p-8 md:p-10">
        
        <div className="mb-8 flex items-start gap-4 rounded-xl border border-[#e8efe5] bg-[#fcfbf9] p-5">
          <div className="text-xl" aria-hidden="true">💡</div>
          <p className="text-sm leading-relaxed text-[#5c665f]">
            <strong className="text-[#1a231d]">Important Disclaimer:</strong> Conversion rules differ significantly between international universities. 
            This tool provides a standard linear approximation (e.g., similar to some WES guidelines), but your target institution 
            may evaluate your transcripts differently. Always verify with the specific university.
          </p>
        </div>

        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#1a231d]">
              Your Current CGPA (5.0 Scale)
            </label>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              max="5.0"
              required
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g. 4.25"
              className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] px-4 py-3.5 text-base text-[#1a231d] outline-none transition placeholder:text-[#7b887e] focus:border-[#244633] focus:bg-white focus:ring-4 focus:ring-[#244633]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#1a231d]">
              Target Scale
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setTargetScale('4.0')}
                className={`rounded-xl border py-3 text-sm font-bold transition ${
                  targetScale === '4.0' 
                    ? 'border-[#244633] bg-[#244633] text-white shadow-sm' 
                    : 'border-[#d1d9cd] bg-[#fcfbf9] text-[#5c665f] hover:border-[#a2b29e] hover:text-[#1a231d]'
                }`}
              >
                US 4.0 Scale
              </button>
              <button 
                type="button"
                onClick={() => setTargetScale('100')}
                className={`rounded-xl border py-3 text-sm font-bold transition ${
                  targetScale === '100' 
                    ? 'border-[#244633] bg-[#244633] text-white shadow-sm' 
                    : 'border-[#d1d9cd] bg-[#fcfbf9] text-[#5c665f] hover:border-[#a2b29e] hover:text-[#1a231d]'
                }`}
              >
                UK Percentage
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full rounded-xl bg-[#244633] py-3.5 text-base font-bold text-white transition hover:bg-[#1b3425] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244633]"
          >
            Calculate Conversion
          </button>
        </form>

        {result && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#a2b29e] bg-[#244633] text-center text-white">
            <div className="p-8">
              <p className="text-sm font-semibold text-[#a2b29e]">Your Estimated Equivalent is</p>
              <div className="mt-2 font-display text-5xl font-bold tracking-tight">{result}</div>
            </div>
            
            <div className="border-t border-[#1b3425] bg-[#1a3022] p-5">
              <p className="text-sm text-[#d6e0d3]">Are you preparing for international applications?</p>
              <Link href="/scholarship-check" className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#c5a059] px-5 py-2.5 text-sm font-bold text-[#1a231d] transition hover:bg-[#d8b470]">
                Take the Scholarship Readiness Check
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
