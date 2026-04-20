import React, { useState } from 'react';
import { THEMES } from './theme/tokens';
import { useAuth } from './lib/auth';
import { useSettings } from './lib/settings';
import { LoginScreen } from './screens/LoginScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PdfReaderScreen } from './screens/PdfReaderScreen';
import { SettingsModal } from './components/SettingsModal';

export function App() {
  const { user } = useAuth();
  const [settings, updateSettings] = useSettings();
  const [activeBook, setActiveBook] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const theme = THEMES[settings.themeId] || THEMES.paper;

  if (!user) return <LoginScreen theme={theme} />;

  return (
    <>
      {activeBook ? (
        <PdfReaderScreen
          theme={theme}
          book={activeBook}
          onBack={() => setActiveBook(null)}
        />
      ) : (
        <LibraryScreen
          theme={theme}
          onOpenBook={(b) => setActiveBook(b)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          theme={theme}
          settings={settings}
          updateSettings={updateSettings}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}
