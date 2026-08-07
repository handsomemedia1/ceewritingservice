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
      // WES approximation: (CGPA / 5.0) * 4.0
      calculated = ((val / 5.0) * 4.0).toFixed(2);
    } else {
      // UK Percentage approximation: (CGPA / 5.0) * 100
      calculated = ((val / 5.0) * 100).toFixed(1) + '%';
    }

    setResult(calculated);
    trackToolCompletion('gpa_calculator', { input: val, scale: targetScale, result: calculated });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-green-dark/10 shadow-lg">
        
        <div className="mb-8 p-4 bg-green-dark/10/10 rounded-xl border border-green-dark/20/20 flex gap-4 items-start">
          <div className="text-xl">⚠️</div>
          <p className="text-sm text-green-dark/80 leading-relaxed">
            <strong>Important Disclaimer:</strong> Conversion rules differ significantly between international universities. 
            This tool provides a standard linear approximation (e.g., similar to some WES guidelines), but your target institution 
            may evaluate your transcripts differently. Always verify with the specific university.
          </p>
        </div>

        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-green-dark mb-2">
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
              className="w-full px-5 py-4 rounded-xl border border-green-dark/20 outline-none focus:border-green-dark/20 focus:ring-4 ring-gold/10 text-lg transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-green-dark mb-2">
              Target Scale
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setTargetScale('4.0')}
                className={`py-3 rounded-xl border font-bold transition-all ${targetScale === '4.0' ? 'bg-green-dark text-white border-green-dark' : 'bg-sage/20 text-green-dark border-green-dark/10 hover:border-green-dark/30'}`}
              >
                US 4.0 Scale
              </button>
              <button 
                type="button"
                onClick={() => setTargetScale('100')}
                className={`py-3 rounded-xl border font-bold transition-all ${targetScale === '100' ? 'bg-green-dark text-white border-green-dark' : 'bg-sage/20 text-green-dark border-green-dark/10 hover:border-green-dark/30'}`}
              >
                UK Percentage
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl bg-green-dark/10 text-green-dark font-bold text-lg hover:bg-green-dark/10-light shadow-[0_4px_20px_rgba(201,147,58,0.2)] transition-all"
          >
            Calculate Conversion
          </button>
        </form>

        {result && (
          <div className="mt-10 p-8 bg-green-dark rounded-2xl text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-dark/10" />
            <p className="text-white/70 font-semibold mb-2">Your Estimated Equivalent is</p>
            <div className="text-5xl font-serif font-bold text-green-dark/70 mb-6">{result}</div>
            
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-white/80 mb-4">Are you preparing for international applications?</p>
              <Link href="/scholarship-check" className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors">
                Take the Scholarship Readiness Check →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
