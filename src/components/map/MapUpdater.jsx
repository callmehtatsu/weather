import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';


export default function MapUpdater({ center }) {
  const map = useMap();
  const debouncedInvalidateSize = useRef(null);
  
  const invalidateSizeDebounced = () => {
    if (debouncedInvalidateSize.current) clearTimeout(debouncedInvalidateSize.current);
    debouncedInvalidateSize.current = setTimeout(() => {
      if (map && typeof map.invalidateSize === 'function') {
        map.invalidateSize();
      }
    }, 200);
  };
  
  useEffect(() => {
    if (!map || !center) return;
    
    try {
      map.flyTo(center, map.getZoom(), {
        duration: 0.8,
        easeLinearity: 0.1
      });
      invalidateSizeDebounced();
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Map update error:', e);
      }
    }
  }, [center, map]);
  
  useEffect(() => {
    if (!map) return;
    invalidateSizeDebounced();
  }, [map]);
  
  return null;
}
