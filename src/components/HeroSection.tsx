'use client';

import Link from 'next/link';
import { Play, Calendar, Star, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { ARENA_INFO, COURTS } from '@/data/arena';

export default function HeroSection({ onWatchDrone }: { onWatchDrone: () => void }) {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      
      {/* 1. Clean Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={ARENA_INFO.heroPoster}
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.08]"
        >
          <source src={ARENA_INFO.heroVideo} type="video/mp4" />
        </video>
        {/* Soft, clean vertical gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0A] via-[#080C0A]/60 to-[#080C0A]/40" />
      </div>

      {/* 2. Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Clean Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Open 24 Hours • Jail Road Lahore
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight uppercase italic text-white">
              ONE ARENA. <br />
              <span className="text-emerald-400">
                ENDLESS MEMORIES.
              </span>
            </h1>

            {/* Clean Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Book tournament-grade artificial grass, genuine natural pitch cricket, and FIFA-standard futsal courts with broadcast floodlights and live BBQ cafe.
            </p>

            {/* 3 Clean Price Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="clean-card p-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Artificial Grass
                </div>
                <div className="font-display font-bold text-xl text-white mt-1">
                  Rs 2,500 <span className="text-xs font-normal text-slate-400">/hr</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">
                  Synthetic Turf + Pitch
                </div>
              </div>

              <div className="clean-card p-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Natural Grass
                </div>
                <div className="font-display font-bold text-xl text-white mt-1">
                  Rs 2,200 <span className="text-xs font-normal text-slate-400">/hr</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">
                  Bermuda Grass + Clay
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 clean-card p-4 flex flex-col justify-center bg-emerald-950/20 border-emerald-500/20">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Day-time Offer
                </div>
                <div className="font-display font-bold text-xl text-white mt-1">
                  40% OFF
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  7 AM – 4 PM Slots
                </div>
              </div>
            </div>

            {/* Clean CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                Book A Match Slot
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <button
                onClick={onWatchDrone}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                Watch Arena Tour
              </button>
            </div>

            {/* Google Rating proof */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.8 / 5.0</span>
                <span>(Google Verified)</span>
              </div>
              <span>•</span>
              <span className="text-slate-300">Instant WhatsApp Booking</span>
            </div>

          </div>

          {/* Right Column: Clean Quick-Book Widget (5 cols) */}
          <div className="lg:col-span-5">
            <div className="clean-card p-6 sm:p-7 space-y-5 bg-[#0D1411]/95 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Select Your Ground</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Instant online slot reservation</p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  30% Advance
                </span>
              </div>

              <div className="space-y-3">
                {COURTS.map((court) => (
                  <Link
                    key={court.id}
                    href={`/book?court=${court.id}`}
                    className="block p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                          {court.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{court.surface}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-sm text-white">
                          Rs {court.priceHour.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-semibold group-hover:underline">
                          Select →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> PSO Pump, Jail Road
                </span>
                <Link href="/pricing" className="text-emerald-400 font-semibold hover:underline">
                  View Full Rates →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
