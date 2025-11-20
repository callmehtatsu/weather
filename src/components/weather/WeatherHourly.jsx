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
}) {
  const [selectedHour, setSelectedHour] = useState(0);

  const lightHourlyColoredShadow = '0px 6px 18px rgba(100, 181, 246, 0.25), 0px 2px 8px rgba(100, 181, 246, 0.2)';
  
  const hourlyActiveStyle = {
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
  
  const hourlyInactiveStyle = {
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

  const otherSectionStyle = {
    marginLeft: '15px',
    marginRight: '15px',
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-3" style={otherSectionStyle}>
        <h3 className="text-base font-bold" style={{ color: primaryText }}>
          Hôm nay
        </h3>
        {!isPreview && (
          <button 
            className="text-sm font-medium transition-all active:scale-95 hover:opacity-80" 
            style={{ color: secondaryText }}
            onClick={() => setPage && setPage(1)}
          >
            7 ngày tới →
          </button>
        )}
      </div>
      
      <div className="relative" style={{ margin: '0 -20px' }}>
        <div
          className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, #E3F2FD, transparent)',
            left: '20px',
          }}
        />
        
        <div
          className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to left, #E3F2FD, transparent)',
            right: '20px',
          }}
        />
        
        <div className="flex overflow-x-auto scrollbar-hide gap-3" style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '15px', paddingRight: '15px' }}>
          {hourlyForecast.map((d, i) => (
            <HourlyCard
              key={i}
              time={i === 0 ? 'Now' : d.time}
              temp={d.temp}
              icon={d.icon}
              isActive={i === selectedHour}
              isPreview={isPreview}
              onClick={() => setSelectedHour(i)}
              convertTemp={convertTemp}
              activeStyle={hourlyActiveStyle}
              inactiveStyle={hourlyInactiveStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
