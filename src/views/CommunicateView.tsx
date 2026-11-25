import React, { useState } from 'react';
import { CATEGORY_LABELS } from '../data/phrases';
import { AppSettings, PhraseCategory, PhraseItem } from '../types';
import { PlusIcon } from '../components/common/Icons';
import { SectionHeader } from '../components/common/SectionHeader';
import { MessageComposer } from '../components/communication/MessageComposer';
import { PhraseTile } from '../components/communication/PhraseTile';

interface CommunicateViewProps {
  phrases: PhraseItem[];
  onAddCustomPhrase: (text: string) => void;
  onDeleteCustomPhrase: (id: string) => void;
  settings: AppSettings;
  onSpeak: (text: string) => void;
  onStopSpeaking: () => void;
  isSpeaking: boolean;
  speechSupported: boolean;
}

const CATEGORIES: PhraseCategory[] = ['urgent', 'needs', 'responses', 'feelings', 'custom'];

export const CommunicateView: React.FC<CommunicateViewProps> = ({
  phrases,
  onAddCustomPhrase,
  onDeleteCustomPhrase,
  settings,
  onSpeak,
  onStopSpeaking,
  isSpeaking,
  speechSupported,
}) => {
  const [activeCategory, setActiveCategory] = useState<PhraseCategory>('urgent');
  const [message, setMessage] = useState('');
  const [newPhrase, setNewPhrase] = useState('');

  const filtered = phrases.filter((p) => p.category === activeCategory);

  const handleSelectPhrase = (phrase: PhraseItem) => {
    const nextMessage = message.trim() ? `${message.trim()}. ${phrase.text}` : phrase.text;
    setMessage(nextMessage);
    if (settings.autoSpeakOnTileClick) {
      onSpeak(phrase.text);
    }
  };

  const handleAddPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newPhrase.trim();
    if (!cleaned) return;
    onAddCustomPhrase(cleaned);
    setNewPhrase('');
  };

  const gridCols =
    settings.tileSize === 'xlarge'
      ? 'grid-cols-1 sm:grid-cols-2'
      : settings.tileSize === 'large'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Communicate"
        subtitle={
          settings.dwellPreviewEnabled
            ? `Hover dwell preview is ON (${(settings.dwellTimeMs / 1000).toFixed(1)}s) — hold pointer over any tile to select.`
            : 'Select tiles to build a message, or click Speak Message.'
        }
      />

      <MessageComposer
        message={message}
        onChange={setMessage}
        onSpeak={() => onSpeak(message)}
        onStop={onStopSpeaking}
        onClear={() => setMessage('')}
        isSpeaking={isSpeaking}
        speechSupported={speechSupported}
      />

      <div role="tablist" aria-label="Phrase categories" className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 rounded-xl font-bold text-sm sm:text-base border transition ${
                isActive
                  ? 'bg-sky-500 text-slate-950 border-sky-400'
                  : 'bg-surface-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {activeCategory === 'custom' && (
        <form onSubmit={handleAddPhraseSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
            placeholder="Add a personal phrase (e.g., Please open the window)..."
            className="flex-1 rounded-xl bg-surface-900 border border-slate-700 px-4 py-3 text-base text-white placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!newPhrase.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold transition"
          >
            <PlusIcon className="w-5 h-5" />
            Add Phrase
          </button>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-surface-900 border border-slate-800 p-8 text-center text-slate-400">
          No custom phrases yet. Type one above and click <strong>Add Phrase</strong> to save it here.
        </div>
      ) : (
        <div className={`grid gap-4 ${gridCols}`}>
          {filtered.map((phrase) => (
            <PhraseTile
              key={phrase.id}
              phrase={phrase}
              tileSize={settings.tileSize}
              dwellEnabled={settings.dwellPreviewEnabled}
              dwellTimeMs={settings.dwellTimeMs}
              onSelect={handleSelectPhrase}
              onDelete={phrase.category === 'custom' ? onDeleteCustomPhrase : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};
