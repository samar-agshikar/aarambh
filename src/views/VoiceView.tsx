import React from 'react';
import { SpeechSettings } from '../types';
import { StopIcon, VolumeIcon } from '../components/common/Icons';
import { SectionHeader } from '../components/common/SectionHeader';

interface VoiceViewProps {
  settings: SpeechSettings;
  onChange: (next: SpeechSettings) => void;
  voices: SpeechSynthesisVoice[];
  onSpeak: (text: string) => void;
  onStop: () => void;
  isSpeaking: boolean;
  speechSupported: boolean;
}

export const VoiceView: React.FC<VoiceViewProps> = ({
  settings,
  onChange,
  voices,
  onSpeak,
  onStop,
  isSpeaking,
  speechSupported,
}) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Voice Settings"
        subtitle="Choose a natural system voice and tune speed, pitch, and volume."
      />

      <div data-card="true" className="rounded-2xl bg-surface-900 border border-slate-800 p-6 space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="voice-select" className="block text-sm font-semibold text-slate-200">
            System Voice
          </label>
          <select
            id="voice-select"
            value={settings.voiceURI}
            onChange={(e) => onChange({ ...settings, voiceURI: e.target.value })}
            className="w-full rounded-xl bg-surface-950 border border-slate-700 px-4 py-3 text-slate-100"
          >
            <option value="">System Default Voice</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label htmlFor="voice-rate" className="font-semibold text-slate-200">
              Speaking Rate
            </label>
            <span className="text-sky-300 font-bold">{settings.rate.toFixed(2)}x</span>
          </div>
          <input
            id="voice-rate"
            type="range"
            min="0.5"
            max="1.6"
            step="0.05"
            value={settings.rate}
            onChange={(e) => onChange({ ...settings, rate: Number(e.target.value) })}
            className="w-full accent-sky-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label htmlFor="voice-pitch" className="font-semibold text-slate-200">
              Pitch
            </label>
            <span className="text-sky-300 font-bold">{settings.pitch.toFixed(2)}</span>
          </div>
          <input
            id="voice-pitch"
            type="range"
            min="0.6"
            max="1.5"
            step="0.05"
            value={settings.pitch}
            onChange={(e) => onChange({ ...settings, pitch: Number(e.target.value) })}
            className="w-full accent-sky-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label htmlFor="voice-volume" className="font-semibold text-slate-200">
              Volume
            </label>
            <span className="text-sky-300 font-bold">{Math.round(settings.volume * 100)}%</span>
          </div>
          <input
            id="voice-volume"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={settings.volume}
            onChange={(e) => onChange({ ...settings, volume: Number(e.target.value) })}
            className="w-full accent-sky-400"
          />
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!speechSupported}
            onClick={() => onSpeak('Hello, this is Aarambh Gaze speaking with your selected voice settings.')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-slate-950 font-bold transition"
          >
            <VolumeIcon className="w-5 h-5" />
            Test Voice
          </button>
          {isSpeaking && (
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 font-semibold"
            >
              <StopIcon className="w-4 h-4" />
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
