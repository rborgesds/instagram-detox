const DEFAULT_SETTINGS = {
  hideExplore: true,
  hideReels: true,
  filterFeed: true,
  videoControls: true,
};

interface Settings {
  hideExplore: boolean;
  hideReels: boolean;
  filterFeed: boolean;
  videoControls: boolean;
}

async function loadSettings(): Promise<Settings> {
  const stored = await chrome.storage.local.get(DEFAULT_SETTINGS);
  return stored as Settings;
}

async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set(settings);
  chrome.runtime.sendMessage({ type: 'SETTINGS_UPDATED', settings });
}

function updateToggles(settings: Settings): void {
  (document.getElementById('hide-explore') as HTMLInputElement).checked = settings.hideExplore;
  (document.getElementById('hide-reels') as HTMLInputElement).checked = settings.hideReels;
  (document.getElementById('filter-feed') as HTMLInputElement).checked = settings.filterFeed;
  (document.getElementById('video-controls') as HTMLInputElement).checked = settings.videoControls;
}

async function init(): Promise<void> {
  const settings = await loadSettings();
  updateToggles(settings);

  const toggles = ['hide-explore', 'hide-reels', 'filter-feed', 'video-controls'];
  const settingsKeys: (keyof Settings)[] = [
    'hideExplore',
    'hideReels',
    'filterFeed',
    'videoControls',
  ];

  for (let i = 0; i < toggles.length; i++) {
    const toggle = document.getElementById(toggles[i]) as HTMLInputElement;
    const key = settingsKeys[i];
    toggle.addEventListener('change', async () => {
      const currentSettings = await loadSettings();
      currentSettings[key] = toggle.checked;
      await saveSettings(currentSettings);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
