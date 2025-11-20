import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import KebabMenu from '../KebabMenu';


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
}) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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
        paddingTop: '2rem',
        paddingBottom: '1rem',
        zIndex: 30,
      }}
    >
      {!isPreview && (
        <KebabMenu
          setPage={setPage}
          openDetail={openDetail}
          openSettings={openSettings}
          currentTheme={currentTheme}
          primaryText={primaryText}
          size={24}
          color="#1565c0"
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin size={28} style={{ color: '#1565c0' }} strokeWidth={2.5} />
        <span style={{
          fontFamily: 'Open Sans, sans-serif',
          fontWeight: 700,
          color: '#1565c0',
          fontSize: '1.85rem',
          letterSpacing: '0.3px',
          lineHeight: 1,
        }}>
          {location}
        </span>
      </div>
      
      <p style={{
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '0.95rem',
        fontWeight: 400,
        color: secondaryText,
        letterSpacing: '0.2px',
        textAlign: 'center',
      }}>
        {formattedDate} {time}
      </p>
      {lastUpdated && getTimeAgo && (
        <p style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 400,
          color: secondaryText,
          letterSpacing: '0.1px',
          textAlign: 'center',
          marginTop: '4px',
          opacity: 0.7,
        }}>
          Cập nhật: {getTimeAgo(lastUpdated)}
        </p>
      )}
    </div>
  );
}
