"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { createClient } from '@/utils/supabase/client';
import { trackServicesEvent } from '../utils/servicesAnalytics';

export default function PackagesSection({ initialPackages }: { initialPackages?: any[] }) {
  const { items, addItem } = useCart();
  const { formatPrice, selectedCurrency } = useCurrency();
  const [packages, setPackages] = useState<any[]>(initialPackages || []);
  const [loading, setLoading] = useState(!initialPackages);

  useEffect(() => {
    if (initialPackages) return;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from('packages').select('*').order('display_order', { ascending: true });
      if (data) setPackages(data);
      setLoading(false);
    })();
  }, [initialPackages]);

  if (loading || packages.length === 0) return null;

  return (
    <section
      id="packages"
      style={{
        backgroundColor: '#0A0A0A',
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
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
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
            Comprehensive Solutions
          </p>
          <h2
            className="font-space"
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            Complete <span style={{ color: '#C5A059' }}>Packages.</span>
          </h2>
          <p
            className="font-inter"
            style={{
              fontSize: '16px',
              lineHeight: 1.85,
              color: '#999999',
              fontWeight: 300,
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            End-to-end support for your most critical applications and academic milestones.
          </p>
        </div>

        {/* Packages Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            borderTop: '1px solid rgba(197,160,89,0.2)',
          }}
        >
          {packages.map((pkg, i) => {
            const isInCart = items.some((item: any) => item.id === pkg.id);
            const { price, formatted } = formatPrice(pkg.price);

            // Dynamic save label currency conversion
            const rawSaveText = pkg.save_label || '';
            const saveMatch = rawSaveText.match(/\d+(?:,\d+)?/);
            let dynamicSaveLabel = rawSaveText;
            if (saveMatch && selectedCurrency.code !== 'NGN') {
              const ngnVal = parseInt(saveMatch[0].replace(/,/g, ''), 10);
              dynamicSaveLabel = rawSaveText.replace(/₦?\d+(?:,\d+)?/, formatPrice(ngnVal).formatted);
            }

            return (
              <div
                key={pkg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '64px',
                  paddingBottom: '64px',
                  paddingRight: i === packages.length - 1 ? '0' : '40px',
                  paddingLeft: i === 0 ? '0' : '40px',
                  borderRight: i < packages.length - 1 ? '1px solid rgba(197,160,89,0.1)' : 'none',
                }}
              >
                {pkg.badge && (
                  <span
                    className="font-space"
                    style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#0A0A0A',
                      backgroundColor: '#C5A059',
                      padding: '4px 12px',
                      marginBottom: '32px',
                    }}
                  >
                    {pkg.badge}
                  </span>
                )}
                {!pkg.badge && <div style={{ height: '21px', marginBottom: '32px' }} />}

                <h3
                  className="font-space"
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#EAEAEA',
                    marginBottom: '24px',
                  }}
                >
                  {pkg.name}
                </h3>

                <p
                  className="font-inter"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: pkg.featured ? '#EAEAEA' : '#999999',
                    marginBottom: '40px',
                  }}
                >
                  {pkg.desc_text}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '64px', flex: 1 }}>
                  {pkg.features?.map((feat: string, j: number) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        marginBottom: '16px',
                      }}
                    >
                      <span style={{ color: '#C5A059', fontSize: '14px', lineHeight: 1.6 }}>—</span>
                      <span className="font-inter" style={{ fontSize: '14px', lineHeight: 1.6, color: '#888888' }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <div
                    className="font-space"
                    style={{
                      fontSize: 'clamp(36px, 4vw, 48px)',
                      fontWeight: 700,
                      color: '#C5A059',
                      lineHeight: 1,
                      marginBottom: '8px',
                    }}
                  >
                    {formatted}
                  </div>
                  {dynamicSaveLabel && (
                    <div className="font-inter" style={{ fontSize: '13px', color: '#666666', marginBottom: '32px' }}>
                      {dynamicSaveLabel}
                    </div>
                  )}
                  {!dynamicSaveLabel && <div style={{ height: '19px', marginBottom: '32px' }} />}

                  <button
                    onClick={() => {
                      if (isInCart) return;
                      addItem({ id: pkg.id, name: pkg.name, category: pkg.category || 'Package', price, priceLabel: formatted });
                      trackServicesEvent('package_add_to_cart', { package: pkg.name, price });
                    }}
                    className="font-space"
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      backgroundColor: isInCart ? 'rgba(197,160,89,0.1)' : '#EAEAEA',
                      color: isInCart ? '#C5A059' : '#0A0A0A',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: isInCart ? 'default' : 'pointer',
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseEnter={e => { if (!isInCart) e.currentTarget.style.backgroundColor = '#C5A059'; }}
                    onMouseLeave={e => { if (!isInCart) e.currentTarget.style.backgroundColor = '#EAEAEA'; }}
                  >
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
