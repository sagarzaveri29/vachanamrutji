import React from 'react';
import { THEMES, GUJ_FONTS, UI_SERIF, UI_SANS } from '../theme/tokens';
import { Icon } from './Icon';

export function SettingsModal({ theme, settings, updateSettings, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.32)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 380,
          background: theme.page,
          border: `0.5px solid ${theme.rule}`,
          borderRadius: 14,
          boxShadow: theme.shadow,
          overflow: 'hidden',
          color: theme.ink,
          fontFamily: UI_SANS,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: `0.5px solid ${theme.rule}`,
          }}
        >
          <div style={{ fontFamily: UI_SERIF, fontStyle: 'italic', fontSize: 18 }}>
            Display
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: theme.inkSoft,
              display: 'inline-flex',
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div style={{ padding: '18px 20px 24px' }}>
          {/* Theme */}
          <Row label="Theme" theme={theme}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.values(THEMES).map((t) => (
                <div
                  key={t.id}
                  onClick={() => updateSettings({ themeId: t.id })}
                  title={t.name}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    background: t.page,
                    cursor: 'pointer',
                    border:
                      settings.themeId === t.id
                        ? `2px solid ${theme.accent}`
                        : `0.5px solid ${theme.ruleStrong}`,
                  }}
                />
              ))}
            </div>
          </Row>

          {/* Gujarati font */}
          <Row label="Gujarati font" theme={theme}>
            <select
              value={settings.gujFont}
              onChange={(e) => updateSettings({ gujFont: e.target.value })}
              style={selectStyle(theme)}
            >
              {Object.values(GUJ_FONTS).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </Row>

          {/* Font size */}
          <Row label="Font size" theme={theme}>
            <input
              type="range"
              min={14}
              max={26}
              value={settings.fontSize}
              onChange={(e) =>
                updateSettings({ fontSize: Number(e.target.value) })
              }
              style={{ width: 140 }}
            />
            <div
              style={{
                width: 30,
                textAlign: 'right',
                fontSize: 12,
                color: theme.inkMuted,
                marginLeft: 8,
              }}
            >
              {settings.fontSize}
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children, theme }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        gap: 12,
        fontSize: 13,
      }}
    >
      <div style={{ color: theme.inkSoft }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

function selectStyle(theme) {
  return {
    background: 'transparent',
    color: theme.ink,
    border: `0.5px solid ${theme.ruleStrong}`,
    borderRadius: 6,
    padding: '4px 8px',
    fontSize: 12,
    fontFamily: UI_SANS,
  };
}
