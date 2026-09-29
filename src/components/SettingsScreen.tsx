import React, { useEffect, useState } from 'react';
import { useLanguage, SupportedLanguage } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { db, DownloadedLesson } from '../db';
import { 
  Globe2, 
  Zap, 
  Download, 
  Trash2, 
  Check, 
  HardDrive, 
  Radio, 
  CheckCircle2, 
  FileText,
  Sliders,
  Sparkles,
  Smartphone,
  Info,
  RotateCcw
} from 'lucide-react';
import { 
  getActiveStudentProfile, 
  seedDemoData, 
  clearDemoData, 
  isDemoModeActive 
} from '../services/demoSeed';

interface AvailableLessonCatalog {
  id: string;
  title: string;
  titleHi: string;
  subject: string;
  subjectHi: string;
  sizeBytes: number;
  sizeFormatted: string;
  summary: string;
  summaryHi: string;
  content: string;
}

const LESSON_CATALOG: AvailableLessonCatalog[] = [
  {
    id: 'ug-foundation-nep-mp',
    title: 'UG Foundation: Language & MP Culture (NEP 2020)',
    titleHi: 'बी.ए./बी.एससी. आधार पाठ्यक्रम: भाषा एवं म.प्र. की संस्कृति',
    subject: 'Higher Ed Foundation',
    subjectHi: 'उच्च शिक्षा आधार पाठ्यक्रम',
    sizeBytes: 14200,
    sizeFormatted: '14.2 KB',
    summary: 'Madhya Pradesh higher education NEP foundation syllabus: folk arts of Malwa, Nimar, Gondwana.',
    summaryHi: 'राष्ट्रीय शिक्षा नीति (NEP) अनुसार म.प्र. की लोक संस्कृति, भीली एवं गोंडी लोककलाएं।',
    content: `# म.प्र. की लोक संस्कृति एवं बोलियां\n\nमध्य प्रदेश उच्च शिक्षा विभाग के स्नातक प्रथम एवं द्वितीय वर्ष हेतु अनिवार्य आधार पाठ्यक्रम।\n\n## 1. प्रमुख बोलियां\n- मालवी: उज्जैन, इंदौर, देवास, धार\n- निमाड़ी: खरगोन, खंडवा, बड़वानी\n- गोंडी: मंडला, डिंडौरी, बैतूल, छिंदवाड़ा\n- भीली: झाबुआ, आलीराजपुर, धार`,
  },
  {
    id: 'mptaas-portal-guide',
    title: 'MPTAAS & MMVY Step-by-Step Offline Guide',
    titleHi: 'एमपीटास्क एवं मेधावी योजना ऑफ़लाइन आवेदन मार्गदर्शिका',
    subject: 'Scholarship Guidance',
    subjectHi: 'छात्रवृत्ति मार्गदर्शन',
    sizeBytes: 9800,
    sizeFormatted: '9.8 KB',
    summary: 'Document verification checklist, Samagra e-KYC steps, and common rejection pitfalls in MP colleges.',
    summaryHi: 'समग्र ई-केवाईसी, डिजिटल जाति प्रमाण पत्र और कॉलेज नोडल सत्यापन की संपूर्ण चेकलिस्ट।',
    content: `# MPTAAS आवेदन चेकलिस्ट\n\n1. आधार से लिंक बैंक खाता (NPCI एक्टिव)\n2. डिजिटल जाति प्रमाण पत्र\n3. समग्र आईडी ई-केवाईसी\n4. कॉलेज प्रवेश रसीद एवं स्कॉलर नंबर`,
  },
  {
    id: 'general-science-ug',
    title: 'Basic General Science & Environmental Studies',
    titleHi: 'सामान्य विज्ञान एवं पर्यावरण अध्ययन (बी.ए./बी.कॉम)',
    subject: 'Environment & Ecology',
    subjectHi: 'पर्यावरण एवं पारिस्थितिकी',
    sizeBytes: 18400,
    sizeFormatted: '18.4 KB',
    summary: 'Core concepts for UG environmental studies compulsory paper in MP state universities.',
    summaryHi: 'मध्य प्रदेश के विश्वविद्यालयों के यूजी छात्रों हेतु अनिवार्य पर्यावरण अध्ययन सामग्री।',
    content: `# पर्यावरण अध्ययन आधार पाठ्यक्रम\n\nमध्य प्रदेश के जैव विविधता हॉटस्पॉट, कान्हा, बांधवगढ़, और सतपुड़ा राष्ट्रीय उद्यान का पारिस्थितिक महत्व।`,
  },
  {
    id: 'english-communicative-rural',
    title: 'Communicative English for Rural Job Interviews',
    titleHi: 'ग्रामीण कॉलेज छात्रों हेतु व्यावहारिक अंग्रेजी एवं साक्षात्कार तैयारी',
    subject: 'Career & Soft Skills',
    subjectHi: 'करियर एवं कौशल विकास',
    sizeBytes: 12100,
    sizeFormatted: '12.1 KB',
    summary: 'Self-introduction, resume building, and formal email writing for government and private recruitment.',
    summaryHi: 'साक्षात्कार में आत्म-परिचय, बायोडाटा लेखन और औपचारिक संचार के सरल सूत्र।',
    content: `# English for Rural College Graduates\n\n1. Introducing yourself with confidence.\n2. Key phrases for banking, MPOnline kiosk communication, and interviews.`,
  },
];

