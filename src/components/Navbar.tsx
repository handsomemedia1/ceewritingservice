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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const allLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Knowledge Hub', href: '/blog' },
    { label: 'Resources', href: '/resources' },
    { label: 'Scholarship Check', href: '/scholarship-check' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'FAQ', href: '/faq' },
  ];

  const desktopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Knowledge Hub', href: '/blog' },
    { label: 'Resources', href: '/resources' },
    { label: 'Scholarship', href: '/scholarship-check' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: scrolled ? '16px' : '0px',
          left: 0,
          right: 0,
          zIndex: 200,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '0 clamp(24px, 4vw, 60px)' : '0',
          pointerEvents: 'none',
        }}
      >
        <nav
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            height: scrolled ? '60px' : '88px',
            padding: scrolled ? '0 24px' : '0 clamp(24px, 6vw, 100px)',
            borderRadius: scrolled ? '40px' : '0',
            backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(197, 160, 89, 0.12)' : '1px solid transparent',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/logo.png" alt="Cee Writing"
              width={scrolled ? 28 : 36}
              height={scrolled ? 28 : 36}
              style={{ borderRadius: '50%', objectFit: 'cover', transition: 'all 0.4s ease' }}
            />
            <span
              className="font-space"
              style={{
                fontSize: scrolled ? '15px' : '18px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#EAEAEA',
                transition: 'all 0.4s ease',
              }}
            >
              Cee Writing
            </span>
          </Link>

          {/* Desktop Links — hidden on mobile/tablet, shown lg+ */}
          <ul
            style={{
              listStyle: 'none',
              alignItems: 'center',
              gap: '28px',
              margin: 0,
              padding: 0,
            }}
            className="hidden lg:flex"
          >
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/blog' && pathname?.startsWith('/blog'));
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-space"
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? '#C5A059' : '#888888',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EAEAEA')}
                    onMouseLeave={e => (e.currentTarget.style.color = isActive ? '#C5A059' : '#888888')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* CTA — desktop only via class, no conflicting inline display */}
            <Link
              href="https://wa.me/2349056752549"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex font-space"
              style={{
                alignItems: 'center',
                gap: '8px',
                padding: scrolled ? '10px 22px' : '11px 26px',
                backgroundColor: '#C5A059',
                color: '#0A0A0A',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderRadius: scrolled ? '20px' : '0',
              }}
            >
              Order Now
            </Link>

            {/* Hamburger — mobile/tablet only, hidden lg+ */}
            <button
              className="lg:hidden flex flex-col items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: '1px solid rgba(197,160,89,0.2)',
                cursor: 'pointer',
                padding: '9px',
                width: '40px',
                height: '40px',
                gap: '5px',
                flexShrink: 0,
              }}
            >
              <span style={{
                display: 'block', width: '18px', height: '1.5px', backgroundColor: '#C5A059',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: '18px', height: '1.5px', backgroundColor: '#C5A059',
                transition: 'opacity 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: '18px', height: '1.5px', backgroundColor: '#C5A059',
                transition: 'transform 0.3s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 190,
          backgroundColor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px',
          paddingLeft: 'clamp(32px, 8vw, 60px)',
          paddingRight: 'clamp(32px, 8vw, 60px)',
          paddingBottom: '48px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {allLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-space"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(22px, 6vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: isActive ? '#C5A059' : '#EAEAEA',
                  textDecoration: 'none',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(197,160,89,0.08)',
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, opacity 0.35s ease ${i * 0.04}s`,
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <span>{link.label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={isActive ? '#C5A059' : 'rgba(197,160,89,0.25)'}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div style={{
          marginTop: '32px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.28s',
          opacity: menuOpen ? 1 : 0,
        }}>
          <Link
            href="https://wa.me/2349056752549" target="_blank" rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-space"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              padding: '18px',
              backgroundColor: '#C5A059', color: '#0A0A0A',
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Order Now on WhatsApp
          </Link>
        </div>
      </div>
    </>
  );
}
