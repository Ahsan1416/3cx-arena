'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Clock, ArrowRight, Zap, HelpCircle } from 'lucide-react';
import { COURTS, ARENA_INFO } from '@/data/arena';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5" />
              Transparent Pricing & Rate Card
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
              Court Rates & <span className="text-emerald-400">Daytime Offers</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Clear, transparent pricing per 60-minute match slot. Save 40% when you book between 7:00 AM and 4:00 PM.
            </p>
          </div>

          {/* Pricing Table (Clean White Card) */}
          <div className="light-card overflow-hidden text-slate-900">
            <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
              <h2 className="font-display font-bold text-2xl text-slate-950">Official Rate Card</h2>
              <p className="text-xs text-slate-500 mt-1">
                Rates include match equipment, LED floodlighting, and pitch preparation.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Ground / Court</th>
                    <th className="py-4 px-6">Surface Type</th>
                    <th className="py-4 px-6">
                      Evening & Peak <br />
                      <span className="text-[10px] text-slate-500 font-normal">4:00 PM – 7:00 AM</span>
                    </th>
                    <th className="py-4 px-6">
                      Daytime Offer (40% Off) <br />
                      <span className="text-[10px] text-emerald-700 font-bold">7:00 AM – 4:00 PM</span>
                    </th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {COURTS.map((court) => (
                    <tr key={court.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-950 text-base">
                        {court.name}
                        {court.badge && (
                          <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                            {court.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-6 text-slate-600 text-xs">
                        {court.surface}
                      </td>
                      <td className="py-5 px-6 font-display font-extrabold text-lg text-slate-950">
                        Rs {court.priceHour.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500"> /hr</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-display font-extrabold text-lg text-emerald-700">
                          Rs {court.discountPriceHour.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500"> /hr</span>
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          SAVE Rs {(court.priceHour - court.discountPriceHour).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <Link
                          href={`/book?court=${court.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all"
                        >
                          Book Slot
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Booking & Refund Policies (Light Cards) */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="light-card p-6 space-y-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950">30% Advance Deposit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay only 30% advance via JazzCash, Easypaisa, or Card to lock your slot. Remaining balance can be paid in cash at the venue upon arrival.
              </p>
            </div>

            <div className="light-card p-6 space-y-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950">100% Free Cancellation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plans change? Cancel free of charge up to {ARENA_INFO.cancelCutoffHours} hours before your scheduled slot for an instant 100% refund of any advance paid.
              </p>
            </div>

            <div className="light-card p-6 space-y-3 text-slate-900">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-950">Open 24/7 All Week</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Play early morning, midday, or midnight tournaments. High-output floodlights ensure crystal-clear visibility at any hour.
              </p>
            </div>
          </div>

          {/* Corporate / Tournament Packages */}
          <div className="light-card p-8 sm:p-10 border-emerald-500/30 bg-emerald-50 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Special Corporate & Tournament Packages
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-950">
                Booking 3 or More Consecutive Hours?
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                We offer bulk discounts, dedicated BBQ counters, and custom trophies for corporate cups and weekend leagues. Contact our manager directly.
              </p>
            </div>

            <a
              href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%2C%20I%20want%20to%20inquire%20about%20a%20corporate%20tournament%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all flex-shrink-0"
            >
              Inquire on WhatsApp →
            </a>
          </div>

        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
