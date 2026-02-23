import { describe, it, expect } from 'vitest';
import { STORAGE_KEYS, DEBOUNCE_DELAY, INSTAGRAM_HOST } from '../../src/utils/constants';

describe('constants', () => {
  it('should have correct storage key', () => {
    expect(STORAGE_KEYS.SETTINGS).toBe('instagram-detox-settings');
  });

  it('should have debounce delay defined', () => {
    expect(DEBOUNCE_DELAY).toBe(150);
  });

  it('should have correct Instagram host', () => {
    expect(INSTAGRAM_HOST).toBe('www.instagram.com');
  });
});
