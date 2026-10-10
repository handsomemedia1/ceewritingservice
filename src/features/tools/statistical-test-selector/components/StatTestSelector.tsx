"use client";

import React, { useState, useEffect } from 'react';
import { trackToolStart, trackToolCompletion, trackToolAbandonment } from '../../utils/toolAnalytics';
import EducationalResult from './EducationalResult';

type QuestionStep = 'num_groups' | 'variable_type' | 'dependent' | 'result';

export default function StatTestSelector() {
  const [step, setStep] = useState<QuestionStep>('num_groups');
  const [numGroups, setNumGroups] = useState<string>('');
  const [variableType, setVariableType] = useState<string>('');
  const [dependent, setDependent] = useState<string>('');

  useEffect(() => {
    trackToolStart('stat_test_selector');
    return () => {
      if (step !== 'result') {
        trackToolAbandonment('stat_test_selector', step);
      }
    };
  }, [step]);

  const handleNext = (nextStep: QuestionStep, value: string) => {
    if (step === 'num_groups') setNumGroups(value);
    if (step === 'variable_type') setVariableType(value);
    if (step === 'dependent') {
      setDependent(value);
      trackToolCompletion('stat_test_selector', { numGroups, variableType, dependent: value });
    }
    setStep(nextStep);
  };

  const getRecommendation = () => {
    if (numGroups === '2' && variableType === 'continuous' && dependent === 'independent') return 'Independent T-Test';
    if (numGroups === '2' && variableType === 'continuous' && dependent === 'paired') return 'Paired T-Test';
    if (numGroups === '3+' && variableType === 'continuous' && dependent === 'independent') return 'One-Way ANOVA';
    if (numGroups === '3+' && variableType === 'continuous' && dependent === 'paired') return 'Repeated Measures ANOVA';
    if (variableType === 'categorical' && dependent === 'independent') return 'Chi-Square Test of Independence';
    
    return 'Consult a Statistician (Complex Design)';
  };

  const reset = () => {
    setStep('num_groups');
    setNumGroups('');
    setVariableType('');
    setDependent('');
  };

  return (
    <div className="w-full">
      {step === 'result' ? (
        <EducationalResult 
          recommendation={getRecommendation()} 
          onReset={reset} 
        />
      ) : (
        <div className="rounded-2xl border border-[rgba(197,160,89,0.18)] bg-[#141414] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] sm:p-8 md:p-10">
          {/* Header Step Counter */}
          <div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-6">
            <h2 className="text-lg font-bold text-white sm:text-2xl font-display">
              {step === 'num_groups' && 'How many comparison groups are in your study?'}
              {step === 'variable_type' && 'What measurement scale is your dependent variable?'}
              {step === 'dependent' && 'Are your sample groups independent or related (paired)?'}
            </h2>
            <div className="shrink-0 text-xs font-bold text-[#C5A059] bg-[rgba(197,160,89,0.1)] px-3 py-1.5 rounded-full border border-[rgba(197,160,89,0.25)]">
              Step {step === 'num_groups' ? 1 : step === 'variable_type' ? 2 : 3} of 3
            </div>
          </div>

          {/* Option Buttons */}
          <div className="grid gap-4">
            {step === 'num_groups' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNext('variable_type', '2')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">Exactly 2 groups</span>
                      <span className="mt-1 block text-xs text-[#888888]">e.g. Male vs Female, Treatment vs Control</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleNext('variable_type', '3+')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">3 or more groups</span>
                      <span className="mt-1 block text-xs text-[#888888]">e.g. Low, Medium, High income tiers, Multiple schools</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
              </>
            )}

            {step === 'variable_type' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNext('dependent', 'continuous')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">Continuous / Metric Data</span>
                      <span className="mt-1 block text-xs text-[#888888]">e.g. Exam Scores, Blood Pressure, Monthly Revenue, Age</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleNext('dependent', 'categorical')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">Categorical / Frequencies</span>
                      <span className="mt-1 block text-xs text-[#888888]">e.g. Yes/No choices, Employment status, Brand preferences</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
              </>
            )}

            {step === 'dependent' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNext('result', 'independent')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">Independent (Unrelated Samples)</span>
                      <span className="mt-1 block text-xs text-[#888888]">Distinct participants in each group (e.g. Lagos cohort vs Abuja cohort)</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleNext('result', 'paired')}
                  className="group w-full rounded-xl border border-[rgba(197,160,89,0.16)] bg-[#0A0A0A] p-5 text-left font-semibold text-[#EAEAEA] transition-all hover:border-[#C5A059] hover:bg-[rgba(197,160,89,0.06)] hover:shadow-[0_4px_20px_rgba(197,160,89,0.1)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold text-white group-hover:text-[#C5A059]">Related / Paired (Repeated Measures)</span>
                      <span className="mt-1 block text-xs text-[#888888]">Same participants measured across time (e.g. Pre-test vs Post-test)</span>
                    </div>
                    <span className="text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
