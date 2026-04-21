import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vachanamrut:settings';

const DEFAULTS = {
  themeId: 'paper',
  gujFont: 'noto',
  fontSize: 17,
  layout: '1-up',              // '1-up' | '2-up'
  pageTurn: 'slide',           // 'slide' | 'curl' | 'fade'
  marginMeta: true,
  saveReadingPosition: true,   // persist last-read page per book
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));

  return [settings, update];
}
