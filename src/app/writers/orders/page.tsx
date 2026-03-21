"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { ClipboardList, Calendar, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function WriterOrdersBoard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select(`
          id, 
          client_name, 
          service_type, 
          status, 
          deadline, 
          created_at
        `)
        .eq('assigned_writer_id', user.id)
        .order('deadline', { ascending: true });

      if (data) setOrders(data);
      setLoading(false);
    };

    fetchAssignedOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> New Assignment</span>;
      case 'in_progress':
        return <span style={{ background: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> In Progress</span>;
      case 'completed':
      case 'delivered':
        return <span style={{ background: '#dcfce7', color: '#10b981', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} /> Completed</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>{status}</span>;
    }
  };

  const isUrgent = (deadline: string) => {
    if (!deadline) return false;
    const hoursLeft = (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60);
    return hoursLeft > 0 && hoursLeft < 48; // Less than 48 hours is urgent
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>Assigned Task Board</h2>
        <p style={{ color: 'var(--muted)' }}>View the client CVs, Resumes, and Essays currently assigned to you for writing.</p>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading assigned tasks...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <ClipboardList size={48} color="#e2e8f0" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Tasks Assigned Yet</h3>
            <p style={{ color: 'var(--muted)' }}>When the Admin assigns a CV or Essay order to you, it will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order) => (
              <Link key={order.id} href={`/writers/orders/${order.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '24px', background: isUrgent(order.deadline) && order.status !== 'completed' ? '#fff1f2' : '#f8fafc',
                  border: `1px solid ${isUrgent(order.deadline) && order.status !== 'completed' ? '#ffe4e6' : '#e2e8f0'}`,
                  borderRadius: '16px', transition: 'all 0.2s', cursor: 'pointer' 
                }}>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }}>
                        {order.service_type}
                      </h3>
                      {getStatusBadge(order.status)}
                      
                      {isUrgent(order.deadline) && order.status !== 'completed' && (
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#e11d48', background: 'white', padding: '2px 8px', borderRadius: '8px', border: '1px solid #fda4af' }}>
                          🔥 URGENT
                        </span>
                      )}
                    </div>
                    
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span><strong>Client:</strong> {order.client_name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> 
                        <strong>Deadline:</strong> {order.deadline ? new Date(order.deadline).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'No deadline'}
                      </span>
                    </p>
                  </div>

                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <ArrowRight size={18} color="var(--navy)" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
