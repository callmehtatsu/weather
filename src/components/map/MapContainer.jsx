import React, { useEffect, useState, useRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import MapUpdater from './MapUpdater';
import { createLoaderIcon } from './MapLoaderIcon';
import { METRICS_COLORED_SHADOW } from '../../constants/styles';


export default function MapContainer({
  mapCenter,
  markerPosition,
  locationName,
  handleMapClick,
  mapRef,
  invalidateSizeDebounced,
  primaryText,
  shouldRenderMap,
}) {
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: `
      ${METRICS_COLORED_SHADOW},
      inset 3px 3px 6px rgba(255, 255, 255, 0.5),
      inset -3px -3px 6px rgba(30, 144, 255, 0.2),
      inset 5px 5px 10px rgba(255, 255, 255, 0.3),
      inset -5px -5px 10px rgba(30, 144, 255, 0.15)
    `,
  };

  return (
    <div 
      className="flex-1 mb-4 rounded-3xl overflow-hidden"
      style={{ ...glassStyle, minHeight: '400px', position: 'relative', marginLeft: '1rem', marginRight: '1rem' }}
    >
      {shouldRenderMap ? (
        <LeafletMapContainer
          key="map-container"
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '400px', zIndex: 0 }}
          scrollWheelZoom={true}
          eventHandlers={{
            click: handleMapClick
          }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
            invalidateSizeDebounced();
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={markerPosition} icon={createLoaderIcon()}>
            <Popup>
              <div className="text-center">
                <MapPin size={16} className="inline mb-1" />
                <p className="font-semibold">{locationName}</p>
                <p className="text-xs text-gray-500">
                  {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
          <MapUpdater center={mapCenter} />
          <ZoomControl position="bottomright" />
        </LeafletMapContainer>
      ) : (
        <div 
          style={{ 
            height: '100%', 
            width: '100%', 
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <p style={{ color: primaryText, opacity: 0.5 }}>Đang tải bản đồ...</p>
        </div>
      )}
    </div>
  );
}
