import { DEFAULT_SETTINGS, Settings } from '../types';

const STORAGE_KEY = 'instagram-detox-settings';

export async function getSettings(): Promise<Settings> {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  if (stored[STORAGE_KEY]) {
    return { ...DEFAULT_SETTINGS, ...stored[STORAGE_KEY] };
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: settings });
}

export async function updateSetting<K extends keyof Settings>(
  key: K,
  value: Settings[K]
): Promise<Settings> {
  const settings = await getSettings();
  settings[key] = value;
  await saveSettings(settings);
  return settings;
}

export async function resetSettings(): Promise<Settings> {
  await saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}
