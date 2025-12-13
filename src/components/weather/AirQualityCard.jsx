import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Cloud } from 'lucide-react';

export default function AirQualityCard({
  aqi = null,
  pm25 = null,
  pm10 = null,
  no2 = null,
  o3 = null,
  primaryText = '#000',
  secondaryText = '#666',
  style = {}
}) {
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      setIconSize(Math.round(Math.min(width * 0.05, 20)));
    };
    
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  // Xác định mức chất lượng không khí dựa trên AQI
  const getAQIInfo = (aqiValue) => {
    if (!aqiValue) return { label: 'N/A', color: '#666', level: 'unknown' };
    
    if (aqiValue <= 50) {
      return { label: 'Tốt', color: '#4CAF50', level: 'good' };
    } else if (aqiValue <= 100) {
      return { label: 'Trung bình', color: '#FFC107', level: 'moderate' };
    } else if (aqiValue <= 150) {
      return { label: 'Kém', color: '#FF9800', level: 'unhealthy-sensitive' };
    } else if (aqiValue <= 200) {
      return { label: 'Xấu', color: '#F44336', level: 'unhealthy' };
    } else if (aqiValue <= 300) {
      return { label: 'Rất xấu', color: '#9C27B0', level: 'very-unhealthy' };
    } else {
      return { label: 'Nguy hiểm', color: '#795548', level: 'hazardous' };
    }
  };

  const aqiInfo = getAQIInfo(aqi);

  const defaultStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      0px 8px 20px rgba(25, 118, 210, 0.3),
      0px 3px 10px rgba(25, 118, 210, 0.25),
      inset 3px 3px 6px rgba(255, 255, 255, 0.5),
      inset -3px -3px 6px rgba(30, 144, 255, 0.2),
      inset 5px 5px 10px rgba(255, 255, 255, 0.3),
      inset -5px -5px 10px rgba(30, 144, 255, 0.15)
    `,
    borderRadius: '2rem',
    border: 'none',
    ...style
  };

  return (
    <div style={{...defaultStyle, padding: 'clamp(1rem, 4vw, 1.25rem)'}}>
      <div className="mb-3">
        <h3 className="font-bold" style={{ 
          color: primaryText, 
          fontSize: 'clamp(0.875rem, 3vw, 1rem)',
          marginBottom: 'clamp(0.5rem, 2vh, 0.75rem)'
        }}>
          Chất lượng không khí
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold" style={{ 
              color: aqiInfo.color, 
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              lineHeight: 1
            }}>
              {aqi !== null ? aqi : '--'}
            </div>
            <div style={{ 
              color: secondaryText, 
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
              marginTop: 'clamp(0.25rem, 1vh, 0.375rem)'
            }}>
              AQI
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold" style={{ 
              color: aqiInfo.color, 
              fontSize: 'clamp(0.875rem, 3vw, 1rem)'
            }}>
              {aqiInfo.label}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ gap: 'clamp(0.5rem, 2vw, 0.75rem)' }}>
        {pm25 !== null && (
          <div className="flex flex-col items-center flex-1">
            <Cloud size={iconSize} color={primaryText} strokeWidth={1.5} />
            <div className="font-bold" style={{ 
              color: primaryText, 
              fontSize: 'clamp(0.875rem, 3vw, 1rem)', 
              marginTop: 'clamp(0.25rem, 1vh, 0.375rem)' 
            }}>
              {Math.round(pm25)}
            </div>
            <div style={{ 
              color: secondaryText, 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.75rem)', 
              marginTop: 'clamp(0.125rem, 0.5vh, 0.25rem)',
              textAlign: 'center'
            }}>
              PM2.5
            </div>
          </div>
        )}
        
        {pm10 !== null && (
          <div className="flex flex-col items-center flex-1">
            <Droplets size={iconSize} color={primaryText} strokeWidth={1.5} />
            <div className="font-bold" style={{ 
              color: primaryText, 
              fontSize: 'clamp(0.875rem, 3vw, 1rem)', 
              marginTop: 'clamp(0.25rem, 1vh, 0.375rem)' 
            }}>
              {Math.round(pm10)}
            </div>
            <div style={{ 
              color: secondaryText, 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.75rem)', 
              marginTop: 'clamp(0.125rem, 0.5vh, 0.25rem)',
              textAlign: 'center'
            }}>
              PM10
            </div>
          </div>
        )}
        
        {no2 !== null && (
          <div className="flex flex-col items-center flex-1">
            <Wind size={iconSize} color={primaryText} strokeWidth={1.5} />
            <div className="font-bold" style={{ 
              color: primaryText, 
              fontSize: 'clamp(0.875rem, 3vw, 1rem)', 
              marginTop: 'clamp(0.25rem, 1vh, 0.375rem)' 
            }}>
              {Math.round(no2)}
            </div>
            <div style={{ 
              color: secondaryText, 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.75rem)', 
              marginTop: 'clamp(0.125rem, 0.5vh, 0.25rem)',
              textAlign: 'center'
            }}>
              NO₂
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

