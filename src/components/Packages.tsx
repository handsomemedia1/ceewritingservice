"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Check, ShoppingCart } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Packages() {
  const { items, addItem } = useCart();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      const supabase = createClient();
      const { data } = await supabase.from('packages').select('*').order('display_order', { ascending: true });
      if (data) setPackages(data);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section id="packages" style={{ background: 'linear-gradient(180deg, #FDFAF5, #f5f0e8)', padding: '100px 24px', textAlign: 'center', color: 'var(--muted)' }}>
        Loading packages...
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <section id="packages" style={{
      background: 'linear-gradient(180deg, #FDFAF5, #f5f0e8)', padding: '100px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="orb" style={{width: '300px', height: '300px', background: 'rgba(201,147,58,0.1)', top: '10%', left: '-5%', filter: 'blur(80px)'}} />

      <div style={{maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2}}>
        <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Best Value</div>
          <h2 className="section-title" style={{color: 'var(--navy)'}}>Service Packages</h2>
          <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
            Bundle your services and save. Add packages directly to your cart.
          </p>
        </div>

        <div className="packages-grid bento-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch',
        }}>
          {packages.map((pkg, i) => {
            const isInCart = items.some(cartItem => cartItem.id === pkg.id);
            
            return (
              <div key={i} style={{
                background: pkg.featured ? 'linear-gradient(160deg, #0B1F3A, #112d52)' : 'var(--white)',
                border: pkg.featured ? '2px solid var(--gold)' : '1px solid rgba(201,147,58,0.12)',
                borderRadius: '24px', padding: '36px 28px', position: 'relative',
                boxShadow: pkg.featured ? '0 20px 60px rgba(201,147,58,0.2)' : 'var(--clay-shadow)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: pkg.featured ? 'scale(1.04)' : 'none',
                display: 'flex', flexDirection: 'column',
                animation: `fadeUp 0.6s ease forwards ${i * 0.2}s`, opacity: 0
              }}>
                {pkg.badge && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                    color: 'white', fontSize: '11px', fontWeight: 700, padding: '5px 20px',
                    borderRadius: '50px', whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px var(--gold-glow)',
                  }}>{pkg.badge}</div>
                )}

                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700,
                  color: pkg.featured ? 'white' : 'var(--navy)', marginBottom: '6px',
                }}>{pkg.name}</div>
                <div style={{
                  fontSize: '14px', color: pkg.featured ? 'rgba(255,255,255,0.45)' : 'var(--muted)',
                  marginBottom: '24px',
                }}>{pkg.desc_text}</div>

                <ul style={{listStyle: 'none', marginBottom: '28px', flex: 1}}>
                  {pkg.features?.map((item: string, j: number) => (
                    <li key={j} style={{
                      fontSize: '14px', color: pkg.featured ? 'rgba(255,255,255,0.75)' : 'var(--text)',
                      padding: '7px 0', display: 'flex', alignItems: 'center', gap: '12px',
                      borderBottom: `1px solid ${pkg.featured ? 'rgba(255,255,255,0.08)' : 'rgba(201,147,58,0.08)'}`,
                    }}>
                      <span style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: pkg.featured ? 'rgba(201,147,58,0.2)' : 'rgba(201,147,58,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: '#E8B96A', flexShrink: 0,
                      }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 900,
                  color: '#E8B96A', marginBottom: '4px',
                }}>{pkg.price_label}</div>
                <div style={{
                  fontSize: '12px', fontWeight: 600, marginBottom: '24px',
                  color: pkg.featured ? '#6ee7b7' : 'var(--green)',
                }}>{pkg.save_label ? `✓ ${pkg.save_label}` : ''}</div>

                <button
                  onClick={() => addItem({
                    id: pkg.id,
                    name: pkg.name,
                    category: pkg.category,
                    price: pkg.price,
                    priceLabel: pkg.price_label,
                  })}
                  className={pkg.featured ? 'btn-gold' : ''}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                    fontWeight: 600, fontSize: '15px', textDecoration: 'none', width: '100%',
                    fontFamily: 'inherit',
                    ...(pkg.featured 
                      ? (isInCart ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' } : {})
                      : { 
                          background: isInCart ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--navy)', 
                          color: 'white', transition: 'all 0.2s',
                          boxShadow: isInCart ? '0 8px 24px rgba(16,185,129,0.3)' : 'none',
                        }),
                  }}
                >
                  {isInCart ? <><Check size={16} /> Added to Cart</> : <><ShoppingCart size={16} /> Add to Cart</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
