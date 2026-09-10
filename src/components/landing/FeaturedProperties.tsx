'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Navigation, Sparkles } from 'lucide-react';
import { FEATURED_PROPERTIES, LandingProperty } from '@/lib/landingData';
import { cn } from '@/lib/utils';

function FeaturedCard({ property }: { property: LandingProperty }) {
  const [wishlisted, setWishlisted] = useState(false);

  const typeColor = {
    land: 'bg-blue-500',
    farm: 'bg-emerald-500',
    house: 'bg-amber-500',
  }[property.type];

  const priceColor = {
    land: 'text-emerald-600 dark:text-emerald-400',
    farm: 'text-emerald-600 dark:text-emerald-400',
    house: 'text-amber-600 dark:text-amber-400',
  }[property.type];

  const priceFormatted = new Intl.NumberFormat('fr-TN', {
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link
      href={`/map`}
      className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15181e] shadow-xs hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges row */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 sm:gap-2">
          <span className={cn('rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-sm', typeColor)}>
            {property.type}
          </span>
          {property.isNew && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-2.5 w-2.5" />
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWishlisted((v) => !v);
          }}
          className={cn(
            'absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all focus:outline-none cursor-pointer',
            wishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-black/40 text-white hover:bg-rose-500/80'
          )}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} />
        </button>

        {/* Distance badge */}
        {property.distanceKm !== undefined && (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-white">
            <Navigation className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5px]" />
            {property.distanceKm} km
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        {/* Price + Size */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className={cn('font-outfit text-lg sm:text-xl font-extrabold truncate', priceColor)}>
            {priceFormatted} <span className="text-xs sm:text-[13px] font-semibold opacity-75">{property.currency}</span>
          </span>
          <span className="shrink-0 rounded-lg bg-slate-100 dark:bg-white/8 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-[12px] font-semibold text-slate-600 dark:text-gray-400">
            {property.size.toLocaleString()} {property.sizeUnit}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 text-[14px] sm:text-[15px] font-bold leading-snug text-slate-900 dark:text-gray-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-slate-500 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-1 sm:gap-1.5 pt-1 border-t border-slate-100 dark:border-white/5">
          {property.features.slice(0, 2).map((f) => (
            <span
              key={f}
              className="rounded-md bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-gray-400"
            >
              {f}
            </span>
          ))}
          {property.features.length > 2 && (
            <span className="rounded-md bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-gray-500">
              +{property.features.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProperties() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50 dark:bg-[#0b0d10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Featured
              </span>
            </div>
            <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Discover properties near you
            </h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 dark:text-gray-400">
              Hand-picked listings across Tunisia's most sought-after regions
            </p>
          </div>
          <Link
            href="/map"
            className="self-start sm:self-auto shrink-0 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[14px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {FEATURED_PROPERTIES.map((p) => (
            <FeaturedCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
