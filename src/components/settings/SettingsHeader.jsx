import React from 'react';
import { X } from 'lucide-react';


export default function SettingsHeader({
  setIsDrawerOpen,
}) {
  return (
    <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(58, 141, 255, 0.15)' }}>
      <h2 
        className="text-2xl font-bold" 
        style={{ 
          color: '#1565c0',
          fontFamily: 'Open Sans, sans-serif'
        }}
      >
        Cài đặt
      </h2>
      <button 
        onClick={() => setIsDrawerOpen(false)}
        className="p-2 rounded-full transition-all active:scale-95"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0px 4px 12px rgba(58, 141, 255, 0.2)',
        }}
        aria-label="Đóng cài đặt"
      >
        <X size={22} color="#1565c0" />
      </button>
    </div>
  );
}
