'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import { Property } from '@/types';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

interface MapClientProps {
  properties: Property[];
  selectedPropertyId: string | null;
  hoveredPropertyId: string | null;
  onPropertySelect: (id: string) => void;
  isDrawingMode?: boolean;
  onDrawComplete?: (coordinates: number[][]) => void;
  mapType?: 'dark' | 'light' | 'satellite';
  locateTrigger?: number; // increment to trigger locate
}

// Map configuration
const MAP_CENTER: [number, number] = [39.8283, -98.5795]; // US Center
const MAP_ZOOM = 4;

const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY?.trim();

const TILE_URLS = {
  dark: CARTO_API_KEY
    ? `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
  light: CARTO_API_KEY
    ? `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

const TILE_ATTRIBUTIONS = {
  dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  light: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  satellite: 'Tiles &copy; Esri',
};

// Component to handle programmatic map updates (zooming to selected, etc.)
function MapController({ selectedProperty, hoveredPropertyId }: { selectedProperty?: Property, hoveredPropertyId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedProperty && selectedProperty.coordinates.length > 0) {
      const bounds = L.latLngBounds(selectedProperty.coordinates.map(c => [c[0], c[1]]));
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [selectedProperty, map]);

  return null;
}

// Component to handle Geoman drawing mode
function GeomanController({ isDrawingMode, onDrawComplete }: { isDrawingMode?: boolean, onDrawComplete?: (c: number[][]) => void }) {
  const map = useMap();
  const drawnLayerRef = useRef<L.Polygon | null>(null);

  useEffect(() => {
    // Add translation and initial setup if needed
    map.pm.setLang('en');

    // Listen for drawing creation
    const handleDrawCreate = (e: any) => {
      const layer = e.layer as L.Polygon;
      drawnLayerRef.current = layer;

      const latlngs = layer.getLatLngs();
      let coordsArray: L.LatLng[] = [];

      if (Array.isArray(latlngs) && Array.isArray(latlngs[0])) {
        coordsArray = latlngs[0] as L.LatLng[];
      } else if (Array.isArray(latlngs)) {
        coordsArray = latlngs as unknown as L.LatLng[];
      }

      const coords = coordsArray.map(ll => [ll.lat, ll.lng]);
      if (onDrawComplete) onDrawComplete(coords);
    };

    map.on('pm:create', handleDrawCreate);

    return () => {
      map.off('pm:create', handleDrawCreate);
    };
  }, [map, onDrawComplete]);

  useEffect(() => {
    if (isDrawingMode) {
      map.pm.enableDraw('Polygon');
    } else {
      map.pm.disableDraw('Polygon');
      // Clear the unsaved layer if we cancel drawing
      if (drawnLayerRef.current) {
        map.removeLayer(drawnLayerRef.current);
        drawnLayerRef.current = null;
      }
    }
  }, [isDrawingMode, map]);

  return null;
}

// Component to handle locate-me via geolocation
function LocateController({ locateTrigger }: { locateTrigger?: number }) {
  const map = useMap();
  const markerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (!locateTrigger) return;

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latlng: L.LatLngExpression = [latitude, longitude];

        // Remove old marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Add user location marker
        markerRef.current = L.circleMarker(latlng, {
          radius: 8,
          fillColor: '#10b981',
          fillOpacity: 1,
          color: '#fff',
          weight: 3,
        }).addTo(map);

        markerRef.current.bindPopup('You are here').openPopup();
        map.flyTo(latlng, 13, { duration: 1.5 });
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not get your location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [locateTrigger, map]);

  return null;
}

export default function MapClient({
  properties,
  selectedPropertyId,
  hoveredPropertyId,
  onPropertySelect,
  isDrawingMode,
  onDrawComplete,
  mapType = 'dark',
  locateTrigger,
}: MapClientProps) {

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          key={mapType}
          url={TILE_URLS[mapType]}
          attribution={TILE_ATTRIBUTIONS[mapType]}
          subdomains={mapType === 'dark' || mapType === 'light' ? 'abcd' : 'abc'}
          maxZoom={20}
        />

        {/* Render existing properties */}
        {properties.map(property => {
          const isSelected = property.id === selectedPropertyId;
          const isHovered = property.id === hoveredPropertyId;

          const color = property.type === 'house' ? '#eab308' :
            property.type === 'farm' ? '#10b981' : '#3b82f6';

          return (
            <Polygon
              key={property.id}
              positions={property.coordinates as [number, number][]}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: isSelected || isHovered ? 0.6 : 0.2,
                weight: isSelected ? 4 : 2,
              }}
              eventHandlers={{
                click: () => onPropertySelect(property.id),
              }}
            />
          );
        })}

        <MapController selectedProperty={selectedProperty} hoveredPropertyId={hoveredPropertyId} />
        <GeomanController isDrawingMode={isDrawingMode} onDrawComplete={onDrawComplete} />
        <LocateController locateTrigger={locateTrigger} />
      </MapContainer>
    </div>
  );
}

