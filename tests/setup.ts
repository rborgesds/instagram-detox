import { vi } from 'vitest';

const mockSettings = {
  hideExplore: true,
  hideReels: true,
  filterFeed: true,
  videoControls: true,
};

vi.stubGlobal('chrome', {
  runtime: {
    onMessage: {
      addListener: vi.fn(),
    },
    sendMessage: vi.fn(),
  },
  storage: {
    local: {
      get: vi.fn().mockResolvedValue({ 'instagram-detox-settings': mockSettings }),
      set: vi.fn().mockResolvedValue(undefined),
    },
  },
});
