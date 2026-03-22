"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Settings, Edit2, Plus, Trash2, X } from 'lucide-react';
import { addCategory, addService, deleteService, editService } from './actions';

export default function ServicesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showCatModal, setShowCatModal] = useState(false);
  const [showSvcModal, setShowSvcModal] = useState<string | null>(null); // holds category_id
  const [showEditSvcModal, setShowEditSvcModal] = useState<any | null>(null); // holds the full service object

  async function fetchData() {
    setLoading(true);
    const supabase = createClient();
    const [catRes, srvRes] = await Promise.all([
      supabase.from('categories').select('*').order('created_at', { ascending: true }),
      supabase.from('services').select('*').order('created_at', { ascending: true })
    ]);
    if (catRes.data) setCategories(catRes.data);
    if (srvRes.data) setServices(srvRes.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await addCategory(fd.get('title') as string, fd.get('description') as string);
    setShowCatModal(false);
    fetchData();
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!showSvcModal) return;
    const fd = new FormData(e.currentTarget);
    await addService(
      showSvcModal,
      fd.get('name') as string,
      fd.get('desc') as string,
      fd.get('priceLabel') as string,
      fd.get('highPrice') as string,
      fd.get('popular') === 'on'
    );
    setShowSvcModal(null);
    fetchData();
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This will remove it from the live site immediately.`)) {
      await deleteService(id);
      fetchData();
    }
  };

  const handleEditService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!showEditSvcModal) return;
    const fd = new FormData(e.currentTarget);
    await editService(
      showEditSvcModal.id,
      fd.get('name') as string,
      fd.get('desc') as string,
      fd.get('priceLabel') as string,
      fd.get('highPrice') as string,
      fd.get('popular') === 'on'
    );
    setShowEditSvcModal(null);
    fetchData();
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Services & Pricing Manager</h2>
          <p style={{ color: 'var(--muted)' }}>Update prices, add new services, and edit category descriptions visible on the live site.</p>
        </div>
        <button onClick={() => setShowCatModal(true)} style={{ 
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'white', padding: '12px 20px', 
          border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Plus size={18} /> Add Category
        </button>
      </div>

      {loading ? (
        <div>Loading configurations...</div>
      ) : categories.length === 0 ? (
        <div style={{ background: 'white', padding: '64px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>No Categories Set Up</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>You haven't added any services to the database yet. The live site will fallback to default hardcoded arrays if the database is empty.</p>
          <button onClick={() => setShowCatModal(true)} style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Create First Category</button>
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
                <div style={{display: 'flex', gap: '8px'}}>
                  <button onClick={() => setShowSvcModal(cat.id)} style={{ padding: '8px 16px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>+ Add Service Here</button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '8px' }}><Settings size={20} /></button>
                </div>
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
                  {services.filter(s => s.category_id === cat.id).length === 0 ? (
                    <tr><td colSpan={5} style={{padding: '24px', textAlign: 'center', color: 'var(--muted)'}}>No services in this category yet.</td></tr>
                  ) : services.filter(s => s.category_id === cat.id).map(svc => (
                    <tr key={svc.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--navy)' }}>{svc.name}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--gold)', fontWeight: 700 }}>{svc.pricelabel}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--muted)' }}>{svc.high_price || '—'}</td>
                      <td style={{ padding: '16px 24px' }}>
                        {svc.popular && <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>★ Highlighted</span>}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button onClick={() => setShowEditSvcModal(svc)} style={{ padding: '8px', background: '#f1f5f9', border: 'none', borderRadius: '6px', color: 'var(--navy)', cursor: 'pointer' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteService(svc.id, svc.name)} style={{ padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* category modal */}
      {showCatModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
               <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--navy)'}}>New Category</h3>
               <button onClick={() => setShowCatModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20} /></button>
             </div>
             <form onSubmit={handleAddCategory} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Title</label>
                  <input name="title" required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g Career & Professional" />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Description</label>
                  <input name="description" required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g Get hired. Look professional. Stand out." />
                </div>
                <button type="submit" style={{padding: '12px', background: 'var(--gold)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: '12px'}}>Create Category</button>
             </form>
          </div>
        </div>
      )}

      {/* service modal */}
      {showSvcModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
               <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--navy)'}}>New Service</h3>
               <button onClick={() => setShowSvcModal(null)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20} /></button>
             </div>
             <form onSubmit={handleAddService} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Service Name</label>
                  <input name="name" required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g CV / Resume Writing" />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Description</label>
                  <textarea name="desc" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="ATS-friendly CV that makes recruiters call you first." rows={3} />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Price Label (e.g ₦15,000)</label>
                    <input name="priceLabel" required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>High Price / Note (Optional)</label>
                    <input name="highPrice" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} placeholder="e.g ₦30,000" />
                  </div>
                </div>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                  <input type="checkbox" name="popular" style={{width: '18px', height: '18px'}} />
                  <span style={{fontSize: '14px', fontWeight: 600, color: 'var(--navy)'}}>Mark as Popular/Highlighted</span>
                </label>
                <button type="submit" style={{padding: '12px', background: 'var(--navy)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: '12px'}}>Save Service</button>
             </form>
          </div>
        </div>
      )}

      {/* edit service modal */}
      {showEditSvcModal && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '500px'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
               <h3 style={{fontSize: '20px', fontWeight: 700, color: 'var(--navy)'}}>Edit Service</h3>
               <button onClick={() => setShowEditSvcModal(null)} style={{background: 'none', border: 'none', cursor: 'pointer'}}><X size={20} /></button>
             </div>
             <form onSubmit={handleEditService} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Service Name</label>
                  <input name="name" defaultValue={showEditSvcModal.name} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Description</label>
                  <textarea name="desc" defaultValue={showEditSvcModal.desc_text} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} rows={3} />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Price Label</label>
                    <input name="priceLabel" defaultValue={showEditSvcModal.pricelabel} required style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>High Price / Note</label>
                    <input name="highPrice" defaultValue={showEditSvcModal.high_price || ''} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0'}} />
                  </div>
                </div>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                  <input type="checkbox" name="popular" defaultChecked={showEditSvcModal.popular} style={{width: '18px', height: '18px'}} />
                  <span style={{fontSize: '14px', fontWeight: 600, color: 'var(--navy)'}}>Mark as Popular/Highlighted</span>
                </label>
                <button type="submit" style={{padding: '12px', background: 'var(--navy)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', marginTop: '12px'}}>Update Service</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
