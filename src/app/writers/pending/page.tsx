"use client";
import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function PendingApproval() {
  useEffect(() => {
    const supabase = createClient();
    
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      
      if (data && data.role === 'writer') {
        window.location.reload(); // Middleware will redirect them to /writers
      } else if (data && data.role === 'revoked') {
        window.location.reload(); // Middleware will redirect to /writers/revoked
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'white', padding: '48px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Clock size={48} color="#d97706" style={{ margin: '0 auto 24px' }} className="animate-pulse" />
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Account Pending Approval</h1>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          Your writer account has been successfully created and is currently under review by our administration team.
        </p>
        <p style={{ color: '#475569', fontSize: '14px', background: '#f1f5f9', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
           This page will automatically refresh as soon as you are approved. You do not need to reload.
        </p>
      </div>
    </div>
  );
}
