"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Users, Mail, Shield, ShieldAlert, CheckCircle } from 'lucide-react';

export default function WriterManager() {
  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWriters() {
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('*').eq('role', 'writer');
      if (data) setWriters(data);
      setLoading(false);
    }
    fetchWriters();
  }, []);

  const togglePublishRights = async (id: string, currentVal: boolean) => {
    const supabase = createClient();
    await supabase.from('profiles').update({ can_publish_directly: !currentVal }).eq('id', id);
    setWriters(writers.map(w => w.id === id ? { ...w, can_publish_directly: !currentVal } : w));
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Writers & Team</h2>
          <p style={{ color: 'var(--muted)' }}>Manage your writing staff and configure publishing permissions.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading team members...</div>
        ) : writers.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <Users size={48} color="#e2e8f0" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Writers Registered</h3>
            <p style={{ color: 'var(--muted)' }}>When writers sign up and create an account, they will appear here.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Writer Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Blog Permissions</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {writers.map(writer => (
                <tr key={writer.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>
                      {writer.full_name ? writer.full_name.charAt(0).toUpperCase() : 'W'}
                    </div>
                    {writer.full_name || 'Anonymous User'}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)' }}>Writer</td>
                  <td style={{ padding: '16px 24px' }}>
                    {writer.can_publish_directly ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#059669', fontWeight: 600 }}>
                        <Shield size={14} /> Can Publish Directly
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#d97706', fontWeight: 600 }}>
                        <ShieldAlert size={14} /> Needs Review
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => togglePublishRights(writer.id, writer.can_publish_directly)}
                      style={{ padding: '8px 16px', background: writer.can_publish_directly ? '#fffbeb' : '#ecfdf5', color: writer.can_publish_directly ? '#d97706' : '#059669', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
                    >
                      {writer.can_publish_directly ? 'Revoke Publish Rights' : 'Grant Publish Rights'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
