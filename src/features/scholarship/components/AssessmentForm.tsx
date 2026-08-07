'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveProgress, loadProgress } from '../utils/storage';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';
import { TRACK_QUESTIONS as QUESTIONS } from '@/app/scholarship-check/questions';
import { TRACKS } from '@/app/scholarship-check/constants';
import type { TrackId, QuestionSection } from '@/app/scholarship-check/types';

interface AssessmentFormProps {
  trackId: TrackId;
}

export default function AssessmentForm({ trackId }: AssessmentFormProps) {
  const router = useRouter();
  const track = TRACKS[trackId];
  
  const sections: QuestionSection[] = QUESTIONS[trackId] as QuestionSection[] || [];
  const allQuestions = sections.flatMap(s => s.questions);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.track === trackId) {
      setCurrentStep(saved.currentStep);
      setAnswers(saved.answers);
    } else {
      trackEvent(AnalyticsEvents.ASSESSMENT_START, { trackId });
    }
    setIsLoaded(true);
  }, [trackId]);

  useEffect(() => {
    if (isLoaded) {
      saveProgress({ track: trackId, currentStep, answers, lastUpdated: Date.now() });
    }
  }, [currentStep, answers, isLoaded, trackId]);

  const handleSelect = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    trackEvent(AnalyticsEvents.ASSESSMENT_STEP_COMPLETED, { trackId, step: currentStep });
    if (currentStep < allQuestions.length - 1) {
      setCurrentStep(curr => curr + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      trackEvent(AnalyticsEvents.ASSESSMENT_COMPLETED, { trackId });
      router.push(`/scholarship-check/results?track=${trackId}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isLoaded || !allQuestions.length) return null;

  const currentQuestion = allQuestions[currentStep];
  const progressPercent = Math.round(((currentStep) / allQuestions.length) * 100);
  const currentAnswer = answers[currentQuestion.id];
  const isLastQuestion = currentStep === allQuestions.length - 1;

  const isAnswered = currentQuestion.type === 'self-score-text'
    ? (!!currentAnswer && !!answers[`${currentQuestion.id}_score`])
    : !!currentAnswer;

  return (
    <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>

      {/* Question counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '48px',
        }}
      >
        <span
          className="font-space"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.6)',
          }}
        >
          Question {currentStep + 1} / {allQuestions.length}
        </span>
        <span
          className="font-space"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#555555',
          }}
        >
          {progressPercent}% Complete
        </span>
      </div>

      {/* Question text */}
      <div style={{ position: 'relative', marginBottom: '48px' }}>
        {/* Watermark step number */}
        <span
          className="font-space"
          style={{
            position: 'absolute',
            top: '-40px',
            left: '-8px',
            fontSize: 'clamp(80px, 12vw, 160px)',
            fontWeight: 700,
            color: 'rgba(197,160,89,0.04)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {String(currentStep + 1).padStart(2, '0')}
        </span>
        <h2
          className="font-space"
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: 'clamp(22px, 3.5vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#EAEAEA',
            marginBottom: '16px',
          }}
        >
          {currentQuestion.text}
        </h2>
        {currentQuestion.helpText && (
          <p
            className="font-inter"
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: '#777777',
              fontStyle: 'italic',
              fontWeight: 300,
            }}
          >
            {currentQuestion.helpText}
          </p>
        )}
      </div>

      {/* Answer options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '56px' }}>
        {currentQuestion.type === 'number' ? (
          <div>
            <input
              type="number"
              value={currentAnswer || ''}
              onChange={(e) => handleSelect(currentQuestion.id, e.target.value)}
              className="font-inter"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(197,160,89,0.3)',
                padding: '20px 0',
                color: '#EAEAEA',
                fontSize: '28px',
                fontWeight: 300,
                outline: 'none',
                caretColor: '#C5A059',
                transition: 'border-color 0.3s ease',
              }}
              placeholder="Enter value..."
              onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#C5A059'; }}
              onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(197,160,89,0.3)'; }}
            />
          </div>
        ) : currentQuestion.type === 'self-score-text' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Score buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[1, 2, 3, 4].map(score => {
                const labels = ['Not\ndeveloped', 'Somewhat\ndeveloped', 'Well\ndeveloped', 'Polished'];
                const isSelected = answers[`${currentQuestion.id}_score`] === score;
                return (
                  <button
                    key={score}
                    onClick={() => handleSelect(`${currentQuestion.id}_score`, score)}
                    className="font-space"
                    style={{
                      padding: '20px 12px',
                      border: '1px solid',
                      borderColor: isSelected ? '#C5A059' : 'rgba(197,160,89,0.15)',
                      borderLeft: isSelected ? '3px solid #C5A059' : '1px solid rgba(197,160,89,0.15)',
                      backgroundColor: isSelected ? 'rgba(197,160,89,0.06)' : 'transparent',
                      color: isSelected ? '#C5A059' : '#666666',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.4,
                    }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px', color: isSelected ? '#C5A059' : '#EAEAEA' }}>{score}</div>
                    {labels[score - 1]}
                  </button>
                );
              })}
            </div>
            {/* Text area */}
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => handleSelect(currentQuestion.id, e.target.value)}
              className="font-inter"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(197,160,89,0.2)',
                padding: '20px 0',
                color: '#EAEAEA',
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: 1.7,
                outline: 'none',
                minHeight: '120px',
                resize: 'vertical',
                caretColor: '#C5A059',
              }}
              placeholder="Briefly explain your score with a specific example..."
            />
          </div>
        ) : (
          currentQuestion.options?.map((opt) => {
            const isSelected = currentAnswer === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(currentQuestion.id, opt.value)}
                className="font-inter"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '20px 24px',
                  backgroundColor: isSelected ? 'rgba(197,160,89,0.06)' : 'transparent',
                  border: '1px solid',
                  borderColor: isSelected ? 'rgba(197,160,89,0.4)' : 'rgba(197,160,89,0.1)',
                  borderLeft: isSelected ? '3px solid #C5A059' : '1px solid rgba(197,160,89,0.1)',
                  color: isSelected ? '#EAEAEA' : '#AAAAAA',
                  fontSize: '16px',
                  fontWeight: isSelected ? 600 : 300,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  lineHeight: 1.5,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderLeftColor = 'rgba(197,160,89,0.3)';
                    e.currentTarget.style.borderLeftWidth = '3px';
                    e.currentTarget.style.color = '#CCCCCC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderLeftColor = 'rgba(197,160,89,0.1)';
                    e.currentTarget.style.borderLeftWidth = '1px';
                    e.currentTarget.style.color = '#AAAAAA';
                  }
                }}
              >
                {opt.label}
              </button>
            );
          })
        )}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '40px',
          borderTop: '1px solid rgba(197,160,89,0.1)',
        }}
      >
        <button
          onClick={handleBack}
          className="font-space"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: currentStep === 0 ? 'transparent' : '#666666',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: currentStep === 0 ? 'default' : 'pointer',
            padding: '12px 0',
            transition: 'color 0.2s ease',
            pointerEvents: currentStep === 0 ? 'none' : 'auto',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="font-space"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 40px',
            backgroundColor: isAnswered ? '#C5A059' : 'rgba(197,160,89,0.15)',
            color: isAnswered ? '#0A0A0A' : '#555555',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: isAnswered ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          {isLastQuestion ? 'Reveal Results' : 'Next Question'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

    </div>
  );
}
