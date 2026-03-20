"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart, FileText, Users, DollarSign, TrendingUp } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeOrders: 0,
    pendingReviews: 0,
    totalWriters: 0,
    monthlyRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();
      
      // We will implement actual fetching later, for now we simulate or fetch simple counts
      try {
        const { count: pendingReviews } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending_review');

        const { count: totalWriters } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'writer');

        setStats({
          activeOrders: 12, // Placeholder until orders table is fully used
          pendingReviews: pendingReviews || 0,
          totalWriters: totalWriters || 0,
          monthlyRevenue: 450000 // Placeholder
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend?: string }) => (
    <div style={{
      background: 'white', borderRadius: '16px', padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
        </div>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '12px', 
          background: 'rgba(201,147,58,0.1)', color: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--green)', fontWeight: 500 }}>
          <TrendingUp size={16} /> <span>{trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Overview</h2>
        <p style={{ color: 'var(--muted)' }}>Welcome to the Cee Writing Admin Dashboard.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <StatCard title="Active Orders" value={stats.activeOrders} icon={<ShoppingCart size={24} />} trend="+3 this week" />
        <StatCard title="Pending Blog Reviews" value={stats.pendingReviews} icon={<FileText size={24} />} />
        <StatCard title="Total Writers" value={stats.totalWriters} icon={<Users size={24} />} />
        <StatCard title="Est. Revenue (This Month)" value={`₦${stats.monthlyRevenue.toLocaleString()}`} icon={<DollarSign size={24} />} trend="+12% from last month" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>Recent Orders</h3>
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
            No recent orders. Switch to WhatsApp integration to track them here.
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, color: 'var(--navy)' }}>+ Create Blog Post</button>
            <button style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, color: 'var(--navy)' }}>+ Invite New Writer</button>
            <button style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, color: 'var(--navy)' }}>+ Update Service Pricing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
