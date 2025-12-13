import React, { useState, useEffect } from 'react';
import IconWeather from '../UI/IconWeather';


export default function WeatherFooter({
  location,
  detailedAddress,
  temp,
  weatherCode,
  convertTemp,
  setPage,
  isPreview = false,
  currentTheme = {},
  primaryText = '#FFFFFF',
}) {
  // Light mode gradient
  const lightFooterGradient = `
    radial-gradient(circle at 20% 50%, rgba(30, 144, 255, 0.88) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(135, 206, 235, 0.85) 0%, transparent 50%),
    linear-gradient(90deg, rgba(30, 144, 255, 0.88) 0%, rgba(70, 130, 180, 0.82) 50%, rgba(135, 206, 235, 0.88) 100%)
  `;
  
  // Dark mode gradient
  const darkFooterGradient = currentTheme.footerGradient || `
    radial-gradient(circle at 20% 50%, rgba(100, 181, 246, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(66, 165, 245, 0.25) 0%, transparent 50%),
    linear-gradient(90deg, rgba(30, 30, 50, 0.4) 0%, rgba(30, 30, 50, 0.5) 50%, rgba(30, 30, 50, 0.4) 100%)
  `;
  
  const footerMeshGradient = currentTheme.footerGradient || lightFooterGradient;
  const isDarkMode = currentTheme.footerGradient !== undefined;

  // Light mode shadow
  const lightColoredShadow = `
    0px 20px 60px rgba(25, 118, 210, 0.4),
    0px 8px 25px rgba(25, 118, 210, 0.3),
    0px 0px 80px rgba(25, 118, 210, 0.25)
  `;
  
  // Dark mode shadow
  const darkColoredShadow = `
    0px 20px 60px rgba(100, 181, 246, 0.3),
    0px 8px 25px rgba(100, 181, 246, 0.25),
    0px 0px 80px rgba(100, 181, 246, 0.2)
  `;
  
  const coloredShadow = isDarkMode ? darkColoredShadow : lightColoredShadow;

  const [iconSize, setIconSize] = useState(48);

  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      setIconSize(Math.round(Math.min(width * 0.12, 48)));
    };
    
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const otherSectionStyle = {
    marginLeft: 'clamp(9.5px, 2.85vw, 14.25px)', // Giảm 5% (x 0.95)
    marginRight: 'clamp(9.5px, 2.85vw, 14.25px)', // Giảm 5% (x 0.95)
    transform: 'scale(1.05)', // Tăng 5% kích thước
  };

  return (
    <>
      <div style={otherSectionStyle} className="mb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold" style={{ color: primaryText, fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
            Thành phố khác
          </h3>
          {!isPreview && (
            <button
              className="font-bold transition-all active:scale-95"
              style={{ color: primaryText, fontSize: 'clamp(1.5rem, 5vw, 1.5rem)' }}
              aria-label="Add city"
              onClick={() => setPage && setPage(2)}
            >
              +
            </button>
          )}
        </div>
      </div>

      <div style={otherSectionStyle} className="mb-0">
        <div
          style={{
            background: footerMeshGradient,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `
              ${coloredShadow},
              ${isDarkMode ? `
                inset 3px 3px 8px rgba(255, 255, 255, 0.15),
                inset -3px -3px 8px rgba(100, 181, 246, 0.2),
                inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                inset -6px -6px 12px rgba(100, 181, 246, 0.15)
              ` : `
                inset 3px 3px 8px rgba(255, 255, 255, 0.4),
                inset -3px -3px 8px rgba(30, 144, 255, 0.3),
                inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                inset -6px -6px 12px rgba(30, 144, 255, 0.25)
              `}
            `,
            borderRadius: '2rem',
            border: isDarkMode ? `1px solid ${currentTheme.border || 'rgba(255, 255, 255, 0.15)'}` : 'none',
            padding: 'clamp(1rem, 4vw, 1.5rem)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 'clamp(0.75rem, 3vw, 1rem)' }}>
              <IconWeather 
                code={weatherCode || 1} 
                size={iconSize}
                motionEnabled={false}
                isDay={null}
              />
              <div className="flex flex-col">
                <span className="font-bold text-white" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.25rem)' }}>
                  {location}
                </span>
                {detailedAddress && detailedAddress !== location && (
                  <span className="text-white/80 mt-1" style={{ fontSize: 'clamp(0.8rem, 3vw, 0.875rem)' }}>
                    {detailedAddress}
                  </span>
                )}
              </div>
            </div>
            <div className="font-black text-white" style={{ fontSize: 'clamp(1.75rem, 6vw, 1.875rem)' }}>
              {convertTemp(temp)}°
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
