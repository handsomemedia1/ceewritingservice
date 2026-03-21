"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, UploadCloud, FileText, CheckCircle2, Clock, Calendar, DownloadCloud } from 'lucide-react';

export default function WriterOrderWorkspace() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('assigned_writer_id', user.id) // Security check
        .single();

      if (data) {
        setOrder(data);
        setNotes(data.writer_notes || '');
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  const handleFileUpload = async () => {
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    
    // 1. Upload file to Supabase Storage
    const fileExt = uploadFile.name.split('.').pop();
    const fileName = `${orderId}_submission_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('client-documents')
      .upload(filePath, uploadFile);

    if (uploadError) {
      alert("Failed to upload document: " + uploadError.message);
      setUploading(false);
      return;
    }

    // 2. Get the public URL for downloading
    const { data: { publicUrl } } = supabase.storage
      .from('client-documents')
      .getPublicUrl(filePath);

    // 3. Update the Orders table with the file URL and status
    const { error: dbError } = await supabase
      .from('orders')
      .update({
        submission_file: publicUrl,
        writer_notes: notes,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    setUploading(false);

    if (dbError) {
      alert("Failed to save submission info: " + dbError.message);
    } else {
      alert("Success! Your completed work has been submitted to the Admin for review.");
      router.push('/writers/orders');
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Workspace...</div>;
  if (!order) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: Order not found or not assigned to you.</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '64px' }}>
      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Tasks
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
            {order.service_type}
          </h2>
          <p style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span><strong>Client:</strong> {order.client_name}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> <strong>Deadline:</strong> {order.deadline ? new Date(order.deadline).toLocaleString() : 'None'}</span>
          </p>
        </div>
        
        {order.status === 'completed' || order.status === 'delivered' ? (
          <span style={{ background: '#dcfce7', color: '#10b981', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} /> Successfully Submitted
          </span>
        ) : (
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} /> Awaiting Submission
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '24px' }}>
        {/* Left Column: Client Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Requirements</h3>
             <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
               {order.requirements || "No specific instructions provided by client."}
             </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Uploads</h3>
             {order.client_files && order.client_files.length > 0 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {order.client_files.map((fileUrl: string, idx: number) => (
                   <a key={idx} href={fileUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 600 }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FileText size={18} color="#3b82f6" /> Document {idx + 1}</span>
                     <DownloadCloud size={18} color="var(--muted)" />
                   </a>
                 ))}
               </div>
             ) : (
               <p style={{ color: 'var(--muted)', fontSize: '14px', fontStyle: 'italic' }}>The client did not upload any old CVs or documents.</p>
             )}
          </div>

        </div>

        {/* Right Column: Submission Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: order.status === 'completed' ? '#f0fdf4' : 'var(--navy)', padding: '32px 24px', borderRadius: '16px', color: order.status === 'completed' ? '#166534' : 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UploadCloud size={20} /> 
              {order.status === 'completed' ? 'Submission Completed' : 'Submit Final Work'}
            </h3>
            
            {order.status === 'completed' ? (
               <div>
                  <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9 }}>You have successfully completed this task. The admin has been notified.</p>
                  <a href={order.submission_file} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'white', color: '#166534', fontWeight: 700, borderRadius: '8px', textDecoration: 'none' }}>
                    <FileText size={16} /> Download Copy
                  </a>
               </div>
            ) : (
               <div>
                 <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '24px', lineHeight: 1.5 }}>
                   Upload your finished CV or Essay here. Once submitted, the Admin will review it before sending it to the client.
                 </p>
                 
                 <div style={{ marginBottom: '20px' }}>
                   <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Notes for Admin (Optional)</label>
                   <textarea 
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     placeholder="e.g., I tailored this CV specifically for tech roles."
                     style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', resize: 'vertical', fontSize: '14px' }}
                   />
                 </div>

                 <div style={{ marginBottom: '24px' }}>
                   <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase' }}>Upload Finished Document</label>
                   <input 
                     type="file" 
                     accept=".pdf,.doc,.docx"
                     onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)}
                     style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', cursor: 'pointer' }}
                   />
                 </div>

                 <button 
                   onClick={handleFileUpload}
                   disabled={uploading}
                   style={{ width: '100%', padding: '16px', background: 'var(--gold)', color: 'var(--navy)', fontWeight: 800, borderRadius: '8px', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: uploading ? 0.7 : 1 }}
                 >
                   {uploading ? 'Uploading Document...' : 'Submit Completed Order'}
                 </button>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
