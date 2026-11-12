'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, Trophy, Zap, Shield, Sparkles } from 'lucide-react';
import { COURTS, ARENA_INFO } from '@/data/arena';

export default function CourtsPage() {
  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Trophy className="w-3.5 h-3.5" />
              Tournament-Grade Playing Grounds
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
              Our Playing <span className="text-emerald-400">Courts & Turfs</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Designed for serious tape ball tournaments and fast-paced futsal matches. Engineered with official boundary dimensions, precision lighting, and safety netting.
            </p>
          </div>

          {/* Courts List (Clean light cards with high legibility) */}
          <div className="space-y-12">
            {COURTS.map((court, idx) => (
              <motion.div
                key={court.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="light-card overflow-hidden grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 text-slate-900"
              >
                {/* Court Image */}
                <div className="lg:col-span-5 relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                  <Image
                    src={court.image}
                    alt={court.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                      {court.sport}
                    </span>
                  </div>
                  {court.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-md">
                        {court.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Court Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h2 className="font-display font-bold text-3xl text-slate-950">
                      {court.name}
                    </h2>
                    <p className="text-emerald-700 font-bold text-sm mt-1">
                      {court.surface}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                      {court.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                    {court.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Standard Peak Rate</div>
                      <div className="font-display font-extrabold text-2xl text-slate-950">
                        Rs {court.priceHour.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-500">/ 60 mins</span>
                      </div>
                      <div className="text-xs text-emerald-700 font-bold mt-0.5">
                        Day-time 7am-4pm offer: Rs {court.discountPriceHour.toLocaleString()}/hr (40% OFF)
                      </div>
                    </div>

                    <Link
                      href={`/book?court=${court.id}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <Calendar className="w-4 h-4" />
                      Book This Court
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Amenities Callout */}
          <div className="light-card p-8 sm:p-10 text-center max-w-4xl mx-auto space-y-4 text-slate-900">
            <h3 className="font-display font-bold text-2xl text-slate-950">
              Every Booking Includes Full Match Amenities
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Match tape-balls, stumps, heavy & light bats, floodlights, pavilion seating, and dedicated prayer area are complimentary with every hourly booking.
            </p>
            <div className="pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                View 24-Hour Availability Calendar →
              </Link>
            </div>
          </div>

        </div>

        {/* FAQs */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
