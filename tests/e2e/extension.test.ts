import { test, expect } from '@playwright/test';

test.describe('Instagram Detox Extension', () => {
  test('should load extension without errors', async ({ page }) => {
    await page.goto('https://www.instagram.com');
    
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    expect(errors.filter(e => !e.includes('net::ERR_'))).toHaveLength(0);
  });

  test('should hide explore tab when enabled', async ({ page }) => {
    await page.goto('https://www.instagram.com');
    await page.waitForSelector('nav');
    
    const exploreLink = page.locator('a[href="/explore/"]');
    await expect(exploreLink).toHaveCount(1);
    
    const style = await exploreLink.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    
    expect(style).toBe('none');
  });

  test('should hide reels tab when enabled', async ({ page }) => {
    await page.goto('https://www.instagram.com');
    await page.waitForSelector('nav');
    
    const reelsLink = page.locator('a[href="/reels/"]');
    await expect(reelsLink).toHaveCount(1);
    
    const style = await reelsLink.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    
    expect(style).toBe('none');
  });

  test('should add video controls', async ({ page }) => {
    await page.goto('https://www.instagram.com/reels/');
    await page.waitForTimeout(2000);
    
    const videos = page.locator('video');
    const count = await videos.count();
    
    if (count > 0) {
      const hasControls = await videos.first().evaluate((el) => {
        return el.hasAttribute('controls');
      });
      expect(hasControls).toBe(true);
    }
  });
});
