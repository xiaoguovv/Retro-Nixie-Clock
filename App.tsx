import React, { useState, useEffect, useCallback, useRef } from 'react';
import NixieTube from './components/NixieTube';
import NeonSeparator from './components/NeonSeparator';
import Controls from './components/Controls';
import { ClockMode, ClockSkin, TimeState, ClockFont, ClockColorMode, ClockPrecision } from './types';

function App() {
  const [mode, setMode] = useState<ClockMode>(ClockMode.AUTO);
  const [skin, setSkin] = useState<ClockSkin>(ClockSkin.CLASSIC);
  const [font, setFont] = useState<ClockFont>(ClockFont.NIXIE_ONE);
  
  // Color configuration
  const [colorMode, setColorMode] = useState<ClockColorMode>(ClockColorMode.DEFAULT);
  const [customColor, setCustomColor] = useState<string>('#00ff00'); // Default Green for custom

  const [manualTimeOffset, setManualTimeOffset] = useState<number>(0); // in milliseconds
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Scale / Zoom factor (1 = default responsive size)
  const [zoom, setZoom] = useState<number>(1);

  // Sound & Effects State
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [glitchEnabled, setGlitchEnabled] = useState(false);
  
  // Precision State (Seconds vs Minutes)
  const [precision, setPrecision] = useState<ClockPrecision>(ClockPrecision.SECONDS);

  // UI Visibility State (Hidden by default for simulation feel)
  const [uiVisible, setUiVisible] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<any>(null);

  const [timeState, setTimeState] = useState<TimeState>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [separatorOn, setSeparatorOn] = useState(true);

  // Sound Toggle Handler
  const toggleSound = useCallback(() => {
    // If we are turning it on, ensure Context is created/resumed within user gesture
    if (!soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(e => console.warn("Audio resume failed", e));
        }
      } catch (e) {
        console.error("Audio init failed", e);
      }
    }
    setSoundEnabled(prev => !prev);
  }, [soundEnabled]);

  // Glitch Toggle Handler
  const toggleGlitch = useCallback(() => {
    setGlitchEnabled(prev => !prev);
  }, []);

  // Screen Click Handler for Toggling UI
  const handleScreenClick = useCallback(() => {
    setUiVisible(prev => !prev);
  }, []);

  // Sound Effect Logic
  useEffect(() => {
    if (soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        
        // Safety resume
        if (ctx.state === 'suspended') {
          ctx.resume().catch(e => {});
        }

        // Master Gain for Effect
        const masterGain = ctx.createGain();
        // Increased volume significantly so it is audible on tablets
        masterGain.gain.value = 0.15; 
        masterGain.connect(ctx.destination);

        // Oscillator 1: Mains Hum (Sawtooth for buzz character)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = 55; // Slightly offset from 50Hz for richer sound

        // Filter 1: Lowpass 
        // Increased cutoff to 600Hz (was 120Hz). 
        // Small speakers cannot play 50Hz. They need the upper harmonics (100-500Hz) to be heard.
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600; 
        filter.Q.value = 1;

        osc1.connect(filter);
        filter.connect(masterGain);
        osc1.start();

        // Oscillator 2: High frequency inverter whine
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        // Lowered to 8kHz (was 14kHz) to be more universally audible and less harsh, 
        // while still sounding like a capacitor whine.
        osc2.frequency.value = 8000; 
        
        const gain2 = ctx.createGain();
        gain2.gain.value = 0.03; // Keep the whine subtle relative to the hum
        
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start();

        soundNodesRef.current = { oscs: [osc1, osc2], gain: masterGain };

      } catch (e) {
        console.error("Audio setup error", e);
      }
    } else {
      // Cleanup nodes
      if (soundNodesRef.current) {
        soundNodesRef.current.oscs.forEach((o: any) => {
          try { o.stop(); o.disconnect(); } catch(e){}
        });
        soundNodesRef.current.gain.disconnect();
        soundNodesRef.current = null;
      }
      
      // Suspend context to save battery
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend().catch(e => {});
      }
    }

    return () => {
       // Cleanup on unmount
       if (soundNodesRef.current) {
         soundNodesRef.current.oscs.forEach((o: any) => {
            try { o.stop(); } catch(e){}
         });
       }
    }
  }, [soundEnabled]);

  // Main Clock Tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // If manual mode, add the offset to current system time
      const effectiveTime = mode === ClockMode.MANUAL 
        ? new Date(now.getTime() + manualTimeOffset)
        : now;

      setTimeState({
        hours: effectiveTime.getHours(),
        minutes: effectiveTime.getMinutes(),
        seconds: effectiveTime.getSeconds()
      });

      // Synchronize separator blinking: ON for first 500ms, OFF for next 500ms
      // This ensures it blinks exactly when the second changes
      setSeparatorOn(effectiveTime.getMilliseconds() < 500);
    };

    // Update immediately
    updateTime();

    // High precision timer to minimize drift and keep blinking tight
    const timerId = setInterval(updateTime, 50);

    return () => clearInterval(timerId);
  }, [mode, manualTimeOffset]);

  // Handle Fullscreen
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

  // Split digits helper
  const splitDigits = (num: number) => {
    return [Math.floor(num / 10), num % 10];
  };

  const [h1, h2] = splitDigits(timeState.hours);
  const [m1, m2] = splitDigits(timeState.minutes);
  const [s1, s2] = splitDigits(timeState.seconds);

  // Determine global background based on skin
  let bgGradient = "";
  if (skin === ClockSkin.CLASSIC) {
    bgGradient = 'radial-gradient(circle at center, #1a0800 0%, #000000 70%)';
  } else if (skin === ClockSkin.LIGHT) {
    // Blue/Black void for blue glass look
    bgGradient = 'radial-gradient(circle at center, #001020 0%, #000510 50%, #000000 100%)';
  } else if (skin === ClockSkin.LED) {
    // Dark matte desk look
    bgGradient = 'radial-gradient(circle at center, #1a1a1a 0%, #050505 80%)';
  } else {
    bgGradient = 'radial-gradient(circle at center, #050a14 0%, #000000 70%)';
  }

  // Container Shadow styles
  const containerStyle = skin === ClockSkin.CLASSIC
    ? { boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)' }
    : (skin === ClockSkin.LIGHT 
        // Subtle blue ambient glow for the container group
        ? { boxShadow: '0 0 0 rgba(0,0,0,0)' } 
        : (skin === ClockSkin.LED 
            ? { boxShadow: '0 0 0 rgba(0,0,0,0)' } 
            : { boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,255,255,0.05), 0 0 60px rgba(0,200,255,0.05)' }));

  let containerBg = "";
  if (skin === ClockSkin.CLASSIC) {
    containerBg = "bg-black/30 border-white/5";
  } else if (skin === ClockSkin.LIGHT) {
    // Transparent/Invisible container for the floating tubes look
    containerBg = "bg-transparent border-none";
  } else if (skin === ClockSkin.LED) {
     // LED skin is self-contained with its base
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
      
      {/* Background Ambience */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none opacity-80" 
           style={{ background: bgGradient }}></div>
      
      {/* Wood/Metal Base Platform (Visual element) */}
      {/* LED Skin Base */}
      {skin === ClockSkin.LED && (
         <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#2a1a10] via-[#3d2b22] to-transparent pointer-events-none"></div>
      )}
      
      {/* Standard Base */}
      {(skin !== ClockSkin.LIGHT && skin !== ClockSkin.LED) && (
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t pointer-events-none from-black via-[#0f0f0f] to-transparent"></div>
      )}

      {/* Main Clock Container */}
      {/* This outer div handles responsive scaling */}
      <div className="relative z-10 flex flex-col items-center transition-transform duration-500 ease-out origin-center
          scale-[0.55] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.85] xl:scale-[1.0] 2xl:scale-[1.2]">
        
        {/* Inner Zoom Wrapper - Handles user manual zoom */}
        <div 
          style={{ transform: `scale(${zoom})` }} 
          className="flex flex-col items-center transition-transform duration-200 ease-out origin-center"
        >
          {/* LED Skin Wood Base Platform */}
          {skin === ClockSkin.LED && (
              <div className="absolute bottom-2 inset-x-[-20px] h-16 bg-[#3d251e] border-t-2 border-[#5d3a2e] rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-0"></div>
          )}

          {/* The Tubes */}
          <div className={`flex items-start justify-center p-2 sm:p-4 md:p-6 lg:p-8 rounded-3xl transition-all duration-500 ${containerBg}`}
               style={containerStyle}>
            
            {/* Hours */}
            <div className="flex z-10">
              <NixieTube value={h1} skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
              <NixieTube value={h2} label="HOURS" skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
            </div>

            <NeonSeparator on={separatorOn} skin={skin} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />

            {/* Minutes */}
            <div className="flex z-10">
              <NixieTube value={m1} skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
              <NixieTube value={m2} label="MINUTES" skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
            </div>

            {/* Seconds (Conditional) */}
            {precision === ClockPrecision.SECONDS && (
              <>
                <NeonSeparator on={separatorOn} skin={skin} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />

                <div className="flex z-10">
                  <NixieTube value={s1} skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
                  <NixieTube value={s2} label="SECONDS" skin={skin} font={font} colorMode={colorMode} customColor={customColor} flickerEnabled={glitchEnabled} />
                </div>
              </>
            )}

          </div>

          {/* Reflection on surface */}
          <div className={`h-16 w-full opacity-20 scale-y-[-0.5] bg-gradient-to-t from-transparent blur-xl mt-[-20px] pointer-events-none transition-colors duration-500
            ${skin === ClockSkin.CYBER ? 'to-cyan-600' : (skin === ClockSkin.LIGHT ? 'to-[#0055ff]' : (skin === ClockSkin.LED ? 'to-purple-500' : 'to-[#ff5500]'))}`}>
          </div>
        </div>
      </div>

      {/* UI Controls (Floating Action Buttons) */}
      <div 
        className={`absolute bottom-8 right-8 z-30 flex gap-4 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Settings Toggle */}
        <button 
          onClick={() => setShowControls(true)}
          className={`p-3 rounded-full bg-gray-800/50 border border-gray-600 text-gray-300 hover:text-black hover:shadow-[0_0_15px] transition-all duration-300
            ${uiBtnHoverClass}`}
          title="Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>

        {/* Fullscreen Toggle */}
        <button 
          onClick={toggleFullscreen}
          className="p-3 rounded-full bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300"
          title="Fullscreen"
        >
          {isFullscreen ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
          )}
        </button>
      </div>

      {/* Settings Modal */}
      {showControls && (
        <Controls 
          mode={mode} 
          setMode={setMode}
          skin={skin}
          setSkin={setSkin}
          font={font}
          setFont={setFont}
          colorMode={colorMode}
          setColorMode={setColorMode}
          customColor={customColor}
          setCustomColor={setCustomColor}
          manualTimeOffset={manualTimeOffset} 
          setManualTimeOffset={setManualTimeOffset}
          zoom={zoom}
          setZoom={setZoom}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          glitchEnabled={glitchEnabled}
          toggleGlitch={toggleGlitch}
          precision={precision}
          setPrecision={setPrecision}
          onClose={() => setShowControls(false)}
        />
      )}
    </div>
  );
}

export default App;