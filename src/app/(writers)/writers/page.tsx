import React from 'react';

export default function WritersDashboard() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
        <div>
          <h1 style={{fontSize: '28px', color: 'var(--navy)', marginBottom: '4px', fontWeight: 700}}>My Tasks</h1>
          <p style={{color: 'var(--muted)'}}>Manage your assigned writing tasks.</p>
        </div>
        <div style={{background: 'var(--white)', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '16px'}}>
          <div><span style={{color: 'var(--muted)', fontSize: '13px'}}>Earnings this month</span> <strong style={{color: 'var(--green)', display: 'block'}}>₦125,000</strong></div>
        </div>
      </div>

      <div className="clay-card" style={{padding: '32px', border: '1px solid var(--border)'}}>
        <h2 style={{fontSize: '18px', color: 'var(--navy)', marginBottom: '20px'}}>Current Assignments</h2>
        <div style={{display: 'grid', gap: '16px'}}>
          {[1,2].map(i => (
            <div key={i} style={{padding: '24px', border: '1.5px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--white)', transition: 'border-color 0.2s'}}>
              <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                  <span style={{background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700}}>Deadline: Tomorrow 2PM</span>
                  <span style={{color: 'var(--muted)', fontSize: '13px'}}>Task ID: #TSK-88{i}</span>
                </div>
                <h3 style={{fontSize: '16px', color: 'var(--navy)', marginBottom: '4px'}}>SOP Writing - UK Masters in Public Health</h3>
                <p style={{fontSize: '13px', color: 'var(--muted)'}}>Client provided initial draft, needs restructuring and polishing.</p>
              </div>
              <div>
                <button style={{background: 'var(--gold)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer'}}>Update Progress</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
