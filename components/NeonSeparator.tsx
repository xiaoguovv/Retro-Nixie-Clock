import React, { useState, useEffect } from 'react';
import { ClockSkin, ClockColorMode } from '../types';

const NeonSeparator = ({ on, skin, colorMode, customColor, flickerEnabled }: any) => {
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

  const isOn = on && !flicker;

  const dotStyle = {
    backgroundColor: isOn ? baseColor : 'transparent',
    boxShadow: isOn 
      ? `0 0 10px ${glowColor}, 0 0 20px ${shadowColor}` 
      : 'none',
    borderColor: isOn ? baseColor : 'rgba(255,255,255,0.1)',
    transition: 'all 0.1s ease-in-out'
  };

  if (isLED) {
    return (
      <div className="flex flex-col justify-center items-center px-1 sm:px-2 h-24 sm:h-32 md:h-40 lg:h-48">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div 
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/10"
            style={dotStyle}
          ></div>
          <div 
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/10"
            style={dotStyle}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-1 sm:px-2 h-24 sm:h-32 md:h-40 lg:h-48">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div 
          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/10"
          style={dotStyle}
        ></div>
        <div 
          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white/10"
          style={dotStyle}
        ></div>
      </div>
    </div>
  );
};

export default NeonSeparator;
