"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LogNewOrder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [writers, setWriters] = useState<any[]>([]);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [serviceType, setServiceType] = useState('Professional CV');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedWriter, setAssignedWriter] = useState('');
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // Fetch all active writers so the admin can assign them
    const fetchWriters = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('profiles').select('id, full_name').eq('role', 'writer');
      if (data) setWriters(data);
    };
    fetchWriters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    let uploadedUrls: string[] = [];
    
    // Upload client files if attached
    if (uploadFiles && uploadFiles.length > 0) {
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `client_${Date.now()}_${i}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage.from('client-documents').upload(fileName, file);
        if (!uploadError) {
          const { data } = supabase.storage.from('client-documents').getPublicUrl(fileName);
          uploadedUrls.push(data.publicUrl);
        }
      }
    }

    // Insert order
    const orderData = {
      client_name: clientName,
      client_email: clientEmail,
      service_type: serviceType,
      requirements,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      assigned_writer_id: assignedWriter || null,
      status: assignedWriter ? 'assigned' : 'new',
      client_files: uploadedUrls
    };

    const { error } = await supabase.from('orders').insert([orderData]);

    setLoading(false);
    
    if (error) {
       alert("Error creating order: " + error.message);
    } else {
       alert("Order successfully logged!");
       router.push('/dashboard/orders');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '64px' }}>
      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>Log Manual Order</h2>
        <p style={{ color: 'var(--muted)' }}>Input the details for a WhatsApp or external purchase to track it securely.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Client Name *</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Client Email *</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Service Purchased *</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}>
              <option>Professional CV</option>
              <option>Admission Essay</option>
              <option>Cover Letter</option>
              <option>LinkedIn Optimization</option>
              <option>Other Custom Service</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Delivery Deadline</label>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Task Requirements & Notes</label>
          <textarea 
            value={requirements} 
            onChange={(e) => setRequirements(e.target.value)} 
            placeholder="Paste questionnaires, specific industry focus, or guidelines here..."
            style={{ width: '100%', minHeight: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', resize: 'vertical' }} 
          />
        </div>
        
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>
            <UploadCloud size={18} color="#3b82f6" /> Attach Old CV or Client Files
          </label>
          <input 
            type="file" 
            multiple 
            onChange={(e) => setUploadFiles(e.target.files)} 
            style={{ width: '100%', fontSize: '14px', color: 'var(--muted)' }} 
          />
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>PDF, Docx. Writers will download these files from their portal.</p>
        </div>

        <div style={{ padding: '24px', background: '#fdf8f6', borderRadius: '12px', border: '1px solid #ffedd5', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#9a3412', marginBottom: '12px' }}>Writer Assignment</h3>
          <p style={{ fontSize: '14px', color: '#c2410c', marginBottom: '16px' }}>Select a writer from your team to assign this task immediately, or leave Unassigned to decide later.</p>
          <select value={assignedWriter} onChange={(e) => setAssignedWriter(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ffedd5', outline: 'none', background: 'white', color: '#9a3412', fontWeight: 600 }}>
            <option value="">-- Unassigned --</option>
            {writers.map(w => (
              <option key={w.id} value={w.id}>{w.full_name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={loading} style={{ padding: '14px 32px', background: 'var(--navy)', color: 'white', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
            <Save size={18} /> {loading ? 'Saving securely...' : 'Create Order & Notify'}
          </button>
        </div>
      </form>
    </div>
  );
}
