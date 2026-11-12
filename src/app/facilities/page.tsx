'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Sun, Shield, Car, Coffee, Users, Check, ArrowRight } from 'lucide-react';
import { AMENITIES, ARENA_INFO } from '@/data/arena';

export default function FacilitiesPage() {
  const facilityHighlights = [
    {
      title: 'Live Charcoal BBQ & Sports Cafe',
      subtitle: 'Post-Match Food & Chilling',
      description:
        'Watch the game while enjoying freshly grilled chicken tikka, seekh kebabs, parathas, hot chai, and chilled energy drinks. Outdoor seating pavilion with clear match views.',
      image: '/assets/media/photo-bbq-grill.webp',
      badge: 'Crowd Favorite',
      points: [
        'Live charcoal BBQ grill counter',
        'Karak Chai, cold drinks & snacks',
        'Covered match spectator seating',
        'Birthday & team celebration setups',
      ],
    },
    {
      title: '360° Stadium-Grade LED Floodlights',
      subtitle: 'True Broadcast Lighting',
      description:
        'Engineered with high-LUX, anti-glare sports lighting fixtures positioned to eliminate shadows across the pitch and boundary lines, making high catches and fast bowling easy to track.',
      image: '/assets/media/photo-floodlit-pitch.webp',
      badge: 'Zero Shadow',
      points: [
        'High LUX broadcast-level illumination',
        'Balanced anti-glare fixture angles',
        '24-hour non-stop power with generator backup',
        'Crystal-clear nighttime visibility',
      ],
    },
    {
      title: 'Match-Grade Equipment & Safety Gear',
      subtitle: 'Everything You Need to Play',
      description:
        'No need to carry bulky cricket kits. We provide balanced light and heavy tape ball bats, official tournament tape balls, spring wickets, and safety gear complimentary with every slot.',
      image: '/assets/media/photo-pitch-stumps.webp',
      badge: 'Included Free',
      points: [
        'Light & heavy willow tape ball bats',
        'Professional spring-loaded stumps',
        'Heavy-duty boundary safety netting',
        'Futsal balls & training bibs available',
      ],
    },
    {
      title: 'Dedicated Parking & Player Amenities',
      subtitle: 'Convenience on Jail Road',
      description:
        'Located securely inside PSO premises on main Jail Road with ample car and bike parking. Facilities include clean player washrooms, changing areas, and a quiet prayer space.',
      image: '/assets/media/photo-night-side-view.webp',
      badge: 'Secure Location',
      points: [
        '24/7 security guard on premises',
        'Spacious car & motorcycle parking',
        'Clean washrooms & player changing area',
        'Dedicated calm prayer area',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Coffee className="w-3.5 h-3.5" />
              Complete Matchday Experience
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
              World-Class <span className="text-emerald-400">Facilities & Cafe</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We built 3X Sports Arena not just as a turf, but as a complete sporting hub where players compete, celebrate, and relax.
            </p>
          </div>

          {/* Facility Highlights Grid (Clean 2-Column layout) */}
          <div className="grid lg:grid-cols-2 gap-8">
            {facilityHighlights.map((item, idx) => (
              <div
                key={idx}
                className="clean-card overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 sm:h-72 w-full bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {item.subtitle}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-bold">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h2 className="font-display font-bold text-2xl text-white">
                      {item.title}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-white/[0.08] grid sm:grid-cols-2 gap-2.5">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="clean-card p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-4">
            <h3 className="font-display font-bold text-2xl text-white">
              Ready to Book Your Next Match?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Check live free slots tonight across artificial grass, natural grass, and futsal courts.
            </p>
            <div className="pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
              >
                Book Court Slot Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

