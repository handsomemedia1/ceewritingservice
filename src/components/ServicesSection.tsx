"use client";
import React from 'react';
import { Briefcase, GraduationCap, Building2, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

import { createClient } from '@/utils/supabase/client';

function ServiceCard({ item, categoryTitle }: { item: any, categoryTitle: string }) {
  const { items, addItem } = useCart();
  const isInCart = items.some((i: any) => i.id === item.id);

  return (
    <div className="glass-card-light" style={{
      padding: '0', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {item.popular && (
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
        }} />
      )}

      <div style={{padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
          <h4 style={{
            fontSize: '17px', fontWeight: 700, color: 'var(--navy)',
            fontFamily: "'Playfair Display', serif",
          }}>{item.name}</h4>
          {item.popular && (
             <div style={{
               background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
               color: '#92400e', fontSize: '10px', fontWeight: 700,
               padding: '4px 10px', borderRadius: '50px',
               display: 'flex', alignItems: 'center', gap: '4px',
               flexShrink: 0, marginLeft: '12px',
             }}>
               <Star size={10} fill="#92400e" strokeWidth={0} /> Popular
             </div>
          )}
        </div>

        <p style={{
          fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '24px',
          flex: 1,
        }}>{item.desc_text}</p>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '18px', borderTop: '1px solid rgba(201,147,58,0.1)',
        }}>
          <div>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: '20px',
              fontWeight: 700, color: 'var(--gold)',
            }}>{item.pricelabel}</span>
            <span style={{
              fontSize: '12px', color: 'var(--muted)', marginLeft: '6px',
            }}>{item.high_price ? (item.high_price.includes('/') ? item.high_price : `– ${item.high_price}`) : ''}</span>
          </div>

          <button
            onClick={() => addItem({
              id: item.id,
              name: item.name,
              category: categoryTitle,
              price: item.price,
              priceLabel: item.pricelabel,
            })}
            style={{
              background: isInCart
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
              color: 'white', fontSize: '12px', fontWeight: 600,
              padding: '10px 20px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: isInCart
                ? '0 4px 12px rgba(16,185,129,0.3)'
                : '0 4px 12px rgba(11,31,58,0.2)',
              fontFamily: 'inherit',
            }}
          >
            {isInCart ? <><Check size={12} /> Added</> : <><ShoppingCart size={12} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [services, setServices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCatalog() {
      const supabase = createClient();
      const [catRes, srvRes] = await Promise.all([
        supabase.from('categories').select('*').order('created_at', { ascending: true }),
        supabase.from('services').select('*').order('created_at', { ascending: true })
      ]);
      
      if (catRes.data) setCategories(catRes.data);
      if (srvRes.data) setServices(srvRes.data);
      setLoading(false);
    }
    fetchCatalog();
  }, []);

  if (loading) {
    return (
      <div style={{padding: '80px 24px', textAlign: 'center', color: 'var(--muted)'}}>
        Loading services catalog...
      </div>
    );
  }

  // Fallback if db is empty
  if (categories.length === 0) {
    return (
      <div style={{padding: '80px 24px', textAlign: 'center', color: 'var(--muted)'}}>
        No services available at the moment. Please check back later.
      </div>
    );
  }

  return (
    <div style={{padding: '80px 24px 60px', maxWidth: '1280px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '64px'}}>
        <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Complete Catalog</div>
        <h2 className="section-title" style={{color: 'var(--navy)'}}>Browse All Services</h2>
        <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
          Add services to your cart and send your order via WhatsApp in one click.
        </p>
      </div>

      {categories.map((cat, i) => {
        const catServices = services.filter(s => s.category_id === cat.id);
        if (catServices.length === 0) return null;

        return (
          <div key={i} style={{marginBottom: '72px'}}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px',
              background: 'linear-gradient(135deg, rgba(11,31,58,0.04) 0%, rgba(201,147,58,0.06) 100%)',
              borderRadius: '16px', padding: '24px 28px',
              border: '1px solid rgba(201,147,58,0.12)',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(11,31,58,0.25)',
                flexShrink: 0, color: 'white'
              }}>
                <Briefcase size={26} strokeWidth={1.5} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '24px',
                  fontWeight: 700, color: 'var(--navy)', marginBottom: '4px',
                }}>{cat.title}</h3>
                <p style={{fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5}}>{cat.description}</p>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {catServices.map((item, j) => (
                <ServiceCard key={j} item={item} categoryTitle={cat.title} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}
