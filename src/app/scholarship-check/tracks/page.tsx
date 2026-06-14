"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScholarship } from '@/lib/ScholarshipContext';
import { TRACKS, TRACK_ORDER } from '../constants';
import { checkTrackEligibility } from '../eligibility';
import ProgressBar from '../components/ProgressBar';
import TrackCard from '../components/TrackCard';

export default function TracksPage() {
  const router = useRouter();
  const { state, dispatch } = useScholarship();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!state.profile) {
      router.push('/scholarship-check/profile');
    }
  }, [state.profile, router]);

  const handleSelectTrack = (trackId: keyof typeof TRACKS) => {
    // We cast it to any because the context type is strict but this matches
    dispatch({ type: 'SELECT_TRACK', payload: trackId as any });
    router.push(`/scholarship-check/${trackId}`);
  };

  if (!mounted || !state.profile) return null;

  return (
    <div className="sc-page">
      <Navbar />
      
      <main className="sc-container sc-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
          <ProgressBar
            currentStep={2}
            totalSteps={3}
            labels={['About You', 'Choose Track', 'Assessment']}
          />

          <div style={{ marginTop: '60px', textAlign: 'center' }} className="reveal visible">
            <h1 className="section-title">Which scholarship are you targeting?</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Select one to begin. You can return to check others after.
            </p>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="reveal visible">
            {TRACK_ORDER.map((trackId) => {
              const track = TRACKS[trackId];
              const eligibility = checkTrackEligibility(trackId, state.profile!);
              
              return (
                <TrackCard
                  key={trackId}
                  track={track}
                  eligibility={eligibility}
                  onClick={() => handleSelectTrack(trackId)}
                />
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
