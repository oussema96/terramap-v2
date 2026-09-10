'use client';

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'floating' | 'header';
}

export function ThemeToggle({ className, variant = 'floating' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'header') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500",
          isDark
            ? "border-white/10 bg-white/5 text-amber-400 hover:bg-white/10 hover:text-amber-300"
            : "border-slate-200 bg-slate-100 text-amber-500 hover:bg-slate-200 hover:text-amber-600 shadow-xs",
          className
        )}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <div className="relative h-4 w-4">
          <Sun
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-300",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-300",
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500",
        isDark
          ? "border-white/10 bg-[#15181e] text-amber-400 hover:border-amber-400/50 hover:bg-[#1c212a] hover:text-amber-300 shadow-black/40"
          : "border-slate-200 bg-white text-amber-500 hover:border-amber-400 hover:bg-slate-50 hover:text-amber-600 shadow-slate-300/50",
        className
      )}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        <Sun
          className={cn(
            "absolute h-5 w-5 transition-all duration-300",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 stroke-[2.2px]"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100 stroke-[2.2px]" : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
    </button>
  );
}
