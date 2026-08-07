"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
      background: '#111111', borderRadius: '4px', padding: '32px',
      border: '1px solid rgba(197,160,89,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h3 className="font-space" style={{ fontSize: '11px', color: 'rgba(234,234,234,0.5)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>{title}</h3>
          <div className="font-space" style={{ fontSize: '36px', fontWeight: 700, color: '#C5A059' }}>{value}</div>
        </div>
        <div style={{ 
          color: 'rgba(197,160,89,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="font-space" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#555555', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <TrendingUp size={14} color="#C5A059" /> <span>{trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '48px' }}>
        <h2 className="font-space" style={{ fontSize: '32px', fontWeight: 700, color: '#EAEAEA', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Overview
        </h2>
        <p className="font-inter" style={{ color: '#888888', fontSize: '15px' }}>
          Welcome to the Cee Writing Admin Dashboard.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <StatCard title="Active Orders" value={stats.activeOrders} icon={<ShoppingCart size={28} />} trend="+3 this week" />
        <StatCard title="Pending Blog Reviews" value={stats.pendingReviews} icon={<FileText size={28} />} />
        <StatCard title="Total Writers" value={stats.totalWriters} icon={<Users size={28} />} />
        <StatCard title="Est. Revenue (This Month)" value={`₦${stats.monthlyRevenue.toLocaleString()}`} icon={<DollarSign size={28} />} trend="+12% from last month" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: '#111111', borderRadius: '4px', padding: '32px', border: '1px solid rgba(197,160,89,0.1)' }}>
          <h3 className="font-space" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: '24px' }}>
            Recent Orders
          </h3>
          <div className="font-inter" style={{ textAlign: 'center', padding: '60px 40px', color: '#555555', border: '1px dashed rgba(197,160,89,0.2)', borderRadius: '4px' }}>
            No recent orders. Switch to WhatsApp integration to track them here.
          </div>
        </div>

        <div style={{ background: '#111111', borderRadius: '4px', padding: '32px', border: '1px solid rgba(197,160,89,0.1)' }}>
          <h3 className="font-space" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: '24px' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/dashboard/blog/new" className="font-space" style={{ padding: '16px 20px', background: '#0A0A0A', border: '1px solid rgba(197,160,89,0.1)', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C5A059', textDecoration: 'none', display: 'block' }}>+ Create Blog Post</Link>
            <Link href="/dashboard/writers" className="font-space" style={{ padding: '16px 20px', background: '#0A0A0A', border: '1px solid rgba(197,160,89,0.1)', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EAEAEA', textDecoration: 'none', display: 'block' }}>+ Manage Writers</Link>
            <Link href="/dashboard/services" className="font-space" style={{ padding: '16px 20px', background: '#0A0A0A', border: '1px solid rgba(197,160,89,0.1)', borderRadius: '4px', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EAEAEA', textDecoration: 'none', display: 'block' }}>+ Update Service Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
