'use client';
import React, { useState } from 'react';
import { FileText, PenTool, Search, BarChart3, BookOpen, Download } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

const categories = ['All', 'Career', 'Academic', 'Scholarship'];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={18} strokeWidth={1.5} />,
  PenTool: <PenTool size={18} strokeWidth={1.5} />,
  Search: <Search size={18} strokeWidth={1.5} />,
  BarChart3: <BarChart3 size={18} strokeWidth={1.5} />,
  BookOpen: <BookOpen size={18} strokeWidth={1.5} />,
};

interface Resource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  rating: number;
  downloads: number;
  features: string[];
  file_url: string | null;
}

export default function ResourcesClient({ initialResources }: { initialResources: Resource[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const filtered = activeCategory === 'All' ? resources : resources.filter(r => r.category === activeCategory);

  return (
    <section style={{ backgroundColor: '#0A0A0A', paddingBottom: '120px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >

        {/* Category Filter — luxury typographic strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            paddingTop: '40px',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(197,160,89,0.1)',
            marginBottom: '40px',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-space"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeCategory === cat ? '#C5A059' : '#666666',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0 0 8px 0',
                borderBottom: activeCategory === cat ? '1px solid #C5A059' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Grid — editorial rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((r, i) => (
            <div
              key={r.id}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '24px',
                paddingTop: '40px',
                paddingBottom: '40px',
                borderBottom: '1px solid rgba(197,160,89,0.1)',
                textDecoration: 'none',
              }}
            >
              {/* Index & Category */}
              <div style={{ flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span
                  className="font-space"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(197,160,89,0.3)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    color: 'rgba(197,160,89,0.8)',
                  }}
                >
                  {iconMap[r.icon] || <FileText size={18} strokeWidth={1.5} />}
                </span>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(197,160,89,0.1)' }} />
                <span
                  className="font-space"
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#666666',
                  }}
                >
                  {r.subtitle || r.category}
                </span>
              </div>

              {/* Title & Description */}
              <div style={{ flex: '3 1 400px' }}>
                <h3
                  className="font-space text-[#EAEAEA] group-hover:text-[#C5A059]"
                  style={{
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: '16px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {r.title}
                </h3>
                <p
                  className="font-inter"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#999999',
                    fontWeight: 300,
                    maxWidth: '500px',
                    marginBottom: r.features && r.features.length > 0 ? '16px' : '0',
                  }}
                >
                  {r.description}
                </p>
                {r.features && r.features.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', rowGap: '8px' }}>
                    {r.features.slice(0, 3).map((f, j) => (
                      <span
                        key={j}
                        className="font-space"
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#555555',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ width: '4px', height: '4px', backgroundColor: '#C5A059' }} />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* CTA & Meta */}
              <div style={{ flex: '0 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                <a
                  href={r.file_url || `https://wa.me/2349056752549?text=${encodeURIComponent(`Hi, I would like to download the free resource: ${r.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('resource_download', { title: r.title });
                    const supabase = createClient();
                    supabase.rpc('increment_resource_download', { row_id: r.id }).then();
                    setResources(prev => prev.map(res =>
                      res.id === r.id ? { ...res, downloads: (res.downloads || 0) + 1 } : res
                    ));
                  }}
                  className="font-space"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    border: '1px solid rgba(197,160,89,0.3)',
                    color: '#C5A059',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C5A059';
                    e.currentTarget.style.color = '#0A0A0A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#C5A059';
                  }}
                >
                  <Download size={12} />
                  Download
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    className="font-space"
                    style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}
                  >
                    {r.rating} Rating
                  </span>
                  <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(197,160,89,0.3)' }} />
                  <span
                    className="font-space"
                    style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666666' }}
                  >
                    {r.downloads || 0} DL
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '120px 0', textAlign: 'center', borderBottom: '1px solid rgba(197,160,89,0.1)' }}>
            <p className="font-space" style={{ fontSize: '24px', color: '#EAEAEA', marginBottom: '16px' }}>No resources found.</p>
            <p className="font-inter" style={{ color: '#888888' }}>Try selecting a different category above.</p>
          </div>
        )}

        {/* Bottom CTA — Two-column stark editorial */}
        <div style={{ marginTop: '120px', paddingTop: '80px', borderTop: '2px solid rgba(197,160,89,0.2)' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <p
                className="font-space"
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(197,160,89,0.7)',
                  marginBottom: '24px',
                }}
              >
                Need More Than a Template?
              </p>
              <h2
                className="font-space"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#EAEAEA',
                  marginBottom: '32px',
                }}
              >
                Get a document written <br />
                <span style={{ color: '#C5A059' }}>specifically for you.</span>
              </h2>
              <p
                className="font-inter"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.8,
                  color: '#999999',
                  fontWeight: 300,
                  maxWidth: '480px',
                }}
              >
                A template can only do so much. Get a fully personalised, expert-written document tailored to your profile. Delivered in 24 hours.
              </p>
            </div>
            
            <div
              style={{
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                paddingLeft: 'clamp(0px, 4vw, 80px)',
                borderLeft: '1px solid rgba(197,160,89,0.1)',
              }}
            >
              <a
                href="https://wa.me/2349056752549"
                target="_blank"
                rel="noreferrer"
                className="font-space"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '24px 32px',
                  backgroundColor: '#C5A059',
                  color: '#0A0A0A',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8C980'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#C5A059'; }}
              >
                Request Custom Writing
              </a>
              <Link
                href="/services"
                className="font-space"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '24px 32px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(197,160,89,0.3)',
                  color: '#EAEAEA',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(197,160,89,0.1)';
                  e.currentTarget.style.borderColor = '#C5A059';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)';
                }}
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
