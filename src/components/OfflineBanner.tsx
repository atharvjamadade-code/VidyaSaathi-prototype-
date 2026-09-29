import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { 
  WifiOff, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall,
  Sliders
} from 'lucide-react';

interface OfflineBannerProps {
  effectiveOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ effectiveOnline }) => {
  const { t } = useLanguage();
  const { simulateOffline, toggleSimulateOffline } = useSettings();
  const [expanded, setExpanded] = useState(true);

  if (effectiveOnline) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Offline Status"
      className="bg-stone-900 border-b-2 border-amber-500 text-stone-100 shadow-md transition-all duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5">
        {/* Compact summary bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-bold">
              <WifiOff className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold tracking-tight text-amber-400 truncate">
                  {t.offlineActiveTitle}
                </h2>
                {simulateOffline && (
                  <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded">
                    Simulated
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-300 truncate hidden sm:block">
                {t.offlineActiveDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSimulateOffline}
              className="text-[11px] font-medium px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition cursor-pointer hidden md:inline-flex items-center gap-1"
              title="Toggle simulated connection"
            >
              <Sliders className="w-3 h-3" />
              <span>{simulateOffline ? 'Disable Simulation' : 'Simulate Offline'}</span>
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 transition cursor-pointer min-h-[36px]"
              aria-expanded={expanded}
              aria-label="Toggle offline capability details"
            >
              <span className="text-[11px]">{expanded ? 'Hide Details' : 'What Works?'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Detailed capabilities accordion */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* What works offline */}
            <div className="bg-stone-950/60 p-3 rounded-xl border border-emerald-900/40">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 pb-1.5 border-b border-stone-800/80 mb-2">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t.offlineWorksHeader}</span>
              </div>
              <ul className="space-y-1.5 text-stone-200">
                {t.offlineWorksList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">Emergency Support:</span>
                <a
                  href="tel:14416"
                  className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  Tele-MANAS (14416)
                </a>
              </div>
            </div>

            {/* What requires connection */}
            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 pb-1.5 border-b border-stone-800/80 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.offlineNeedsNetHeader}</span>
              </div>
              <ul className="space-y-1.5 text-stone-300">
                {t.offlineNeedsNetList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">⏳</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 pt-2 border-t border-stone-800/60 text-[10px] text-stone-400 italic">
                {t.testOfflineDevToolsNote}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
