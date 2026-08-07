"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import ServiceCard from './ServiceCard';
import { trackServicesEvent } from '../utils/servicesAnalytics';

interface ServiceCatalogProps {
  initialCategories?: any[];
  initialServices?: any[];
}

export default function ServiceCatalog({ initialCategories, initialServices }: ServiceCatalogProps) {
  const [categories, setCategories] = useState<any[]>(initialCategories || []);
  const [services, setServices] = useState<any[]>(initialServices || []);
  const [loading, setLoading] = useState(!initialCategories || !initialServices);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (initialCategories && initialServices) return;
    (async () => {
      const supabase = createClient();
      const [catRes, srvRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: true }),
        supabase.from('services').select('*').order('created_at', { ascending: true }),
      ]);
      if (catRes.data) setCategories(catRes.data);
      if (srvRes.data) setServices(srvRes.data);
      setLoading(false);
    })();
  }, [initialCategories, initialServices]);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category_id === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.desc_text?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [services, activeCategory, searchQuery]);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    trackServicesEvent('category_selected', { category: id });
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q) {
      setActiveCategory('all');
      trackServicesEvent('service_search', { query: q });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 0', backgroundColor: '#111111' }}>
        <Loader2 className="animate-spin" size={28} color="#C5A059" />
      </div>
    );
  }

  return (
    <section
      id="catalog"
      style={{
        backgroundColor: '#111111',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
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
            Service Index
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px' }}>
            <h2
              className="font-space"
              style={{
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
              }}
            >
              Browse all <span style={{ color: '#C5A059' }}>services.</span>
            </h2>
            
            {/* Search Input */}
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <input
                type="search"
                placeholder="Search services…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="font-inter"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: inputFocused ? '1px solid #C5A059' : '1px solid rgba(197,160,89,0.3)',
                  paddingBottom: '16px',
                  color: '#EAEAEA',
                  fontSize: '16px',
                  fontWeight: 300,
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  caretColor: '#C5A059',
                }}
              />
            </div>
          </div>
        </div>

        {/* Categories Typographic Menu */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '80px' }}>
          <button
            onClick={() => handleCategorySelect('all')}
            className="font-space"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              paddingBottom: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeCategory === 'all' ? '#C5A059' : '#888888',
              borderBottom: activeCategory === 'all' ? '1px solid #C5A059' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="font-space"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                paddingBottom: '8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeCategory === cat.id ? '#C5A059' : '#888888',
                borderBottom: activeCategory === cat.id ? '1px solid #C5A059' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Services List */}
        {filteredServices.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center', color: '#888888' }}>
            <p className="font-inter" style={{ fontSize: '16px' }}>No services match your criteria.</p>
          </div>
        ) : (
          <div style={{ borderTop: '1px solid rgba(197,160,89,0.2)' }}>
            {filteredServices.map((item) => {
              const cat = categories.find((c) => c.id === item.category_id);
              return <ServiceCard key={item.id} item={item} categoryTitle={cat?.title || ''} />;
            })}
          </div>
        )}

      </div>
    </section>
  );
}
