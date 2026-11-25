import React, { useState } from 'react';
import { WebcamStatus } from '../types';
import { CameraIcon, EyeIcon } from '../components/common/Icons';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { CalibrationFlow } from '../components/gaze/CalibrationFlow';
import { CameraPreview } from '../components/gaze/CameraPreview';

interface GazeSetupViewProps {
  stream: MediaStream | null;
  status: WebcamStatus;
  errorMessage: string | null;
  mirrorCamera: boolean;
  onToggleMirror: () => void;
  onStartCamera: () => void;
  onStopCamera: () => void;
  lastCalibratedAt: string | null;
  onCalibrationComplete: () => void;
}

export const GazeSetupView: React.FC<GazeSetupViewProps> = ({
  stream,
  status,
  errorMessage,
  mirrorCamera,
  onToggleMirror,
  onStartCamera,
  onStopCamera,
  lastCalibratedAt,
  onCalibrationComplete,
}) => {
  const [showCalibration, setShowCalibration] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gaze Setup"
        subtitle="Check lighting, align your face in the frame, and preview the calibration targets."
        action={
          <StatusBadge
            label={status === 'active' ? 'Camera Active' : status === 'denied' ? 'Permission Needed' : 'Camera Off'}
            tone={status === 'active' ? 'success' : status === 'denied' ? 'danger' : 'neutral'}
          />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CameraPreview
            stream={stream}
            status={status}
            mirror={mirrorCamera}
            errorMessage={errorMessage}
          />

          <div className="flex flex-wrap items-center gap-3">
            {status !== 'active' ? (
              <button
                type="button"
                onClick={onStartCamera}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition"
              >
                <CameraIcon className="w-5 h-5" />
                Enable Camera
              </button>
            ) : (
              <button
                type="button"
                onClick={onStopCamera}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 font-semibold transition"
              >
                Disable Camera
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowCalibration(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
            >
              <EyeIcon className="w-5 h-5 text-sky-400" />
              Start Calibration Preview
            </button>

            <button
              type="button"
              onClick={onToggleMirror}
              className="px-4 py-3 rounded-xl bg-surface-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold transition"
            >
              Mirror View: {mirrorCamera ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div data-card="true" className="rounded-2xl bg-surface-900 border border-slate-800 p-6 space-y-5 h-fit">
          <h2 className="text-lg font-bold text-white">Setup Tips</h2>
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li>• Keep a soft light source in front of your face rather than behind you.</li>
            <li>• Sit roughly 50–70 cm from your MacBook screen with eyes level with the upper half of the display.</li>
            <li>• All camera frames stay strictly inside your Mac—nothing is recorded or sent over the internet.</li>
          </ul>

          <div className="pt-4 border-t border-slate-800 space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">Last Calibration</div>
            <div className="text-sm font-semibold text-slate-200">
              {lastCalibratedAt || 'Not completed yet'}
            </div>
          </div>
        </div>
      </div>

      {showCalibration && (
        <CalibrationFlow
          onClose={() => setShowCalibration(false)}
          onComplete={() => {
            setShowCalibration(false);
            onCalibrationComplete();
          }}
        />
      )}
    </div>
  );
};
