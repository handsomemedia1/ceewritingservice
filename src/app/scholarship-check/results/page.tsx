"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScholarship } from '@/lib/ScholarshipContext';
import ScoreDisplay from '../components/ScoreDisplay';
import CalibrationTable from '../components/CalibrationTable';
import CrossTrackBars from '../components/CrossTrackBars';
import ActionPlanTabs from '../components/ActionPlanTabs';

export default function ResultsPage() {
  const router = useRouter();
  const { state } = useScholarship();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!state.results) {
      router.push('/scholarship-check');
    }
  }, [state.results, router]);

  if (!mounted || !state.results) return null;

  const { results } = state;

  return (
    <div className="sc-page">
      <Navbar />
      
      <main className="sc-container sc-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '40px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal visible">
            <h1 className="section-title">Your Readiness Report</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Based on your assessment for {results.trackName || results.track}
            </p>
          </div>

          {/* Section 1: Scorecard */}
          <section className="glass-card-light reveal visible" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
            <ScoreDisplay score={results.finalScore} band={results.band} label={results.bandInfo.label} />
          </section>

          {/* Section 2: Strengths */}
          {results.strengths && results.strengths.length > 0 && (
            <section className="reveal visible" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Your Strengths</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.strengths.map((str, i) => (
                  <div key={i} className="sc-strength-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ color: '#10b981' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Gap Analysis */}
          {results.gaps && results.gaps.length > 0 && (
            <section className="reveal visible" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Gap Analysis</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {results.gaps.map((gap, i) => (
                  <div key={i} className={`sc-gap-item sc-gap-impact-${gap.impact.toLowerCase()}`} style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: `4px solid ${gap.impact === 'HIGH' ? '#ef4444' : gap.impact === 'MEDIUM' ? '#f59e0b' : '#eab308'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{gap.area}</h3>
                      <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', background: gap.impact === 'HIGH' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: gap.impact === 'HIGH' ? '#ef4444' : '#f59e0b' }}>
                        {gap.impact} IMPACT
                      </span>
                    </div>
                    <p style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>{gap.description}</p>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
                      <strong>Recommendation:</strong> {gap.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 4: Calibration Table */}
          {results.calibrationEntries && results.calibrationEntries.length > 0 && (
            <section className="reveal visible" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Self-Assessment Calibration</h2>
              <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>We compared how you rated yourself against our AI's evaluation of your actual answers.</p>
              <CalibrationTable entries={results.calibrationEntries} />
            </section>
          )}

          {/* Section 5: Cross-Track Comparison */}
          {results.crossTrackScores && results.crossTrackScores.length > 0 && (
            <section className="reveal visible" style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Cross-Track Comparison</h2>
              <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>Here is an estimate of how your profile compares across other major scholarships.</p>
              <CrossTrackBars scores={results.crossTrackScores} />
            </section>
          )}

          {/* Section 6: Action Plan */}
          {results.actionPlan && (
            <section className="reveal visible" style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Your Action Plan</h2>
              <ActionPlanTabs plan={results.actionPlan} />
            </section>
          )}

          {/* Section 7: Document Review CTA */}
          <section className="sc-document-cta reveal visible" style={{ background: 'var(--navy)', color: 'white', padding: '40px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
            <div className="gradient-mesh" style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '16px', color: 'var(--gold-light)' }}>
                Get Line-by-Line Document Review
              </h2>
              <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px auto', color: 'rgba(255,255,255,0.8)' }}>
                Upload your CV and Statement of Purpose for personalised line-by-line feedback against {results.trackName || results.track}'s actual selection criteria.
              </p>
              <button className="btn-gold" disabled style={{ opacity: 0.7, cursor: 'not-allowed' }} title="Coming soon in Phase 2">
                <span>Upload Documents — Free (Coming Soon)</span>
              </button>
            </div>
          </section>

          {/* Section 8: Email Confirmation */}
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '14px', marginBottom: '40px' }}>
            Your full report has been sent to {state.profile?.email}.
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
