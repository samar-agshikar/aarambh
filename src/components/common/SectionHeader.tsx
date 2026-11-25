import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800/90">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm sm:text-base text-slate-400">{subtitle}</p>}
    </div>
    {action && <div className="flex items-center gap-3">{action}</div>}
  </div>
);
