'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { COURTS, ARENA_INFO, Court } from '@/data/arena';
import {
  Booking,
  addBooking,
  checkSlotAvailability,
  formatTimeSlot,
  getPakistanDate,
  calculateSlotPrice,
  isDayTimeOffer,
} from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookPage() {
  const [selectedCourt, setSelectedCourt] = useState<Court>(COURTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>(getPakistanDate(0));
  const [selectedHour, setSelectedHour] = useState<number>(20); // 8 PM default
  const [durationHours, setDurationHours] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'Easypaisa' | 'Card' | 'Cash'>('JazzCash');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const courtParam = params.get('court');
      const dateParam = params.get('date');
      const hourParam = params.get('hour') || params.get('h');

      if (courtParam) {
        const found = COURTS.find((c) => c.id === courtParam);
        if (found) setSelectedCourt(found);
      }
      if (dateParam) {
        setSelectedDate(dateParam);
      }
      if (hourParam) {
        setSelectedHour(parseInt(hourParam, 10));
      }
    }
  }, []);

  // Generate next 14 days
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const dStr = getPakistanDate(i);
    const dateObj = new Date(dStr + 'T00:00:00Z');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    return { val: dStr, dayName, dayNum, isToday: i === 0, isTomorrow: i === 1 };
  });

  // Operating 24 hours: 6 AM to 5 AM next morning
  const hours24 = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5
  ];

  // Price calculations
  const totalAmount = calculateSlotPrice(selectedCourt, selectedHour, durationHours);
  const advanceRequired = Math.round(totalAmount * (ARENA_INFO.advanceRequiredPercent / 100));

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your full name and WhatsApp phone number');
      return;
    }

    // Overlap check
    for (let i = 0; i < durationHours; i++) {
      const h = (selectedHour + i) % 24;
      const status = checkSlotAvailability(selectedCourt.id, selectedDate, h);
      if (status !== 'free') {
        setErrorMsg(`Slot at ${formatTimeSlot(h, 1)} is already booked. Please pick another time.`);
        return;
      }
    }

    const newBooking: Booking = {
      id: `3X-${Math.floor(1000 + Math.random() * 9000)}`,
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      date: selectedDate,
      startHour: selectedHour,
      hours: durationHours,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      notes: notes.trim(),
      totalPrice: totalAmount,
      advancePaid: advanceRequired,
      paymentMethod,
      status: 'confirmed',
      source: 'online',
      createdAt: new Date().toISOString(),
    };

    const success = addBooking(newBooking);
    if (!success) {
      setErrorMsg('This slot was just taken. Please choose another slot.');
      return;
    }

    setConfirmedBooking(newBooking);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E575', '#10B981', '#ffffff', '#FFC83D'],
      });
    } catch (e) {
      // fallback
    }
  };

  const copyBookingId = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Title */}
          <div className="mb-10 pb-6 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                Instant Reservation Engine
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase italic tracking-wide mt-1">
                Book A <span className="text-emerald-400">Match Slot</span>
              </h1>
            </div>

            <Link
              href="/pricing"
              className="text-xs text-slate-400 hover:text-white underline hidden sm:block"
            >
              View Rate Card & Daytime Discounts
            </Link>
          </div>

          {confirmedBooking ? (
            /* Confirmation Receipt */
            <div className="max-w-2xl mx-auto clean-card p-8 sm:p-10 text-center space-y-6 border-emerald-500/40">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  SLOT RESERVED SUCCESSFULLY
                </span>
                <h2 className="font-display font-extrabold text-3xl text-white mt-1">
                  Your Match Is Locked In!
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  We've saved your slot at 3X Sports Arena on Jail Road, Lahore.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs text-slate-400">Booking Reference</span>
                  <button
                    onClick={copyBookingId}
                    className="font-mono font-bold text-sm text-emerald-400 flex items-center gap-1.5 hover:underline"
                  >
                    {confirmedBooking.id}
                    {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Ground</span>
                    <span className="font-bold text-white text-sm">{confirmedBooking.courtName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time</span>
                    <span className="font-bold text-white text-sm">
                      {confirmedBooking.date} • {formatTimeSlot(confirmedBooking.startHour, confirmedBooking.hours)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Player Name</span>
                    <span className="font-bold text-white text-sm">{confirmedBooking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Phone</span>
                    <span className="font-bold text-white text-sm">{confirmedBooking.customerPhone}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Total Match Fee</span>
                    <div className="font-display font-bold text-lg text-white">
                      Rs {confirmedBooking.totalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-semibold">30% Advance Required</span>
                    <div className="font-display font-extrabold text-xl text-emerald-400">
                      Rs {confirmedBooking.advancePaid.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${ARENA_INFO.whatsapp}?text=${encodeURIComponent(
                    `Assalam o Alaikum 3X Sports Arena, I have booked slot ${confirmedBooking.id} for ${confirmedBooking.courtName} on ${confirmedBooking.date} at ${formatTimeSlot(confirmedBooking.startHour, confirmedBooking.hours)}. Total: Rs ${confirmedBooking.totalPrice}, Advance: Rs ${confirmedBooking.advancePaid}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950" />
                  Send Confirmation on WhatsApp Desk
                </a>

                <div className="flex items-center justify-center gap-4 text-xs">
                  <button
                    onClick={() => setConfirmedBooking(null)}
                    className="text-slate-400 hover:text-white underline"
                  >
                    Book Another Slot
                  </button>
                  <span className="text-slate-700">•</span>
                  <Link href="/my-booking" className="text-emerald-400 hover:underline">
                    Track in My Booking →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* 2-Column Booking Layout */
            <div className="grid lg:grid-cols-12 gap-10">
              
              {/* Left Column: 4 Selection Steps (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Step 1: Court Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      1. Select Playing Ground
                    </span>
                    <span className="text-xs text-slate-400">All grounds tournament size</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    {COURTS.map((court) => {
                      const isSelected = selectedCourt.id === court.id;
                      return (
                        <button
                          key={court.id}
                          type="button"
                          onClick={() => setSelectedCourt(court)}
                          className={`p-4 rounded-xl text-left transition-all border ${
                            isSelected
                              ? 'bg-emerald-950/20 border-emerald-400 text-white shadow-md'
                              : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] text-slate-300'
                          }`}
                        >
                          <div className="font-display font-bold text-base text-white">
                            {court.short}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {court.surface}
                          </div>
                          <div className="font-display font-extrabold text-sm text-emerald-400 mt-2">
                            Rs {court.priceHour.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/hr</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      2. Select Match Date
                    </span>
                    <span className="text-xs text-slate-400">Open next 14 days</span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {dateOptions.map((d) => {
                      const isSelected = selectedDate === d.val;
                      return (
                        <button
                          key={d.val}
                          type="button"
                          onClick={() => setSelectedDate(d.val)}
                          className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all border min-w-[76px] ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-400 shadow-sm'
                              : 'bg-white/[0.03] text-slate-300 border-white/[0.06] hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
                            {d.isToday ? 'Today' : d.isTomorrow ? 'Tmrw' : d.dayName}
                          </div>
                          <div className="text-sm font-display font-extrabold mt-0.5">
                            {d.dayNum}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Match Duration */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      3. Match Duration
                    </span>
                    <span className="text-xs text-slate-400">Consecutive hours</span>
                  </div>

                  <div className="flex gap-3">
                    {[1, 2, 3].map((hrs) => (
                      <button
                        key={hrs}
                        type="button"
                        onClick={() => setDurationHours(hrs)}
                        className={`flex-1 py-3 px-4 rounded-xl text-center border font-display font-bold text-xs uppercase tracking-wider transition-all ${
                          durationHours === hrs
                            ? 'bg-emerald-950/25 border-emerald-400 text-emerald-400'
                            : 'bg-white/[0.03] border-white/[0.06] text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        {hrs} {hrs === 1 ? 'Hour Match' : 'Hours Match'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Time Slot Matrix */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      4. Choose Starting Slot
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Free
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-slate-700" /> Booked
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {hours24.map((h) => {
                      const status = checkSlotAvailability(selectedCourt.id, selectedDate, h);
                      const isFree = status === 'free';
                      const isSelected = selectedHour === h;
                      const isOffer = isDayTimeOffer(h);
                      const label = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;

                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={!isFree}
                          onClick={() => setSelectedHour(h)}
                          className={`p-2.5 rounded-xl text-center border transition-all relative flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-400 shadow-md scale-105 z-10'
                              : isFree
                              ? 'bg-white/[0.03] text-slate-200 border-white/[0.06] hover:bg-white/[0.08] hover:border-emerald-500/40'
                              : 'bg-white/[0.01] text-slate-600 border-white/[0.03] cursor-not-allowed opacity-40'
                          }`}
                        >
                          <span className="text-xs font-semibold">{label}</span>
                          {isOffer && isFree && (
                            <span className={`text-[8px] font-bold px-1 rounded mt-0.5 ${isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-300'}`}>
                              40% OFF
                            </span>
                          )}
                          {!isFree && (
                            <span className="text-[8px] uppercase tracking-wider mt-0.5">Taken</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Checkout Details (4 cols) */}
              <div className="lg:col-span-4">
                <div className="clean-card p-6 sm:p-7 space-y-6 sticky top-28">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">
                      Match Breakdown
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pay 30% advance to lock your time slot
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ground</span>
                      <span className="font-bold text-white">{selectedCourt.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date</span>
                      <span className="font-bold text-white">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Slot</span>
                      <span className="font-bold text-emerald-400">
                        {formatTimeSlot(selectedHour, durationHours)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration</span>
                      <span className="font-bold text-white">{durationHours} hr ({durationHours * 60} mins)</span>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08] flex justify-between items-baseline">
                      <span className="text-slate-300 font-bold">Total Arena Fee</span>
                      <span className="font-display font-extrabold text-base text-white">
                        Rs {totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08] flex justify-between items-baseline">
                      <span className="text-emerald-400 font-bold">30% Advance Deposit</span>
                      <span className="font-display font-extrabold text-xl text-emerald-400">
                        Rs {advanceRequired.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Captain / Player Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usama Khan"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Match Notes / Equipment Needed
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Need tape ball bats & stumps"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Advance Payment Option
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['JazzCash', 'Easypaisa', 'Card', 'Cash'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPaymentMethod(m)}
                            className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                              paymentMethod === m
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                                : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
                    >
                      Confirm Slot & Lock Booking
                    </button>

                    <p className="text-[11px] text-slate-500 text-center">
                      100% Free cancellation up to 6 hours before match
                    </p>
                  </form>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
