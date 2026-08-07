"use client";
import React from 'react';
import { useCart } from '@/lib/CartContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { trackServicesEvent } from '../utils/servicesAnalytics';

interface ServiceCardProps {
  item: any;
  categoryTitle: string;
}

export default function ServiceCard({ item, categoryTitle }: ServiceCardProps) {
  const { items, addItem } = useCart();
  const { formatPrice } = useCurrency();
  const isInCart = items.some((i: any) => i.id === item.id);

  const { price, formatted } = formatPrice(item.price);

  let dynamicHighPrice = item.high_price || '';
  if (dynamicHighPrice) {
    const hpMatch = dynamicHighPrice.match(/\d+(?:,\d+)?/);
    if (hpMatch) {
      const hpValue = parseInt(hpMatch[0].replace(/,/g, ''), 10);
      dynamicHighPrice = dynamicHighPrice.replace(/₦?\d+(?:,\d+)?/, formatPrice(hpValue).formatted);
    }
  }

  const handleAddToCart = () => {
    if (isInCart) return; // Prevent double adds from UI though state manages it
    addItem({ id: item.id, name: item.name, category: categoryTitle, price, priceLabel: formatted });
    trackServicesEvent('service_add_to_cart', { service: item.name, category: categoryTitle, price });
  };

  return (
    <div
      className="group"
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        padding: '40px 0',
        borderBottom: '1px solid rgba(197,160,89,0.1)',
        position: 'relative',
      }}
    >
      {/* Title side */}
      <div style={{ flex: '1 1 300px' }}>
        <span
          className="font-space"
          style={{
            display: 'block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.5)',
            marginBottom: '12px',
          }}
        >
          {categoryTitle}
        </span>
        <h4
          className="font-space group-hover:text-gold"
          style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 700,
            color: '#EAEAEA',
            lineHeight: 1.2,
            transition: 'color 0.3s ease',
          }}
        >
          {item.name}
        </h4>
        {item.popular && (
          <span
            className="font-space"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#111111',
              backgroundColor: '#C5A059',
              padding: '4px 8px',
            }}
          >
            Popular
          </span>
        )}
      </div>

      {/* Description side */}
      <div style={{ flex: '2 1 400px' }}>
        <p
          className="font-inter"
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#999999',
            fontWeight: 300,
          }}
        >
          {item.desc_text}
        </p>
      </div>

      {/* Price & Action side */}
      <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <div
            className="font-space"
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#C5A059',
              lineHeight: 1,
            }}
          >
            {formatted}
          </div>
          {dynamicHighPrice && (
            <div
              className="font-inter"
              style={{
                fontSize: '12px',
                color: '#666666',
                marginTop: '4px',
              }}
            >
              {dynamicHighPrice.includes('/') ? dynamicHighPrice : `to ${dynamicHighPrice}`}
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="font-space"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isInCart ? 'rgba(197,160,89,0.5)' : '#EAEAEA',
            cursor: isInCart ? 'default' : 'pointer',
            borderBottom: isInCart ? '1px solid transparent' : '1px solid rgba(234,234,234,0.3)',
            paddingBottom: '4px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { if (!isInCart) { e.currentTarget.style.color = '#C5A059'; e.currentTarget.style.borderColor = '#C5A059'; } }}
          onMouseLeave={e => { if (!isInCart) { e.currentTarget.style.color = '#EAEAEA'; e.currentTarget.style.borderColor = 'rgba(234,234,234,0.3)'; } }}
        >
          {isInCart ? 'Added' : 'Add +'}
        </button>
      </div>
    </div>
  );
}
