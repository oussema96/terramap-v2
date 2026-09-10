'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, UploadCloud, MapPin, Tag, DollarSign, Maximize2, User, Phone, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PropertyType } from '@/types';
import { addProperty } from '@/lib/firebase/properties';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/AuthContext';

interface ListPropertyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coordinates: number[][]; // The drawn polygon boundary
  onSuccess: () => void;
}

const DEFAULT_IMAGES: Record<PropertyType, string> = {
  land: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
  farm: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60',
  house: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
};

export function ListPropertyModal({ isOpen, onOpenChange, coordinates, onSuccess }: ListPropertyModalProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'land' as PropertyType,
    price: '',
    size: '',
    sizeUnit: 'acres' as 'acres' | 'sqft' | 'hectares' | 'sqm',
    placement: '',
    description: '',
    ownerName: user?.displayName || user?.email || '',
    contact: user?.email || '',
    image: '',
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData(prev => ({
        ...prev,
        ownerName: prev.ownerName || user.displayName || user.email || '',
        contact: prev.contact || user.email || '',
      }));
    }
  }, [user, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'land',
      price: '',
      size: '',
      sizeUnit: 'acres',
      placement: '',
      description: '',
      ownerName: '',
      contact: '',
      image: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const image = formData.image.trim() || DEFAULT_IMAGES[formData.type];

      await addProperty({
        title: formData.title,
        type: formData.type,
        price: Number(formData.price),
        size: Number(formData.size),
        sizeUnit: formData.sizeUnit,
        placement: formData.placement,
        description: formData.description,
        ownerName: formData.ownerName,
        contact: formData.contact,
        image,
        coordinates: coordinates,
      });

      resetForm();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("Failed to add property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-100 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:bg-white/10 transition-all";

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[2000] flex max-h-[85vh] w-full max-w-[640px] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#15181e] dark:text-gray-100 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-6 py-5 shrink-0">
            <Dialog.Title className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-gray-100">
              <MapPin className="h-5 w-5 text-emerald-500" />
              List New Property
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Scrollable form body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

            {/* Boundary confirmation banner */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-500">Boundary Captured Successfully</h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{coordinates.length} points mapped</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

            {/* ── Section: Property Details ── */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 dark:text-gray-500 mt-1">
              <Tag className="h-3.5 w-3.5" /> Property Details
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 block">Property Title *</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClass} placeholder="e.g. Sunset Valley Farm" />
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 block">Property Type *</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as PropertyType})} className={inputClass}>
                  <option value="land">Land (Raw Plot)</option>
                  <option value="farm">Farm (Agricultural)</option>
                  <option value="house">House (Residential)</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="h-3 w-3" /> Price (USD) *
                </label>
                <input required type="number" min="1" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputClass} placeholder="e.g. 450000" />
              </div>

              {/* Size + Unit */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Maximize2 className="h-3 w-3" /> Size *
                </label>
                <div className="flex gap-2">
                  <input required type="number" step="0.1" min="0.1" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className={cn(inputClass, "flex-1")} placeholder="e.g. 10.5" />
                  <select value={formData.sizeUnit} onChange={e => setFormData({...formData, sizeUnit: e.target.value as any})} className={cn(inputClass, "w-[100px]")}>
                    <option value="acres">Acres</option>
                    <option value="sqft">SqFt</option>
                    <option value="sqm">Sqm</option>
                    <option value="hectares">Ha</option>
                  </select>
                </div>
              </div>

              {/* Location / Placement */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 block">Location *</label>
                <input required type="text" value={formData.placement} onChange={e => setFormData({...formData, placement: e.target.value})} className={inputClass} placeholder="e.g. Austin, TX" />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <FileText className="h-3 w-3" /> Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className={cn(inputClass, "resize-none")}
                  placeholder="Describe soil type, water access, zoning, structures, road access, etc."
                />
              </div>

              {/* Image URL (optional) */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 block">Cover Image URL <span className="text-slate-400 dark:text-gray-600">(optional)</span></label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className={inputClass} placeholder="https://... (leave empty for default)" />
              </div>
            </div>

            {/* ── Section: Owner / Seller Info ── */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 dark:text-gray-500 border-t border-slate-200 dark:border-white/10 pt-5 mt-1">
              <User className="h-3.5 w-3.5" /> Seller Contact
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Owner Name */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 block">Full Name *</label>
                <input required type="text" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} className={inputClass} placeholder="e.g. Sarah Connor" />
              </div>

              {/* Contact */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="h-3 w-3" /> Phone / Email *
                </label>
                <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className={inputClass} placeholder="e.g. (555) 123-4567" />
              </div>
            </div>

            {/* ── Action buttons ── */}
            <div className="mt-4 flex gap-3 shrink-0 pb-1">
              <button type="button" onClick={() => onOpenChange(false)} className="flex-1 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5 py-3 text-sm font-semibold transition-colors">
                Cancel
              </button>
              <button disabled={isSubmitting} type="submit" className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
