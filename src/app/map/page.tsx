'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

import { useTheme } from '@/components/theme/ThemeContext';

export default function MapPage() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
    const [comparedIds, setComparedIds] = useState<string[]>([]);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

    // On mobile (< 768px), sidebar should be closed by default when visiting the map
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setIsSidebarCollapsed(true);
        }
    }, []);

    // Drawing & Modal states
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [drawnCoordinates, setDrawnCoordinates] = useState<number[][]>([]);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Map controls - synchronized with theme
    const [isSatellite, setIsSatellite] = useState(false);
    const [locateTrigger, setLocateTrigger] = useState(0);

    const mapType: 'dark' | 'light' | 'satellite' = isSatellite ? 'satellite' : theme;

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
                    window.history.replaceState({}, '', '/map');
                } else {
                    setIsAuthModalOpen(true);
                }
            }
        }
    }, [user]);

    const handleDrawComplete = (coordinates: number[][]) => {
        setIsDrawingMode(false);
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            setIsSidebarCollapsed(false);
        }
        setDrawnCoordinates(coordinates);
        setIsListModalOpen(true);
    };

    const cancelDrawing = () => {
        setIsDrawingMode(false);
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            setIsSidebarCollapsed(false);
        }
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

    const toggleSatellite = () => {
        setIsSatellite(prev => !prev);
    };

    const handleLocateMe = () => {
        setLocateTrigger(prev => prev + 1);
    };

    const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

    return (
        <main className="relative flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#0b0d10] dark:text-gray-100 transition-colors duration-200">
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
                    "absolute left-1/2 top-6 z-[1500] flex -translate-x-1/2 items-center gap-6 rounded-2xl border border-emerald-500 bg-white/95 dark:bg-[#15181e] px-6 py-4 shadow-[0_4px_25px_rgba(16,185,129,0.2)] backdrop-blur-md transition-all duration-500",
                    isDrawingMode ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
                )}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[15px] font-bold text-emerald-600 dark:text-emerald-500">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            Step 1: Draw your property boundary
                        </div>
                        <div className="mt-1 text-[13px] text-slate-500 dark:text-gray-400">
                            Click on the map to place points. Click the first point again to finish.
                        </div>
                    </div>
                    <button
                        onClick={cancelDrawing}
                        className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                        Cancel
                    </button>
                </div>

                {/* Return to Home — Middle Top */}
                <div
                    className={cn(
                        "absolute left-1/2 top-4 sm:top-6 z-[1000] -translate-x-1/2 transition-all duration-300",
                        isDrawingMode && "pointer-events-none -translate-y-12 opacity-0"
                    )}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/95 px-5 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-emerald-500 hover:text-emerald-600 active:scale-95 dark:border-white/10 dark:bg-[#15181e]/95 dark:text-gray-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400 sm:px-6 sm:py-2.5 sm:text-sm shadow-slate-300/40 dark:shadow-black/40"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Floating Action Buttons — stacked top-right */}
                <div className="absolute right-6 top-6 z-[1000] flex flex-col gap-3">

                    {/* Map Satellite Toggle */}
                    <button
                        onClick={toggleSatellite}
                        className={cn(
                            "group flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105",
                            isSatellite
                                ? "border-emerald-500 bg-emerald-500 text-white shadow-emerald-500/25"
                                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-[#15181e] dark:text-gray-300 dark:hover:border-emerald-500 dark:hover:text-emerald-500 shadow-slate-300/50 dark:shadow-black/40"
                        )}
                        title={isSatellite ? `Switch to Map` : 'Switch to Satellite View'}
                    >
                        {isSatellite ? <Layers className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </button>

                    {/* Locate Me */}
                    <button
                        onClick={handleLocateMe}
                        className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-[#15181e] dark:text-gray-300 dark:hover:border-emerald-500 dark:hover:text-emerald-500 shadow-slate-300/50 dark:shadow-black/40"
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
