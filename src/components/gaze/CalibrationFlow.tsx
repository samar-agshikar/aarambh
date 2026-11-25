import React, { useCallback, useEffect, useState } from 'react';
import { CalibrationPoint } from '../../types';

const CALIBRATION_POINTS: CalibrationPoint[] = [
  { id: 'center', label: 'Center', xPercent: 50, yPercent: 50 },
  { id: 'top-left', label: 'Top Left', xPercent: 12, yPercent: 16 },
  { id: 'top-right', label: 'Top Right', xPercent: 88, yPercent: 16 },
  { id: 'bottom-right', label: 'Bottom Right', xPercent: 88, yPercent: 84 },
  { id: 'bottom-left', label: 'Bottom Left', xPercent: 12, yPercent: 84 },
];

interface CalibrationFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

export const CalibrationFlow: React.FC<CalibrationFlowProps> = ({ onClose, onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const current = CALIBRATION_POINTS[stepIndex];

  const handleConfirmPoint = useCallback(() => {
    if (stepIndex + 1 >= CALIBRATION_POINTS.length) {
      onComplete();
    } else {
      setStepIndex((prev) => prev + 1);
    }
  }, [stepIndex, onComplete]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleConfirmPoint();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleConfirmPoint, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gaze calibration preview"
      className="fixed inset-0 z-50 bg-surface-950/95 backdrop-blur-sm flex flex-col justify-between p-6"
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
        <div>
          <h2 className="text-xl font-bold text-white">Calibration Preview</h2>
          <p className="text-sm text-slate-400">
            Look steadily at the glowing blue target ({current.label}), then click it or press Space / Enter.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm"
        >
          Exit (Esc)
        </button>
      </div>

      <div className="relative flex-1 my-4 rounded-2xl border border-slate-800 bg-surface-900/60 overflow-hidden">
        <button
          type="button"
          onClick={handleConfirmPoint}
          aria-label={`Calibration target ${stepIndex + 1} of ${CALIBRATION_POINTS.length}: ${current.label}`}
          style={{
            left: `${current.xPercent}%`,
            top: `${current.yPercent}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sky-500/25 border-4 border-sky-400 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-105 transition"
        >
          <span className="w-4 h-4 rounded-full bg-white" />
        </button>
      </div>

      <div className="flex items-center justify-between max-w-4xl mx-auto w-full text-sm text-slate-300">
        <span>
          Target {stepIndex + 1} of {CALIBRATION_POINTS.length}
        </span>
        <div className="flex gap-2">
          {CALIBRATION_POINTS.map((pt, idx) => (
            <span
              key={pt.id}
              className={`h-2.5 w-8 rounded-full ${
                idx < stepIndex ? 'bg-emerald-400' : idx === stepIndex ? 'bg-sky-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
