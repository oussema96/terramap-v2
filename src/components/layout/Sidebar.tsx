'use client';

import { Search, Map as MapIcon, SlidersHorizontal, ChevronRight, ChevronLeft, LogIn, LogOut, User } from 'lucide-react';
import { Property, PropertyType } from '@/types';
import { PropertyCard } from '../properties/PropertyCard';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

interface SidebarProps {
  properties: Property[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onPropertySelect: (id: string) => void;
  selectedPropertyId: string | null;
  wishlistedIds: string[];
  onToggleWishlist: (id: string) => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onHoverPropertyStart: (id: string) => void;
  onHoverPropertyEnd: (id: string) => void;
  onAddPropertyClick: () => void;
  onOpenAuth?: () => void;
}

export function Sidebar({
  properties,
  isCollapsed,
  onToggleCollapse,
  onPropertySelect,
  selectedPropertyId,
  wishlistedIds,
  onToggleWishlist,
  comparedIds,
  onToggleCompare,
  onHoverPropertyStart,
  onHoverPropertyEnd,
  onAddPropertyClick,
  onOpenAuth,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');

  const filteredProperties = properties.filter((p) => {
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.placement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-screen w-full md:w-[420px] bg-[#15181e] border-r border-white/10 z-[1000] flex flex-col shadow-2xl transition-transform duration-300 ease-out",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
          "max-md:bottom-0 max-md:top-auto max-md:h-[80vh] max-md:border-r-0 max-md:border-t max-md:translate-y-0",
          isCollapsed && "max-md:translate-y-full max-md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <MapIcon className="h-6 w-6 text-emerald-500 stroke-[2.5px] animate-pulse" />
                <h1 className="font-outfit text-[26px] font-extrabold tracking-tight text-gray-100">
                  Terra<span className="text-emerald-500">Link</span>
                </h1>
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[2px] text-gray-400">
                Premium Land Marketplace
              </div>
            </div>

            {/* Auth status widget */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1 px-2.5 text-xs text-gray-200"
                  title={`Signed in as ${user.displayName || user.email}`}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 font-bold text-white uppercase">
                    {(user.displayName || user.email || 'U')[0]}
                  </div>
                  <span className="max-w-[75px] truncate font-medium text-xs">
                    {user.displayName || user.email.split('@')[0]}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => logout()}
                  title="Sign Out"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)]"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 p-5 border-b border-white/10 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties, locations..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-gray-100 outline-none transition-all placeholder:text-gray-500 focus:border-emerald-500 focus:bg-white/10 focus:ring-4 focus:ring-emerald-500/20 search-properties-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1">
            {(['all', 'land', 'farm', 'house'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold capitalize transition-all",
                  selectedType === type
                    ? type === 'house'
                      ? "bg-yellow-500 text-white shadow-[0_4px_12px_rgba(234,179,8,0.2)]"
                      : "bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Listings */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-100">
              {filteredProperties.length} Properties Found
            </h2>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-gray-500 hover:bg-white/5 hover:text-gray-100">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3.5">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={selectedPropertyId === property.id}
                isWishlisted={wishlistedIds.includes(property.id)}
                isCompared={comparedIds.includes(property.id)}
                onSelect={onPropertySelect}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                onHoverStart={onHoverPropertyStart}
                onHoverEnd={onHoverPropertyEnd}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Footer / Add Property */}
        <div className="p-4 border-t border-white/10 bg-[#15181e] shrink-0">
          <button
            onClick={onAddPropertyClick}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30"
          >
            <MapIcon className="h-4 w-4" />
            List Your Property
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className={cn(
          "fixed top-6 z-[2000] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/10 bg-[#15181e] text-gray-100 shadow-xl ring-4 ring-[#0b0d10] transition-all duration-300 hover:border-emerald-500 hover:bg-[#1c212a] hover:text-emerald-500",
          "max-md:bottom-6 max-md:top-auto max-md:left-1/2 max-md:-translate-x-1/2 max-md:border-none max-md:bg-emerald-500 max-md:text-white max-md:ring-0",
          isCollapsed
            ? "left-0 translate-x-1/2 rotate-180 max-md:left-1/2 max-md:-translate-x-1/2 max-md:rotate-[-90deg]"
            : "left-[420px] -translate-x-1/2 max-md:bottom-[calc(80vh-18px)] max-md:rotate-[90deg]"
        )}
      >
        <ChevronLeft className="h-4.5 w-4.5" />
      </button>
    </>
  );
}
