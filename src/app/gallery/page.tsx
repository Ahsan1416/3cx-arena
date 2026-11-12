'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Camera, Maximize2, X, Play, Film } from 'lucide-react';
import { ARENA_INFO } from '@/data/arena';

const GALLERY_PHOTOS = [
  { src: '/assets/media/photo-turf-court-topdown.webp', title: 'Top-down Synthetic Turf', tag: 'Turf' },
  { src: '/assets/media/photo-floodlit-pitch.webp', title: 'Tournament Pitch Under Lights', tag: 'Night Match' },
  { src: '/assets/media/photo-batting-turf.webp', title: 'Batting Stance & Netting', tag: 'Cricket' },
  { src: '/assets/media/photo-pitch-stumps.webp', title: 'Spring Stumps & Crease', tag: 'Cricket' },
  { src: '/assets/media/photo-aerial-two-courts.webp', title: 'Dual Courts Aerial View', tag: 'Turf' },
  { src: '/assets/media/photo-bbq-grill.webp', title: 'Live Charcoal Barbecue', tag: 'Cafe' },
  { src: '/assets/media/photo-live-bbq-counter.webp', title: 'Food & Chai Counter', tag: 'Cafe' },
  { src: '/assets/media/photo-gbp-courts-night.webp', title: 'Night Arena Atmosphere', tag: 'Night Match' },
  { src: '/assets/media/photo-night-side-view.webp', title: 'Pavilion & Boundary View', tag: 'Turf' },
  { src: '/assets/media/photo-corporate-bbq-seating.webp', title: 'Spectator Seating Lounge', tag: 'Cafe' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const filters = ['All', 'Turf', 'Cricket', 'Night Match', 'Cafe'];

  const filteredPhotos =
    activeFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.tag === activeFilter);

  return (
    <div className="min-h-screen bg-[#080C0A] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <Camera className="w-3.5 h-3.5" />
                Real Arena Photos & Video
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white uppercase italic tracking-wide">
                Ground <span className="text-emerald-400">Gallery & Tour</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Take a virtual tour of 3X Sports Arena on Jail Road Lahore. Real, unedited photos of our courts, pitches, cafe, and floodlights.
              </p>
            </div>

            {/* Clean Filter Pills */}
            <div className="flex flex-wrap gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] self-start md:self-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === f
                      ? 'bg-emerald-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Drone Tour Video Section */}
          <div className="clean-card overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-emerald-400" />
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                  4K Aerial Drone Tour
                </h2>
              </div>
              <span className="text-xs text-slate-400">High Definition Video</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/[0.08]">
              <video
                controls
                playsInline
                poster="/assets/media/hero-poster.webp"
                className="w-full h-full object-cover"
              >
                <source src={ARENA_INFO.droneVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(photo.src)}
                className="clean-card clean-card-hover overflow-hidden relative aspect-square cursor-pointer group"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    {photo.tag}
                  </span>
                  <span className="text-xs font-bold text-white mt-0.5">
                    {photo.title}
                  </span>
                  <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-[80vh]">
            <Image
              src={selectedPhoto}
              alt="Enlarged photo"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:text-emerald-400 border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

