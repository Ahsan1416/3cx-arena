import { COURTS, Court } from '@/data/arena';

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: string; // YYYY-MM-DD
  startHour: number; // 0..23
  hours: number;
  customerName: string;
  customerPhone: string;
  notes?: string;
  totalPrice: number;
  advancePaid: number;
  paymentMethod: 'JazzCash' | 'Easypaisa' | 'Card' | 'Cash';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  source: 'online' | 'walk-in' | 'phone';
  createdAt: string;
}

const STORAGE_KEY = '3x_arena_bookings_v2';

// Helper to get formatted date string in Pakistan Time
export function getPakistanDate(offsetDays = 0): string {
  const d = new Date(Date.now() + 5 * 3600 * 1000 + offsetDays * 86400 * 1000);
  return d.toISOString().slice(0, 10);
}

export function formatTimeSlot(startHour: number, hours = 1): string {
  const endHour = (startHour + hours) % 24;
  const startFormat = startHour % 12 === 0 ? 12 : startHour % 12;
  const startAmPm = startHour < 12 ? 'AM' : 'PM';
  const endFormat = endHour % 12 === 0 ? 12 : endHour % 12;
  const endAmPm = endHour < 12 ? 'AM' : 'PM';
  return `${startFormat}:00 ${startAmPm} - ${endFormat}:00 ${endAmPm}`;
}

export function isDayTimeOffer(hour: number): boolean {
  // 7 AM to 4 PM is discount window
  return hour >= 7 && hour < 16;
}

export function calculateSlotPrice(court: Court, hour: number, hours = 1): number {
  let total = 0;
  for (let i = 0; i < hours; i++) {
    const currentH = (hour + i) % 24;
    if (isDayTimeOffer(currentH)) {
      total += court.discountPriceHour;
    } else {
      total += court.priceHour;
    }
  }
  return total;
}

// Generate realistic seed bookings for demo purposes
function getInitialBookings(): Booking[] {
  const today = getPakistanDate(0);
  const tomorrow = getPakistanDate(1);

  return [
    {
      id: 'BK-101',
      courtId: 'c1',
      courtName: 'Artificial Grass Court',
      date: today,
      startHour: 19, // 7 PM
      hours: 2,
      customerName: 'Hamza Tariq (Lahore Strikers)',
      customerPhone: '0300 4567891',
      totalPrice: 5000,
      advancePaid: 2000,
      paymentMethod: 'JazzCash',
      status: 'confirmed',
      source: 'online',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'BK-102',
      courtId: 'c2',
      courtName: 'Natural Grass Court',
      date: today,
      startHour: 20, // 8 PM
      hours: 1,
      customerName: 'Zeeshan Ali & Friends',
      customerPhone: '0321 9876543',
      totalPrice: 2200,
      advancePaid: 1000,
      paymentMethod: 'Easypaisa',
      status: 'confirmed',
      source: 'phone',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'BK-103',
      courtId: 'c3',
      courtName: 'Pro Futsal Court',
      date: today,
      startHour: 21, // 9 PM
      hours: 2,
      customerName: 'FC Gulberg United',
      customerPhone: '0333 1122334',
      totalPrice: 5000,
      advancePaid: 5000,
      paymentMethod: 'Card',
      status: 'confirmed',
      source: 'online',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: 'BK-104',
      courtId: 'c1',
      courtName: 'Artificial Grass Court',
      date: tomorrow,
      startHour: 22, // 10 PM
      hours: 1,
      customerName: 'Bilal Butt',
      customerPhone: '0312 8765432',
      totalPrice: 2500,
      advancePaid: 1000,
      paymentMethod: 'Cash',
      status: 'confirmed',
      source: 'walk-in',
      createdAt: new Date().toISOString(),
    },
  ];
}

export function getAllBookings(): Booking[] {
  if (typeof window === 'undefined') {
    return getInitialBookings();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialBookings();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialBookings();
  }
}

export function addBooking(booking: Booking): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const list = getAllBookings();
    // Check for overlap
    const conflict = list.some(b => {
      if (b.courtId !== booking.courtId || b.date !== booking.date || b.status === 'cancelled') return false;
      const bEnd = b.startHour + b.hours;
      const newEnd = booking.startHour + booking.hours;
      return booking.startHour < bEnd && newEnd > b.startHour;
    });

    if (conflict) {
      return false; // Overlap detected
    }

    list.unshift(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('3x-booking-updated'));
    return true;
  } catch (e) {
    console.error('Error saving booking', e);
    return false;
  }
}

export function updateBookingStatus(id: string, status: Booking['status']): void {
  if (typeof window === 'undefined') return;
  const list = getAllBookings();
  const index = list.findIndex(b => b.id === id);
  if (index !== -1) {
    list[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('3x-booking-updated'));
  }
}

export function checkSlotAvailability(courtId: string, date: string, hour: number): 'free' | 'booked' | 'hold' {
  const bookings = getAllBookings();
  const match = bookings.find(b => {
    if (b.courtId !== courtId || b.date !== date || b.status === 'cancelled') return false;
    return hour >= b.startHour && hour < b.startHour + b.hours;
  });

  if (!match) return 'free';
  if (match.status === 'pending') return 'hold';
  return 'booked';
}

