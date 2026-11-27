'use client';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ExpertGuidance from '@/features/scholarship/components/ExpertGuidance';
import LeadCaptureOptions from '@/features/scholarship/components/LeadCaptureOptions';
import ActionPlanTabs from '@/app/scholarship-check/components/ActionPlanTabs';
import CrossTrackBars from '@/app/scholarship-check/components/CrossTrackBars';
import { loadProgress } from '@/features/scholarship/utils/storage';
import { computeAssessment, answeredCount, trackQuestions } from '@/features/scholarship/utils/results';
import { useScholarship } from '@/lib/ScholarshipContext';
import { TRACKS, getBandColor } from '@/app/scholarship-check/constants';
import type { Answer, Question, ScoreResult, TrackId } from '@/app/scholarship-check/types';

const GOLD = '#C5A059';
const eyebrow: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(197,160,89,0.7)',
  marginBottom: '20px',
};
const sectionTitle: React.CSSProperties = {
  fontSize: 'clamp(20px, 2.4vw, 26px)',
  fontWeight: 700,
  color: '#EAEAEA',
  marginBottom: '24px',
};
const IMPACT_COLOR: Record<string, string> = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#10b981' };
const BAND_WORD: Record<string, string> = { green: 'Competitive', yellow: 'Almost ready', orange: 'Needs work', red: 'Not ready yet' };

const titleCase = (s: string) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

type Computed = { result: ScoreResult; answers: Record<string, Answer>; gates: Question[] };

