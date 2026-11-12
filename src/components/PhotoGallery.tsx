'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Maximize2, X, ArrowRight } from 'lucide-react';

const HOME_GALLERY = [
  { src: '/assets/media/photo-turf-court-topdown.webp', title: 'Top-down Synthetic Turf', tag: 'Turf' },
  { src: '/assets/media/photo-floodlit-pitch.webp', title: 'Floodlit Match Pitch', tag: 'Night Match' },
  { src: '/assets/media/photo-batting-turf.webp', title: 'Batting Stance & Netting', tag: 'Cricket' },
  { src: '/assets/media/photo-pitch-stumps.webp', title: 'Official Stumps & Pitch', tag: 'Cricket' },
  { src: '/assets/media/photo-aerial-two-courts.webp', title: 'Dual Courts Aerial View', tag: 'Turf' },
  { src: '/assets/media/photo-bbq-grill.webp', title: 'Live Charcoal BBQ Grill', tag: 'Cafe' },
  { src: '/assets/media/photo-live-bbq-counter.webp', title: 'Player Cafe Counter', tag: 'Cafe' },
  { src: '/assets/media/photo-gbp-courts-night.webp', title: 'Night Arena Atmosphere', tag: 'Night Match' },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 relative bg-[#080C0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
              <Camera className="w-4 h-4" /> Visual Ground Tour
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase italic tracking-wide">
              Ground <span className="text-emerald-400">Gallery</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Real photos of 3X Sports Arena on Jail Road, Lahore.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:underline self-start md:self-auto"
          >
            View All Photos & 4K Drone Tour <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOME_GALLERY.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(item.src)}
              className="clean-card clean-card-hover overflow-hidden relative aspect-square cursor-pointer group"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  {item.tag}
                </span>
                <span className="text-xs font-bold text-white mt-0.5">
                  {item.title}
                </span>
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

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
    </section>
  );
}
