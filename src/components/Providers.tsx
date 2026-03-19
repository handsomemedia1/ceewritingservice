"use client";
import React from 'react';
import { CartProvider } from '@/lib/CartContext';
import FloatingCart from '@/components/FloatingCart';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <FloatingCart />
    </CartProvider>
  );
}
