// Thin-stroke icon set, Apple-Books-adjacent.
import React from 'react';

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.5 }) {
  const s = {
    width: size,
    height: size,
    stroke: color,
    strokeWidth,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (name) {
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case 'bookmark':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M6 3h12v18l-6-4-6 4V3z" />
        </svg>
      );
    case 'aa':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 18l4-12 4 12M4.5 14h5M13 18l4-12 4 12M14.5 14h5" />
        </svg>
      );
    case 'theme':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a8 8 0 010 16" />
        </svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0116 0" />
        </svg>
      );
    case 'close':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'chev-l':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M15 5l-7 7 7 7" />
        </svg>
      );
    case 'chev-r':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
          <path d="M8 3v18" />
        </svg>
      );
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 5c-2 3-5 4-7 4 0 4 3 7 7 7s7-3 7-7c-2 0-5-1-7-4z" />
          <path d="M12 5c-1 2-1 4 0 6M12 5c1 2 1 4 0 6" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'minus':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12h14" />
        </svg>
      );
    case 'logout':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l-5-5 5-5M5 12h12" />
        </svg>
      );
    case 'bookmarkFill':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke="none">
          <path d="M6 3h12v18l-6-4-6 4V3z" />
        </svg>
      );
    case 'note':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 4h12l4 4v12H4z" />
          <path d="M16 4v4h4" />
          <path d="M8 12h8M8 16h5" />
        </svg>
      );
    case 'index':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 5h10M4 12h16M4 19h12" />
          <circle cx="20" cy="5" r="1" fill={color} stroke="none" />
          <circle cx="20" cy="19" r="1" fill={color} stroke="none" />
          <circle cx="18" cy="12" r="1" fill={color} stroke="none" />
        </svg>
      );
    case 'library':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
          <path d="M8 3v18" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M7 3h10v18l-5-4-5 4z" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12l5 5 9-11" />
        </svg>
      );
    default:
      return null;
  }
}
