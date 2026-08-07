"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function RepositoryManagerPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    const { data } = await supabase.from('repository_papers').select('*').order('created_at', { ascending: false });
    if (data) setPapers(data);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;
    
    let pdf_url = null;

    if (file && file.size > 0) {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('papers')
        .upload(fileName, file);
      
      if (uploadError) {
        alert(`Upload error: ${uploadError.message}`);
        setLoading(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage.from('papers').getPublicUrl(fileName);
      pdf_url = publicUrlData.publicUrl;
    }

    const newPaper = {
      title: formData.get('title'),
      slug: (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      abstract: formData.get('abstract'),
      discipline: formData.get('discipline'),
      paper_type: formData.get('paper_type'),
      publication_date: formData.get('publication_date'),
      doi: formData.get('doi') || null,
      license: formData.get('license') || 'All Rights Reserved',
      pdf_url: pdf_url,
      status: 'published'
    };

    const { error } = await supabase.from('repository_papers').insert(newPaper);

    if (error) {
      alert(`Database error: ${error.message}`);
    } else {
      setShowModal(false);
      fetchPapers();
    }
    
    setLoading(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', color: 'var(--green-dark)' }}>Repository Papers</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={{
            background: 'var(--green-dark)', color: 'var(--sage)', padding: '10px 20px',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          + Upload New Paper
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Title</th>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Discipline</th>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>Date</th>
              <th style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>PDF</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--green-dark)', fontWeight: 600 }}>{p.title}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>{p.discipline}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>{new Date(p.publication_date).toLocaleDateString()}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                  {p.pdf_url ? <a href={p.pdf_url} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>View</a> : 'None'}
                </td>
              </tr>
            ))}
            {papers.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No papers uploaded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', color: 'var(--green-dark)' }}>Upload Paper</h3>
              <button onClick={() => setShowModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
            </div>
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Title *</label>
                <input name="title" required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Abstract *</label>
                <textarea name="abstract" required rows={4} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Discipline *</label>
                  <input name="discipline" required placeholder="e.g. Computer Science" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Type *</label>
                  <select name="paper_type" required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}>
                    <option value="Journal Article">Journal Article</option>
                    <option value="Thesis">Thesis</option>
                    <option value="Working Paper">Working Paper</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Publication Date *</label>
                  <input type="date" name="publication_date" required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>DOI (Optional)</label>
                  <input name="doi" placeholder="10.1000/xyz123" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>License</label>
                <input name="license" defaultValue="All Rights Reserved" style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Upload PDF File *</label>
                <input type="file" name="file" accept="application/pdf" required style={{ width: '100%', padding: '10px', border: '1px dashed #cbd5e1', borderRadius: '8px', background: '#f8fafc' }} />
              </div>

              <button disabled={loading} type="submit" style={{
                background: 'var(--green-dark)', color: 'var(--sage)', padding: '14px', borderRadius: '8px',
                border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '8px'
              }}>
                {loading ? 'Uploading...' : 'Publish Paper'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
