'use client';

import { Heart, GitCompare, MapPin, Navigation } from 'lucide-react';
import { Property } from '@/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  isWishlisted?: boolean;
  isCompared?: boolean;
  userLocation?: { lat: number; lng: number } | null;
  onSelect: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onHoverStart?: (id: string) => void;
  onHoverEnd?: (id: string) => void;
}

export function PropertyCard({
  property,
  isSelected,
  isWishlisted,
  isCompared,
  userLocation,
  onSelect,
  onToggleWishlist,
  onToggleCompare,
  onHoverStart,
  onHoverEnd,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const sizeFormatted = `${property.size.toLocaleString()} ${property.sizeUnit}`;

  // Simple distance calculation (mocked for now, usually needs turf.js or similar)
  let distanceKm = 0;
  if (userLocation) {
     // A simple euclidean approximation for display purposes
     const ptLat = property.coordinates[0]?.[0] || 0;
     const ptLng = property.coordinates[0]?.[1] || 0;
     distanceKm = Math.sqrt(Math.pow(ptLat - userLocation.lat, 2) + Math.pow(ptLng - userLocation.lng, 2)) * 111;
  }

  const badgeColor = 
    property.type === 'land' ? 'bg-blue-500' :
    property.type === 'farm' ? 'bg-emerald-500' : 'bg-yellow-500';
    
  const priceColor = 
    property.type === 'house' ? 'text-amber-500 dark:text-yellow-400' : 'text-emerald-600 dark:text-emerald-400';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 cursor-pointer',
        'hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]',
        isSelected && 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/5 shadow-[0_0_16px_rgba(16,185,129,0.15)]'
      )}
      onClick={() => onSelect(property.id)}
      onMouseEnter={() => { setIsHovered(true); onHoverStart?.(property.id); }}
      onMouseLeave={() => { setIsHovered(false); onHoverEnd?.(property.id); }}
    >
      <div className="relative h-[150px] w-full overflow-hidden">
        <span className={cn('absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs', badgeColor)}>
          {property.type}
        </span>
        
        <img 
          src={property.image} 
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(property.id); }}
          className={cn(
            'absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors',
            isWishlisted ? 'bg-rose-500/80 text-white' : 'text-gray-400 hover:bg-rose-500/80 hover:text-white'
          )}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={cn('h-3.5 w-3.5', isWishlisted && 'fill-current')} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleCompare(property.id); }}
          className={cn(
            'absolute right-10 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors',
            isCompared ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'
          )}
          title={isCompared ? "Remove from Compare" : "Add to Compare"}
        >
          <GitCompare className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-1.5 flex items-start justify-between">
          <span className={cn('font-outfit text-lg font-bold', priceColor)}>
            {priceFormatted}
          </span>
          <div className="flex items-center gap-1.5">
            {userLocation && (
              <span className="flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:border-transparent dark:bg-emerald-500/15 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-semibold" title="Distance from your location">
                <Navigation className="h-2.5 w-2.5 stroke-[2.5px]" />
                {distanceKm.toFixed(1)} km
              </span>
            )}
            <span className="rounded-md bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-gray-400 px-2 py-0.5 text-xs font-semibold">
              {sizeFormatted}
            </span>
          </div>
        </div>
        
        <h3 className="mb-1 truncate text-[15px] font-semibold leading-[1.3] text-slate-900 dark:text-gray-100">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-gray-400">
          <MapPin className="h-3 w-3" />
          <span>{property.placement}</span>
        </div>
      </div>
    </div>
  );
}
