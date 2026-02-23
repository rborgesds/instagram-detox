# Privacy & Security

## Core Principles

Instagram Detox is built with a strict privacy-first philosophy. The extension operates entirely client-side and makes no network requests.

## What We Do NOT Do

- Collect any user data
- Track or log user interactions
- Send information to external servers
- Use analytics or telemetry
- Inject third-party scripts
- Bypass Instagram authentication
- Scrape user data

## What We DO Do

- Modify DOM locally to hide/show elements
- Store user preferences locally via chrome.storage.local
- Only run on https://www.instagram.com/*

## Data Handling

### Local Storage

User preferences are stored in `chrome.storage.local`:

```typescript
interface Settings {
  hideExplore: boolean;    // default: true
  hideReels: boolean;      // default: true
  filterFeed: boolean;     // default: true
  videoControls: boolean;  // default: true
}
```

No personal data, browsing history, or content is ever stored.

### Content Scripts

Content scripts only:
- Read settings from storage
- Modify DOM elements (hide/show, add attributes)
- Listen for settings change messages

They do not:
- Read page content
- Make network requests
- Access cookies or tokens

## Chrome Extension Permissions

The extension requests only:

- `storage` - For saving user preferences
- Host permission for `https://www.instagram.com/*` - For content scripts to run

No other permissions are requested.

## Security Best Practices

- No remote code execution
- All dependencies are bundled at build time
- No eval() or dynamic code execution
- CSP-compliant (no inline scripts in production)
