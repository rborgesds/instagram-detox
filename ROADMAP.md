# Instagram Detox - Implementation Roadmap

## Overview

This roadmap defines the sequential milestones for building Instagram Detox, a privacy-focused Chrome extension that removes algorithmic distractions from Instagram.

**Development Mode**: Sequential — each milestone must be complete and verified before starting the next.

---

## Milestone 1: Project Foundation

**Goal**: Set up development environment, build system, and tooling.

### Deliverables

- `package.json` with dependencies (TypeScript, Vite/ESBuild, ESLint, Prettier, Vitest)
- `tsconfig.json` with strict mode enabled
- `.eslintrc.json` with TypeScript recommended rules
- `.prettierrc` with defaults
- `manifest.json` (Manifest V3)
- Basic folder structure (`src/`, `tests/`, `docs/`)
- `icons/` folder with placeholder icons (16, 48, 128px)

### Acceptance Criteria

- [x] `npm install` succeeds without errors
- [x] `npm run build` produces output in `/dist`
- [x] `npm run lint` passes without errors
- [x] `npm run format` formats code correctly
- [ ] Extension loads in Chrome (empty/placeholder content script)

### Tests

- **Unit Tests**: None (tooling verification)
- **Integration Tests**: None
- **E2E Tests**: None

### Manual Verification Steps

1. Run `npm install` — verify no errors
2. Run `npm run build` — verify `/dist` folder created with files
3. Run `npm run lint` — verify no lint errors
4. Open Chrome, navigate to `chrome://extensions`
5. Enable Developer Mode
6. Click "Load unpacked", select `/dist` folder
7. Verify extension icon appears in toolbar
8. Visit `https://www.instagram.com` — verify extension loads without console errors

### Definition of Done

- [x] All npm scripts work without errors
- [ ] Extension installs and loads in Chrome
- [ ] No console errors on Instagram page
- [x] Project structure matches AGENTS.md specification

---

## Milestone 2: Core Utilities

**Goal**: Build reusable infrastructure modules.

### Deliverables

- `src/types/index.ts` — Global TypeScript types (Settings, FeatureFlags)
- `src/utils/storage.ts` — chrome.storage abstraction with typed get/set
- `src/utils/dom.ts` — Safe DOM query helpers with null checks
- `src/utils/selectors.ts` — Centralized DOM selectors (semantic, class-agnostic)
- `src/utils/constants.ts` — Storage keys, config defaults

### Acceptance Criteria

- [x] Storage utility reads/writes to chrome.storage.local
- [x] DOM utilities safely handle missing elements
- [x] Selectors use semantic attributes (href, role, aria-label), not classes
- [x] All utilities strictly typed (no `any`)
- [x] Default settings properly initialized

### Tests

- **Unit Tests**: storage.ts (get, set, getDefault, mergeDefaults), dom.ts (querySelectorSafe, querySelectorAllSafe, observeMutations), selectors.ts (verify non-class-based)
- **Integration Tests**: None
- **E2E Tests**: None

### Manual Verification Steps

1. Run `npm run test` — verify all unit tests pass
2. Run `npm run lint` — verify no lint errors
3. Verify all utility files exist with correct exports

### Definition of Done

- [x] All unit tests pass
- [x] Lint checks pass
- [x] No `any` types used
- [x] Selectors documented and class-free

---

## Milestone 3: Feature — Hide Explore Tab

**Goal**: Remove Explore tab from navigation.

### Deliverables

- `src/content/hide-explore.ts` — Content script module
- MutationObserver with debouncing (shared infrastructure)
- Settings integration
- Unit tests for module

### Acceptance Criteria

- [x] Explore tab is hidden on Instagram main page
- [x] Feature can be toggled on/off via settings
- [x] Works with Instagram's SPA navigation (MutationObserver)
- [x] No console errors
- [x] Does not break page functionality

### Tests

- **Unit Tests**: Selector matching, settings toggle logic, debounce function
- **Integration Tests**: None
- **E2E Tests**: Load Instagram, verify Explore tab is not visible in nav

### Manual Verification Steps

1. Build and reload extension in Chrome
2. Visit `https://www.instagram.com`
3. Verify Explore tab is not visible in left navigation
4. Open extension popup, toggle "Hide Explore" off
5. Verify Explore tab reappears
6. Toggle back on, verify it disappears
7. Navigate to different Instagram pages — verify it stays hidden

