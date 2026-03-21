"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PlusCircle, Trash2, Save, FileText, X } from 'lucide-react';

export default function AdminResourcesManager() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Career');
  const [features, setFeatures] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchResources = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
    if (data) setResources(data);
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, []);

  const resetForm = () => {
    setTitle(''); setSubtitle(''); setDescription(''); setCategory('Career');
    setFeatures(''); setFileUrl(''); setEditingId(null); setShowForm(false);
  };

  const openEdit = (r: any) => {
    setTitle(r.title || '');
    setSubtitle(r.subtitle || '');
    setDescription(r.description || '');
    setCategory(r.category || 'Career');
    setFeatures(r.features ? r.features.join(', ') : '');
    setFileUrl(r.file_url || '');
    setEditingId(r.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!title) { alert('Title is required.'); return; }
    setSaving(true);
    const supabase = createClient();

    const payload = {
      title,
      subtitle,
      description,
      category,
      features: features.split(',').map(f => f.trim()).filter(Boolean),
      file_url: fileUrl,
    };

    if (editingId) {
      await supabase.from('resources').update(payload).eq('id', editingId);
    } else {
      await supabase.from('resources').insert([payload]);
    }

    setSaving(false);
    resetForm();
    fetchResources();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource?')) return;
    const supabase = createClient();
    await supabase.from('resources').delete().eq('id', id);
    fetchResources();
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Resources Manager</h2>
          <p style={{ color: 'var(--muted)' }}>Add, edit, or remove downloadable templates and guides from the public Resources page.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} style={{ 
          background: 'var(--navy)', color: 'white', padding: '12px 20px', 
          border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <PlusCircle size={18} /> Add Resource
        </button>
      </div>

      {/* Creation / Edit Form Modal */}
      {showForm && (
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px', position: 'relative' }}>
          <button onClick={resetForm} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={20} /></button>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>
            {editingId ? 'Edit Resource' : 'Add New Resource'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Subtitle</label>
              <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="e.g. Nigerian Format • 2026 Edition" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}>
                <option>Career</option>
                <option>Academic</option>
                <option>Scholarship</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Download URL</label>
              <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="https://drive.google.com/..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Key Features (comma separated)</label>
            <input value={features} onChange={e => setFeatures(e.target.value)} placeholder="ATS-optimized layout, Easy to customize, Word format" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>

          <button onClick={handleSave} disabled={saving} style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={16} /> {saving ? 'Saving...' : editingId ? 'Update Resource' : 'Create Resource'}
          </button>
        </div>
      )}

      {/* Existing Resources List */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading resources...</div>
        ) : resources.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <FileText size={48} color="#e2e8f0" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Resources Yet</h3>
            <p style={{ color: 'var(--muted)' }}>Click "Add Resource" to create your first downloadable template or guide.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Resource</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Downloads</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--navy)' }}>{r.title}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>{r.subtitle}</p>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>{r.category}</span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)', fontWeight: 600 }}>{r.downloads || 0}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEdit(r)} style={{ padding: '6px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: 'var(--navy)', fontSize: '13px' }}>Edit</button>
                    <button onClick={() => handleDelete(r.id)} style={{ padding: '6px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trash2 size={14} /> Delete
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
