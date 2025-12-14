import React from 'react';
import { translateWeatherDesc } from '../../utils/weather';
import { WEATHER_DESC_MAP } from '../../constants/weather';

export default function WeatherDescription({ 
  condition, 
  shouldBreakLine = false,
  style = {}
}) {
  const translatedDesc = translateWeatherDesc(condition, WEATHER_DESC_MAP);
  
  if (!translatedDesc) return null;
  
  if (shouldBreakLine) {
    const words = translatedDesc.split(' ');
    const hasShortWord = words.some(word => word.length < 4);
    const shouldBreak = words.length > 1 && words.length >= 4 && !hasShortWord;
    
    if (shouldBreak) {
      return (
        <div style={style}>
          {words[0]}
          <br />
          {words.slice(1).join(' ')}
        </div>
      );
    }
  }
  
  return (
    <div style={style}>
      {translatedDesc}
    </div>
  );
}
