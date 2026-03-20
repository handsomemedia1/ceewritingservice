"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWriter } from './actions';

export default function WriterLoginPage({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await loginWriter(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setLoading(false);
      } else {
        router.push('/writers');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: '#f8fafc'
    }}>
      <div style={{
        background: 'white', padding: '40px 32px',
        borderRadius: '24px', width: '100%', maxWidth: '400px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'center',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)',
          marginBottom: '8px'
        }}>Writer Portal</h2>
        <p style={{color: 'var(--muted)', marginBottom: '32px', fontSize: '14px'}}>
          Sign in to view your tasks and submit drafts.
        </p>

        {(errorMsg || searchParams?.message) && (
          <div style={{
            background: '#fef2f2', color: '#ef4444', padding: '12px',
            borderRadius: '8px', fontSize: '14px', marginBottom: '24px',
            border: '1px solid #fecaca'
          }}>
            {errorMsg || searchParams.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <input 
            type="email" 
            name="email" 
            placeholder="Writer Email" 
            required 
            style={{
              padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0',
              background: '#f8fafc', color: 'var(--navy)',
              outline: 'none', transition: 'border 0.2s', width: '100%'
            }}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            style={{
              padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0',
              background: '#f8fafc', color: 'var(--navy)',
              outline: 'none', transition: 'border 0.2s', width: '100%'
            }}
          />

          <button 
            type="submit"
            disabled={loading}
            style={{
              marginTop: '16px', background: 'var(--navy)',
              color: 'white', fontWeight: 700, padding: '16px', borderRadius: '50px',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Entering Portal...' : 'Access My Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
