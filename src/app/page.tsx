'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MOCK_PROPERTIES } from '@/lib/mockData';
import { Plus, LocateFixed, Layers, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MapView } from '@/components/map/MapView';
import { ListPropertyModal } from '@/components/ui/ListPropertyModal';
import { PropertyDetailsModal } from '@/components/ui/PropertyDetailsModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/components/auth/AuthContext';
import { Property } from '@/types';
import { getProperties } from '@/lib/firebase/properties';

export default function Home() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  
  // Drawing & Modal states
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawnCoordinates, setDrawnCoordinates] = useState<number[][]>([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Map controls
  const [mapType, setMapType] = useState<'dark' | 'satellite'>('dark');
  const [locateTrigger, setLocateTrigger] = useState(0);

  // Fetch Firestore properties on mount
  useEffect(() => {
    async function loadProperties() {
      try {
        const firestoreProps = await getProperties();
        if (firestoreProps && firestoreProps.length > 0) {
          setProperties([...firestoreProps, ...MOCK_PROPERTIES]);
        }
      } catch (err) {
        console.log("Using initial mock properties (Firestore offline or empty)");
      }
    }
    loadProperties();
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlistedIds((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => 
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };
  
  const startDrawing = () => {
    setIsSidebarCollapsed(true);
    setIsDrawingMode(true);
  };

  const handleInitiateListing = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      startDrawing();
    }
  };

  // Check if returning from full auth page with action=list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('action') === 'list' || params.get('redirect') === 'list') {
        if (user) {
          startDrawing();
          window.history.replaceState({}, '', '/');
        } else {
          setIsAuthModalOpen(true);
        }
      }
    }
  }, [user]);

  const handleDrawComplete = (coordinates: number[][]) => {
    setIsDrawingMode(false);
    setIsSidebarCollapsed(false);
    setDrawnCoordinates(coordinates);
    setIsListModalOpen(true);
  };

  const cancelDrawing = () => {
    setIsDrawingMode(false);
    setIsSidebarCollapsed(false);
  };

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
    setIsDetailsModalOpen(true);
  };

  const handleAddPropertySuccess = async () => {
    try {
      const updated = await getProperties();
      if (updated && updated.length > 0) {
        setProperties([...updated, ...MOCK_PROPERTIES]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleMapType = () => {
    setMapType(prev => prev === 'dark' ? 'satellite' : 'dark');
  };

  const handleLocateMe = () => {
    setLocateTrigger(prev => prev + 1);
  };

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#0b0d10] text-gray-100">
      <Sidebar
        properties={properties}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        selectedPropertyId={selectedPropertyId}
        onPropertySelect={handlePropertySelect}
        wishlistedIds={wishlistedIds}
        onToggleWishlist={toggleWishlist}
        comparedIds={comparedIds}
        onToggleCompare={toggleCompare}
        onHoverPropertyStart={setHoveredPropertyId}
        onHoverPropertyEnd={() => setHoveredPropertyId(null)}
        onAddPropertyClick={handleInitiateListing}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Map Area */}
      <div className="relative flex-1 h-full w-full">
        <MapView 
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          hoveredPropertyId={hoveredPropertyId}
          onPropertySelect={handlePropertySelect}
          isDrawingMode={isDrawingMode}
          onDrawComplete={handleDrawComplete}
          mapType={mapType}
          locateTrigger={locateTrigger}
        />

        {/* Drawing Mode Banner */}
        <div className={cn(
          "absolute left-1/2 top-6 z-[1500] flex -translate-x-1/2 items-center gap-6 rounded-2xl border border-emerald-500 bg-[#15181e] px-6 py-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-500",
          isDrawingMode ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        )}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[15px] font-bold text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Step 1: Draw your property boundary
            </div>
            <div className="mt-1 text-[13px] text-gray-400">
              Click on the map to place points. Click the first point again to finish.
            </div>
          </div>
          <button 
            onClick={cancelDrawing}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
        </div>

        {/* Floating Action Buttons — stacked bottom-right */}
        <div className="absolute right-6 top-6 z-[1000] flex flex-col gap-3">
          {/* Map Type Toggle */}
          <button 
            onClick={toggleMapType}
            className={cn(
              "group flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all",
              mapType === 'satellite' 
                ? "border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/25" 
                : "border-white/10 bg-[#15181e] text-gray-300 hover:border-emerald-500 hover:text-emerald-500"
            )} 
            title={mapType === 'dark' ? 'Switch to Satellite' : 'Switch to Dark Map'}
          >
            {mapType === 'dark' ? <Globe className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
          </button>

          {/* Locate Me */}
          <button 
            onClick={handleLocateMe}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#15181e] text-gray-300 shadow-lg transition-all hover:border-emerald-500 hover:text-emerald-500" 
            title="Locate Me"
          >
            <LocateFixed className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute right-6 bottom-8 z-[1000] flex flex-col gap-3">
          {/* Add New Property FAB */}
          <button 
            onClick={handleInitiateListing}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_4px_16px_rgba(16,185,129,0.25)] transition-all hover:scale-105 hover:bg-emerald-600"
            title="List New Property"
          >
            <Plus className="h-6 w-6 stroke-[2.5px]" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
        onSuccess={() => {
          startDrawing();
        }}
      />

      <ListPropertyModal
        isOpen={isListModalOpen}
        onOpenChange={setIsListModalOpen}
        coordinates={drawnCoordinates}
        onSuccess={handleAddPropertySuccess}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
    </main>
  );
}

