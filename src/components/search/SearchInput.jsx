import React from 'react';
import { Search } from 'lucide-react';
import { METRICS_COLORED_SHADOW } from '../../constants/styles';


export default function SearchInput({
  query,
  handleInputChange,
  handleSearch,
  setShowSuggestions,
  primaryText,
}) {
  const inputStyle = {
    width: '100%',
    height: '48px',
    lineHeight: '24px',
    padding: '0 1rem',
    paddingLeft: '2.75rem',
    border: 'none',
    borderRadius: '1.5rem',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: primaryText || '#0d0c22',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    boxShadow: `
      ${METRICS_COLORED_SHADOW},
      inset 3px 3px 6px rgba(255, 255, 255, 0.5),
      inset -3px -3px 6px rgba(30, 144, 255, 0.2)
    `,
  };

  return (
    <>
      <div className="group" style={{ 
        display: 'flex',
        lineHeight: '28px',
        alignItems: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%'
      }}>
        <Search 
          className="icon" 
          style={{
            position: 'absolute',
            left: '1rem',
            fill: '#1565c0',
            width: '1rem',
            height: '1rem',
            color: '#1565c0',
            zIndex: 1,
            opacity: 0.7
          }}
        />
        <input
          className="input"
          type="text"
          placeholder="Tìm kiếm thành phố..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              handleSearch(query);
            }
          }}
          style={inputStyle}
        />
      </div>
      <style>{`
        .input::placeholder {
          color: #9e9ea7;
          opacity: 0.7;
        }
        .input:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 
            0px 8px 20px rgba(25, 118, 210, 0.35),
            0px 3px 10px rgba(25, 118, 210, 0.3),
            inset 3px 3px 6px rgba(255, 255, 255, 0.6),
            inset -3px -3px 6px rgba(30, 144, 255, 0.25),
            0 0 0 3px rgba(21, 101, 192, 0.1);
        }
        .input:hover {
          outline: none;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0px 8px 20px rgba(25, 118, 210, 0.3),
            0px 3px 10px rgba(25, 118, 210, 0.25),
            inset 3px 3px 6px rgba(255, 255, 255, 0.55),
            inset -3px -3px 6px rgba(30, 144, 255, 0.22);
        }
      `}</style>
    </>
  );
}
