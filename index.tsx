
// Monolithic Index File
// Combines NeonSeparator, NixieTube, Controls, and App to avoid module loading issues in browser-only environment

const React = (window as any).React;
const ReactDOM = (window as any).ReactDOM;

// --- COMPONENT: NeonSeparator ---
const NeonSeparator = ({ on = true, skin, colorMode, customColor, flickerEnabled }: any) => {
  const { useMemo } = React;
  
  const ClockSkin = (window as any).ClockSkin;
  const ClockColorMode = (window as any).ClockColorMode;

  const isClassic = skin === ClockSkin.CLASSIC;
  const isLight = skin === ClockSkin.LIGHT;
  const isLED = skin === ClockSkin.LED;
  
  const animationDelay = useMemo(() => `-${Math.random() * 5}s`, []);

  let activeStyle: any = {};

  if (colorMode === ClockColorMode.FIXED || colorMode === ClockColorMode.RAINBOW) {
    activeStyle = {
        backgroundColor: customColor,
        boxShadow: `0 0 4px ${customColor}, 0 0 8px ${customColor}, 0 0 16px ${customColor}`,
        opacity: 1,
    };
  } else {
    if (isClassic) {
        activeStyle = {
            backgroundColor: '#ffaa88',
            boxShadow: `0 0 4px #ff4400, 0 0 8px #ff2200, 0 0 16px #ff0000`,
            opacity: 1,
        };
    } else if (isLight) {
        activeStyle = {
            backgroundColor: '#ffcc00',
            boxShadow: `0 0 4px #ffaa00, 0 0 10px #ff8800`,
            opacity: 1,
        };
    } else if (isLED) {
        activeStyle = {
            backgroundColor: '#d600ff',
            boxShadow: `0 0 4px #d600ff, 0 0 10px #8000ff`,
            opacity: 1,
        };
    } else {
         activeStyle = {
            backgroundColor: '#ffcccc',
            boxShadow: `0 0 4px #ff3333, 0 0 8px #ff0000, 0 0 16px #cc0000`,
            opacity: 1,
        };
    }
  }

  const animList = [];
  const delay = flickerEnabled ? animationDelay : '0s';

  if (on) {
    animList.push(`flicker 0.1s infinite alternate ${delay}`);
    
    if (flickerEnabled) {
       animList.push(`unstable-voltage 4s infinite ${delay}`);
    }
  }

  activeStyle.animation = animList.join(', ');

  const inactiveStyle = {
    backgroundColor: (isClassic) ? '#3a2222' : (isLight ? '#4a3020' : '#2a2020'),
    boxShadow: 'none',
    opacity: isLight ? 0.2 : 0.2,
  };

  let containerClasses = isClassic ? "bg-[#0a0505] border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,1)]" : (isLight ? "bg-[#02050a]/90 border border-[#2060ff]/50 shadow-[0_0_8px_rgba(0,100,255,0.4),inset_0_0_10px_rgba(0,40,100,0.6)] backdrop-blur-sm" : (isLED ? "bg-black/40 border-x-4 border-[#111] backdrop-blur-sm rounded-sm" : "bg-[#000810]/60 border-cyan-400/20 shadow-[inset_0_0_10px_rgba(0,255,255,0.05)]"));

  if (isLED) {
    return (
        <div className="relative flex flex-col justify-center items-center h-32 sm:h-40 md:h-56 lg:h-64 gap-2 sm:gap-3 md:gap-4 mx-1 sm:mx-2 py-4">
            <div className={`relative w-6 h-8 sm:h-10 border-t border-b border-[#222] flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#222]"></div>
                 <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ease-in-out`} style={{ ...(on ? activeStyle : inactiveStyle) }} />
            </div>
            <div className={`relative w-6 h-8 sm:h-10 border-t border-b border-[#222] flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#222]"></div>
                 <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ease-in-out`} style={{ ...(on ? activeStyle : inactiveStyle) }} />
            </div>
        </div>
    )
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-32 sm:h-40 md:h-56 lg:h-64 gap-2 sm:gap-3 md:gap-4 mx-1 sm:mx-2 py-4">
      <div className={`relative w-4 h-8 sm:w-6 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
        <div className={`absolute top-1 left-1 w-0.5 h-2 blur-[0.5px] rounded-full ${isLight ? 'bg-[#80b0ff]/60' : 'bg-white/40'}`}></div>
        <div className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-100 ease-in-out`} style={{ ...(on ? activeStyle : inactiveStyle) }} />
      </div>
      <div className={`relative w-4 h-8 sm:w-6 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
        <div className={`absolute top-1 left-1 w-0.5 h-2 blur-[0.5px] rounded-full ${isLight ? 'bg-[#80b0ff]/60' : 'bg-white/40'}`}></div>
        <div className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-100 ease-in-out`} style={{ ...(on ? activeStyle : inactiveStyle) }} />
      </div>
    </div>
  );
};

