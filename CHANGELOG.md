# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - YYYY-MM-DD

### Added
- Project foundation with build system and tooling
- Basic folder structure
- Placeholder content script
- Basic popup UI with settings toggles
- Core utilities (types, storage, DOM helpers, selectors, constants)
- Unit tests for utilities (19 tests)
- Feature: Hide Explore tab (MutationObserver, settings integration)
- Unit tests for hide-explore module (7 tests)
- Feature: Hide Reels tab (MutationObserver, settings integration)
- Unit tests for hide-reels module (7 tests)
- Feature: Following-Only Feed (filters Suggested/Recommended posts)
- Unit tests for filter-feed module (11 tests)
- Feature: Native Video Controls (adds HTML5 controls to Reels and Stories)
- Unit tests for video-controls module (9 tests)
- Test setup file with chrome global stubs
- Popup UI with keyboard accessibility and ARIA attributes
- Documentation (architecture, content-scripts, privacy, testing, build)
- E2E test suite structure (Playwright)
- Additional unit tests for constants and popup (58 tests total)
- Coverage reporting with @vitest/coverage-v8

### Changed
- Updated project structure in README
