import React from 'react';
import IconWeather from '../UI/IconWeather';

export default function HourlyIcon({ code, color = '#FFFFFF' }) {
  return (
    <div style={{ color: color }}>
      <IconWeather 
        code={code} 
        size={32}
        motionEnabled={false}
      />
    </div>
  );
}
