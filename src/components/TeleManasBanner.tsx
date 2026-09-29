import React from 'react';
import { PhoneCall, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../i18n';

export const TeleManasBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-teal-700/40 px-4 py-2 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold text-emerald-200">{t.teleManasBanner}:</span>
          <span className="text-emerald-100">{t.teleManasSub}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:14416"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md transition shadow-xs"
          >
            <PhoneCall className="w-3 h-3" />
            <span>14416</span>
          </a>
          <span className="text-emerald-300/70 font-mono text-[11px]">| 1800-891-4416 (24/7)</span>
        </div>
      </div>
    </div>
  );
};
