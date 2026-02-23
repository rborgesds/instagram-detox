# Testing

## Testing Strategy

Instagram Detox uses a multi-level testing approach:

1. **Unit Tests** - Test individual functions and modules
2. **E2E Tests** - Test user interactions (future)

## Running Tests

### Unit Tests

```bash
npm run test        # Run tests once
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### E2E Tests

```bash
npm run test:e2e
```

## Unit Test Structure

Tests are located in `tests/unit/` and mirror the source structure:

```
tests/unit/
├── dom.test.ts          # Tests for dom.ts utilities
├── storage.test.ts      # Tests for storage.ts utilities
├── selectors.test.ts    # Tests for selectors
├── hide-explore.test.ts # Tests for hide-explore module
├── hide-reels.test.ts   # Tests for hide-reels module
├── filter-feed.test.ts  # Tests for filter-feed module
└── video-controls.test.ts # Tests for video-controls module
```

## Test Framework

- **Vitest** - Test runner
- **jsdom** - DOM simulation for content script tests

## Test Coverage

Current coverage: ~80% target for unit tests.

Key areas tested:
- DOM utilities (querySelectorSafe, querySelectorAllSafe, debounce)
- Storage utilities (getSettings, saveSettings, updateSetting)
- Selector validation (no class-based selectors)
- Content script logic (hide/show, filtering, controls injection)

## E2E Testing

E2E tests verify user interactions in a real browser:

- Tabs are hidden correctly
- Feed filtering works
- Video controls appear
- Popup toggles persist

E2E tests use Playwright and simulate real user flows.
