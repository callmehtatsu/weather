import React, { useState } from 'react';
import { HourlyCard } from './index';
import { ACTIVE_HOURLY_COLORED_SHADOW } from '../../constants/styles';


export default function WeatherHourly({
  hourlyForecast,
  convertTemp,
  setPage,
  isPreview = false,
  primaryText,
  secondaryText,
  onHourClick = null, // Callback khi click vào hourly card
  currentTheme = {},
}) {
  const [selectedHour, setSelectedHour] = useState(0);
  
  const handleHourClick = (index) => {
    setSelectedHour(index);
    if (onHourClick && hourlyForecast[index]) {
      onHourClick(hourlyForecast[index]);
    }
  };

  const isDarkMode = currentTheme.hourlyActiveGradient !== undefined;
  
  const lightHourlyColoredShadow = '0px 6px 18px rgba(100, 181, 246, 0.25), 0px 2px 8px rgba(100, 181, 246, 0.2)';
  const darkHourlyColoredShadow = '0px 6px 18px rgba(100, 181, 246, 0.3), 0px 2px 8px rgba(100, 181, 246, 0.25)';
  
  // Light mode active style
  const lightHourlyActiveStyle = {
    background: `
      radial-gradient(circle at 30% 30%, rgba(135, 206, 235, 0.9) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(30, 144, 255, 0.9) 0%, transparent 50%),
      linear-gradient(180deg, rgba(70, 130, 180, 0.85) 0%, rgba(30, 144, 255, 0.9) 100%)
    `,
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    color: '#FFFFFF',
    boxShadow: `
      ${ACTIVE_HOURLY_COLORED_SHADOW},
      inset 2px 2px 6px rgba(255, 255, 255, 0.35),
      inset -2px -2px 6px rgba(30, 144, 255, 0.3),
      inset 4px 4px 8px rgba(255, 255, 255, 0.25),
      inset -4px -4px 8px rgba(30, 144, 255, 0.25)
    `,
    borderRadius: '1.5rem',
    minHeight: 0,
    minWidth: 0,
    border: 'none',
  };
  
  // Dark mode active style
  const darkHourlyActiveStyle = {
    background: currentTheme.hourlyActiveGradient || `
      radial-gradient(circle at 30% 30%, rgba(100, 181, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(66, 165, 245, 0.35) 0%, transparent 50%),
      linear-gradient(180deg, rgba(30, 30, 50, 0.5) 0%, rgba(30, 30, 50, 0.6) 100%)
    `,
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    color: '#FFFFFF',
    boxShadow: `
      ${darkHourlyColoredShadow},
      inset 2px 2px 6px rgba(255, 255, 255, 0.15),
      inset -2px -2px 6px rgba(100, 181, 246, 0.2),
      inset 4px 4px 8px rgba(255, 255, 255, 0.1),
      inset -4px -4px 8px rgba(100, 181, 246, 0.15)
    `,
    borderRadius: '1.5rem',
    minHeight: 0,
    minWidth: 0,
    border: `1px solid ${currentTheme.border || 'rgba(255, 255, 255, 0.15)'}`,
  };
  
  const hourlyActiveStyle = isDarkMode ? darkHourlyActiveStyle : lightHourlyActiveStyle;
  
  // Light mode inactive style
  const lightHourlyInactiveStyle = {
    background: `
      radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.65) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(100, 181, 246, 0.6) 0%, transparent 50%),
      linear-gradient(180deg, rgba(135, 206, 235, 0.7) 0%, rgba(100, 181, 246, 0.75) 100%)
    `,
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: `
      ${lightHourlyColoredShadow},
      inset 2px 2px 5px rgba(255, 255, 255, 0.3),
      inset -2px -2px 5px rgba(100, 181, 246, 0.2),
      inset 4px 4px 8px rgba(255, 255, 255, 0.2),
      inset -4px -4px 8px rgba(100, 181, 246, 0.15)
    `,
    borderRadius: '1.5rem',
    minHeight: 0,
    minWidth: 0,
    border: 'none',
    color: '#FFFFFF',
  };
  
  // Dark mode inactive style
  const darkHourlyInactiveStyle = {
    background: currentTheme.hourlyInactiveGradient || currentTheme.cardBg || 'rgba(30, 30, 50, 0.4)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: `
      ${darkHourlyColoredShadow},
      inset 2px 2px 5px rgba(255, 255, 255, 0.1),
      inset -2px -2px 5px rgba(100, 181, 246, 0.15),
      inset 4px 4px 8px rgba(255, 255, 255, 0.08),
      inset -4px -4px 8px rgba(100, 181, 246, 0.1)
    `,
    borderRadius: '1.5rem',
    minHeight: 0,
    minWidth: 0,
    border: `1px solid ${currentTheme.border || 'rgba(255, 255, 255, 0.15)'}`,
    color: '#FFFFFF',
  };
  
  const hourlyInactiveStyle = isDarkMode ? darkHourlyInactiveStyle : lightHourlyInactiveStyle;

  const otherSectionStyle = {
    marginLeft: 'clamp(9.5px, 2.85vw, 14.25px)', // Giảm 5% (x 0.95)
    marginRight: 'clamp(9.5px, 2.85vw, 14.25px)', // Giảm 5% (x 0.95)
    transform: 'scale(1.05)', // Tăng 5% kích thước
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-3" style={otherSectionStyle}>
        <h3 className="font-bold" style={{ color: primaryText, fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
          Hôm nay
        </h3>
        {!isPreview && (
          <button 
            className="font-medium transition-all active:scale-95 hover:opacity-80" 
            style={{ color: secondaryText, fontSize: 'clamp(0.8rem, 2.5vw, 0.875rem)' }}
            onClick={() => setPage && setPage(1)}
          >
            7 ngày tới →
          </button>
        )}
      </div>
      
      <div className="relative" style={{ margin: `0 0`, overflow: 'visible', overflowX: 'visible', overflowY: 'visible', transform: 'scale(1.05)' }}>
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to right, #1a1a2e, transparent)'
              : 'linear-gradient(to right, #E3F2FD, transparent)',
            left: '0px',
            width: 'clamp(3rem, 8vw, 4rem)',
          }}
        />
        
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to left, #1a1a2e, transparent)'
              : 'linear-gradient(to left, #E3F2FD, transparent)',
            right: '0px',
            width: 'clamp(3rem, 8vw, 4rem)',
          }}
        />
        
        <div 
          data-hourly-scroll
          className="flex overflow-x-auto scrollbar-hide" 
          style={{ 
            gap: 'clamp(0.5rem, 2vw, 0.75rem)',
            paddingTop: 'clamp(6px, 1.5vh, 8px)', 
            paddingBottom: 'clamp(6px, 1.5vh, 8px)', 
            paddingLeft: 'clamp(15px, 3vw, 20px)', 
            paddingRight: 'clamp(15px, 3vw, 20px)',
            overflowY: 'visible',
            scrollPaddingLeft: 'clamp(15px, 3vw, 20px)',
            scrollPaddingRight: 'clamp(15px, 3vw, 20px)',
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch',
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
        >
          {hourlyForecast.map((d, i) => (
            <HourlyCard
              key={i}
              time={d.time}
              temp={d.temp}
              icon={d.icon}
              isActive={i === selectedHour}
              isPreview={isPreview}
              onClick={() => handleHourClick(i)}
              convertTemp={convertTemp}
              activeStyle={hourlyActiveStyle}
              inactiveStyle={hourlyInactiveStyle}
              timeDate={d.timeDate || null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
