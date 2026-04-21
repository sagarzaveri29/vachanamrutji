import React from 'react';
import { UI_SERIF, UI_SANS, THEMES, GUJ_FONTS } from '../theme/tokens';
import { Icon } from './Icon';

export function ProfilePanel({
  theme,
  user,
  daysWithBook,
  settings,
  updateSettings,
  counts,
  onSignOut,
  onClose,
}) {
  const initial = user?.name?.[0]?.toUpperCase() || 'M';
  const themeName = THEMES[settings.themeId]?.name || 'Paper';
  const fontName = GUJ_FONTS[settings.gujFont]?.name || 'Noto Serif Gujarati';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.24)',
        zIndex: 80,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 440,
          background: theme.page,
          boxShadow: theme.shadow,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
          padding: '28px 28px 40px',
          color: theme.ink,
          fontFamily: UI_SANS,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: UI_SERIF,
              fontStyle: 'italic',
              fontSize: 32,
            }}
          >
            Profile
          </div>
          <button
            onClick={onClose}
            style={{
              background: theme.bg,
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 8,
              padding: 8,
              cursor: 'pointer',
              color: theme.ink,
              display: 'inline-flex',
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                background: theme.accent,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: UI_SERIF,
                fontStyle: 'italic',
                fontSize: 28,
              }}
            >
              {initial}
            </div>
          )}
          <div>
            <div style={{ fontFamily: UI_SERIF, fontSize: 22, color: theme.ink }}>
              {user?.name || 'Mumukshu'}
            </div>
            <div
              style={{
                fontSize: 13,
                color: theme.inkMuted,
                fontFamily: UI_SERIF,
                fontStyle: 'italic',
                marginTop: 2,
              }}
            >
              Signed in · {daysWithBook} {daysWithBook === 1 ? 'day' : 'days'} with the book
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
          <StatCard theme={theme} value={counts.highlights} label="Highlights" />
          <StatCard theme={theme} value={counts.notes} label="Notes" />
          <StatCard theme={theme} value={counts.pins} label="Pinned" />
        </div>

        {/* Reading section */}
        <SectionHeader theme={theme}>Reading</SectionHeader>
        <RowCard theme={theme} label={`Display · ${themeName}, ${settings.fontSize}pt, ${shortFontName(fontName)}`} />
        <RowCard theme={theme} label="Reading goal · 15 min/day" />
        <RowCard theme={theme} label="Sync · This device" />

        {/* Personalization */}
        <div style={{ height: 20 }} />
        <SectionHeader theme={theme}>Personalization</SectionHeader>
        <ToggleCard
          theme={theme}
          label="Save reading position"
          sublabel="Resume from where you left off"
          value={settings.saveReadingPosition}
          onChange={(v) => updateSettings({ saveReadingPosition: v })}
        />
        <RowCard theme={theme} label="Remember highlights across devices" />
        <RowCard theme={theme} label="Daily letter notification · 6:00 AM" />

        {/* Account */}
        <div style={{ height: 20 }} />
        <SectionHeader theme={theme}>Account</SectionHeader>
        <RowCard theme={theme} label={`Email · ${user?.email || '—'}`} />
        <RowCard
          theme={theme}
          label="Sign out"
          onClick={onSignOut}
          accent
        />
      </div>
    </div>
  );
}

function shortFontName(name) {
  // "Noto Serif Gujarati" → "Noto Serif"
  if (name.startsWith('Noto Serif')) return 'Noto Serif';
  return name;
}

function StatCard({ theme, value, label }) {
  return (
    <div
      style={{
        padding: '18px 10px',
        borderRadius: 12,
        border: `0.5px solid ${theme.rule}`,
        textAlign: 'center',
        background: theme.bg,
      }}
    >
      <div style={{ fontFamily: UI_SERIF, fontSize: 26, color: theme.ink, lineHeight: 1.1 }}>
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: theme.inkMuted,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionHeader({ theme, children }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: theme.inkMuted,
        marginBottom: 10,
        marginLeft: 4,
      }}
    >
      {children}
    </div>
  );
}

function RowCard({ theme, label, onClick, accent = false }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '16px 18px',
        borderRadius: 10,
        border: `0.5px solid ${theme.rule}`,
        background: theme.bg,
        marginBottom: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        color: accent ? theme.accent : theme.ink,
        fontSize: 14,
      }}
    >
      <div>{label}</div>
      <Icon name="chev-r" size={16} color={theme.inkMuted} />
    </div>
  );
}

function ToggleCard({ theme, label, sublabel, value, onChange }) {
  return (
    <div
      style={{
        padding: '14px 18px',
        borderRadius: 10,
        border: `0.5px solid ${theme.rule}`,
        background: theme.bg,
        marginBottom: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontSize: 14, color: theme.ink }}>{label}</div>
        {sublabel && (
          <div style={{ fontSize: 11, color: theme.inkMuted, marginTop: 2 }}>
            {sublabel}
          </div>
        )}
      </div>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 46,
          height: 26,
          borderRadius: 13,
          background: value ? theme.accent : theme.ruleStrong,
          position: 'relative',
          cursor: 'pointer',
          flexShrink: 0,
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
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 0.2s',
          }}
        />
      </div>
    </div>
  );
}
