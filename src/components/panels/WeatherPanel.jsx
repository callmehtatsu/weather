import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { MetricsCard } from '../weather';
import WeatherHeader from '../weather/WeatherHeader';
import WeatherHero from '../weather/WeatherHero';
import WeatherHourly from '../weather/WeatherHourly';
import WeatherFooter from '../weather/WeatherFooter';
import { METRICS_COLORED_SHADOW } from '../../constants/styles';


export default function WeatherPanel({
  currentWeather,
  location,
  currentLocation = null,
  hourlyForecast = [],
  dailyForecast = [],
  convertTemp = (t) => t,
  motionEnabled = true,
  currentTheme = {},
  primaryText = '#000',
  secondaryText = '#666',
  onOpenDrawer = () => {},
  setPage,
  openDetail,
  openSettings,
  isMenuOpen,
  setIsMenuOpen,
  isPreview = false,
  lastUpdated = null,
  getTimeAgo = null,
}) {
  if (!currentWeather || !location) {
    return null;
  }

  const newAccentColor = '#64B5F6';
  
  const otherSectionStyle = {
    marginLeft: '15px',
    marginRight: '15px',
  };
  
  const metricsCardStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      ${METRICS_COLORED_SHADOW},
      inset 3px 3px 6px rgba(255, 255, 255, 0.5),
      inset -3px -3px 6px rgba(30, 144, 255, 0.2),
      inset 5px 5px 10px rgba(255, 255, 255, 0.3),
      inset -5px -5px 10px rgba(30, 144, 255, 0.15)
    `,
    borderRadius: '2rem',
    border: 'none',
  };

  return (
    <section
      className="flex flex-col relative scrollbar-hide"
      style={{
        background: 'transparent',
        fontFamily: 'Open Sans, sans-serif',
        paddingTop: '100px',
        paddingBottom: '40px',
        overflowX: 'hidden',
        marginLeft: '-20px',
        marginRight: '-20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '100%',
      }}
    >
      {isPreview && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (setPage) {
              if (import.meta.env.DEV) {
                console.log('Quay lại MapPanel');
              }
              setPage(2);
            }
          }}
          className="absolute left-6 transition-all active:scale-95 hover:opacity-80"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.5rem',
            margin: 0,
            outline: 'none',
            boxShadow: 'none',
            pointerEvents: 'auto',
            zIndex: 100,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '2rem',
            marginTop: '1px',
          }}
          aria-label="Quay lại"
        >
          <ChevronLeft size={30} color="#1565c0" />
        </button>
      )}

      <WeatherHeader
        location={location}
        primaryText={primaryText}
        secondaryText={secondaryText}
        setPage={setPage}
        openDetail={openDetail}
        openSettings={openSettings}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentTheme={currentTheme}
        isPreview={isPreview}
        lastUpdated={lastUpdated}
        getTimeAgo={getTimeAgo}
      />
      
      <div>
        <WeatherHero
          temp={currentWeather.temp}
          condition={currentWeather.condition}
          weatherCode={currentWeather.weatherCode}
          convertTemp={convertTemp}
          motionEnabled={motionEnabled}
        />

        <div style={otherSectionStyle} className="mb-2">
          <MetricsCard
            rainChance={currentWeather.rainChance}
            humidity={currentWeather.humidity}
            windSpeed={currentWeather.windSpeed}
            accentColor={currentTheme.accent || newAccentColor}
            primaryText={primaryText}
            secondaryText={secondaryText}
            style={metricsCardStyle}
          />
        </div>

        <WeatherHourly
          hourlyForecast={hourlyForecast}
          convertTemp={convertTemp}
          setPage={setPage}
          isPreview={isPreview}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />

        <WeatherFooter
          location={location}
          detailedAddress={currentLocation?.detailedAddress || location}
          temp={currentWeather.temp}
          weatherCode={currentWeather.weatherCode}
          convertTemp={convertTemp}
          setPage={setPage}
          isPreview={isPreview}
        />
      </div>
    </section>
  );
}
