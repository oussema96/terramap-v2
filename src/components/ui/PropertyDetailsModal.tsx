'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, MapPin, DollarSign, Maximize2, Tag, Phone, Mail, User } from 'lucide-react';
import { Property } from '@/types';
import { cn } from '@/lib/utils';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDetailsModal({ property, isOpen, onOpenChange }: PropertyDetailsModalProps) {
  if (!property) return null;

  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const badgeColor = 
    property.type === 'land' ? 'bg-blue-500' :
    property.type === 'farm' ? 'bg-emerald-500' : 'bg-yellow-500';

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[2000] flex max-h-[90vh] w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#15181e] dark:text-gray-100 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          
          {/* Header */}
          <div className="relative h-64 w-full overflow-hidden shrink-0">
            <img 
              src={property.image} 
              alt={property.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
            
            <span className={cn('absolute left-6 top-6 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg', badgeColor)}>
              {property.type}
            </span>

            <Dialog.Close className="absolute right-6 top-6 z-10 rounded-full bg-black/60 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white focus:outline-none">
              <X className="h-5 w-5" />
            </Dialog.Close>

            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{property.title}</h2>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-200">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{property.placement}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-3.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 block mb-1">Price</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{priceFormatted}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-3.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 block mb-1">Total Size</span>
                <span className="text-lg font-bold text-slate-900 dark:text-gray-100">{property.size} {property.sizeUnit}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-3.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 block mb-1">Zoning</span>
                <span className="text-lg font-bold text-slate-900 dark:text-gray-100">{property.zoning || 'N/A'}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-3.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 block mb-1">Boundary Points</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{property.coordinates.length} pts</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Description</h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, i) => (
                    <span key={i} className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Contact */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-gray-400 block">Listed By Seller</span>
                  <span className="text-base font-bold text-slate-900 dark:text-gray-100">{property.ownerName || 'Verified Seller'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto">
                {property.contact && (
                  <a 
                    href={`tel:${property.contact}`}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-emerald-600"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </a>
                )}
                <button 
                  onClick={() => alert(`Inquiry sent for ${property.title}`)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 px-4 py-2.5 text-xs font-bold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
