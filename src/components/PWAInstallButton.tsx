import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../i18n';
import { Download, Share2, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone PWA window, hide button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition-all cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" />
        {t.installApp}
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 text-xs font-medium text-amber-900 dark:text-amber-200 hover:bg-amber-100 transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          {t.installApp}
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 dark:bg-stone-900 dark:border-stone-800">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                  {t.installGuideTitle}
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded p-1 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600">1.</span>
                  <span>{t.installGuideStep1}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600">2.</span>
                  <span>{t.installGuideStep2}</span>
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-amber-600 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
