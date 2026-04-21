import React, { useState } from 'react';
import { THEMES } from './theme/tokens';
import { useAuth } from './lib/auth';
import { useSettings } from './lib/settings';
import { LoginScreen } from './screens/LoginScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PdfReaderScreen } from './screens/PdfReaderScreen';

export function App() {
  const { user } = useAuth();
  const [settings, updateSettings] = useSettings();
  const [activeBook, setActiveBook] = useState(null);

  const theme = THEMES[settings.themeId] || THEMES.paper;

  if (!user) return <LoginScreen theme={theme} />;

  if (activeBook) {
    return (
      <PdfReaderScreen
        theme={theme}
        book={activeBook}
        settings={settings}
        updateSettings={updateSettings}
        onBack={() => setActiveBook(null)}
        onOpenLibrary={() => setActiveBook(null)}
      />
    );
  }

  return (
    <LibraryScreen
      theme={theme}
      settings={settings}
      updateSettings={updateSettings}
      onOpenBook={(b) => setActiveBook(b)}
    />
  );
}
