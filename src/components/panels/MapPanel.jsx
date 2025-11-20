import React, { useEffect, useState, useRef } from 'react';
import { Icon } from 'leaflet';
import { mapAPI, weatherAPI } from '../../utils/api';
import { mapWeatherCodeToIcon } from '../../utils/weather';
import { SkeletonMapPanel } from '../UI/SkeletonLoader';
import MapStyles from '../map/MapStyles';
import MapHeader from '../map/MapHeader';
import MapSearchSection from '../map/MapSearchSection';
import MapContainer from '../map/MapContainer';
import MapPreviewCard from '../map/MapPreviewCard';
import MapCurrentLocation from '../map/MapCurrentLocation';


delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function MapPanel({
  mockSearch,
  currentLocation = { lat: 21.0285, lon: 105.8542, city: 'Hanoi' },
  onLocationChange,
  onPreviewLocation,
  motionEnabled,
  currentTheme,
  primaryText,
  setPage,
  openDetail,
  openSettings,
  isMenuOpen,
  setIsMenuOpen,
  isVisible = true,
}) {
  const [mapCenter, setMapCenter] = useState([currentLocation.lat, currentLocation.lon]);
  const [markerPosition, setMarkerPosition] = useState([currentLocation.lat, currentLocation.lon]);
  const [locationName, setLocationName] = useState(currentLocation.city);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const mapRef = useRef(null);
  const debouncedInvalidateSize = useRef(null);

  useEffect(() => {
    if (currentLocation && currentLocation.lat && currentLocation.lon) {
      const newCenter = [currentLocation.lat, currentLocation.lon];
      setMapCenter(newCenter);
      setMarkerPosition(newCenter);
      setLocationName(currentLocation.city || 'Unknown');
    }
  }, [currentLocation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderMap(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && shouldRenderMap) {
      invalidateSizeDebounced();
    }
  }, [mapCenter, shouldRenderMap, isVisible]);

  const invalidateSizeDebounced = () => {
    if (debouncedInvalidateSize.current) clearTimeout(debouncedInvalidateSize.current);
    debouncedInvalidateSize.current = setTimeout(() => {
      if (mapRef.current) mapRef.current.invalidateSize();
    }, 200);
  };

  const fetchPreviewCardData = async (lat, lon, cityName) => {
    setIsLoading(true);
    setError(null);
    try {
      const currentData = await weatherAPI.getCurrentWeather(null, lat, lon);
      const rawWeatherCode = currentData.weather.weatherCode;
      const mappedIconCode = mapWeatherCodeToIcon(rawWeatherCode);
      
      setPreviewData({
        location: { lat, lon, city: cityName },
        weather: {
          temperature: currentData.weather.temperature,
          condition: currentData.weather.condition,
          weatherCode: mappedIconCode,
          tempMax: currentData.weather.temperature,
          tempMin: currentData.weather.temperature,
        }
      });
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Preview card fetch error:', err);
      }
      setError('Lỗi khi lấy dữ liệu thời tiết');
      setPreviewData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query || query.trim() === '') return;
    
    setIsLoading(true);
    setError(null);
    setPreviewData(null);
    
    try {
      const response = await mapAPI.searchLocation(query);
      if (response.results && response.results.length > 0) {
        const location = response.results[0];
        const newCenter = [location.lat, location.lon];
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        const locationName = location.nameVi || location.name;
        setLocationName(locationName);
        
        if (mockSearch) mockSearch(query);
        
        await fetchPreviewCardData(location.lat, location.lon, locationName);
      } else {
        setError('Không tìm thấy địa điểm');
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Search error:', err);
      }
      setError('Lỗi khi tìm kiếm địa điểm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    const newCenter = [lat, lng];
    
    setMarkerPosition(newCenter);
    setMapCenter(newCenter);
    
    if (mapRef.current) {
      mapRef.current.flyTo(newCenter, 13, {
        duration: 0.8,
        easeLinearity: 0.1
      });
    }
    
    setIsLoading(true);
    setError(null);
    setPreviewData(null);
    
    try {
      const location = await mapAPI.reverseGeocode(lat, lng);
      const locationName = location.nameVi || location.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      
      setLocationName(locationName);
      
      await fetchPreviewCardData(lat, lng, locationName);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Reverse geocode error:', err);
      }
      const fallbackName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setLocationName(fallbackName);
      
      await fetchPreviewCardData(lat, lng, fallbackName);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewCardClick = () => {
    if (previewData && onPreviewLocation) {
      onPreviewLocation(
        previewData.location.lat,
        previewData.location.lon,
        previewData.location.city
      );
    }
  };


  if (isLoading) {
    return <SkeletonMapPanel />;
  }

  return (
    <>
      <MapStyles />
      <section className="h-full flex flex-col relative overflow-hidden">
        <MapHeader
          setPage={setPage}
          openDetail={openDetail}
          openSettings={openSettings}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          currentTheme={currentTheme}
          primaryText={primaryText}
        />

        <MapSearchSection
          handleSearch={handleSearch}
          currentTheme={currentTheme}
          primaryText={primaryText}
          currentLocation={currentLocation}
          error={error}
          isLoading={false}
        />

        <MapContainer
          mapCenter={mapCenter}
          markerPosition={markerPosition}
          locationName={locationName}
          handleMapClick={handleMapClick}
          mapRef={mapRef}
          invalidateSizeDebounced={invalidateSizeDebounced}
          primaryText={primaryText}
          shouldRenderMap={shouldRenderMap}
        />
        
        <MapPreviewCard
          previewData={previewData}
          handlePreviewCardClick={handlePreviewCardClick}
        />

        <MapCurrentLocation
          locationName={locationName}
          currentTheme={currentTheme}
          primaryText={primaryText}
        />
      </section>
    </>
  );
}
