"use client";
import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2, Send, Package } from 'lucide-react';

export default function FloatingCart() {
  const { items, totalItems, totalPrice, removeItem, updateQty, clearCart, whatsappUrl } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '100px', right: '28px', zIndex: 998,
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
            color: 'white', border: '2px solid rgba(201,147,58,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 30px rgba(11,31,58,0.4)',
            transition: 'all 0.3s', fontSize: '22px',
          }}
        >
          <ShoppingCart size={24} />
          <span style={{
            position: 'absolute', top: '-6px', right: '-6px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            color: 'white', width: '24px', height: '24px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 800,
            boxShadow: '0 2px 8px var(--gold-glow)',
          }}>{totalItems}</span>
        </button>
      )}

      {/* Cart Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(6,20,40,0.6)', backdropFilter: 'blur(8px)',
          }}
        />
      )}

      {/* Cart Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1000,
        width: '420px', maxWidth: '100vw',
        background: 'var(--white)',
        boxShadow: isOpen ? '-10px 0 40px rgba(0,0,0,0.2)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Package size={20} color="var(--gold)" />
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '20px',
              fontWeight: 700, color: 'var(--navy)',
            }}>Your Order</h3>
            <span style={{
              background: 'rgba(201,147,58,0.1)', color: 'var(--gold)',
              fontSize: '12px', fontWeight: 700, padding: '3px 10px',
              borderRadius: '50px',
            }}>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(201,147,58,0.08)', border: 'none',
              width: '36px', height: '36px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--navy)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 24px',
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px',
              color: 'var(--muted)', fontSize: '14px',
            }}>
              <ShoppingCart size={40} color="var(--border)" style={{marginBottom: '16px'}} />
              <p>Your cart is empty.</p>
              <p style={{fontSize: '12px', marginTop: '8px'}}>Add services from the catalog above.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} style={{
                padding: '18px 0',
                borderBottom: '1px solid rgba(201,147,58,0.08)',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div>
                    <div style={{
                      fontSize: '10px', fontWeight: 700, color: 'var(--gold)',
                      textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px',
                    }}>{item.category}</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif", fontSize: '15px',
                      fontWeight: 700, color: 'var(--navy)',
                    }}>{item.name}</div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'rgba(239,68,68,0.08)', border: 'none',
                      width: '30px', height: '30px', borderRadius: '8px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#ef4444', flexShrink: 0,
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  {/* Qty control */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0',
                    border: '1.5px solid var(--border)', borderRadius: '10px',
                    overflow: 'hidden',
                  }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                      width: '32px', height: '32px', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', color: 'var(--navy)',
                    }}>
                      <Minus size={14} />
                    </button>
                    <span style={{
                      width: '36px', textAlign: 'center', fontSize: '14px',
                      fontWeight: 700, color: 'var(--navy)',
                    }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                      width: '32px', height: '32px', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', color: 'var(--navy)',
                    }}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '16px',
                    fontWeight: 700, color: 'var(--gold)',
                  }}>
                    {item.priceLabel}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '24px', borderTop: '1px solid var(--border)',
            background: 'rgba(201,147,58,0.03)',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px',
            }}>
              <span style={{fontSize: '14px', color: 'var(--muted)', fontWeight: 600}}>Estimated Total</span>
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: '24px',
                fontWeight: 900, color: 'var(--navy)',
              }}>₦{totalPrice.toLocaleString()}</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: '#25d366', color: 'white', padding: '16px',
                borderRadius: '14px', fontWeight: 700, fontSize: '15px',
                textDecoration: 'none', width: '100%', marginBottom: '10px',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                transition: 'all 0.3s',
              }}
            >
              <Send size={18} /> Send Order via WhatsApp
            </a>

            <button
              onClick={clearCart}
              style={{
                width: '100%', padding: '12px', background: 'transparent',
                border: '1.5px solid rgba(239,68,68,0.2)', borderRadius: '12px',
                color: '#ef4444', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
