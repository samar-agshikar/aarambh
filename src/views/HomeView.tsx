import React from 'react';
import { NavTab, WebcamStatus } from '../types';
import { EyeIcon, MessageIcon, VolumeIcon } from '../components/common/Icons';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatusBadge } from '../components/common/StatusBadge';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  webcamStatus: WebcamStatus;
  speechSupported: boolean;
  lastCalibratedAt: string | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  webcamStatus,
  speechSupported,
  lastCalibratedAt,
}) => {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Welcome to Aarambh Gaze"
        subtitle="Accessible, gaze-ready communication designed for clarity, comfort, and privacy."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => onNavigate('communicate')}
          data-card="true"
          className="text-left rounded-2xl bg-gradient-to-br from-sky-500/20 to-surface-900 border border-sky-500/35 hover:border-sky-400 p-7 space-y-4 transition shadow-md"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
            <MessageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Open Communication Board</h2>
            <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
              Select large high-contrast phrase tiles, compose custom messages, and speak them aloud instantly.
            </p>
          </div>
          <div className="text-sm font-bold text-sky-300">Go to Communicate →</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('gaze')}
          data-card="true"
          className="text-left rounded-2xl bg-surface-900 border border-slate-800 hover:border-slate-600 p-7 space-y-4 transition shadow-md"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <EyeIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Camera & Gaze Calibration</h2>
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
              Verify webcam framing locally and walk through the 5-point target calibration preview.
            </p>
          </div>
          <div className="text-sm font-bold text-emerald-300">Open Gaze Setup →</div>
        </button>
      </div>

      <div data-card="true" className="rounded-2xl bg-surface-900 border border-slate-800 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Readiness Checklist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-surface-950 border border-slate-800 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <VolumeIcon className="w-4 h-4 text-sky-400" />
              Speech Output
            </div>
            <StatusBadge
              label={speechSupported ? 'Available' : 'Unavailable'}
              tone={speechSupported ? 'success' : 'warning'}
            />
          </div>

          <div className="rounded-xl bg-surface-950 border border-slate-800 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <EyeIcon className="w-4 h-4 text-sky-400" />
              Local Webcam
            </div>
            <StatusBadge
              label={webcamStatus === 'active' ? 'Connected' : 'Not Started'}
              tone={webcamStatus === 'active' ? 'success' : 'neutral'}
            />
          </div>

          <div className="rounded-xl bg-surface-950 border border-slate-800 p-4 space-y-2">
            <div className="text-sm font-semibold text-slate-200">Calibration Preview</div>
            <StatusBadge
              label={lastCalibratedAt ? `Completed (${lastCalibratedAt})` : 'Not Run Yet'}
              tone={lastCalibratedAt ? 'info' : 'neutral'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
