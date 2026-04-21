import React, { useState } from 'react';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { Icon } from './Icon';

export function ContentsPanel({ theme, book, currentPage, onJump, pins, notes, onClose, onDeleteNote }) {
  const [tab, setTab] = useState('contents');

  return (
    <SidePanel theme={theme} side="left" onClose={onClose} title="Contents">
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          padding: '6px 28px 0',
          borderBottom: `0.5px solid ${theme.rule}`,
        }}
      >
        {[
          { id: 'contents', label: 'Contents' },
          { id: 'pinned', label: 'Pinned' },
          { id: 'notes', label: 'Notes' },
        ].map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '12px 0 14px',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: tab === t.id ? theme.ink : theme.inkMuted,
              cursor: 'pointer',
              borderBottom:
                tab === t.id ? `2px solid ${theme.accent}` : '2px solid transparent',
              marginBottom: -0.5,
              fontFamily: UI_SANS,
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 0 40px', overflow: 'auto', flex: 1 }}>
        {tab === 'contents' && (
          <ContentsList theme={theme} book={book} currentPage={currentPage} onJump={onJump} />
        )}
        {tab === 'pinned' && (
          <PinnedList theme={theme} pins={pins} onJump={onJump} />
        )}
        {tab === 'notes' && (
          <NotesList theme={theme} notes={notes} onJump={onJump} onDelete={onDeleteNote} />
        )}
      </div>
    </SidePanel>
  );
}

function ContentsList({ theme, book, currentPage, onJump }) {
  const sections = book.toc?.sections || [];
  return (
    <div style={{ padding: '0 20px' }}>
      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: 8 }}>
          {/* Section header */}
          <div
            style={{
              padding: '14px 16px',
              background: theme.accentSoft,
              borderRadius: 10,
              marginBottom: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: UI_SERIF,
                  fontStyle: 'italic',
                  fontSize: 18,
                  color: theme.ink,
                }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: 13, color: theme.inkMuted, marginTop: 2 }}>
                {s.titleGu}
              </div>
            </div>
            <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: UI_SERIF, fontStyle: 'italic' }}>
              {s.count}
            </div>
          </div>

          {/* Section items */}
          {s.items.map((item, i) => {
            const active = currentPage === item.pdfPage;
            return (
              <div
                key={i}
                onClick={() => onJump(item.pdfPage)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 8,
                  background: active ? theme.accentSoft : 'transparent',
                  borderLeft: active ? `3px solid ${theme.accent}` : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 15, color: theme.ink, fontWeight: 500 }}>
                    {item.gu}
                  </div>
                  {item.to && (
                    <div style={{ fontSize: 13, color: theme.inkMuted, marginTop: 2 }}>
                      <span style={{ fontFamily: UI_SERIF, fontStyle: 'italic' }}>to </span>
                      {item.to}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: UI_SERIF,
                    fontStyle: 'italic',
                    color: theme.inkMuted,
                    whiteSpace: 'nowrap',
                    marginTop: 2,
                  }}
                >
                  {item.year}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function PinnedList({ theme, pins, onJump }) {
  if (!pins.length) {
    return (
      <EmptyState
        theme={theme}
        text="No pinned pages yet. Tap the bookmark icon while reading to pin the current page."
      />
    );
  }
  const sorted = [...pins].sort((a, b) => a.page - b.page);
  return (
    <div style={{ padding: '0 20px' }}>
      {sorted.map((p) => (
        <div
          key={p.page}
          onClick={() => onJump(p.page)}
          style={{
            padding: '14px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `0.5px solid ${theme.rule}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="bookmarkFill" color={theme.accent} size={16} />
            <div
              style={{
                fontFamily: UI_SERIF,
                fontStyle: 'italic',
                fontSize: 16,
                color: theme.ink,
              }}
            >
              Page {p.page}
            </div>
          </div>
          <div style={{ fontSize: 12, color: theme.inkMuted }}>
            {formatDate(p.at)}
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesList({ theme, notes, onJump, onDelete }) {
  if (!notes.length) {
    return (
      <EmptyState
        theme={theme}
        text="No notes yet. Use the notes icon while reading to add a reflection tied to the current page."
      />
    );
  }
  const sorted = [...notes].sort((a, b) => b.at - a.at);
  return (
    <div style={{ padding: '0 20px' }}>
      {sorted.map((n) => (
        <div
          key={n.id}
          style={{
            padding: '14px 16px',
            marginBottom: 8,
            borderRadius: 10,
            background: theme.accentSoft,
            border: `0.5px solid ${theme.rule}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <div
              onClick={() => onJump(n.page)}
              style={{
                fontFamily: UI_SERIF,
                fontStyle: 'italic',
                fontSize: 14,
                color: theme.accent,
                cursor: 'pointer',
              }}
            >
              Page {n.page}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 11, color: theme.inkMuted }}>{formatDate(n.at)}</div>
              <button
                onClick={() => onDelete(n.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: theme.inkMuted,
                  padding: 2,
                  display: 'inline-flex',
                }}
                title="Delete note"
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: theme.ink,
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {n.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ theme, text }) {
  return (
    <div
      style={{
        padding: '60px 32px',
        textAlign: 'center',
        color: theme.inkMuted,
        fontSize: 14,
        lineHeight: 1.5,
        fontFamily: UI_SANS,
      }}
    >
      {text}
    </div>
  );
}

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function SidePanel({ theme, side, children, onClose, title }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.24)',
        zIndex: 80,
        display: 'flex',
        justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 460,
          background: theme.page,
          boxShadow: theme.shadow,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 28px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontFamily: UI_SERIF,
              fontStyle: 'italic',
              fontSize: 32,
              color: theme.ink,
            }}
          >
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: theme.inkSoft,
              padding: 6,
              display: 'inline-flex',
            }}
          >
            <Icon name="close" size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
