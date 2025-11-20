import React from 'react';
import IconWeather from '../UI/IconWeather';
import { MetricsCard, WeatherDescription } from '../weather';
import { METRICS_COLORED_SHADOW } from '../../constants/styles';


export default function ForecastDetailCard({
  selectedDay,
  convertTemp,
  primaryText,
  secondaryText,
}) {
  const blueCardMeshGradient = `
    radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.85) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.75) 0%, transparent 70%),
    linear-gradient(180deg, rgba(135, 206, 235, 0.88) 0%, rgba(30, 144, 255, 0.9) 100%)
  `;
  
  const blueCardColoredShadow = `
    0px 25px 70px rgba(25, 118, 210, 0.45),
    0px 10px 30px rgba(25, 118, 210, 0.35),
    0px 0px 100px rgba(25, 118, 210, 0.3),
    0px 5px 15px rgba(25, 118, 210, 0.25)
  `;

  const blueCardStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    background: blueCardMeshGradient,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      ${blueCardColoredShadow},
      inset 3px 3px 8px rgba(255, 255, 255, 0.4),
      inset -3px -3px 8px rgba(30, 144, 255, 0.3),
      inset 6px 6px 12px rgba(255, 255, 255, 0.2),
      inset -6px -6px 12px rgba(30, 144, 255, 0.25)
    `,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '2rem',
    border: 'none',
    zIndex: 1,
  };

  const whiteCardStyle = {
    position: 'absolute',
    top: '10.5%',
    left: '24px',
    right: '24px',
    bottom: '55%',
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
    zIndex: 2,
    overflowY: 'auto',
    padding: '1.5rem',
  };

  if (!selectedDay) return null;

  return (
    <>
      <div style={blueCardStyle} />
      <div style={whiteCardStyle} className="scrollbar-hide">
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(calc(-50% - 60px), calc(-50% + 5px))',
            width: '50%',
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconWeather
            code={selectedDay.icon}
            motionEnabled={false}
            size={200}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(calc(-50% - 60px + 200px + 1rem - 60px - 10px), calc(-50% + 20px))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              color: '#000',
              opacity: 0.6,
              marginBottom: '30px',
              marginTop: '-5px',
              lineHeight: '1',
              transform: 'translateY(25px)',
              fontFamily: 'Open Sans, sans-serif',
              alignSelf: 'flex-start',
            }}
          >
            {selectedDay.day || 'Ngày mai'}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              marginTop: '0px',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#1565c0',
                lineHeight: '1',
              }}
            >
              {convertTemp(selectedDay.temp)}°
            </span>
            <span
              style={{
                fontSize: '38px',
                fontWeight: 'bold',
                color: '#1565c0',
                lineHeight: '1',
                marginLeft: '-29px',
                marginTop: '40px',
              }}
            >
              /{convertTemp(selectedDay.tempMin)}°
            </span>
          </div>
          <WeatherDescription
            condition={selectedDay.desc}
            showPressure={true}
            pressure={selectedDay.pressure}
            style={{
              fontSize: '16px',
              color: '#64B5F6',
              marginTop: '10px',
              lineHeight: '1.4',
              fontFamily: 'Open Sans, sans-serif',
              alignSelf: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          />
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          }}
        >
          <MetricsCard
            rainChance={selectedDay.precipitationProbability}
            humidity={selectedDay.humidity}
            windSpeed={selectedDay.windSpeed}
            accentColor="#1565c0"
            primaryText={primaryText}
            secondaryText={secondaryText}
            style={{ 
              padding: 0, 
              background: 'transparent',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </>
  );
}
