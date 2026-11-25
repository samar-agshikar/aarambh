import React from 'react';

interface StatusBadgeProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}

const TONE_CLASSES: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  danger: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  info: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
};

const DOT_CLASSES: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'bg-slate-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger: 'bg-rose-400',
  info: 'bg-sky-400',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, tone = 'neutral' }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${TONE_CLASSES[tone]}`}>
    <span className={`w-2 h-2 rounded-full ${DOT_CLASSES[tone]}`} />
    {label}
  </span>
);
