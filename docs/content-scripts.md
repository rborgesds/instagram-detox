# Content Scripts

## Overview

Content scripts are the core of Instagram Detox. They run in the context of Instagram web pages and perform DOM modifications to achieve the desired behavior.

## Content Script Modules

### hide-explore.ts

**Purpose**: Remove Explore tab from navigation

**Implementation**:
- Targets `<a href="/explore/">` element
- Sets `display: none` and `aria-hidden="true"`
- Uses MutationObserver to handle SPA navigation

**Settings**: `hideExplore` (boolean)

### hide-reels.ts

**Purpose**: Remove Reels tab from navigation

**Implementation**:
- Targets `<a href="/reels/">` element
- Sets `display: none` and `aria-hidden="true"`
- Uses MutationObserver to handle SPA navigation

**Settings**: `hideReels` (boolean)

### filter-feed.ts

**Purpose**: Filter suggested/recommended posts from the main feed

**Implementation**:
- Targets all `<article>` elements
- Identifies suggested posts by text content (case-insensitive)
- Checks for: "Suggested", "Recommended", "Promoted"
- Sets `display: none` on matched posts

**Settings**: `filterFeed` (boolean)

### video-controls.ts

**Purpose**: Add native HTML5 controls to videos

**Implementation**:
- Targets all `<video>` elements
- Adds `controls` attribute
- Tracks processed videos to avoid duplicates
- Uses MutationObserver for dynamically loaded videos

**Settings**: `videoControls` (boolean)

## Common Patterns

### MutationObserver

All content scripts use MutationObserver with debouncing (150ms) to handle Instagram's SPA navigation. When users navigate between pages, the DOM changes are detected and the feature logic runs again.

### Settings Integration

Each content script:
1. Reads settings on initialization via `getSettings()`
2. Applies DOM modifications based on settings
3. Listens for `SETTINGS_UPDATED` messages from popup
4. Re-applies changes when settings change

### Error Handling

All DOM access is wrapped in try-catch or uses safe query helpers from `dom.ts`. The extension fails gracefully if Instagram's DOM structure changes.
