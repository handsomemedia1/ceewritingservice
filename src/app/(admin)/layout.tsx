"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingCart, FileText, 
  Settings, Users, Tags, LogOut, BookOpen 
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
    { label: 'Services & Pricing', icon: <Tags size={20} />, href: '/dashboard/services' },
    { label: 'Resources', icon: <BookOpen size={20} />, href: '/dashboard/resources' },
    { label: 'Writers', icon: <Users size={20} />, href: '/dashboard/writers' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/dashboard/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', background: 'var(--navy)', color: 'white',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 900,
            background: 'linear-gradient(135deg, #C9933A, #E8B96A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Cee Admin
          </div>
        </div>

        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.label} 
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                  background: isActive ? 'var(--gold)' : 'transparent',
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

        <div style={{ padding: '24px 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', w: '100%',
              padding: '12px 16px', borderRadius: '12px', border: 'none',
              background: 'rgba(255,60,60,0.1)', color: '#ff6b6b',
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
            {navItems.find(i => pathname === i.href || pathname.startsWith(`${i.href}/`))?.label || 'Dashboard'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              background: 'var(--gold)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '14px'
            }}>A</div>
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
