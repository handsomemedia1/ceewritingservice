"use client";
import React, { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function TelegramBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('tg_banner_dismissed_v2');
    if (wasDismissed) { setDismissed(true); return; }
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setIsAnimatedIn(true), 50);
    }, 2000); // reduced from 6000 for faster visibility
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimatedIn(false);
    setTimeout(() => { setVisible(false); setDismissed(true); }, 400);
    sessionStorage.setItem('tg_banner_dismissed_v2', 'true');
  };

  const handleLinkClick = (target: string) => {
    trackEvent('outbound_link_click', { target });
    handleDismiss();
  };

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(24px, 4vw, 40px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${isAnimatedIn ? '0' : '24px'})`,
        zIndex: 199,
        width: 'calc(100% - 48px)',
        maxWidth: '360px',
        backgroundColor: '#111111',
        border: '1px solid rgba(197,160,89,0.15)',
        padding: '28px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,160,89,0.05)',
        opacity: isAnimatedIn ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#555555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          transition: 'color 0.2s ease',
        }}
        aria-label="Close"
        onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
        onMouseLeave={e => (e.currentTarget.style.color = '#555555')}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Eyebrow */}
      <p
        className="font-space"
        style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)', marginBottom: '10px',
        }}
      >
        Community
      </p>

      {/* Headline */}
      <h4
        className="font-space"
        style={{
          fontSize: '18px', fontWeight: 700, color: '#EAEAEA',
          lineHeight: 1.2, marginBottom: '12px',
        }}
      >
        Join the inner circle
      </h4>

      {/* Body */}
      <p
        className="font-inter"
        style={{
          fontSize: '13px', lineHeight: 1.7, color: '#888888',
          fontWeight: 300, marginBottom: '24px',
        }}
      >
        Daily scholarship alerts, remote job drops, and exclusive writing tips — delivered straight to you.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a
          href="https://t.me/ceewritingservice" target="_blank" rel="noreferrer"
          onClick={() => handleLinkClick('telegram_channel')}
          className="font-space"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '14px 20px',
            backgroundColor: '#C5A059', color: '#0A0A0A',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E8C980'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C5A059'; }}
        >
          Join Channel
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        <a
          href="https://t.me/Ceewritingbot" target="_blank" rel="noreferrer"
          onClick={() => handleLinkClick('telegram_bot')}
          className="font-space"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 20px',
            border: '1px solid rgba(197,160,89,0.2)', color: '#888888',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.2s ease',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#C5A059';
            e.currentTarget.style.color = '#EAEAEA';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(197,160,89,0.2)';
            e.currentTarget.style.color = '#888888';
          }}
        >
          Chat with AI Bot
        </a>
      </div>
    </div>
  );
}
