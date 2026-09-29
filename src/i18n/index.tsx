import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'hi' | 'bhili';

export interface Translations {
  appName: string;
  tagline: string;
  navHome: string;
  navLearn: string;
  navScholarships: string;
  navMentor: string;
  navCareer: string;
  navProfile: string;

  // Offline banner & status
  offlineActiveTitle: string;
  offlineActiveDesc: string;
  offlineWorksHeader: string;
  offlineWorksList: string[];
  offlineNeedsNetHeader: string;
  offlineNeedsNetList: string[];
  onlineBadge: string;
  offlineBadge: string;
  testOfflineDevToolsNote: string;

  // Data saver
  dataSaverLabel: string;
  dataSaverActive: string;
  dataSaverDesc: string;
  dataSaverOff: string;

  // Helpline
  teleManasBanner: string;
  teleManasDial: string;
  teleManasSub: string;

  // Install
  installApp: string;
  installGuideTitle: string;
  installGuideStep1: string;
  installGuideStep2: string;
  close: string;

  // Settings & Profile
  settingsTitle: string;
  settingsSubtitle: string;
  selectLanguage: string;
  networkSimulateLabel: string;
  networkSimulateDesc: string;
  simulateOfflineActive: string;
  simulateOfflineInactive: string;
  offlineStorageHeader: string;
  offlineStorageDesc: string;
  downloadForOffline: string;
  downloadedBadge: string;
  removeDownload: string;
  downloadSuccess: string;
  clearCache: string;
  cacheCleared: string;
  studentProfileTitle: string;
  studentName: string;
  studentDistrict: string;
  studentCollege: string;
  studentCategory: string;
  editProfile: string;

  // Shared UI
  highContrastNotice: string;
  tapTargetNotice: string;
  tapToSwitch: string;
  hackathonBadge: string;
  langToggle: string;
  offlineGreetingTitle: string;
  offlineGreetingSubtitle: string;
  offlineSavedNotice: string;
  schemesLabel: string;
  tribalDistrictsLabel: string;

  // Translation UI
  translateAnswer: string;
  translating: string;
  translatedBadge: string;
  bhiliBetaNotice: string;
  langNameBhili: string;
}

