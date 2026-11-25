import React, { useState } from 'react';
import { DEFAULT_PHRASES } from './data/phrases';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSpeech } from './hooks/useSpeech';
import { useWebcam } from './hooks/useWebcam';
import { AppSettings, NavTab, PhraseItem, SpeechSettings } from './types';
import { AppShell } from './components/layout/AppShell';
import { CommunicateView } from './views/CommunicateView';
import { GazeSetupView } from './views/GazeSetupView';
import { HomeView } from './views/HomeView';
import { SettingsView } from './views/SettingsView';
import { VoiceView } from './views/VoiceView';

const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  voiceURI: '',
  rate: 0.95,
  pitch: 1.0,
  volume: 1.0,
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  tileSize: 'large',
  highContrastBorders: false,
  mirrorCamera: true,
  autoSpeakOnTileClick: false,
  dwellPreviewEnabled: false,
  dwellTimeMs: 1200,
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [customPhrases, setCustomPhrases] = useLocalStorage<PhraseItem[]>('aarambh.customPhrases', []);
  const [speechSettings, setSpeechSettings] = useLocalStorage<SpeechSettings>(
    'aarambh.speechSettings',
    DEFAULT_SPEECH_SETTINGS
  );
  const [appSettings, setAppSettings] = useLocalStorage<AppSettings>(
    'aarambh.appSettings',
    DEFAULT_APP_SETTINGS
  );
  const [lastCalibratedAt, setLastCalibratedAt] = useLocalStorage<string | null>(
    'aarambh.lastCalibratedAt',
    null
  );

  const { isSupported: speechSupported, voices, isSpeaking, speak, stop } = useSpeech(speechSettings);
  const { status: webcamStatus, errorMessage, stream, startCamera, stopCamera } = useWebcam();

  const allPhrases = [...DEFAULT_PHRASES, ...customPhrases];

  const handleAddCustomPhrase = (text: string) => {
    const item: PhraseItem = {
      id: `custom-${Date.now()}`,
      text,
      category: 'custom',
    };
    setCustomPhrases((prev) => [item, ...prev]);
  };

  const handleDeleteCustomPhrase = (id: string) => {
    setCustomPhrases((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCalibrationComplete = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastCalibratedAt(timestamp);
  };

  return (
    <AppShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      webcamStatus={webcamStatus}
      isSpeaking={isSpeaking}
      highContrastBorders={appSettings.highContrastBorders}
    >
      {activeTab === 'home' && (
        <HomeView
          onNavigate={setActiveTab}
          webcamStatus={webcamStatus}
          speechSupported={speechSupported}
          lastCalibratedAt={lastCalibratedAt}
        />
      )}

      {activeTab === 'communicate' && (
        <CommunicateView
          phrases={allPhrases}
          onAddCustomPhrase={handleAddCustomPhrase}
          onDeleteCustomPhrase={handleDeleteCustomPhrase}
          settings={appSettings}
          onSpeak={speak}
          onStopSpeaking={stop}
          isSpeaking={isSpeaking}
          speechSupported={speechSupported}
        />
      )}

      {activeTab === 'gaze' && (
        <GazeSetupView
          stream={stream}
          status={webcamStatus}
          errorMessage={errorMessage}
          mirrorCamera={appSettings.mirrorCamera}
          onToggleMirror={() =>
            setAppSettings((prev) => ({ ...prev, mirrorCamera: !prev.mirrorCamera }))
          }
          onStartCamera={startCamera}
          onStopCamera={stopCamera}
          lastCalibratedAt={lastCalibratedAt}
          onCalibrationComplete={handleCalibrationComplete}
        />
      )}

      {activeTab === 'voice' && (
        <VoiceView
          settings={speechSettings}
          onChange={setSpeechSettings}
          voices={voices}
          onSpeak={speak}
          onStop={stop}
          isSpeaking={isSpeaking}
          speechSupported={speechSupported}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          settings={appSettings}
          onChange={setAppSettings}
          onResetDefaults={() => setAppSettings(DEFAULT_APP_SETTINGS)}
        />
      )}
    </AppShell>
  );
};

export default App;
