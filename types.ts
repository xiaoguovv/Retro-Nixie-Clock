
// Types and Enums
// Attached to window to ensure global availability in browser-only runtime

interface Window {
  ClockMode: {
    AUTO: string;
    MANUAL: string;
  };
  ClockSkin: {
    CLASSIC: string;
    CYBER: string;
    LIGHT: string;
    LED: string;
  };
  ClockFont: {
    NIXIE_ONE: string;
    SHARE_TECH: string;
    ORBITRON: string;
    WALLPOET: string;
  };
  ClockColorMode: {
    DEFAULT: string;
    FIXED: string;
    RAINBOW: string;
  };
  ClockPrecision: {
    SECONDS: string;
    MINUTES: string;
  };
  // Components attached to window
  NixieTube: any;
  NeonSeparator: any;
  Controls: any;
  App: any;
}

window.ClockMode = {
  AUTO: 'AUTO',
  MANUAL: 'MANUAL'
};

window.ClockSkin = {
  CLASSIC: 'CLASSIC',
  CYBER: 'CYBER',
  LIGHT: 'LIGHT',
  LED: 'LED'
};

window.ClockFont = {
  NIXIE_ONE: 'Nixie One',
  SHARE_TECH: 'Share Tech Mono',
  ORBITRON: 'Orbitron',
  WALLPOET: 'Wallpoet'
};

window.ClockColorMode = {
  DEFAULT: 'DEFAULT',
  FIXED: 'FIXED',
  RAINBOW: 'RAINBOW'
};

window.ClockPrecision = {
  SECONDS: 'SECONDS',
  MINUTES: 'MINUTES'
};