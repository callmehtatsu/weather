import React from 'react';
import HourlyIcon from '../icons/HourlyIcon';

export default function HourlyCard({ 
  time, 
  temp, 
  icon, 
  isActive, 
  isPreview, 
  onClick, 
  convertTemp,
  activeStyle,
  inactiveStyle,
  timeDate = null // Thêm timeDate để truyền vào HourlyIcon
}) {
  return (
    <button
      className="flex flex-col items-center flex-shrink-0 transition-all"
      style={{
        ...(isActive ? activeStyle : inactiveStyle),
        width: 'clamp(70px, 18vw, 80px)',
        paddingTop: 'clamp(0.5rem, 1.5vh, 0.75rem)',
        paddingBottom: 'clamp(0.5rem, 1.5vh, 0.75rem)',
        paddingLeft: 'clamp(0.375rem, 1.5vw, 0.5rem)',
        paddingRight: 'clamp(0.375rem, 1.5vw, 0.5rem)',
      }}
      onClick={isPreview ? undefined : onClick}
      disabled={isPreview}
    >
      <div
        className="font-medium mb-2"
        style={{ color: '#FFFFFF', fontSize: 'clamp(0.7rem, 2vw, 0.75rem)' }}
      >
        {time}
      </div>
      
      <HourlyIcon code={icon} timeDate={timeDate} color="#FFFFFF" />

      <div className="font-bold mt-2" style={{ color: '#FFFFFF', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
        {convertTemp(temp)}°
      </div>
    </button>
  );
}
