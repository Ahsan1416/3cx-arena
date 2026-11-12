'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, MapPin, Clock, Star, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { ARENA_INFO } from '@/data/arena';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Heart className="w-3.5 h-3.5" />
              Built for Lahore's Sports Lovers
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
              The Story of <span className="text-emerald-400">3X Sports Arena</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              One Arena. Endless Memories. Founded with a vision to give tape ball cricketers and futsal teams the highest quality pitches in the heart of Lahore.
            </p>
          </div>

          {/* Story & Image Row */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Why 3X Was Built
              </h2>
              <p>
                For years, Lahore's passionate cricketers and football players had to compromise with uneven pitches, poor lighting, or far-flung locations. 
              </p>
              <p>
                In 2026, <strong>3X Sports Arena</strong> was launched right on Jail Road (Bird Wood Road, inside PSO Pump premises). We engineered two specialized cricket grounds—an authentic natural grass pitch for genuine bounce and seam, alongside a synthetic artificial turf cage for high-scoring tape ball tournaments—plus a FIFA-spec futsal turf.
              </p>
              <p>
                Combined with a live charcoal BBQ cafe, tea lounge, clean washrooms, and round-the-clock lighting, 3X has quickly become Lahore's favorite sports destination with over 38+ 5-star Google ratings.
              </p>
            </div>

            <div className="lg:col-span-6 relative h-96 rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <Image
                src="/assets/media/photo-aerial-two-courts.webp"
                alt="3X Sports Arena Grounds"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-display font-bold text-lg text-white">
                  3X Sports Arena • Jail Road, Lahore
                </span>
                <p className="text-xs text-emerald-400 mt-1">Dual Cricket & Futsal Enclosures</p>
              </div>
            </div>
          </div>

          {/* 4 Pillars / Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="clean-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">True Dimensions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Proper boundary distance and pitch length designed according to tournament standards.
              </p>
            </div>

            <div className="clean-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Always Open (24/7)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Play early morning practice matches, afternoon friendly leagues, or midnight corporate cups.
              </p>
            </div>

            <div className="clean-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Safe & Family Friendly</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located within secure commercial premises with dedicated family/spectator seating and parking.
              </p>
            </div>

            <div className="clean-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">4.8★ Rated</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trusted by 500+ regular teams, schools, colleges, and corporate organizations across Lahore.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="clean-card p-8 sm:p-10 border-emerald-500/20 bg-emerald-950/[0.1] text-center max-w-4xl mx-auto space-y-4">
            <h3 className="font-display font-bold text-2xl text-white">
              Come Experience 3X For Yourself
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Book a slot online in 30 seconds or visit us on Jail Road, Lahore.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all shadow-md"
              >
                Book A Match Slot Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                View Location Map & Directions
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

