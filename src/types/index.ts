export type NavTab = 'home' | 'communicate' | 'gaze' | 'voice' | 'settings';

export type PhraseCategory = 'urgent' | 'needs' | 'responses' | 'feelings' | 'custom';

export interface PhraseItem {
  id: string;
  text: string;
  category: PhraseCategory;
  shortLabel?: string;
  urgent?: boolean;
}

export interface SpeechSettings {
  voiceURI: string;
  rate: number;
  pitch: number;
  volume: number;
}

export type TileSize = 'normal' | 'large' | 'xlarge';

export interface AppSettings {
  tileSize: TileSize;
  highContrastBorders: boolean;
  mirrorCamera: boolean;
  autoSpeakOnTileClick: boolean;
  dwellPreviewEnabled: boolean;
  dwellTimeMs: number;
}

export type WebcamStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unsupported' | 'error';

export interface CalibrationPoint {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
}

export interface AarambhDesktopAPI {
  isDesktop: boolean;
  platform: string;
  requestCameraPermission: () => Promise<string>;
  openCameraPrivacySettings: () => Promise<void>;
}

declare global {
  interface Window {
    aarambhDesktop?: AarambhDesktopAPI;
  }
}