export const SettingsScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { 
    dataSaver, 
    toggleDataSaver, 
    simulateOffline, 
    toggleSimulateOffline 
  } = useSettings();

  const [downloadedMap, setDownloadedMap] = useState<Record<string, boolean>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [totalCacheBytes, setTotalCacheBytes] = useState<number>(0);
  const [cacheActionMessage, setCacheActionMessage] = useState<string | null>(null);

  // Load existing downloaded lessons from IndexedDB
  const refreshDownloadedStatus = async () => {
    try {
      const lessons = await db.downloadedLessons.toArray();
      const map: Record<string, boolean> = {};
      let totalBytes = 0;
      lessons.forEach((l) => {
        map[l.id] = true;
        totalBytes += l.sizeBytes || 10000;
      });
      setDownloadedMap(map);
      setTotalCacheBytes(totalBytes);
    } catch (err) {
      console.error('Failed to query downloaded lessons:', err);
    }
  };

  useEffect(() => {
    refreshDownloadedStatus();
  }, []);

  const handleDownloadLesson = async (catalogItem: AvailableLessonCatalog) => {
    setDownloadingId(catalogItem.id);
    try {
      // Simulate fast 2G download buffer & store in Dexie IndexedDB
      await new Promise((resolve) => setTimeout(resolve, 400));
      const newLesson: DownloadedLesson = {
        id: catalogItem.id,
        title: language === 'hi' ? catalogItem.titleHi : catalogItem.title,
        subject: language === 'hi' ? catalogItem.subjectHi : catalogItem.subject,
        language: language,
        summary: language === 'hi' ? catalogItem.summaryHi : catalogItem.summary,
        content: catalogItem.content,
        downloadedAt: Date.now(),
        sizeBytes: catalogItem.sizeBytes,
      };
      await db.downloadedLessons.put(newLesson);
      await refreshDownloadedStatus();
      setCacheActionMessage(t.downloadSuccess);
      setTimeout(() => setCacheActionMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save offline lesson:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleRemoveLesson = async (id: string) => {
    try {
      await db.downloadedLessons.delete(id);
      await refreshDownloadedStatus();
    } catch (err) {
      console.error('Failed to remove lesson:', err);
    }
  };

  const handleClearAllStorage = async () => {
    try {
      await db.chatHistory.clear();
      setCacheActionMessage(t.cacheCleared);
      setTimeout(() => setCacheActionMessage(null), 3000);
    } catch (err) {
      console.error('Failed to clear chat history:', err);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-2">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t.settingsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          {t.settingsSubtitle}
        </p>
      </div>

      {/* Action Notice */}
      {cacheActionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{cacheActionMessage}</span>
        </div>
      )}

      {/* 1. Language Selection */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t.selectLanguage}</h2>
            <p className="text-[11px] text-stone-500">English / हिन्दी / भीली (प्रायोगिक)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setLanguage('hi')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition min-h-[58px] cursor-pointer ${
              language === 'hi'
                ? 'border-amber-600 bg-amber-50 text-slate-900 font-bold'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <span className="text-sm sm:text-base font-bold">हिन्दी (Hindi)</span>
            <span className="text-[10px] text-stone-500 mt-0.5">मध्य प्रदेश प्राथमिक</span>
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition min-h-[58px] cursor-pointer ${
              language === 'en'
                ? 'border-amber-600 bg-amber-50 text-slate-900 font-bold'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <span className="text-sm sm:text-base font-bold">English</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Standard English</span>
          </button>

          <button
            onClick={() => setLanguage('bhili')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition min-h-[58px] cursor-pointer relative ${
              language === 'bhili'
                ? 'border-amber-600 bg-amber-50 text-slate-900 font-bold'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold">भीली (Bhili)</span>
              <span className="text-[9px] font-mono uppercase bg-amber-200 text-amber-900 font-extrabold px-1.5 py-0.2 rounded">
                Beta
              </span>
            </div>
            <span className="text-[10px] text-stone-500 mt-0.5">मालवा-निमाड़ आदिवासी अंचल</span>
          </button>
        </div>

        {language === 'bhili' && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>{t.bhiliBetaNotice}</strong> (धार, झाबुआ, बड़वानी, आलीराजपुर अंचल के लिए UI क्रोम शैल प्रदर्शन).
            </p>
          </div>
        )}
      </section>

      {/* 2. Data Saver Toggle */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              dataSaver ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
            }`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">{t.dataSaverLabel}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  dataSaver ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  {dataSaver ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {t.dataSaverDesc}
              </p>
            </div>
          </div>

          <button
            onClick={toggleDataSaver}
            className={`shrink-0 relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer min-h-[48px] ${
              dataSaver ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
            aria-label="Toggle Data Saver"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition shadow-md ${
                dataSaver ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/60 text-xs text-stone-600 space-y-1">
          <div className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Why Data Saver is on by default:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            In tribal MP blocks with 2G or shared mobile hotspots, every megabyte counts. Data Saver blocks non-essential decorative graphics, preloaded media, and heavy scripts.
          </p>
        </div>
      </section>

      {/* 3. Offline Mode Simulator (Crucial for evaluation & testing) */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              simulateOffline ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'
            }`}>
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">{t.networkSimulateLabel}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  simulateOffline ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  {simulateOffline ? t.simulateOfflineActive : t.simulateOfflineInactive}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {t.networkSimulateDesc}
              </p>
            </div>
          </div>

          <button
            onClick={toggleSimulateOffline}
            className={`shrink-0 relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer min-h-[48px] ${
              simulateOffline ? 'bg-amber-600' : 'bg-stone-300'
            }`}
            aria-label="Toggle Simulate Offline"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition shadow-md ${
                simulateOffline ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </section>

      {/* 4. "Download for Offline" per subject/lesson */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.offlineStorageHeader}</h2>
              <p className="text-[11px] text-stone-500">{t.offlineStorageDesc}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono font-bold text-slate-800 bg-stone-100 px-2 py-1 rounded">
              {(totalCacheBytes / 1024).toFixed(1)} KB Stored
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {LESSON_CATALOG.map((item) => {
            const isDownloaded = !!downloadedMap[item.id];
            const isProcessing = downloadingId === item.id;

            return (
              <div
                key={item.id}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      {language === 'hi' ? item.titleHi : item.title}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {item.sizeFormatted}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    {language === 'hi' ? item.summaryHi : item.summary}
                  </p>
                  <span className="inline-block text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {language === 'hi' ? item.subjectHi : item.subject}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  {isDownloaded ? (
                    <>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {t.downloadedBadge}
                      </span>
                      <button
                        onClick={() => handleRemoveLesson(item.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg border border-red-200 transition cursor-pointer min-h-[40px]"
                        title={t.removeDownload}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.removeDownload}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleDownloadLesson(item)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 px-3.5 py-2 rounded-xl transition cursor-pointer min-h-[44px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Saving...' : t.downloadForOffline}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <p className="text-[11px] text-stone-500">
            Storage Engine: IndexedDB (Dexie.js)
          </p>
          <button
            onClick={handleClearAllStorage}
            className="text-[11px] font-medium text-stone-500 hover:text-red-600 transition cursor-pointer"
          >
            {t.clearCache}
          </button>
        </div>
      </section>

      {/* 5. Student Profile on Shared Phone */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900">{t.studentProfileTitle}</h2>
          </div>
          <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
            MP Higher Ed Verified
          </span>
        </div>

        {(() => {
          const profile = getActiveStudentProfile();
          const isDemo = isDemoModeActive();
          return (
            <div className="space-y-3">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {language === 'hi' ? profile.nameHi : profile.name}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                    Samagra: {profile.samagraId}
                  </span>
                </div>

                <p className="font-medium text-slate-800">
                  {language === 'hi' ? profile.courseHi : profile.course}
                </p>

                <p className="text-stone-600 text-[11px]">
                  {language === 'hi' ? profile.collegeHi : profile.college}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                  <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-medium">
                    🏷️ {language === 'hi' ? profile.categoryHi : profile.category}
                  </span>
                  <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 font-medium">
                    📍 {language === 'hi' ? profile.districtHi : `${profile.district} District`}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                    💰 {language === 'hi' ? profile.familyIncomeFormatted : 'Annual: ₹72,000'}
                  </span>
                  <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-200 font-medium">
                    🎓 {profile.mptaasProfileId}
                  </span>
                </div>
              </div>

              {/* Demo Mode Actions */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-600" />
                    {language === 'hi' ? 'जज प्रस्तुति डेमो प्रीसेट' : 'Judge Presentation Demo Preset'}
                  </span>
                  <p className="text-[11px] text-amber-900">
                    {language === 'hi'
                      ? 'धार आदिवासी छात्र (रामेश्वर जामरा) का पूरा डेटा 1-टैप में लोड करें'
                      : 'Load full Dhar tribal student data (Rameshwar Jamra) in 1 tap'}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={async () => {
                      await seedDemoData();
                      window.location.reload();
                    }}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition cursor-pointer min-h-[38px] flex items-center justify-center gap-1"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{language === 'hi' ? 'डेमो लोड करें' : 'Seed Preset'}</span>
                  </button>

                  <button
                    onClick={async () => {
                      await clearDemoData();
                      window.location.reload();
                    }}
                    className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-200 transition cursor-pointer min-h-[38px] flex items-center justify-center"
                    title="Reset to clean state"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
};
