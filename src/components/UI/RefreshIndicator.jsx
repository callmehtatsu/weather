export default function RefreshIndicator({ isRefreshing, lastUpdated, getTimeAgo }) {
  if (!isRefreshing && !lastUpdated) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,
        background: 'transparent'
      }}
    >
      {isRefreshing && (
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #1565c0, #42a5f5)',
            animation: 'shimmer 1.5s infinite',
            boxShadow: '0 2px 4px rgba(21, 101, 192, 0.3)'
          }}
        />
      )}
      
      {lastUpdated && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '16px',
            fontSize: '11px',
            color: '#666',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '4px 8px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}
        >
          Cập nhật: {getTimeAgo(lastUpdated)}
        </div>
      )}
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
