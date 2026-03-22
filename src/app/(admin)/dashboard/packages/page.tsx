"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { addPackage, editPackage, deletePackage } from './actions';

export default function PackagesManager() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<any | null>(null);

  async function fetchData() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('packages').select('*').order('display_order', { ascending: true });
    if (data) setPackages(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const featuresRaw = fd.get('features') as string;
    const features = featuresRaw.split('\n').map(f => f.trim()).filter(f => f.length > 0);
    
    const data = {
      name: fd.get('name') as string,
      desc_text: fd.get('desc_text') as string,
      price: parseInt(fd.get('price') as string, 10),
      price_label: fd.get('price_label') as string,
      save_label: fd.get('save_label') as string,
      badge: fd.get('badge') as string,
      featured: fd.get('featured') === 'on',
      features,
      display_order: parseInt(fd.get('display_order') as string, 10) || 0,
    };

    if (editingPkg) {
      await editPackage(editingPkg.id, data);
    } else {
      await addPackage(data);
    }
    
    setShowModal(false);
    setEditingPkg(null);
    fetchData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deletePackage(id);
      fetchData();
    }
  };

  const openEdit = (pkg: any) => {
    setEditingPkg(pkg);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingPkg(null);
    setShowModal(true);
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Packages Manager</h2>
          <p style={{ color: 'var(--muted)' }}>Manage service bundles shown in the "Best Value" section.</p>
        </div>
        <button onClick={openAdd} style={{ 
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'white', padding: '12px 20px', 
          border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Plus size={18} /> Add Package
        </button>
      </div>

      {loading ? (
        <div>Loading packages...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Order</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Featured</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr><td colSpan={5} style={{padding: '24px', textAlign: 'center', color: 'var(--muted)'}}>No packages created yet.</td></tr>
              ) : packages.map(pkg => (
                <tr key={pkg.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)' }}>{pkg.display_order}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)' }}>
                    {pkg.name}
                    {pkg.badge && <span style={{display: 'block', fontSize: '11px', color: 'var(--gold)', marginTop: '4px'}}>{pkg.badge}</span>}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--gold)', fontWeight: 700 }}>{pkg.price_label}</td>
                  <td style={{ padding: '16px 24px' }}>
                    {pkg.featured ? <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Featured</span> : 'No'}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => openEdit(pkg)} style={{ padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: '6px', color: 'var(--navy)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(pkg.id, pkg.name)} style={{ padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
               <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--navy)'}}>{editingPkg ? 'Edit Package' : 'New Package'}</h3>
               <button onClick={() => {setShowModal(false); setEditingPkg(null);}} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20} /></button>
             </div>
             <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Package Name</label>
                    <input name="name" defaultValue={editingPkg?.name} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g Student Pack" />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Display Order</label>
                    <input name="display_order" type="number" defaultValue={editingPkg?.display_order || 0} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                  </div>
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Description (Subtitle)</label>
                  <input name="desc_text" defaultValue={editingPkg?.desc_text} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g Everything a student needs" />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Numeric Price (₦)</label>
                    <input name="price" type="number" defaultValue={editingPkg?.price} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g 70000" />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Price Label</label>
                    <input name="price_label" defaultValue={editingPkg?.price_label} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g ₦70,000" />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Save Label</label>
                    <input name="save_label" defaultValue={editingPkg?.save_label} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g Save ₦10,000" />
                  </div>
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Features (One per line)</label>
                  <textarea name="features" defaultValue={editingPkg?.features?.join('\n')} rows={5} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="Proofreading & Editing&#10;Plagiarism Check" />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Badge (Optional)</label>
                  <input name="badge" defaultValue={editingPkg?.badge} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g ⭐ Most Popular" />
                </div>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                  <input type="checkbox" name="featured" defaultChecked={editingPkg?.featured} style={{width: '18px', height: '18px'}} />
                  <span style={{fontSize: '14px', fontWeight: 600, color: 'var(--navy)'}}>Mark as Featured (Highlights card)</span>
                </label>
                <button type="submit" style={{padding: '12px', background: 'var(--navy)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: '12px'}}>
                  {editingPkg ? 'Update Package' : 'Save Package'}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
