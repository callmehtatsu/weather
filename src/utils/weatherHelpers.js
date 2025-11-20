import { mapWeatherCodeToIcon } from './weather';
import { DAY_NAMES } from '../constants/weather';

export const extractCityName = (locationString) => {
  if (!locationString) return '';
  if (locationString.includes(',')) {
    const parts = locationString.split(',').map(s => s.trim());
    return parts[parts.length - 1] || locationString;
  }
  return locationString;
};

export const transformDailyForecast = (forecastData) => {
  if (!forecastData || !Array.isArray(forecastData)) return [];
  
  return forecastData.map((day, index) => {
    const date = new Date(day.date);
    const dayName = index === 0 ? 'Hôm nay' : DAY_NAMES[date.getDay()];
    
    return {
      day: dayName,
      temp: day.tempMax,
      tempMin: day.tempMin,
      icon: mapWeatherCodeToIcon(day.weatherCode),
      desc: day.condition,
      weatherCode: day.weatherCode,
      windSpeed: day.windSpeed,
      precipitationProbability: day.precipitationProbability,
      humidity: day.humidity || 65,
      pressure: day.pressure || 1013,
      tempMax: day.tempMax,
      rainChance: day.precipitationProbability
    };
  });
};

export const transformHourlyForecast = (hourlyData, limit = 8) => {
  if (!hourlyData || !Array.isArray(hourlyData)) return [];
  
  return hourlyData.slice(0, limit).map((hour, index) => {
    const hourDate = new Date(hour.time);
    const timeStr = index === 0 
      ? 'Now' 
      : hourDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    return {
      time: timeStr,
      temp: hour.temperature,
      icon: mapWeatherCodeToIcon(hour.weatherCode),
      weatherCode: hour.weatherCode
    };
  });
};
