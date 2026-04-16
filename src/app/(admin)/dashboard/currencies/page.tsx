"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { DollarSign, Save, Edit2, Trash2 } from 'lucide-react';

export default function CurrencyManager() {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const fetchCurrencies = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('currencies').select('*').order('is_default', { ascending: false }).order('code', { ascending: true });
    if (data) setCurrencies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setFormData({
      exchange_rate: c.exchange_rate,
      country_codes: c.country_codes ? c.country_codes.join(', ') : '',
    });
  };

  const handleSave = async (id: string) => {
    const supabase = createClient();
    const codesArray = formData.country_codes.split(',').map((s: string) => s.trim().toUpperCase()).filter((s: string) => s.length > 0);
    
    await supabase.from('currencies').update({
      exchange_rate: parseFloat(formData.exchange_rate),
      country_codes: codesArray,
      updated_at: new Date().toISOString()
    }).eq('id', id);
    
    setEditingId(null);
    fetchCurrencies();
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Currency & Pricing</h2>
          <p style={{ color: 'var(--muted)' }}>Manage supported currencies and exchange rates worldwide.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Currency</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Multiplier (Ratio)</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Countries</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map(c => {
                const isEditing = editingId === c.id;
                return (
                 <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0', background: c.is_default ? '#f8fafc' : 'white' }}>
                   <td style={{ padding: '16px 24px' }}>
                     <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{c.code} {c.is_default && <span style={{fontSize: '10px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px'}}>Base</span>}</div>
                     <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Symbol: {c.symbol}</div>
                   </td>
                   <td style={{ padding: '16px 24px' }}>
                     {isEditing ? (
                       <input 
                         type="number" 
                         step="0.000001"
                         value={formData.exchange_rate} 
                         onChange={(e) => setFormData({...formData, exchange_rate: e.target.value})}
                         style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100px' }}
                       />
                     ) : (
                       <div style={{ fontWeight: 500, color: 'var(--navy)' }}>{c.exchange_rate}</div>
                     )}
                     {!isEditing && c.code !== 'NGN' && (
                       <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                         1 NGN = {c.exchange_rate} {c.code}
                       </div>
                     )}
                   </td>
                   <td style={{ padding: '16px 24px', maxWidth: '250px' }}>
                     {isEditing ? (
                       <input 
                         type="text" 
                         value={formData.country_codes} 
                         onChange={(e) => setFormData({...formData, country_codes: e.target.value})}
                         placeholder="US, CA, AU"
                         style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%' }}
                       />
                     ) : (
                       <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                         {c.country_codes && c.country_codes.length > 0 ? c.country_codes.join(', ') : 'None'}
                       </div>
                     )}
                   </td>
                   <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                     {isEditing ? (
                       <button onClick={() => handleSave(c.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
                         <Save size={14} /> Save
                       </button>
                     ) : (
                       <button onClick={() => handleEdit(c)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid #e2e8f0', color: 'var(--navy)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
                         <Edit2 size={14} /> Edit
                       </button>
                     )}
                   </td>
                 </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      
      <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(201,147,58,0.05)', borderRadius: '12px', border: '1px dashed rgba(201,147,58,0.3)', fontSize: '14px', color: 'var(--navy)', lineHeight: 1.6 }}>
        <strong>How Ratios work:</strong> NGN is the base currency (Ratio = 1). To calculate the multiplier for another currency, divide 1 by the exchange rate you want. For example, if you want $1 = ₦2,000, then the USD multiplier is `1 / 2000 = 0.0005`.
      </div>
    </div>
  );
}
