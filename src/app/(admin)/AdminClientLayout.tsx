"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingCart, FileText, 
  Settings, Users, Tags, LogOut, BookOpen, DollarSign, Package 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { label: 'Orders & Tasks', icon: <ShoppingCart size={20} />, href: '/dashboard/orders' },
    { label: 'Blog CMS', icon: <FileText size={20} />, href: '/dashboard/blog' },
    { label: 'Repository', icon: <BookOpen size={20} />, href: '/dashboard/repository' },
    { label: 'Leads', icon: <Users size={20} />, href: '/dashboard/leads' },
    { label: 'Services', icon: <Tags size={20} />, href: '/dashboard/services' },
    { label: 'Packages', icon: <Package size={20} />, href: '/dashboard/packages' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', background: '#111111', color: '#EAEAEA',
        display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(197,160,89,0.1)'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(197,160,89,0.1)' }}>
          <div className="font-space" style={{
            fontSize: '18px', fontWeight: 700,
            color: '#EAEAEA', letterSpacing: '-0.02em'
          }}>
            Cee Admin<span style={{ color: '#C5A059' }}>.</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className="font-space"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '4px',
                  color: isActive ? '#0A0A0A' : 'rgba(234,234,234,0.6)',
                  background: isActive ? '#C5A059' : 'transparent',
                  textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                  fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#C5A059'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(234,234,234,0.6)'; }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(197,160,89,0.1)' }}>
          <button 
            onClick={handleLogout}
            className="font-space"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(255,60,60,0.2)',
              background: 'transparent', color: '#ff6b6b',
              cursor: 'pointer', fontWeight: 600, width: '100%',
              fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}>
        {/* Top Header */}
        <header style={{
          height: '70px', background: '#111111', borderBottom: '1px solid rgba(197,160,89,0.1)',
          display: 'flex', alignItems: 'center', padding: '0 32px',
          justifyContent: 'space-between'
        }}>
          <h1 className="font-space" style={{ fontSize: '18px', fontWeight: 600, color: '#EAEAEA', letterSpacing: '-0.01em' }}>
            {navItems.find(i => pathname === i.href || pathname.startsWith(`${i.href}/`))?.label || 'Dashboard'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="font-space" style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              background: '#C5A059', color: '#0A0A0A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px'
            }}>A</div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '48px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
