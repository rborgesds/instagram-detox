import { describe, it, expect, beforeEach } from 'vitest';
import { hideSuggestedPosts, showAllPosts, isSuggestedPost, runFeature } from '../../src/content/filter-feed';

describe('filter-feed', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main>
        <article>
          <header><a href="/user1/">User 1</a></header>
          <p>Post content</p>
        </article>
        <article>
          <header><span>Suggested</span></header>
          <p>Suggested post content</p>
        </article>
        <article>
          <header><a href="/user2/">User 2</a></header>
          <p>Another post</p>
        </article>
        <article>
          <header><span>Recommended</span></header>
          <p>Recommended content</p>
        </article>
      </main>
    `;
  });

  describe('isSuggestedPost', () => {
    it('should return true for posts with Suggested label', () => {
      const suggestedPost = document.querySelectorAll('article')[1];
      expect(isSuggestedPost(suggestedPost as HTMLElement)).toBe(true);
    });

    it('should return true for posts with Recommended label', () => {
      const recommendedPost = document.querySelectorAll('article')[3];
      expect(isSuggestedPost(recommendedPost as HTMLElement)).toBe(true);
    });

    it('should return false for regular posts', () => {
      const regularPost = document.querySelectorAll('article')[0];
      expect(isSuggestedPost(regularPost as HTMLElement)).toBe(false);
    });

    it('should be case insensitive', () => {
      document.body.innerHTML = `
        <article><span>suggested</span></article>
      `;
      const post = document.querySelector('article') as HTMLElement;
      expect(isSuggestedPost(post)).toBe(true);
    });
  });

  describe('hideSuggestedPosts', () => {
    it('should hide suggested posts', () => {
      hideSuggestedPosts();
      const posts = document.querySelectorAll('article');
      expect((posts[1] as HTMLElement).style.display).toBe('none');
      expect((posts[3] as HTMLElement).style.display).toBe('none');
    });

    it('should not hide regular posts', () => {
      hideSuggestedPosts();
      const posts = document.querySelectorAll('article');
      expect((posts[0] as HTMLElement).style.display).toBe('');
      expect((posts[2] as HTMLElement).style.display).toBe('');
    });

    it('should set aria-hidden on suggested posts', () => {
      hideSuggestedPosts();
      const posts = document.querySelectorAll('article');
      expect(posts[1].getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('showAllPosts', () => {
    it('should show all posts', () => {
      hideSuggestedPosts();
      showAllPosts();
      const posts = document.querySelectorAll('article');
      expect((posts[0] as HTMLElement).style.display).toBe('');
      expect((posts[1] as HTMLElement).style.display).toBe('');
      expect((posts[2] as HTMLElement).style.display).toBe('');
    });

    it('should remove aria-hidden from all posts', () => {
      hideSuggestedPosts();
      showAllPosts();
      const posts = document.querySelectorAll('article');
      expect(posts[1].getAttribute('aria-hidden')).toBeNull();
    });
  });

  describe('runFeature', () => {
    it('should hide suggested posts when filterFeed is true', async () => {
      await runFeature({ hideExplore: true, hideReels: true, filterFeed: true, videoControls: true });
      const posts = document.querySelectorAll('article');
      expect((posts[1] as HTMLElement).style.display).toBe('none');
    });

    it('should show all posts when filterFeed is false', async () => {
      await runFeature({ hideExplore: true, hideReels: true, filterFeed: false, videoControls: true });
      const posts = document.querySelectorAll('article');
      expect((posts[1] as HTMLElement).style.display).toBe('');
    });
  });
});
