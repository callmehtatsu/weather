import React from 'react';
import { DailyForecastItem } from '../weather';


export default function ForecastList({
  filteredForecast = [],
  selectedDayIndex = 0,
  setSelectedDayIndex,
  onDayClick,
  convertTemp,
  secondaryText,
}) {
  const bottomCardStyle = {
    position: 'absolute',
    top: '42%',
    left: 0,
    right: 0,
    bottom: '1rem',
    background: 'transparent',
    zIndex: 2,
    overflowY: 'auto',
    padding: '1rem 2rem',
  };

  return (
    <div style={bottomCardStyle} className="scrollbar-hide">
      {filteredForecast.length === 0 ? (
        <div className="text-center py-8">
          <p style={{ color: secondaryText }}>Đang tải dữ liệu dự báo...</p>
        </div>
      ) : (
        <div className="space-y-1" style={{ paddingTop: '2rem' }}>
          {filteredForecast.map((day, i) => (
            <DailyForecastItem
              key={i}
              day={day.day}
              icon={day.icon}
              desc={day.desc}
              temp={day.temp}
              tempMin={day.tempMin}
              isSelected={i === selectedDayIndex}
              onClick={() => {
                setSelectedDayIndex(i);
                if (onDayClick) {
                  onDayClick(filteredForecast[i]);
                }
              }}
              convertTemp={convertTemp}
            />
          ))}
        </div>
      )}
    </div>
  );
}
