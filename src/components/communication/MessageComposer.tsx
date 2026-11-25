import React from 'react';
import { StopIcon, VolumeIcon } from '../common/Icons';

interface MessageComposerProps {
  message: string;
  onChange: (val: string) => void;
  onSpeak: () => void;
  onStop: () => void;
  onClear: () => void;
  isSpeaking: boolean;
  speechSupported: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  message,
  onChange,
  onSpeak,
  onStop,
  onClear,
  isSpeaking,
  speechSupported,
}) => {
  return (
    <div
      data-card="true"
      className="rounded-2xl bg-surface-900 border border-slate-800 p-4 sm:p-5 space-y-4 shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="message-composer-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Message Bar
        </label>
        {!speechSupported && (
          <span className="text-xs text-amber-300">Speech synthesis is unavailable in this browser.</span>
        )}
      </div>

      <input
        id="message-composer-input"
        type="text"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select phrase tiles below or type a message here..."
        className="w-full rounded-xl bg-surface-950 border border-slate-700 px-4 py-4 text-lg sm:text-xl text-white placeholder:text-slate-500"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSpeak}
          disabled={!message.trim() || !speechSupported}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-base transition"
        >
          <VolumeIcon className="w-5 h-5" />
          Speak Message
        </button>

        {isSpeaking && (
          <button
            type="button"
            onClick={onStop}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 font-semibold transition"
          >
            <StopIcon className="w-4 h-4" />
            Stop
          </button>
        )}

        <button
          type="button"
          onClick={onClear}
          disabled={!message}
          className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
