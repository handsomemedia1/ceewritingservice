"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { FileText, ClipboardList, CheckCircle, Clock } from 'lucide-react';

export default function WriterDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ drafts: 0, pendingReview: 0, published: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (userProfile) setProfile(userProfile);

      // Fetch writer's blog post stats
      const { data: posts } = await supabase.from('blog_posts').select('status').eq('author_id', user.id);
      
      if (posts) {
        setStats({
          drafts: posts.filter(p => p.status === 'draft').length,
          pendingReview: posts.filter(p => p.status === 'pending_review').length,
          published: posts.filter(p => p.status === 'published').length
        });
      }
      
      setLoading(false);
    };
    
    fetchDashboardInfo();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
        Welcome back, {profile?.full_name?.split(' ')[0] || 'Writer'}! 👋
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Here is what's happening in your portal today.</p>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Drafts In Progress</p>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)' }}>{stats.drafts}</h3>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText color="var(--navy)" size={24} />
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Pending Review</p>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#d97706' }}>{stats.pendingReview}</h3>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock color="#d97706" size={24} />
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>Published Posts</p>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#10b981' }}>{stats.published}</h3>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle color="#10b981" size={24} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
           <Link href="/writers/blog/new" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 600, transition: 'background 0.2s' }}>
             <FileText size={20} color="var(--navy)" />
             Draft a New Article
           </Link>
           <Link href="/writers/orders" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: 'var(--navy)', fontWeight: 600, transition: 'background 0.2s' }}>
             <ClipboardList size={20} color="var(--navy)" />
             View Assigned CV / Essay Orders
           </Link>
        </div>
      </div>
    </div>
  );
}
