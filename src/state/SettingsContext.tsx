import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {Settings} from './types';
import {getJSON, setJSON, StorageKeys} from '@/services/storage';

const DEFAULT_SETTINGS: Settings = {
  theme: 'paper',
  typeScale: 'regular',
  aaaContrast: false,
  reducedMotion: false,
  language: 'english',
  autoTranscribe: true,
  speakerDetection: false,
  summaryLength: 'brief',
  autoTitle: true,
  autoTags: true,
};

interface SettingsContextValue {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({children}: {children: React.ReactNode}) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = getJSON<Settings>(StorageKeys.SETTINGS);
    if (saved) {
      setSettings(prev => ({...prev, ...saved}));
    }
  }, []);

  const updateSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings(prev => {
        const next = {...prev, [key]: value};
        setJSON(StorageKeys.SETTINGS, next);
        return next;
      });
    },
    [],
  );

  return (
    <SettingsContext.Provider value={{settings, updateSetting}}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