const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'VidyaSaathi',
    tagline: 'Digital Inclusion & Higher Education Companion for Madhya Pradesh',
    navHome: 'Home',
    navLearn: 'Learn',
    navScholarships: 'Scholarships',
    navMentor: 'Mentor & Buddy',
    navCareer: 'Career',
    navProfile: 'Profile',

    offlineActiveTitle: 'Offline Mode Active — You are Disconnected',
    offlineActiveDesc: 'No internet connection detected. VidyaSaathi is running seamlessly from your device storage.',
    offlineWorksHeader: 'Available Right Now Offline',
    offlineWorksList: [
      'Downloaded subject lessons & notes',
      'Saved MP scholarship schemes & eligibility rules',
      'Local chat history & personal draft notes',
      'Emergency Tele-MANAS phone dialing (14416)',
    ],
    offlineNeedsNetHeader: 'Requires Connection (When Back Online)',
    offlineNeedsNetList: [
      'New AI queries & unverified syllabus questions',
      'Live peer & mentor direct messaging',
      'MPTAAS / NSP portal online submission sync',
    ],
    onlineBadge: 'Online (Connected)',
    offlineBadge: 'Offline (Cache Running)',
    testOfflineDevToolsNote: 'Tip for evaluators: Set Chrome DevTools > Network to "Offline" or toggle switch below.',

    dataSaverLabel: 'Data Saver Mode',
    dataSaverActive: 'Data Saver ON (Low Bandwidth)',
    dataSaverDesc: 'Disables decorative images, background gradients, and animations for fast 2G loading.',
    dataSaverOff: 'Standard Visuals',

    teleManasBanner: 'National Mental Health Helpline — Tele-MANAS',
    teleManasDial: 'Toll-free 14416 or 1800-891-4416 (24/7 Multilingual)',
    teleManasSub: 'Govt. of India. Free & confidential. VidyaSaathi never diagnoses or acts as a therapist.',

    installApp: 'Install App (PWA)',
    installGuideTitle: 'Install on iPhone / iPad',
    installGuideStep1: 'Tap the Share button in Safari toolbar.',
    installGuideStep2: 'Scroll down and tap "Add to Home Screen".',
    close: 'Close',

    settingsTitle: 'Settings & Device Management',
    settingsSubtitle: 'Configure offline caching, bandwidth limits, and accessibility for shared phones.',
    selectLanguage: 'App Language',
    networkSimulateLabel: 'Simulate Offline State',
    networkSimulateDesc: 'Manually test how the app shell and local stores respond when signal is lost.',
    simulateOfflineActive: 'Forced Offline (Testing)',
    simulateOfflineInactive: 'Real Network Status',
    offlineStorageHeader: 'Downloaded Offline Lessons & Resources',
    offlineStorageDesc: 'Download critical subject chapters and scholarship checklists while on college Wi-Fi.',
    downloadForOffline: 'Download to Device',
    downloadedBadge: 'Saved Offline',
    removeDownload: 'Free Space',
    downloadSuccess: 'Downloaded to IndexedDB for offline reading.',
    clearCache: 'Clear Local Storage',
    cacheCleared: 'Local cached notes reset.',
    studentProfileTitle: 'Student Profile (Shared Phone)',
    studentName: 'Pooja Bhil',
    studentDistrict: 'Dhar District (Malwa Tribal Belt)',
    studentCollege: 'Govt. Post Graduate College, Dhar (MP)',
    studentCategory: 'Scheduled Tribe (ST) • B.A. 2nd Year',
    editProfile: 'Switch Student Profile',

    highContrastNotice: 'High-contrast design with 48px+ tap targets for low-cost Android phones & cracked screens.',
    tapTargetNotice: 'Mobile Accessible Layout (WCAG AAA)',
    tapToSwitch: 'Switch',
    hackathonBadge: 'MPOnline Idea & Innovation Hackathon 2026',
    langToggle: 'हिन्दी',
    offlineGreetingTitle: 'Hello, offline world!',
    offlineGreetingSubtitle: 'Designed for rural colleges, patchy 2G/3G networks, and shared mobile devices across Madhya Pradesh.',
    offlineSavedNotice: 'Saved to IndexedDB! Even with zero internet, this note persists.',
    schemesLabel: 'Key Higher Ed Scholarship Schemes',
    tribalDistrictsLabel: 'Target Tribal-Belt & Rural MP Districts',

    translateAnswer: 'Translate this answer',
    translating: 'Translating...',
    translatedBadge: 'Translated',
    bhiliBetaNotice: 'Bhili language support is currently in proof-of-concept beta. Real reviewed translations will be added via Bhashini integration.',
    langNameBhili: 'भीली (Bhili - Beta)',
  },
  hi: {
    appName: 'विद्यासाथी',
    tagline: 'मध्य प्रदेश के ग्रामीण और आदिवासी अंचल के विद्यार्थियों का उच्च शिक्षा साथी',
    navHome: 'होम',
    navLearn: 'पढ़ाई',
    navScholarships: 'छात्रवृत्तियां',
    navMentor: 'मेंटर एवं साथी',
    navCareer: 'करियर',
    navProfile: 'प्रोफाइल',

    offlineActiveTitle: 'ऑफ़लाइन मोड सक्रिय — इंटरनेट बंद है',
    offlineActiveDesc: 'कोई इंटरनेट कनेक्शन नहीं मिला। विद्यासाथी आपके फोन की स्थानीय मेमोरी से पूरी तरह काम कर रहा है।',
    offlineWorksHeader: 'बिना इंटरनेट क्या काम कर रहा है:',
    offlineWorksList: [
      'डाउनलोड किए गए पाठ और विषय नोट्स',
      'सहेजी गई एमपी छात्रवृत्ति योजनाएं और नियम',
      'पिछली चैट हिस्ट्री और व्यक्तिगत ड्राफ्ट नोट्स',
      'राष्ट्रीय टेली-मानस हेल्पलाइन कॉल (14416)',
    ],
    offlineNeedsNetHeader: 'इंटरनेट आने पर क्या चालू होगा:',
    offlineNeedsNetList: [
      'नए AI प्रश्न और अज्ञात सिलेबस के उत्तर',
      'मेंटर और साथी के साथ लाइव मैसेजिंग',
      'MPTAAS / NSP पोर्टल पर ऑनलाइन फॉर्म जमा करना',
    ],
    onlineBadge: 'ऑनलाइन (सिंक सक्रिय)',
    offlineBadge: 'ऑफ़लाइन (लोकल कैश सक्रिय)',
    testOfflineDevToolsNote: 'परीक्षण हेतु: DevTools में Network को "Offline" करें या नीचे दिए बटन से टॉगल करें।',

    dataSaverLabel: 'डेटा सेवर मोड',
    dataSaverActive: 'डेटा सेवर चालू (कम 2G डेटा खर्च)',
    dataSaverDesc: 'सजावटी ग्राफिक्स, बड़े बैकग्राउंड और एनिमेशन बंद करके 2G नेटवर्क पर बिजली की तरह तेज चलता है।',
    dataSaverOff: 'सामान्य डिज़ाइन',

    teleManasBanner: 'राष्ट्रीय मानसिक स्वास्थ्य हेल्पलाइन — टेली-मानस',
    teleManasDial: 'निःशुल्क 14416 या 1800-891-4416 (24/7 बहुभाषी)',
    teleManasSub: 'भारत सरकार द्वारा गोपनीय सहायता। विद्यासाथी कभी निदान नहीं करता और न ही थेरेपिस्ट का ढोंग करता है।',

    installApp: 'ऐप इंस्टॉल करें (PWA)',
    installGuideTitle: 'iPhone / iPad पर इंस्टॉल करें',
    installGuideStep1: 'सफारी टूलबार में शेयर (Share) आइकन पर टैप करें।',
    installGuideStep2: 'नीचे स्क्रॉल करें और "Add to Home Screen" चुनें।',
    close: 'बंद करें',

    settingsTitle: 'सेटिंग्स एवं डिवाइस प्रबंधन',
    settingsSubtitle: 'ऑफ़लाइन स्टोरेज, डेटा बचत और साझा फोन हेतु विकल्प सेट करें।',
    selectLanguage: 'ऐप की भाषा चुनें',
    networkSimulateLabel: 'ऑफ़लाइन परीक्षण मोड',
    networkSimulateDesc: 'जांचें कि नेटवर्क चले जाने पर ऐप का शेल और स्थानीय स्टोरेज कैसे काम करता है।',
    simulateOfflineActive: 'ऑफ़लाइन परीक्षण चालू',
    simulateOfflineInactive: 'वास्तविक नेटवर्क स्थिति',
    offlineStorageHeader: 'ऑफ़लाइन पाठ और अध्ययन सामग्री',
    offlineStorageDesc: 'कॉलेज वाई-फाई मिलने पर जरूरी अध्याय और छात्रवृत्ति चेकलिस्ट पहले से डाउनलोड रखें।',
    downloadForOffline: 'फोन में डाउनलोड करें',
    downloadedBadge: 'ऑफ़लाइन सुरक्षित',
    removeDownload: 'स्पेस खाली करें',
    downloadSuccess: 'IndexedDB में ऑफ़लाइन पढ़ने हेतु सुरक्षित कर लिया गया।',
    clearCache: 'स्थानीय डेटा रीसेट करें',
    cacheCleared: 'स्थानीय नोट्स रीसेट हो गए।',
    studentProfileTitle: 'विद्यार्थी प्रोफाइल (साझा फोन मोड)',
    studentName: 'पूजा भील',
    studentDistrict: 'धार जिला (मालवा आदिवासी अंचल)',
    studentCollege: 'शासकीय स्नातकोत्तर महाविद्यालय, धार (म.प्र.)',
    studentCategory: 'अनुसूचित जनजाति (ST) • बी.ए. द्वितीय वर्ष',
    editProfile: 'विद्यार्थी प्रोफाइल बदलें',

    highContrastNotice: 'कम कीमत वाले स्मार्टफोन और टूटी स्क्रीन के लिए न्यूनतम 48px टच टारगेट और उच्च कंट्रास्ट डिज़ाइन।',
    tapTargetNotice: 'सुलभ मोबाइल लेआउट (WCAG AAA)',
    tapToSwitch: 'बदलें',
    hackathonBadge: 'एमपीऑनलाइन आइडिया एवं इनोवेशन हैकथॉन 2026',
    langToggle: 'English',
    offlineGreetingTitle: 'नमस्ते, ऑफ़लाइन दुनिया!',
    offlineGreetingSubtitle: 'मध्य प्रदेश के ग्रामीण महाविद्यालयों, कमजोर 2G/3G नेटवर्क और साझा मोबाइल फोन के लिए विशेष रूप से निर्मित।',
    offlineSavedNotice: 'IndexedDB में सहेजा गया! बिना इंटरनेट के भी यह नोट हमेशा रहेगा।',
    schemesLabel: 'प्रमुख उच्च शिक्षा छात्रवृत्ति योजनाएं',
    tribalDistrictsLabel: 'लक्षित आदिवासी एवं ग्रामीण जिले',

    translateAnswer: 'इस उत्तर का अनुवाद करें',
    translating: 'अनुवाद हो रहा है...',
    translatedBadge: 'अनुवादित',
    bhiliBetaNotice: 'भीली भाषा समर्थन वर्तमान में प्रायोगिक (Beta) है। प्रामाणिक अनुवाद भाषिणी (Bhashini) एकीकरण द्वारा जोड़े जाएंगे।',
    langNameBhili: 'भीली (Bhili - Beta)',
  },
  bhili: {
    // Tribal Proof of Concept (Bhili - Malwa/Nimar Belt: Dhar, Jhabua, Alirajpur, Barwani)
    // Strictly marked as beta placeholders to avoid presenting unverified machine translations to judges.
    appName: 'विद्यासाथी [भीली बीटा]',
    tagline: 'मध्य परदेश ना आदिवासी ने गांवड़ा ना टाबरिया सारू उच्च शिक्षण साथी',
    navHome: 'घेर / होम [बीटा]',
    navLearn: 'भणतर / पढ़ाई [बीटा]',
    navScholarships: 'छात्रवृत्ति [बीटा]',
    navMentor: 'साथी / मेंटर [बीटा]',
    navCareer: 'करियर / काम-धंधो [बीटा]',
    navProfile: 'प्रोफाइल [बीटा]',

    offlineActiveTitle: 'ऑफ़लाइन मोड चालू छे — नेट बंद छे [बीटा]',
    offlineActiveDesc: 'नेट नथी आवतो. विद्यासाथी मोबाइल नी मेमोरी माथी बराबर चाली रयो छे.',
    offlineWorksHeader: 'बिना नेट काय काम करी रयुं छे:',
    offlineWorksList: [
      'डाउनलोड करेल पाठ ने नोट्स [बीटा]',
      'सहेजी राखेल छात्रवृत्ति ना नियम [बीटा]',
      'जूनी चैट ने लिखाण [बीटा]',
      'टेली-मानस फोन कॉल (14416) [बीटा]',
    ],
    offlineNeedsNetHeader: 'नेट आव्या पछी चालू थाशे:',
    offlineNeedsNetList: [
      'नवा AI सवाल-जवाब [बीटा]',
      'मेंटर साथी साथे लाइव वातचीत [बीटा]',
      'पोर्टल मा फॉर्म जमा करवुं [बीटा]',
    ],
    onlineBadge: 'ऑनलाइन (नेट चालू) [बीटा]',
    offlineBadge: 'ऑफ़लाइन (लोकल चालू) [बीटा]',
    testOfflineDevToolsNote: 'परीक्षण सारू: DevTools मा Network Offline करो [बीटा]।',

    dataSaverLabel: 'डेटा बचाओ मोड [बीटा]',
    dataSaverActive: 'डेटा बचाओ चालू (2G मोड) [बीटा]',
    dataSaverDesc: 'चित्र ने एनिमेशन बंद करीने 2G नेट पर जोरादार चाले छे.',
    dataSaverOff: 'सामान्य मोड [बीटा]',

    teleManasBanner: 'राष्ट्रीय मानसिक स्वास्थ्य हेल्पलाइन — टेली-मानस',
    teleManasDial: 'विना मूल्य 14416 अथवा 1800-891-4416 (24/7)',
    teleManasSub: 'भारत सरकार नी मदद. विद्यासाथी डॉक्टर नथी.',

    installApp: 'ऐप फोन मा राखो (Install PWA) [बीटा]',
    installGuideTitle: 'iPhone पर इंस्टॉल करो [बीटा]',
    installGuideStep1: 'Share बटन दबाओ [बीटा].',
    installGuideStep2: 'Add to Home Screen पसंद करो [बीटा].',
    close: 'बंद करो [बीटा]',

    settingsTitle: 'सेटिंग्स ने साधन [बीटा]',
    settingsSubtitle: 'ऑफ़लाइन पाठ ने भाषा पसंद करो [बीटा].',
    selectLanguage: 'भाषा पसंद करो [बीटा]',
    networkSimulateLabel: 'ऑफ़लाइन टेस्ट मोड [बीटा]',
    networkSimulateDesc: 'नेट बंद करीने तपास करो [बीटा].',
    simulateOfflineActive: 'ऑफ़लाइन टेस्ट चालू [बीटा]',
    simulateOfflineInactive: 'साचो नेट [बीटा]',
    offlineStorageHeader: 'ऑफ़लाइन पाठ [बीटा]',
    offlineStorageDesc: 'कॉलेज मा नेट होय त्यारे पाठ डाउनलोड करी राखो [बीटा].',
    downloadForOffline: 'फोन मा डाउनलोड करो [बीटा]',
    downloadedBadge: 'साचवी राख्युं [बीटा]',
    removeDownload: 'खाली करो [बीटा]',
    downloadSuccess: 'फोन मा सहेजी लीधुं [बीटा].',
    clearCache: 'मेमोरी साफ करो [बीटा]',
    cacheCleared: 'नोट्स साफ थई गया [बीटा].',
    studentProfileTitle: 'विद्यार्थी प्रोफाइल [बीटा]',
    studentName: 'पूजा भील',
    studentDistrict: 'धार जिल्लो (भील आदिवासी अंचल)',
    studentCollege: 'सरकारी कॉलेज, धार (म.प्र.)',
    studentCategory: 'अनुसूचित जनजाति (ST) • बीए बीजू वर्ष',
    editProfile: 'प्रोफाइल बदलो [बीटा]',

    highContrastNotice: 'भीली अंचल ना टाबरिया सारू मोटा बटन ने सरल डिज़ाइन [बीटा].',
    tapTargetNotice: 'सुलभ मोबाइल डिज़ाइन [बीटा]',
    tapToSwitch: 'बदलो [बीटा]',
    hackathonBadge: 'एमपीऑनलाइन हैकथॉन 2026 [बीटा]',
    langToggle: 'हिन्दी',
    offlineGreetingTitle: 'राम-राम, ऑफ़लाइन दुनिया! [बीटा]',
    offlineGreetingSubtitle: 'धार, झाबुआ, बड़वानी, आलीराजपुर ना कॉलेज टाबरिया सारू विशेष [बीटा].',
    offlineSavedNotice: 'फोन मा सहेजी राख्युं छे! [बीटा]',
    schemesLabel: 'खास छात्रवृत्ति योजनाएं [बीटा]',
    tribalDistrictsLabel: 'आदिवासी जिल्ला [बीटा]',

    translateAnswer: 'आ जवाब नो अनुवाद करो [बीटा]',
    translating: 'अनुवाद थाय छे...',
    translatedBadge: 'अनुवादित [बीटा]',
    bhiliBetaNotice: 'ध्यान राखो: भीली भाषा समर्थन हाल मा प्रायोगिक (Beta Placeholder) छे. भाषिणी (Bhashini) साथे साचो अनुवाद जोड़वा मा आवशे.',
    langNameBhili: 'भीली (Bhili - Beta)',
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Fully offline: instant synchronous load from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vidyasaathi_lang') as SupportedLanguage;
      if (saved === 'hi' || saved === 'en' || saved === 'bhili') return saved;
    }
    return 'hi'; // Default to Hindi for MP rural accessibility
  });

  useEffect(() => {
    localStorage.setItem('vidyasaathi_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === 'hi') return 'en';
      if (prev === 'en') return 'bhili';
      return 'hi';
    });
  };

  const t = translations[language] || translations.hi;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
