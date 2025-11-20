import React from 'react';
import { ChevronLeft } from 'lucide-react';
import KebabMenu from '../KebabMenu';


export default function MapHeader({
  setPage,
  openDetail,
  openSettings,
  isMenuOpen,
  setIsMenuOpen,
  currentTheme,
  primaryText,
}) {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full flex flex-col items-center justify-center"
        style={{
          fontFamily: 'Open Sans, sans-serif',
          background: 'transparent',
          paddingTop: '2rem',
          paddingBottom: '1rem',
          zIndex: 40,
        }}
      >
        <KebabMenu
          setPage={setPage}
          openDetail={openDetail}
          openSettings={openSettings}
          currentTheme={currentTheme}
          primaryText={primaryText}
          size={24}
          color="#1565c0"
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          minimal={true}
        />
      </div>

      <div 
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center"
        style={{ 
          paddingTop: '2rem',
          paddingBottom: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={() => setPage && setPage(0)}
          className="absolute left-6 transition-all active:scale-95 hover:opacity-80"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            outline: 'none',
            boxShadow: 'none',
            pointerEvents: 'auto',
            zIndex: 50,
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
        
        <h2 
          className="text-2xl font-bold tracking-tight text-center"
          style={{ color: '#1565c0' }}
        >
          Bản đồ
        </h2>
      </div>
    </>
  );
}
