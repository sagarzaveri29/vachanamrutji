import React, { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { UI_SERIF, UI_SANS } from '../theme/tokens';
import { Icon } from '../components/Icon';

// Configure PDF.js worker (served from the same CDN as the pdfjs-dist version)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const OPTIONS = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.4.168/standard_fonts/',
};

export function PdfReaderScreen({ theme, book, onBack }) {
  const bookmarkKey = `vachanamrut:bookmark:${book.id}`;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(() => {
    const saved = Number(localStorage.getItem(bookmarkKey));
    return Number.isFinite(saved) && saved > 0 ? saved : 1;
  });
  const [scale, setScale] = useState(1.1);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    localStorage.setItem(bookmarkKey, String(pageNumber));
  }, [pageNumber, bookmarkKey]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setPageNumber((p) => Math.max(1, p - 1));
      else if (e.key === 'ArrowRight')
        setPageNumber((p) => Math.min(numPages || p + 1, p + 1));
      else if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [numPages, onBack]);

  const file = useMemo(() => book.file, [book.file]);

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
          zIndex: 10,
          backdropFilter: 'blur(20px)',
          background: theme.bg + 'dd',
          borderBottom: `0.5px solid ${theme.rule}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <button onClick={onBack} style={iconBtn(theme)} title="Back to Library">
          <Icon name="chev-l" size={18} color={theme.ink} />
        </button>

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

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setScale((s) => Math.max(0.6, +(s - 0.15).toFixed(2)))}
            style={iconBtn(theme)}
            title="Zoom out"
          >
            <Icon name="minus" size={16} color={theme.ink} />
          </button>
          <div
            style={{
              minWidth: 46,
              textAlign: 'center',
              fontSize: 12,
              color: theme.inkMuted,
            }}
          >
            {Math.round(scale * 100)}%
          </div>
          <button
            onClick={() => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)))}
            style={iconBtn(theme)}
            title="Zoom in"
          >
            <Icon name="plus" size={16} color={theme.ink} />
          </button>
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
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setLoadError(null);
          }}
          onLoadError={(err) => {
            console.error('PDF load error', err);
            setLoadError(err);
          }}
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
              <br />
              <br />
              <em style={{ color: theme.inkMuted }}>
                Note: this is a DRM-protected publisher edition. The app renders
                pages as images; text selection and copy are disabled by the source.
              </em>
            </div>
          }
        >
          <div
            style={{
              background: theme.page,
              boxShadow: theme.shadow,
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        </Document>
      </div>

      {/* Bottom navigation */}
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
        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          style={{
            ...iconBtn(theme),
            opacity: pageNumber <= 1 ? 0.4 : 1,
          }}
        >
          <Icon name="chev-l" size={16} color={theme.ink} />
        </button>

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
              width: 60,
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

        <button
          onClick={() =>
            setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p + 1))
          }
          disabled={numPages ? pageNumber >= numPages : false}
          style={{
            ...iconBtn(theme),
            opacity: numPages && pageNumber >= numPages ? 0.4 : 1,
          }}
        >
          <Icon name="chev-r" size={16} color={theme.ink} />
        </button>
      </footer>
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
