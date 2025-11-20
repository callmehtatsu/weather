import React from 'react';
import IconWeather from '../UI/IconWeather';


export default function WeatherFooter({
  location,
  detailedAddress,
  temp,
  weatherCode,
  convertTemp,
  setPage,
  isPreview = false,
}) {
  const footerMeshGradient = `
    radial-gradient(circle at 20% 50%, rgba(30, 144, 255, 0.88) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(135, 206, 235, 0.85) 0%, transparent 50%),
    linear-gradient(90deg, rgba(30, 144, 255, 0.88) 0%, rgba(70, 130, 180, 0.82) 50%, rgba(135, 206, 235, 0.88) 100%)
  `;

  const coloredShadow = `
    0px 20px 60px rgba(25, 118, 210, 0.4),
    0px 8px 25px rgba(25, 118, 210, 0.3),
    0px 0px 80px rgba(25, 118, 210, 0.25)
  `;

  const otherSectionStyle = {
    marginLeft: '15px',
    marginRight: '15px',
  };

  return (
    <>
      <div style={otherSectionStyle} className="mb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: '#1565c0' }}>
            Thành phố khác
          </h3>
          {!isPreview && (
            <button
              className="text-2xl font-bold transition-all active:scale-95"
              style={{ color: '#1565c0' }}
              aria-label="Add city"
              onClick={() => setPage && setPage(2)}
            >
              +
            </button>
          )}
        </div>
      </div>

      <div style={otherSectionStyle} className="mb-0">
        <div
          className="p-6"
          style={{
            background: footerMeshGradient,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `
              ${coloredShadow},
              inset 3px 3px 8px rgba(255, 255, 255, 0.4),
              inset -3px -3px 8px rgba(30, 144, 255, 0.3),
              inset 6px 6px 12px rgba(255, 255, 255, 0.2),
              inset -6px -6px 12px rgba(30, 144, 255, 0.25)
            `,
            borderRadius: '2rem',
            border: 'none',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IconWeather 
                code={weatherCode || 1} 
                size={48}
                motionEnabled={false}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  {location}
                </span>
                {detailedAddress && detailedAddress !== location && (
                  <span className="text-sm text-white/80 mt-1">
                    {detailedAddress}
                  </span>
                )}
              </div>
            </div>
            <div className="text-3xl font-black text-white">
              {convertTemp(temp)}°
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