### Definition of Done

- [x] All unit tests pass
- [ ] E2E verification successful
- [x] Feature toggles correctly via settings
- [x] No console errors

---

## Milestone 4: Feature — Hide Reels Tab

**Goal**: Remove Reels tab from navigation.

### Deliverables

- `src/content/hide-reels.ts` — Content script module
- Reuses MutationObserver from M3
- Unit tests for module

### Acceptance Criteria

- [x] Reels tab is hidden on Instagram main page
- [x] Feature can be toggled on/off via settings
- [x] Works with Instagram's SPA navigation
- [x] No console errors

### Tests

- **Unit Tests**: Selector matching for Reels tab, settings toggle logic
- **Integration Tests**: None
- **E2E Tests**: Load Instagram, verify Reels tab is not visible in nav

### Manual Verification Steps

1. Build and reload extension in Chrome
2. Visit `https://www.instagram.com`
3. Verify Reels tab is not visible in left navigation
4. Open extension popup, toggle "Hide Reels" off
5. Verify Reels tab reappears
6. Navigate to different Instagram pages — verify it stays hidden

### Definition of Done

- [x] All unit tests pass
- [ ] E2E verification successful
- [x] Feature toggles correctly via settings

---

## Milestone 5: Feature — Following-Only Feed

**Goal**: Filter out suggested posts, show only followed accounts.

### Deliverables

- `src/content/filter-feed.ts` — Content script module
- Logic to identify and hide "Suggested" / "Recommended" posts
- Unit tests for module

### Acceptance Criteria

- [x] Suggested posts are hidden from feed
- [x] Posts from followed accounts remain visible
- [x] Feature can be toggled on/off via settings
- [x] Works as user scrolls (new content filtered)
- [x] No false positives (real followed posts not hidden)

### Tests

- **Unit Tests**: Post element classification, hide/reveal logic, settings toggle
- **Integration Tests**: None
- **E2E Tests**: Load Instagram feed, scroll, verify suggested posts are hidden

### Manual Verification Steps

1. Build and reload extension in Chrome
2. Visit `https://www.instagram.com`
3. Scroll through feed — verify no "Suggested" posts appear
4. Verify posts from followed accounts are visible
5. Open extension popup, toggle "Filter Feed" off
6. Refresh page, verify suggested posts now appear
7. Scroll down, verify filtering works on new content

### Definition of Done

- [x] All unit tests pass
- [ ] E2E verification successful
- [x] No false positives (followed posts visible)
- [x] Works on scroll

---

## Milestone 6: Feature — Native Video Controls

**Goal**: Add HTML5 controls to Reels and Stories.

### Deliverables

- `src/content/video-controls.ts` — Content script module
- Inject controls into Reels video elements
- Inject controls into Story video elements
- Unit tests for module

### Acceptance Criteria

- [x] Reels have native pause/play, scrub, volume controls
- [x] Stories have native controls
- [x] Feature can be toggled on/off via settings
- [x] Controls appear on video load
- [x] Does not interfere with video playback

### Tests

- **Unit Tests**: Video element detection, controls injection logic, settings toggle
- **Integration Tests**: None
- **E2E Tests**: Open a Reel, verify native controls; Open a Story, verify native controls

### Manual Verification Steps

1. Build and reload extension in Chrome
2. Visit a Reel (e.g., via explore or direct link)
3. Verify native HTML5 controls appear on video
4. Test pause/play, scrubbing, volume
5. Open a Story, verify native controls appear
6. Open extension popup, toggle "Video Controls" off
7. Refresh, verify native controls are hidden

### Definition of Done

- [x] All unit tests pass
- [ ] E2E verification successful
- [x] Controls work on both Reels and Stories

---

## Milestone 7: Popup UI

**Goal**: Settings interface for toggling features.

### Deliverables

- `src/popup/index.html` — Popup HTML
- `src/popup/index.ts` — Popup logic
- `src/popup/styles.css` — Popup styling
- chrome.runtime messaging for settings communication
- Unit tests for popup logic

### Acceptance Criteria

