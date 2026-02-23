export interface FeatureFlags {
  hideExplore: boolean;
  hideReels: boolean;
  filterFeed: boolean;
  videoControls: boolean;
}

export interface Settings extends FeatureFlags {}

export const DEFAULT_SETTINGS: Settings = {
  hideExplore: true,
  hideReels: true,
  filterFeed: true,
  videoControls: true,
};
