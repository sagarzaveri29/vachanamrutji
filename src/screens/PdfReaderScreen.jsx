import React, { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { Icon } from '../components/Icon';
import { ContentsPanel } from '../components/ContentsPanel';
import { DisplayPanel } from '../components/DisplayPanel';
import { ProfilePanel } from '../components/ProfilePanel';
import { NoteComposer } from '../components/NoteComposer';
import { useAuth } from '../lib/auth';
import {
  getBookmark,
  setBookmark,
  getPins,
  togglePin,
  isPinned,
  getNotes,
  addNote,
  deleteNote,
  touchBook,
  daysWithBook,
} from '../lib/bookState';

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const OPTIONS = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/standard_fonts/',
};

export function PdfReaderScreen({ theme, book, settings, updateSettings, onBack, onOpenLibrary }) {
  const { user, signOut } = useAuth();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(() => {
    if (settings.saveReadingPosition) return getBookmark(book.id);
    return 1;
  });
  const [scale, setScale] = useState(1.1);

  // Panels open-state
  const [panel, setPanel] = useState(null); // 'contents' | 'display' | 'profile' | null
  const [composingNote, setComposingNote] = useState(false);

  // Bookmarks / notes state (refreshed from storage)
  const [pins, setPins] = useState(() => getPins(book.id));
  const [notes, setNotes] = useState(() => getNotes(book.id));

  useEffect(() => {
    touchBook(book.id);
  }, [book.id]);

  useEffect(() => {
    if (settings.saveReadingPosition) setBookmark(book.id, pageNumber);
  }, [pageNumber, book.id, settings.saveReadingPosition]);

  useEffect(() => {
    const onKey = (e) => {
      if (panel || composingNote) return;
      if (e.key === 'ArrowLeft') setPageNumber((p) => Math.max(1, p - 1));
      else if (e.key === 'ArrowRight')
        setPageNumber((p) => Math.min(numPages || p + 1, p + 1));
      else if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages, onBack, panel, composingNote]);

  const file = useMemo(() => book.file, [book.file]);
  const pinnedHere = isPinned(book.id, pageNumber);

  function handleTogglePin() {
    const updated = togglePin(book.id, pageNumber);
    setPins(updated);
  }

  function handleSaveNote(text) {
    const updated = addNote(book.id, pageNumber, text);
    setNotes(updated);
    setComposingNote(false);
  }

  function handleDeleteNote(noteId) {
    const updated = deleteNote(book.id, noteId);
    setNotes(updated);
  }

  function jumpTo(page) {
    setPageNumber(page);
    setPanel(null);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        color: theme.ink,
        fontFamily: UI_SANS,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          background: theme.bg + 'dd',
          borderBottom: `0.5px solid ${theme.rule}`,
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Left: contents + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconBtn theme={theme} onClick={onBack} title="Back to Library">
            <Icon name="chev-l" size={18} color={theme.ink} />
          </IconBtn>
          <IconBtn theme={theme} onClick={() => setPanel('contents')} title="Contents">
            <Icon name="index" size={18} color={theme.ink} />
          </IconBtn>
        </div>

        {/* Center: title */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: UI_SERIF,
            fontStyle: 'italic',
            fontSize: 18,
            color: theme.ink,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {book.title}
        </div>

        {/* Right: Aa, bookmark, notes, library, profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconBtn theme={theme} onClick={() => setPanel('display')} title="Display">
            <Icon name="aa" size={18} color={theme.ink} />
          </IconBtn>
          <IconBtn theme={theme} onClick={handleTogglePin} title={pinnedHere ? 'Remove pin' : 'Pin this page'}>
            <Icon
              name={pinnedHere ? 'bookmarkFill' : 'bookmark'}
              size={18}
              color={pinnedHere ? theme.accent : theme.ink}
            />
          </IconBtn>
          <IconBtn theme={theme} onClick={() => setComposingNote(true)} title="Add note">
            <Icon name="note" size={18} color={theme.ink} />
          </IconBtn>
          <IconBtn theme={theme} onClick={onOpenLibrary} title="Library">
            <Icon name="library" size={18} color={theme.ink} />
          </IconBtn>
          <IconBtn theme={theme} onClick={() => setPanel('profile')} title="Profile">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                referrerPolicy="no-referrer"
                style={{ width: 22, height: 22, borderRadius: 11 }}
              />
            ) : (
              <Icon name="user" size={18} color={theme.ink} />
            )}
          </IconBtn>
        </div>
      </header>

      {/* PDF canvas */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '32px 20px 120px',
          overflow: 'auto',
        }}
      >
        <Document
          file={file}
          options={OPTIONS}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div style={{ color: theme.inkMuted, fontSize: 14, padding: 40 }}>
              Loading book…
            </div>
          }
          error={
            <div
              style={{
                maxWidth: 520,
                background: theme.page,
                border: `0.5px solid ${theme.rule}`,
                borderRadius: 12,
                padding: 24,
                color: theme.inkSoft,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              <strong>Couldn’t open this book.</strong>
              <br />
              Make sure the file exists at{' '}
              <code style={{ color: theme.accent }}>public{book.file}</code>.
            </div>
          }
        >
          <div
            style={{
              background: theme.page,
              boxShadow: theme.shadow,
              borderRadius: 6,
              overflow: 'hidden',
              display: 'flex',
              gap: settings.layout === '2-up' ? 16 : 0,
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            {settings.layout === '2-up' && pageNumber + 1 <= (numPages || 0) && (
              <Page
                pageNumber={pageNumber + 1}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )}
          </div>
        </Document>
      </div>

      {/* Bottom nav */}
      <footer
        style={{
          position: 'sticky',
          bottom: 0,
          backdropFilter: 'blur(20px)',
          background: theme.bg + 'ee',
          borderTop: `0.5px solid ${theme.rule}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
        }}
      >
        <IconBtn theme={theme} onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1}>
          <Icon name="chev-l" size={16} color={theme.ink} />
        </IconBtn>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: UI_SERIF,
            fontStyle: 'italic',
            fontSize: 15,
            color: theme.ink,
          }}
        >
          <input
            type="number"
            min={1}
            max={numPages || 999}
            value={pageNumber}
            onChange={(e) => {
              const v = Math.max(1, Math.min(numPages || 999, Number(e.target.value) || 1));
              setPageNumber(v);
            }}
            style={{
              width: 64,
              background: 'transparent',
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 6,
              padding: '4px 8px',
              color: theme.ink,
              fontFamily: UI_SERIF,
              fontStyle: 'italic',
              fontSize: 15,
              textAlign: 'center',
            }}
          />
          <span style={{ color: theme.inkMuted }}>of {numPages || '…'}</span>
        </div>

        <IconBtn
          theme={theme}
          onClick={() => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p + 1))}
          disabled={!!numPages && pageNumber >= numPages}
        >
          <Icon name="chev-r" size={16} color={theme.ink} />
        </IconBtn>

        <div style={{ width: 20 }} />

        <IconBtn theme={theme} onClick={() => setScale((s) => Math.max(0.6, +(s - 0.15).toFixed(2)))} title="Zoom out">
          <Icon name="minus" size={14} color={theme.ink} />
        </IconBtn>
        <div style={{ minWidth: 44, textAlign: 'center', fontSize: 12, color: theme.inkMuted }}>
          {Math.round(scale * 100)}%
        </div>
        <IconBtn theme={theme} onClick={() => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)))} title="Zoom in">
          <Icon name="plus" size={14} color={theme.ink} />
        </IconBtn>
      </footer>

      {/* Overlays */}
      {panel === 'contents' && (
        <ContentsPanel
          theme={theme}
          book={book}
          currentPage={pageNumber}
          pins={pins}
          notes={notes}
          onJump={jumpTo}
          onDeleteNote={handleDeleteNote}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === 'display' && (
        <DisplayPanel
          theme={theme}
          settings={settings}
          updateSettings={updateSettings}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === 'profile' && (
        <ProfilePanel
          theme={theme}
          user={user}
          daysWithBook={daysWithBook(book.id)}
          settings={settings}
          updateSettings={updateSettings}
          counts={{ highlights: 0, notes: notes.length, pins: pins.length }}
          onSignOut={signOut}
          onClose={() => setPanel(null)}
        />
      )}
      {composingNote && (
        <NoteComposer
          theme={theme}
          page={pageNumber}
          onSave={handleSaveNote}
          onClose={() => setComposingNote(false)}
        />
      )}
    </div>
  );
}

function IconBtn({ theme, children, onClick, title, disabled }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `0.5px solid ${theme.rule}`,
        background: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.ink,
        opacity: disabled ? 0.4 : 1,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </button>
  );
}
