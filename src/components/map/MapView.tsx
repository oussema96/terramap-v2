'use client';

import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 dark:bg-[#0b0d10] dark:text-gray-500">
      Loading map...
    </div>
  ),
});

export function MapView(props: any) {
  return <MapClient {...props} />;
}