function ResultsContent() {
  const searchParams = useSearchParams();
  const param = searchParams?.get('track') ?? '';
  const trackId = (param in TRACKS ? param : null) as TrackId | null;
  const { state: { profile, leadId } } = useScholarship();
  const [data, setData] = useState<Computed | null>(null);
  const [isReady, setIsReady] = useState(false);
  const saved = useRef(false);

  useEffect(() => {
    const progress = loadProgress();
    if (trackId && progress?.track === trackId) {
      const raw = progress.answers ?? {};
      // Only score a substantially completed assessment.
      if (answeredCount(trackId, raw) >= Math.ceil(trackQuestions(trackId).length / 2)) {
        setData(computeAssessment(trackId, raw, profile));
      }
    }
    setIsReady(true);
  }, [trackId, profile]);

  // Store the session against the lead (the server recomputes the score itself).
  useEffect(() => {
    if (!data || !trackId || !profile || saved.current) return;
    saved.current = true;
    fetch('/api/scholarship/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, track: trackId, profile, answers: data.answers }),
    }).catch(() => {});
  }, [data, trackId, profile, leadId]);

  if (!isReady) return null;

  if (!trackId || !data) {
    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <h1 className="font-space" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#EAEAEA', marginBottom: '20px' }}>
          No completed assessment found
        </h1>
        <p className="font-inter" style={{ fontSize: '16px', lineHeight: 1.7, color: '#888888', marginBottom: '32px' }}>
          Your results are calculated from your answers on this device. Finish an assessment to see your score, gaps and action plan.
        </p>
        <Link
          href={trackId ? `/scholarship-check/${trackId}` : '/scholarship-check/tracks'}
          className="font-space"
          style={{ display: 'inline-block', padding: '16px 32px', backgroundColor: GOLD, color: '#0A0A0A', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
        >
          {trackId ? 'Continue assessment' : 'Choose a scholarship'}
        </Link>
      </div>
    );
  }

  const { result, gates } = data;
  const track = TRACKS[trackId];
  const score = result.finalScore;
  const color = getBandColor(result.band);
  const circumference = 2 * Math.PI * 68;

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', paddingLeft: 'clamp(16px, 6vw, 80px)', paddingRight: 'clamp(16px, 6vw, 80px)' }}>
      {/* Score hero */}
      <section
        className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_280px]"
        style={{ paddingBottom: '56px', borderBottom: '1px solid rgba(197,160,89,0.15)', marginBottom: '56px' }}
      >
        <div>
          <p className="font-space" style={eyebrow}>{track.name}: assessment complete</p>
          <h1 className="font-space" style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#EAEAEA', marginBottom: '20px' }}>
            {result.bandInfo.label}
          </h1>
          <p className="font-inter" style={{ fontSize: '16px', lineHeight: 1.8, color: '#999999', fontWeight: 300 }}>
            This score weighs your answers the way {track.name} reviewers weigh an application. Your self-ratings on the written
            questions are used as given, so treat it as an honest starting point, not a guarantee.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '16px' }}>
            <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
              <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(197,160,89,0.1)" strokeWidth="8" />
              <circle cx="80" cy="80" r="68" fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${circumference}`} strokeDashoffset={`${circumference * (1 - score / 100)}`} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-space" style={{ fontSize: '52px', fontWeight: 700, color, lineHeight: 1 }}>{score}</span>
              <span className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#777777' }}>/ 100</span>
            </div>
          </div>
          <span className="font-space" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color }}>
            {BAND_WORD[result.band]}
          </span>
        </div>
      </section>

      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', minWidth: 0 }}>
          {gates.length > 0 && (
            <section role="alert" style={{ border: '1px solid rgba(239,68,68,0.4)', borderLeft: '3px solid #ef4444', padding: '24px' }}>
              <h2 className="font-space" style={{ ...sectionTitle, fontSize: '20px', marginBottom: '12px' }}>Eligibility issues to resolve first</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: 0, listStyle: 'none' }}>
                {gates.map((q) => (
                  <li key={q.id} className="font-inter" style={{ fontSize: '15px', lineHeight: 1.7, color: '#CCCCCC' }}>
                    {q.gateFailMessage ?? `You answered "no" to: ${q.text}`}
                    {q.gateRecommendedTrack && TRACKS[q.gateRecommendedTrack] && (
                      <> <Link href={`/scholarship-check/${q.gateRecommendedTrack}`} style={{ color: GOLD }}>Try the {TRACKS[q.gateRecommendedTrack].name} check →</Link></>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <p className="font-space" style={eyebrow}>Score breakdown</p>
            <h2 className="font-space" style={sectionTitle}>How each area scored</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {result.categoryScores.map((c) => (
                <div key={c.category}>
                  <div className="font-inter" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '14px', color: '#CCCCCC', marginBottom: '8px' }}>
                    <span>{titleCase(c.category)} <span style={{ color: '#666666' }}>· {Math.round(c.weight * 100)}% of score</span></span>
                    <span className="font-space" style={{ fontWeight: 700, color: '#EAEAEA' }}>{c.rawScore}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(197,160,89,0.1)' }}>
                    <div style={{ width: `${c.rawScore}%`, height: '100%', backgroundColor: c.rawScore >= 75 ? '#10b981' : c.rawScore >= 50 ? GOLD : '#f97316' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {result.strengths.length > 0 && (
            <section>
              <p className="font-space" style={eyebrow}>What is working</p>
              <h2 className="font-space" style={sectionTitle}>Your strengths</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: 0, listStyle: 'none' }}>
                {result.strengths.map((s) => (
                  <li key={s} className="font-inter" style={{ fontSize: '15px', lineHeight: 1.7, color: '#CCCCCC', paddingLeft: '18px', borderLeft: '2px solid #10b981' }}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {result.gaps.length > 0 && (
            <section>
              <p className="font-space" style={eyebrow}>What to fix</p>
              <h2 className="font-space" style={sectionTitle}>Your gaps, most important first</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {result.gaps.map((g) => (
                  <article key={g.area + g.description} style={{ border: '1px solid rgba(197,160,89,0.12)', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <h3 className="font-space" style={{ fontSize: '16px', fontWeight: 700, color: '#EAEAEA' }}>{titleCase(g.area)}</h3>
                      <span className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', padding: '3px 8px', border: `1px solid ${IMPACT_COLOR[g.impact]}`, color: IMPACT_COLOR[g.impact] }}>
                        {g.impact} IMPACT
                      </span>
                    </div>
                    <p className="font-inter" style={{ fontSize: '15px', lineHeight: 1.7, color: '#999999', marginBottom: '10px' }}>{g.description}</p>
                    <p className="font-inter" style={{ fontSize: '15px', lineHeight: 1.7, color: '#DDDDDD' }}><strong style={{ color: GOLD }}>Do this:</strong> {g.recommendation}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section>
            <p className="font-space" style={eyebrow}>Your 90-day action plan</p>
            <h2 className="font-space" style={sectionTitle}>What to do next</h2>
            <ActionPlanTabs plan={result.actionPlan} />
          </section>

          {result.crossTrackScores.length > 0 && (
            <section>
              <p className="font-space" style={eyebrow}>Other scholarships</p>
              <h2 className="font-space" style={sectionTitle}>How you might fare elsewhere</h2>
              <p className="font-inter" style={{ fontSize: '14px', lineHeight: 1.7, color: '#888888', marginBottom: '20px' }}>
                Estimates from the same answers. Take the full check for any of these to get an accurate score.
              </p>
              <CrossTrackBars scores={result.crossTrackScores} />
            </section>
          )}

          <ExpertGuidance />
        </div>

        <aside className="lg:sticky lg:top-[100px]" style={{ borderTop: '1px solid rgba(197,160,89,0.1)', paddingTop: '32px' }}>
          <LeadCaptureOptions />
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
            <p className="font-space" style={{ ...eyebrow, marginBottom: '16px' }}>Try another track</p>
            <Link
              href="/scholarship-check/tracks"
              className="font-space"
              style={{ display: 'block', padding: '14px 20px', border: '1px solid rgba(197,160,89,0.25)', color: '#EAEAEA', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}
            >
              Check another scholarship →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(197,160,89,0.1)',
          padding: '18px clamp(16px, 6vw, 100px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        }}
      >
        <Link href="/scholarship-check" style={{ textDecoration: 'none' }}>
          <span className="font-space" style={{ fontSize: '13px', fontWeight: 700, color: '#EAEAEA' }}>Cee Writing</span>
        </Link>
        <span className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)' }}>
          Your results
        </span>
        <Link href="/scholarship-check" className="font-space" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#777777', textDecoration: 'none' }}>
          Done
        </Link>
      </header>

      <div style={{ flex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
        <Suspense
          fallback={
            <p className="font-space" style={{ textAlign: 'center', padding: '120px 0', color: '#666666', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Calculating your results...
            </p>
          }
        >
          <ResultsContent />
        </Suspense>
      </div>
    </main>
  );
}
