"use client";
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, MessageCircle, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]); // Placeholder for fetched orders
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Orders & Tasks</h2>
          <p style={{ color: 'var(--muted)' }}>Manage incoming WhatsApp orders and assign documents to your writers.</p>
        </div>
        <button style={{ 
          background: 'var(--navy)', color: 'white', padding: '12px 20px', 
          border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          + Log Manual Order
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            <input type="text" placeholder="Search orders by customer name..." style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }} />
          </div>
          <button style={{ padding: '0 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--navy)' }}>
            <Filter size={18} /> Status
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', marginBottom: '16px' }}>
              <ShoppingCart size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>No Active Orders</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', marginBottom: '24px' }}>
              When customers complete an order via WhatsApp, you can log it here to track progress and assign the document to a writer.
            </p>
            <button style={{ padding: '12px 24px', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Create First Order</button>
          </div>
        ) : (
          <div>
            {/* Table layout for orders will go here */}
          </div>
        )}
      </div>
    </div>
  );
}
