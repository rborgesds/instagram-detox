import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideExploreTab, showExploreTab, runFeature } from '../../src/content/hide-explore';
import { SELECTORS } from '../../src/utils/selectors';

vi.stubGlobal('chrome', {
  runtime: {
    onMessage: {
      addListener: vi.fn(),
    },
  },
});

describe('hide-explore', () => {
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

  describe('hideExploreTab', () => {
    it('should hide the explore tab', () => {
      hideExploreTab();
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink).not.toBeNull();
      expect(exploreLink?.style.display).toBe('none');
    });

    it('should set aria-hidden attribute', () => {
      hideExploreTab();
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should do nothing if explore tab not found', () => {
      document.body.innerHTML = '<nav><a href="/">Home</a></nav>';
      expect(() => hideExploreTab()).not.toThrow();
    });
  });

  describe('showExploreTab', () => {
    it('should show the explore tab', () => {
      hideExploreTab();
      showExploreTab();
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink?.style.display).toBe('');
    });

    it('should remove aria-hidden attribute', () => {
      hideExploreTab();
      showExploreTab();
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink?.getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('runFeature', () => {
    it('should hide explore tab when hideExplore is true', async () => {
      await runFeature({ hideExplore: true, hideReels: true, filterFeed: true, videoControls: true });
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink?.style.display).toBe('none');
    });

    it('should show explore tab when hideExplore is false', async () => {
      await runFeature({ hideExplore: false, hideReels: true, filterFeed: true, videoControls: true });
      const exploreLink = document.querySelector<HTMLAnchorElement>(SELECTORS.exploreTab);
      expect(exploreLink?.style.display).toBe('');
    });
  });
});
