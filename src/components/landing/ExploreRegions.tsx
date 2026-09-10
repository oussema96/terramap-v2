'use client';

import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { REGIONS } from '@/lib/landingData';

export function ExploreRegions() {
  const router = useRouter();

  return (
    <section className="py-12 sm:py-20 bg-slate-50 dark:bg-[#0b0d10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1">
            <MapPin className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              By Region
            </span>
          </div>
          <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore properties by region
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-gray-400 max-w-xl mx-auto px-2">
            From coastal towns to the capital — find land and property in Tunisia's most vibrant regions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REGIONS.map((region, i) => (
            <button
              key={region.id}
              type="button"
              onClick={() => router.push(`/map?location=${encodeURIComponent(region.name)}`)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-60 lg:h-64 w-full overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {/* Tag pill */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full border border-white/20 bg-white/15 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-xs">
                  {region.tag}
                </div>
              </div>

              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-outfit text-lg sm:text-[20px] font-extrabold text-white leading-tight mb-1 truncate">
                      {region.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-emerald-300 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{region.propertyCount} properties</span>
                    </div>
                  </div>
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:scale-110">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
