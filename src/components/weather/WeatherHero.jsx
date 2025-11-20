import React from 'react';
import IconWeather from '../UI/IconWeather';
import { WeatherDescription } from './index';


export default function WeatherHero({
  temp,
  condition,
  weatherCode,
  convertTemp,
  motionEnabled,
}) {
  const meshGradient = `
    radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.85) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.75) 0%, transparent 70%),
    linear-gradient(180deg, rgba(135, 206, 235, 0.88) 0%, rgba(30, 144, 255, 0.9) 100%)
  `;
  
  const heroColoredShadow = `
    0px 25px 70px rgba(25, 118, 210, 0.45),
    0px 10px 30px rgba(25, 118, 210, 0.35),
    0px 0px 100px rgba(25, 118, 210, 0.3),
    0px 5px 15px rgba(25, 118, 210, 0.25)
  `;

  const heroCardStyle = {
    background: meshGradient,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      ${heroColoredShadow},
      inset 3px 3px 8px rgba(255, 255, 255, 0.4),
      inset -3px -3px 8px rgba(30, 144, 255, 0.3),
      inset 6px 6px 12px rgba(255, 255, 255, 0.2),
      inset -6px -6px 12px rgba(30, 144, 255, 0.25)
    `,
    borderRadius: '2rem',
    marginLeft: '50px',
    marginRight: '50px',
    aspectRatio: '630 / 514',
    position: 'relative',
    paddingTop: '0px',
    paddingLeft: '2.5rem',
    border: 'none',
  };

  return (
    <div style={heroCardStyle} className="mt-4 mb-3">
      <div className="flex-shrink-0 relative flex items-center justify-center" style={{ width: '100%' }}>
        <div
          className="font-extrabold tracking-tighter leading-none absolute"
          style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(6rem, 13vw, 11rem)',
            color: '#2A6CD9',
            opacity: 0.8,
            filter: 'blur(10px)',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {convertTemp(temp)}°
        </div>

        <div
          className="font-extrabold tracking-tighter leading-none relative"
          style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(6rem, 13vw, 11rem)',
            color: '#FFFFFF',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            filter: 'drop-shadow(0px 6px 12px rgba(72, 87, 217, 0.5))',
          }}
        >
          {convertTemp(temp)}°
        </div>
      </div>
      
      <div
        className="absolute text-left"
        style={{
          bottom: '40px',
          left: '159px',
          opacity: 0.6,
        }}
      >
        <div className="text-2xl text-white/95 leading-7">
          <WeatherDescription 
            condition={condition}
            shouldBreakLine={true}
          />
        </div>
      </div>

      <div
        className="absolute"
        style={{
          bottom: '-35px',
          left: '-44px',
        }}
      >
        <IconWeather
          code={weatherCode || 0}
          size={200}
          motionEnabled={motionEnabled}
        />
      </div>
    </div>
  );
}
