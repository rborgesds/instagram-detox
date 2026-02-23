export const SELECTORS = {
  exploreTab: 'a[href="/explore/"]',
  reelsTab: 'a[href="/reels/"]',
  feedPost: 'article',
  storyViewer: 'div[role="dialog"][aria-label="Story"]',
  reelVideo: 'video',
  storyVideo: 'article video',
  navigation: 'nav',
  mainNav: 'nav[aria-label="Main"]',
} as const;

export type SelectorKey = keyof typeof SELECTORS;
