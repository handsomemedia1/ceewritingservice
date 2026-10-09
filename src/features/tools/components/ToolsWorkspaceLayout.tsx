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
    { label: 'All tools', href: '/tools', exact: true },
    { label: 'GPA Calculator', href: '/tools/gpa-calculator' },
    { label: 'Statistical Test Selector', href: '/tools/statistical-test-selector' },
  ];

  return (
    <div className="tools-workspace min-h-screen bg-[#fcfbf9] text-[#1a231d]">
      <Navbar />
      
      <div className="mx-auto flex w-full max-w-[1440px] pt-[88px]">
        {/* Sidebar */}
        <aside className="sticky top-[88px] hidden h-[calc(100vh-88px)] w-64 shrink-0 flex-col overflow-y-auto bg-[#122315] px-6 py-10 text-[#d6e0d3] lg:flex xl:w-72 border-r border-[#0f1f12]">
          <div className="mb-10">
            <h2 className="font-display text-xl font-bold text-white">Tools Workspace</h2>
            <p className="mt-1 text-xs font-medium text-[#8c9c8a]">Cee Writing toolkit</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#5b7a5a]">
              Categories
            </div>
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive 
                      ? 'bg-[#244633] text-white shadow-sm' 
                      : 'text-[#a2b29e] hover:bg-[#1b3425] hover:text-[#d6e0d3]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 border-t border-[#1b3425] pt-6">
            <Link
              href="/research"
              className="flex items-center gap-3 text-sm font-semibold text-[#a2b29e] transition hover:text-white"
            >
              Explore Research Hub <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#fcfbf9]">
          
          {/* Mobile Navigation */}
          <div className="block border-b border-[#e8efe5] bg-white px-4 py-3 lg:hidden overflow-x-auto">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                      isActive 
                        ? 'bg-[#244633] text-white shadow-sm' 
                        : 'border border-[#d1d9cd] bg-[#fcfbf9] text-[#5c665f] hover:border-[#a2b29e] hover:text-[#1a231d]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <main className="flex-1 min-h-[calc(100vh-88px-80px)]">
            {children}
          </main>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
