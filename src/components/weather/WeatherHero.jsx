import React, { useState, useEffect, useRef } from 'react';
import IconWeather from '../UI/IconWeather';
import { WeatherDescription } from './index';

// Helper để tính responsive margins dựa trên aspect ratio - GIẢM 5% để thẻ to lên
function getResponsiveHeroMargins() {
  if (typeof window === 'undefined') return { left: 12, right: 12 };
  
  const aspectRatio = window.innerWidth / window.innerHeight;
  const isTallScreen = aspectRatio < 0.52; // 18.5:9, 19:9
  const isWideScreen = aspectRatio > 0.55; // 16:9
  
  if (isTallScreen) {
    // Màn hình dài: margins nhỏ hơn - GIẢM thêm 2% để rộng thêm sang 2 bên (từ 95% xuống 93%)
    return {
      left: Math.max(10, Math.min(38, window.innerWidth * 0.032 * 0.93)),
      right: Math.max(10, Math.min(38, window.innerWidth * 0.032 * 0.93)),
    };
  } else if (isWideScreen) {
    // Màn hình rộng: margins lớn hơn - GIẢM thêm 2% để rộng thêm sang 2 bên (từ 95% xuống 93%)
    return {
      left: Math.max(13, Math.min(48, window.innerWidth * 0.04 * 0.93)),
      right: Math.max(13, Math.min(48, window.innerWidth * 0.04 * 0.93)),
    };
  } else {
    // Cân bằng - GIẢM thêm 2% để rộng thêm sang 2 bên (từ 95% xuống 93%)
    const margin = window.innerWidth * 0.035 * 0.93;
    return {
      left: Math.max(10, Math.min(48, margin)),
      right: Math.max(10, Math.min(48, margin)),
    };
  }
}


