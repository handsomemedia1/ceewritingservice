"use client";
import React, { useEffect, useState } from 'react';
import { Inbox, Paperclip, Clock, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function WriterInboxPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // We will fetch real tasks later from the writer_tasks table
  useEffect(() => {
    // Simulated fetch
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Your Tasks</h2>
          <p style={{ color: 'var(--muted)' }}>View and manage your assigned writing jobs.</p>
        </div>
        <div style={{ background: '#ecfdf5', color: '#059669', padding: '10px 16px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> Available for work
        </div>
      </div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div style={{ 
          background: 'white', borderRadius: '16px', padding: '64px 24px', textAlign: 'center',
          border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', background: '#f8fafc', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)',
            marginBottom: '16px'
          }}>
            <Inbox size={32} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Assigned Tasks</h3>
          <p style={{ color: 'var(--muted)', maxWidth: '400px' }}>
            You have no active tasks at the moment. When the admin assigns a new document to you, it will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* We will map tasks here later */}
        </div>
      )}
    </div>
  );
}
