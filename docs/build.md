# Build & Release

## Build System

Instagram Detox uses:

- **Vite** - Module bundler
- **TypeScript** - Type checking
- **ESLint** - Linting
- **Prettier** - Code formatting

## Build Commands

```bash
npm run build       # Build for development
npm run build:prod  # Build for production
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

## Build Output

Build output goes to `dist/`:

```
dist/
├── manifest.json      # Extension manifest
├── content.js         # Bundled content scripts
├── popup.js           # Bundled popup script
├── popup/
│   ├── index.html     # Popup HTML
│   └── styles.css    # Popup styles
└── icons/            # Extension icons
```

## Loading the Extension

1. Run `npm run build`
2. Open Chrome at `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist/` folder

## Chrome Web Store

To publish to Chrome Web Store:

1. Update version in `manifest.json` and `package.json`
2. Run `npm run build:prod`
3. Zip the `dist/` folder
4. Upload via Chrome Web Store Developer Dashboard

### Pre-publish Checklist

- [ ] Update version numbers
- [ ] Add extension icons (16, 48, 128px)
- [ ] Add screenshots for store listing
- [ ] Write privacy policy (states zero data collection)
- [ ] Verify all features work
- [ ] Run full test suite
- [ ] Run lint checks

## Versioning

Follow Semantic Versioning (semver):

- **MAJOR** - Breaking changes
- **MINOR** - New features
- **PATCH** - Bug fixes

Update versions in:
- `package.json`
- `manifest.json`
- `CHANGELOG.md`
