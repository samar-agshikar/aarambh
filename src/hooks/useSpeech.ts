import { useCallback, useEffect, useState } from 'react';
import { SpeechSettings } from '../types';

export function useSpeech(settings: SpeechSettings) {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!isSupported || !trimmed) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(trimmed);
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;

      if (settings.voiceURI) {
        const match = voices.find((v) => v.voiceURI === settings.voiceURI);
        if (match) utterance.voice = match;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, settings, voices]
  );

  return {
    isSupported,
    voices,
    isSpeaking,
    speak,
    stop,
  };
}
