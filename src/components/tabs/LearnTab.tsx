import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useSettings } from '../../context/SettingsContext';
import { db, QACacheRecord, saveQAToCache } from '../../db';
import { KNOWLEDGE_BASE, retrieveRelevantNote, TopicNote } from '../../content';
import { askAI, AIResponse } from '../../services/ai';
import { 
  startVoiceRecognition, 
  speakText, 
  stopSpeaking, 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported 
} from '../../services/speech';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Send, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  Gauge, 
  Bookmark, 
  HelpCircle,
  FileText,
  Languages
} from 'lucide-react';
import { translateText, TranslationResult } from '../../services/translate';
import { SupportedLanguage } from '../../i18n';
import { getActiveStudentProfile } from '../../services/demoSeed';

type SubjectType = 'Physics' | 'English' | 'Political Science';

interface LearnTabProps {
  onNavigateToSettings: () => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({ onNavigateToSettings }) => {
  const { language, t } = useLanguage();
  const { dataSaver, simulateOffline } = useSettings();

  // State
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('Physics');
  const [questionInput, setQuestionInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [qaHistory, setQaHistory] = useState<QACacheRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeNoteModal, setActiveNoteModal] = useState<TopicNote | null>(null);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetTransLang, setTargetTransLang] = useState<SupportedLanguage>('hi');

