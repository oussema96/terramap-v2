'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Map as MapIcon,
  Bell,
  Globe,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  PlusCircle,
  ChevronDown,
  Compass,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

interface LandingHeaderProps {
  onOpenAuth: () => void;
}

export function LandingHeader({ onOpenAuth }: LandingHeaderProps) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[900] transition-all duration-300',
          isScrolled
            ? 'bg-white/90 dark:bg-[#0b0d10]/95 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10 shadow-xs py-3 sm:py-3.5'
            : 'bg-transparent py-4 sm:py-5'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="relative">
              <MapIcon className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-500 stroke-[2.5px] transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span
              className={cn(
                'font-outfit text-xl sm:text-[22px] font-extrabold tracking-[0.06em] transition-colors duration-200',
                isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'
              )}
            >
              Terra<span className="text-emerald-500">Link</span>
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                'px-4 py-2 text-[14px] font-semibold rounded-xl transition-all',
                isScrolled
                  ? 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 hover:text-emerald-600 dark:hover:text-emerald-400'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              Explore
            </Link>
            <Link
              href="/map"
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold rounded-xl transition-all',
                isScrolled
                  ? 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 hover:text-emerald-600 dark:hover:text-emerald-400'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              <MapIcon className="h-3.5 w-3.5" />
              Map
            </Link>
            <Link
              href="/map?action=list"
              className={cn(
                'px-4 py-2 text-[14px] font-semibold rounded-xl transition-all',
                isScrolled
                  ? 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 hover:text-emerald-600 dark:hover:text-emerald-400'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              List a Property
            </Link>
            {user && (
              <Link
                href="/map"
                className={cn(
                  'px-4 py-2 text-[14px] font-semibold rounded-xl transition-all',
                  isScrolled
                    ? 'text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 hover:text-emerald-600 dark:hover:text-emerald-400'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                My Properties
              </Link>
            )}
          </nav>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle variant="header" />

            {/* Language / Currency */}
            <button
              type="button"
              className={cn(
                'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all',
                isScrolled
                  ? 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/8 hover:text-slate-900 dark:hover:text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              <Globe className="h-4 w-4" />
              <span>TND · AR</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button
                  type="button"
                  className={cn(
                    'relative flex h-9 w-9 items-center justify-center rounded-xl transition-all',
                    isScrolled
                      ? 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/8'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                  aria-label="Notifications"
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                </button>

                {/* User Avatar + logout */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title={`Signed in as ${user.displayName || user.email}`}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 py-1.5 px-3 text-sm text-slate-800 dark:text-gray-200 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white uppercase">
                      {(user.displayName || user.email || 'U')[0]}
                    </div>
                    <span className="max-w-[90px] truncate text-[13px] font-semibold">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => logout()}
                    title="Sign Out"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all',
                  isScrolled
                    ? 'text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                )}
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle variant="header" />

            <button
              type="button"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40',
                isScrolled
                  ? 'border-slate-200 dark:border-white/10 text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10'
                  : 'border-white/20 text-white hover:bg-white/15'
              )}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Modal */}
      <div
        className={cn(
          'fixed inset-0 z-[1000] md:hidden transition-all duration-300',
          isMobileMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Dark Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide-over Drawer Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white dark:bg-[#12151b] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-l border-slate-200 dark:border-white/10',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/8">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <MapIcon className="h-5 w-5 text-emerald-500 stroke-[2.5px]" />
              <span className="font-outfit text-lg font-extrabold tracking-wider text-slate-900 dark:text-white">
                Terra<span className="text-emerald-500">Link</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1.5">
            {/* User Profile Banner if logged in */}
            {user ? (
              <div className="mb-3 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/10 p-3.5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white uppercase shadow-sm">
                  {(user.displayName || user.email || 'U')[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-bold text-slate-900 dark:text-white truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-400 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-[14px] font-bold text-white shadow-md shadow-emerald-500/25 active:scale-[0.98] transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Navigation links */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 px-3 py-1">
              Navigation
            </div>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 transition-all"
            >
              <Compass className="h-4 w-4 text-emerald-500" />
              Explore Properties
            </Link>
            <Link
              href="/map"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 transition-all"
            >
              <MapIcon className="h-4 w-4 text-emerald-500" />
              Interactive Map
            </Link>
            <Link
              href="/map?action=list"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 transition-all"
            >
              <PlusCircle className="h-4 w-4 text-emerald-500" />
              List a Property
            </Link>

            {user && (
              <Link
                href="/map"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/8 transition-all"
              >
                <Layers className="h-4 w-4 text-emerald-500" />
                My Properties
              </Link>
            )}

            <div className="h-px bg-slate-100 dark:bg-white/8 my-3" />

            {/* Quick settings in drawer */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 px-3 py-1">
              Preferences
            </div>
            <div className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-slate-700 dark:text-gray-300">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate-400" />
                Currency & Region
              </span>
              <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                TND (Tunisia)
              </span>
            </div>
          </div>

          {/* Drawer Footer with logout */}
          {user && (
            <div className="p-4 border-t border-slate-100 dark:border-white/8">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50/60 dark:bg-red-500/10 px-4 py-2.5 text-[13px] font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

