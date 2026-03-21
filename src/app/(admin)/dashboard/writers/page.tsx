"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Users, Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export default function WriterManager() {
  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWriters() {
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('*').in('role', ['writer', 'pending', 'revoked']);
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

  const changeRole = async (id: string, newRole: string) => {
    const supabase = createClient();
    await supabase.from('profiles').update({ role: newRole }).eq('id', id);
    setWriters(writers.map(w => w.id === id ? { ...w, role: newRole } : w));
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Writers & Team</h2>
          <p style={{ color: 'var(--muted)' }}>Manage your writing staff, approve signups, and configure publishing permissions.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading team members...</div>
        ) : writers.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <Users size={48} color="#e2e8f0" style={{ marginBottom: '16px', margin: '0 auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Writers Registered</h3>
            <p style={{ color: 'var(--muted)' }}>When writers sign up and create an account, they will appear here for approval.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Writer Name</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Blog Permissions</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {writers.map(writer => (
                  <tr key={writer.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s', opacity: writer.role === 'revoked' ? 0.6 : 1 }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>
                        {writer.full_name ? writer.full_name.charAt(0).toUpperCase() : 'W'}
                      </div>
                      {writer.full_name || 'Anonymous User'}
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>
                      {writer.role === 'pending' && <span style={{ padding: '4px 10px', background: '#fef3c7', color: '#b45309', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Pending Approval</span>}
                      {writer.role === 'writer' && <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#15803d', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Active Writer</span>}
                      {writer.role === 'revoked' && <span style={{ padding: '4px 10px', background: '#fee2e2', color: '#b91c1c', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Access Revoked</span>}
                    </td>

                    <td style={{ padding: '16px 24px' }}>
                      {writer.role !== 'revoked' && (
                        writer.can_publish_directly ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#059669', fontWeight: 600 }}>
                            <Shield size={14} /> Can Publish
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#d97706', fontWeight: 600 }}>
                            <ShieldAlert size={14} /> Needs Review
                          </span>
                        )
                      )}
                    </td>

                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        
                        {/* Status Actions */}
                        {writer.role === 'pending' && (
                          <button onClick={() => changeRole(writer.id, 'writer')} style={{ padding: '8px 16px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>
                            Approve
                          </button>
                        )}

                        {writer.role === 'writer' && (
                          <button onClick={() => changeRole(writer.id, 'revoked')} style={{ padding: '8px 16px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>
                            Revoke
                          </button>
                        )}

                        {writer.role === 'revoked' && (
                          <button onClick={() => changeRole(writer.id, 'writer')} style={{ padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>
                            Restore Access
                          </button>
                        )}

                        {/* Blog Publish Rights Action */}
                        {writer.role === 'writer' && (
                          <button 
                            onClick={() => togglePublishRights(writer.id, writer.can_publish_directly)}
                            style={{ padding: '8px 16px', background: writer.can_publish_directly ? '#fffbeb' : '#ecfdf5', color: writer.can_publish_directly ? '#d97706' : '#059669', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
                          >
                            {writer.can_publish_directly ? 'Remove Publish Rights' : 'Grant Publish Rights'}
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
