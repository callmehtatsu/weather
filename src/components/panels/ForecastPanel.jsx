import React, { useState } from 'react';
import ForecastHeader from '../forecast/ForecastHeader';
import ForecastDetailCard from '../forecast/ForecastDetailCard';
import ForecastList from '../forecast/ForecastList';

export default function ForecastPanel({
  dailyForecast = [],
  convertTemp = (t) => t,
  motionEnabled = true,
  currentTheme = {},
  primaryText = '#000',
  secondaryText = '#666',
  setPage,
  openDetail,
  openSettings,
  isMenuOpen,
  setIsMenuOpen,
  onShowDetail,
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const filteredForecast = dailyForecast.filter(day => day.day !== 'Hôm nay').slice(0, 7);
  
  const selectedDay = filteredForecast.length > 0 && selectedDayIndex < filteredForecast.length 
    ? filteredForecast[selectedDayIndex] 
    : null;

  return (
    <section className="flex flex-col h-full relative overflow-hidden">
      <ForecastHeader
        setPage={setPage}
        openDetail={openDetail}
        openSettings={openSettings}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentTheme={currentTheme}
        primaryText={primaryText}
      />
      
      <ForecastList
        filteredForecast={filteredForecast}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
        onDayClick={onShowDetail}
        convertTemp={convertTemp}
        secondaryText={secondaryText}
      />
      
      {selectedDay && (
        <ForecastDetailCard
          selectedDay={selectedDay}
          convertTemp={convertTemp}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
      )}
    </section>
  );
}
