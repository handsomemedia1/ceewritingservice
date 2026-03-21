"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, DownloadCloud, FileText, UserCheck, Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminOrderWorkspace() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [writers, setWriters] = useState<any[]>([]);

  // Editable fields
  const [status, setStatus] = useState('');
  const [assignedWriter, setAssignedWriter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Fetch specific order
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderData) {
        setOrder(orderData);
        setStatus(orderData.status || 'new');
        setAssignedWriter(orderData.assigned_writer_id || '');
      }

      // Fetch writers list for the assignment dropdown
      const { data: writersData } = await supabase.from('profiles').select('id, full_name').eq('role', 'writer');
      if (writersData) setWriters(writersData);
      
      setLoading(false);
    };

    fetchData();
  }, [orderId]);

  const handleUpdate = async () => {
    setSaving(true);
    const supabase = createClient();
    
    const { error } = await supabase
      .from('orders')
      .update({
        status: status,
        assigned_writer_id: assignedWriter || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    setSaving(false);
    
    if (error) {
      alert("Error updating order: " + error.message);
    } else {
      alert("Order successfully updated!");
      router.push('/dashboard/orders');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this task? This cannot be undone.");
    if (!confirmDelete) return;

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    setSaving(false);

    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      alert("Order deleted.");
      router.push('/dashboard/orders');
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Workspace...</div>;
  if (!order) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: Order not found.</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '64px' }}>
      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Orders Hub
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
            {order.service_type}
          </h2>
          <p style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span><strong>Client:</strong> {order.client_name} ({order.client_email})</span>
            <span><strong>Ordered On:</strong> {new Date(order.created_at).toLocaleDateString()}</span>
          </p>
        </div>
        
        <button 
          onClick={handleDelete}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef2f2', color: '#ef4444', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
        >
          <Trash2 size={16} /> Delete Order
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '24px' }}>
        
        {/* Left Column: Client & Submission Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Task Requirements</h3>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
               {order.requirements || "No specific instructions provided."}
             </div>
             
             {order.client_files && order.client_files.length > 0 && (
               <div style={{ marginTop: '24px' }}>
                 <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>Attached Working Files:</p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   {order.client_files.map((fileUrl: string, idx: number) => (
                     <a key={idx} href={fileUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 600 }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FileText size={16} color="#3b82f6" /> Document {idx + 1}</span>
                       <DownloadCloud size={16} color="var(--muted)" />
                     </a>
                   ))}
                 </div>
               </div>
             )}
          </div>

          <div style={{ background: order.status === 'completed' || order.status === 'delivered' ? '#f0fdf4' : 'white', padding: '24px', borderRadius: '16px', border: `1px solid ${order.status === 'completed' || order.status === 'delivered' ? '#bbf7d0' : '#e2e8f0'}`, boxShadow: order.status === 'completed' ? '0 4px 20px rgba(0,0,0,0.02)' : 'none' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 700, color: order.status === 'completed' || order.status === 'delivered' ? '#166534' : 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Writer Submission</h3>
             
             {order.submission_file ? (
               <div>
                  <a href={order.submission_file} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'white', border: '1px solid #bbf7d0', borderRadius: '12px', textDecoration: 'none', color: '#166534', fontWeight: 700, marginBottom: '16px' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><DownloadCloud size={20} color="#22c55e" /> Download Final Completed Document</span>
                  </a>
                  {order.writer_notes && (
                    <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px dashed #bbf7d0', color: '#166534', fontSize: '14px' }}>
                      <strong>Writer's Note:</strong> {order.writer_notes}
                    </div>
                  )}
               </div>
             ) : (
                <p style={{ color: 'var(--muted)', fontSize: '14px', fontStyle: 'italic', margin: 0 }}>The assigned writer has not uploaded the finished document yet.</p>
             )}
          </div>

        </div>

        {/* Right Column: Admin Management */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: 'var(--navy)', padding: '24px', borderRadius: '16px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} /> Task Management
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
               <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Status Filter</label>
               <select 
                 value={status}
                 onChange={(e) => setStatus(e.target.value)}
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', outline: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600 }}
               >
                 <option style={{ color: 'black' }} value="new">Unassigned / New</option>
                 <option style={{ color: 'black' }} value="assigned">Assigned to Writer</option>
                 <option style={{ color: 'black' }} value="in_progress">In Progress</option>
                 <option style={{ color: 'black' }} value="completed">Review Ready (Writer Submitted)</option>
                 <option style={{ color: 'black' }} value="delivered">Delivered Successfully to Client</option>
               </select>
            </div>

            <div style={{ marginBottom: '32px' }}>
               <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Assigned Team Member</label>
               <select 
                 value={assignedWriter}
                 onChange={(e) => {
                   setAssignedWriter(e.target.value);
                   if (e.target.value && status === 'new') setStatus('assigned');
                 }}
                 style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--gold)', outline: 'none', background: 'white', color: 'var(--navy)', fontWeight: 700 }}
               >
                 <option value="">-- Nobody Assigned --</option>
                 {writers.map(w => (
                   <option key={w.id} value={w.id}>{w.full_name}</option>
                 ))}
               </select>
            </div>

            <button 
              onClick={handleUpdate}
              disabled={saving}
              style={{ width: '100%', padding: '16px', background: 'var(--gold)', color: 'var(--navy)', fontWeight: 800, borderRadius: '8px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Save size={18} /> {saving ? 'Applying Update...' : 'Save & Notify Writer'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
