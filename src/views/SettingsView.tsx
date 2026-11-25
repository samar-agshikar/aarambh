import React from 'react';
import { AppSettings, TileSize } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';

interface SettingsViewProps {
  settings: AppSettings;
  onChange: (next: AppSettings) => void;
  onResetDefaults: () => void;
}

const TILE_SIZES: { id: TileSize; label: string }[] = [
  { id: 'normal', label: 'Standard' },
  { id: 'large', label: 'Large' },
  { id: 'xlarge', label: 'Extra Large' },
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onChange,
  onResetDefaults,
}) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Accessibility & App Settings"
        subtitle="Tailor tile size, contrast borders, and hover dwell selection."
      />

      <div data-card="true" className="rounded-2xl bg-surface-900 border border-slate-800 p-6 space-y-6 max-w-2xl">
        <div className="space-y-2.5">
          <div className="text-sm font-semibold text-slate-200">Communication Tile Size</div>
          <div className="flex flex-wrap gap-2.5">
            {TILE_SIZES.map((size) => {
              const active = settings.tileSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => onChange({ ...settings, tileSize: size.id })}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm border transition ${
                    active
                      ? 'bg-sky-500 text-slate-950 border-sky-400'
                      : 'bg-surface-950 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex items-center justify-between gap-4 py-2 cursor-pointer">
          <div>
            <div className="text-sm font-semibold text-slate-100">High Contrast Borders</div>
            <div className="text-xs text-slate-400">Adds prominent bright borders around buttons and panels.</div>
          </div>
          <input
            type="checkbox"
            checked={settings.highContrastBorders}
            onChange={(e) => onChange({ ...settings, highContrastBorders: e.target.checked })}
            className="w-5 h-5 accent-sky-400"
          />
        </label>

        <label className="flex items-center justify-between gap-4 py-2 cursor-pointer">
          <div>
            <div className="text-sm font-semibold text-slate-100">Speak Tile Immediately on Select</div>
            <div className="text-xs text-slate-400">Automatically speaks each phrase as soon as its tile is selected.</div>
          </div>
          <input
            type="checkbox"
            checked={settings.autoSpeakOnTileClick}
            onChange={(e) => onChange({ ...settings, autoSpeakOnTileClick: e.target.checked })}
            className="w-5 h-5 accent-sky-400"
          />
        </label>

        <div className="pt-2 border-t border-slate-800 space-y-4">
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <div className="text-sm font-semibold text-slate-100">Hover / Dwell Selection Preview</div>
              <div className="text-xs text-slate-400">
                Hold the cursor over a phrase tile to auto-select it without clicking.
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.dwellPreviewEnabled}
              onChange={(e) => onChange({ ...settings, dwellPreviewEnabled: e.target.checked })}
              className="w-5 h-5 accent-sky-400"
            />
          </label>

          {settings.dwellPreviewEnabled && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="dwell-duration" className="font-semibold text-slate-200">
                  Dwell Duration
                </label>
                <span className="text-sky-300 font-bold">{(settings.dwellTimeMs / 1000).toFixed(1)}s</span>
              </div>
              <input
                id="dwell-duration"
                type="range"
                min="600"
                max="2500"
                step="100"
                value={settings.dwellTimeMs}
                onChange={(e) => onChange({ ...settings, dwellTimeMs: Number(e.target.value) })}
                className="w-full accent-sky-400"
              />
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
          >
            Reset Settings to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
