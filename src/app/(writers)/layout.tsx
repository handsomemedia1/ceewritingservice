"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Inbox, FileText, DollarSign, LogOut, FileEdit
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function WriterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { label: 'Task Inbox', icon: <Inbox size={20} />, href: '/writers' },
    { label: 'My Blog Drafts', icon: <FileEdit size={20} />, href: '/writers/blog' },
    { label: 'Completed Jobs', icon: <FileText size={20} />, href: '/writers/completed' },
    { label: 'Earnings', icon: <DollarSign size={20} />, href: '/writers/earnings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', background: 'white', borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 900,
            color: 'var(--navy)', letterSpacing: '-0.5px'
          }}>
            Writer <span style={{color: 'var(--gold)'}}>Portal</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/writers');
            return (
              <Link 
                key={item.label} 
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  color: isActive ? 'white' : 'var(--muted)',
                  background: isActive ? 'var(--navy)' : 'transparent',
                  textDecoration: 'none', fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s'
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid #e2e8f0' }}>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '12px', border: 'none',
              background: '#fef2f2', color: '#ef4444',
              cursor: 'pointer', fontWeight: 600, width: '100%',
              transition: 'background 0.2s'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{
          height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', padding: '0 32px',
          justifyContent: 'space-between'
        }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--navy)' }}>
            {navItems.find(i => pathname === i.href || (pathname.startsWith(`${i.href}/`) && i.href !== '/writers'))?.label || 'Task Inbox'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)' }}>Writer Account</span>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              background: '#e2e8f0', color: 'var(--navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px'
            }}>W</div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
