import { getSettings } from '../utils/storage';
import { querySelectorAllSafe, observeMutations, debounce } from '../utils/dom';
import { Settings } from '../types';

let observer: MutationObserver | null = null;

const SUGGESTED_LABELS = ['Suggested', 'Recommended', 'Promoted'];
const POST_SELECTOR = 'article';

function isSuggestedPost(article: HTMLElement): boolean {
  const articleText = article.textContent?.toLowerCase() || '';
  return SUGGESTED_LABELS.some((label) => articleText.includes(label.toLowerCase()));
}

function hideSuggestedPosts(): void {
  const posts = querySelectorAllSafe<HTMLElement>(POST_SELECTOR);
  posts.forEach((post) => {
    if (isSuggestedPost(post)) {
      post.style.display = 'none';
      post.setAttribute('aria-hidden', 'true');
    }
  });
}

function showAllPosts(): void {
  const posts = querySelectorAllSafe<HTMLElement>(POST_SELECTOR);
  posts.forEach((post) => {
    post.style.display = '';
    post.removeAttribute('aria-hidden');
  });
}

const debouncedFilterFeed = debounce(hideSuggestedPosts, 150);

async function runFeature(settings: Settings): Promise<void> {
  if (settings.filterFeed) {
    hideSuggestedPosts();
    if (!observer) {
      observer = observeMutations(debouncedFilterFeed);
    }
  } else {
    showAllPosts();
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

export { hideSuggestedPosts, showAllPosts, isSuggestedPost, runFeature, init };
