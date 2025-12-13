import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import KebabMenu from '../KebabMenu';


// Helper để tính responsive dựa trên aspect ratio
function getResponsiveHeaderPadding() {
  if (typeof window === 'undefined') return { top: 12, bottom: 8 };
  
  const aspectRatio = window.innerWidth / window.innerHeight;
  const isTallScreen = aspectRatio < 0.52; // 18.5:9, 19:9
  const isWideScreen = aspectRatio > 0.55; // 16:9
  
  if (isTallScreen) {
    // Màn hình dài: dùng vw thay vì vh
    return {
      top: Math.max(10, Math.min(32, window.innerWidth * 0.025)),
      bottom: Math.max(6, Math.min(16, window.innerWidth * 0.012)),
    };
  } else if (isWideScreen) {
    // Màn hình rộng: dùng vh
    return {
      top: Math.max(12, Math.min(32, window.innerHeight * 0.025)),
      bottom: Math.max(8, Math.min(16, window.innerHeight * 0.012)),
    };
  } else {
    // Cân bằng
    const avgTop = (window.innerWidth * 0.025 + window.innerHeight * 0.025) / 2;
    const avgBottom = (window.innerWidth * 0.012 + window.innerHeight * 0.012) / 2;
    return {
      top: Math.max(10, Math.min(32, avgTop)),
      bottom: Math.max(6, Math.min(16, avgBottom)),
    };
  }
}

export default function WeatherHeader({
  location,
  primaryText,
  secondaryText,
  setPage,
  openDetail,
  openSettings,
  isMenuOpen,
  setIsMenuOpen,
  currentTheme,
  isPreview = false,
  lastUpdated = null,
  getTimeAgo = null,
  gpsEnabled = false,
}) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [iconSize, setIconSize] = useState(28);
  const [gpsIconSize, setGpsIconSize] = useState(14);
  const [headerPadding, setHeaderPadding] = useState(getResponsiveHeaderPadding);

  useEffect(() => {
    const updateIconSizes = () => {
      const width = window.innerWidth;
      setIconSize(Math.round(Math.min(width * 0.07, 28)));
      setGpsIconSize(Math.round(Math.min(width * 0.035, 14)));
    };
    
    const updatePadding = () => setHeaderPadding(getResponsiveHeaderPadding());
    
    const handleResize = () => {
      updateIconSizes();
      updatePadding();
    };
    
    updateIconSizes();
    updatePadding();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = currentDateTime.toLocaleDateString('vi-VN', dateOptions);
  const time = currentDateTime.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });

  return (
    <div
      className="absolute top-0 left-0 w-full flex flex-col items-center justify-center"
      style={{
        fontFamily: 'Open Sans, sans-serif',
        background: 'transparent',
        paddingTop: `${headerPadding.top}px`,
        paddingBottom: `${headerPadding.bottom}px`,
        zIndex: 30,
      }}
    >
      {/* Kebab menu - absolute positioned (original WeatherPanel style) */}
      {!isPreview && (
        <KebabMenu
          setPage={setPage}
          openDetail={openDetail}
          openSettings={openSettings}
          currentTheme={currentTheme}
          primaryText={primaryText}
          size={iconSize}
          color={primaryText}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          minimal={true}
        />
      )}

      {/* Location display - centered */}
      <div className="flex items-center justify-center mb-2" style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
        <MapPin size={iconSize} style={{ color: primaryText }} strokeWidth={2.5} />
        <span style={{
          fontFamily: 'Open Sans, sans-serif',
          fontWeight: 700,
          color: primaryText,
          fontSize: 'clamp(1.1rem, 3.5vw, 1.85rem)',
          letterSpacing: '0.3px',
          lineHeight: 1,
        }}>
          {location}
        </span>
        {gpsEnabled && !isPreview && (
          <div
            className="flex items-center gap-1"
            style={{
              background: currentTheme.cardBgLight || 'rgba(21, 101, 192, 0.15)',
              padding: 'clamp(0.125rem, 1vw, 0.25rem) clamp(0.375rem, 1.5vw, 0.5rem)',
              borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
              marginLeft: 'clamp(0.25rem, 1.5vw, 0.5rem)',
              gap: 'clamp(0.125rem, 0.5vw, 0.25rem)',
              border: `1px solid ${currentTheme.border || 'rgba(255, 255, 255, 0.1)'}`,
            }}
            title="GPS đang bật"
          >
            <Navigation size={gpsIconSize} style={{ color: primaryText }} strokeWidth={2.5} />
            <span style={{
              fontSize: 'clamp(0.65rem, 2vw, 0.7rem)',
              color: primaryText,
              fontWeight: 600,
            }}>
              GPS
            </span>
          </div>
        )}
      </div>
      
      <p style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
        fontWeight: 400,
        color: secondaryText,
        letterSpacing: '0.2px',
        textAlign: 'center',
      }}>
        {formattedDate} {time}
      </p>
    </div>
  );
}
