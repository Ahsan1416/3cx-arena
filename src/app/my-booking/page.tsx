'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Calendar, Phone, CheckCircle2, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { getAllBookings, Booking, formatTimeSlot } from '@/lib/storage';
import { ARENA_INFO } from '@/data/arena';

export default function MyBookingPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Booking[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const all = getAllBookings();
    const matches = all.filter((b) => {
      return (
        b.id.toLowerCase().includes(cleanQuery) ||
        b.customerPhone.replace(/\s+/g, '').includes(cleanQuery.replace(/\s+/g, ''))
      );
    });

    setResults(matches);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Search className="w-3.5 h-3.5" />
              Customer Self-Service Portal
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white uppercase italic tracking-wide">
              Track Your <span className="text-emerald-400">Match Booking</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Enter your WhatsApp phone number or Booking Reference ID (e.g. 3X-101) to view match status and receipts.
            </p>
          </div>

          {/* Search Box */}
          <div className="clean-card p-6 sm:p-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter Phone (e.g. 0300 1234567) or Ref (e.g. 3X-101)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all"
              >
                Find My Slot
              </button>
            </form>
          </div>

          {/* Results Area */}
          {searched && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Search results for: <b className="text-white font-mono">{query}</b></span>
                <span>{results.length} record(s) found</span>
              </div>

              {results.length === 0 ? (
                <div className="clean-card p-10 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                  <h3 className="font-bold text-white text-base">No Matching Bookings Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We couldn't find a reservation with those details. Please double-check your phone number or contact our desk directly on WhatsApp.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%2C%20I%20need%20help%20finding%20my%20booking`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Inquire on WhatsApp Desk →
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((b) => (
                    <div
                      key={b.id}
                      className="clean-card p-6 border-white/10 space-y-4 hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-emerald-400">
                            {b.id}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : b.status === 'completed'
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-red-950 text-red-400'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{b.date}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block">Playing Ground</span>
                          <span className="font-bold text-white text-sm">{b.courtName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Time Slot</span>
                          <span className="font-bold text-emerald-400 text-sm">
                            {formatTimeSlot(b.startHour, b.hours)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Total Match Fee</span>
                          <span className="font-bold text-white text-sm">
                            Rs {b.totalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Advance Recorded</span>
                          <span className="font-bold text-emerald-400 text-sm">
                            Rs {b.advancePaid.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Player: <b className="text-white">{b.customerName}</b> ({b.customerPhone})
                        </span>

                        <a
                          href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%2C%20regarding%20my%20booking%20${b.id}%20for%20${encodeURIComponent(b.courtName)}%20on%20${b.date}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat with Desk
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Book CTA if not booked yet */}
          <div className="clean-card p-6 text-center space-y-2">
            <h4 className="font-bold text-white text-sm">Want to reserve a new match?</h4>
            <p className="text-xs text-slate-400">
              Browse available 24-hour slots and secure your turf in 30 seconds.
            </p>
            <div className="pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-bold uppercase tracking-wider"
              >
                Go to Online Booking Engine <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