export default function WeatherHero({
  temp,
  condition,
  weatherCode,
  convertTemp,
  motionEnabled,
  windSpeed = null, // Tốc độ gió (km/h) - để hiển thị windy icon
  aqi = null, // Chỉ số chất lượng không khí - để hiển thị haze icon
  previousCode = null, // WMO code trước đó - để hiển thị rainbow
  currentTheme = {},
  primaryText = '#FFFFFF',
  isDark = false, // Prop để xác định dark mode
  selectedTimeDate = null, // Thời gian của hourly forecast được chọn
}) {
  const [heroMargins, setHeroMargins] = useState(getResponsiveHeroMargins);
  const heroRef = useRef(null);
  
  // SỬA: Xác định day/night dựa trên selectedTimeDate nếu có, không thì dùng thời gian hiện tại
  let isDayTime;
  if (selectedTimeDate) {
    // Dùng thời gian của hourly forecast được chọn
    const selectedHour = new Date(selectedTimeDate).getHours();
    isDayTime = selectedHour >= 6 && selectedHour < 18;
  } else {
    // Fallback: dùng thời gian hiện tại
    const now = new Date();
    const currentHour = now.getHours();
    isDayTime = currentHour >= 6 && currentHour < 18;
  }
  
  // Determine if dark mode - chỉ dùng dark mode gradient khi isDark = true
  const isDarkMode = isDark && currentTheme.heroGradient && currentTheme.heroGradient.includes('#1a1a2e');
  
  // Light mode gradient - GIỮ NGUYÊN gradient cũ
  const lightMeshGradient = `
    radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.9) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.85) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(70, 130, 180, 0.75) 0%, transparent 70%),
    linear-gradient(180deg, rgba(135, 206, 235, 0.88) 0%, rgba(30, 144, 255, 0.9) 100%)
  `;
  
  // Dark mode gradient - chỉ dùng khi isDarkMode = true
  const darkMeshGradient = currentTheme.heroGradient || `
    linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
  `;
  
  // Light mode shadow - GIỮ NGUYÊN shadow cũ
  const lightHeroShadow = `
    0px 25px 70px rgba(25, 118, 210, 0.45),
    0px 10px 30px rgba(25, 118, 210, 0.35),
    0px 0px 100px rgba(25, 118, 210, 0.3),
    0px 5px 15px rgba(25, 118, 210, 0.25)
  `;
  
  // Dark mode shadow - chỉ dùng khi isDarkMode = true
  const darkHeroShadow = `
    0px 25px 70px rgba(100, 181, 246, 0.4),
    0px 10px 30px rgba(100, 181, 246, 0.3),
    0px 0px 100px rgba(100, 181, 246, 0.25),
    0px 5px 15px rgba(100, 181, 246, 0.2)
  `;
  
  // Chỉ dùng dark mode gradient và shadow khi isDarkMode = true, nếu không thì GIỮ NGUYÊN light mode
  const finalMeshGradient = isDarkMode ? darkMeshGradient : lightMeshGradient;
  const heroColoredShadow = isDarkMode ? darkHeroShadow : lightHeroShadow;
  
  const heroCardStyle = {
    background: finalMeshGradient,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: `
      ${heroColoredShadow},
      ${isDarkMode ? `
        inset 3px 3px 8px rgba(255, 255, 255, 0.15),
        inset -3px -3px 8px rgba(100, 181, 246, 0.2),
        inset 6px 6px 12px rgba(255, 255, 255, 0.1),
        inset -6px -6px 12px rgba(100, 181, 246, 0.15)
      ` : `
        inset 3px 3px 8px rgba(255, 255, 255, 0.4),
        inset -3px -3px 8px rgba(30, 144, 255, 0.3),
        inset 6px 6px 12px rgba(255, 255, 255, 0.2),
        inset -6px -6px 12px rgba(30, 144, 255, 0.25)
      `}
    `,
    borderRadius: '2rem',
    marginLeft: `${heroMargins.left}px`,
    marginRight: `${heroMargins.right}px`,
    aspectRatio: '630 / 514',
    position: 'relative',
    paddingTop: '0px',
    paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
    border: isDarkMode ? `1px solid ${currentTheme.border || 'rgba(255, 255, 255, 0.15)'}` : 'none',
  };

  // Tính toán size và position dựa trên thẻ hero - RESPONSIVE HOÀN TOÀN
  const [heroDimensions, setHeroDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setHeroDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    const updateMargins = () => setHeroMargins(getResponsiveHeroMargins());
    
    const handleResize = () => {
      updateDimensions();
      updateMargins();
    };

    // Cập nhật ngay và sau khi render
    updateDimensions();
    updateMargins();
    
    // Thêm delay để đảm bảo DOM đã render xong
    const timeout1 = setTimeout(updateDimensions, 50);
    const timeout2 = setTimeout(updateDimensions, 200);
    
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      updateMargins();
    });
    
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Tính toán responsive dựa trên dimensions thực tế của thẻ
  // Số nhiệt độ: chiếm 1/2 thẻ (từ trên xuống, từ trái sang phải), cách lề trên 10% height
  // Font size dựa trên chiều cao - GIẢM THÊM 10% (từ 81% xuống 73%)
  const tempFontSize = heroDimensions.height > 0 
    ? `${heroDimensions.height * 0.73}px` 
    : 'clamp(8rem, 73vh, 16rem)';
  // Cách lề trên: dịch lên trên thêm 10% so với chiều dài thẻ (từ 10% xuống 0% hoặc âm)
  const tempTop = heroDimensions.height > 0 
    ? `${heroDimensions.height * 0}px` 
    : '0%';
  // Text nhiệt độ dịch sang trái thêm 3% nữa (từ 5% xuống 2%)
  const tempLeft = heroDimensions.width > 0 
    ? `${heroDimensions.width * 0.02}px` 
    : '2%';
  // Width của text container - TĂNG LÊN để chứa được cả số justify và "°" với khoảng cách đủ
  // Tăng lên 95% để có đủ chỗ cho margin và khoảng cách
  const tempWidth = heroDimensions.width > 0 
    ? `${heroDimensions.width * 0.95}px` 
    : '95%';

  // Tách số và ký tự "°" riêng - Số justify, "°" ở ngoài cùng bên phải
  const tempNumber = convertTemp(temp).toString();
  const tempDigits = tempNumber.split(''); // Tách từng chữ số

  // Icon: giảm 10% size hiện tại (từ 75% xuống 67.5% width), dịch xuống 20% so với chiều cao thẻ
  const iconSize = heroDimensions.width > 0 
    ? Math.round(heroDimensions.width * 0.675) 
    : 540;
  const iconLeft = heroDimensions.width > 0 
    ? `${-heroDimensions.width * 0.15}px` 
    : '-15%';
  // Dịch xuống thêm 10% từ vị trí hiện tại (từ -15% xuống -25%)
  const iconBottom = heroDimensions.height > 0 
    ? `${-heroDimensions.height * 0.25}px` 
    : '-25%';

  // Text description: font size lớn hơn, responsive, ở dưới số nhiệt độ, hơi lệch trái
  // Font size dựa trên width để responsive - tăng thêm
  const descFontSize = heroDimensions.width > 0 
    ? `${Math.max(heroDimensions.width * 0.08, 18)}px` 
    : 'clamp(1.125rem, 5vw, 1.5rem)';
  // Vị trí text: dưới số nhiệt độ, dịch lên 5% (từ 80% xuống 75%)
  const descTop = heroDimensions.height > 0
    ? `${heroDimensions.height * 0.75}px`
    : '75%';
  // Description dịch qua trái thêm 5% (từ 60% xuống 55%)
  const descLeft = heroDimensions.width > 0 
    ? `${heroDimensions.width * 0.55}px` 
    : '55%';

  return (
    <div 
      ref={heroRef}
      className="mb-3" 
      style={{
        ...heroCardStyle, 
        marginTop: 'clamp(0.75rem, 2vh, 1rem)', 
        marginBottom: 'clamp(0.75rem, 2vh, 1rem)',
        transform: 'scale(1.05)', // Tăng 5% kích thước
        overflow: 'visible',
        overflowX: 'visible',
        overflowY: 'visible',
        position: 'relative',
        zIndex: 10, // Tạo stacking context cho hero card
      }}
    >
      {/* Background blur text cho nhiệt độ - Số justify, "°" ở ngoài cùng - GIỮ NGUYÊN màu cũ ở light mode */}
      <div
        className="font-extrabold tracking-tighter leading-none absolute"
        style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: tempFontSize,
          color: isDarkMode ? 'rgba(100, 181, 246, 0.6)' : '#2A6CD9', // Light mode giữ nguyên #2A6CD9
          opacity: 0.8,
          filter: 'blur(10px)',
          top: tempTop,
          left: tempLeft,
          pointerEvents: 'none',
          lineHeight: 1,
          width: tempWidth,
          display: 'flex',
          alignItems: 'flex-start',
          overflow: 'visible',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Phần số - justify (phân bố đều), KHÔNG có gap giữa các số - TĂNG marginRight để tạo khoảng cách với "°" */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: '0 1 auto',
          minWidth: 0,
          gap: '0px',
          marginRight: heroDimensions.width > 0 ? `${heroDimensions.width * 0.2}px` : '20%',
          maxWidth: heroDimensions.width > 0 ? `${heroDimensions.width * 0.5}px` : '50%',
        }}>
          {tempDigits.map((digit, index) => (
            <span key={index} style={{ 
              fontSize: tempFontSize, 
              whiteSpace: 'nowrap', 
              display: 'inline-block',
              flex: '1 1 0',
              textAlign: 'center',
            }}>
              {digit}
            </span>
          ))}
        </div>
        {/* Ký tự "°" - luôn ở ngoài cùng bên phải, không bị cắt, cách xa số nhiệt độ - XÍCH VÀO LẠI một tí */}
        <span style={{ 
          fontSize: tempFontSize, 
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: 'inline-block',
          marginLeft: heroDimensions.width > 0 ? `${heroDimensions.width * 0.1}px` : '10%',
        }}>
          &deg;
        </span>
      </div>

      {/* Main temperature text - Chiếm 1/2 thẻ, cách trên 15% height, Số justify, "°" ở ngoài cùng - GIỮ NGUYÊN màu cũ ở light mode */}
      <div
        className="font-extrabold tracking-tighter leading-none absolute"
        style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: tempFontSize,
          color: isDarkMode ? primaryText : '#FFFFFF', // Light mode giữ nguyên #FFFFFF
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          filter: isDarkMode 
            ? `drop-shadow(0px 6px 12px ${currentTheme.heroTextShadow || 'rgba(100, 181, 246, 0.5)'})`
            : 'drop-shadow(0px 6px 12px rgba(72, 87, 217, 0.5))', // Light mode giữ nguyên shadow cũ
          top: tempTop,
          left: tempLeft,
          pointerEvents: 'none',
          lineHeight: 1,
          width: tempWidth,
          display: 'flex',
          alignItems: 'flex-start',
          overflow: 'visible',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Phần số - justify (phân bố đều), KHÔNG có gap giữa các số - GIỮ NGUYÊN HIỆU ỨNG BAN ĐẦU */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: '0 1 auto',
          minWidth: 0,
          gap: '0px',
          marginRight: heroDimensions.width > 0 ? `${heroDimensions.width * 0.2}px` : '20%',
          maxWidth: heroDimensions.width > 0 ? `${heroDimensions.width * 0.5}px` : '50%',
        }}>
          {tempDigits.map((digit, index) => (
            <span key={index} style={{ 
              fontSize: tempFontSize, 
              whiteSpace: 'nowrap', 
              display: 'inline-block',
              flex: '1 1 0',
              textAlign: 'center',
            }}>
              {digit}
            </span>
          ))}
        </div>
        {/* Ký tự "°" - luôn ở ngoài cùng bên phải, không bị cắt, cách xa số nhiệt độ - XÍCH VÀO BÊN TRÁI một tí - GIỮ NGUYÊN màu cũ ở light mode */}
        <span style={{ 
          fontSize: tempFontSize, 
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: 'inline-block',
          marginLeft: heroDimensions.width > 0 ? `${heroDimensions.width * 0.07}px` : '7%',
          color: isDarkMode ? primaryText : '#FFFFFF', // Light mode giữ nguyên #FFFFFF
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          filter: isDarkMode 
            ? `drop-shadow(0px 6px 12px ${currentTheme.heroTextShadow || 'rgba(100, 181, 246, 0.5)'})`
            : 'drop-shadow(0px 6px 12px rgba(72, 87, 217, 0.5))', // Light mode giữ nguyên shadow cũ
        }}>
          &deg;
        </span>
      </div>
      
      {/* Weather description - Ở dưới số nhiệt độ, hơi lệch trái - GIỮ NGUYÊN màu cũ ở light mode */}
      <div
        className="absolute"
        style={{
          top: descTop,
          left: descLeft,
          opacity: 0.8,
          pointerEvents: 'none',
          zIndex: 10,
          maxWidth: heroDimensions.width > 0 
            ? `${heroDimensions.width * 0.5}px` 
            : '50%',
        }}
      >
        <div style={{ 
          fontSize: descFontSize,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          fontWeight: 600,
          color: isDarkMode ? primaryText : '#FFFFFF', // Light mode giữ nguyên #FFFFFF
          textShadow: isDarkMode 
            ? `0px 2px 4px ${currentTheme.heroTextShadow || 'rgba(100, 181, 246, 0.4)'}`
            : '0px 2px 4px rgba(0, 0, 0, 0.3)', // Light mode giữ nguyên shadow cũ
        }}>
          <WeatherDescription 
            condition={condition}
            shouldBreakLine={false}
          />
        </div>
      </div>

      {/* Weather icon - Ở góc dưới trái, một phần ra ngoài thẻ, zIndex cao để không bị kẹt với metrics */}
      <div
        className="absolute"
        style={{
          bottom: iconBottom,
          left: iconLeft,
          pointerEvents: 'none',
          zIndex: 1000, // ZIndex cao để đứng trước cả MetricsCard
        }}
      >
        <IconWeather
          code={weatherCode || 0}
          size={iconSize}
          motionEnabled={motionEnabled}
          windSpeed={windSpeed}
          aqi={aqi}
          previousCode={previousCode}
          isDay={isDayTime}
        />
      </div>
    </div>
  );
}
