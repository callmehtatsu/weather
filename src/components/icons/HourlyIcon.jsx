import React from 'react';
import IconWeather from '../UI/IconWeather';

export default function HourlyIcon({ code, timeDate = null, color = '#FFFFFF' }) {
  // Xác định day/night dựa trên thời gian
  let isDay = null;
  
  if (timeDate) {
    const hour = timeDate.getHours();
    isDay = hour >= 6 && hour < 18;
  } else {
    // Fallback: dùng thời gian hiện tại
    const now = new Date();
    const hour = now.getHours();
    isDay = hour >= 6 && hour < 18;
  }
  
  return (
    <div style={{ color: color }}>
      <IconWeather 
        code={code} 
        size={32}
        motionEnabled={false}
        isDay={isDay}
      />
    </div>
  );
}
