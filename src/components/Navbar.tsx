"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resources', href: '/resources' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
        padding: scrolled ? '0 32px' : '10px 32px',
        height: scrolled ? '64px' : '74px',
        background: scrolled ? undefined : 'transparent',
        backdropFilter: scrolled ? undefined : 'none',
        WebkitBackdropFilter: scrolled ? undefined : 'none',
        borderBottom: scrolled ? undefined : 'none',
        zIndex: 210,
      }}>
        <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
          <img
            src="/logo.png" alt="Cee Writing"
            width={42} height={42}
            style={{
              borderRadius: '50%', objectFit: 'cover',
              border: '2px solid rgba(201,147,58,0.4)',
              boxShadow: '0 2px 12px rgba(201,147,58,0.2)',
            }}
          />
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 900,
            background: 'linear-gradient(135deg, #C9933A, #E8B96A)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}>
            Cee Writing
          </span>
        </Link>

        <ul className="nav-links-desktop">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <Link href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer"
          className="btn-gold nav-cta-desktop"
          style={{padding: '10px 24px', fontSize: '13px', borderRadius: '50px'}}
        >
          <span>Order Now</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ zIndex: 220 }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        style={{ zIndex: 205 }}
      >
        {/* Close button inside overlay */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: '24px', right: '28px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'white', fontSize: '20px', width: '44px', height: '44px',
            borderRadius: '12px', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 220,
          }}
        >
          ✕
        </button>

        <img
          src="/logo.png" alt="Cee Writing"
          width={80} height={80}
          style={{
            borderRadius: '50%', objectFit: 'cover',
            marginBottom: '24px', border: '2px solid rgba(201,147,58,0.4)',
            boxShadow: '0 4px 20px rgba(201,147,58,0.3)',
          }}
        />
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: pathname === link.href ? '#E8B96A' : undefined,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer"
          className="btn-gold" style={{marginTop: '16px'}}
          onClick={() => setMenuOpen(false)}
        >
          <span>Order Now</span>
        </Link>
      </div>
    </>
  );
}
