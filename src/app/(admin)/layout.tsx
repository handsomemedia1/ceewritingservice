import React from 'react';
import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{display: 'flex', minHeight: '100vh', background: 'var(--light-bg)'}}>
      {/* Sidebar */}
      <aside style={{width: '250px', background: 'var(--navy)', color: 'white', padding: '24px', display: 'flex', flexDirection: 'column'}}>
        <div style={{fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--gold)', marginBottom: '40px'}}>
          Admin Panel ✦
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <a href="/dashboard" style={{color: 'white', textDecoration: 'none', padding: '8px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px'}}>Overview</a>
          <a href="#" style={{color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 12px'}}>Orders</a>
          <a href="#" style={{color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 12px'}}>Writers</a>
          <a href="#" style={{color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 12px'}}>Blog Manager</a>
        </nav>
        <div style={{marginTop: 'auto'}}>
          <a href="/" style={{color: 'var(--gold)', fontSize: '14px', textDecoration: 'none'}}>← Back to Site</a>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{flex: 1, padding: '40px', overflowY: 'auto'}}>
        {children}
      </main>
    </div>
  );
}
