import type { Metadata } from 'next';
import { Outfit, Syne } from 'next/font/google';
import './globals.css';
import { ARENA_INFO } from '@/data/arena';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '3X Sports Arena Lahore — 24/7 Indoor Cricket & Futsal Turf',
  description: 'Book tournament-spec artificial grass, natural pitch cricket, and FIFA futsal courts at 3X Sports Arena, Jail Road Lahore. Floodlights, live BBQ, 24/7 instant slot booking.',
  keywords: '3X Sports Arena, Indoor Cricket Lahore, Futsal Court Lahore, Jail Road Cricket, Night Turf Lahore, Book Cricket Slot',
  openGraph: {
    title: '3X Sports Arena Lahore — Indoor Cricket & Futsal Booking',
    description: 'Instant slot booking for artificial & natural cricket courts and futsal turf at 3X Sports Arena, Jail Road Lahore.',
    images: ['/assets/img/logo-256.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} dark scroll-smooth`}>
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body className="bg-arena-bg text-slate-100 min-h-screen flex flex-col font-sans selection:bg-arena-neon selection:text-black">
        {children}
      </body>
    </html>
  );
}

