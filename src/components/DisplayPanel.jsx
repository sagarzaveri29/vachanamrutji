import React from 'react';
import { THEMES, GUJ_FONTS, UI_SERIF, UI_SANS } from '../theme/tokens';

// Popover panel anchored to the Aa button in the reader top bar.
// Matches the screenshot design:
//  - two size preset boxes (smaller / larger Aa, with "17pt" label)
//  - theme swatches row
//  - Gujarati font dropdown
//  - Layout toggle: 1-up / 2-up
//  - Page turn: Slide / Curl / Fade
//  - Margin metadata toggle
export function DisplayPanel({ theme, settings, updateSettings, onClose, anchorRight = 120 }) {
  return (
    <>
      {/* Invisible overlay to catch outside clicks */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 60 }}
      />
      <div
        style={{
          position: 'fixed',
          top: 70,
          right: anchorRight,
          zIndex: 61,
          width: 400,
          background: theme.page,
          border: `0.5px solid ${theme.rule}`,
          borderRadius: 18,
          boxShadow: theme.shadow,
          padding: '22px 24px 20px',
          color: theme.ink,
          fontFamily: UI_SANS,
        }}
      >
        {/* Font size preset row */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <SizeBox
            theme={theme}
            active={settings.fontSize <= 16}
            onClick={() => updateSettings({ fontSize: 15 })}
            small
          />
          <SizeBox
            theme={theme}
            active={settings.fontSize >= 18}
            onClick={() => updateSettings({ fontSize: 20 })}
            small={false}
          />
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: UI_SERIF, fontStyle: 'italic', fontSize: 18, color: theme.ink }}>
            {settings.fontSize}pt
          </div>
        </div>

        {/* Theme swatches */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', marginBottom: 16 }}>
          {Object.values(THEMES).map((t) => (
            <div
              key={t.id}
              onClick={() => updateSettings({ themeId: t.id })}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: t.page,
                  border:
                    settings.themeId === t.id
                      ? `2px solid ${theme.ink}`
                      : `0.5px solid ${theme.ruleStrong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: t.ink,
                  fontFamily: UI_SERIF,
                  fontSize: 22,
                }}
              >
                Aa
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: theme.inkMuted,
                  marginTop: 6,
                  fontFamily: UI_SANS,
                }}
              >
                {t.name}
              </div>
            </div>
          ))}
        </div>

        <Divider theme={theme} />

        <Row label="Gujarati font" theme={theme}>
          <Dropdown
            theme={theme}
            value={settings.gujFont}
            options={Object.values(GUJ_FONTS).map((f) => ({ v: f.id, label: f.name }))}
            onChange={(v) => updateSettings({ gujFont: v })}
          />
        </Row>

        <Row label="Layout" theme={theme}>
          <Segmented
            theme={theme}
            value={settings.layout}
            options={[
              { v: '1-up', label: '1-up' },
              { v: '2-up', label: '2-up' },
            ]}
            onChange={(v) => updateSettings({ layout: v })}
          />
        </Row>

        <Row label="Page turn" theme={theme}>
          <Segmented
            theme={theme}
            value={settings.pageTurn}
            options={[
              { v: 'slide', label: 'Slide' },
              { v: 'curl', label: 'Curl' },
              { v: 'fade', label: 'Fade' },
            ]}
            onChange={(v) => updateSettings({ pageTurn: v })}
          />
        </Row>

        <Row label="Margin metadata" theme={theme}>
          <Toggle
            theme={theme}
            value={settings.marginMeta}
            onChange={(v) => updateSettings({ marginMeta: v })}
          />
        </Row>
      </div>
    </>
  );
}

function SizeBox({ theme, active, onClick, small }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: small ? 82 : 92,
        height: 62,
        borderRadius: 10,
        background: active ? theme.accentSoft : theme.bg,
        border: active ? `0.5px solid ${theme.accent}` : `0.5px solid ${theme.rule}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: UI_SERIF,
        color: theme.ink,
      }}
    >
      <span style={{ fontSize: small ? 14 : 18 }}>A</span>
      <span style={{ fontSize: small ? 18 : 26, marginLeft: 2 }}>a</span>
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
        padding: '11px 0',
        gap: 12,
        fontSize: 14,
      }}
    >
      <div style={{ color: theme.ink }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

function Divider({ theme }) {
  return (
    <div style={{ height: 0.5, background: theme.rule, margin: '10px 0 2px' }} />
  );
}

function Dropdown({ theme, value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: theme.bg,
        color: theme.ink,
        border: `0.5px solid ${theme.rule}`,
        borderRadius: 8,
        padding: '6px 10px',
        fontSize: 13,
        fontFamily: UI_SANS,
        minWidth: 180,
      }}
    >
      {options.map((o) => (
        <option key={o.v} value={o.v}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Segmented({ theme, value, options, onChange }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        background: theme.bg,
        border: `0.5px solid ${theme.rule}`,
        borderRadius: 9,
        padding: 2,
        gap: 2,
      }}
    >
      {options.map((o) => {
        const active = value === o.v;
        return (
          <div
            key={o.v}
            onClick={() => onChange(o.v)}
            style={{
              padding: '5px 14px',
              fontSize: 13,
              borderRadius: 7,
              cursor: 'pointer',
              background: active ? theme.page : 'transparent',
              border: active ? `0.5px solid ${theme.rule}` : '0.5px solid transparent',
              boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              color: theme.ink,
              fontFamily: UI_SANS,
            }}
          >
            {o.label}
          </div>
        );
      })}
    </div>
  );
}

function Toggle({ theme, value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 46,
        height: 26,
        borderRadius: 13,
        background: value ? theme.accent : theme.ruleStrong,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 2,
          left: value ? 22 : 2,
          width: 22,
          height: 22,
          borderRadius: 11,
          background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'left 0.2s',
        }}
      />
    </div>
  );
}
