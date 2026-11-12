'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, ArrowRight, Zap } from 'lucide-react';
import { COURTS, ARENA_INFO } from '@/data/arena';

export default function InteractivePricing() {
  return (
    <section id="pricing" className="py-24 bg-white text-slate-900 border-t border-b border-[#E2E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              Transparent Match Rates
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 uppercase italic tracking-wide">
              Official Rates & <span className="text-emerald-700">Daytime Offers</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Per 60-minute match slot. Save 40% when you book between 7:00 AM and 4:00 PM.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 hover:underline self-start md:self-auto"
          >
            Full Rate Card & Rules <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {COURTS.map((court, idx) => (
            <motion.div
              key={court.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`light-card light-card-hover p-7 flex flex-col justify-between ${
                court.badge ? 'border-emerald-500/50 shadow-lg' : ''
              }`}
            >
              <div>
                {court.badge && (
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 uppercase tracking-wide">
                      {court.badge}
                    </span>
                  </div>
                )}

                <h3 className="font-display font-bold text-2xl text-slate-950">
                  {court.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{court.surface}</p>

                {/* Standard Peak Rate */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">
                    Standard Evening & Peak (4 PM – 7 AM)
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-extrabold text-3xl text-slate-950">
                      Rs {court.priceHour.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">/ 60 mins</span>
                  </div>
                </div>

                {/* Daytime Offer */}
                <div className="mt-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] text-emerald-800 uppercase font-bold flex items-center justify-between">
                    <span>Day Offer (7 AM – 4 PM)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">
                      40% OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-extrabold text-2xl text-emerald-700">
                      Rs {court.discountPriceHour.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">/ 60 mins</span>
                  </div>
                </div>

                {/* Feature Bullets */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Tape ball bats, balls & stumps included free</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Stadium-grade LED floodlights included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>30% advance deposit to lock slot</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  href={`/book?court=${court.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Book {court.short}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Policies */}
        <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Free Cancellation</h4>
              <p className="text-xs text-slate-600 mt-1">
                Cancel up to {ARENA_INFO.cancelCutoffHours} hours before slot time for a 100% full refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">30% Advance Only</h4>
              <p className="text-xs text-slate-600 mt-1">
                Lock your match with 30% advance via JazzCash, Easypaisa, or Card. Pay rest at venue.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Open 24/7 All Week</h4>
              <p className="text-xs text-slate-600 mt-1">
                Round-the-clock match scheduling for midnight leagues and weekend warmups.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
