
// MobileViewMode now applies to both mobile and desktop views
export type MobileViewMode = 'both' | 'left' | 'right';

// ViewModeType is used for column count calculations
export type ViewModeType = 'desktop' | 'desktop-single' | 'mobile-split' | 'mobile-single';

// Media item for gallery display
export interface MediaItem {
  id: string;
  alt?: string;
  createdAt?: string;
  isVideo?: boolean;
}
