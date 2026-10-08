"use client";
import React, { createContext, useContext, useState } from 'react';

// For Phase 1, we disable international currency conversions.
// Canonical currency is NGN.
export type Currency = {
  code: string;
  symbol: string;
};

const DEFAULT_CURRENCY: Currency = { code: 'NGN', symbol: '₦' };

type ServicePricingData = {
  price?: number | null;
  max_price?: number | null;
  pricing_type?: string;
  pricing_unit?: string | null;
  currency?: string;
  pricelabel?: string;
  high_price?: string;
};

type CurrencyContextType = {
  selectedCurrency: Currency;
  formatPrice: (basePriceInNgn: number) => { price: number; formatted: string };
  formatServicePrice: (service: ServicePricingData) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const formatPrice = (basePriceInNgn: number) => {
    // No exchange rate conversion applied
    const isWhole = basePriceInNgn % 1 === 0 || basePriceInNgn > 1000;
    const formattedNum = isWhole 
      ? Math.round(basePriceInNgn).toLocaleString() 
      : basePriceInNgn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    return {
      price: basePriceInNgn,
      formatted: `${selectedCurrency.symbol}${formattedNum}`
    };
  };

  const formatServicePrice = (service: ServicePricingData) => {
    const type = service.pricing_type || 'unconfigured';
    
    if (type === 'unconfigured') {
      // Fallback to legacy fields if available
      if (service.pricelabel && service.high_price) {
         if (service.high_price.includes('1000') || service.high_price.includes('/')) {
           return `${service.pricelabel} ${service.high_price}`;
         }
         return `${service.pricelabel} - ${service.high_price}`;
      } else if (service.pricelabel) {
        return service.pricelabel;
      }
      return 'Price Pending';
    }

    if (type === 'free') return 'Free';

    const baseFormat = service.price != null ? formatPrice(service.price).formatted : '';
    
    switch (type) {
      case 'fixed':
        return baseFormat;
      case 'range':
        if (service.max_price != null) {
          return `${baseFormat} - ${formatPrice(service.max_price).formatted}`;
        }
        return `${baseFormat} +`;
      case 'per_unit':
        if (service.pricing_unit) {
          return `${baseFormat} / ${service.pricing_unit}`;
        }
        return `${baseFormat} / unit`;
      case 'starting_at':
        return `From ${baseFormat}`;
      default:
        return baseFormat || 'Contact for Quote';
    }
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      formatPrice,
      formatServicePrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
