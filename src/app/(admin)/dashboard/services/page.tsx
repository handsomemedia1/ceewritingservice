"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Settings, Edit2, Plus, Trash2 } from 'lucide-react';

export default function ServicesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      
      const [catRes, srvRes] = await Promise.all([
        supabase.from('categories').select('*').order('created_at', { ascending: true }),
        supabase.from('services').select('*').order('created_at', { ascending: true })
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (srvRes.data) setServices(srvRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Services & Pricing Manager</h2>
          <p style={{ color: 'var(--muted)' }}>Update prices, add new services, and edit category descriptions visible on the live site.</p>
        </div>
        <button style={{ 
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'white', padding: '12px 20px', 
          border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Plus size={18} /> Add New Service
        </button>
      </div>

      {loading ? (
        <div>Loading configurations...</div>
      ) : categories.length === 0 ? (
        <div style={{ background: 'white', padding: '64px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>No Categories Set Up</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>You haven't added any services to the database yet. The live site will fallback to default hardcoded arrays if the database is empty.</p>
          <button style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Create First Category</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ background: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)' }}>{cat.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{cat.description}</p>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><Settings size={20} /></button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Service Name</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Base Price</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>High Price / Note</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Popular</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.filter(s => s.category_id === cat.id).map(svc => (
                    <tr key={svc.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)' }}>{svc.name}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--gold)', fontWeight: 700 }}>{svc.priceLabel}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--muted)' }}>{svc.high_price || '—'}</td>
                      <td style={{ padding: '16px 24px' }}>
                        {svc.popular && <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>★ Highlighted</span>}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button style={{ padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: '6px', color: 'var(--navy)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button style={{ padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
