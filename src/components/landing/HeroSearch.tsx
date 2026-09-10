'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, SlidersHorizontal, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROPERTY_TYPES = [
  { value: 'all', label: 'All Types', emoji: '🏘️' },
  { value: 'land', label: 'Land', emoji: '🌿' },
  { value: 'farm', label: 'Farm', emoji: '🌾' },
  { value: 'house', label: 'House', emoji: '🏡' },
];

export function HeroSearch() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (propertyType !== 'all') params.set('type', propertyType);
    if (location) params.set('location', location);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (size) params.set('size', size);
    router.push(`/map?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden pt-28 pb-14 sm:pt-32 sm:pb-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&auto=format&fit=crop&q=80"
          alt="Aerial view of agricultural land"
          className="h-full w-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
        {/* Emerald accent glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-transparent" />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 left-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: '1s' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center w-full">
        {/* Headline */}
        <h1 className="mt-4 sm:mt-8 mb-3 sm:mb-4 px-2 sm:px-4 font-outfit text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.18] sm:leading-[1.12] tracking-tight text-white">
          Find the right property{' '}
          <span className="block sm:inline bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
            Connect with the right opportunity.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-6 sm:mb-10 max-w-2xl px-2 sm:px-4 text-sm sm:text-base md:text-xl text-gray-200/90 leading-relaxed">
          Explore agricultural lands, farms, and houses across Tunisia — with precision parcel maps and verified listings.
        </p>

        {/* Search Card */}
        <div className="mx-auto w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 p-2 sm:p-3 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] text-left">
          {/* Property Type Pills */}
          <div className="mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none px-0.5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setPropertyType(t.value)}
                className={cn(
                  'flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-[13px] font-semibold transition-all',
                  propertyType === t.value
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                )}
              >
                <span>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="flex flex-col gap-1 sm:gap-2 rounded-xl sm:rounded-2xl bg-white dark:bg-[#15181e] p-1.5 sm:p-2 md:flex-row md:items-center">
            {/* Location */}
            <div className="flex flex-1 items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
              <MapPin className="h-5 w-5 shrink-0 text-emerald-500" />
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="City, region or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-[16px] md:text-[14px] font-medium text-slate-800 dark:text-gray-100 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Mobile divider */}
            <div className="h-px w-full bg-slate-100 dark:bg-white/5 md:hidden" />
            <div className="hidden md:block h-10 w-px bg-slate-200 dark:bg-white/10" />

            {/* Price Range */}
            <div className="flex flex-1 items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <Coins className="h-5 w-5 shrink-0 text-emerald-500" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-transparent text-[16px] md:text-[14px] font-medium text-slate-800 dark:text-gray-100 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
                  />
                  <span className="text-slate-300 dark:text-gray-600 font-medium">—</span>
                  <input
                    type="number"
                    placeholder="max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-transparent text-[16px] md:text-[14px] font-medium text-slate-800 dark:text-gray-100 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Mobile divider */}
            <div className="h-px w-full bg-slate-100 dark:bg-white/5 md:hidden" />
            <div className="hidden md:block h-10 w-px bg-slate-200 dark:bg-white/10" />

            {/* Property Size */}
            <div className="flex flex-1 items-center gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="h-5 w-5 shrink-0 flex items-center justify-center text-emerald-500 font-bold text-xs sm:text-sm">
                m²
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="property size e.g. 1,000 m²"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-transparent text-[16px] md:text-[14px] font-medium text-slate-800 dark:text-gray-100 outline-none placeholder:text-slate-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearch}
              className="mt-1 flex w-full md:w-auto shrink-0 items-center justify-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/50 active:scale-98 md:mt-0 md:rounded-2xl"
            >
              <Search className="h-4 w-4 stroke-[2.5px]" />
              <span className="inline md:hidden">Search Properties</span>
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-8 max-w-lg mx-auto w-full px-2">
          {[
            { value: '2,400+', label: 'Properties Listed' },
            { value: '18', label: 'Regions' },
            { value: '98%', label: 'Verified' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-outfit text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-[13px] text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop scroll indicator */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-gray-400 animate-bounce pointer-events-none">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Scroll</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </section>
  );
}
