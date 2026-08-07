"use client";
import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://ceewriting.com${item.href}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
    </>
  );
}
