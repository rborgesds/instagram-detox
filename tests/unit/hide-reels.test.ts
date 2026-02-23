import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideReelsTab, showReelsTab, runFeature } from '../../src/content/hide-reels';
import { SELECTORS } from '../../src/utils/selectors';

vi.stubGlobal('chrome', {
  runtime: {
    onMessage: {
      addListener: vi.fn(),
    },
  },
});

describe('hide-reels', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav aria-label="Main">
        <a href="/explore/">Explore</a>
        <a href="/reels/">Reels</a>
        <a href="/">Home</a>
      </nav>
    `;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('hideReelsTab', () => {
    it('should hide the reels tab', () => {
      hideReelsTab();
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink).not.toBeNull();
      expect(reelsLink?.style.display).toBe('none');
    });

    it('should set aria-hidden attribute', () => {
      hideReelsTab();
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should do nothing if reels tab not found', () => {
      document.body.innerHTML = '<nav><a href="/">Home</a></nav>';
      expect(() => hideReelsTab()).not.toThrow();
    });
  });

  describe('showReelsTab', () => {
    it('should show the reels tab', () => {
      hideReelsTab();
      showReelsTab();
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink?.style.display).toBe('');
    });

    it('should remove aria-hidden attribute', () => {
      hideReelsTab();
      showReelsTab();
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink?.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('runFeature', () => {
    it('should hide reels tab when hideReels is true', async () => {
      await runFeature({ hideExplore: true, hideReels: true, filterFeed: true, videoControls: true });
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink?.style.display).toBe('none');
    });

    it('should show reels tab when hideReels is false', async () => {
      await runFeature({ hideExplore: true, hideReels: false, filterFeed: true, videoControls: true });
      const reelsLink = document.querySelector<HTMLAnchorElement>(SELECTORS.reelsTab);
      expect(reelsLink?.style.display).toBe('');
    });
  });
});