- [x] Popup displays 4 toggles: Hide Explore, Hide Reels, Filter Feed, Video Controls
- [x] Toggles persist to chrome.storage.local
- [x] Content scripts react to settings changes in real-time
- [x] Popup is keyboard accessible
- [x] Default settings applied on first install
- [x] Visual design matches privacy-focused aesthetic

### Tests

- **Unit Tests**: Settings serialization/deserialization, message passing, toggle state
- **Integration Tests**: None
- **E2E Tests**: Open popup toggle each feature verify settings persist; Toggle feature refresh Instagram verify feature applies

### Manual Verification Steps

1. Build and reload extension in Chrome
2. Click extension icon in toolbar
3. Verify popup opens with 4 toggles
4. Toggle each feature on/off — verify visual feedback
5. Close popup, reopen — verify settings persisted
6. Visit Instagram, verify each feature works per settings
7. Test keyboard navigation (Tab through toggles, Enter/Space to toggle)
8. Uninstall and reinstall extension, verify defaults applied

### Definition of Done

- [x] All unit tests pass
- [ ] E2E verification successful
- [x] Keyboard accessible
- [x] Settings persist correctly

---

## Milestone 8: Documentation

**Goal**: Complete documentation as required by AGENTS.md.

### Deliverables

- `docs/architecture.md` — System architecture overview
- `docs/content-scripts.md` — Content script modules documentation
- `docs/privacy.md` — Privacy and security considerations
- `docs/testing.md` — Testing strategy and coverage
- `docs/build.md` — Build and release process

### Acceptance Criteria

- [ ] All 5 docs exist in `/docs`
- [ ] Each module has corresponding documentation
- [ ] README is complete and accurate
- [ ] Documentation reflects current implementation

### Tests

- **Unit Tests**: None
- **Integration Tests**: None
- **E2E Tests**: None

### Manual Verification Steps

1. Verify all 5 doc files exist in `/docs`
2. Review each document for completeness
3. Verify documentation matches code structure

### Definition of Done

- [ ] All 5 docs exist
- [ ] Documentation is accurate and complete

---

## Milestone 9: Testing & Polish

**Goal**: Comprehensive testing and final refinements.

### Deliverables

- Unit test coverage reports (>80% coverage target)
- E2E test suite (Playwright)
- Memory leak verification
- Performance profiling
- Chrome Web Store compliance checklist

### Acceptance Criteria

- [ ] All unit tests pass
- [ ] All E2E tests pass
- [ ] Unit test coverage >80%
- [ ] No memory leaks (extended use test)
- [ ] No scrolling performance degradation
- [ ] Lint and format checks pass
- [ ] Chrome Web Store compliance verified
- [ ] Icons created (16, 48, 128px)

### Tests

- **Unit Tests**: Full coverage on all modules
- **Integration Tests**: Full coverage
- **E2E Tests**: Complete user flow testing

### Manual Verification Steps

1. Run `npm run test` — verify all unit tests pass with >80% coverage
2. Run `npm run test:e2e` — verify all E2E tests pass
3. Run `npm run lint` and `npm run format` — verify passes
4. Use Chrome with extension for 30+ minutes
5. Monitor memory usage — verify no leaks
6. Scroll extensively on Instagram feed — verify no performance issues
7. Complete Chrome Web Store compliance checklist
8. Verify icons exist at 16, 48, 128px

### Definition of Done

- [ ] All tests pass
- [ ] Coverage target met
- [ ] No memory leaks
- [ ] No performance issues
- [ ] Chrome Web Store ready

---

## Sequential Order

```
M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8 → M9
```

Each milestone must be complete and verified before starting the next.

---

## Test Summary by Milestone

| Milestone | Unit Tests | Integration Tests | E2E Tests |
|-----------|------------|-------------------|------------|
| M1: Foundation | 0 | 0 | 0 |
| M2: Utilities | 5 | 0 | 0 |
| M3: Hide Explore | 3 | 0 | 1 |
| M4: Hide Reels | 2 | 0 | 1 |
| M5: Filter Feed | 3 | 0 | 1 |
| M6: Video Controls | 3 | 0 | 2 |
| M7: Popup UI | 3 | 0 | 2 |
| M8: Documentation | 0 | 0 | 0 |
| M9: Testing & Polish | Full | Full | Full |

**Total E2E Tests**: 7 (feature verification) + Full suite (M9)
