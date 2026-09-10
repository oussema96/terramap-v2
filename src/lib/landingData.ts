// Landing page data — Tunisia-focused properties, regions, and categories

export interface LandingProperty {
  id: string;
  title: string;
  type: 'land' | 'farm' | 'house';
  price: number;
  currency: string;
  size: number;
  sizeUnit: string;
  location: string;
  region: string;
  image: string;
  distanceKm?: number;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Region {
  id: string;
  name: string;
  image: string;
  propertyCount: number;
  tag: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
  type?: string;
}

export const FEATURED_PROPERTIES: LandingProperty[] = [
  {
    id: 'tl-001',
    title: 'Agricultural Land — Cap Bon',
    type: 'land',
    price: 120000,
    currency: 'TND',
    size: 7600,
    sizeUnit: 'm²',
    location: 'Kelibia, Tunisia',
    region: 'Nabeul',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    distanceKm: 2.4,
    features: ['Irrigation Ready', 'Agricultural Zone', 'Paved Access'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'tl-002',
    title: 'Olive Grove Estate',
    type: 'farm',
    price: 285000,
    currency: 'TND',
    size: 3.2,
    sizeUnit: 'ha',
    location: 'Hammamet, Tunisia',
    region: 'Nabeul',
    image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&auto=format&fit=crop&q=80',
    distanceKm: 5.1,
    features: ['Olive Trees', 'Well Water', 'Storage Unit'],
    isFeatured: true,
  },
  {
    id: 'tl-003',
    title: 'Seaside Villa Plot',
    type: 'house',
    price: 560000,
    currency: 'TND',
    size: 420,
    sizeUnit: 'm²',
    location: 'La Marsa, Tunis',
    region: 'Tunis',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80',
    distanceKm: 1.0,
    features: ['Sea View', 'Permits Ready', 'Corner Lot'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'tl-004',
    title: 'Fertile Farm with Citrus',
    type: 'farm',
    price: 195000,
    currency: 'TND',
    size: 2.8,
    sizeUnit: 'ha',
    location: 'Nabeul, Tunisia',
    region: 'Nabeul',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&auto=format&fit=crop&q=80',
    distanceKm: 8.3,
    features: ['Citrus Orchard', 'Irrigation', 'Farmhouse'],
    isFeatured: true,
  },
  {
    id: 'tl-005',
    title: 'Premium Building Land',
    type: 'land',
    price: 340000,
    currency: 'TND',
    size: 1200,
    sizeUnit: 'm²',
    location: 'Sousse, Tunisia',
    region: 'Sousse',
    image: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&auto=format&fit=crop&q=80',
    distanceKm: 3.7,
    features: ['Residential Zone', 'Utilities Connected', 'Flat Terrain'],
    isFeatured: true,
  },
  {
    id: 'tl-006',
    title: 'Beachfront Development Lot',
    type: 'land',
    price: 875000,
    currency: 'TND',
    size: 2500,
    sizeUnit: 'm²',
    location: 'Djerba, Tunisia',
    region: 'Médenine',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=80',
    distanceKm: 0.8,
    features: ['Beachfront', 'Tourism Zone', 'Road Access'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'tl-007',
    title: 'Vineyard & Country House',
    type: 'farm',
    price: 450000,
    currency: 'TND',
    size: 5.5,
    sizeUnit: 'ha',
    location: 'Zaghouan, Tunisia',
    region: 'Zaghouan',
    image: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800&auto=format&fit=crop&q=80',
    distanceKm: 12.0,
    features: ['Vineyard', 'Country House', 'Mountain Views'],
    isFeatured: true,
  },
  {
    id: 'tl-008',
    title: 'Urban Mixed-Use Plot',
    type: 'land',
    price: 620000,
    currency: 'TND',
    size: 800,
    sizeUnit: 'm²',
    location: 'Les Berges du Lac, Tunis',
    region: 'Tunis',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80',
    distanceKm: 0.5,
    features: ['Commercial Zone', 'Prime Location', 'High Foot Traffic'],
    isNew: true,
    isFeatured: true,
  },
];

export const REGIONS: Region[] = [
  {
    id: 'kelibia',
    name: 'Kelibia',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&auto=format&fit=crop&q=80',
    propertyCount: 48,
    tag: 'Coastal',
  },
  {
    id: 'hammamet',
    name: 'Hammamet',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    propertyCount: 125,
    tag: 'Tourist Hub',
  },
  {
    id: 'tunis',
    name: 'Tunis',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop&q=80',
    propertyCount: 312,
    tag: 'Capital',
  },
  {
    id: 'nabeul',
    name: 'Nabeul',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    propertyCount: 89,
    tag: 'Agricultural',
  },
  {
    id: 'sousse',
    name: 'Sousse',
    image: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&auto=format&fit=crop&q=80',
    propertyCount: 174,
    tag: 'Business District',
  },
  {
    id: 'djerba',
    name: 'Djerba',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=80',
    propertyCount: 63,
    tag: 'Island Paradise',
  },
];

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Properties', icon: '🏘️', description: 'Every listing' },
  { id: 'land', label: 'Agricultural Land', icon: '🌿', description: 'Fertile farmland & plots', type: 'land' },
  { id: 'farm', label: 'Farms & Orchards', icon: '🌾', description: 'Working farms & estates', type: 'farm' },
  { id: 'house', label: 'Houses & Villas', icon: '🏡', description: 'Residential properties', type: 'house' },
  { id: 'waterfront', label: 'Waterfront', icon: '🌊', description: 'Coastal & lakeside', type: 'land' },
  { id: 'mountain', label: 'Mountain Land', icon: '⛰️', description: 'Hills & highland plots', type: 'land' },
  { id: 'commercial', label: 'Commercial', icon: '🏢', description: 'Business & investment', type: 'land' },
  { id: 'new', label: 'New Listings', icon: '✨', description: 'Just added', type: 'land' },
];
