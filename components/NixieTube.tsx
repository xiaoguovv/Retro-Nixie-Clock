
const NixieTube = ({ value, label, skin, font, colorMode, customColor, flickerEnabled }: any) => {
  const { useMemo } = React;
  
  // Access global enums
  const ClockSkin = (window as any).ClockSkin;
  const ClockFont = (window as any).ClockFont;
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

  let currentTextShadow: string | undefined;
  let currentStroke: string | undefined;
  let currentColor: string | undefined;

  // With JS-based rainbow, we treat RAINBOW mode exactly like FIXED mode.
  if (colorMode === ClockColorMode.FIXED || colorMode === ClockColorMode.RAINBOW) {
    const c = customColor; 
    currentTextShadow = `0 0 5px ${c}, 0 0 10px ${c}, 0 0 20px ${c}, 0 0 40px ${c}, 0 0 70px ${c}`;
    currentColor = c; 
    currentStroke = `0.03em ${c}`;
  } else {
    // Default Skins
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

  // Animation Construction
  const animList: string[] = [];
  const delay = flickerEnabled ? animationDelay : '0s';
  
  animList.push(`flicker 0.1s infinite alternate ${delay}`);

  if (flickerEnabled) {
    animList.push(`unstable-voltage 4s infinite ${delay}`);
  }

  const activeStyle: React.CSSProperties = {
    fontFamily: `"${font}", monospace`,
    color: currentColor, 
    textShadow: currentTextShadow,
    WebkitTextStroke: currentStroke,
    opacity: 1,
    zIndex: 30,
    filter: isLED ? 'contrast(1.2)' : 'blur(0.4px) contrast(1.3)',
    animation: animList.join(', '),
  };

  const inactiveStyle: React.CSSProperties = {
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
(window as any).NixieTube = NixieTube;
