import React, { useState } from 'react';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { BOOKS } from '../data/books';
import { PlaceholderCover } from '../components/PlaceholderCover';
import { Icon } from '../components/Icon';
import { DisplayPanel } from '../components/DisplayPanel';
import { ProfilePanel } from '../components/ProfilePanel';
import { useAuth } from '../lib/auth';

export function LibraryScreen({ theme, settings, updateSettings, onOpenBook }) {
  const { user, signOut } = useAuth();
  const greeting = user?.name ? user.name.split(' ')[0] : 'Friend';
  const [panel, setPanel] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        color: theme.ink,
        fontFamily: UI_SANS,
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(20px)',
          background: theme.bg + 'dd',
          borderBottom: `0.5px solid ${theme.rule}`,
          padding: '18px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: UI_SERIF,
            fontStyle: 'italic',
            fontSize: 24,
            color: theme.ink,
            letterSpacing: 0.2,
          }}
        >
          Vachanamrut Ji
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setPanel('display')}
            title="Display settings"
            style={iconBtn(theme)}
          >
            <Icon name="aa" size={18} color={theme.ink} />
          </button>
          <button
            onClick={() => setPanel('profile')}
            title="Profile"
            style={{
              ...iconBtn(theme),
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />
            ) : (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: theme.accentSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.accent,
                }}
              >
                <Icon name="user" size={16} />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Greeting */}
      <div style={{ padding: '40px 28px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: UI_SERIF,
            fontStyle: 'italic',
            fontSize: 36,
            color: theme.ink,
            marginBottom: 6,
            letterSpacing: 0.2,
          }}
        >
          Welcome, {greeting}.
        </div>
        <div style={{ fontSize: 14, color: theme.inkMuted, lineHeight: 1.5 }}>
          Your library is a quiet corner for the words that steady the mind.
        </div>
      </div>

      {/* Section label */}
      <div
        style={{
          padding: '24px 28px 14px',
          maxWidth: 1100,
          margin: '0 auto',
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: theme.inkMuted,
        }}
      >
        Your Books
      </div>

      {/* Book grid */}
      <div
        style={{
          padding: '0 28px 64px',
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 36,
          rowGap: 44,
        }}
      >
        {BOOKS.map((b) => (
          <div
            key={b.id}
            onClick={() => onOpenBook(b)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <PlaceholderCover
                label={b.cover?.label || b.title}
                tone={b.cover?.tone || 'saffron'}
                theme={theme}
                tall
              />
            </div>
            <div
              style={{
                fontFamily: UI_SERIF,
                fontSize: 15,
                fontWeight: 500,
                color: theme.ink,
                textAlign: 'center',
                marginBottom: 3,
                lineHeight: 1.3,
              }}
            >
              {b.title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.inkMuted,
                textAlign: 'center',
              }}
            >
              {b.author}
            </div>
          </div>
        ))}

        {/* Placeholder tile for future books */}
        <div style={{ opacity: 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <div
              style={{
                width: 168,
                height: 252,
                border: `1px dashed ${theme.ruleStrong}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.inkMuted,
              }}
            >
              <Icon name="plus" size={22} />
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: theme.inkMuted,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            More books coming
          </div>
        </div>
      </div>

      {/* Overlays */}
      {panel === 'display' && (
        <DisplayPanel
          theme={theme}
          settings={settings}
          updateSettings={updateSettings}
          onClose={() => setPanel(null)}
          anchorRight={80}
        />
      )}
      {panel === 'profile' && (
        <ProfilePanel
          theme={theme}
          user={user}
          daysWithBook={0}
          settings={settings}
          updateSettings={updateSettings}
          counts={{ highlights: 0, notes: 0, pins: 0 }}
          onSignOut={signOut}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  );
}

function iconBtn(theme) {
  return {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: `0.5px solid ${theme.rule}`,
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.ink,
  };
}
