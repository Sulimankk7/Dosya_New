'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--primary-dark)] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white group">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
            <svg
              width="28"
              height="28"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              {/* Back File */}
              <rect x="6" y="16" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.35" />
              {/* Middle File */}
              <rect x="10" y="12" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
              {/* Front File */}
              <rect x="14" y="8" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
              {/* Lines */}
              <line x1="18" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" />
              <line x1="18" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" />
              <line x1="18" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Text */}
          <span className="text-xl sm:text-2xl font-bold tracking-wide">
            DOSYA
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-base font-medium text-white/90">
          <li>
            <Link href="/" className="hover:text-white transition-colors py-2">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/order" className="hover:text-white transition-colors py-2">
              اطلب الآن
            </Link>
          </li>
          <li>
            <a href="#feedback" className="hover:text-white transition-colors cursor-pointer py-2">
              آراء الطلاب
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-white transition-colors cursor-pointer py-2">
              من نحن
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          <Link
            href="/order"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--cta)] text-white text-sm font-bold hover:bg-[var(--cta-hover)] transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            طلب الدوسية
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[var(--primary-dark)] border-t border-white/10 px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block py-3 px-4 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            الرئيسية
          </Link>

          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="block py-3 px-4 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            اطلب الآن
          </Link>

          <a
            href="#feedback"
            onClick={() => setOpen(false)}
            className="block py-3 px-4 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            آراء الطلاب
          </a>

          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="block py-3 px-4 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            من نحن
          </a>

          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-4 py-3 rounded-xl bg-[var(--cta)] text-white font-bold hover:bg-[var(--cta-hover)] transition-colors"
          >
            طلب الدوسية
          </Link>
        </div>
      )}
    </nav>
  );
}
