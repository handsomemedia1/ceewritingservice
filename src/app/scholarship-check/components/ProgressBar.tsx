'use client';

import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const fillPercent = totalSteps > 1
    ? ((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 100
    : 0;

  return (
    <div className="sc-progress">
      {/* Connecting bar */}
      <div className="sc-progress-bar">
        <div
          className="sc-progress-fill"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      {/* Steps */}
      {labels.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        let className = 'sc-progress-step';
        if (isCompleted) className += ' completed';
        else if (isActive) className += ' active';

        return (
          <div key={i} className={className}>
            <div className="sc-progress-step-circle">
              {isCompleted ? (
                <Check size={18} strokeWidth={3} />
              ) : (
                stepNum
              )}
            </div>
            <span className="sc-progress-step-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
