import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const Keys = {
  NOTES: 'kumbu:notes',
  SETTINGS: 'kumbu:settings',
  ONBOARDING_COMPLETE: 'kumbu:onboarding_complete',
  RECENT_SEARCHES: 'kumbu:recent_searches',
} as const;

export function getJSON<T>(key: string): T | undefined {
  const raw = storage.getString(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

export function setJSON(key: string, value: unknown): void {
  storage.set(key, JSON.stringify(value));
}

export const StorageKeys = Keys;
