"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScholarship } from '@/lib/ScholarshipContext';
import { TRACK_QUESTIONS } from '../questions';
import { TRACKS } from '../constants';
import ProgressBar from '../components/ProgressBar';
import SelfScoreQuestion from '../components/SelfScoreQuestion';
import GateBlock from '../components/GateBlock';
import WorkExperienceCalculator from '../components/WorkExperienceCalculator';
import type { Answer, Question, TrackId, EmploymentPeriod } from '../types';

interface AssessmentPageProps {
  trackId: TrackId;
}

export default function AssessmentPage({ trackId }: AssessmentPageProps) {
  const router = useRouter();
  const { state, dispatch } = useScholarship();
  const [mounted, setMounted] = useState(false);
  
  const track = TRACKS[trackId];
  const sections = TRACK_QUESTIONS[trackId];
  
  const currentSection = sections[state.currentSectionIndex];

  useEffect(() => {
    setMounted(true);
    if (!state.profile) {
      router.push('/scholarship-check/profile');
    }
  }, [state.profile, router]);

  const handleAnswer = (answer: Answer) => {
    dispatch({ type: 'SAVE_ANSWER', payload: answer });
    
    // Check gate failure immediately
    const question = currentSection.questions.find(q => q.id === answer.questionId);
    if (question?.type === 'gate' && answer.value === false) {
      dispatch({ type: 'GATE_FAILED', payload: question.id });
    }
  };

  const handleNextSection = async () => {
    // Basic validation — ensure all required questions in this section have answers
    const missingRequired = currentSection.questions.some(q => {
      if (!q.required) return false;
      const ans = state.answers[q.id];
      if (!ans) return true;
      if (q.type === 'self-score-text' && (!ans.selfScore || !ans.textAnswer)) return true;
      if (q.type === 'checklist' && (!ans.checklistChecked || ans.checklistChecked.length === 0)) return true;
      return false;
    });

    if (missingRequired) {
      alert("Please answer all required questions before proceeding.");
      return;
    }

    if (state.currentSectionIndex < sections.length - 1) {
      dispatch({ type: 'SET_SECTION', payload: state.currentSectionIndex + 1 });
      window.scrollTo(0, 0);
    } else {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Find all self-score-text questions
        const textQuestions = sections.flatMap(s => s.questions).filter(q => q.type === 'self-score-text');
        
        // Phase 1: Call mock AI evaluation for each text question
        for (const q of textQuestions) {
          const ans = state.answers[q.id];
          if (ans && ans.textAnswer && ans.selfScore) {
            const res = await fetch('/api/scholarship/evaluate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                trackId,
                questionId: q.id,
                selfScore: ans.selfScore,
                textAnswer: ans.textAnswer,
              }),
            });
            const evaluation = await res.json();
            dispatch({ type: 'SET_AI_EVALUATION', payload: { questionId: q.id, evaluation } });
          }
        }
        
        // Then call results API to calculate and store everything
        const res = await fetch('/api/scholarship/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: state.leadId,
            track: trackId,
            profile: state.profile,
            answers: state.answers, // pass the latest state answers
            // Note: the backend will compute final scores, but we could also compute them here and pass them.
            // For now, let the backend or results page do the scoring logic if needed.
            // (Assuming /api/scholarship/results computes everything and returns it, or we compute locally)
          }),
        });
        
        const data = await res.json();
        
        // For Phase 1, if backend doesn't fully compute, we'll do it locally or rely on mock backend.
        // Let's assume the backend returns the full ScoreResult object
        if (data.results) {
           dispatch({ type: 'SET_RESULTS', payload: data.results });
           import('@/lib/analytics').then(({ trackEvent }) => {
             trackEvent('scholarship_assessment_completed', { score: data.results?.totalScore ?? 0 });
           });
        }
        
        router.push('/scholarship-check/results');
        
      } catch (err) {
        console.error("Error submitting assessment", err);
        dispatch({ type: 'SET_LOADING', payload: false });
        alert("An error occurred while submitting your assessment.");
      }
    }
  };

  const handlePrevSection = () => {
    if (state.currentSectionIndex > 0) {
      dispatch({ type: 'SET_SECTION', payload: state.currentSectionIndex - 1 });
      window.scrollTo(0, 0);
    }
  };

  if (!mounted || !state.profile) return null;

  if (state.gatePassed === false && state.gateFailedAt) {
    const failedQuestion = sections.flatMap(s => s.questions).find(q => q.id === state.gateFailedAt);
    return (
      <div className="sc-page">
        <Navbar />
        <main className="sc-container sc-section">
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
            <GateBlock
              message={failedQuestion?.gateFailMessage || "You do not meet the eligibility requirements for this scholarship."}
              recommendedTrack={failedQuestion?.gateRecommendedTrack as any}
              onContinue={() => dispatch({ type: 'GATE_PASSED' })}
              onSwitch={(t) => {
                dispatch({ type: 'SELECT_TRACK', payload: t as any });
                router.push(`/scholarship-check/${t}`);
              }}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderQuestion = (q: Question) => {
    const answer = state.answers[q.id];

    switch (q.type) {
      case 'gate':
        return (
          <div key={q.id} className="sc-form-group">
            <label className="sc-label">{q.text} {q.required && <span className="sc-required">*</span>}</label>
            {q.helpText && <p className="sc-help-text">{q.helpText}</p>}
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <button 
                className={`sc-gate-btn sc-gate-btn-yes ${answer?.value === true ? 'selected' : ''}`}
                onClick={() => handleAnswer({ questionId: q.id, type: q.type, value: true })}
              >Yes</button>
              <button 
                className={`sc-gate-btn sc-gate-btn-no ${answer?.value === false ? 'selected' : ''}`}
                onClick={() => handleAnswer({ questionId: q.id, type: q.type, value: false })}
              >No</button>
            </div>
          </div>
        );
      
      case 'objective':
      case 'country-route':
        return (
          <div key={q.id} className="sc-form-group">
            <label className="sc-label">{q.text} {q.required && <span className="sc-required">*</span>}</label>
            {q.helpText && <p className="sc-help-text">{q.helpText}</p>}
            {q.type === 'country-route' && state.profile?.country === 'Nigeria' && (
              <p style={{background: 'rgba(201,147,58,0.1)', padding: '12px', borderRadius: '8px', fontSize: '14px', marginTop: '8px'}}>
                Note for Nigeria: Fulbright FFSP targets PhD students/faculty. Masters applicants should use the Open Study Award.
              </p>
            )}
            <input 
              type="text" 
              className="sc-input" 
              value={(answer?.value as string) || ''} 
              onChange={(e) => handleAnswer({ questionId: q.id, type: q.type, value: e.target.value })}
            />
          </div>
        );

      case 'select':
        return (
          <div key={q.id} className="sc-form-group">
            <label className="sc-label">{q.text} {q.required && <span className="sc-required">*</span>}</label>
            {q.helpText && <p className="sc-help-text">{q.helpText}</p>}
            <select 
              className="sc-select" 
              value={(answer?.value as string) || ''} 
              onChange={(e) => handleAnswer({ questionId: q.id, type: q.type, value: e.target.value })}
            >
              <option value="">Select an option...</option>
              {q.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      
      case 'number':
        return (
          <div key={q.id} className="sc-form-group">
            <label className="sc-label">{q.text} {q.required && <span className="sc-required">*</span>}</label>
            {q.helpText && <p className="sc-help-text">{q.helpText}</p>}
            <input 
              type="number" 
              className="sc-input" 
              value={(answer?.value as number) || ''} 
              onChange={(e) => handleAnswer({ questionId: q.id, type: q.type, value: Number(e.target.value) })}
            />
          </div>
        );

      case 'self-score-text':
        return (
          <SelfScoreQuestion 
            key={q.id} 
            question={q} 
            answer={answer} 
            onAnswer={handleAnswer} 
          />
        );

      case 'checklist':
        return (
          <div key={q.id} className="sc-form-group">
            <label className="sc-label">{q.text} {q.required && <span className="sc-required">*</span>}</label>
            {q.helpText && <p className="sc-help-text">{q.helpText}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              {q.checklistItems?.map(item => {
                const checked = answer?.checklistChecked?.includes(item) || false;
                return (
                  <label key={item} className="sc-checkbox">
                    <input 
                      type="checkbox" 
                      checked={checked}
                      onChange={(e) => {
                        const current = answer?.checklistChecked || [];
                        const next = e.target.checked 
                          ? [...current, item] 
                          : current.filter(i => i !== item);
                        handleAnswer({ questionId: q.id, type: q.type, checklistChecked: next });
                      }}
                    />
                    <span className="checkmark"></span>
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 'calculator':
        return (
          <div key={q.id} style={{ marginBottom: '32px' }}>
            <label className="sc-label">{q.text}</label>
            {q.helpText && <p className="sc-help-text" style={{marginBottom: '16px'}}>{q.helpText}</p>}
            <WorkExperienceCalculator 
              periods={state.employmentPeriods}
              onAdd={(p) => dispatch({ type: 'ADD_EMPLOYMENT_PERIOD', payload: p })}
              onRemove={(id) => dispatch({ type: 'REMOVE_EMPLOYMENT_PERIOD', payload: id })}
              onUpdate={(p) => dispatch({ type: 'UPDATE_EMPLOYMENT_PERIOD', payload: p })}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sc-page">
      <Navbar />
      
      {state.isLoading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,20,40,0.8)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div className="loader-ring"></div>
          <p style={{ color: 'white', marginTop: '20px', fontSize: '18px', fontWeight: 600 }}>Analyzing your responses...</p>
        </div>
      )}

      <main className="sc-container sc-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
          <ProgressBar
            currentStep={3}
            totalSteps={3}
            labels={['About You', 'Choose Track', 'Assessment']}
          />

          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }} className="reveal visible">
            <span style={{ fontSize: '32px' }}>{track.flag}</span>
            <h1 className="section-title" style={{ margin: 0, fontSize: '32px' }}>{track.name} Assessment</h1>
          </div>
          
          <div className="sc-section-nav" style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="section-label" style={{ margin: 0 }}>Section {state.currentSectionIndex + 1} of {sections.length}</span>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>~{currentSection.estimatedMinutes} mins</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '24px' }}>
              {currentSection.title}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {currentSection.questions.map(q => (
                <div key={q.id} className="glass-card-light" style={{ padding: '32px' }}>
                  {renderQuestion(q)}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button 
              className="btn-glass" 
              onClick={handlePrevSection}
              style={{ opacity: state.currentSectionIndex === 0 ? 0 : 1, pointerEvents: state.currentSectionIndex === 0 ? 'none' : 'all' }}
            >
              ← Previous
            </button>
            <button 
              className="btn-gold" 
              onClick={handleNextSection}
            >
              <span>{state.currentSectionIndex === sections.length - 1 ? 'Complete Assessment →' : 'Next Section →'}</span>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
