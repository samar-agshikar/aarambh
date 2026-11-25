import React from 'react';
import { NavTab, WebcamStatus } from '../../types';
import { SidebarNav } from './SidebarNav';

interface AppShellProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  webcamStatus: WebcamStatus;
  isSpeaking: boolean;
  highContrastBorders: boolean;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onSelectTab,
  webcamStatus,
  isSpeaking,
  highContrastBorders,
  children,
}) => {
  return (
    <div className={`min-h-screen flex bg-surface-950 text-slate-100 ${highContrastBorders ? 'high-contrast-mode' : ''}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-sky-500 focus:text-slate-950 focus:font-bold"
      >
        Skip to main content
      </a>

      <SidebarNav
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        webcamStatus={webcamStatus}
        isSpeaking={isSpeaking}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 focus:outline-none">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
