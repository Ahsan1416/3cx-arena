'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Users,
  Wallet,
  BarChart3,
  Tag,
  ShieldCheck,
  Settings,
  CheckSquare,
  LogOut,
  Search,
  Phone,
  Clock,
  ArrowLeft,
  Check,
  X,
  Plus,
  AlertCircle,
  Menu,
  ChevronRight,
  TrendingUp,
  MapPin,
  Flame,
  Award,
} from 'lucide-react';
import { COURTS, ARENA_INFO, Court } from '@/data/arena';
import {
  Booking,
  getAllBookings,
  updateBookingStatus,
  addBooking,
  getPakistanDate,
  formatTimeSlot,
  checkSlotAvailability,
} from '@/lib/storage';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Front Desk';
}

const DEMO_STAFF: StaffUser[] = [
  { id: 'u1', name: 'Zain Malik (Owner)', email: 'owner@3x.demo', role: 'Owner' },
  { id: 'u2', name: 'Hamza Farooq (Manager)', email: 'manager@3x.demo', role: 'Manager' },
  { id: 'u3', name: 'Ali Raza (Front Desk)', email: 'desk@3x.demo', role: 'Front Desk' },
];

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(null);
  const [activeNav, setActiveNav] = useState<string>('today');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('owner@3x.demo');
  const [loginPassword, setLoginPassword] = useState('demo1234');
  const [loginError, setLoginError] = useState('');

  // Walk-in Modal Form States
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newCourtId, setNewCourtId] = useState('c1');
  const [newDate, setNewDate] = useState(getPakistanDate(0));
  const [newStartHour, setNewStartHour] = useState(20);
  const [newHours, setNewHours] = useState(1);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newMethod, setNewMethod] = useState<'Cash' | 'JazzCash' | 'Easypaisa' | 'Card'>('Cash');
  const [newPrice, setNewPrice] = useState(2500);

  // Search in tables
  const [searchFilter, setSearchFilter] = useState('');

  // Load user session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('3x_admin_session_v2');
      if (saved) {
        try {
          setCurrentUser(JSON.parse(saved));
        } catch (e) {
          // fallback
        }
      }
    }
  }, []);

  const loadData = () => {
    setBookings(getAllBookings());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('3x-booking-updated', handleUpdate);
    return () => window.removeEventListener('3x-booking-updated', handleUpdate);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');

    const found = DEMO_STAFF.find(
      (s) => s.email.toLowerCase() === loginEmail.trim().toLowerCase()
    );

    if (!found) {
      setLoginError('Invalid demo email. Please select from the sample accounts below.');
      return;
    }

    if (loginPassword !== 'demo1234') {
      setLoginError('Incorrect password. Demo password is "demo1234".');
      return;
    }

    setCurrentUser(found);
    if (typeof window !== 'undefined') {
      localStorage.setItem('3x_admin_session_v2', JSON.stringify(found));
    }
  };

  const handleQuickLogin = (user: StaffUser) => {
    setLoginEmail(user.email);
    setLoginPassword('demo1234');
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('3x_admin_session_v2', JSON.stringify(user));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('3x_admin_session_v2');
    }
  };

  const handleCreateWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    const court = COURTS.find((c) => c.id === newCourtId) || COURTS[0];

    const created: Booking = {
      id: `3X-${Math.floor(1000 + Math.random() * 9000)}`,
      courtId: court.id,
      courtName: court.name,
      date: newDate,
      startHour: newStartHour,
      hours: newHours,
      customerName: newName,
      customerPhone: newPhone,
      totalPrice: newPrice,
      advancePaid: newPrice,
      paymentMethod: newMethod,
      status: 'confirmed',
      source: 'walk-in',
      createdAt: new Date().toISOString(),
    };

    addBooking(created);
    setIsNewModalOpen(false);
    setNewName('');
    setNewPhone('');
  };

  // Calculations
  const todayStr = getPakistanDate(0);
  const todayBookings = bookings.filter((b) => b.date === todayStr && b.status !== 'cancelled');
  const totalRevenue = bookings.reduce(
    (sum, b) => (b.status !== 'cancelled' ? sum + b.totalPrice : sum),
    0
  );
  const totalAdvance = bookings.reduce(
    (sum, b) => (b.status !== 'cancelled' ? sum + b.advancePaid : sum),
    0
  );

  // ==========================================
  // VIEW 1: LOGIN PAGE (Split-Screen Design)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#070A09] text-white flex flex-col lg:flex-row">
        {/* Left Side: Dramatic Hero Photo & Pitch Story */}
        <div className="lg:w-1/2 relative min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          <Image
            src="/assets/media/photo-night-side-view.webp"
            alt="3X Sports Arena Night View"
            fill
            className="object-cover filter brightness-[0.35] contrast-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A09] via-transparent to-[#070A09]/60" />

          {/* Top Brand */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20">
                <Image src={ARENA_INFO.logo} alt="3X Arena" fill className="object-cover" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-white tracking-wider uppercase italic">
                  3X <span className="text-emerald-400">ARENA</span>
                </span>
                <p className="text-[11px] text-slate-300 font-medium">Jail Road, Lahore</p>
              </div>
            </Link>
          </div>

          {/* Bottom Pitch Info */}
          <div className="relative z-10 space-y-4 max-w-md">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest inline-block">
              Arena Manager OS v2.0
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight uppercase italic">
              Control Bookings, Slots & Revenue in Real Time.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unified management system for 3X Sports Arena staff, managers, and owners. Live calendar, walk-in creation, and customer tracking.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Sign-In Form & 1-Click Demo Logins */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#0B0F0D]">
          <div className="w-full max-w-md space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6">
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
              </Link>
              <h2 className="font-display font-bold text-3xl text-white">Staff Sign In</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials or choose a 1-click sample demo role below.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Staff Email Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-emerald-400 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-emerald-400 text-sm transition-colors"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Demo password is: <b className="text-emerald-400 font-mono">demo1234</b>
                </span>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20"
              >
                Sign In to Dashboard
              </button>
            </form>

            {/* 1-Click Demo Accounts */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Quick Demo Logins (1-Click Switch)
              </span>

              <div className="space-y-2">
                {DEMO_STAFF.map((staff) => (
                  <button
                    key={staff.id}
                    type="button"
                    onClick={() => handleQuickLogin(staff)}
                    className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-emerald-500/30 text-left flex items-center justify-between group transition-all"
                  >
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                        {staff.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{staff.email}</div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Use →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Powered by Arena Manager • Client: 3X Sports Arena Lahore
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED DASHBOARD WITH SIDEBAR
  // ==========================================
  return (
    <div className="min-h-screen bg-[#070A09] text-slate-100 flex">
      
      {/* 1. LEFT SIDEBAR MENU (Sticky & Professional) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B0F0D] border-r border-white/10 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Top: Arena Brand */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20">
                <Image src={ARENA_INFO.logo} alt="3X Arena" fill className="object-cover" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white uppercase italic">
                  3X <span className="text-emerald-400">MANAGER</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 block w-fit font-bold uppercase mt-0.5">
                  DEMO v2.0
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation Links Grouped */}
          <nav className="p-4 space-y-6 text-xs">
            {/* Group 1: Operations */}
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
                Operations
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('today');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'today'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Today's Live Schedule
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('calendar');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'calendar'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Court Slots Matrix (24h)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsNewModalOpen(true);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-all text-left"
                >
                  <PlusCircle className="w-4 h-4" />
                  + Create Walk-in Slot
                </button>
              </div>
            </div>

            {/* Group 2: Business & CRM */}
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
                Business & Revenue
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('finance');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'finance'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  Finance & Cash-up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('customers');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'customers'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Players & Teams (CRM)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('reports');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'reports'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Match Reports
                </button>
              </div>
            </div>

            {/* Group 3: Setup & Management */}
            <div>
              <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
                Arena Setup
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('pricing');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'pricing'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  Court Pricing
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('staff');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'staff'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Staff & Permissions
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('checklist');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all text-left ${
                    activeNav === 'checklist'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  Launch Checklist
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom: Current User & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-xs text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">{currentUser.role}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            ← View Public Website
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 bg-[#0B0F0D]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                Arena Operations
              </span>
              <h1 className="font-display font-bold text-lg sm:text-xl text-white">
                {activeNav === 'today' && "Today's Schedule & Timeline"}
                {activeNav === 'calendar' && 'Full Court Matrix (24-Hour Slots)'}
                {activeNav === 'finance' && 'Daily Finance & Cash-up Summary'}
                {activeNav === 'customers' && 'Registered Players & Regular Teams'}
                {activeNav === 'reports' && 'Match Performance & Booking Analytics'}
                {activeNav === 'pricing' && 'Court Hourly Rates & Peak Hours'}
                {activeNav === 'staff' && 'Arena Staff Accounts & RBAC'}
                {activeNav === 'checklist' && 'Pre-Launch Verification Checklist'}
              </h1>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lahore PKT (UTC+5): {new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Karachi', day: 'numeric', month: 'short' })}</span>
            </div>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Walk-in</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body Tabs */}
        <main className="flex-1 p-4 sm:p-8 space-y-8">
          
          {/* TAB 1: TODAY'S OPERATIONS */}
          {activeNav === 'today' && (
            <div className="space-y-8">
              {/* 4 Stat KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="clean-card p-5 space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Today's Matches</span>
                  <div className="font-display font-extrabold text-3xl text-white">{todayBookings.length}</div>
                  <span className="text-[11px] text-emerald-400 block font-medium">Scheduled for today</span>
                </div>

                <div className="clean-card p-5 space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Estimated Occupancy</span>
                  <div className="font-display font-extrabold text-3xl text-emerald-400">
                    {Math.min(100, Math.round((todayBookings.length / (3 * 10)) * 100))}%
                  </div>
                  <span className="text-[11px] text-slate-400 block font-medium">Peak evening slots 70%+</span>
                </div>

                <div className="clean-card p-5 space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Advance Collected</span>
                  <div className="font-display font-extrabold text-3xl text-white">
                    Rs {totalAdvance.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400 block font-medium">Online (JazzCash/EasyPaisa)</span>
                </div>

                <div className="clean-card p-5 space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Total Revenue Booked</span>
                  <div className="font-display font-extrabold text-3xl text-white">
                    Rs {totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-400 block font-medium">Includes balances due at venue</span>
                </div>
              </div>

              {/* 24-Hour Visual Court Matrix for Today */}
              <div className="clean-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Live Ground Matrix ({todayStr})</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Quick slot overview for the next 8 hours</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Now
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  {COURTS.map((court) => (
                    <div key={court.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: court.color }} />
                          {court.name}
                        </span>
                        <span className="text-slate-400">Rs {court.priceHour}/hr</span>
                      </div>

                      {/* Visual Timeline Bar */}
                      <div className="grid grid-cols-8 gap-1.5">
                        {[18, 19, 20, 21, 22, 23, 0, 1].map((h) => {
                          const status = checkSlotAvailability(court.id, todayStr, h);
                          const isFree = status === 'free';
                          const label = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : `${h - 12} PM`;

                          return (
                            <div
                              key={h}
                              className={`p-2 rounded-lg text-center text-xs font-semibold ${
                                isFree
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
                              }`}
                            >
                              <div>{label}</div>
                              <span className="text-[9px] opacity-75 font-normal block">
                                {isFree ? 'Free' : 'Booked'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Schedule Cards List */}
              <div className="clean-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-display font-bold text-lg text-white">Scheduled Matches Today</h3>
                  <span className="text-xs text-slate-400">{todayBookings.length} matches booked</span>
                </div>

                {todayBookings.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No bookings found for today. Use the "+ Create Walk-in" button to add one.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todayBookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-emerald-400">{b.id}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 uppercase">
                            {b.status}
                          </span>
                        </div>

                        <div>
                          <div className="font-bold text-white text-sm">{b.customerName}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">{b.customerPhone}</div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex justify-between text-xs">
                          <div>
                            <span className="text-slate-500 block">Court</span>
                            <span className="font-semibold text-white">{b.courtName}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 block">Time</span>
                            <span className="font-semibold text-emerald-400">
                              {formatTimeSlot(b.startHour, b.hours)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(b.id, 'completed')}
                            className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs transition-colors"
                          >
                            Mark Played
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold text-xs transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COURT MATRIX (24-HOURS) */}
          {activeNav === 'calendar' && (
            <div className="clean-card p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Full Court Matrix</h3>
                  <p className="text-xs text-slate-400 mt-0.5">24-hour visual schedule across Artificial, Natural, and Futsal grounds</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={todayStr}
                    readOnly
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {COURTS.map((court) => (
                  <div key={court.id} className="space-y-2">
                    <div className="font-display font-bold text-base text-white flex items-center justify-between">
                      <span>{court.name}</span>
                      <span className="text-xs text-emerald-400 font-mono">Rs {court.priceHour}/hr</span>
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                      {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5].map((h) => {
                        const status = checkSlotAvailability(court.id, todayStr, h);
                        const isFree = status === 'free';
                        const label = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : `${h - 12} PM`;

                        return (
                          <div
                            key={h}
                            className={`p-2 rounded-lg text-center text-xs font-semibold ${
                              isFree
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}
                          >
                            <span className="text-[11px] block">{label}</span>
                            <span className="text-[9px] opacity-75 font-normal block">{isFree ? 'Free' : 'Booked'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FINANCE & CASH-UP */}
          {activeNav === 'finance' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="clean-card p-6 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Total Revenue Recorded</span>
                  <div className="font-display font-bold text-3xl text-white">Rs {totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-slate-400">All bookings to date</p>
                </div>
                <div className="clean-card p-6 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Online Advances Settled</span>
                  <div className="font-display font-bold text-3xl text-emerald-400">Rs {totalAdvance.toLocaleString()}</div>
                  <p className="text-xs text-slate-400">JazzCash & Easypaisa verified</p>
                </div>
                <div className="clean-card p-6 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Pending Venue Cash</span>
                  <div className="font-display font-bold text-3xl text-amber-400">
                    Rs {(totalRevenue - totalAdvance).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">Due at venue upon arrival</p>
                </div>
              </div>

              {/* Payment Methods Breakdown */}
              <div className="clean-card p-6 space-y-4">
                <h3 className="font-display font-bold text-lg text-white">Payment Method Distribution</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 font-semibold">JazzCash (Online Merchant)</span>
                      <span className="text-emerald-400 font-bold">50%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-1/2 h-full bg-emerald-400" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 font-semibold">Easypaisa</span>
                      <span className="text-emerald-400 font-bold">30%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[30%] h-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 font-semibold">Cash at Counter</span>
                      <span className="text-amber-400 font-bold">20%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[20%] h-full bg-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLAYERS & TEAMS (CRM) */}
          {activeNav === 'customers' && (
            <div className="clean-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-display font-bold text-lg text-white">Registered Players Directory</h3>
                <span className="text-xs text-slate-400">{bookings.length} reservations</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.04] text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3">Player / Team Name</th>
                      <th className="p-3">WhatsApp Number</th>
                      <th className="p-3">Court Booked</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02]">
                        <td className="p-3 font-bold text-white">{b.customerName}</td>
                        <td className="p-3 text-slate-300 font-mono">{b.customerPhone}</td>
                        <td className="p-3 text-emerald-400 font-medium">{b.courtName}</td>
                        <td className="p-3 text-slate-400">{b.date}</td>
                        <td className="p-3 font-bold text-white">Rs {b.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MATCH REPORTS */}
          {activeNav === 'reports' && (
            <div className="clean-card p-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Match Operations Report</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 block">Peak Booking Hours</span>
                  <div className="font-bold text-white text-base">8:00 PM – 1:00 AM</div>
                  <span className="text-emerald-400 text-[11px]">Prime floodlit slots</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 block">Most Popular Ground</span>
                  <div className="font-bold text-white text-base">Artificial Synthetic Grass</div>
                  <span className="text-emerald-400 text-[11px]">Rs 2,500/hr peak rate</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] space-y-1">
                  <span className="text-slate-400 block">Daytime Discount Utilization</span>
                  <div className="font-bold text-white text-base">40% Off (7am–4pm)</div>
                  <span className="text-emerald-400 text-[11px]">Encourages morning bookings</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRICING & SLOTS */}
          {activeNav === 'pricing' && (
            <div className="clean-card p-6 space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Court Pricing Configuration</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {COURTS.map((court) => (
                  <div key={court.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="font-display font-bold text-lg text-white">{court.name}</div>
                    <div className="text-xs text-slate-400">{court.surface}</div>

                    <div className="pt-2 border-t border-white/10 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Standard Evening Peak:</span>
                        <span className="font-bold text-white">Rs {court.priceHour}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-400">Daytime Offer (40% Off):</span>
                        <span className="font-bold text-emerald-400">Rs {court.discountPriceHour}/hr</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: STAFF & ROLES */}
          {activeNav === 'staff' && (
            <div className="clean-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-display font-bold text-lg text-white">Staff Accounts & Roles</h3>
                <span className="text-xs text-slate-400">{DEMO_STAFF.length} accounts configured</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {DEMO_STAFF.map((staff) => (
                  <div key={staff.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="font-bold text-white text-sm">{staff.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{staff.email}</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {staff.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: LAUNCH CHECKLIST */}
          {activeNav === 'checklist' && (
            <div className="clean-card p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Launch Verification Checklist</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Artificial Synthetic Turf Rate: Rs 2,500/hr confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Natural Grass Turf Rate: Rs 2,200/hr confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Interactive 4-Step Booking Flow with Confetti Celebration</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Cinematic Hero Video & 4K Drone Tour modal integrated</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Staff Login Page with 1-Click Demo Accounts & Left Sidebar Menu</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. MODAL: CREATE WALK-IN BOOKING */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md clean-card p-6 sm:p-7 border-emerald-500/40 shadow-2xl space-y-4 bg-[#0E1411]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">Create Walk-in Reservation</h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWalkin} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Playing Ground</label>
                <select
                  value={newCourtId}
                  onChange={(e) => {
                    setNewCourtId(e.target.value);
                    const c = COURTS.find((x) => x.id === e.target.value);
                    if (c) setNewPrice(c.priceHour);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                >
                  {COURTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Rs {c.priceHour})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Hour</label>
                  <select
                    value={newStartHour}
                    onChange={(e) => setNewStartHour(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                  >
                    {[17, 18, 19, 20, 21, 22, 23, 0, 1, 2].map((h) => (
                      <option key={h} value={h}>
                        {h === 0 ? '12 AM' : h < 12 ? `${h} AM` : `${h - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Player / Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Shahzad"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 0000000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Method</label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-400"
                  >
                    <option value="Cash">Cash at Venue</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Easypaisa">Easypaisa</option>
                    <option value="Card">Debit/Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Total Fee (Rs)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-emerald-400 font-bold outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Confirm Walk-in Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
