"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from './actions';

export default function AdminLoginPage({ searchParams }: { searchParams: { message: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await loginAdmin(formData);
      if (result?.error) {
        setErrorMsg(result.error);
        setLoading(false);
      } else {
        // Success redirect handled by action or we push manually
        router.push('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: 'var(--navy)'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)', padding: '40px 32px',
        borderRadius: '24px', width: '100%', maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)', textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'white',
          marginBottom: '8px'
        }}>Admin Login</h2>
        <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '14px'}}>
          Sign in to access the Dashboard.
        </p>

        {(errorMsg || searchParams?.message) && (
          <div style={{
            background: 'rgba(255,60,60,0.1)', color: '#ff6b6b', padding: '12px',
            borderRadius: '8px', fontSize: '14px', marginBottom: '24px',
            border: '1px solid rgba(255,60,60,0.2)'
          }}>
            {errorMsg || searchParams.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <input 
            type="email" 
            name="email" 
            placeholder="Admin Email" 
            required 
            style={{
              padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)', color: 'white',
              outline: 'none', transition: 'border 0.2s', width: '100%'
            }}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            style={{
              padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)', color: 'white',
              outline: 'none', transition: 'border 0.2s', width: '100%'
            }}
          />

          <button 
            type="submit"
            disabled={loading}
            style={{
              marginTop: '16px', background: 'var(--gold)',
              color: 'white', fontWeight: 700, padding: '16px', borderRadius: '50px',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 15px rgba(201,147,58,0.3)',
              transition: 'transform 0.2s', opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
