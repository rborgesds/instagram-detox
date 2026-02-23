import { getSettings } from '../utils/storage';
import { querySelectorAllSafe, observeMutations, debounce } from '../utils/dom';
import { Settings } from '../types';

let observer: MutationObserver | null = null;
const processedVideos = new Set<HTMLVideoElement>();

function addControlsToVideo(video: HTMLVideoElement): void {
  if (processedVideos.has(video)) {
    return;
  }

  if (video.hasAttribute('controls')) {
    processedVideos.add(video);
    return;
  }

  video.setAttribute('controls', 'true');
  processedVideos.add(video);
}

function addControlsToAllVideos(): void {
  const videos = querySelectorAllSafe<HTMLVideoElement>('video');
  videos.forEach(addControlsToVideo);
}

function removeControlsFromVideos(): void {
  const videos = querySelectorAllSafe<HTMLVideoElement>('video[controls]');
  videos.forEach((video) => {
    video.removeAttribute('controls');
    processedVideos.delete(video);
  });
}

const debouncedAddControls = debounce(addControlsToAllVideos, 150);

async function runFeature(settings: Settings): Promise<void> {
  if (settings.videoControls) {
    addControlsToAllVideos();
    if (!observer) {
      observer = observeMutations(debouncedAddControls);
    }
  } else {
    removeControlsFromVideos();
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }
}

async function init(): Promise<void> {
  const settings = await getSettings();
  await runFeature(settings);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'SETTINGS_UPDATED') {
      runFeature(message.settings as Settings);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { addControlsToVideo, addControlsToAllVideos, removeControlsFromVideos, runFeature, init };
