# Instagram Detox

Instagram Detox is a privacy-focused Chrome extension that removes distractions from Instagram and restores the platform to what it was meant to be: a place to connect with friends.

It hides Explore and Reels, filters the feed to only show posts from accounts you follow, and adds native video controls to Reels and Stories.

No tracking.
No data collection.
No external servers.
No analytics.

Everything runs locally in your browser.

---

## Vision

Instagram has shifted toward algorithmic entertainment. This extension is designed to:

- Remove algorithm-driven distractions
- Reduce passive consumption
- Encourage intentional interaction
- Restore a friend-first experience

The goal is clarity over consumption.

---

## Features

### Hide Explore and Reels

Removes Explore and Reels navigation tabs from Instagram.

### Following-Only Feed

Filters out suggested posts and algorithmic recommendations, leaving only posts from accounts you follow.

### Video Controls

Adds native HTML5 controls to:

- Reels
- Stories

This allows pause, scrubbing, and volume control.

### Optional Popup Controls

Users can toggle:

- Hide Explore
- Hide Reels
- Following-only feed
- Video controls

All preferences are stored locally using `chrome.storage`.

---

## Privacy & Security

Instagram Detox is built with a strict privacy-first philosophy:

- No data collection
- No analytics
- No remote requests
- No external script injection
- No tracking
- No logging of user behavior
- No authentication bypassing
- No scraping of private data

All functionality operates entirely client-side.

The extension only modifies the DOM of `https://www.instagram.com/*`.

---

## Tech Stack

- TypeScript (strict mode enabled)
- Chrome Extension Manifest V3
- ESLint (TypeScript recommended rules)
- Prettier
- MutationObserver for SPA-safe DOM updates
- Unit tests
- E2E tests (where feasible)

---

## Project Structure

instagram-detox/
│
├── src/
│   ├── content/
│   ├── popup/
│   ├── utils/
│   ├── styles/
│   └── types/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── docs/
├── icons/
├── manifest.json
├── tsconfig.json
├── package.json
├── .eslintrc.json
├── .prettierrc
├── AGENTS.md
├── ROADMAP.md
└── CHANGELOG.md

All architecture documentation lives inside the `docs/` folder.

No inline comments are used in source files. Explanations are documented separately.

---

## Development

Install dependencies:

```
npm install
```

Build:

```
npm run build
```

Lint:

```
npm run lint
```

Format:

```
npm run format
```

Run unit tests:

```
npm run test
```

Run E2E tests:

```
npm run test:e2e
```

---

## Loading Locally

1. Run build
2. Open chrome://extensions
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select the dist/ folder

---

## Chrome Web Store Compliance

This extension:

- Uses Manifest V3
- Does not request unnecessary permissions
- Does not collect personal data
- Does not inject remote code
- Does not interfere with Instagram authentication

Before publishing:

- Add icons (16, 48, 128)
- Provide screenshots
- Add a privacy policy page stating zero data collection

---

## Testing Strategy

### Unit Tests

Cover:

- DOM utilities
- Feed filtering logic
- Storage abstraction
- Video control injection

### E2E Tests

Simulate:

- Tabs being hidden
- Suggested posts removed
- Video controls enabled
- Popup toggling features

E2E tests are designed to ensure resilience against Instagram DOM updates.

---

## Design Philosophy

Instagram Detox does not add features.
It removes noise.

It does not attempt to hack or bypass the platform.
It only modifies client-side presentation.

The extension aims to:

- Reduce compulsive scrolling
- Remove algorithmic bait
- Promote mindful usage
- Keep Instagram social

---

## Contributing

This project follows:

- Strict TypeScript typing
- ESLint recommended rules
- Prettier formatting
- No inline code comments
- Documentation in markdown files only
- Modular architecture

Pull requests must include:

- Updated documentation if applicable
- Unit tests
- Passing lint checks

