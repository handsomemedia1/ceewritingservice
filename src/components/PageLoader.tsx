"use client";
import React, { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #061428, #0B1F3A)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Floating orbs in loader */}
      <div style={{
        position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(201,147,58,0.15)', filter: 'blur(80px)',
        top: '20%', right: '15%', animation: 'orbFloat1 4s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
        background: 'rgba(30,80,160,0.12)', filter: 'blur(60px)',
        bottom: '20%', left: '20%', animation: 'orbFloat2 5s ease-in-out infinite alternate',
      }} />

      {/* Logo */}
      <div style={{
        position: 'relative', zIndex: 2,
        animation: 'loaderPulse 1.5s ease-in-out infinite',
      }}>
        <img
          src="/logo.png"
          alt="Cee Writing Services"
          style={{
            width: '120px', height: '120px', borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 0 40px rgba(201,147,58,0.3), 0 0 80px rgba(201,147,58,0.15)',
          }}
        />
      </div>

      {/* Loading bar */}
      <div style={{
        width: '160px', height: '3px', borderRadius: '10px',
        background: 'rgba(255,255,255,0.08)', marginTop: '32px',
        overflow: 'hidden', position: 'relative', zIndex: 2,
      }}>
        <div style={{
          height: '100%', borderRadius: '10px',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          animation: 'loaderBar 1.8s ease-in-out forwards',
        }} />
      </div>

      <p style={{
        marginTop: '16px', fontSize: '12px', fontWeight: 500,
        letterSpacing: '3px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)', position: 'relative', zIndex: 2,
      }}>
        Loading...
      </p>
    </div>
  );
}
