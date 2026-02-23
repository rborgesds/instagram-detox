import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSettings, saveSettings, updateSetting, resetSettings } from '../../src/utils/storage';
import { DEFAULT_SETTINGS } from '../../src/types';

const mockStorage = {
  [DEFAULT_SETTINGS as unknown as string]: { ...DEFAULT_SETTINGS },
};

vi.stubGlobal('chrome', {
  storage: {
    local: {
      get: vi.fn((key: string) => Promise.resolve({ [key]: mockStorage[key as keyof typeof mockStorage] })),
      set: vi.fn((data: Record<string, unknown>) => {
        Object.assign(mockStorage, data);
        return Promise.resolve();
      }),
    },
  },
});

describe('storage utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockStorage, {
      'instagram-detox-settings': { ...DEFAULT_SETTINGS },
    });
  });

  describe('getSettings', () => {
    it('should return default settings when none stored', async () => {
      (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});
      const settings = await getSettings();
      expect(settings).toEqual(DEFAULT_SETTINGS);
    });

    it('should return stored settings when present', async () => {
      const customSettings = { ...DEFAULT_SETTINGS, hideExplore: false };
      (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        'instagram-detox-settings': customSettings,
      });
      const settings = await getSettings();
      expect(settings.hideExplore).toBe(false);
    });

    it('should merge stored settings with defaults', async () => {
      (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        'instagram-detox-settings': { hideExplore: false },
      });
      const settings = await getSettings();
      expect(settings.hideExplore).toBe(false);
      expect(settings.hideReels).toBe(DEFAULT_SETTINGS.hideReels);
    });
  });

  describe('saveSettings', () => {
    it('should save settings to storage', async () => {
      const newSettings = { ...DEFAULT_SETTINGS, filterFeed: false };
      await saveSettings(newSettings);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        'instagram-detox-settings': newSettings,
      });
    });
  });

  describe('updateSetting', () => {
    it('should update single setting', async () => {
      (chrome.storage.local.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        'instagram-detox-settings': { ...DEFAULT_SETTINGS },
      });
      const settings = await updateSetting('hideExplore', false);
      expect(settings.hideExplore).toBe(false);
      expect(chrome.storage.local.set).toHaveBeenCalled();
    });
  });

  describe('resetSettings', () => {
    it('should reset to default settings', async () => {
      await resetSettings();
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        'instagram-detox-settings': DEFAULT_SETTINGS,
      });
    });
  });
});