  const handleTranslateAnswer = async (lang: SupportedLanguage) => {
    if (!currentResponse) return;
    setIsTranslating(true);
    setTargetTransLang(lang);
    try {
      const res = await translateText(currentResponse.answer, lang, language);
      setTranslationResult(res);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const voiceRecognitionRef = useRef<{ stop: () => void } | null>(null);

  // Load cached Q&A history (last 20)
  const loadHistory = async () => {
    try {
      const records = await db.qaCache.reverse().limit(20).toArray();
      setQaHistory(records);
    } catch (err) {
      console.error('Failed to load QA history:', err);
    }
  };

  useEffect(() => {
    loadHistory();
    const handleDemoChange = () => loadHistory();
    window.addEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    return () => {
      window.removeEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
      stopSpeaking();
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.stop();
      }
    };
  }, []);

  // Voice Input (Web Speech API)
  const toggleVoiceInput = () => {
    if (isListening) {
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setSpeechError(null);
    setIsListening(true);

    const rec = startVoiceRecognition({
      language: language === 'hi' ? 'hi' : 'en',
      onResult: (transcript) => {
        setQuestionInput(transcript);
        setIsListening(false);
      },
      onError: (err) => {
        setSpeechError(err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    voiceRecognitionRef.current = rec;
  };

  // Submit Question & Resolve Doubt
  const handleSubmitDoubt = async (queryText?: string) => {
    const q = (queryText || questionInput).trim();
    if (!q) return;

    stopSpeaking();
    setIsProcessing(true);
    setSpeechError(null);
    setCurrentQuestion(q);

    try {
      // 1. Retrieve the most relevant note from local knowledge base (lightweight keyword search)
      const retrieval = retrieveRelevantNote(selectedSubject, q);

      // 2. Call askAI() with the retrieved note snippet (small payload constraint)
      const isCurrentlyOffline = simulateOffline || !navigator.onLine;

      const aiResult = await askAI(q, {
        subject: selectedSubject,
        language: language,
        isOffline: isCurrentlyOffline,
        retrievedNote: retrieval
          ? {
              title: retrieval.note.title,
              titleHi: retrieval.note.titleHi,
              snippet: retrieval.note.snippet,
              content: retrieval.note.content,
            }
          : null,
      });

      setCurrentResponse(aiResult);

      // 3. Save to IndexedDB qaCache (up to 20 per student, tagged offline if applicable)
      await saveQAToCache({
        studentId: getActiveStudentProfile().studentId,
        subject: selectedSubject,
        question: q,
        answer: aiResult.answer,
        sourceTitle: aiResult.source,
        isOfflineAnswer: isCurrentlyOffline,
        timestamp: Date.now(),
      });

      await loadHistory();

      // 4. Auto-play text-to-speech for accessibility
      handleSpeakAloud(aiResult.answer, speechRate);
    } catch (err: any) {
      console.error('Error resolving doubt:', err);
      setCurrentResponse({
        answer: language === 'hi'
          ? 'प्रश्न हल करते समय त्रुटि आई। कृपया पुनः प्रयास करें।'
          : 'An error occurred while resolving doubt. Please try again.',
        source: 'System',
        confidence: 'uncertain',
        isPlaceholder: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-To-Speech Playback
  const handleSpeakAloud = (text: string, rate: number) => {
    stopSpeaking();
    setIsSpeaking(true);
    speakText(text, {
      language: language === 'hi' ? 'hi' : 'en',
      rate: rate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleCycleRate = () => {
    const nextRate = speechRate === 1.0 ? 0.8 : speechRate === 0.8 ? 1.2 : 1.0;
    setSpeechRate(nextRate);
    if (isSpeaking && currentResponse) {
      handleSpeakAloud(currentResponse.answer, nextRate);
    }
  };

  const sampleQuestions: Record<SubjectType, Array<{ q: string; qHi: string }>> = {
    Physics: [
      { q: "What is Young's double slit experiment and fringe width?", qHi: "यंग का द्वि-स्लिट प्रयोग और फ्रिंज चौड़ाई क्या है?" },
      { q: "Explain Carnot cycle efficiency and Second law.", qHi: "कार्नो चक्र की दक्षता और ऊष्मागतिकी का द्वितीय नियम बताएं।" },
      { q: "State Einstein's photoelectric equation and threshold frequency.", qHi: "आइंस्टीन का प्रकाश विद्युत समीकरण और देहली आवृत्ति क्या है?" },
    ],
    English: [
      { q: "What are the rules of Active and Passive Voice with examples?", qHi: "वाच्य परिवर्तन (Active/Passive Voice) के क्या नियम हैं?" },
      { q: "Explain the central theme and Raju's character in 'The Guide'.", qHi: "आर.के. नारायण के 'द गाइड' के केंद्रीय भाव की व्याख्या करें।" },
      { q: "What is the difference between Simile and Metaphor?", qHi: "उपमा (Simile) और रूपक (Metaphor) अलंकार में क्या अंतर है?" },
    ],
    'Political Science': [
      { q: "What are the six Fundamental Rights under Indian Constitution?", qHi: "भारतीय संविधान के छह मौलिक अधिकार कौन से हैं?" },
      { q: "Explain PESA Act 1996 and Gram Sabha powers in MP tribal blocks.", qHi: "म.प्र. में पेसा (PESA) कानून 1996 और ग्राम सभा के अधिकार क्या हैं?" },
      { q: "What are Directive Principles of State Policy (DPSP)?", qHi: "राज्य के नीति निर्देशक तत्व (DPSP) क्या हैं?" },
    ],
  };

  // Filter subject topic notes for browsing
  const currentSubjectNotes = KNOWLEDGE_BASE.filter(
    (n) => n.subject === selectedSubject
  );

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Header with Subject Selector */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'एआई शंका समाधान एवं वाक् केंद्र' : 'AI Doubt Resolution & Voice Assistant'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              {language === 'hi'
                ? 'बोलकर या लिखकर सवाल पूछें — उत्तर केवल आपके पाठ्यक्रम नोट्स पर आधारित होगा।'
                : 'Ask questions by voice or text — grounded strictly in your preloaded undergraduate notes.'}
            </p>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-slate-800 transition cursor-pointer min-h-[44px] self-start sm:self-center"
          >
            <History className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? `इतिहास (${qaHistory.length})` : `History (${qaHistory.length})`}</span>
          </button>
        </div>

        {/* 3 Seed Subjects Tabs */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {(['Physics', 'English', 'Political Science'] as SubjectType[]).map((subj) => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubject(subj);
                setCurrentResponse(null);
                setCurrentQuestion(null);
              }}
              className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-bold transition cursor-pointer min-h-[48px] flex flex-col items-center justify-center ${
                selectedSubject === subj
                  ? 'border-amber-600 bg-amber-50 text-slate-900 shadow-xs'
                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
              }`}
            >
              <span>{subj}</span>
              <span className="text-[10px] text-stone-500 font-normal mt-0.5">
                {subj === 'Physics' ? 'B.Sc. UG' : subj === 'English' ? 'B.A. Literature' : 'B.A. Polity'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Live API Key Notice Bar (Explaining placeholder vs real key) */}
      <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">
            {language === 'hi' ? 'ऑफ़लाइन एवं स्थानीय उत्तर सक्रिय' : 'Local Grounded Engine Active (Placeholder Mode)'}
          </p>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            {language === 'hi'
              ? 'वर्तमान में उत्तर स्थानीय ज्ञानकोष से बिना इंटरनेट के दिए जा रहे हैं। लाइव जेमिनी मॉडल जोड़ने के लिए पर्यावरण चर GEMINI_API_KEY सेट करें।'
              : 'End-to-end doubt resolution is running 100% offline from your local course notes. To switch to live Gemini Flash API calls, set the GEMINI_API_KEY environment variable in your .env or AI Studio Secrets.'}
          </p>
        </div>
      </div>

      {/* 3. Doubt Asking Box with Speech Recognition */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-4">
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
          {language === 'hi' ? `${selectedSubject} में अपनी शंका पूछें:` : `Ask a doubt in ${selectedSubject}:`}
        </label>

        <div className="relative">
          <textarea
            rows={3}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'उदा. कार्नो चक्र की दक्षता का सूत्र क्या है? (या माइक बटन दबाकर बोलें)'
                : 'e.g., What is Carnot cycle efficiency? (or tap the mic to speak)'
            }
            className="w-full rounded-xl border-2 border-stone-300 p-3.5 pr-20 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-amber-500 bg-stone-50 transition"
          />

          {/* Voice Input Button (Web Speech API) */}
          <button
            onClick={toggleVoiceInput}
            type="button"
            className={`absolute right-3 bottom-3 p-2.5 rounded-xl transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
            }`}
            title={isListening ? 'Listening... Tap to stop' : 'Tap to speak question'}
            aria-label="Speech to Text"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-700" />}
          </button>
        </div>

        {isListening && (
          <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="font-semibold">
              {language === 'hi' ? 'सुन रहे हैं... कृपया स्पष्ट बोलें (Web Speech API)' : 'Listening... Speak clearly (Web Speech API)'}
            </span>
          </div>
        )}

        {speechError && (
          <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>{currentSubjectNotes.length} UG topic notes indexed for {selectedSubject}</span>
          </div>

          <button
            onClick={() => handleSubmitDoubt()}
            disabled={isProcessing || !questionInput.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold px-5 py-2.5 text-xs transition cursor-pointer min-h-[48px] active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>{isProcessing ? (language === 'hi' ? 'खोज रहे हैं...' : 'Retrieving...') : (language === 'hi' ? 'उत्तर प्राप्त करें' : 'Get Answer')}</span>
          </button>
        </div>

        {/* Quick Sample Questions */}
        <div className="pt-2 border-t border-stone-100 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400">
            {language === 'hi' ? 'त्वरित उदाहरण प्रश्न (टैप करें):' : 'Sample Doubts from Syllabus (Tap to Ask):'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions[selectedSubject].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const q = language === 'hi' ? item.qHi : item.q;
                  setQuestionInput(q);
                  handleSubmitDoubt(q);
                }}
                className="text-[11px] bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-900 px-3 py-1.5 rounded-lg border border-stone-200 transition text-left cursor-pointer min-h-[38px] flex items-center"
              >
                {language === 'hi' ? item.qHi : item.q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Active Answer Card with Voice Controls & Source Attribution */}
      {currentResponse && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-500/40 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                Grounded Doubt Answer
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {currentQuestion}
              </h2>
            </div>

            {/* Voice Audio Controls: Slow Down, Repeat, Stop */}
            <div className="flex items-center gap-1.5 shrink-0 bg-stone-50 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => handleSpeakAloud(currentResponse.answer, speechRate)}
                className={`p-2 rounded-lg transition cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center ${
                  isSpeaking
                    ? 'bg-amber-600 text-white'
                    : 'bg-white hover:bg-stone-100 text-slate-800'
                }`}
                title="Speak answer aloud"
                aria-label="Play audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {isSpeaking && (
                <button
                  onClick={handleStopSpeaking}
                  className="p-2 rounded-lg bg-white hover:bg-stone-100 text-red-600 transition cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
                  title="Stop speaking"
                  aria-label="Stop audio"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleCycleRate}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-xs font-bold text-slate-800 border border-stone-200 transition cursor-pointer min-h-[42px] flex items-center gap-1"
                title="Slow down speech (0.8x / 1.0x / 1.2x)"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-600" />
                <span>{speechRate}x</span>
              </button>

              <button
                onClick={() => handleSpeakAloud(currentResponse.answer, speechRate)}
                className="p-2 rounded-lg bg-white hover:bg-stone-100 text-stone-700 transition cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
                title="Repeat from beginning"
                aria-label="Repeat audio"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transcript / Answer Text */}
          <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-900 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl border border-stone-200">
            {currentResponse.answer}
          </div>

          {/* Translation Action Toolbar (Requirement #3) */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                {t.translateAnswer}:
              </span>
              <button
                type="button"
                onClick={() => handleTranslateAnswer('hi')}
                disabled={isTranslating}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[36px] ${
                  targetTransLang === 'hi' && translationResult
                    ? 'bg-indigo-600 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => handleTranslateAnswer('bhili')}
                disabled={isTranslating}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[36px] flex items-center gap-1 ${
                  targetTransLang === 'bhili' && translationResult
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                <span>भीली (Bhili)</span>
                <span className="text-[9px] font-mono bg-amber-200 text-amber-950 font-bold px-1 rounded">Beta</span>
              </button>
              <button
                type="button"
                onClick={() => handleTranslateAnswer('en')}
                disabled={isTranslating}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer min-h-[36px] ${
                  targetTransLang === 'en' && translationResult
                    ? 'bg-indigo-600 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                English
              </button>
            </div>

            {isTranslating && (
              <span className="text-xs text-indigo-600 animate-pulse font-medium">
                {t.translating}
              </span>
            )}
          </div>

          {/* Render Translation Result Block */}
          {translationResult && (
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-indigo-200/60">
                <span className="font-bold text-indigo-950 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  {translationResult.targetLang === 'bhili' ? 'भीली अनुवाद (Beta Placeholder)' : `${translationResult.targetLang.toUpperCase()} Translation`}
                </span>
                <span className="font-mono text-[10px] bg-white text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded">
                  {translationResult.provider}
                </span>
              </div>

              <div className="text-stone-900 leading-relaxed whitespace-pre-line bg-white/80 p-3 rounded-lg border border-indigo-100">
                {translationResult.translatedText}
              </div>

              {translationResult.notice && (
                <p className="text-[10px] text-indigo-800 italic pt-1">
                  💡 {translationResult.notice}
                </p>
              )}
            </div>
          )}

          {/* Source Attribution (Constraint #3: "Source: <topic note title>") */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Source:</strong> {currentResponse.source}
              </span>
            </div>

            <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              Saved in local IndexedDB (Last 20 cache)
            </span>
          </div>

          {/* Tele-MANAS helpline notice if triggered */}
          {currentResponse.helplineNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{currentResponse.helplineNotice}</span>
            </div>
          )}
        </section>
      )}

      {/* 5. Last 20 Q&As Cached in IndexedDB (Browsable Offline) */}
      {showHistory && (
        <section className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? 'ऑफ़लाइन सहेजी गई शंकाएं (अधिकतम 20)' : 'Locally Cached Q&A History (Max 20)'}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {qaHistory.length} saved
            </span>
          </div>

          {qaHistory.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-4 text-center">
              {language === 'hi' ? 'अभी तक कोई शंका इतिहास नहीं है।' : 'No Q&As cached yet. Ask a question above!'}
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {qaHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900">{item.question}</span>
                    <span className="text-[10px] font-mono text-stone-400 shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-stone-700 leading-relaxed text-[11px] line-clamp-3">
                    {item.answer}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200/60 text-[10px]">
                    <span className="font-medium text-stone-600">
                      Source: <strong>{item.sourceTitle}</strong>
                    </span>

                    {/* Stale offline tag requirement */}
                    <span className="inline-flex items-center gap-1 font-mono text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-amber-600" />
                      answered while offline (may be stale)
                    </span>

                    <button
                      onClick={() => handleSpeakAloud(item.answer, speechRate)}
                      className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{language === 'hi' ? 'फिर से सुनें' : 'Listen'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 6. Browse All Course Notes in Knowledge Base */}
      <section className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'hi' ? `${selectedSubject} के पाठ्यक्रम नोट्स` : `${selectedSubject} Course Topic Notes`}
            </h2>
          </div>
          <span className="text-[11px] text-stone-500 font-mono">
            {currentSubjectNotes.length} Chapters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentSubjectNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteModal(note)}
              className="p-3 bg-stone-50 hover:bg-amber-50/50 rounded-xl border border-stone-200 transition cursor-pointer text-xs space-y-1"
            >
              <div className="font-bold text-slate-900 leading-snug">
                {language === 'hi' ? note.titleHi : note.title}
              </div>
              <p className="text-stone-500 text-[11px] line-clamp-2">
                {note.snippet}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-amber-700 font-medium">
                <span>View Full Note →</span>
                <span className="font-mono text-stone-400">{(note.content.length / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Topic Note Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-stone-300 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">
                  {activeNoteModal.subject} Note
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {language === 'hi' ? activeNoteModal.titleHi : activeNoteModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4 text-xs sm:text-sm text-stone-800 space-y-3 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl border border-stone-200">
              {activeNoteModal.content}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  const q = activeNoteModal.title;
                  setQuestionInput(q);
                  setActiveNoteModal(null);
                  handleSubmitDoubt(q);
                }}
                className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 transition min-h-[44px]"
              >
                {language === 'hi' ? 'इस पर AI से सवाल पूछें' : 'Ask AI Doubt on This'}
              </button>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs px-4 py-2 transition min-h-[44px]"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
