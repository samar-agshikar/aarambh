import React from 'react';
import { NavTab, WebcamStatus } from '../../types';
import { EyeIcon, HomeIcon, MessageIcon, SettingsIcon, VolumeIcon } from '../common/Icons';
import { StatusBadge } from '../common/StatusBadge';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  webcamStatus: WebcamStatus;
  isSpeaking: boolean;
}

const NAV_ITEMS: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'communicate', label: 'Communicate', icon: MessageIcon },
  { id: 'gaze', label: 'Gaze Setup', icon: EyeIcon },
  { id: 'voice', label: 'Voice', icon: VolumeIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  webcamStatus,
  isSpeaking,
}) => {
  return (
    <aside className="w-64 shrink-0 bg-surface-900 border-r border-slate-800 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
            <EyeIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white leading-tight">Aarambh Gaze</div>
            <div className="text-xs text-slate-400">Accessible AAC Suite</div>
          </div>
        </div>

        <nav aria-label="Main navigation" className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-semibold text-base transition ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800 space-y-2.5 px-2">
        <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">System Status</div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            label={webcamStatus === 'active' ? 'Camera Ready' : 'Camera Off'}
            tone={webcamStatus === 'active' ? 'success' : 'neutral'}
          />
          {isSpeaking && <StatusBadge label="Speaking" tone="info" />}
        </div>
        <div className="text-[11px] text-slate-500 pt-1">
          {window.aarambhDesktop?.isDesktop ? 'macOS Desktop App · Local Only' : 'Local Web Mode'}
        </div>
      </div>
    </aside>
  );
};
