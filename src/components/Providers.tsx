"use client";
import React from 'react';
import { CartProvider } from '@/lib/CartContext';
import { CurrencyProvider } from '@/lib/CurrencyContext';
import FloatingCart from '@/components/FloatingCart';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        {children}
        <FloatingCart />
      </CartProvider>
    </CurrencyProvider>
  );
}
