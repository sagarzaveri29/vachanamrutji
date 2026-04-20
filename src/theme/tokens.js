// Theme tokens for Vachanamrut Ji reader.
// Paper-warm, serif, Apple Books-inspired with optional devotional depth.

export const THEMES = {
  paper: {
    id: 'paper',
    name: 'Paper',
    bg: '#F5EFE4',
    page: '#FBF6EC',
    ink: '#2A2622',
    inkSoft: '#5C524A',
    inkMuted: '#8A7F73',
    rule: 'rgba(42,38,34,0.10)',
    ruleStrong: 'rgba(42,38,34,0.22)',
    accent: '#9B5A2A',
    accentSoft: 'rgba(155,90,42,0.10)',
    highlight: 'rgba(226,178,95,0.38)',
    shadow: '0 1px 2px rgba(60,40,20,0.05), 0 12px 36px rgba(60,40,20,0.08)',
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia',
    bg: '#E9DDC6',
    page: '#F2E6CD',
    ink: '#3D2E1F',
    inkSoft: '#6B553D',
    inkMuted: '#9B8468',
    rule: 'rgba(61,46,31,0.14)',
    ruleStrong: 'rgba(61,46,31,0.28)',
    accent: '#8A4A1F',
    accentSoft: 'rgba(138,74,31,0.12)',
    highlight: 'rgba(210,158,75,0.42)',
    shadow: '0 1px 2px rgba(60,40,20,0.07), 0 12px 36px rgba(60,40,20,0.10)',
  },
  light: {
    id: 'light',
    name: 'Light',
    bg: '#F2F2F0',
    page: '#FFFFFF',
    ink: '#1C1C1E',
    inkSoft: '#4B4B50',
    inkMuted: '#86868B',
    rule: 'rgba(0,0,0,0.08)',
    ruleStrong: 'rgba(0,0,0,0.18)',
    accent: '#B85C20',
    accentSoft: 'rgba(184,92,32,0.10)',
    highlight: 'rgba(255,214,102,0.45)',
    shadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 36px rgba(0,0,0,0.06)',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    bg: '#0E0E10',
    page: '#17171A',
    ink: '#EDE7DC',
    inkSoft: '#B4ADA3',
    inkMuted: '#7E7A72',
    rule: 'rgba(255,240,210,0.10)',
    ruleStrong: 'rgba(255,240,210,0.22)',
    accent: '#E0A867',
    accentSoft: 'rgba(224,168,103,0.14)',
    highlight: 'rgba(224,168,103,0.32)',
    shadow: '0 1px 2px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.5)',
  },
  saffron: {
    id: 'saffron',
    name: 'Saffron',
    bg: '#EBDBC1',
    page: '#F6E8CE',
    ink: '#3A1F0A',
    inkSoft: '#6A4420',
    inkMuted: '#A07A4E',
    rule: 'rgba(58,31,10,0.14)',
    ruleStrong: 'rgba(58,31,10,0.3)',
    accent: '#B6481A',
    accentSoft: 'rgba(182,72,26,0.14)',
    highlight: 'rgba(212,140,52,0.4)',
    shadow: '0 1px 2px rgba(80,40,10,0.07), 0 16px 40px rgba(80,40,10,0.12)',
  },
};

export const GUJ_FONTS = {
  noto: {
    id: 'noto',
    name: 'Noto Serif Gujarati',
    stack: '"Noto Serif Gujarati", "Shree Devanagari 714", "Mangal", serif',
  },
  hind: {
    id: 'hind',
    name: 'Hind Vadodara',
    stack: '"Hind Vadodara", "Noto Sans Gujarati", system-ui, sans-serif',
  },
  mukta: {
    id: 'mukta',
    name: 'Mukta Vaani',
    stack: '"Mukta Vaani", "Noto Sans Gujarati", system-ui, sans-serif',
  },
  rasa: {
    id: 'rasa',
    name: 'Rasa',
    stack: '"Rasa", "Noto Serif Gujarati", serif',
  },
};

export const UI_SERIF =
  '"Cormorant Garamond", "Iowan Old Style", "Palatino", "Georgia", serif';
export const UI_SANS =
  '-apple-system, "SF Pro Text", "Inter", system-ui, sans-serif';
