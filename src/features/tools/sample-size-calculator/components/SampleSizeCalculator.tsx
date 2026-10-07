"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function calculateSampleSize(confidence: number, marginOfError: number, proportion: number, populationSize: number | null, nonResponse: number) {
  const zScores: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const Z = zScores[confidence];
  const E = marginOfError / 100;
  const p = proportion / 100;
  
  let n0 = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(E, 2);
  let n = n0;
  
  if (populationSize && populationSize > 0) {
    n = (n0 * populationSize) / (n0 + populationSize - 1);
  }
  
  let baseSample = Math.ceil(n);
  
  let adjustedSample = baseSample;
  if (nonResponse && nonResponse > 0 && nonResponse < 100) {
    adjustedSample = Math.ceil(baseSample / (1 - (nonResponse / 100)));
  }
  
  return { n0: Math.ceil(n0), baseSample, adjustedSample };
}

export default function SampleSizeCalculator() {
  const [confidence, setConfidence] = useState<number>(95);
  const [margin, setMargin] = useState<string>('5');
  const [proportion, setProportion] = useState<string>('50');
  
  const [isFinite, setIsFinite] = useState<boolean>(false);
  const [population, setPopulation] = useState<string>('');
  
  const [isNonResponse, setIsNonResponse] = useState<boolean>(false);
  const [nonResponseRate, setNonResponseRate] = useState<string>('10');
  
  const [result, setResult] = useState<{ n0: number, baseSample: number, adjustedSample: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const m = parseFloat(margin);
    const p = parseFloat(proportion);
    const pop = isFinite ? parseInt(population, 10) : null;
    const nr = isNonResponse ? parseFloat(nonResponseRate) : 0;
    
    if (isNaN(m) || m <= 0 || m >= 100) {
      setError("Margin of error must be greater than 0 and less than 100.");
      return;
    }
    if (isNaN(p) || p <= 0 || p >= 100) {
      setError("Expected proportion must be between 0 and 100.");
      return;
    }
    if (isFinite && (isNaN(pop!) || pop! <= 0)) {
      setError("Population size must be a positive integer.");
      return;
    }
    if (isNonResponse && (isNaN(nr) || nr < 0 || nr >= 100)) {
      setError("Non-response rate must be between 0 and 99.");
      return;
    }

    const calculated = calculateSampleSize(confidence, m, p, pop, nr);
    setResult(calculated);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-bg-card rounded-3xl p-8 md:p-10 border border-[var(--border)] shadow-lg mb-12">
        <form onSubmit={handleCalculate} className="space-y-8">
          
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Confidence Level */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Confidence Level
              </label>
              <p className="text-xs text-muted mb-3">How confident do you need to be that the true population value lies within your margin of error?</p>
              <div className="grid grid-cols-3 gap-3">
                {[90, 95, 99].map(level => (
                  <button 
                    key={level}
                    type="button"
                    onClick={() => setConfidence(level)}
                    className={`py-3 rounded-xl border font-bold transition-all ${confidence === level ? 'bg-gold text-bg-main border-gold' : 'bg-transparent text-text-primary border-[var(--border)] hover:border-gold/50'}`}
                  >
                    {level}%
                  </button>
                ))}
              </div>
            </div>

            {/* Margin of Error */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Margin of Error (%)
              </label>
              <p className="text-xs text-muted mb-3">The acceptable range (±) around your estimate. A 5% margin is standard.</p>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1" 
                  required
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-[var(--border)] text-text-primary outline-none focus:border-gold transition-colors"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted">%</span>
              </div>
            </div>

            {/* Expected Proportion */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Expected Proportion (%)
              </label>
              <p className="text-xs text-muted mb-3">Leave at 50% for the most conservative (largest) sample size if you are unsure.</p>
              <div className="relative">
                <input 
                  type="number" 
                  step="1"
                  required
                  value={proportion}
                  onChange={(e) => setProportion(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-[var(--border)] text-text-primary outline-none focus:border-gold transition-colors"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted">%</span>
              </div>
            </div>

            {/* Population Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-text-primary">
                  Known Population Size?
                </label>
                <button 
                  type="button" 
                  onClick={() => setIsFinite(!isFinite)}
                  className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full"
                >
                  {isFinite ? 'Disable' : 'Enable'}
                </button>
              </div>
              <p className="text-xs text-muted mb-3">Apply a finite population correction if your total target population is small.</p>
              {isFinite ? (
                <input 
                  type="number" 
                  step="1"
                  required={isFinite}
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full px-5 py-4 rounded-xl bg-transparent border border-[var(--border)] text-text-primary outline-none focus:border-gold transition-colors"
                />
              ) : (
                <div className="w-full px-5 py-4 rounded-xl bg-bg-main/50 border border-[var(--border)] text-muted italic">
                  Assuming large/unknown population
                </div>
              )}
            </div>

            {/* Non-response adjustment */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-text-primary">
                  Account for Non-response/Attrition?
                </label>
                <button 
                  type="button" 
                  onClick={() => setIsNonResponse(!isNonResponse)}
                  className="text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full"
                >
                  {isNonResponse ? 'Disable' : 'Enable'}
                </button>
              </div>
              <p className="text-xs text-muted mb-3">Estimate the percentage of participants who might drop out or not respond to calculate your initial recruitment target.</p>
              {isNonResponse && (
                <div className="relative md:w-1/2">
                  <input 
                    type="number" 
                    step="1"
                    required={isNonResponse}
                    value={nonResponseRate}
                    onChange={(e) => setNonResponseRate(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-transparent border border-[var(--border)] text-text-primary outline-none focus:border-gold transition-colors"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted">% expected loss</span>
                </div>
              )}
            </div>

          </div>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl bg-gold text-bg-main font-bold text-lg hover:bg-gold/90 transition-all mt-4"
          >
            Calculate Sample Size
          </button>
        </form>

        {result && (
          <div className="mt-12 p-8 bg-gradient-to-br from-bg-main to-bg-main/50 rounded-2xl border border-[var(--border)]">
            <h2 className="text-xl font-serif text-gold mb-6 text-center">Your Calculation Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              {isFinite && (
                <div className="p-4 border border-[var(--border)] rounded-xl bg-bg-card">
                  <div className="text-xs text-muted uppercase tracking-widest mb-2">Unadjusted</div>
                  <div className="text-2xl font-bold text-text-primary">{result.n0}</div>
                </div>
              )}
              
              <div className={`p-6 border border-gold/50 rounded-xl bg-gold/10 ${!isFinite && !isNonResponse ? 'md:col-span-3' : isFinite && isNonResponse ? '' : 'md:col-span-2'}`}>
                <div className="text-xs text-gold uppercase tracking-widest mb-2">Required Sample Size</div>
                <div className="text-5xl font-serif font-bold text-text-primary">{result.baseSample}</div>
                {isFinite && <div className="text-xs text-muted mt-2">After finite population correction</div>}
              </div>

              {isNonResponse && (
                <div className="p-4 border border-[var(--border)] rounded-xl bg-bg-card">
                  <div className="text-xs text-muted uppercase tracking-widest mb-2">Recruitment Target</div>
                  <div className="text-2xl font-bold text-text-primary">{result.adjustedSample}</div>
                  <div className="text-xs text-muted mt-2">To account for {nonResponseRate}% loss</div>
                </div>
              )}
            </div>
            
            <div className="bg-bg-card/50 p-6 rounded-xl border border-[var(--border)]">
              <h3 className="font-bold text-text-primary mb-2">How this works:</h3>
              <p className="text-sm text-muted mb-4">
                This calculation uses the standard formula for estimating a proportion: 
                <code className="mx-2 px-2 py-1 bg-bg-main rounded text-gold font-mono text-xs">n = Z²p(1-p) / E²</code>
              </p>
              <ul className="text-sm text-muted space-y-2 mb-4">
                <li><strong>Z (Critical Value):</strong> {confidence === 90 ? '1.645' : confidence === 95 ? '1.96' : '2.576'} (for {confidence}% confidence)</li>
                <li><strong>p (Expected Proportion):</strong> {parseFloat(proportion)/100}</li>
                <li><strong>E (Margin of Error):</strong> {parseFloat(margin)/100}</li>
              </ul>
              <p className="text-xs text-muted opacity-80 border-t border-[var(--border)] pt-4">
                <strong>Note:</strong> Sample size requirements are highly dependent on study design. 
                This tool provides an estimate for simple precision-based survey designs. It is not equivalent to a power analysis for hypothesis testing.
                If you are planning an experiment or complex statistical test, you may need a power analysis based on expected effect size.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-[var(--border)] rounded-2xl">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Planning a Hypothesis Test?</h3>
          <p className="text-sm text-muted mb-4">
            If you need to know which statistical test to run on your collected data, use our interactive test selector.
          </p>
          <Link href="/tools/statistical-test-selector" className="text-gold text-sm font-bold hover:underline">
            Use Statistical Test Selector ?
          </Link>
        </div>
        <div className="glass-card p-6 border border-[var(--border)] rounded-2xl">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Confused by the terminology?</h3>
          <p className="text-sm text-muted mb-4">
            Explore clear definitions of concepts like <em>margin of error</em>, <em>confidence interval</em>, and <em>population</em>.
          </p>
          <Link href="/research/glossary" className="text-gold text-sm font-bold hover:underline">
            Visit Research Glossary ?
          </Link>
        </div>
      </div>
    </div>
  );
}
