import React from 'react';


export default function SettingsThemeSection({
  themeMode,
  setThemeMode,
  isDark,
  setIsDark,
  primaryText,
}) {
  const newBlueGradient = 'linear-gradient(180deg, #A1C4FD 0%, #3A8DFF 100%)';
  const newBlueShadow = `
    0px 12px 30px rgba(58, 141, 255, 0.4),
    0px 4px 12px rgba(58, 141, 255, 0.25)
  `;

  return (
    <div>
      <h3 
        className="text-sm font-bold mb-3 uppercase tracking-wide" 
        style={{ 
          color: '#1565c0',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '1px'
        }}
      >
        Giao diện
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => {
            setThemeMode('manual');
            setIsDark(false);
          }} 
          className={`py-4 text-sm rounded-xl transition-all active:scale-95 ${
            themeMode === 'manual' && !isDark ? 'font-bold' : 'font-medium'
          }`}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            background: themeMode === 'manual' && !isDark ? newBlueGradient : 'rgba(255, 255, 255, 0.5)',
            color: themeMode === 'manual' && !isDark ? '#fff' : primaryText,
            backdropFilter: 'blur(10px)',
            border: themeMode === 'manual' && !isDark ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: themeMode === 'manual' && !isDark
              ? newBlueShadow
              : '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          ☀️ Sáng
        </button>
        <button 
          onClick={() => {
            setThemeMode('manual');
            setIsDark(true);
          }} 
          className={`py-4 text-sm rounded-xl transition-all active:scale-95 ${
            themeMode === 'manual' && isDark ? 'font-bold' : 'font-medium'
          }`}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            background: themeMode === 'manual' && isDark ? newBlueGradient : 'rgba(255, 255, 255, 0.5)',
            color: themeMode === 'manual' && isDark ? '#fff' : primaryText,
            backdropFilter: 'blur(10px)',
            border: themeMode === 'manual' && isDark ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: themeMode === 'manual' && isDark
              ? newBlueShadow
              : '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          🌙 Tối
        </button>
      </div>
    </div>
  );
}
