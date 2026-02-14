import React from 'react';

const NeonSeparator = ({ on = true, skin, colorMode, customColor, flickerEnabled }: any) => {
  const { useMemo } = React;
  
  // Access global enums
  const ClockSkin = (window as any).ClockSkin;
  const ClockColorMode = (window as any).ClockColorMode;

  const isClassic = skin === ClockSkin.CLASSIC;
  const isLight = skin === ClockSkin.LIGHT;
  const isLED = skin === ClockSkin.LED;
  
  const animationDelay = useMemo(() => `-${Math.random() * 5}s`, []);

  let activeStyle: React.CSSProperties = {};

  // Treat Rainbow mode same as Fixed mode (using the dynamic `customColor` from props)
  if (colorMode === ClockColorMode.FIXED || colorMode === ClockColorMode.RAINBOW) {
    activeStyle = {
        backgroundColor: customColor,
        boxShadow: `0 0 4px ${customColor}, 0 0 8px ${customColor}, 0 0 16px ${customColor}`,
        opacity: 1,
    };
  } else {
    // Default
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

  // Animation Construction
  const animList: string[] = [];
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
(window as any).NeonSeparator = NeonSeparator;