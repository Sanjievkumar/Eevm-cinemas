'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { navigationItems, cinemaInfo } from '@/lib/data/mock-data';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#060709]/90 backdrop-blur-md border-b border-[#1E2631]/80 shadow-2xl shadow-black/60 py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
        )}
      >
        <nav
          className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo / Brand — Official EVM Cinemas Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            aria-label="EVM Cinemas — Fort Kochi"
          >
            <img
              src="/images/brand/evm-logo.png"
              alt="EVM Cinemas Logo"
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col border-l border-[#273244] pl-2.5 sm:pl-3">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-black tracking-widest uppercase text-cinema-pure-white leading-tight">
                FORT KOCHI
              </span>
              <span className="text-[0.52rem] font-bold tracking-wider uppercase text-brand-gold leading-tight">
                EVM CINEMAS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-md transition-all',
                  'text-cinema-gray-300 hover:text-cinema-pure-white hover:bg-white/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Header Action Area: Social Icons + Gold CTA */}
          <div className="flex items-center gap-4">
            {/* Social Icons (Instagram, Facebook, X, YouTube) */}
            <div className="hidden xl:flex items-center gap-3 text-cinema-gray-400">
              <a
                href={cinemaInfo.socialLinks.instagram || 'https://www.instagram.com/evmcinemasfortkochi/'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cyan transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={cinemaInfo.socialLinks.facebook || 'https://www.facebook.com/evmcinemasfortkochi'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cyan transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={cinemaInfo.socialLinks.twitter || 'https://x.com/EVMCinemasKochi'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cyan transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={cinemaInfo.socialLinks.youtube || 'https://www.youtube.com/@evmcinemafortkochi'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cyan transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>

            {/* BOOK TICKETS -> Gold Pill CTA */}
            <Link
              href="/#now-showing"
              className={cn(
                'inline-flex items-center gap-1.5 sm:gap-2',
                'px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[0.72rem] sm:text-sm font-bold tracking-wide uppercase',
                'bg-brand-gold text-cinema-black hover:bg-brand-gold-light active:bg-brand-gold-dark',
                'shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)]',
                'transition-all duration-300 transform hover:-translate-y-0.5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold'
              )}
            >
              <span>Book Tickets</span>
              <svg
                className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-cinema-gray-300 hover:text-cinema-pure-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={cn(
                    'w-full h-0.5 bg-current transition-all duration-300 origin-left',
                    isMobileMenuOpen && 'rotate-45 translate-x-1 -translate-y-0.5'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-current transition-all duration-300 origin-left',
                    isMobileMenuOpen && '-rotate-45 translate-x-1 translate-y-0.5'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobileMenu}
      />

      <div
        className={cn(
          'fixed top-0 right-0 z-40 h-full w-[85vw] max-w-sm bg-[#0C0F14] border-l border-[#1E2631]',
          'flex flex-col pt-20 px-6 pb-8 transition-transform duration-300 ease-in-out lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 px-4 text-base font-medium text-cinema-gray-200 hover:text-brand-cyan hover:bg-white/5 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="pt-6 border-t border-[#1E2631]">
          <Link
            href="/#now-showing"
            className="w-full py-3 rounded-full bg-brand-gold text-cinema-black font-bold text-center block text-sm uppercase tracking-wider shadow-lg"
            onClick={closeMobileMenu}
          >
            Book Tickets &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
