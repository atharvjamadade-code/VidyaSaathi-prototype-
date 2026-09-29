import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';
import { useSettings } from '../../context/SettingsContext';
import { db, ChatMessage } from '../../db';
import { INITIAL_SCHOLARSHIPS, MP_TARGET_DISTRICTS } from '../../data/seedData';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  MapPin,
  HardDrive,
  AlertTriangle
} from 'lucide-react';

interface HomeTabProps {
  effectiveOnline: boolean;
  onNavigateTab: (tab: 'home' | 'learn' | 'scholarships' | 'mentor' | 'career' | 'profile') => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ effectiveOnline, onNavigateTab }) => {
  const { t, language } = useLanguage();
  const { dataSaver } = useSettings();

  const [offlineNotes, setOfflineNotes] = useState<ChatMessage[]>([]);
  const [noteInput, setNoteInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [cachedLessonCount, setCachedLessonCount] = useState(0);

  const loadData = async () => {
    try {
      const notes = await db.chatHistory.reverse().toArray();
      const lessons = await db.downloadedLessons.count();
      setOfflineNotes(notes);
      setCachedLessonCount(lessons);
    } catch (err) {
      console.error('Error loading home data:', err);
    }
  };

  useEffect(() => {
    loadData();
    const handleDemoChange = () => loadData();
    window.addEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    return () => {
      window.removeEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    };
  }, []);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    setIsSaving(true);
    try {
      await db.chatHistory.add({
        sender: 'student',
        text: noteInput.trim(),
        timestamp: Date.now(),
        syncStatus: effectiveOnline ? 'synced' : 'pending',
        source: 'Personal Offline Journal',
      });
      setNoteInput('');
      setSaveSuccess(true);
      await loadData();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Hero Card */}
      <section className={`rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-xs relative overflow-hidden ${
        dataSaver ? 'bg-white' : 'bg-linear-to-br from-white via-stone-50 to-amber-50/30'
      }`}>
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-700" />
              MP Online Hackathon 2026
            </span>
            <span className="text-[11px] font-medium text-stone-500">
              {dataSaver ? '• Data Saver Mode Active' : ''}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {t.offlineGreetingTitle}
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {t.offlineGreetingSubtitle}
          </p>
        </div>

        {/* Quick action grid (min 48px touch targets) */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigateTab('scholarships')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition cursor-pointer min-h-[50px] active:scale-98"
          >
            <Award className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">{t.navScholarships}</div>
              <div className="text-[10px] text-stone-500">MPTAAS / MMVY</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('learn')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition cursor-pointer min-h-[50px] active:scale-98"
          >
            <BookOpen className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">{t.navLearn}</div>
              <div className="text-[10px] text-stone-500">{cachedLessonCount} Lessons Offline</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('mentor')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-left transition cursor-pointer min-h-[50px] active:scale-98"
          >
            <div className="w-5 h-5 rounded bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
              MP
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{t.navMentor}</div>
              <div className="text-[10px] text-stone-500">Seniors & Buddies</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('profile')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition cursor-pointer min-h-[50px] active:scale-98"
          >
            <HardDrive className="w-5 h-5 text-purple-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">{t.navProfile}</div>
              <div className="text-[10px] text-stone-500">Settings & Cache</div>
            </div>
          </button>
        </div>
      </section>

      {/* 2. Interactive Offline Persistence Sandbox */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'hi' ? 'ऑफ़लाइन अध्ययन डायरी (IndexedDB)' : 'Offline Study Notes & Reminders'}
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            {effectiveOnline ? 'Status: Online' : 'Status: Offline (Local Only)'}
          </span>
        </div>

        <p className="text-xs text-stone-600 leading-snug">
          {language === 'hi'
            ? 'यहाँ कोई भी नोट्स या छात्रवृत्ति सवाल लिखें। इंटरनेट बंद होने पर भी यह कभी नहीं मिटेगा।'
            : 'Type any reminder or study note. Saved directly into Dexie IndexedDB on your phone.'}
        </p>

        <form onSubmit={handleSaveNote} className="flex gap-2">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder={language === 'hi' ? 'उदा. धार कॉलेज से जाति प्रमाण पत्र अटेस्ट कराना...' : 'e.g., Get caste certificate verified at Dhar college...'}
            className="flex-1 rounded-xl border-2 border-stone-300 bg-stone-50 px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white min-h-[48px]"
          />
          <button
            type="submit"
            disabled={isSaving || !noteInput.trim()}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-2.5 text-xs font-bold transition cursor-pointer min-h-[48px] shrink-0 active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सहेजें' : 'Save'}</span>
          </button>
        </form>

        {saveSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.offlineSavedNotice}</span>
          </div>
        )}

        {offlineNotes.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-stone-100 max-h-36 overflow-y-auto">
            {offlineNotes.slice(0, 3).map((item) => (
              <div key={item.id} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
                <span className="font-medium text-stone-800 truncate mr-2">{item.text}</span>
                <span className="text-[10px] text-stone-400 font-mono shrink-0">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Real MP Scholarship Spotlight */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">{t.schemesLabel}</h2>
          </div>
          <button
            onClick={() => onNavigateTab('scholarships')}
            className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
          >
            {language === 'hi' ? 'सभी देखें →' : 'View All →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INITIAL_SCHOLARSHIPS.slice(0, 2).map((scheme) => (
            <div key={scheme.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900">
                {language === 'hi' ? scheme.nameHi : scheme.name}
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-1">{scheme.department}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                  {scheme.targetCategory.join(', ')}
                </span>
                <span className="text-[10px] text-stone-400">
                  Deadline: {scheme.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Priority MP Tribal Belt Coverage */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <h2 className="text-sm font-bold text-slate-900">{t.tribalDistrictsLabel}</h2>
          </div>
          <span className="text-[10px] text-stone-500 font-mono">10 Priority Blocks</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {MP_TARGET_DISTRICTS.map((dist) => (
            <span
              key={dist.name}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-medium">{dist.name}</span>
              <span className="text-stone-400 text-[10px]">({dist.nameHi})</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
