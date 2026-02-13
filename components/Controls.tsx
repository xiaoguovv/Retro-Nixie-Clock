import React from 'react';
import { ClockMode, ClockSkin, ClockFont, ClockColorMode, ClockPrecision } from '../types';

interface ControlsProps {
  mode: ClockMode;
  setMode: (mode: ClockMode) => void;
  skin: ClockSkin;
  setSkin: (skin: ClockSkin) => void;
  manualTimeOffset: number;
  setManualTimeOffset: (offset: number) => void;
  font: ClockFont;
  setFont: (font: ClockFont) => void;
  colorMode: ClockColorMode;
  setColorMode: (mode: ClockColorMode) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  glitchEnabled: boolean;
  toggleGlitch: () => void;
  precision: ClockPrecision;
  setPrecision: (precision: ClockPrecision) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#ff6600', // Classic Orange
  '#ff0000', // Deep Red
  '#00ff00', // Green
  '#0088ff', // Blue
  '#9d00ff', // Purple
  '#00ffff', // Cyan
  '#ffffff', // White
];

const Controls: React.FC<ControlsProps> = ({ 
  mode, 
  setMode, 
  skin,
  setSkin,
  manualTimeOffset, 
  setManualTimeOffset,
  font,
  setFont,
  colorMode,
  setColorMode,
  customColor,
  setCustomColor,
  zoom,
  setZoom,
  soundEnabled,
  toggleSound,
  glitchEnabled,
  toggleGlitch,
  precision,
  setPrecision,
  onClose
}) => {
  const handleModeChange = (newMode: ClockMode) => {
    setMode(newMode);
    if (newMode === ClockMode.AUTO) {
      setManualTimeOffset(0);
    }
  };

  const adjustTime = (seconds: number) => {
    setMode(ClockMode.MANUAL);
    setManualTimeOffset(manualTimeOffset + seconds * 1000);
  };

  // UI Theme Logic
  const isCyber = skin === ClockSkin.CYBER;
  const isLight = skin === ClockSkin.LIGHT;
  const isLED = skin === ClockSkin.LED;
  
  let activeColorClass = 'bg-[#ff5500]';
  let activeTextClass = 'text-[#ff5500]';
  let activeBorderClass = 'border-[#ff5500]';
  let activeShadowClass = 'shadow-lg';
  let rangeAccentClass = 'accent-[#ff5500]';

  if (isCyber) {
    activeColorClass = 'bg-cyan-500';
    activeTextClass = 'text-cyan-500';
    activeBorderClass = 'border-cyan-500';
    activeShadowClass = 'shadow-[0_0_10px_cyan]';
    rangeAccentClass = 'accent-cyan-500';
  } else if (isLight) {
    activeColorClass = 'bg-[#0088ff]';
    activeTextClass = 'text-[#0088ff]';
    activeBorderClass = 'border-[#0088ff]';
    activeShadowClass = 'shadow-[0_0_10px_#0088ff]';
    rangeAccentClass = 'accent-[#0088ff]';
  } else if (isLED) {
    activeColorClass = 'bg-[#d600ff]';
    activeTextClass = 'text-[#d600ff]';
    activeBorderClass = 'border-[#d600ff]';
    activeShadowClass = 'shadow-[0_0_10px_#d600ff]';
    rangeAccentClass = 'accent-[#d600ff]';
  }

  // Helper for segmented control buttons to respect skin color
  const getSegmentButtonClass = (isActive: boolean) => {
    if (isActive) {
      return `${activeColorClass} text-black ${activeShadowClass}`;
    }
    return `text-gray-400 hover:text-white`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className={`text-xl font-bold mb-6 font-mono tracking-wider ${activeTextClass}`}>CLOCK SETTINGS</h2>

        <div className="space-y-6">
          {/* Zoom / Size Control */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest">Clock Scale</label>
              <span className={`text-xs font-mono ${activeTextClass}`}>{Math.round(zoom * 100)}%</span>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">
              <button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} className="text-gray-400 hover:text-white">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
              </button>
              <input 
                type="range" 
                min="0.3" 
                max="2.5" 
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${rangeAccentClass}`}
              />
              <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
             <div className="flex justify-center mt-1">
                <button 
                  onClick={() => setZoom(1)} 
                  className="text-[10px] text-gray-500 hover:text-white underline"
                >
                  Reset to 100%
                </button>
            </div>
          </div>

          <hr className="border-gray-800" />

          {/* Sound & Glitch Toggles */}
          <div className="grid grid-cols-2 gap-4">
            {/* Sound Toggle */}
            <div className="flex flex-col justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 h-full">
              <div className="w-full mb-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block">Power Hum</span>
                <span className="text-[10px] text-gray-600">Sound Effect</span>
              </div>
              <div className="w-full flex justify-end">
                <button 
                  onClick={toggleSound}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${soundEnabled ? activeColorClass : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${soundEnabled ? 'translate-x-5' : ''}`}></div>
                </button>
              </div>
            </div>

            {/* Glitch Toggle */}
            <div className="flex flex-col justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 h-full">
              <div className="w-full mb-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block">Voltage Glitch</span>
                <span className="text-[10px] text-gray-600">Unstable Power</span>
              </div>
              <div className="w-full flex justify-end">
                <button 
                  onClick={toggleGlitch}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${glitchEnabled ? activeColorClass : 'bg-gray-600'}`}
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${glitchEnabled ? 'translate-x-5' : ''}`}></div>
                </button>
              </div>
            </div>
          </div>

          <hr className="border-gray-800" />

          {/* Mode Selection */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Time Mode</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => handleModeChange(ClockMode.AUTO)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(mode === ClockMode.AUTO)}`}
              >
                AUTO
              </button>
              <button
                onClick={() => handleModeChange(ClockMode.MANUAL)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(mode === ClockMode.MANUAL)}`}
              >
                MANUAL
              </button>
            </div>
          </div>

          {/* Precision Selection */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Precision</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setPrecision(ClockPrecision.MINUTES)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(precision === ClockPrecision.MINUTES)}`}
              >
                HH:MM
              </button>
              <button
                onClick={() => setPrecision(ClockPrecision.SECONDS)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(precision === ClockPrecision.SECONDS)}`}
              >
                HH:MM:SS
              </button>
            </div>
          </div>

          {/* Manual Time Controls */}
          <div className={`transition-opacity duration-300 ${mode === ClockMode.MANUAL ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <p className="text-gray-400 text-xs mb-3 text-center uppercase tracking-widest">Adjust Current Time</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <button onClick={() => adjustTime(3600)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>+1 Hr</button>
                <button onClick={() => adjustTime(-3600)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>-1 Hr</button>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => adjustTime(60)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>+1 Min</button>
                <button onClick={() => adjustTime(-60)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>-1 Min</button>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => adjustTime(1)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>+1 Sec</button>
                <button onClick={() => adjustTime(-1)} className={`bg-gray-800 hover:bg-gray-700 ${activeTextClass} py-2 rounded border border-gray-700`}>-1 Sec</button>
              </div>
            </div>
          </div>

          <hr className="border-gray-800" />

          {/* Skin Selection */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Skin</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setSkin(ClockSkin.CLASSIC)}
                className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${
                  skin === ClockSkin.CLASSIC
                    ? 'bg-[#ff5500] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CLASSIC
              </button>
               <button
                onClick={() => setSkin(ClockSkin.LIGHT)}
                className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${
                  skin === ClockSkin.LIGHT
                    ? 'bg-[#0088ff] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                LIGHT
              </button>
              <button
                onClick={() => setSkin(ClockSkin.LED)}
                className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${
                  skin === ClockSkin.LED
                    ? 'bg-[#d600ff] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                LED
              </button>
              <button
                onClick={() => setSkin(ClockSkin.CYBER)}
                className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${
                  skin === ClockSkin.CYBER 
                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_cyan]' 
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                CYBER
              </button>
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Digit Font</label>
            <div className="bg-gray-800 p-2 rounded-lg">
              <select 
                value={font} 
                onChange={(e) => setFont(e.target.value as ClockFont)}
                className={`w-full bg-gray-900 text-white p-2 rounded border focus:outline-none ${activeBorderClass} border-gray-700`}
              >
                <option value={ClockFont.NIXIE_ONE}>Nixie One (Thin)</option>
                <option value={ClockFont.SHARE_TECH}>Share Tech (Modern)</option>
                <option value={ClockFont.ORBITRON}>Orbitron (Sci-Fi)</option>
                <option value={ClockFont.WALLPOET}>Wallpoet (Stencil)</option>
              </select>
            </div>
          </div>

          {/* Color Mode Selection */}
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Glow Color</label>
            <div className="flex bg-gray-800 p-1 rounded-lg mb-3">
               <button
                onClick={() => setColorMode(ClockColorMode.DEFAULT)}
                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                  colorMode === ClockColorMode.DEFAULT ? 'bg-white text-black' : 'text-gray-400'
                }`}
              >
                SKIN
              </button>
              <button
                onClick={() => setColorMode(ClockColorMode.FIXED)}
                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                  colorMode === ClockColorMode.FIXED ? 'bg-white text-black' : 'text-gray-400'
                }`}
              >
                FIXED
              </button>
              <button
                onClick={() => setColorMode(ClockColorMode.RAINBOW)}
                className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                  colorMode === ClockColorMode.RAINBOW ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white' : 'text-gray-400'
                }`}
              >
                RGB
              </button>
            </div>

            {/* Custom Color Picker & Presets */}
            {colorMode === ClockColorMode.FIXED && (
              <div className="flex flex-col gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                  <span className="text-gray-300 font-mono text-sm">{customColor.toUpperCase()}</span>
                  <div className="flex-1"></div>
                  <div className="text-xs text-gray-500">Pick any color</div>
                </div>
                
                {/* Preset Swatches */}
                <div className="flex gap-2 justify-between">
                  {PRESET_COLORS.map(c => (
                    <button 
                      key={c}
                      onClick={() => setCustomColor(c)}
                      className={`w-6 h-6 rounded-full border border-gray-600 transition-transform hover:scale-110 ${customColor === c ? 'ring-2 ring-white scale-110' : ''}`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center pt-4 border-t border-gray-800">
             <p className="text-gray-500 text-xs">
               {mode === ClockMode.AUTO ? "Syncing with Internet Time via System" : "Manual Time Offset Active"}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;