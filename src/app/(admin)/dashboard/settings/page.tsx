"use client";
import React from 'react';
import { Settings, Save, Globe, Lock, Bell } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Platform Settings</h2>
        <p style={{ color: 'var(--muted)' }}>Manage global variables, company information, and site preferences.</p>
      </div>

      <div style={{ 
        background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', 
        padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' 
      }}>
        {/* Settings Sections */}
        <section>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} /> Site Configuration
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Company Name</label>
              <input type="text" defaultValue="CEE Writing Service" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Contact Email</label>
              <input type="email" defaultValue="support@ceewriting.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

        <section>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={20} /> Security & Access
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>Manage new sign-ups and public account registrations.</p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--navy)' }} />
            <span style={{ fontSize: '15px', color: 'var(--navy)', fontWeight: 500 }}>Allow new writers to register accounts automatically</span>
          </label>
        </section>
        
        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
          <button style={{ 
            padding: '12px 24px', background: 'var(--navy)', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <Save size={18} /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
