"use client";
import React, { useEffect, useState } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill up to 100% quickly over ~1.2s
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + (Math.random() * 12 + 3);
      });
    }, 50);

    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for the split-screen animation to finish before unmounting
      setTimeout(() => setLoading(false), 1000);
    }, 1500);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Left Panel */}
      <div 
        style={{ 
          flex: 1, 
          background: '#0A0A0A', 
          transform: fadeOut ? 'translateX(-100%)' : 'translateX(0)', 
          transition: 'transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)' 
        }} 
      />
      {/* Right Panel */}
      <div 
        style={{ 
          flex: 1, 
          background: '#0A0A0A', 
          transform: fadeOut ? 'translateX(100%)' : 'translateX(0)', 
          transition: 'transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)' 
        }} 
      />
      
      {/* Center Content */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          opacity: fadeOut ? 0 : 1, 
          transform: fadeOut ? 'scale(1.1)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.8s ease',
        }}
      >
        <h1 
          className="font-space"
          style={{ 
            fontSize: 'clamp(80px, 15vw, 240px)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em',
            color: 'transparent', 
            WebkitTextStroke: '1px rgba(197,160,89,0.2)', 
            position: 'relative',
            margin: 0,
            lineHeight: 1,
            userSelect: 'none'
          }}
        >
          CEE.
          <span 
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              color: '#C5A059', 
              overflow: 'hidden', 
              whiteSpace: 'nowrap', 
              width: `${Math.min(progress, 100)}%`, 
              transition: 'width 0.1s linear',
              WebkitTextStroke: '0px'
            }}
          >
            CEE.
          </span>
        </h1>

        {/* Floating Percentage */}
        <div 
          className="font-space"
          style={{ 
            position: 'absolute', 
            bottom: '40px', 
            right: 'clamp(24px, 6vw, 100px)', 
            fontSize: '24px', 
            color: '#C5A059', 
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {Math.round(Math.min(progress, 100))}%
        </div>
        
        <div 
          className="font-space"
          style={{ 
            position: 'absolute', 
            bottom: '48px', 
            left: 'clamp(24px, 6vw, 100px)', 
            fontSize: '10px', 
            color: 'rgba(234,234,234,0.4)', 
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Writing Hub
        </div>
      </div>
    </div>
  );
}
