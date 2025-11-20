import SettingsHeader from './settings/SettingsHeader';
import SettingsThemeSection from './settings/SettingsThemeSection';
import SettingsToggleSection from './settings/SettingsToggleSection';
import SettingsTempUnitSection from './settings/SettingsTempUnitSection';

export default function SettingsDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  themeMode,
  setThemeMode,
  isDark,
  setIsDark,
  soundEnabled,
  setSoundEnabled,
  motionEnabled,
  setMotionEnabled,
  tempUnit,
  setTempUnit,
  currentTheme,
  primaryText,
  secondaryText,
  gpsEnabled,
  toggleGPS,
}) {
  
  return (
    <>
      <div
        className={`absolute inset-0 backdrop-blur-md transition-opacity duration-300 z-40 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(58, 141, 255, 0.15)',
        }}
        onClick={() => setIsDrawerOpen(false)}
      />
      
      <div 
        className={`absolute inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`} 
        style={{ 
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `
            -10px 0 40px rgba(58, 141, 255, 0.2),
            -5px 0 20px rgba(58, 141, 255, 0.15)
          `,
        }}
      >
        <SettingsHeader setIsDrawerOpen={setIsDrawerOpen} />
        
        <div className="overflow-y-auto h-full pb-24 scrollbar-hide">
          <div className="space-y-6 p-6">
            <SettingsThemeSection
              themeMode={themeMode}
              setThemeMode={setThemeMode}
              isDark={isDark}
              setIsDark={setIsDark}
              primaryText={primaryText}
            />

            <div className="border-t" style={{ borderColor: 'rgba(58, 141, 255, 0.15)' }} />

            <SettingsToggleSection
              title="Âm thanh nền"
              description="Âm thanh thời tiết"
              checked={soundEnabled}
              onChange={setSoundEnabled}
              primaryText={primaryText}
              secondaryText={secondaryText}
            />

            <div className="border-t" style={{ borderColor: 'rgba(58, 141, 255, 0.15)' }} />

            <SettingsToggleSection
              title="Hiệu ứng chuyển động"
              description="Hoạt ảnh & chuyển cảnh"
              checked={motionEnabled}
              onChange={setMotionEnabled}
              primaryText={primaryText}
              secondaryText={secondaryText}
            />

            <div className="border-t" style={{ borderColor: 'rgba(58, 141, 255, 0.15)' }} />

            <SettingsToggleSection
              title="Vị trí GPS"
              description="Sử dụng vị trí hiện tại của bạn"
              checked={gpsEnabled}
              onChange={(checked) => toggleGPS(checked)}
              primaryText={primaryText}
              secondaryText={secondaryText}
            />

            <div className="border-t" style={{ borderColor: 'rgba(58, 141, 255, 0.15)' }} />

            <SettingsTempUnitSection
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
              primaryText={primaryText}
            />
          </div>
        </div>
      </div>
    </>
  );
}