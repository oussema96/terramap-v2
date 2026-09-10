'use client';

import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSearch } from '@/components/landing/HeroSearch';
import { CategoryBar } from '@/components/landing/CategoryBar';
import { FeaturedProperties } from '@/components/landing/FeaturedProperties';
import { MapPreview } from '@/components/landing/MapPreview';
import { ExploreRegions } from '@/components/landing/ExploreRegions';
import { LandingFooter } from '@/components/landing/LandingFooter';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#0b0d10] text-slate-900 dark:text-gray-100 transition-colors duration-200">
      <LandingHeader onOpenAuth={() => setIsAuthModalOpen(true)} />

      <main className="w-full overflow-x-hidden">
        <HeroSearch />
        <CategoryBar />
        <FeaturedProperties />
        <MapPreview />
        <ExploreRegions />
      </main>

      <LandingFooter />

      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
