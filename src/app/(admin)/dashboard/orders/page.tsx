"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ShoppingCart, PlusCircle, Calendar, Edit3, ArrowRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // Fetch orders and join with profiles to get the assigned writer's name
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, 
        client_name, 
        service_type, 
        status, 
        deadline, 
        created_at,
        profiles ( full_name )
      `)
      .order('created_at', { ascending: false });
      
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'new': return <span style={{ background: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Unassigned</span>;
      case 'assigned': return <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Assigned</span>;
      case 'in_progress': return <span style={{ background: '#dbeafe', color: '#2563eb', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>In Progress</span>;
      case 'completed': return <span style={{ background: '#dcfce7', color: '#10b981', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Ready for Review</span>;
      case 'delivered': return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>Delivered to Client</span>;
      default: return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>{status}</span>;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Orders & Tasks</h2>
          <p style={{ color: 'var(--muted)' }}>Manage client CVs, Resumes, and Essays, and assign them to your writing team.</p>
        </div>
        <Link href="/dashboard/orders/new" style={{ 
          background: 'var(--navy)', color: 'white', padding: '12px 20px', 
          borderRadius: '12px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
        }}>
          <PlusCircle size={18} /> Log New Task
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input type="text" placeholder="Search tasks by client name..." style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
          <button style={{ padding: '0 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--navy)' }}>
            <Filter size={18} /> Status Filter
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading order databasse...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', marginBottom: '16px' }}>
              <ShoppingCart size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Active Orders</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', marginBottom: '24px' }}>
              When a client pays or requests a service, log it here so you can assign the writing perfectly to your team.
            </p>
            <Link href="/dashboard/orders/new" style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>Log First Order</Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Client Details</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Service Requested</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Assigned Writer</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Deadline</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => window.location.href=`/dashboard/orders/${order.id}`}>
                  <td style={{ padding: '16px 24px' }}>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--navy)' }}>{order.client_name}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>{new Date(order.created_at).toLocaleDateString()}</p>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, color: '#334155' }}>
                    {order.service_type}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {order.profiles?.full_name ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gold)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                          {order.profiles.full_name.charAt(0)}
                        </div>
                        {order.profiles.full_name}
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)', fontSize: '14px' }}>
                    {order.deadline ? new Date(order.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'No deadline'}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {getStatusPill(order.status)}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <Link href={`/dashboard/orders/${order.id}`} style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       Manage <ArrowRight size={14} />
                    </Link>
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
