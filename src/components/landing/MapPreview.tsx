'use client';

import Link from 'next/link';
import { Map, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

const DIFFERENTIATORS = [
  'View actual parcel polygon boundaries on the map',
  'Satellite + street view for every listing',
  'Click markers to instantly see property details',
  'Draw your own search boundary on the map',
];

export function MapPreview() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0d0f14] py-14 sm:py-24">
      {/* Background glow */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left — Text */}
          <div>
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1">
              <Layers className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Interactive Map
              </span>
            </div>

            <h2 className="mb-3 sm:mb-4 font-outfit text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              TerraLink's biggest{' '}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                differentiator
              </span>
            </h2>

            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-slate-500 dark:text-gray-400 leading-relaxed">
              Unlike other marketplaces, TerraLink displays the actual land parcel on a satellite map — so you see exactly what you're buying before you visit.
            </p>

            <ul className="mb-6 sm:mb-8 flex flex-col gap-2.5 sm:gap-3">
              {DIFFERENTIATORS.map((item) => (
                <li key={item} className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 text-emerald-500 mt-0.5 sm:mt-0" />
                  <span className="text-[13px] sm:text-[15px] text-slate-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/map"
              className="group flex w-full sm:inline-flex sm:w-auto items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-emerald-500 px-6 sm:px-7 py-3.5 sm:py-4 text-[14px] sm:text-[15px] font-bold text-white shadow-xl shadow-emerald-500/30 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/50 hover:scale-102 active:scale-98"
            >
              <Map className="h-5 w-5" />
              <span>Explore Interactive Map</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — Map Preview mockup */}
          <div className="relative mt-4 lg:mt-0">
            {/* Map window chrome */}
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl sm:shadow-2xl shadow-slate-900/20 dark:shadow-black/60">
              {/* Window title bar */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#1c212a] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-200 dark:border-white/10">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400" />
                <div className="ml-2 sm:ml-3 flex-1 rounded-lg bg-white dark:bg-[#15181e] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-slate-500 dark:text-gray-500 truncate">
                  terralink.tn/map
                </div>
              </div>

              {/* Map image */}
              <div className="relative h-64 sm:h-80 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=900&auto=format&fit=crop&q=80"
                  alt="Satellite map view of land parcels"
                  className="h-full w-full object-cover opacity-80"
                />

                {/* Overlay UI elements */}
                {/* Parcel polygon SVG overlay */}
                <svg
                  className="absolute inset-0 h-full w-full pointer-events-none"
                  viewBox="0 0 900 320"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="320,80 520,70 560,180 480,240 300,220 280,140"
                    fill="rgba(16,185,129,0.2)"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                  />
                  <circle cx="430" cy="155" r="8" fill="#10b981" className="animate-ping" opacity="0.6" />
                  <circle cx="430" cy="155" r="8" fill="#10b981" />
                </svg>

                {/* Property info popup */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 rounded-xl sm:rounded-2xl border border-white/20 bg-white/95 dark:bg-[#15181e]/95 backdrop-blur-md p-2.5 sm:p-3 shadow-xl max-w-[185px] sm:w-52">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <span className="rounded-full bg-emerald-500 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white">
                      LAND
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-gray-400">7,600 m²</span>
                  </div>
                  <div className="font-outfit text-[14px] sm:text-[16px] font-bold text-slate-900 dark:text-white">
                    120,000 TND
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-slate-500 dark:text-gray-400 truncate">
                    Agricultural · Kelibia
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Boundary active
                  </div>
                </div>

                {/* Bottom controls */}
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 flex gap-1.5 sm:gap-2">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/90 dark:bg-[#15181e]/90 backdrop-blur-sm text-emerald-600 border border-white/30 shadow-lg">
                    <Map className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/90 dark:bg-[#15181e]/90 backdrop-blur-sm text-slate-600 dark:text-gray-300 border border-white/30 shadow-lg">
                    <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat cards (positioned to avoid mobile clipping) */}
            <div className="absolute -bottom-3 left-2 sm:-bottom-5 sm:-left-4 md:sm:-left-6 rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-white dark:bg-[#15181e] px-3 sm:px-4 py-2 sm:py-3 shadow-xl">
              <div className="font-outfit text-lg sm:text-[22px] font-extrabold text-emerald-500">2,400+</div>
              <div className="text-[10px] sm:text-[12px] font-semibold text-slate-500 dark:text-gray-400">Active Listings</div>
            </div>
            <div className="absolute -top-3 right-2 sm:-top-5 sm:-right-3 md:sm:-right-4 rounded-xl sm:rounded-2xl border border-white/20 bg-white dark:bg-[#15181e] px-3 sm:px-4 py-2 sm:py-3 shadow-xl">
              <div className="font-outfit text-lg sm:text-[22px] font-extrabold text-emerald-500">98%</div>
              <div className="text-[10px] sm:text-[12px] font-semibold text-slate-500 dark:text-gray-400">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
