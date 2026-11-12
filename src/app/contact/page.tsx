'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, MapPin, MessageCircle, Clock, Mail, Send, CheckCircle2, Navigation } from 'lucide-react';
import { ARENA_INFO } from '@/data/arena';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Slot Booking');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Assalam o Alaikum, my name is ${name} (${phone}). Topic: ${topic}. Message: ${message}`;
    window.open(`https://wa.me/${ARENA_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Phone className="w-3.5 h-3.5" />
              Get in Touch With Management
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
              Contact & <span className="text-emerald-400">Arena Location</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Have questions about corporate tournament packages, recurring slot bookings, or directions? Contact us directly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Phone Numbers */}
              <div className="clean-card p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-white">Call for Instant Booking</h3>
                <div className="space-y-3">
                  {ARENA_INFO.phones.map((p, i) => (
                    <a
                      key={i}
                      href={`tel:${p.replace(/\s+/g, '')}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white hover:text-emerald-400 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400">Direct Phone Line</div>
                        <div className="font-mono font-bold text-sm">{p}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp & Hours */}
              <div className="clean-card p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-white">WhatsApp & Operating Hours</h3>
                
                <a
                  href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%203X%20Sports%20Arena`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on Official WhatsApp
                </a>

                <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{ARENA_INFO.hours}</span>
                </div>
              </div>

              {/* Address & Google Maps */}
              <div className="clean-card p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-white">Venue Location</h3>
                <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{ARENA_INFO.address}</span>
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=31.5483142,74.3230939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Open in Google Maps Directions →
                </a>
              </div>

            </div>

            {/* Right Column: Clean Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="clean-card p-8 sm:p-10 space-y-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-white">
                    Send An Inquiry
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill this out to instantly connect with our arena management.
                  </p>
                </div>

                {sent ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h3 className="font-bold text-white text-base">Inquiry Prepared!</h3>
                    <p className="text-xs text-slate-300">
                      Your message has been sent to our WhatsApp desk. We usually reply in under 5 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Captain Bilal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Phone / WhatsApp Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0D1411] border border-white/10 text-white outline-none focus:border-emerald-400 transition-colors"
                      >
                        <option value="Slot Booking">Hourly Slot Booking</option>
                        <option value="Corporate Tournament">Corporate Tournament / Cup</option>
                        <option value="Recurring Weekly Slot">Recurring Weekly Slot</option>
                        <option value="BBQ & Birthday Party">BBQ & Birthday Match Party</option>
                        <option value="Feedback / Other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Message / Special Request
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us your date, preferred court, or match details..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
                    >
                      <Send className="w-4 h-4" />
                      Send to Arena Desk on WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

