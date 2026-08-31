"use client";
import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Visual breadcrumb navigation component.
 *
 * JSON-LD BreadcrumbList schema is intentionally NOT emitted here.
 * Because this is a client component, any script tag it renders is injected
 * after JS hydration — meaning the SSR HTML won't contain the structured data.
 *
 * Instead, each server-rendered page that needs BreadcrumbList schema
 * emits its own server-side <script type="application/ld+json"> directly.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '32px' }}>
      <ol style={{ 
        listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px'
      }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isLast ? (
                <span className="font-space" style={{ 
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EAEAEA'
                }}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="font-space" style={{ 
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.5)', textDecoration: 'none', transition: 'color 0.2s ease'
                  }} onMouseEnter={e => e.currentTarget.style.color = '#C5A059'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(197,160,89,0.5)'}>
                    {item.label}
                  </Link>
                  <span style={{ color: 'rgba(197,160,89,0.2)', fontSize: '10px' }}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
