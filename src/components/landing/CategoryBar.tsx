'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/landingData';
import { cn } from '@/lib/utils';

export function CategoryBar() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('all');

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  const handleSelect = (cat: typeof CATEGORIES[0]) => {
    setActiveId(cat.id);
    const params = new URLSearchParams();
    if (cat.type) params.set('type', cat.type);
    if (cat.id === 'new') params.set('filter', 'new');
    if (cat.id === 'waterfront') params.set('feature', 'waterfront');
    router.push(`/map?${params.toString()}`);
  };

  return (
    <section className="relative border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0d10] py-1 sm:py-1.5">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="relative flex items-center">
          {/* Left arrow (desktop only) */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute left-0 z-10 h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0d10] text-slate-500 dark:text-gray-400 shadow-md hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth py-3 sm:py-4 px-2 sm:px-10 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelect(cat)}
                className={cn(
                  'group flex shrink-0 flex-col items-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none',
                  activeId === cat.id ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border text-xl sm:text-2xl transition-all',
                    activeId === cat.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 shadow-md shadow-emerald-500/20 scale-105'
                      : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 group-hover:border-emerald-400/60 group-hover:bg-emerald-50/50 dark:group-hover:bg-emerald-500/10'
                  )}
                >
                  {cat.icon}
                </div>
                <span
                  className={cn(
                    'text-[11px] sm:text-[12px] font-semibold whitespace-nowrap transition-colors',
                    activeId === cat.id
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-200'
                  )}
                >
                  {cat.label}
                </span>
                {activeId === cat.id && (
                  <div className="h-0.5 w-full rounded-full bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          {/* Right arrow (desktop only) */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute right-0 z-10 h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b0d10] text-slate-500 dark:text-gray-400 shadow-md hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
