import { getSettings } from '../utils/storage';
import { querySelectorSafe, observeMutations, debounce } from '../utils/dom';
import { SELECTORS } from '../utils/selectors';
import { Settings } from '../types';

let observer: MutationObserver | null = null;

function hideReelsTab(): void {
  const reelsLink = querySelectorSafe<HTMLAnchorElement>(SELECTORS.reelsTab);
  if (reelsLink) {
    reelsLink.style.display = 'none';
    reelsLink.setAttribute('aria-hidden', 'true');
  }
}

function showReelsTab(): void {
  const reelsLink = querySelectorSafe<HTMLAnchorElement>(SELECTORS.reelsTab);
  if (reelsLink) {
    reelsLink.style.display = '';
    reelsLink.removeAttribute('aria-hidden');
  }
}

const debouncedHideReels = debounce(hideReelsTab, 150);

async function runFeature(settings: Settings): Promise<void> {
  if (settings.hideReels) {
    hideReelsTab();
    if (!observer) {
      observer = observeMutations(debouncedHideReels);
    }
  } else {
    showReelsTab();
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

export { hideReelsTab, showReelsTab, runFeature, init };
