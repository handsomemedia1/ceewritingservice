"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCurrency } from '@/lib/CurrencyContext';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number; // Storing base NGN price is best, but if we receive converted price, we should change the schema.
  priceLabel: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  whatsappUrl: string;
}

const CartContext = createContext<CartCtx | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { formatPrice, selectedCurrency } = useCurrency(); // Added currency support

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.price * i.qty), 0);

  // Build WhatsApp message with order details
  const buildWhatsAppUrl = () => {
    if (items.length === 0) return 'https://wa.me/2349056752549';

    let msg = `Hello! I would like to place an order for the following services:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.category})\n`;
      msg += `   Price: ${item.priceLabel}${item.qty > 1 ? ` × ${item.qty}` : ''}\n\n`;
    });
    msg += `📦 *Total Items:* ${totalItems}\n`;
    msg += `💰 *Estimated Total:* ${formatPrice(items.reduce((s, i) => s + (i.price / selectedCurrency.exchange_rate) * i.qty, 0)).formatted}\n\n`;
    msg += `Please confirm availability and next steps. Thank you!`;

    return `https://wa.me/2349056752549?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
      whatsappUrl: buildWhatsAppUrl(),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
