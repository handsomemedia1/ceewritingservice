"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency } from '@/lib/CurrencyContext';

export default function CurrencySwitcher() {
  const { currencies, selectedCurrency, setSelectedCurrency, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  if (isLoading || currencies.length <= 1) return null;

  return (
    <div className="currency-switcher" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(201,147,58,0.1)',
          border: '1px solid rgba(201,147,58,0.2)',
          color: 'var(--gold)',
          padding: '6px 12px',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s',
        }}
        aria-label="Select Currency"
      >
        <span>{selectedCurrency.code}</span>
        <span style={{ fontSize: '10px' }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          zIndex: 100,
          minWidth: '120px',
          overflow: 'hidden'
        }}>
          {currencies.map((currency) => (
            <button
              key={currency.id}
              onClick={() => {
                setSelectedCurrency(currency);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: selectedCurrency.code === currency.code ? 'var(--cream)' : 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--navy)',
                fontSize: '14px',
                fontWeight: selectedCurrency.code === currency.code ? 600 : 400,
              }}
            >
              <span>{currency.code}</span>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{currency.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
