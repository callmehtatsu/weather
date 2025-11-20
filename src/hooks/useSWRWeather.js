import { useState, useRef, useEffect } from 'react';
import { weatherAPI } from '../utils/api';
import { mapWeatherCodeToIcon } from '../utils/weather';
import { extractCityName, transformDailyForecast, transformHourlyForecast } from '../utils/weatherHelpers';


const STALE_TIME = 15 * 60 * 1000; 
const CACHE_TIMEOUT = 2 * 60 * 60 * 1000; 
const POLLING_INTERVAL = 30 * 60 * 1000; 
const MIN_FOCUS_REFRESH_INTERVAL = 60 * 1000; 

export function useSWRWeather() {
  const [weather, setWeather] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const weatherCache = useRef(new Map());
  const currentLocationRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const lastFocusRefreshRef = useRef(0);
  const isMountedRef = useRef(true);


  const getCacheAge = (timestamp) => Date.now() - timestamp;


  const getTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} giây trước`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };


  const MAX_CACHE_ENTRIES = 10;
  const cleanupCache = () => {
    if (weatherCache.current.size > MAX_CACHE_ENTRIES) {
      
      const entries = Array.from(weatherCache.current.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toDelete = entries.slice(0, entries.length - MAX_CACHE_ENTRIES);
      toDelete.forEach(([key]) => weatherCache.current.delete(key));
    }
  };


  const fetchWeatherData = async (city = null, lat = null, lon = null, options = {}) => {
    const { 
      forceRefresh = false, 
      preserveCity = false,
      silent = false 
    } = options;

    const existingCity = preserveCity && currentLocationRef.current?.city 
      ? currentLocationRef.current.city 
      : city;
    const cacheKey = existingCity || `${lat},${lon}`;
    const cached = weatherCache.current.get(cacheKey);
    const cacheAge = cached ? getCacheAge(cached.timestamp) : Infinity;


    if (!forceRefresh && cached && cacheAge < STALE_TIME) {
      if (!silent) {
        setIsLoading(false);
      }
      
      const cachedWeather = { ...cached.data.weather };
      if (cachedWeather.location) {
        cachedWeather.location = extractCityName(cachedWeather.location);
      }
      const cachedLocation = { ...cached.data.currentLocation };
      if (cachedLocation.city) {
        cachedLocation.city = extractCityName(cachedLocation.city);
      }
      
      setWeather(cachedWeather);
      setDailyForecast(cached.data.dailyForecast);
      setHourlyForecast(cached.data.hourlyForecast);
      setCurrentLocation(cachedLocation);
      setLastUpdated(cached.timestamp);
      currentLocationRef.current = cachedLocation;
      return;
    }


    if (!forceRefresh && cached && cacheAge >= STALE_TIME && cacheAge < CACHE_TIMEOUT) {
      
      const cachedWeather = { ...cached.data.weather };
      if (cachedWeather.location) {
        cachedWeather.location = extractCityName(cachedWeather.location);
      }
      const cachedLocation = { ...cached.data.currentLocation };
      if (cachedLocation.city) {
        cachedLocation.city = extractCityName(cachedLocation.city);
      }


      setWeather(cachedWeather);
      setDailyForecast(cached.data.dailyForecast);
      setHourlyForecast(cached.data.hourlyForecast);
      setCurrentLocation(cachedLocation);
      setLastUpdated(cached.timestamp);
      currentLocationRef.current = cachedLocation;
      
      if (!silent) {
        setIsLoading(false);
        setIsRefreshing(true); 
      }


      try {
        await fetchWeatherData(existingCity, lat, lon, { forceRefresh: true, preserveCity, silent: true });
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('[SWR] Background refresh failed:', err);
        }
        
      } finally {
        if (!silent) {
          setIsRefreshing(false);
        }
      }
      return;
    }


    if (!silent) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      
      const [currentData, forecastData, hourlyData] = await Promise.all([
        weatherAPI.getCurrentWeather(existingCity, lat, lon),
        weatherAPI.getForecast(existingCity, lat, lon, 8),
        weatherAPI.getHourlyForecast(existingCity, lat, lon, 24)
      ]);

      const mainRawWeatherCode = currentData.weather.weatherCode;
      const mainMappedIconCode = mapWeatherCodeToIcon(mainRawWeatherCode);


      let cityName = preserveCity && currentLocationRef.current?.city 
        ? currentLocationRef.current.city 
        : currentData.location.city;


      cityName = extractCityName(cityName);

      const newWeather = {
        temperature: currentData.weather.temperature,
        condition: currentData.weather.condition,
        location: cityName,
        humidity: currentData.weather.humidity || 65,
        windSpeed: currentData.weather.windSpeed,
        weatherCode: mainMappedIconCode,
        updatedAt: currentData.timestamp,
        tempMax: forecastData.forecast[0]?.tempMax || 24,
        tempMin: forecastData.forecast[0]?.tempMin || 18,
        rainChance: currentData.weather.precipitation || 10,
        pressure: currentData.weather.pressure || 1012,
        visibility: 10
      };


      let locationCity = preserveCity && currentLocationRef.current?.city 
        ? currentLocationRef.current.city 
        : currentData.location.city;


      locationCity = extractCityName(locationCity);

      const newLocation = {
        lat: currentData.location.lat,
        lon: currentData.location.lon,
        city: locationCity,
        detailedAddress: currentData.location.detailedAddress || currentData.location.city
      };

      const updatedDailyForecast = transformDailyForecast(forecastData.forecast);
      const updatedHourlyForecast = transformHourlyForecast(hourlyData.hourly, 8);


      setWeather(newWeather);
      setCurrentLocation(newLocation);
      currentLocationRef.current = newLocation;
      setDailyForecast(updatedDailyForecast);
      setHourlyForecast(updatedHourlyForecast);
      setLastUpdated(Date.now());


      weatherCache.current.set(cacheKey, {
        data: {
          weather: newWeather,
          dailyForecast: updatedDailyForecast,
          hourlyForecast: updatedHourlyForecast,
          currentLocation: newLocation
        },
        timestamp: Date.now()
      });

      cleanupCache();

    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[SWR] Fetch error:', error);
      }
      
      if (cached && cacheAge < CACHE_TIMEOUT) {
        const cachedWeather = { ...cached.data.weather };
        if (cachedWeather.location) {
          cachedWeather.location = extractCityName(cachedWeather.location);
        }
        const cachedLocation = { ...cached.data.currentLocation };
        if (cachedLocation.city) {
          cachedLocation.city = extractCityName(cachedLocation.city);
        }
        
        setWeather(cachedWeather);
        setDailyForecast(cached.data.dailyForecast);
        setHourlyForecast(cached.data.hourlyForecast);
        setCurrentLocation(cachedLocation);
        setLastUpdated(cached.timestamp);
      }
      throw error;
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };


  useEffect(() => {
    if (!currentLocation || !isMountedRef.current) return;

    const startPolling = () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }

      pollingIntervalRef.current = setInterval(() => {
        
        if (!document.hidden && currentLocation) {
          fetchWeatherData(
            currentLocation.city, 
            currentLocation.lat, 
            currentLocation.lon, 
            { preserveCity: true, silent: true }
          ).catch(err => {
            if (import.meta.env.DEV) {
              console.error('[SWR] Polling error:', err);
            }
          });
        }
      }, POLLING_INTERVAL);
    };

    startPolling();

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [currentLocation]);


  useEffect(() => {
    if (!currentLocation) return;

    const handleFocus = () => {
      if (!document.hidden && currentLocation) {
        const now = Date.now();
        const timeSinceLastFocusRefresh = now - lastFocusRefreshRef.current;


        if (timeSinceLastFocusRefresh < MIN_FOCUS_REFRESH_INTERVAL) {
          return;
        }

        const cached = weatherCache.current.get(currentLocation.city || `${currentLocation.lat},${currentLocation.lon}`);
        const cacheAge = cached ? getCacheAge(cached.timestamp) : Infinity;


        if (cacheAge >= STALE_TIME) {
          lastFocusRefreshRef.current = now;
          fetchWeatherData(
            currentLocation.city,
            currentLocation.lat,
            currentLocation.lon,
            { preserveCity: true, silent: true }
          ).catch(err => {
            if (import.meta.env.DEV) {
              console.error('[SWR] Focus refetch error:', err);
            }
          });
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [currentLocation]);


  useEffect(() => {
    const handleOnline = () => {
      if (currentLocation) {
        fetchWeatherData(
          currentLocation.city,
          currentLocation.lat,
          currentLocation.lon,
          { preserveCity: true, silent: true }
        ).catch(err => {
          if (import.meta.env.DEV) {
            console.error('[SWR] Network reconnect error:', err);
          }
        });
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [currentLocation]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    weather,
    currentLocation,
    currentLocationRef,
    hourlyForecast,
    dailyForecast,
    isLoading,
    isRefreshing,
    lastUpdated,
    getTimeAgo,
    fetchWeatherData
  };
}
