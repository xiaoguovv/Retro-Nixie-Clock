
// We use (window as any) assignments to ensure these are available globally across files
// when running without a bundler.

interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

enum ClockMode {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}
(window as any).ClockMode = ClockMode;

enum ClockSkin {
  CLASSIC = 'CLASSIC',
  CYBER = 'CYBER',
  LIGHT = 'LIGHT',
  LED = 'LED',
}
(window as any).ClockSkin = ClockSkin;

enum ClockFont {
  NIXIE_ONE = 'Nixie One',
  SHARE_TECH = 'Share Tech Mono',
  ORBITRON = 'Orbitron',
  WALLPOET = 'Wallpoet',
}
(window as any).ClockFont = ClockFont;

enum ClockColorMode {
  DEFAULT = 'DEFAULT',
  FIXED = 'FIXED',
  RAINBOW = 'RAINBOW',
}
(window as any).ClockColorMode = ClockColorMode;

enum ClockPrecision {
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
}
(window as any).ClockPrecision = ClockPrecision;
