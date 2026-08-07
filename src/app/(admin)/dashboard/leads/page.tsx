"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Download } from 'lucide-react';

export default function LeadsManagerPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  };

  const handleExport = () => {
    if (leads.length === 0) return;
    
    const csvContent = [
      ['Email', 'Source', 'Date Captured'].join(','),
      ...leads.map(lead => [
        lead.email, 
        lead.source, 
        new Date(lead.created_at).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', color: 'var(--green-dark)' }}>Lead Manager</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Emails captured from Waitlists, Newsletters, and Tools.</p>
        </div>
        
        <button 
          onClick={handleExport}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'var(--sage)', color: 'var(--green-dark)', padding: '10px 20px',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Email</th>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Source</th>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Date Captured</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>Loading leads...</td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--green-dark)', fontWeight: 600 }}>{lead.email}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                  <span style={{ 
                    background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' 
                  }}>
                    {lead.source}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                  {new Date(lead.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No leads captured yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
