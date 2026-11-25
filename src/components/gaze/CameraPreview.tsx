import React, { useEffect, useRef } from 'react';
import { WebcamStatus } from '../../types';
import { CameraIcon } from '../common/Icons';

interface CameraPreviewProps {
  stream: MediaStream | null;
  status: WebcamStatus;
  mirror: boolean;
  errorMessage: string | null;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  stream,
  status,
  mirror,
  errorMessage,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.srcObject = stream;
    if (stream) {
      videoEl.play().catch(() => {
        // Autoplay promise handled silently
      });
    }
  }, [stream]);

  return (
    <div
      data-card="true"
      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-900 border border-slate-800 flex items-center justify-center"
    >
      {status === 'active' && stream ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${mirror ? '-scale-x-100' : ''}`}
          />
          {/* Face alignment overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-72 rounded-full border-2 border-dashed border-sky-400/70 shadow-[0_0_0_9999px_rgba(9,13,22,0.28)]" />
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-slate-200 bg-slate-950/75 backdrop-blur px-3.5 py-2 rounded-lg border border-slate-700/70">
            <span>Position your face inside the oval guide</span>
            <span className="text-emerald-300 font-semibold">100% Local Video</span>
          </div>
        </>
      ) : (
        <div className="text-center max-w-md px-6 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <CameraIcon className="w-7 h-7" />
          </div>
          <div className="text-base font-semibold text-slate-200">
            {status === 'requesting'
              ? 'Requesting camera permission...'
              : status === 'denied'
              ? 'Camera permission denied'
              : status === 'unsupported'
              ? 'Camera unsupported'
              : 'Camera preview is turned off'}
          </div>
          <p className="text-sm text-slate-400">
            {errorMessage ||
              'Enable your webcam to test face framing and lighting. Video stays strictly on your Mac and is never uploaded.'}
          </p>
          {status === 'denied' && window.aarambhDesktop?.openCameraPrivacySettings && (
            <button
              type="button"
              onClick={() => window.aarambhDesktop?.openCameraPrivacySettings()}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-sm font-semibold transition"
            >
              Open macOS Camera Privacy Settings
            </button>
          )}
        </div>
      )}
    </div>
  );
};