// --- COMPONENT: NixieTube ---
const NixieTube = ({ value, label, skin, font, colorMode, customColor, flickerEnabled }: any) => {
  const { useMemo } = React;
  
  const ClockSkin = (window as any).ClockSkin;
  const ClockColorMode = (window as any).ClockColorMode;

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const isClassic = skin === ClockSkin.CLASSIC;
  const isLight = skin === ClockSkin.LIGHT;
  const isCyber = skin === ClockSkin.CYBER;
  const isLED = skin === ClockSkin.LED;

  const animationDelay = useMemo(() => `-${Math.random() * 5}s`, []);

  // Textures
  const meshColor = isCyber ? 'rgba(100, 200, 255, 0.1)' : (isLight ? 'rgba(50, 100, 255, 0.15)' : 'rgba(139, 0, 0, 0.25)');
  const hexMeshBg = `url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 0 L8 3.5 L8 10.5 L4 14 L0 10.5 L0 3.5 Z' fill='none' stroke='${encodeURIComponent(meshColor)}' stroke-width='${isLight ? 0.5 : 0.5}'/%3E%3C/svg%3E")`;
  const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${isCyber ? '0.15' : '0.3'}'/%3E%3C/svg%3E")`;
  const wireColor = isCyber ? 'rgba(20, 40, 50, 0.4)' : (isLight ? 'rgba(20, 40, 80, 0.3)' : 'rgba(50, 20, 20, 0.4)');
  const wireBg = `linear-gradient(90deg, transparent 0%, transparent 45%, ${wireColor} 50%, transparent 55%, transparent 100%)`;
  const acrylicStackBg = `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.08) 3px, transparent 4px)`;

  // Defaults
  const defaultShadowClassic = `0 0 5px #ff6600, 0 0 10px #ff3300, 0 0 20px #ff1100, 0 0 40px #ff0000, 0 0 70px #ff0000`;
  const defaultShadowCyber = `0 0 4px #ff3333, 0 0 8px #ff0022, 0 0 15px #cc0000, 0 0 30px #990000, 0 0 60px #550000`;
  const defaultShadowLight = `0 0 5px #ffaa00, 0 0 10px #ff8800, 0 0 20px #ff6600, 0 0 40px #ff4400`;
  const defaultShadowLED = `0 0 2px #d600ff, 0 0 8px #b300ff, 0 0 20px #8000ff`;

  const defaultStrokeClassic = '0.03em #ffeebb';
  const defaultStrokeCyber = '0.03em #ffcccc';
  const defaultStrokeLight = '0.04em #ffcc88';
  const defaultStrokeLED = '0.04em #ffffff';
  
  const defaultColorClassic = '#ffeebb';
  const defaultColorCyber = '#ffeebb';
  const defaultColorLight = '#ffddaa';
  const defaultColorLED = '#ffffff';

  let currentTextShadow;
  let currentStroke;
  let currentColor;

  if (colorMode === ClockColorMode.FIXED || colorMode === ClockColorMode.RAINBOW) {
    const c = customColor; 
    currentTextShadow = `0 0 5px ${c}, 0 0 10px ${c}, 0 0 20px ${c}, 0 0 40px ${c}, 0 0 70px ${c}`;
    currentColor = c; 
    currentStroke = `0.03em ${c}`;
  } else {
    if (isCyber) {
        currentTextShadow = defaultShadowCyber;
        currentStroke = defaultStrokeCyber;
        currentColor = defaultColorCyber;
    } else if (isLight) {
        currentTextShadow = defaultShadowLight;
        currentStroke = defaultStrokeLight;
        currentColor = defaultColorLight;
    } else if (isLED) {
        currentTextShadow = defaultShadowLED;
        currentStroke = defaultStrokeLED;
        currentColor = defaultColorLED;
    } else {
        currentTextShadow = defaultShadowClassic;
        currentStroke = defaultStrokeClassic;
        currentColor = defaultColorClassic;
    }
  }

  const animList = [];
  const delay = flickerEnabled ? animationDelay : '0s';
  
  animList.push(`flicker 0.1s infinite alternate ${delay}`);

  if (flickerEnabled) {
    animList.push(`unstable-voltage 4s infinite ${delay}`);
  }

  const activeStyle = {
    fontFamily: `"${font}", monospace`,
    color: currentColor, 
    textShadow: currentTextShadow,
    WebkitTextStroke: currentStroke,
    opacity: 1,
    zIndex: 30,
    filter: isLED ? 'contrast(1.2)' : 'blur(0.4px) contrast(1.3)',
    animation: animList.join(', '),
  };

  const inactiveStyle = {
    fontFamily: `"${font}", monospace`,
    color: isCyber ? '#332a2a' : (isLight ? '#5c3a2a' : (isLED ? 'rgba(255,255,255,0.05)' : '#4a3b3b')), 
    textShadow: isLight ? '0 0 2px rgba(0,0,0,0.8)' : '0 1px 2px rgba(0,0,0,0.9)', 
    opacity: isLight ? 0.2 : (isCyber ? 0.1 : (isLED ? 0.3 : 0.2)), 
    zIndex: 10,
    transform: 'scale(0.92)',
    WebkitTextStroke: isCyber ? '0.02em #332a2a' : (isLight ? '0.02em #3a2015' : (isLED ? '0.01em rgba(255,255,255,0.05)' : '0.02em #4a3b3b')),
  };

  if (isLED) {
      return (
        <div className="relative flex flex-col items-center mx-1 sm:mx-2 group">
            <div className="relative w-20 h-32 sm:w-24 sm:h-40 md:w-36 md:h-56 lg:w-44 lg:h-64 border-x-4 border-[#111] bg-black/40 backdrop-blur-sm shadow-xl rounded-sm overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-4 bg-[#222] border-b border-[#333] z-30 flex justify-between items-center px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_0_2px_gray]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[inset_0_0_2px_gray]"></div>
                </div>
                <div className="absolute inset-0 top-4 z-0 opacity-30 pointer-events-none" style={{ backgroundImage: acrylicStackBg }}></div>
                <div className="absolute inset-0 top-4 flex items-center justify-center text-[5.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold select-none z-20">
                    {digits.map((digit) => (
                        <span key={digit} className={`absolute transition-all duration-150`} style={digit === value ? activeStyle : inactiveStyle}>{digit}</span>
                    ))}
                </div>
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white/10 to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
            </div>
            {label && <span className="mt-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase opacity-40 text-gray-400">{label}</span>}
        </div>
      )
  }

  let tubeContainerClasses = isClassic ? "bg-[#0a0505] border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_0_15px_rgba(20,0,0,0.5)]" : (isLight ? "bg-[#02050a]/90 border border-[#2060ff]/50 shadow-[0_0_15px_rgba(0,100,255,0.4),inset_0_0_20px_rgba(0,40,100,0.6)] backdrop-blur-sm" : "bg-[#000810]/60 border-cyan-400/20 shadow-[inset_0_0_20px_rgba(0,10,20,0.9),0_0_15px_rgba(0,255,255,0.1)] backdrop-blur-[1px]");
  let baseClasses = isClassic ? "bg-gradient-to-b from-[#111] to-[#000] border-[#333]" : (isLight ? "bg-gradient-to-b from-[#1a1a1a] to-[#050505] border-t border-[#334455] shadow-[0_5px_10px_rgba(0,0,0,0.8)]" : "bg-gradient-to-b from-[#0a1520] to-[#050a10] border-cyan-800/30 backdrop-blur-md");
  let innerGlowClass = isClassic ? "from-[#ff2200]/10 via-transparent to-black" : (isLight ? "from-[#0044ff]/10 via-transparent to-transparent" : "from-[#ff0033]/10 via-cyan-900/5 to-[#000510]");

  return (
    <div className="relative flex flex-col items-center mx-1 sm:mx-2 group">
      <div className={`absolute -top-3 sm:-top-4 w-3 sm:w-4 h-4 rounded-full blur-[0.5px] border-l border-t z-10 transition-colors duration-500 ${isCyber ? 'bg-cyan-100/10 border-cyan-200/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]' : (isLight ? 'bg-[#2060ff]/20 border-[#4080ff]/40 shadow-[0_0_8px_rgba(0,100,255,0.4)]' : 'bg-white/20 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]')}`}></div>
      <div className={`relative w-20 h-32 sm:w-24 sm:h-40 md:w-36 md:h-56 lg:w-44 lg:h-64 rounded-t-full rounded-b-xl overflow-hidden transition-all duration-500 ${tubeContainerClasses}`}>
        <div className={`absolute top-0 w-full h-1/4 bg-gradient-to-b opacity-60 z-10 pointer-events-none ${isLight ? 'from-black/90 to-transparent' : 'from-black/80 to-transparent'}`}></div>
        {isLight && <div className="absolute inset-0 border-[1px] border-white/5 rounded-t-full rounded-b-xl pointer-events-none z-20 shadow-[inset_0_0_10px_rgba(0,60,200,0.3)]"></div>}
        <div className="absolute top-4 right-0 w-8 h-12 bg-black/60 blur-xl rounded-full z-10 pointer-events-none transform rotate-12"></div>
        <div className={`absolute inset-0 bg-radial-gradient ${innerGlowClass} opacity-70`}></div>
        <div className="absolute inset-4 z-0 opacity-50 mix-blend-overlay pointer-events-none" style={{ backgroundImage: wireBg, backgroundSize: '20px 100%' }}></div>
        <div className="absolute inset-1 top-6 bottom-4 z-20 opacity-100 mix-blend-overlay pointer-events-none rounded-lg" style={{ backgroundImage: hexMeshBg, backgroundSize: '8px 14px' }}></div>
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: noiseBg }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-[4.5rem] sm:text-[6rem] md:text-[9.5rem] lg:text-[12rem] font-bold select-none z-20">
          {digits.map((digit) => (
            <span key={digit} className={`absolute transition-all duration-150`} style={digit === value ? activeStyle : inactiveStyle}>{digit}</span>
          ))}
        </div>
        <div className={`absolute top-8 left-1.5 sm:left-3 w-1 sm:w-1.5 h-3/5 rounded-full blur-[0.8px] pointer-events-none z-40 ${isCyber ? 'bg-gradient-to-b from-cyan-100/40 via-white/10 to-transparent' : (isLight ? 'bg-gradient-to-b from-[#80b0ff]/60 via-[#4080ff]/20 to-transparent' : 'bg-gradient-to-b from-white/70 via-white/20 to-transparent')}`}></div>
        <div className={`absolute top-10 right-1.5 sm:right-2 w-3 sm:w-4 h-1/2 rounded-full blur-sm pointer-events-none z-40 ${isCyber ? 'bg-gradient-to-b from-cyan-200/5 to-transparent' : (isLight ? 'bg-gradient-to-b from-[#4080ff]/30 to-transparent' : 'bg-gradient-to-b from-white/10 to-transparent')}`}></div>
        <div className={`absolute top-1/3 left-1/4 w-1/2 h-32 blur-2xl rounded-full z-40 pointer-events-none opacity-30 ${isLight ? 'bg-[#0044ff]/20' : 'bg-white/5'}`}></div>
        <div className={`absolute bottom-0 w-full h-6 pointer-events-none z-30 border-b-[6px] rounded-b-xl ${isCyber ? 'bg-gradient-to-t from-[#001015]/90 to-transparent border-cyan-500/10' : (isLight ? 'bg-gradient-to-t from-[#000a15]/90 to-transparent border-[#2060ff]/30' : 'bg-gradient-to-t from-black/80 to-transparent border-white/5')}`}></div>
      </div>
      <div className={`w-16 sm:w-20 md:w-28 h-3 sm:h-5 rounded-b-lg border-t mt-[-2px] relative z-[-1] flex justify-center items-center transition-colors duration-500 ${baseClasses}`}>
        <div className="flex gap-2 opacity-50">
            <div className={`w-[2px] h-2 ${isCyber ? 'bg-gray-600' : 'bg-[#443322]'}`}></div>
            <div className={`w-[2px] h-2 ${isCyber ? 'bg-gray-600' : 'bg-[#443322]'}`}></div>
            <div className={`w-[2px] h-2 ${isCyber ? 'bg-gray-600' : 'bg-[#443322]'}`}></div>
        </div>
      </div>
      {label && <span className={`mt-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase opacity-60 drop-shadow-sm transition-colors duration-500 ${isCyber ? 'text-cyan-700' : (isLight ? 'text-[#406080]' : 'text-[#774444]')}`}>{label}</span>}
    </div>
  );
};

