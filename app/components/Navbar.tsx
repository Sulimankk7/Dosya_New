'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#020617] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative">

        {/* Logo */}
    <Link href="/" className="flex items-center gap-2 text-white">
  {/* Icon */}
  <svg
    width="42"
    height="42"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block text-white"
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

  {/* Text (on the RIGHT) */}
  <span className="text-xl sm:text-2xl font-bold tracking-wide">
    DOSYA
  </span>
</Link>


        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-base font-medium text-white">
          <li>
            <Link href="/" className="hover:text-[var(--primary)] transition">
              الصفحة الرئيسية
            </Link>
          </li>

          <li>
            <Link href="/order" className="hover:text-[var(--primary)] transition">
              اطلب الآن
            </Link>
          </li>

          <li>
            <a href="#feedback" className="hover:text-[var(--primary)] transition cursor-pointer">
              آراء الطلاب
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-[var(--primary)] transition cursor-pointer">
              من نحن
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 text-white">
          <ThemeToggle />

          <Link
            href="/order"
            className="hidden sm:inline-block px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            طلب الدوسية
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-xl"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#020617] border-t border-white/10 px-4 py-4 space-y-4 text-white">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-[var(--primary)]">
            الصفحة الرئيسية
          </Link>

          <Link href="/order" onClick={() => setOpen(false)} className="block hover:text-[var(--primary)]">
            اطلب الآن
          </Link>

          <a href="#feedback" onClick={() => setOpen(false)} className="block hover:text-[var(--primary)]">
            آراء الطلاب
          </a>

          <a href="#about" onClick={() => setOpen(false)} className="block hover:text-[var(--primary)]">
            من نحن
          </a>

          <Link
            href="/order"
            onClick={() => setOpen(false)}
            className="block text-center mt-3 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold"
          >
            طلب الدوسية
          </Link>
        </div>
      )}
    </nav>
  );
}
