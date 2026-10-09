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
        <div className="rounded-2xl border border-[#d1d9cd] bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <div className="mb-8 flex items-center justify-between border-b border-[#e8efe5] pb-6">
            <h2 className="text-xl font-bold text-[#1a231d] sm:text-2xl">
              {step === 'num_groups' && 'How many groups are you comparing?'}
              {step === 'variable_type' && 'What type of data is your dependent variable?'}
              {step === 'dependent' && 'Are your groups independent or related (paired)?'}
            </h2>
            <div className="shrink-0 text-sm font-bold text-[#4a6b48] bg-[#edf2e9] px-3 py-1.5 rounded-full border border-[#d1d9cd]">
              Step {step === 'num_groups' ? 1 : step === 'variable_type' ? 2 : 3} of 3
            </div>
          </div>

          <div className="grid gap-4">
            {step === 'num_groups' && (
              <>
                <button onClick={() => handleNext('variable_type', '2')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  Exactly 2 groups (e.g., Male vs Female)
                </button>
                <button onClick={() => handleNext('variable_type', '3+')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  3 or more groups (e.g., Low, Medium, High)
                </button>
              </>
            )}

            {step === 'variable_type' && (
              <>
                <button onClick={() => handleNext('dependent', 'continuous')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  Continuous (e.g., Age, Test Scores, Height)
                </button>
                <button onClick={() => handleNext('dependent', 'categorical')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  Categorical (e.g., Yes/No, Colors, Brands)
                </button>
              </>
            )}

            {step === 'dependent' && (
              <>
                <button onClick={() => handleNext('result', 'independent')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  Independent (Different people in each group)
                </button>
                <button onClick={() => handleNext('result', 'paired')} className="w-full rounded-xl border border-[#d1d9cd] bg-[#fcfbf9] p-5 text-left font-semibold text-[#1a231d] transition-all hover:border-[#a2b29e] hover:bg-white hover:shadow-sm">
                  Related/Paired (Same people tested twice, e.g., Pre-test & Post-test)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
