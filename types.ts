export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

export enum ClockMode {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}

export enum ClockSkin {
  CLASSIC = 'CLASSIC',
  CYBER = 'CYBER',
  LIGHT = 'LIGHT',
  LED = 'LED',
}

export enum ClockFont {
  NIXIE_ONE = 'Nixie One',
  SHARE_TECH = 'Share Tech Mono',
  ORBITRON = 'Orbitron',
  WALLPOET = 'Wallpoet',
}

export enum ClockColorMode {
  DEFAULT = 'DEFAULT',
  FIXED = 'FIXED',
  RAINBOW = 'RAINBOW',
}

export enum ClockPrecision {
  SECONDS = 'SECONDS',
  MINUTES = 'MINUTES',
}