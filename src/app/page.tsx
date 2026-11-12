'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveAvailability from '@/components/LiveAvailability';
import CourtsSection from '@/components/CourtsSection';
import FacilitiesAndDrone from '@/components/FacilitiesAndDrone';
import InteractivePricing from '@/components/InteractivePricing';
import PhotoGallery from '@/components/PhotoGallery';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { ARENA_INFO } from '@/data/arena';
import { X, Film } from 'lucide-react';

export default function HomePage() {
  const [droneModalOpen, setDroneModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080C0A]">
      <Navbar />

      {/* 1. Hero: Cinematic Dark Video */}
      <HeroSection onWatchDrone={() => setDroneModalOpen(true)} />

      {/* 2. Live Availability: Bright, Clean, Crisp Light Mode */}
      <LiveAvailability />

      {/* 3. Courts: Pure White, Clean Contrast, Animated Cards */}
      <CourtsSection />

      {/* 4. Facilities: Athletic Deep Dark for BBQ & Night Floodlights */}
      <FacilitiesAndDrone />

      {/* 5. Pricing: Pure White, High Legibility Rate Card */}
      <InteractivePricing />

      {/* 6. Gallery: Photography Lightbox Mode */}
      <PhotoGallery />

      {/* 7. FAQs: Bright, Crisp Light Background with Animated Accordions */}
      <FAQSection />

      {/* 8. Footer: Sleek Dark */}
      <Footer />

      {/* Global Drone Video Modal */}
      {droneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#080C0A]">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-emerald-400" />
                <span className="font-display font-bold text-sm text-white">
                  3X Sports Arena — 4K Aerial Drone Tour
                </span>
              </div>
              <button
                onClick={() => setDroneModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                <source src={ARENA_INFO.droneVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
