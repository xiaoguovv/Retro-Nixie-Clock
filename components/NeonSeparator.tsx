import React, { useMemo } from 'react';
import { ClockSkin, ClockColorMode } from '../types';

interface NeonSeparatorProps {
  on?: boolean;
  skin: ClockSkin;
  colorMode: ClockColorMode;
  customColor: string;
  flickerEnabled?: boolean;
}

const NeonSeparator: React.FC<NeonSeparatorProps> = ({ on = true, skin, colorMode, customColor, flickerEnabled }) => {
  const isClassic = skin === ClockSkin.CLASSIC;
  const isLight = skin === ClockSkin.LIGHT;
  const isLED = skin === ClockSkin.LED;
  
  // Random delay for glitch so separator doesn't sync perfectly with tubes
  const animationDelay = useMemo(() => `-${Math.random() * 5}s`, []);
  const flickerClass = flickerEnabled ? 'voltage-flicker' : '';

  let activeStyle: React.CSSProperties = {};
  let activeClass = "";

  if (colorMode === ClockColorMode.RAINBOW) {
    activeClass = "rainbow-bg";
    activeStyle = { opacity: 1 };
  } else if (colorMode === ClockColorMode.FIXED) {
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
        // Cyber Default
         activeStyle = {
            backgroundColor: '#ffcccc',
            boxShadow: `0 0 4px #ff3333, 0 0 8px #ff0000, 0 0 16px #cc0000`,
            opacity: 1,
        };
    }
  }

  const inactiveStyle = {
    backgroundColor: (isClassic) ? '#3a2222' : (isLight ? '#4a3020' : '#2a2020'),
    boxShadow: 'none',
    opacity: isLight ? 0.2 : 0.2,
  };

  let containerClasses = "";
  if (isClassic) {
    containerClasses = "bg-[#0a0505] border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,1)]";
  } else if (isLight) {
    containerClasses = "bg-[#02050a]/90 border border-[#2060ff]/50 shadow-[0_0_8px_rgba(0,100,255,0.4),inset_0_0_10px_rgba(0,40,100,0.6)] backdrop-blur-sm";
  } else if (isLED) {
    // Rectangular small block for separator
    containerClasses = "bg-black/40 border-x-4 border-[#111] backdrop-blur-sm rounded-sm";
  } else {
    containerClasses = "bg-[#000810]/60 border-cyan-400/20 shadow-[inset_0_0_10px_rgba(0,255,255,0.05)]";
  }

  if (isLED) {
    return (
        <div className="relative flex flex-col justify-center items-center h-32 sm:h-40 md:h-56 lg:h-64 gap-2 sm:gap-3 md:gap-4 mx-1 sm:mx-2 py-4">
            <div className={`relative w-6 h-8 sm:h-10 border-t border-b border-[#222] flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
                 {/* Top Cap */}
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#222]"></div>
                 {/* Dot - Increased size */}
                 <div 
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ease-in-out ${on && activeClass ? activeClass : ''} ${on && flickerEnabled ? flickerClass : ''}`}
                  style={{ ...(on ? activeStyle : inactiveStyle), animationDelay }}
                 />
            </div>
            <div className={`relative w-6 h-8 sm:h-10 border-t border-b border-[#222] flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
                 {/* Top Cap */}
                 <div className="absolute top-0 inset-x-0 h-1 bg-[#222]"></div>
                 {/* Dot - Increased size */}
                 <div 
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-100 ease-in-out ${on && activeClass ? activeClass : ''} ${on && flickerEnabled ? flickerClass : ''}`}
                  style={{ ...(on ? activeStyle : inactiveStyle), animationDelay }}
                 />
            </div>
        </div>
    )
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-32 sm:h-40 md:h-56 lg:h-64 gap-2 sm:gap-3 md:gap-4 mx-1 sm:mx-2 py-4">
      {/* Top Dot Bulb */}
      <div className={`relative w-4 h-8 sm:w-6 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
        {/* Reflection */}
        <div className={`absolute top-1 left-1 w-0.5 h-2 blur-[0.5px] rounded-full ${isLight ? 'bg-[#80b0ff]/60' : 'bg-white/40'}`}></div>
        {/* Filament - Increased size */}
        <div 
          className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-100 ease-in-out ${on && activeClass ? activeClass : ''} ${on && flickerEnabled ? flickerClass : ''}`}
          style={{ ...(on ? activeStyle : inactiveStyle), animationDelay }}
        />
      </div>

      {/* Bottom Dot Bulb */}
      <div className={`relative w-4 h-8 sm:w-6 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
        {/* Reflection */}
        <div className={`absolute top-1 left-1 w-0.5 h-2 blur-[0.5px] rounded-full ${isLight ? 'bg-[#80b0ff]/60' : 'bg-white/40'}`}></div>
        {/* Filament - Increased size */}
        <div 
          className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-100 ease-in-out ${on && activeClass ? activeClass : ''} ${on && flickerEnabled ? flickerClass : ''}`}
          style={{ ...(on ? activeStyle : inactiveStyle), animationDelay }}
        />
      </div>
    </div>
  );
};

export default NeonSeparator;