'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { COURTS } from '@/data/arena';

export default function CourtsSection() {
  return (
    <section id="courts" className="py-24 bg-white text-slate-900 border-b border-[#E2E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 mb-3">
              <Trophy className="w-3.5 h-3.5 text-emerald-600" />
              Tournament-Spec Playing Surfaces
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 uppercase italic tracking-wide">
              Choose Your <span className="text-emerald-600">Playing Ground</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Official boundary dimensions, bounce-tuned pitches, and anti-glare floodlit enclosures.
            </p>
          </div>

          <Link
            href="/courts"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 hover:underline self-start md:self-auto"
          >
            Compare All Grounds & Specs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Courts Grid with Framer Motion Stagger Animations */}
        <div className="grid lg:grid-cols-3 gap-8">
          {COURTS.map((court, idx) => (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="light-card light-card-hover overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={court.image}
                    alt={court.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/85 backdrop-blur-md text-white border border-white/20">
                      {court.sport}
                    </span>
                  </div>

                  {court.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-md">
                        {court.badge}
                      </span>
                    </div>
                  )}

                  {/* Clean Price Pill on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white">
                    <div>
                      <span className="text-[10px] text-slate-300 uppercase font-semibold block">Evening / Peak</span>
                      <span className="font-display font-bold text-lg text-white">
                        Rs {court.priceHour.toLocaleString()} <span className="text-[10px] text-slate-300 font-normal">/hr</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 uppercase font-bold block">Day Offer (40% Off)</span>
                      <span className="font-display font-bold text-base text-emerald-400">
                        Rs {court.discountPriceHour.toLocaleString()} <span className="text-[10px] text-slate-300 font-normal">/hr</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3.5">
                  <h3 className="font-display font-bold text-2xl text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {court.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700">
                    {court.surface}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {court.description}
                  </p>

                  <div className="pt-3 space-y-2 border-t border-slate-100">
                    {court.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/book?court=${court.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group-hover:shadow-emerald-500/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Select & Check Slots
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
