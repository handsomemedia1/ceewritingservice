"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, ClipboardList, Settings, LogOut, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function WriterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);

  // If we are on the login, pending, or revoked pages, don't show the dashboard shell
  if (['/writers/login', '/writers/pending', '/writers/revoked'].includes(pathname)) {
    return <>{children}</>;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) setUserProfile(data);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/writers/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/writers', icon: <CheckCircle size={20} /> },
    { name: 'Blog Editor', path: '/writers/blog', icon: <FileText size={20} /> },
    { name: 'Assigned Orders', path: '/writers/orders', icon: <ClipboardList size={20} /> },
    { name: 'Settings', path: '/writers/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--navy)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px', flex: 1 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: 'var(--gold)', marginBottom: '40px' }}>
            CEE Writer Portal
          </h1>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = item.path === '/writers' ? pathname === '/writers' : pathname.startsWith(item.path);
              return (
                <Link key={item.name} href={item.path} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: isActive ? 'var(--gold)' : '#cbd5e1', textDecoration: 'none', fontWeight: 600,
                  transition: 'all 0.2s'
                }}>
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {userProfile && (
             <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gold)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                 {userProfile.full_name?.charAt(0).toUpperCase() || 'W'}
               </div>
               <div>
                 <p style={{ fontSize: '14px', fontWeight: 600 }}>{userProfile.full_name}</p>
                 <p style={{ fontSize: '11px', color: '#94a3b8' }}>Writer Account</p>
               </div>
             </div>
          )}
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%', background: 'transparent', border: 'none', color: '#f87171', fontWeight: 600, cursor: 'pointer', textAlign: 'left', borderRadius: '12px', transition: 'background 0.2s' }}
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
