import React from 'react';
import { Home, Calendar, Map, Settings, X } from 'lucide-react';


export default function MenuDrawer({
  isOpen,
  setIsOpen,
  setPage,
  openDetail,
  openSettings,
  primaryText = '#1565c0',
  currentTheme = {}
}) {
  const menuItems = [
    { 
      icon: Home, 
      label: 'Trang chủ', 
      action: () => { 
        if (setPage) setPage(0); 
        setIsOpen(false); 
      } 
    },
    { 
      icon: Calendar, 
      label: 'Dự báo 7 ngày', 
      action: () => { 
        if (setPage) setPage(1); 
        setIsOpen(false); 
      } 
    },
    { 
      icon: Map, 
      label: 'Bản đồ thời tiết', 
      action: () => { 
        if (setPage) setPage(2); 
        setIsOpen(false); 
      } 
    },
    { 
      icon: Settings, 
      label: 'Cài đặt', 
      action: () => { 
        if (openSettings) openSettings(); 
        setIsOpen(false); 
      } 
    },
  ];

  return (
    <>
      <div
        className={`absolute inset-0 backdrop-blur-md transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(58, 141, 255, 0.15)',
        }}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={`absolute inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} 
        style={{ 
          background: currentTheme.cardBgStrong || currentTheme.cardBg || 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: `1px solid ${currentTheme.borderDark || currentTheme.border || 'rgba(255, 255, 255, 0.3)'}`,
          boxShadow: (() => {
            const isDarkMode = currentTheme.cardBg && currentTheme.cardBg.includes('rgba(30, 30, 50');
            const accentColor = isDarkMode 
              ? 'rgba(100, 181, 246, 0.15)' 
              : (currentTheme.accent || 'rgba(58, 141, 255, 0.15)');
            return `
              -5px 0 20px ${accentColor},
              -2px 0 10px ${accentColor.replace('0.15', '0.1')}
            `;
          })(),
        }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: currentTheme.accent || 'rgba(58, 141, 255, 0.15)' }}>
          <h2 
            className="text-2xl font-bold" 
            style={{ 
              color: primaryText,
              fontFamily: 'Open Sans, sans-serif'
            }}
          >
            Menu
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full transition-all active:scale-95"
            style={{
              background: currentTheme.cardBgLight || 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${currentTheme.borderDark || currentTheme.border || 'rgba(255, 255, 255, 0.3)'}`,
              boxShadow: `0px 4px 12px ${currentTheme.accent || 'rgba(58, 141, 255, 0.2)'}`,
            }}
            aria-label="Đóng menu"
          >
            <X size={22} color={primaryText} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-full pb-24 scrollbar-hide">
          <div className="p-6">
            <div className="space-y-2">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (item.action) item.action();
                  }}
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all active:scale-98"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    background: currentTheme.cardBgLight || 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${currentTheme.borderDark || currentTheme.border || 'rgba(255, 255, 255, 0.3)'}`,
                    color: primaryText,
                    textAlign: 'left',
                    fontWeight: 600,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: 100,
                  }}
                >
                  <item.icon size={20} color={primaryText} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
