'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { mainNav } from '@/lib/site';
import { Logo } from './Logo';

// Header for every page except home, where the hero renders its own nav with the same look.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fsh-nav ${scrolled || open ? 'fsh-nav-scrolled' : ''}`}>
        <Logo />
        <div className="fsh-nav-links">
          {mainNav.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/#download" className="fsh-cta">
          Download Now
        </Link>
        <button
          type="button"
          className="fsh-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="fsh-mobile-menu">
          {mainNav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <div style={{ height: 'var(--nav-h)' }} aria-hidden />
    </>
  );
}
