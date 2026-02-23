# Architecture

## Overview

Instagram Detox is a Chrome Extension (Manifest V3) that modifies the Instagram web experience client-side. The architecture follows a modular pattern with clear separation of concerns.

## Project Structure

```
instagram-detox/
├── src/
│   ├── content/          # Content scripts (DOM modifications)
│   ├── popup/            # Extension popup UI
│   ├── utils/            # Shared utilities
│   ├── types/            # TypeScript type definitions
│   └── styles/           # CSS files
├── tests/
│   ├── unit/             # Unit tests (Vitest)
│   └── e2e/              # E2E tests (Playwright)
├── docs/                 # Documentation
└── dist/                 # Build output
```

## Core Components

### Content Scripts

Content scripts run in the context of Instagram pages and handle DOM modifications:

- `hide-explore.ts` - Hides the Explore tab
- `hide-reels.ts` - Hides the Reels tab
- `filter-feed.ts` - Filters suggested posts from feed
- `video-controls.ts` - Adds native HTML5 controls to videos

Each content script:
- Reads settings on initialization
- Uses MutationObserver for SPA navigation support
- Reacts to settings changes via chrome.runtime messages

### Popup

The popup provides a settings interface:

- `index.html` - Popup UI with toggle switches
- `index.ts` - Settings management logic
- `styles.css` - Styling

### Utilities

- `storage.ts` - chrome.storage abstraction
- `dom.ts` - Safe DOM query helpers
- `selectors.ts` - Centralized selectors
- `constants.ts` - Configuration values

## Data Flow

1. User toggles setting in popup
2. Popup saves to chrome.storage.local
3. Popup sends message via chrome.runtime.sendMessage
4. Content scripts receive message via chrome.runtime.onMessage
5. Content scripts update DOM accordingly

## Build System

- Vite for bundling
- TypeScript for type safety
- ESLint + Prettier for code quality
- Vitest for unit testing
- Playwright for E2E testing
