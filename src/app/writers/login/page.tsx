"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function WriterLoginPage({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full_name') as string;
    
    const supabase = createClient();

    try {
      if (activeTab === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Let middleware completely handle the routing and role enforcement by doing a hard reload
        window.location.href = '/writers';
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        
        // Signup success! Do a hard redirect to let middleware handle the 'pending' role route
        window.location.href = '/writers';
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: 'white', padding: '40px 32px', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '8px' }}>Writer Portal</h2>
        <p style={{color: 'var(--muted)', marginBottom: '24px', fontSize: '14px'}}>
          {activeTab === 'signin' ? 'Sign in to view your tasks and submit drafts.' : 'Apply to join our writing team.'}
        </p>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
            style={{ flex: 1, padding: '10px', background: activeTab === 'signin' ? 'white' : 'transparent', color: activeTab === 'signin' ? 'var(--navy)' : '#64748b', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: activeTab === 'signin' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
            Sign In
          </button>
          <button 
            type="button" 
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
            style={{ flex: 1, padding: '10px', background: activeTab === 'signup' ? 'white' : 'transparent', color: activeTab === 'signup' ? 'var(--navy)' : '#64748b', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: activeTab === 'signup' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
            Apply as Writer
          </button>
        </div>

        {(errorMsg || searchParams?.message) && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '24px', border: '1px solid #fecaca' }}>
            {errorMsg || searchParams.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {activeTab === 'signup' && (
            <input type="text" name="full_name" placeholder="Full Name" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy)', outline: 'none', transition: 'border 0.2s', width: '100%' }} />
          )}
          <input type="email" name="email" placeholder="Email Address" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy)', outline: 'none', transition: 'border 0.2s', width: '100%' }} />
          <input type="password" name="password" placeholder="Password" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy)', outline: 'none', transition: 'border 0.2s', width: '100%' }} />

          <button type="submit" disabled={loading} style={{ marginTop: '16px', background: 'var(--navy)', color: 'white', fontWeight: 700, padding: '16px', borderRadius: '50px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.2s', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : activeTab === 'signin' ? 'Access My Portal' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
