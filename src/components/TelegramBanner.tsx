"use client";
import React, { useState, useEffect } from 'react';

export default function TelegramBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed this session
    const wasDismissed = sessionStorage.getItem('tg_banner_dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Show after 5 seconds on the page
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('tg_banner_dismissed', 'true');
  };

  if (dismissed || !visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '100px', right: '24px', zIndex: 199,
      background: 'linear-gradient(135deg, #0B1F3A, #142d50)',
      borderRadius: '16px', padding: '20px', maxWidth: '320px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,147,58,0.15)',
      animation: 'slideInRight 0.5s ease-out',
    }}>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,136,204,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,136,204,0); }
        }
      `}</style>

      {/* Close button */}
      <button onClick={handleDismiss} style={{
        position: 'absolute', top: '8px', right: '12px', background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.3)', fontSize: '18px', cursor: 'pointer', padding: '4px',
      }}>✕</button>

      {/* Content */}
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '32px', marginBottom: '8px'}}>✈️🤖</div>
        <h4 style={{
          fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '6px',
          fontFamily: "'Playfair Display', serif",
        }}>Join Us on Telegram!</h4>
        <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '16px'}}>
          Get daily scholarship alerts, remote job drops, and free writing tips delivered straight to your phone.
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <a href="https://t.me/ceewritingservice" target="_blank" rel="noreferrer" style={{
            display: 'block', padding: '12px', borderRadius: '10px', fontWeight: 700,
            fontSize: '14px', textDecoration: 'none', textAlign: 'center',
            background: 'linear-gradient(135deg, #0088cc, #229ED9)', color: 'white',
            animation: 'pulse-glow 2s infinite',
          }}>
            ✈️ Join Channel — It&apos;s Free
          </a>
          <a href="https://t.me/Ceewritingbot" target="_blank" rel="noreferrer" style={{
            display: 'block', padding: '10px', borderRadius: '10px', fontWeight: 600,
            fontSize: '13px', textDecoration: 'none', textAlign: 'center',
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            🤖 Chat Our AI Bot
          </a>
        </div>
      </div>
    </div>
  );
}
