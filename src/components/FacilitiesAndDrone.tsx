'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Flame, Shield, Sun, Car, Check, X, Film, ArrowRight } from 'lucide-react';
import { AMENITIES, ARENA_INFO } from '@/data/arena';

export default function FacilitiesAndDrone() {
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  return (
    <section id="facilities" className="py-24 relative bg-[#080C0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <Film className="w-4 h-4" /> Complete Matchday Hub
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase italic tracking-wide">
              Facilities & <span className="text-emerald-400">Live BBQ Cafe</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Chai, hot BBQ, spectator seating, and player amenities right next to the pitch.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Full Amenities Details <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsPlayingTour(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch 4K Drone Tour
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((item, i) => (
            <div
              key={i}
              className="clean-card clean-card-hover overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1411] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3 h-3" /> Included for all players
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Drone Video Modal */}
      {isPlayingTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#080C0A]">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-emerald-400" />
                <span className="font-display font-bold text-sm text-white">
                  3X Sports Arena — 4K Aerial Drone Tour
                </span>
              </div>
              <button
                onClick={() => setIsPlayingTour(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                <source src={ARENA_INFO.droneVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
