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

  if (loading) return <div style={{ color: '#EAEAEA' }}>Loading dashboard...</div>;

  return (
    <div>
      <h2 className="font-space" style={{ fontSize: '32px', fontWeight: 700, color: '#EAEAEA', marginBottom: '12px', letterSpacing: '-0.02em' }}>
        Welcome back, {profile?.full_name?.split(' ')[0] || 'Writer'}! 👋
      </h2>
      <p className="font-inter" style={{ color: '#888888', fontSize: '15px', marginBottom: '48px' }}>
        Here is what's happening in your portal today.
      </p>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div style={{ background: '#111111', padding: '32px', borderRadius: '4px', border: '1px solid rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="font-space" style={{ color: 'rgba(234,234,234,0.5)', fontSize: '11px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Drafts In Progress</p>
            <h3 className="font-space" style={{ fontSize: '36px', fontWeight: 700, color: '#C5A059' }}>{stats.drafts}</h3>
          </div>
          <div style={{ color: 'rgba(197,160,89,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={28} />
          </div>
        </div>

        <div style={{ background: '#111111', padding: '32px', borderRadius: '4px', border: '1px solid rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="font-space" style={{ color: 'rgba(234,234,234,0.5)', fontSize: '11px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Pending Review</p>
            <h3 className="font-space" style={{ fontSize: '36px', fontWeight: 700, color: '#d97706' }}>{stats.pendingReview}</h3>
          </div>
          <div style={{ color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
            <Clock size={28} />
          </div>
        </div>

        <div style={{ background: '#111111', padding: '32px', borderRadius: '4px', border: '1px solid rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="font-space" style={{ color: 'rgba(234,234,234,0.5)', fontSize: '11px', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Published Posts</p>
            <h3 className="font-space" style={{ fontSize: '36px', fontWeight: 700, color: '#10b981' }}>{stats.published}</h3>
          </div>
          <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
            <CheckCircle size={28} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: '#111111', padding: '32px', borderRadius: '4px', border: '1px solid rgba(197,160,89,0.1)' }}>
        <h3 className="font-space" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: '24px' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
           <Link href="/writers/blog/new" className="font-space" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: '#0A0A0A', border: '1px solid rgba(197,160,89,0.1)', borderRadius: '4px', textDecoration: 'none', color: '#C5A059', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'border 0.2s' }}>
             <FileText size={18} color="#C5A059" />
             Draft a New Article
           </Link>
           <Link href="/writers/orders" className="font-space" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', background: '#0A0A0A', border: '1px solid rgba(197,160,89,0.1)', borderRadius: '4px', textDecoration: 'none', color: '#EAEAEA', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'border 0.2s' }}>
             <ClipboardList size={18} color="#EAEAEA" />
             View Assigned Orders
           </Link>
        </div>
      </div>
    </div>
  );
}
