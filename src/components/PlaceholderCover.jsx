import React from 'react';
import { UI_SERIF } from '../theme/tokens';

export function PlaceholderCover({ label = '', tone = 'saffron', theme, tall = false }) {
  const palettes = {
    saffron: { bg: '#E9C9A2', ink: '#6B3012', border: '#B5773E' },
    sepia: { bg: '#E2D4B5', ink: '#4C3A22', border: '#8F7147' },
    ivory: { bg: '#EEE6D3', ink: '#3A2E20', border: '#9A8763' },
    dark: { bg: '#26231F', ink: '#E4CDA2', border: '#5A4A32' },
  };
  const p = palettes[tone] || palettes.saffron;
  const w = tall ? 168 : 124;
  const h = tall ? 252 : 186;

  return (
    <div
      style={{
        width: w,
        height: h,
        background: p.bg,
        border: `0.5px solid ${p.border}`,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme?.shadow || '0 8px 22px rgba(60,40,20,0.14)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle ornamental top/bottom rules */}
      <div style={{ position: 'absolute', left: 10, right: 10, top: 12, height: 1, background: p.border, opacity: 0.5 }} />
      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 12, height: 1, background: p.border, opacity: 0.5 }} />
      <div
        style={{
          fontFamily: UI_SERIF,
          fontStyle: 'italic',
          color: p.ink,
          textAlign: 'center',
          fontSize: tall ? 19 : 15,
          lineHeight: 1.25,
          whiteSpace: 'pre-line',
          padding: '0 14px',
        }}
      >
        {label}
      </div>
    </div>
  );
}
