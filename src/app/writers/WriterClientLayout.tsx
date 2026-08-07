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
    { name: 'Dashboard', path: '/writers', icon: <CheckCircle size={18} /> },
    { name: 'Blog Editor', path: '/writers/blog', icon: <FileText size={18} /> },
    { name: 'Assigned Orders', path: '/writers/orders', icon: <ClipboardList size={18} /> },
    { name: 'Settings', path: '/writers/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', background: '#111111', color: '#EAEAEA', 
        display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(197,160,89,0.1)' 
      }}>
        <div style={{ padding: '32px 24px', flex: 1 }}>
          <h1 className="font-space" style={{ 
            fontSize: '18px', fontWeight: 700, color: '#EAEAEA', 
            letterSpacing: '-0.02em', marginBottom: '40px' 
          }}>
            Cee Writer<span style={{ color: '#C5A059' }}>.</span>
          </h1>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = item.path === '/writers' ? pathname === '/writers' : pathname.startsWith(item.path);
              return (
                <Link key={item.name} href={item.path} className="font-space" style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '4px',
                  background: isActive ? '#C5A059' : 'transparent',
                  color: isActive ? '#0A0A0A' : 'rgba(234,234,234,0.6)', textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                  fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#C5A059'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(234,234,234,0.6)'; }}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
          {userProfile && (
           <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div className="font-space" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#C5A059', color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
                 {(userProfile.full_name || 'Admin').charAt(0).toUpperCase()}
               </div>
               <div>
                 <p className="font-inter" style={{ fontSize: '14px', fontWeight: 600, color: '#EAEAEA' }}>{userProfile.full_name || 'Admin Writer'}</p>
                 <p className="font-space" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.6)' }}>Writer Account</p>
               </div>
             </div>
          )}
          <button 
            onClick={handleLogout}
            className="font-space"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%', 
              background: 'transparent', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', 
              fontWeight: 600, cursor: 'pointer', textAlign: 'left', borderRadius: '4px', 
              fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase',
              transition: 'all 0.2s ease' 
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', background: '#0A0A0A' }}>
        {children}
      </main>
    </div>
  );
}
