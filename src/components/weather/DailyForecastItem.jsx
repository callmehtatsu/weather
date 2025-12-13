import React, { useState, useEffect } from 'react';
import IconWeather from '../UI/IconWeather';

// Temperature bar component - Full bar with gradient based on temperature range
function TemperatureBar({ tempMin, tempMax, allTemps = [] }) {
  // Temperature range for color mapping: 10°C to 30°C
  const TEMP_MIN = 10;
  const TEMP_MAX = 30;
  const TEMP_RANGE = TEMP_MAX - TEMP_MIN; // 20°C

  // Get color based on temperature
  // Using smooth gradient: Blue (xanh dương) → Yellow → Red (đỏ đậm)
  const getTempColor = (temp) => {
    // Clamp temperature to range
    const clampedTemp = Math.max(TEMP_MIN, Math.min(TEMP_MAX, temp));
    // Normalize to 0-1 range
    const normalized = (clampedTemp - TEMP_MIN) / TEMP_RANGE;
    
    // Base colors - xanh dương và đỏ đậm
    // Blue (xanh dương đậm): rgb(40, 90, 200)
    // Light Blue (xanh dương nhạt): rgb(100, 150, 255) - thay cho yellow
    // Red (đỏ đậm): rgb(200, 0, 0)
    
    if (normalized <= 0.5) {
      // Blue to Light Blue (0 to 0.5)
      const t = normalized * 2; // 0 to 1
      const r = Math.round(40 + t * (100 - 40));
      const g = Math.round(90 + t * (150 - 90));
      const b = Math.round(200 + t * (255 - 200));
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Light Blue to Red (0.5 to 1)
      const t = (normalized - 0.5) * 2; // 0 to 1
      const r = Math.round(100 + t * (200 - 100));
      const g = Math.round(150 + t * (0 - 150));
      const b = Math.round(255 + t * (0 - 255));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Get colors for min and max temperatures
  const minColor = getTempColor(tempMin);
  const maxColor = getTempColor(tempMax);
  
  // Add middle color for smoother gradient
  const midTemp = (tempMin + tempMax) / 2;
  const midColor = getTempColor(midTemp);

  // Full bar gradient based on temperature range
  const barGradient = `linear-gradient(90deg, ${minColor} 0%, ${midColor} 50%, ${maxColor} 100%)`;

  return (
    <div 
      style={{
        width: '100%',
        height: '6px',
        borderRadius: '3px',
        position: 'relative',
        overflow: 'hidden',
        background: barGradient, // Full bar with gradient based on temp range
      }}
    />
  );
}

export default function DailyForecastItem({ 
  day, 
  icon, 
  desc, 
  temp, 
  tempMin, 
  allTemps = [],
  isSelected, 
  onClick, 
  convertTemp,
  style = {},
  primaryText = '#555',
  secondaryText = '#555',
}) {
  const [iconSize, setIconSize] = useState(40);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      // Responsive icon size: smaller on mobile
      setIconSize(Math.round(Math.min(Math.max(width * 0.08, 28), 38)));
    };
    
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);
  
  const defaultStyle = {
    paddingTop: 'clamp(0.375rem, 1.2vh, 0.625rem)',
    paddingBottom: 'clamp(0.375rem, 1.2vh, 0.625rem)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    opacity: isSelected ? 1 : 0.8,
    ...style
  };

  return (
    <button
      className="flex items-center w-full transition-all active:scale-95"
      style={defaultStyle}
      onClick={onClick}
    >
      <div 
        className="font-medium" 
        style={{ 
          color: primaryText, 
          opacity: isSelected ? 1 : 0.7, 
          width: 'clamp(55px, 14vw, 75px)', 
          marginLeft: '0', 
          flexShrink: 0, 
          textAlign: 'left',
          fontSize: 'clamp(0.75rem, 2.25vw, 0.9rem)',
          fontWeight: isSelected ? 600 : 500,
        }}
      >
        {day}
      </div>
      
      <div 
        style={{ 
          opacity: 1, 
          width: 'clamp(28px, 7vw, 36px)', 
          height: 'clamp(28px, 7vw, 36px)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0, 
          marginLeft: 'clamp(0.375rem, 1.5vw, 0.625rem)',
          marginRight: 'clamp(0.375rem, 1.5vw, 0.625rem)',
        }}
      >
        <IconWeather
          code={icon}
          motionEnabled={false}
          size={iconSize}
          isDay={true}
        />
      </div>

      {/* Min temperature - Left */}
      <div 
        className="font-medium" 
        style={{ 
          color: primaryText, 
          opacity: isSelected ? 1 : 0.7, 
          fontSize: 'clamp(0.75rem, 2.25vw, 0.9rem)',
          width: 'clamp(32px, 9vw, 42px)',
          textAlign: 'right',
          marginRight: 'clamp(0.375rem, 1.5vw, 0.625rem)',
          flexShrink: 0,
          fontWeight: isSelected ? 600 : 500,
        }}
      >
        {convertTemp(tempMin)}°
      </div>

      {/* Temperature bar - Full gradient background - Center */}
      <div 
        className="flex-1 flex items-center"
        style={{ 
          minWidth: 'clamp(70px, 22vw, 130px)',
          height: '6px',
          position: 'relative',
        }}
      >
        <TemperatureBar 
          tempMin={tempMin} 
          tempMax={temp}
          allTemps={allTemps.length > 0 ? allTemps : [tempMin, temp]}
        />
      </div>

      {/* Max temperature - Right */}
      <div 
        className="font-medium" 
        style={{ 
          color: primaryText, 
          opacity: isSelected ? 1 : 0.7, 
          width: 'clamp(32px, 9vw, 42px)', 
          textAlign: 'left', 
          fontSize: 'clamp(0.75rem, 2.25vw, 0.9rem)',
          marginLeft: 'clamp(0.375rem, 1.5vw, 0.625rem)',
          flexShrink: 0,
          fontWeight: isSelected ? 600 : 500,
        }}
      >
        {convertTemp(temp)}°
      </div>
    </button>
  );
}
