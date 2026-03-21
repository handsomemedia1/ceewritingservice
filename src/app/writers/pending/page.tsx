"use client";
import React from 'react';
import { Clock } from 'lucide-react';

export default function PendingApproval() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'white', padding: '48px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Clock size={48} color="#d97706" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Account Pending Approval</h1>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          Your writer account has been successfully created and is currently under review by our administration team.
        </p>
        <p style={{ color: '#475569', fontSize: '14px', background: '#f1f5f9', padding: '16px', borderRadius: '12px' }}>
          Please check back later. Once you are approved, you will have full access to the Writer Portal.
        </p>
      </div>
    </div>
  );
}
