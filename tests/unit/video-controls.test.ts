import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  addControlsToVideo,
  addControlsToAllVideos,
  removeControlsFromVideos,
  runFeature,
} from '../../src/content/video-controls';

describe('video-controls', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="reels">
        <video src="reel1.mp4"></video>
        <video src="reel2.mp4"></video>
      </div>
      <div class="stories">
        <video src="story1.mp4"></video>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('addControlsToVideo', () => {
    it('should add controls attribute to video', () => {
      const video = document.querySelector('video') as HTMLVideoElement;
      addControlsToVideo(video);
      expect(video.hasAttribute('controls')).toBe(true);
    });

    it('should not add controls twice to same video', () => {
      const video = document.querySelector('video') as HTMLVideoElement;
      addControlsToVideo(video);
      addControlsToVideo(video);
      expect(video.hasAttribute('controls')).toBe(true);
    });

    it('should not add controls if already present', () => {
      document.body.innerHTML = '<video src="test.mp4" controls></video>';
      const video = document.querySelector('video') as HTMLVideoElement;
      addControlsToVideo(video);
      expect(video.hasAttribute('controls')).toBe(true);
    });
  });

  describe('addControlsToAllVideos', () => {
    it('should add controls to all videos', () => {
      addControlsToAllVideos();
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        expect((video as HTMLVideoElement).hasAttribute('controls')).toBe(true);
      });
    });

    it('should handle page with no videos', () => {
      document.body.innerHTML = '<div>No videos here</div>';
      expect(() => addControlsToAllVideos()).not.toThrow();
    });
  });

  describe('removeControlsFromVideos', () => {
    it('should remove controls from all videos', () => {
      addControlsToAllVideos();
      removeControlsFromVideos();
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        expect((video as HTMLVideoElement).hasAttribute('controls')).toBe(false);
      });
    });

    it('should handle page with no videos', () => {
      document.body.innerHTML = '<div>No videos here</div>';
      expect(() => removeControlsFromVideos()).not.toThrow();
    });
  });

  describe('runFeature', () => {
    it('should add controls when videoControls is true', async () => {
      await runFeature({
        hideExplore: true,
        hideReels: true,
        filterFeed: true,
        videoControls: true,
      });
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        expect((video as HTMLVideoElement).hasAttribute('controls')).toBe(true);
      });
    });

    it('should remove controls when videoControls is false', async () => {
      await runFeature({
        hideExplore: true,
        hideReels: true,
        filterFeed: true,
        videoControls: true,
      });
      await runFeature({
        hideExplore: true,
        hideReels: true,
        filterFeed: true,
        videoControls: false,
      });
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        expect((video as HTMLVideoElement).hasAttribute('controls')).toBe(false);
      });
    });
  });
});
