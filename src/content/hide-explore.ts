import { getSettings } from '../utils/storage';
import { querySelectorSafe, observeMutations, debounce } from '../utils/dom';
import { SELECTORS } from '../utils/selectors';
import { Settings } from '../types';

let observer: MutationObserver | null = null;

function hideExploreTab(): void {
  const exploreLink = querySelectorSafe<HTMLAnchorElement>(SELECTORS.exploreTab);
  if (exploreLink) {
    exploreLink.style.display = 'none';
    exploreLink.setAttribute('aria-hidden', 'true');
  }
}

function showExploreTab(): void {
  const exploreLink = querySelectorSafe<HTMLAnchorElement>(SELECTORS.exploreTab);
  if (exploreLink) {
    exploreLink.style.display = '';
    exploreLink.removeAttribute('aria-hidden');
  }
}

const debouncedHideExplore = debounce(hideExploreTab, 150);

async function runFeature(settings: Settings): Promise<void> {
  if (settings.hideExplore) {
    hideExploreTab();
    if (!observer) {
      observer = observeMutations(debouncedHideExplore);
    }
  } else {
    showExploreTab();
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

export { hideExploreTab, showExploreTab, runFeature, init };
