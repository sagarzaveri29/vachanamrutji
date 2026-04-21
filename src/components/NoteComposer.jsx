import React, { useState } from 'react';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { Icon } from './Icon';

export function NoteComposer({ theme, page, onSave, onClose }) {
  const [text, setText] = useState('');

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 460,
          background: theme.page,
          borderRadius: 14,
          boxShadow: theme.shadow,
          border: `0.5px solid ${theme.rule}`,
          overflow: 'hidden',
          color: theme.ink,
          fontFamily: UI_SANS,
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `0.5px solid ${theme.rule}`,
          }}
        >
          <div style={{ fontFamily: UI_SERIF, fontStyle: 'italic', fontSize: 20 }}>
            Note on page {page}
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

        <div style={{ padding: 20 }}>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What moved you on this page?"
            rows={6}
            style={{
              width: '100%',
              background: theme.bg,
              color: theme.ink,
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 10,
              padding: 12,
              fontSize: 15,
              lineHeight: 1.5,
              resize: 'vertical',
              fontFamily: UI_SERIF,
              outline: 'none',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 16,
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: 8,
                border: `0.5px solid ${theme.rule}`,
                background: 'transparent',
                color: theme.inkSoft,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => text.trim() && onSave(text.trim())}
              disabled={!text.trim()}
              style={{
                padding: '9px 18px',
                borderRadius: 8,
                border: 'none',
                background: text.trim() ? theme.accent : theme.ruleStrong,
                color: '#fff',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
