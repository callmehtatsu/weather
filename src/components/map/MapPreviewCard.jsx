import React from 'react';
import IconWeather from '../UI/IconWeather';


export default function MapPreviewCard({
  previewData,
  handlePreviewCardClick,
}) {
  if (!previewData || !previewData.weather) return null;

  const meshGradient = `
    radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.85) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.75) 0%, transparent 70%),
    linear-gradient(180deg, rgba(135, 206, 235, 0.88) 0%, rgba(30, 144, 255, 0.9) 100%)
  `;
  
  const coloredShadow = `
    0px 20px 60px rgba(25, 118, 210, 0.4),
    0px 8px 25px rgba(25, 118, 210, 0.3),
    0px 0px 80px rgba(25, 118, 210, 0.25)
  `;
  
  const previewCardStyle = {
    background: meshGradient,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      ${coloredShadow},
      inset 3px 3px 8px rgba(255, 255, 255, 0.4),
      inset -3px -3px 8px rgba(30, 144, 255, 0.3),
      inset 6px 6px 12px rgba(255, 255, 255, 0.2),
      inset -6px -6px 12px rgba(30, 144, 255, 0.25)
    `,
    border: 'none',
  };

  return (
    <div
      className="flex-shrink-0 mb-4 mx-4 p-5 rounded-3xl cursor-pointer transition-all active:scale-95 hover:opacity-90"
      style={previewCardStyle}
      onClick={handlePreviewCardClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div style={{ 
            width: '60px', 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            opacity: 1
          }}>
            <IconWeather
              code={previewData.weather.weatherCode}
              size={60}
              motionEnabled={false}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold mb-1" style={{ color: '#FFFFFF' }}>
              {previewData.location.city}
            </div>
            <div className="text-xs mb-1" style={{ color: '#FFFFFF', opacity: 0.9 }}>
              {previewData.weather.condition}
            </div>
            <div className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
              {Math.round(previewData.weather.temperature)}°
            </div>
          </div>
        </div>
        <div className="text-xs font-medium" style={{ color: '#FFFFFF', opacity: 0.8 }}>
          Nhấn để xem chi tiết →
        </div>
      </div>
    </div>
  );
}
