import React from 'react';
import { login } from './actions';

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
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
        }}>Welcome Back</h2>
        <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '14px'}}>
          Sign in to the Admin or Writer portal.
        </p>

        {searchParams?.message && (
          <div style={{
            background: 'rgba(255,60,60,0.1)', color: '#ff6b6b', padding: '12px',
            borderRadius: '8px', fontSize: '14px', marginBottom: '24px',
            border: '1px solid rgba(255,60,60,0.2)'
          }}>
            {searchParams.message}
          </div>
        )}

        <form style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
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
            formAction={login}
            style={{
              marginTop: '16px', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              color: 'white', fontWeight: 700, padding: '16px', borderRadius: '50px',
              border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(201,147,58,0.3)',
              transition: 'transform 0.2s'
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
