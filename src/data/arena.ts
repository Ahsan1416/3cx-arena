export interface Court {
  id: string;
  name: string;
  short: string;
  sport: 'Cricket' | 'Futsal';
  surface: string;
  badge?: string;
  priceHour: number; // Regular peak price
  discountPriceHour: number; // Day-time 7am-4pm offer
  image: string;
  description: string;
  features: string[];
  color: string;
}

export const ARENA_INFO = {
  name: '3X Sports Arena',
  tagline: 'One Arena. Endless Memories.',
  short: '3X',
  address: 'Bird Wood Road, PSO Pump, Jail Road, Lahore',
  city: 'Lahore',
  area: 'Jail Road / Jinnah Town',
  geo: { lat: 31.5483142, lng: 74.3230939 },
  rating: 4.8,
  reviewsCount: 38,
  phones: ['0349 0556425', '0311 9683655'],
  whatsapp: '923490556425',
  hours: 'Open 24 Hours • 7 Days a Week',
  dayOfferNotice: 'Day-time Offer: 7 AM – 4 PM (Special Discounted Rates)',
  advanceRequiredPercent: 30,
  cancelCutoffHours: 6,
  heroVideo: '/assets/media/hero.mp4',
  heroPoster: '/assets/media/hero-poster.webp',
  droneVideo: '/assets/media/drone-tour.mp4',
  logo: '/assets/img/logo-256.jpg',
};

export const COURTS: Court[] = [
  {
    id: 'c1',
    name: 'Artificial Grass Court',
    short: 'Artificial Court',
    sport: 'Cricket',
    surface: 'High-Density Turf + Precision Pitch',
    badge: 'Most Popular',
    priceHour: 2500, // User requested 2500
    discountPriceHour: 1500, // 40% daytime discount 7 AM - 4 PM
    image: '/assets/media/photo-turf-court-topdown.webp',
    description: 'Tournament-spec artificial synthetic grass court with professional netting, bounce-tuned turf pitch, and LED floodlighting.',
    features: ['High-density 50mm green turf', 'Full enclosure cage netting', 'Zero-glare high LUX floodlights', 'International boundary dimensions'],
    color: '#00FF87',
  },
  {
    id: 'c2',
    name: 'Natural Grass Court',
    short: 'Natural Court',
    sport: 'Cricket',
    surface: 'Genuine Lush Grass + Natural Pitch',
    badge: 'Authentic Experience',
    priceHour: 2200, // User requested 2200
    discountPriceHour: 1320, // Day-time offer
    image: '/assets/media/photo-aerial-two-courts.webp',
    description: 'Authentic natural grass ground for genuine cricket feel, seam movement, and true bounce under the night sky.',
    features: ['100% natural Bermuda grass', 'Curated clay center pitch', 'Open-air ventilation', 'Spectator seating pavilion'],
    color: '#10B981',
  },
  {
    id: 'c3',
    name: 'Pro Futsal Court',
    short: 'Futsal Court',
    sport: 'Futsal',
    surface: 'Shock-Absorbent FIFA-Grade Turf',
    badge: 'Fast & Dynamic',
    priceHour: 2500,
    discountPriceHour: 1500,
    image: '/assets/media/photo-gbp-courts-night.webp',
    description: 'Fast-paced, heavy-duty futsal arena with regulation goalposts, boundary netting, and quick bounce surface.',
    features: ['Shock-absorbent rubber infill turf', 'Regulation futsal goal cages', 'High-grip traction surface', 'Dugouts & player benches'],
    color: '#38BDF8',
  },
];

export const AMENITIES = [
  {
    icon: 'Flame',
    title: 'Live BBQ & Sports Cafe',
    description: 'Enjoy hot BBQ grills, cold drinks, chai, and snacks while watching the live matches.',
    image: '/assets/media/photo-bbq-grill.webp',
  },
  {
    icon: 'Sun',
    title: '360° Stadium Floodlights',
    description: 'Broadcast-quality, shadowless LED floodlighting designed for crisp visibility 24/7.',
    image: '/assets/media/photo-floodlit-pitch.webp',
  },
  {
    icon: 'ShieldCheck',
    title: 'Top-Grade Equipment',
    description: 'Match-grade tape balls, light & heavy bats, wickets, and safety pads available on demand.',
    image: '/assets/media/photo-pitch-stumps.webp',
  },
  {
    icon: 'Car',
    title: 'Spacious Secure Parking',
    description: 'Valet-friendly secure parking inside PSO premises right on main Jail Road.',
    image: '/assets/media/photo-night-side-view.webp',
  },
];

