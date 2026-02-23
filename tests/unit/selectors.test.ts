import { describe, it, expect } from 'vitest';
import { SELECTORS } from '../../src/utils/selectors';

describe('selectors', () => {
  const classRegex = /\.[a-zA-Z][\w-]*/;

  it('should not use class-based selectors', () => {
    const selectorValues = Object.values(SELECTORS);
    selectorValues.forEach((selector) => {
      const hasClass = classRegex.test(selector);
      expect(hasClass, `Selector "${selector}" should not use class-based selectors`).toBe(false);
    });
  });

  it('should use semantic attributes', () => {
    const semanticSelectors = [
      { selector: SELECTORS.exploreTab, expect: 'href' },
      { selector: SELECTORS.reelsTab, expect: 'href' },
      { selector: SELECTORS.navigation, expect: 'nav' },
    ];

    semanticSelectors.forEach(({ selector, expect: attr }) => {
      expect(selector).toContain(attr);
    });
  });

  it('should have valid explore and reels tab selectors', () => {
    expect(SELECTORS.exploreTab).toBe('a[href="/explore/"]');
    expect(SELECTORS.reelsTab).toBe('a[href="/reels/"]');
  });

  it('should have video selectors', () => {
    expect(SELECTORS.reelVideo).toBe('video');
    expect(SELECTORS.storyVideo).toBe('article video');
  });
});