// --- COMPONENT: Controls ---
const Controls = ({ 
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
}: any) => {
  const ClockMode = (window as any).ClockMode;
  const ClockSkin = (window as any).ClockSkin;
  const ClockFont = (window as any).ClockFont;
  const ClockColorMode = (window as any).ClockColorMode;
  const ClockPrecision = (window as any).ClockPrecision;

  const PRESET_COLORS = [
    '#ff6600', '#ff0000', '#00ff00', '#0088ff', '#9d00ff', '#00ffff', '#ffffff'
  ];

  const handleModeChange = (newMode: any) => {
    setMode(newMode);
    if (newMode === ClockMode.AUTO) {
      setManualTimeOffset(0);
    }
  };

  const adjustTime = (seconds: number) => {
    setMode(ClockMode.MANUAL);
    setManualTimeOffset(manualTimeOffset + seconds * 1000);
  };

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

  const getSegmentButtonClass = (isActive: boolean) => {
    if (isActive) {
      return `${activeColorClass} text-black ${activeShadowClass}`;
    }
    return `text-gray-400 hover:text-white`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className={`text-xl font-bold mb-6 font-mono tracking-wider ${activeTextClass}`}>CLOCK SETTINGS</h2>

        <div className="space-y-6">
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
                type="range" min="0.3" max="2.5" step="0.05" value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${rangeAccentClass}`}
              />
              <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
             <div className="flex justify-center mt-1">
                <button onClick={() => setZoom(1)} className="text-[10px] text-gray-500 hover:text-white underline">Reset to 100%</button>
            </div>
          </div>
          <hr className="border-gray-800" />
          <div className="grid grid-cols-2 gap-4">
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
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Time Mode</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button onClick={() => handleModeChange(ClockMode.AUTO)} className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(mode === ClockMode.AUTO)}`}>AUTO</button>
              <button onClick={() => handleModeChange(ClockMode.MANUAL)} className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(mode === ClockMode.MANUAL)}`}>MANUAL</button>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Precision</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button onClick={() => setPrecision(ClockPrecision.MINUTES)} className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(precision === ClockPrecision.MINUTES)}`}>HH:MM</button>
              <button onClick={() => setPrecision(ClockPrecision.SECONDS)} className={`flex-1 py-2 px-4 rounded-md text-sm font-bold transition-colors ${getSegmentButtonClass(precision === ClockPrecision.SECONDS)}`}>HH:MM:SS</button>
            </div>
          </div>
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
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Skin</label>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button onClick={() => setSkin(ClockSkin.CLASSIC)} className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${skin === ClockSkin.CLASSIC ? 'bg-[#ff5500] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>CLASSIC</button>
               <button onClick={() => setSkin(ClockSkin.LIGHT)} className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${skin === ClockSkin.LIGHT ? 'bg-[#0088ff] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>LIGHT</button>
              <button onClick={() => setSkin(ClockSkin.LED)} className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${skin === ClockSkin.LED ? 'bg-[#d600ff] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>LED</button>
              <button onClick={() => setSkin(ClockSkin.CYBER)} className={`flex-1 py-2 px-2 rounded-md text-sm font-bold transition-colors ${skin === ClockSkin.CYBER ? 'bg-cyan-500 text-black shadow-[0_0_10px_cyan]' : 'text-gray-400 hover:text-cyan-400'}`}>CYBER</button>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Digit Font</label>
            <div className="bg-gray-800 p-2 rounded-lg">
              <select value={font} onChange={(e) => setFont(e.target.value)} className={`w-full bg-gray-900 text-white p-2 rounded border focus:outline-none ${activeBorderClass} border-gray-700`}>
                <option value={ClockFont.NIXIE_ONE}>Nixie One (Thin)</option>
                <option value={ClockFont.SHARE_TECH}>Share Tech (Modern)</option>
                <option value={ClockFont.ORBITRON}>Orbitron (Sci-Fi)</option>
                <option value={ClockFont.WALLPOET}>Wallpoet (Stencil)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-widest">Glow Color</label>
            <div className="flex bg-gray-800 p-1 rounded-lg mb-3">
               <button onClick={() => setColorMode(ClockColorMode.DEFAULT)} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${colorMode === ClockColorMode.DEFAULT ? 'bg-white text-black' : 'text-gray-400'}`}>SKIN</button>
              <button onClick={() => setColorMode(ClockColorMode.FIXED)} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${colorMode === ClockColorMode.FIXED ? 'bg-white text-black' : 'text-gray-400'}`}>FIXED</button>
              <button onClick={() => setColorMode(ClockColorMode.RAINBOW)} className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${colorMode === ClockColorMode.RAINBOW ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white' : 'text-gray-400'}`}>RGB</button>
            </div>
            {colorMode === ClockColorMode.FIXED && (
              <div className="flex flex-col gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-4">
                  <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-gray-300 font-mono text-sm">{customColor.toUpperCase()}</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {PRESET_COLORS.map(c => (
                    <button key={c} onClick={() => setCustomColor(c)} className={`w-6 h-6 rounded-full border border-gray-600 transition-transform hover:scale-110 ${customColor === c ? 'ring-2 ring-white scale-110' : ''}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            )}
          </div>
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

// --- COMPONENT: App ---
const App = () => {
  const { useState, useEffect, useCallback, useRef } = React;
  
  const ClockMode = (window as any).ClockMode;
  const ClockSkin = (window as any).ClockSkin;
  const ClockFont = (window as any).ClockFont;
  const ClockColorMode = (window as any).ClockColorMode;
  const ClockPrecision = (window as any).ClockPrecision;

  const [mode, setMode] = useState(ClockMode.AUTO);
  const [skin, setSkin] = useState(ClockSkin.CLASSIC);
  const [font, setFont] = useState(ClockFont.NIXIE_ONE);
  const [colorMode, setColorMode] = useState(ClockColorMode.DEFAULT);
  const [customColor, setCustomColor] = useState('#00ff00');
  const [rainbowHue, setRainbowHue] = useState(0);
  const [manualTimeOffset, setManualTimeOffset] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [glitchEnabled, setGlitchEnabled] = useState(false);
  const [precision, setPrecision] = useState(ClockPrecision.SECONDS);
  const [uiVisible, setUiVisible] = useState(false);
  const [separatorOn, setSeparatorOn] = useState(true);

  const audioCtxRef = useRef(null);
  const soundNodesRef = useRef(null);

  const [timeState, setTimeState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (colorMode !== ClockColorMode.RAINBOW) return;
    let animationFrameId: any;
    let currentHue = rainbowHue;
    const animate = () => {
      currentHue = (currentHue + 0.5) % 360;
      setRainbowHue(currentHue);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
  }, [colorMode]);

  const getColorForIndex = (index: number) => {
    if (colorMode === ClockColorMode.RAINBOW) {
      const hue = (rainbowHue - index * 25) % 360;
      return `hsl(${Math.floor(hue)}, 100%, 75%)`;
    }
    return customColor;
  };

  const toggleSound = useCallback(() => {
    if (!soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch((e: any) => console.warn("Audio resume failed", e));
        }
      } catch (e) {
        console.error("Audio init failed", e);
      }
    }
    setSoundEnabled(prev => !prev);
  }, [soundEnabled]);

  const toggleGlitch = useCallback(() => setGlitchEnabled(prev => !prev), []);
  const handleScreenClick = useCallback(() => setUiVisible(prev => !prev), []);

  useEffect(() => {
    if (soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.15; 
        masterGain.connect(ctx.destination);

        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = 55;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600; 
        filter.Q.value = 1;
        osc1.connect(filter);
        filter.connect(masterGain);
        osc1.start();

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 8000; 
        const gain2 = ctx.createGain();
        gain2.gain.value = 0.03; 
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start();

        soundNodesRef.current = { oscs: [osc1, osc2], gain: masterGain };
      } catch (e) {
        console.error("Audio setup error", e);
      }
    } else {
      if (soundNodesRef.current) {
        (soundNodesRef.current as any).oscs.forEach((o: any) => { try { o.stop(); o.disconnect(); } catch(e){} });
        (soundNodesRef.current as any).gain.disconnect();
        soundNodesRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend().catch(() => {});
      }
    }
    return () => {
       if (soundNodesRef.current) {
         (soundNodesRef.current as any).oscs.forEach((o: any) => { try { o.stop(); } catch(e){} });
       }
    }
  }, [soundEnabled]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const effectiveTime = mode === ClockMode.MANUAL 
        ? new Date(now.getTime() + manualTimeOffset)
        : now;
      setTimeState({
        hours: effectiveTime.getHours(),
        minutes: effectiveTime.getMinutes(),
        seconds: effectiveTime.getSeconds()
      });
      setSeparatorOn(effectiveTime.getMilliseconds() < 500);
    };
    updateTime();
    const timerId = setInterval(updateTime, 50);
    return () => clearInterval(timerId);
  }, [mode, manualTimeOffset]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.warn("Fullscreen error:", e);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const splitDigits = (num: number) => [Math.floor(num / 10), num % 10];
  const [h1, h2] = splitDigits(timeState.hours);
  const [m1, m2] = splitDigits(timeState.minutes);
  const [s1, s2] = splitDigits(timeState.seconds);

  let bgGradient = "";
  if (skin === ClockSkin.CLASSIC) {
    bgGradient = 'radial-gradient(circle at center, #1a0800 0%, #000000 70%)';
  } else if (skin === ClockSkin.LIGHT) {
    bgGradient = 'radial-gradient(circle at center, #001020 0%, #000510 50%, #000000 100%)';
  } else if (skin === ClockSkin.LED) {
    bgGradient = 'radial-gradient(circle at center, #1a1a1a 0%, #050505 80%)';
  } else {
    bgGradient = 'radial-gradient(circle at center, #050a14 0%, #000000 70%)';
  }

  const containerStyle = skin === ClockSkin.CLASSIC
    ? { boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)' }
    : (skin === ClockSkin.LIGHT 
        ? { boxShadow: '0 0 0 rgba(0,0,0,0)' } 
        : (skin === ClockSkin.LED 
            ? { boxShadow: '0 0 0 rgba(0,0,0,0)' } 
            : { boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,255,255,0.05), 0 0 60px rgba(0,200,255,0.05)' }));

  let containerBg = "";
  if (skin === ClockSkin.CLASSIC) {
    containerBg = "bg-black/30 border-white/5";
  } else if (skin === ClockSkin.LIGHT) {
    containerBg = "bg-transparent border-none";
  } else if (skin === ClockSkin.LED) {
     containerBg = "bg-transparent border-none";
  } else {
    containerBg = "bg-[#02060a]/50 border-cyan-500/10";
  }

  const uiBtnHoverClass = skin === ClockSkin.CYBER 
     ? 'hover:bg-cyan-500 hover:border-cyan-500 hover:shadow-cyan-500' 
     : (skin === ClockSkin.LIGHT 
        ? 'hover:bg-[#0088ff] hover:text-white hover:border-[#0088ff] hover:shadow-[#0088ff]' 
        : (skin === ClockSkin.LED ? 'hover:bg-[#d600ff] hover:text-white hover:border-[#d600ff] hover:shadow-[#d600ff]' : 'hover:bg-[#ff5500] hover:border-[#ff5500] hover:shadow-[#ff5500]'));

  return (
    <div 
      className="relative w-screen h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-['Share_Tech_Mono'] cursor-pointer"
      onClick={handleScreenClick}
    >
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none opacity-80" style={{ background: bgGradient }}></div>
      {skin === ClockSkin.LED && (
         <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#2a1a10] via-[#3d2b22] to-transparent pointer-events-none"></div>
      )}
      {(skin !== ClockSkin.LIGHT && skin !== ClockSkin.LED) && (
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t pointer-events-none from-black via-[#0f0f0f] to-transparent"></div>
      )}
      <div className="relative z-10 flex flex-col items-center transition-transform duration-500 ease-out origin-center scale-[0.55] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-[1.0] 2xl:scale-[1.2]">
        <div style={{ transform: `scale(${zoom})` }} className="flex flex-col items-center transition-transform duration-200 ease-out origin-center">
          {skin === ClockSkin.LED && (
              <div className="absolute bottom-2 inset-x-[-20px] h-16 bg-[#3d251e] border-t-2 border-[#5d3a2e] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-0"></div>
          )}
          <div className={`flex items-start justify-center p-2 sm:p-4 md:p-6 lg:p-8 rounded-3xl transition-all duration-500 ${containerBg}`} style={containerStyle}>
            <div className="flex z-10">
              <NixieTube value={h1} skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(0)} flickerEnabled={glitchEnabled} />
              <NixieTube value={h2} label="HOURS" skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(1)} flickerEnabled={glitchEnabled} />
            </div>
            <NeonSeparator on={separatorOn} skin={skin} colorMode={colorMode} customColor={getColorForIndex(2)} flickerEnabled={glitchEnabled} />
            <div className="flex z-10">
              <NixieTube value={m1} skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(3)} flickerEnabled={glitchEnabled} />
              <NixieTube value={m2} label="MINUTES" skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(4)} flickerEnabled={glitchEnabled} />
            </div>
            {precision === ClockPrecision.SECONDS && (
              <>
                <NeonSeparator on={separatorOn} skin={skin} colorMode={colorMode} customColor={getColorForIndex(5)} flickerEnabled={glitchEnabled} />
                <div className="flex z-10">
                  <NixieTube value={s1} skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(6)} flickerEnabled={glitchEnabled} />
                  <NixieTube value={s2} label="SECONDS" skin={skin} font={font} colorMode={colorMode} customColor={getColorForIndex(7)} flickerEnabled={glitchEnabled} />
                </div>
              </>
            )}
          </div>
          <div className={`h-16 w-full opacity-20 scale-y-[-0.5] bg-gradient-to-t from-transparent blur-xl mt-[-20px] pointer-events-none transition-colors duration-500
            ${skin === ClockSkin.CYBER ? 'to-cyan-600' : (skin === ClockSkin.LIGHT ? 'to-[#0055ff]' : (skin === ClockSkin.LED ? 'to-purple-500' : 'to-[#ff5500]'))}`}>
          </div>
        </div>
      </div>
      <div 
        className={`absolute bottom-8 right-8 z-30 flex gap-4 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setShowControls(true)} className={`p-3 rounded-full bg-gray-800/50 border border-gray-600 text-gray-300 hover:text-black hover:shadow-[0_0_15px] transition-all duration-300 ${uiBtnHoverClass}`} title="Settings">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
        <button onClick={toggleFullscreen} className="p-3 rounded-full bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300" title="Fullscreen">
          {isFullscreen ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
          )}
        </button>
      </div>
      {showControls && (
        <Controls 
          mode={mode} setMode={setMode} skin={skin} setSkin={setSkin} font={font} setFont={setFont} colorMode={colorMode} setColorMode={setColorMode} customColor={customColor} setCustomColor={setCustomColor} manualTimeOffset={manualTimeOffset} setManualTimeOffset={setManualTimeOffset} zoom={zoom} setZoom={setZoom} soundEnabled={soundEnabled} toggleSound={toggleSound} glitchEnabled={glitchEnabled} toggleGlitch={toggleGlitch} precision={precision} setPrecision={setPrecision} onClose={() => setShowControls(false)}
        />
      )}
    </div>
  );
};

// --- MOUNTING ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
