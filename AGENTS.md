<!-- AGENTS.md -->

# Instagram Detox - OpenCode Rules

This file contains custom instructions for OpenCode to apply when working on the “Instagram Detox” Chrome extension project.

## Project Vision

We are building a Chrome extension called **Instagram Detox** that improves the Instagram web experience by:

1. Hiding the **Explore** and **Reels** tabs.
2. Showing **only the “Following” feed** and removing suggested posts.
3. Adding **native video controls** to Reels and Stories.
4. Keeping Instagram focused on **friend interactions**, not algorithmic entertainment.

## Privacy & Safety

This extension must prioritize **user privacy and safety**:

- Do **not** collect any user data.
- Do **not** track or log any interactions.
- Do **not** send information to any servers.
- Do **not** bypass Instagram authentication or security.
- Do **not** inject third-party scripts.
- All features must operate entirely client-side in the user’s browser.

## Project Structure

We follow a strict modular architecture:

- `src/`
  - `content/` — content script modules (DOM modification logic)
  - `popup/` — optional settings popup UI
  - `utils/` — reusable helpers (DOM, storage, types)
  - `styles/` — CSS specific to the extension
  - `types/` — global TypeScript type definitions
- `tests/`
  - `unit/` — unit tests for utilities and modules
  - `e2e/` — E2E tests simulating user interaction if feasible
- `manifest.json` — Chrome Extension Manifest V3
- `tsconfig.json` — TypeScript config
- `package.json` — dependencies, build scripts
- `icons/` — extension icons
- `.eslintrc.json` — ESLint rules
- `.prettierrc` — Prettier formatting rules
- `docs/` — markdown documentation for modules, features, and architecture

## Coding Standards

### TypeScript

- Always use strict typing (`strict: true` in tsconfig).
- No `any` unless completely unavoidable.
- Prefer smaller modules with single responsibility.
- **No inline comments or unnecessary comments**; explanations should go in `docs/`.
- All DOM selectors should be robust and resilient to Instagram changes.
- Follow modular design patterns.

### Chrome Extension

- Use **Manifest V3**.
- Content scripts must modify DOM safely via **MutationObserver**.
- Only affect client-side behavior, never server-side.

### UI

- Popup should allow toggling features:
  - Hide Explore
  - Hide Reels
  - Filter Following feed
  - Enable/disable video controls

### Tooling

#### ESLint

Use recommended TypeScript ESLint:

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "no-inline-comments": "error"
  }
}
```

#### Prettier

Use default Prettier formatting.

### Testing

- Unit tests for all utilities and modules.
- E2E tests simulating user interactions if feasible (e.g., Cypress or Playwright):
  - Tabs are hidden correctly
  - Feed is filtered
  - Video controls work
  - Popup toggles features
- Tests in `tests/` folder; generate coverage reports.

### Best Practices

- Keep constants (selectors, storage keys) in a central place.
- Do not rely on internal Instagram implementation details.
- Ensure Chrome Web Store compliance.
- All DOM modifications must be client-side only.
- Focus on privacy, security, and minimal attack surface.

### UX Philosophy

Instagram Detox is about clarity over consumption:

- Remove anything that distracts from connecting with friends.
- Do not add algorithm-driven suggestions.
- Allow users to decide what content they want to see via settings.
- Keep Instagram lightweight, safe, and distraction-free.

## Non-Goals

The extension must NOT:

- Remove Instagram ads via request blocking
- Modify backend network calls
- Scrape user data
- Inject remote scripts
- Implement follower analytics
- Automate user interactions
- Interfere with authentication or cookies
- Depend on Instagram private APIs

## Performance Requirements

- MutationObserver must be debounced or scoped to minimal DOM regions.
- Avoid full document re-querying on every mutation.
- Avoid unnecessary re-renders.
- No memory leaks.
- Content script must not noticeably degrade scrolling performance.

## Selector Strategy

- Avoid class-based selectors.
- Prefer semantic attributes (href, role, aria-label).
- Centralize selectors in a constants file.
- All selectors must be isolated in one module.

## State Management

- All feature flags must be stored in chrome.storage.local.
- Default settings must be explicitly defined.
- Content scripts must read settings on load and react to changes.
- Popup must communicate via chrome.runtime messaging.

## Error Handling

- Fail gracefully if Instagram DOM changes.
- Do not throw uncaught exceptions.
- No console logs in production build.
- Wrap DOM access safely.

## Build System

- Use Vite or ESBuild for bundling.
- Output compiled files to /dist.
- Manifest.json should be copied to /dist.
- No dev dependencies included in production bundle.

## Testing Stack

- Unit testing: Vitest or Jest
- DOM testing: jsdom
- E2E testing: Playwright
- Coverage reports required

## Documentation Requirements

All documentation must be in the /docs folder:

- architecture.md
- content-scripts.md
- privacy.md
- testing.md
- build.md

Each module must be documented.

## Versioning

- Follow semantic versioning (semver).
- Update version in manifest.json and package.json.
- Maintain CHANGELOG.md.

## Accessibility

- Do not remove core navigation functionality.
- Do not break keyboard navigation.
- Ensure popup is keyboard accessible.
