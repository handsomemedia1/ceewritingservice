import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{fontSize: '28px', color: 'var(--navy)', marginBottom: '8px', fontWeight: 700}}>Dashboard</h1>
      <p style={{color: 'var(--muted)', marginBottom: '32px'}}>Welcome back, Admin. Here is what's happening today.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px'}}>
        <div className="clay-card" style={{padding: '24px', border: '1px solid var(--border)'}}>
          <div style={{fontSize: '14px', color: 'var(--muted)', marginBottom: '8px'}}>Pending Orders</div>
          <div style={{fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: 'var(--navy)'}}>12</div>
        </div>
        <div className="clay-card" style={{padding: '24px', border: '1px solid var(--border)'}}>
          <div style={{fontSize: '14px', color: 'var(--muted)', marginBottom: '8px'}}>Active Writers</div>
          <div style={{fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: 'var(--navy)'}}>8</div>
        </div>
        <div className="clay-card" style={{padding: '24px', border: '1px solid var(--border)'}}>
          <div style={{fontSize: '14px', color: 'var(--muted)', marginBottom: '8px'}}>Revenue (This Week)</div>
          <div style={{fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: 'var(--green)'}}>₦450k</div>
        </div>
      </div>

      <div className="clay-card" style={{padding: '32px', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '18px', color: 'var(--navy)', marginBottom: '20px'}}>Recent Orders</h2>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid var(--border)', color: 'var(--muted)'}}>
              <th style={{padding: '12px 0'}}>Order ID</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '16px 0', fontWeight: 500}}>#ORD-00{i}</td>
                <td>CV Writing</td>
                <td><span style={{background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600}}>In Progress</span></td>
                <td style={{color: 'var(--muted)'}}>Today</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
