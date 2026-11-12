'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, MessageCircle, Clock, ShieldCheck, Navigation } from 'lucide-react';
import { ARENA_INFO, COURTS } from '@/data/arena';

export default function Footer() {
  return (
    <footer className="bg-[#050806] border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={ARENA_INFO.logo}
                  alt={ARENA_INFO.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-white tracking-wider uppercase italic">
                  3X <span className="text-emerald-400">ARENA</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">{ARENA_INFO.tagline}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Lahore's premier indoor sports arena on Jail Road. Tournament-grade artificial turf, genuine natural grass pitches, shadowless floodlights, and live BBQ cafe lounge.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <a
                href="https://www.google.com/maps/search/?api=1&query=31.5483142,74.3230939"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-emerald-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{ARENA_INFO.address}</span>
              </a>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{ARENA_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Pages (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Arena Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/courts" className="hover:text-emerald-400 transition-colors">
                  Courts & Playing Grounds
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing & Daytime Offers
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-emerald-400 transition-colors">
                  Facilities & BBQ Lounge
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Photo Gallery & Drone Tour
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Arena
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Location Map
                </Link>
              </li>
              <li>
                <Link href="/my-booking" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">
                  Track My Match Booking →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Playing Courts & Rates (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Court Rates
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {COURTS.map((c) => (
                <li key={c.id}>
                  <Link href={`/book?court=${c.id}`} className="hover:text-emerald-400 transition-colors block">
                    <span className="font-semibold text-white block">{c.short}</span>
                    <span className="text-[11px] text-emerald-400">Rs {c.priceHour.toLocaleString()}/hr</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/book" className="text-xs font-bold text-emerald-400 hover:underline">
                  Book A Slot Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Direct Desk Contact
            </h4>
            <div className="space-y-2">
              {ARENA_INFO.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white hover:text-emerald-400 transition-colors text-xs font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{phone}</span>
                </a>
              ))}

              <a
                href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%203X%20Sports%20Arena`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {ARENA_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Staff & Manager Portal
            </Link>
            <span className="text-slate-600">•</span>
            <span>Jail Road, Lahore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
