import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://weather-backend-vo7o.onrender.com/api';

const isMobile = typeof window !== 'undefined' && 
  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isCapacitor = typeof window !== 'undefined' && window.Capacitor !== undefined;

const DEFAULT_TIMEOUT = (isMobile || isCapacitor) ? 45000 : 30000;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    if ((error.code === 'ECONNABORTED' || 
         error.message?.includes('timeout') ||
         error.code === 'ERR_NETWORK') && 
        !originalRequest._retry && 
        (originalRequest._retryCount || 0) < 2) {
      
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      const delay = Math.pow(2, originalRequest._retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      originalRequest.timeout = 60000;
      return api(originalRequest);
    }
    
    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }
    
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const weatherAPI = {
  getCurrentWeather: async (city = null, lat = null, lon = null) => {
    const params = {};
    if (city) params.city = city;
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    return api.get('/weather/current', { params });
  },

  getForecast: async (city = null, lat = null, lon = null, days = 7) => {
    const params = { days };
    if (city) params.city = city;
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    return api.get('/weather/forecast', { params });
  },

  getHourlyForecast: async (city = null, lat = null, lon = null, hours = 24) => {
    const params = { hours };
    if (city) params.city = city;
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    return api.get('/weather/hourly', { params });
  }
};

export const mapAPI = {
  searchLocation: async (query) => {
    return api.get('/map/search', { params: { q: query } });
  },

  reverseGeocode: async (lat, lon) => {
    return api.get('/map/reverse', { params: { lat, lon } });
  },

  getTemperatureGrid: async (params, signal) => {
    return api.get('/map/temperature-grid', { 
      params,
      timeout: 60000,
      signal: signal
    });
  }
};

export default api;
