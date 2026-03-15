import React, { useState, useEffect } from 'react';
import { ClockSkin, ClockFont, ClockColorMode } from '../types';

const NixieTube = ({ value, label, skin, font, colorMode, customColor, flickerEnabled }: any) => {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    if (!flickerEnabled) {
      setFlicker(false);
      return;
    }
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 50 + Math.random() * 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [flickerEnabled]);

  const isCyber = skin === ClockSkin.CYBER;
  const isLight = skin === ClockSkin.LIGHT;
  const isLED = skin === ClockSkin.LED;

  let baseColor = '#ff5500';
  let glowColor = 'rgba(255, 85, 0, 0.8)';
  let shadowColor = 'rgba(255, 85, 0, 0.4)';

  if (colorMode === ClockColorMode.FIXED || colorMode === ClockColorMode.RAINBOW) {
    baseColor = customColor;
    glowColor = customColor;
    shadowColor = customColor;
  } else {
    if (isCyber) {
      baseColor = '#00ffff';
      glowColor = 'rgba(0, 255, 255, 0.8)';
      shadowColor = 'rgba(0, 255, 255, 0.4)';
    } else if (isLight) {
      baseColor = '#0088ff';
      glowColor = 'rgba(0, 136, 255, 0.8)';
      shadowColor = 'rgba(0, 136, 255, 0.4)';
    } else if (isLED) {
      baseColor = '#d600ff';
      glowColor = 'rgba(214, 0, 255, 0.8)';
      shadowColor = 'rgba(214, 0, 255, 0.4)';
    }
  }

  const activeStyle = {
    color: baseColor,
    textShadow: `0 0 10px ${glowColor}, 0 0 20px ${shadowColor}, 0 0 30px ${shadowColor}`,
    opacity: flicker ? 0.5 : 1,
    zIndex: 10
  };

  const inactiveStyle = {
    color: 'rgba(255, 255, 255, 0.05)',
    textShadow: 'none',
    opacity: 0.2,
    zIndex: 1
  };

  let fontClass = "font-['Share_Tech_Mono']";
  if (font === ClockFont.NIXIE_ONE) fontClass = "font-['Nixie_One']";
  else if (font === ClockFont.ORBITRON) fontClass = "font-['Orbitron']";
  else if (font === ClockFont.WALLPOET) fontClass = "font-['Wallpoet']";

  if (isLED) {
    return (
      <div className="relative flex flex-col items-center mx-1 sm:mx-2 group">
        <div className="relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-40 lg:w-28 lg:h-48 bg-[#1a1a1a] border-2 border-[#333] rounded-sm overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxMTEiLz48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzIyMiIvPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className={`absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl ${fontClass} transition-all duration-100`}
               style={activeStyle}>
            {value}
          </div>
        </div>
        
        {label && (
          <div className="absolute -bottom-6 text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-bold">
            {label}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center mx-1 sm:mx-2 group">
      <div className={`relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-40 lg:w-28 lg:h-48 rounded-full overflow-hidden flex items-center justify-center
          ${isCyber ? 'bg-[#001122]/80 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(0,255,255,0.1)]' : 
           (isLight ? 'bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' : 
            'bg-black/60 border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]')}`}>
        
        {/* Glass reflection */}
        <div className="absolute top-0 left-2 w-4 h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 pointer-events-none"></div>
        <div className="absolute top-2 right-4 w-2 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-[1px] pointer-events-none"></div>

        {/* Mesh background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InRyYW5zcGFyZW50Ii8+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>

        {/* Digits 0-9 stacked */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div 
            key={num}
            className={`absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl ${fontClass} transition-all duration-100`}
            style={num === value ? activeStyle : inactiveStyle}
          >
            {num}
          </div>
        ))}
      </div>
      
      {/* Base/Socket */}
      <div className={`w-12 h-4 sm:w-16 sm:h-6 md:w-20 md:h-8 lg:w-24 lg:h-10 mt-1 rounded-b-xl shadow-lg
          ${isCyber ? 'bg-gray-800 border-t-2 border-cyan-500/50' : 
           (isLight ? 'bg-gray-300 border-t border-gray-400' : 
            'bg-[#1a1a1a] border-t border-[#333]')}`}>
        <div className="w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-sm"></div>
      </div>

      {label && (
        <div className="absolute -bottom-6 text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-bold">
          {label}
        </div>
      )}
    </div>
  );
};

export default NixieTube;
