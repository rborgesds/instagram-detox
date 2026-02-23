import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DEFAULT_SETTINGS } from '../../src/types';

const mockStorage: Record<string, unknown> = {
  'instagram-detox-settings': { ...DEFAULT_SETTINGS },
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
  runtime: {
    sendMessage: vi.fn(),
  },
});

describe('popup settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div class="popup">
        <input type="checkbox" id="hide-explore" checked />
        <input type="checkbox" id="hide-reels" checked />
        <input type="checkbox" id="filter-feed" checked />
        <input type="checkbox" id="video-controls" checked />
      </div>
    `;
  });

  it('should load settings from storage', async () => {
    const { getSettings } = await import('../../src/utils/storage');
    const settings = await getSettings();
    expect(settings.hideExplore).toBe(true);
    expect(settings.hideReels).toBe(true);
    expect(settings.filterFeed).toBe(true);
    expect(settings.videoControls).toBe(true);
  });

  it('should save settings to storage', async () => {
    const { saveSettings } = await import('../../src/utils/storage');
    const newSettings = { ...DEFAULT_SETTINGS, hideExplore: false };
    await saveSettings(newSettings);
    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      'instagram-detox-settings': newSettings,
    });
  });
});
