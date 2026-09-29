import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './i18n';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { TeleManasBanner } from './components/TeleManasBanner';
import { OfflineBanner } from './components/OfflineBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { BottomNav, AppTab } from './components/BottomNav';
import { HomeTab } from './components/tabs/HomeTab';
import { LearnTab } from './components/tabs/LearnTab';
import { ScholarshipsTab } from './components/tabs/ScholarshipsTab';
import { MentorTab } from './components/tabs/MentorTab';
import { CareerTab } from './components/tabs/CareerTab';
import { SettingsScreen } from './components/SettingsScreen';
import { DemoModeModal } from './components/DemoModeModal';
import { isDemoModeActive } from './services/demoSeed';
import { Globe2, Zap, WifiOff } from 'lucide-react';

function AppShell() {
  const { t, language, toggleLanguage } = useLanguage();
  const { dataSaver, simulateOffline } = useSettings();
  const rawOnlineStatus = useOnlineStatus();

  // Effective status considers both real hardware network and manual simulation toggle
  const effectiveOnline = simulateOffline ? false : rawOnlineStatus;

  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(() => isDemoModeActive());

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-300 ${
      dataSaver ? 'bg-stone-100 text-stone-900' : 'bg-stone-100 text-stone-900'
    }`}>
      {/* 1. Standing Rule: Tele-MANAS 24/7 National Mental Health Helpline (Never buried) */}
      <TeleManasBanner />

      {/* 2. Persistent Offline Capability Banner (Triggered when real network drops OR simulated offline) */}
      <OfflineBanner effectiveOnline={effectiveOnline} />

      {/* 3. Top App Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b-2 border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          
          {/* Brand Identity */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg shadow-sm">
              वि
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  {t.appName}
                </span>
                {dataSaver && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                    <Zap className="w-2.5 h-2.5" />
                    2G Saver
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Quick Header Actions (Min 48px touch targets for mobile accessibility) */}
          <div className="flex items-center gap-2">
            {/* Live Online/Offline Pill */}
            <OfflineIndicator />

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Language Quick Switch */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 transition cursor-pointer min-h-[44px]"
              aria-label="Toggle language between English, Hindi, and Bhili"
              title="Toggle Language: Hindi / English / Bhili (Beta)"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'EN' : language === 'en' ? 'भीली (Beta)' : 'हिन्दी'}</span>
            </button>

            {/* Judge Demo Mode Preset Button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer min-h-[44px] ${
                isDemoActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                  : 'border-amber-500/40 bg-slate-800 hover:bg-slate-700 text-amber-300'
              }`}
              title="Judge Presentation Demo Preset (1-Tap Seed)"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{isDemoActive ? 'Demo Active' : 'Demo Mode'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 4. Active Tab Content Body */}
      <main className="max-w-4xl mx-auto px-4 py-5 flex-1 w-full">
        {activeTab === 'home' && (
          <HomeTab 
            effectiveOnline={effectiveOnline} 
            onNavigateTab={setActiveTab} 
          />
        )}
        {activeTab === 'learn' && (
          <LearnTab 
            onNavigateToSettings={() => setActiveTab('profile')} 
          />
        )}
        {activeTab === 'scholarships' && <ScholarshipsTab />}
        {activeTab === 'mentor' && (
          <MentorTab effectiveOnline={effectiveOnline} />
        )}
        {activeTab === 'career' && <CareerTab onNavigateTab={setActiveTab} />}
        {activeTab === 'profile' && <SettingsScreen />}
      </main>

      {/* 5. Mobile-First Bottom Navigation (6 Tabs with 48px+ tap targets) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 6. Demo Mode Preset Modal */}
      <DemoModeModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        onDataSeeded={() => setIsDemoActive(isDemoModeActive())}
      />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </SettingsProvider>
  );
}
