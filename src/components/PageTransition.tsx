"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById('page-transition-wrapper');
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="page-transition-wrapper" style={{ opacity: 0, transform: 'translateY(16px)' }}>
      {children}
    </div>
  );
}
