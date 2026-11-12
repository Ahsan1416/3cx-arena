'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Calendar, ShieldCheck, Menu, X, Search } from 'lucide-react';
import { ARENA_INFO } from '@/data/arena';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courts', label: 'Courts' },
    { href: '/pricing', label: 'Pricing & Offers' },
    { href: '/facilities', label: 'Facilities & BBQ' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3.5 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-emerald-400/50 transition-colors">
              <Image
                src="/assets/img/logo-256.jpg"
                alt="3X Sports Arena"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-white uppercase italic">
                  3X <span className="text-emerald-400">ARENA</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open 24/7
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Jail Road, Lahore</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/my-booking"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-semibold flex items-center gap-1.5"
              title="Track My Booking"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Track</span>
            </Link>

            <a
              href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%203X%20Sports%20Arena`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Slot
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="px-3 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-5 border-t border-white/10 bg-[#0C120F] rounded-2xl p-4 space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <Link
                href="/my-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" /> Track Booking
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Staff Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
