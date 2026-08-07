'use client';
import React, { useEffect, useState } from 'react';
import { trackBlogEvent } from '../utils/blogAnalytics';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentId: string; // ID of the article prose container
}

export default function TableOfContents({ contentId }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const toc: TocItem[] = headings.map((h, i) => {
      // Assign anchor ID if not present
      if (!h.id) h.id = `section-${i}`;
      return {
        id: h.id,
        text: h.textContent || '',
        level: parseInt(h.tagName[1]),
      };
    });
    setItems(toc);
  }, [contentId]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string, text: string) => {
    trackBlogEvent('toc_click', { section: text });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyLink = (id: string) => {
    const url = `${window.location.href.split('#')[0]}#${id}`;
    navigator.clipboard.writeText(url);
  };

  if (items.length === 0) return null;

  return (
    <div style={{ background: '#111111', border: '1px solid rgba(197,160,89,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span className="font-space" style={{ fontSize: '13px', fontWeight: 700, color: '#C5A059', letterSpacing: '0.15em', textTransform: 'uppercase' }}>In This Article</span>
        <svg
          style={{ width: '16px', height: '16px', color: '#888888', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <nav style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(197,160,89,0.08)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingLeft: item.level === 3 ? '16px' : '0' }}>
                  <button
                    onClick={() => handleClick(item.id, item.text)}
                    className="font-inter"
                    style={{ 
                      textAlign: 'left', fontSize: '14px', lineHeight: 1.5, flex: 1, 
                      color: isActive ? '#C5A059' : '#888888', fontWeight: isActive ? 600 : 400,
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#EAEAEA'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#888888'; }}
                  >
                    {item.level === 3 && <span style={{ color: 'rgba(197,160,89,0.4)', marginRight: '8px' }}>—</span>}
                    {item.text}
                  </button>
                  <button
                    onClick={() => copyLink(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#555555', marginTop: '2px' }}
                    title="Copy link to section"
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#555555'; }}
                  >
                    <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
