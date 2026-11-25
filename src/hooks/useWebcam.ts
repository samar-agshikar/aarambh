import { useCallback, useEffect, useRef, useState } from 'react';
import { WebcamStatus } from '../types';

export function useWebcam() {
  const [status, setStatus] = useState<WebcamStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setStream(null);
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('unsupported');
      setErrorMessage('Camera API is not available in this environment.');
      return;
    }

    setStatus('requesting');
    setErrorMessage(null);

    try {
      if (window.aarambhDesktop?.requestCameraPermission) {
        const perm = await window.aarambhDesktop.requestCameraPermission();
        if (perm === 'denied' || perm === 'restricted') {
          setStatus('denied');
          setErrorMessage(
            'macOS camera permission is denied. Enable Aarambh Gaze in System Settings → Privacy & Security → Camera.'
          );
          return;
        }
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setStatus('active');
    } catch (err) {
      const error = err as DOMException;
      if (error?.name === 'NotAllowedError' || error?.name === 'PermissionDeniedError') {
        setStatus('denied');
        setErrorMessage('Camera access was denied. Please allow camera permission and try again.');
      } else {
        setStatus('error');
        setErrorMessage(error?.message || 'Unable to access webcam.');
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    status,
    errorMessage,
    stream,
    startCamera,
    stopCamera,
  };
}
