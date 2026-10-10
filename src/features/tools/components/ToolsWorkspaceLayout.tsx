"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ToolsWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'All Tools',
      href: '/tools',
      exact: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      ),
      count: '3',
    },
    {
      label: 'GPA Calculator',
      href: '/tools/gpa-calculator',
      icon: (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <line x1="8" x2="16" y1="6" y2="6" />
          <line x1="16" x2="16" y1="14" y2="18" />
          <path d="M16 10h.01" />
          <path d="M12 10h.01" />
          <path d="M8 10h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>
      ),
    },
    {
      label: 'Statistical Test Selector',
      href: '/tools/statistical-test-selector',
      icon: (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      ),
    },
    {
      label: 'Scholarship Readiness',
      href: '/scholarship-check',
      icon: (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 3.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 6.908a2 2 0 0 0 1.66 0l8.57-6.908a1 1 0 0 0 .02-.994z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="tools-workspace min-h-screen bg-[#0A0A0A] text-[#EAEAEA]">
      <Navbar />
      
      {/* Dashboard App Container */}
      <div className="mx-auto flex w-full max-w-[1536px] pt-[88px] sm:pt-[96px] lg:pt-[100px]">
        {/* Desktop Sidebar */}
        <aside className="sticky top-[100px] hidden h-[calc(100vh-100px)] w-64 shrink-0 flex-col overflow-y-auto border-r border-[rgba(197,160,89,0.14)] bg-[#0C0C0C] px-5 py-8 text-[#999999] lg:flex xl:w-72">
          {/* Workspace Title & Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(197,160,89,0.25)] bg-[rgba(197,160,89,0.08)] px-3 py-1 text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" aria-hidden="true" />
              STUDIO TOOLKIT
            </div>
            <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
              Tools Workspace
            </h2>
            <p className="mt-1 text-xs text-[#888888]">
              Academic & Research Suite
            </p>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1.5">
            <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-[#C5A059]/70">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive 
                      ? 'border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.12)] text-[#C5A059] shadow-[0_2px_12px_rgba(197,160,89,0.08)]' 
                      : 'border border-transparent text-[#999999] hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-[#EAEAEA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#C5A059]' : 'text-[#777777] group-hover:text-[#EAEAEA]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-[#C5A059] text-[#0A0A0A]' : 'bg-white/[0.06] text-[#777777]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Sidebar Footer Card */}
          <div className="mt-8 border-t border-white/[0.08] pt-6">
            <div className="rounded-xl border border-[rgba(197,160,89,0.18)] bg-[rgba(197,160,89,0.05)] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                <span>📚 Methodology Hub</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#888888]">
                Looking for guides on SPSS, R, Python, and thesis structures?
              </p>
              <Link
                href="/research"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A059] transition hover:text-[#D8B470]"
              >
                Visit Research Hub <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#0A0A0A]">
          {/* Mobile Header / Quick Filter Bar */}
          <div className="block border-b border-[rgba(197,160,89,0.14)] bg-[#0C0C0C] px-4 py-3 lg:hidden overflow-x-auto">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                      isActive 
                        ? 'border border-[rgba(197,160,89,0.4)] bg-[#C5A059] text-[#0A0A0A] shadow-sm font-bold' 
                        : 'border border-white/[0.08] bg-[#141414] text-[#999999] hover:border-[rgba(197,160,89,0.3)] hover:text-[#EAEAEA]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Page Body */}
          <main className="flex-1 min-h-[calc(100vh-100px-100px)]">
            {children}
          </main>
          
          {/* Footer */}
          <div className="mt-auto border-t border-[rgba(197,160,89,0.1)]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
