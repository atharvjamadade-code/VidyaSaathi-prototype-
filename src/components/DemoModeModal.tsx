import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { 
  seedDemoData, 
  clearDemoData, 
  isDemoModeActive, 
  DEMO_STUDENT_PROFILE 
} from '../services/demoSeed';
import { 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  WifiOff, 
  Wifi, 
  Sparkles, 
  User, 
  Award, 
  BookOpen, 
  Heart, 
  Compass, 
  X,
  ShieldAlert
} from 'lucide-react';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataSeeded?: () => void;
}

export const DemoModeModal: React.FC<DemoModeModalProps> = ({ isOpen, onClose, onDataSeeded }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi' || language === 'bhili';
  const { simulateOffline, toggleSimulateOffline } = useSettings();

  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setActive(isDemoModeActive());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSeed = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await seedDemoData();
      setActive(true);
      setMessage(isHi ? 'सफलता! धार आदिवासी छात्र प्रोफ़ाइल एवं डेटा लोड हो चुका है।' : 'Success! Realistic Dhar tribal student profile & complete data seeded.');
      if (onDataSeeded) onDataSeeded();
    } catch (e) {
      console.error(e);
      setMessage('Error seeding demo data');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await clearDemoData();
      setActive(false);
      setMessage(isHi ? 'सभी डेटा रीसेट कर दिया गया है।' : 'All demo data cleared and reset.');
      if (onDataSeeded) onDataSeeded();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-amber-500/40 space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{isHi ? 'जज प्रस्तुति: डेमो मोड' : 'Judge Presentation Demo Mode'}</span>
                {active && (
                  <span className="text-[10px] uppercase font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500">
                {isHi ? 'कमजोर वाई-फाई में बिना टाइपिंग के 100% फुल फ्लो डेमो' : 'One-tap realistic seed for spotty Wi-Fi during judge demos'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer transition min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Preset Card */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 space-y-2.5 text-xs text-amber-950">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 font-mono">
              {isHi ? '★ पूर्व-लोड की गई छात्र प्रोफ़ाइल' : '★ Pre-Seeded Student Persona'}
            </span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-amber-200">
              Samagra: {DEMO_STUDENT_PROFILE.samagraId}
            </span>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm">
              {isHi ? DEMO_STUDENT_PROFILE.nameHi : DEMO_STUDENT_PROFILE.name}
            </div>
            <div className="text-stone-600 mt-0.5">
              {isHi ? DEMO_STUDENT_PROFILE.courseHi : DEMO_STUDENT_PROFILE.course}
            </div>
            <div className="text-stone-500 text-[11px]">
              {isHi ? DEMO_STUDENT_PROFILE.collegeHi : DEMO_STUDENT_PROFILE.college}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-white/80 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
              📍 {isHi ? DEMO_STUDENT_PROFILE.districtHi : `${DEMO_STUDENT_PROFILE.district} District (Tribal Belt)`}
            </span>
            <span className="bg-white/80 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
              🏷️ {isHi ? DEMO_STUDENT_PROFILE.categoryHi : DEMO_STUDENT_PROFILE.category}
            </span>
            <span className="bg-white/80 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-medium">
              💰 {isHi ? DEMO_STUDENT_PROFILE.familyIncomeFormatted : 'Annual: ₹72,000'}
            </span>
          </div>
        </div>

        {/* What gets seeded checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {isHi ? 'क्या-क्या पूर्व-लोड होगा:' : 'What Gets Seeded into Local Database:'}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">{isHi ? 'पढ़ाई (Learn) चैट' : 'Learn Q&A History'}</span>
                <p className="text-[11px] text-stone-500">{isHi ? 'NEP लोक कलाएं एवं राजनीति विज्ञान' : 'NEP Folk Arts & Pol Science Q&As'}</p>
              </div>
            </li>

            <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
              <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">{isHi ? 'छात्रवृत्ति (Scholarships)' : 'Scholarship Matches'}</span>
                <p className="text-[11px] text-stone-500">{isHi ? 'MPTAAS 99% मैच + आवास सहायता' : 'MPTAAS 99% match & Awas Sahayata'}</p>
              </div>
            </li>

            <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
              <Heart className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">{isHi ? 'साथी मूड चेक-इन' : 'Buddy Mood Log'}</span>
                <p className="text-[11px] text-stone-500">{isHi ? 'विगत 3 सप्ताह के लोकल चेक-इन' : '3 past weekly local logs'}</p>
              </div>
            </li>

            <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
              <Compass className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">{isHi ? 'करियर क्विज़ परिणाम' : 'Career Quiz Result'}</span>
                <p className="text-[11px] text-stone-500">{isHi ? 'शासकीय सेवा (88% मैच, स्कोर टेबल)' : 'Govt Exams (88% match, score table)'}</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Offline Simulation Control */}
        <div className="p-3.5 bg-stone-100 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {simulateOffline ? (
              <WifiOff className="w-4 h-4 text-amber-600" />
            ) : (
              <Wifi className="w-4 h-4 text-emerald-600" />
            )}
            <div>
              <span className="font-bold text-slate-900">
                {simulateOffline ? (isHi ? 'ऑफ़लाइन सिमुलेशन सक्रिय' : 'Simulated Offline Active') : (isHi ? 'ऑनलाइन मोड' : 'Network Mode')}
              </span>
              <p className="text-[11px] text-stone-500">
                {isHi ? 'जजों को दिखाएं कि बिना इंटरनेट ऐप कैसे काम करता है' : 'Cut internal network calls to prove offline capability'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleSimulateOffline}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer min-h-[38px] ${
              simulateOffline 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-300'
            }`}
          >
            {simulateOffline ? (isHi ? 'ऑफलाइन बंद करें' : 'Turn Online') : (isHi ? 'ऑफलाइन सिम्युलेट करें' : 'Simulate Offline')}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-stone-100">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="w-full sm:flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2 min-h-[46px]"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{loading ? 'Seeding...' : (isHi ? '⚡ डेमो डेटा लोड करें (1-टैप)' : '⚡ Seed Demo Preset (1-Tap)')}</span>
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full sm:w-auto py-2.5 px-4 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 min-h-[46px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isHi ? 'डेटा साफ़ करें' : 'Clear Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
