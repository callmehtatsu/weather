import React from 'react';


export default function SettingsTempUnitSection({
  tempUnit,
  setTempUnit,
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
        Đơn vị nhiệt độ
      </h3>
      <div className="flex gap-3">
        <button 
          onClick={() => setTempUnit('C')} 
          className={`flex-1 py-3 rounded-xl transition-all active:scale-95 ${
            tempUnit === 'C' ? 'font-bold' : 'font-medium'
          }`}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            background: tempUnit === 'C' ? newBlueGradient : 'rgba(255, 255, 255, 0.5)',
            color: tempUnit === 'C' ? '#fff' : primaryText,
            backdropFilter: 'blur(10px)',
            border: tempUnit === 'C' ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: tempUnit === 'C'
              ? newBlueShadow
              : '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          °C
        </button>
        <button 
          onClick={() => setTempUnit('F')} 
          className={`flex-1 py-3 rounded-xl transition-all active:scale-95 ${
            tempUnit === 'F' ? 'font-bold' : 'font-medium'
          }`}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            background: tempUnit === 'F' ? newBlueGradient : 'rgba(255, 255, 255, 0.5)',
            color: tempUnit === 'F' ? '#fff' : primaryText,
            backdropFilter: 'blur(10px)',
            border: tempUnit === 'F' ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: tempUnit === 'F'
              ? newBlueShadow
              : '0px 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          °F
        </button>
      </div>
    </div>
  );
}
