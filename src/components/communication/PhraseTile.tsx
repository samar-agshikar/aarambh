import React, { useEffect, useRef, useState } from 'react';
import { PhraseItem, TileSize } from '../../types';

interface PhraseTileProps {
  phrase: PhraseItem;
  tileSize: TileSize;
  dwellEnabled: boolean;
  dwellTimeMs: number;
  onSelect: (phrase: PhraseItem) => void;
  onDelete?: (id: string) => void;
}

const SIZE_CLASSES: Record<TileSize, string> = {
  normal: 'min-h-[104px] p-5 text-lg',
  large: 'min-h-[132px] p-6 text-xl',
  xlarge: 'min-h-[164px] p-7 text-2xl',
};

export const PhraseTile: React.FC<PhraseTileProps> = ({
  phrase,
  tileSize,
  dwellEnabled,
  dwellTimeMs,
  onSelect,
  onDelete,
}) => {
  const [dwellProgress, setDwellProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const clearDwell = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    setDwellProgress(0);
  };

  useEffect(() => {
    return () => clearDwell();
  }, []);

  const handleMouseEnter = () => {
    if (!dwellEnabled) return;
    clearDwell();
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      if (startTimeRef.current === null) return;
      const elapsed = now - startTimeRef.current;
      const ratio = Math.min(1, elapsed / dwellTimeMs);
      setDwellProgress(ratio);

      if (ratio >= 1) {
        clearDwell();
        onSelect(phrase);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const baseTone = phrase.urgent
    ? 'bg-rose-950/50 hover:bg-rose-900/60 border-rose-500/40 text-rose-100'
    : 'bg-surface-900 hover:bg-surface-850 border-slate-700/90 text-slate-100';

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => onSelect(phrase)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={clearDwell}
        className={`relative overflow-hidden w-full rounded-2xl border font-semibold text-left flex flex-col justify-between transition active:scale-[0.99] shadow-sm ${baseTone} ${SIZE_CLASSES[tileSize]}`}
      >
        <span className="leading-snug z-10">{phrase.text}</span>
        {phrase.urgent && (
          <span className="mt-3 inline-block text-xs uppercase tracking-wider font-bold text-rose-300 z-10">
            Urgent
          </span>
        )}
        {dwellProgress > 0 && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-2 bg-sky-400 transition-none"
            style={{ width: `${Math.round(dwellProgress * 100)}%` }}
          />
        )}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(phrase.id);
          }}
          aria-label={`Delete custom phrase: ${phrase.text}`}
          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 focus:opacity-100 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-rose-300 hover:border-rose-500/50 transition"
        >
          Remove
        </button>
      )}
    </div>
  );
};
