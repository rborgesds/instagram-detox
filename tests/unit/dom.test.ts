import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  querySelectorSafe,
  querySelectorAllSafe,
  debounce,
} from '../../src/utils/dom';

describe('dom utils', () => {
  describe('querySelectorSafe', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="test"><span class="item">Test</span></div>';
    });

    it('should return element when found', () => {
      const el = querySelectorSafe<HTMLSpanElement>('#test .item');
      expect(el).not.toBeNull();
      expect(el?.textContent).toBe('Test');
    });

    it('should return null when element not found', () => {
      const el = querySelectorSafe('.not-exist');
      expect(el).toBeNull();
    });

    it('should return null for invalid selector', () => {
      const el = querySelectorSafe('[');
      expect(el).toBeNull();
    });
  });

  describe('querySelectorAllSafe', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <ul>
          <li class="item">One</li>
          <li class="item">Two</li>
          <li class="item">Three</li>
        </ul>
      `;
    });

    it('should return all matching elements', () => {
      const items = querySelectorAllSafe<HTMLLIElement>('.item');
      expect(items).toHaveLength(3);
    });

    it('should return empty array when no matches', () => {
      const items = querySelectorAllSafe('.not-exist');
      expect(items).toHaveLength(0);
    });

    it('should return empty array for invalid selector', () => {
      const items = querySelectorAllSafe('[');
      expect(items).toHaveLength(0);
    });
  });

  describe('debounce', () => {
    it('should delay function execution', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('should only call function once for multiple rapid calls', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('should pass arguments to function', async () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('arg1', 'arg2');

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');

      vi.useRealTimers();
    });
  });
});
