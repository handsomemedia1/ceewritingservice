"use client";
import React from 'react';
import { XCircle } from 'lucide-react';

export default function RevokedAccess() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'white', padding: '48px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <XCircle size={48} color="#dc2626" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Access Revoked</h1>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          Your access to the Writer Portal has been revoked by an administrator.
        </p>
        <p style={{ color: '#475569', fontSize: '14px', background: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fee2e2' }}>
          If you believe this is an error, please contact the administration team directly via email or WhatsApp.
        </p>
      </div>
    </div>
  );
}
