'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { ARENA_INFO } from '@/data/arena';

const FAQS = [
  {
    q: 'What are the hourly rates for the courts?',
    a: 'Artificial Synthetic Grass Court is Rs 2,500/hour, Natural Grass Pitch Court is Rs 2,200/hour, and Pro Futsal Court is Rs 2,500/hour. If you play during daytime hours (7:00 AM – 4:00 PM), you get a special 40% discount across all courts (e.g. Artificial Turf is only Rs 1,500/hr).',
  },
  {
    q: 'How does the online slot booking and advance payment work?',
    a: 'You can reserve any slot in 30 seconds on our website. To lock your slot, you only need to pay a 30% advance deposit via JazzCash, Easypaisa, or Debit/Credit Card. The remaining 70% balance can be paid in cash at the venue upon arrival.',
  },
  {
    q: 'Is 3X Sports Arena really open 24 hours a day?',
    a: 'Yes! 3X Sports Arena is fully operational 24 hours a day, 7 days a week. We host midnight tournaments, early morning practice sessions, and weekend corporate cups with continuous floodlighting and uninterrupted generator backup.',
  },
  {
    q: 'What match equipment is provided free of cost?',
    a: 'Every hourly booking includes balanced light and heavy tape ball bats, tournament-grade tape balls, spring-loaded wickets, boundary netting, and futsal balls/bibs. You do not need to bring your own gear.',
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'We offer 100% free cancellation up to 6 hours before your scheduled match slot. Any advance deposit paid will be refunded immediately without deduction. Cancellations made within 6 hours or no-shows are non-refundable.',
  },
  {
    q: 'Can we arrange a live BBQ party or corporate tournament?',
    a: 'Absolutely! Our live charcoal BBQ cafe can cater corporate leagues, birthday tournaments, and friendly matches with fresh chicken tikka, seekh kebabs, karak chai, and energy drinks. Contact our desk on WhatsApp for custom bulk hourly packages.',
  },
  {
    q: 'Where is 3X Sports Arena located and is parking available?',
    a: 'We are conveniently located on Bird Wood Road, inside the PSO Pump premises right on main Jail Road, Lahore. Ample secure car and motorcycle parking with 24/7 on-site security is available for all players and guests.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#F6F9F7] text-slate-900 border-t border-b border-[#E2E8E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-bold border border-emerald-500/30">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Frequently Asked Questions
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 uppercase italic tracking-wide">
            Got Questions? <span className="text-emerald-600">We Have Answers</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about court bookings, rates, cancellations, and amenities at 3X Sports Arena.
          </p>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="light-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen
                        ? 'bg-emerald-500 text-slate-950 rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions? Callout box */}
        <div className="light-card p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-6 border-emerald-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg text-slate-900">
              Have a special request or custom tournament?
            </h3>
            <p className="text-xs text-slate-500">
              Our front desk manager is active on WhatsApp 24/7 to assist with inquiries.
            </p>
          </div>

          <a
            href={`https://wa.me/${ARENA_INFO.whatsapp}?text=Assalam%20o%20Alaikum%2C%20I%20have%20a%20question%20about%203X%20Sports%20Arena`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Ask on WhatsApp Desk
          </a>
        </div>

      </div>
    </section>
  );
}

