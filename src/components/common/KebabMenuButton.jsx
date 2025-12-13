import React, { useRef } from 'react';
import { MoreVertical } from 'lucide-react';


export default function KebabMenuButton({
  onClick,
  position = 'top-right',
  className = '',
  size = 28,
  color = '#1565c0',
  ariaLabel = 'Open menu',
  minimal = false,
}) {
  const menuRef = useRef(null);
  
  const positionClasses = {
    'top-right': 'top-8 right-5',
    'top-left': 'top-8 left-5',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div 
      ref={menuRef}
      className={`absolute z-30 ${positionClasses[position] || positionClasses['top-right']} ${className}`}
    >
      <button
        onClick={onClick}
        className={minimal ? "transition-all active:scale-95 hover:opacity-80" : "rounded-full p-2 transition-all hover:bg-white/10 active:scale-95"}
        style={{ 
          color: color,
          ...(minimal ? {
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            outline: 'none',
            boxShadow: 'none',
          } : {})
        }}
        aria-label={ariaLabel}
      >
        <MoreVertical size={size} strokeWidth={2} />
      </button>
    </div>
  );
}
