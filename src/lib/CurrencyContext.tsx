"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export type Currency = {
  id: string;
  code: string;
  symbol: string;
  exchange_rate: number;
  country_codes: string[];
  is_default: boolean;
};

// Hardcoded fallback in case DB table doesn't exist yet
const FALLBACK_CURRENCIES: Currency[] = [
  { id: '1', code: 'NGN', symbol: '₦', exchange_rate: 1.0, country_codes: ['NG'], is_default: true },
  { id: '2', code: 'USD', symbol: '$', exchange_rate: 0.0005, country_codes: ['US', 'CA', 'AU', 'NZ', 'PH'], is_default: false },
  { id: '3', code: 'GBP', symbol: '£', exchange_rate: 0.00038, country_codes: ['GB'], is_default: false },
  { id: '4', code: 'EUR', symbol: '€', exchange_rate: 0.00045, country_codes: ['DE', 'FR', 'IT', 'ES', 'NL', 'IE'], is_default: false },
];

type CurrencyContextType = {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (c: Currency) => void;
  formatPrice: (basePriceInNgn: number) => { price: number; formatted: string };
  isLoading: boolean;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencies, setCurrencies] = useState<Currency[]>(FALLBACK_CURRENCIES);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(FALLBACK_CURRENCIES[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initCurrency() {
      try {
        const supabase = createClient();
        let dbCurrencies = FALLBACK_CURRENCIES;
        
        // 1. Fetch currencies from DB
        const { data, error } = await supabase.from('currencies').select('*');
        if (data && !error && data.length > 0) {
          dbCurrencies = data;
          setCurrencies(data);
        }

        // 2. Detect location
        const savedCurrencyCode = localStorage.getItem('user_currency');
        if (savedCurrencyCode) {
          const found = dbCurrencies.find(c => c.code === savedCurrencyCode);
          if (found) {
            setSelectedCurrency(found);
            setIsLoading(false);
            return;
          }
        }

        const res = await fetch('/api/geo');
        const geoData = await res.json();
        const country = geoData.country || 'NG';

        // 3. Match country to currency
        let matched = dbCurrencies.find(c => c.country_codes?.includes(country));
        if (!matched) {
          // If no direct country match, and it's not NG, default to USD if available
          matched = dbCurrencies.find(c => c.code === 'USD') || dbCurrencies.find(c => c.is_default) || dbCurrencies[0];
        }
        
        setSelectedCurrency(matched);
      } catch (err) {
        console.error("Currency init error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    initCurrency();
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setSelectedCurrency(c);
    localStorage.setItem('user_currency', c.code);
  };

  const formatPrice = (basePriceInNgn: number) => {
    const converted = basePriceInNgn * selectedCurrency.exchange_rate;
    // Format nicely: no decimals if it's a whole number, otherwise 2 max
    const isWhole = converted % 1 === 0 || converted > 1000;
    const formattedNum = isWhole ? Math.round(converted).toLocaleString() : converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    return {
      price: converted,
      formatted: `${selectedCurrency.symbol}${formattedNum}`
    };
  };

  return (
    <CurrencyContext.Provider value={{
      currencies,
      selectedCurrency,
      setSelectedCurrency: handleSetCurrency,
      formatPrice,
      isLoading
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
