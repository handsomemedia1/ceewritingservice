import React from 'react';
import '../globals.css';

export default function WritersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{display: 'flex', minHeight: '100vh', background: 'var(--cream)'}}>
      {/* Sidebar */}
      <aside style={{width: '250px', background: 'var(--white)', borderRight: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column'}}>
        <div style={{fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--gold)', marginBottom: '40px'}}>
          Writers Portal ✏️
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <a href="/writers" style={{color: 'white', textDecoration: 'none', padding: '10px 14px', background: 'var(--navy)', borderRadius: '6px', fontWeight: 500}}>My Tasks</a>
          <a href="#" style={{color: 'var(--muted)', textDecoration: 'none', padding: '10px 14px', fontWeight: 500}}>Available Claims</a>
          <a href="#" style={{color: 'var(--muted)', textDecoration: 'none', padding: '10px 14px', fontWeight: 500}}>Earnings</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main style={{flex: 1, padding: '40px', overflowY: 'auto'}}>
        {children}
      </main>
    </div>
  );
}
