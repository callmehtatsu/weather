import React, { useState, useEffect } from 'react';
import { Droplets, Droplet, Wind } from 'lucide-react';

export default function MetricsCard({ 
  rainChance, 
  humidity, 
  windSpeed, 
  accentColor = '#1565c0', 
  primaryText = '#000', 
  secondaryText = '#666',
  style = {}
}) {
  const [iconSize, setIconSize] = useState(24);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      setIconSize(Math.round(Math.min(width * 0.06, 24)));
    };
    
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

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
      <div className="flex items-center justify-between" style={{ gap: 'clamp(0.75rem, 4vw, 1.25rem)' }}>
        <div className="flex flex-col items-center flex-1">
          <Droplets size={iconSize} color={accentColor} strokeWidth={1.5} />
          <div className="font-bold" style={{ color: primaryText, fontSize: 'clamp(1rem, 4vw, 1.125rem)', marginTop: 'clamp(0.375rem, 1.5vh, 0.5rem)' }}>
            {rainChance || 0}%
          </div>
          <div style={{ color: secondaryText, fontSize: 'clamp(0.8rem, 3vw, 0.875rem)', marginTop: 'clamp(0.25rem, 1vh, 0.25rem)' }}>
            Khả năng mưa
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <Droplet size={iconSize} color={accentColor} strokeWidth={1.5} />
          <div className="font-bold" style={{ color: primaryText, fontSize: 'clamp(1rem, 4vw, 1.125rem)', marginTop: 'clamp(0.375rem, 1.5vh, 0.5rem)' }}>
            {humidity != null && humidity !== undefined ? Math.round(humidity) : 65}%
          </div>
          <div style={{ color: secondaryText, fontSize: 'clamp(0.8rem, 3vw, 0.875rem)', marginTop: 'clamp(0.25rem, 1vh, 0.25rem)' }}>
            Độ ẩm
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <Wind size={iconSize} color={accentColor} strokeWidth={1.5} />
          <div className="font-bold" style={{ color: primaryText, fontSize: 'clamp(1rem, 4vw, 1.125rem)', marginTop: 'clamp(0.375rem, 1.5vh, 0.5rem)' }}>
            {windSpeed || 0} km/h
          </div>
          <div style={{ color: secondaryText, fontSize: 'clamp(0.8rem, 3vw, 0.875rem)', marginTop: 'clamp(0.25rem, 1vh, 0.25rem)' }}>
            Tốc độ gió
          </div>
        </div>
      </div>
    </div>
  );
}
