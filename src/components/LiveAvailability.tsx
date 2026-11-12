'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { COURTS } from '@/data/arena';
import { checkSlotAvailability, getPakistanDate } from '@/lib/storage';

export default function LiveAvailability() {
  const [selectedDate, setSelectedDate] = useState<string>(getPakistanDate(0));
  const [availableSlots, setAvailableSlots] = useState<{ [courtId: string]: number[] }>({});

  const dates = [
    { label: 'Today (Tonight)', val: getPakistanDate(0) },
    { label: 'Tomorrow', val: getPakistanDate(1) },
    { label: 'Day After', val: getPakistanDate(2) },
  ];

  // Prime peak playing hours: 5 PM to 3 AM
  const primeHours = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3];

  const calculateSlots = () => {
    const slotsMap: { [courtId: string]: number[] } = {};
    COURTS.forEach((court) => {
      const free: number[] = [];
      primeHours.forEach((h) => {
        const status = checkSlotAvailability(court.id, selectedDate, h);
        if (status === 'free') {
          free.push(h);
        }
      });
      slotsMap[court.id] = free;
    });
    setAvailableSlots(slotsMap);
  };

  useEffect(() => {
    calculateSlots();
    const handleUpdate = () => calculateSlots();
    window.addEventListener('3x-booking-updated', handleUpdate);
    return () => window.removeEventListener('3x-booking-updated', handleUpdate);
  }, [selectedDate]);

  return (
    <section id="live-slots" className="py-20 bg-[#F6F9F7] text-slate-900 border-b border-[#E2E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Live Turf Availability
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 uppercase italic tracking-wide">
              Tonight's <span className="text-emerald-700">Open Slots</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any free green slot to reserve your match advance online in 30 seconds.
            </p>
          </div>

          {/* Date Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            {dates.map((d) => (
              <button
                key={d.val}
                onClick={() => setSelectedDate(d.val)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDate === d.val
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Courts Matrix */}
        <div className="grid lg:grid-cols-3 gap-6">
          {COURTS.map((court, idx) => {
            const freeSlots = availableSlots[court.id] || [];

            return (
              <motion.div
                key={court.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="light-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-950">
                        {court.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{court.surface}</p>
                    </div>

                    <div className="text-right">
                      <div className="font-display font-bold text-lg text-slate-900">
                        Rs {court.priceHour.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">
                        / 60 mins
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
                    <span>Evening Peak Slots:</span>
                    <span className="text-emerald-700 font-extrabold">
                      {freeSlots.length} open
                    </span>
                  </div>

                  {/* Slots Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {primeHours.slice(0, 9).map((h) => {
                      const isFree = freeSlots.includes(h);
                      const label = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

                      return isFree ? (
                        <Link
                          key={h}
                          href={`/book?court=${court.id}&date=${selectedDate}&hour=${h}`}
                          className="py-2.5 px-2 rounded-xl text-center bg-emerald-50 hover:bg-emerald-500 text-emerald-800 hover:text-slate-950 border border-emerald-200 hover:border-emerald-500 text-xs font-bold transition-all group shadow-sm"
                        >
                          <span>{label}</span>
                          <span className="text-[9px] opacity-75 font-normal block">
                            Book
                          </span>
                        </Link>
                      ) : (
                        <div
                          key={h}
                          className="py-2.5 px-2 rounded-xl text-center bg-slate-100 text-slate-400 border border-slate-200 text-xs font-medium cursor-not-allowed"
                        >
                          <span>{label}</span>
                          <span className="text-[9px] opacity-50 block">Booked</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Day offer: 7am–4pm (40% off)</span>
                  <Link
                    href={`/book?court=${court.id}&date=${selectedDate}`}
                    className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1"
                  >
                    View All 24h Slots <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
