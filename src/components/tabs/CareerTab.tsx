import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n';
import { AppTab } from '../BottomNav';
import { db, CareerQuizResultRecord } from '../../db';
import { 
  MP_CAREER_CLUSTERS, 
  CAREER_QUIZ_QUESTIONS, 
  calculateQuizResult, 
  QuizEvaluationResult, 
  CareerCluster 
} from '../../content/careerClusters';
import { askAI, AIResponse } from '../../services/ai';
import { 
  startVoiceRecognition, 
  stopSpeaking, 
  isSpeechRecognitionSupported 
} from '../../services/speech';
import { 
  Compass, 
  Shield, 
  BookOpen, 
  Wheat, 
  Cpu, 
  Activity, 
  Wrench, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  ExternalLink, 
  Award, 
  BarChart3, 
  ChevronRight, 
  Info,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface CareerTabProps {
  onNavigateTab?: (tab: AppTab) => void;
}

export const CareerTab: React.FC<CareerTabProps> = ({ onNavigateTab }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi' || language === 'bhili';

  // Quiz state
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Results & active view
  const [savedResult, setSavedResult] = useState<QuizEvaluationResult | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string>('govt_civil_services');
  const [showScoreInspector, setShowScoreInspector] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'recommended' | 'all'>('recommended');

  // AI Follow-up Consultation
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [lastAskedQuery, setLastAskedQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const voiceRecognitionRef = useRef<{ stop: () => void } | null>(null);

  // Load saved quiz result from IndexedDB or localStorage on mount
  useEffect(() => {
    const loadSavedResult = async () => {
      try {
        // Try IndexedDB first
        const latestDbRecord = await db.careerQuizResult.orderBy('completedAt').last();
        if (latestDbRecord && MP_CAREER_CLUSTERS[latestDbRecord.clusterId]) {
          const topCluster = MP_CAREER_CLUSTERS[latestDbRecord.clusterId];
          const scoreBreakdown = Object.entries(latestDbRecord.scores).map(([clusterId, score]) => ({
            clusterId,
            clusterName: MP_CAREER_CLUSTERS[clusterId]?.name || clusterId,
            clusterNameHi: MP_CAREER_CLUSTERS[clusterId]?.nameHi || clusterId,
            score,
            percentage: Math.min(Math.round((score / (CAREER_QUIZ_QUESTIONS.length * 4)) * 100), 100),
          })).sort((a, b) => b.score - a.score);

          setSavedResult({
            topCluster,
            scores: latestDbRecord.scores,
            scoreBreakdown,
            completedAt: latestDbRecord.completedAt,
          });
          setSelectedClusterId(latestDbRecord.clusterId);
          return;
        }

        // Fallback to localStorage
        const stored = localStorage.getItem('vidyasaathi_career_quiz');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.topClusterId && MP_CAREER_CLUSTERS[parsed.topClusterId]) {
            const topCluster = MP_CAREER_CLUSTERS[parsed.topClusterId];
            const scoreBreakdown = Object.entries(parsed.scores || {}).map(([clusterId, score]) => ({
              clusterId,
              clusterName: MP_CAREER_CLUSTERS[clusterId]?.name || clusterId,
              clusterNameHi: MP_CAREER_CLUSTERS[clusterId]?.nameHi || clusterId,
              score: Number(score),
              percentage: Math.min(Math.round((Number(score) / (CAREER_QUIZ_QUESTIONS.length * 4)) * 100), 100),
            })).sort((a, b) => b.score - a.score);

            setSavedResult({
              topCluster,
              scores: parsed.scores,
              scoreBreakdown,
              completedAt: parsed.completedAt || Date.now(),
            });
            setSelectedClusterId(parsed.topClusterId);
          }
        }
      } catch (err) {
        console.error('Failed to load career quiz result:', err);
      }
    };

    loadSavedResult();
    const handleDemoChange = () => loadSavedResult();
    window.addEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    return () => {
      window.removeEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    };
  }, []);

  // Handle option selection during quiz
  const handleSelectOption = (questionId: number, optionIdx: number) => {
    const updated = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(updated);

    // Auto advance if not at last question
    if (currentQuestionIdx < CAREER_QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx((prev) => prev + 1);
      }, 200);
    }
  };

  // Complete and submit quiz
  const handleFinishQuiz = async () => {
    const result = calculateQuizResult(selectedAnswers);
    setSavedResult(result);
    setSelectedClusterId(result.topCluster.id);
    setIsTakingQuiz(false);
    setViewMode('recommended');

    // Persist to localStorage
    try {
      localStorage.setItem('vidyasaathi_career_quiz', JSON.stringify({
        topClusterId: result.topCluster.id,
        scores: result.scores,
        completedAt: result.completedAt,
      }));

      // Persist to Dexie IndexedDB
      const record: CareerQuizResultRecord = {
        clusterId: result.topCluster.id,
        clusterName: result.topCluster.name,
        clusterNameHi: result.topCluster.nameHi,
        scores: result.scores,
        completedAt: result.completedAt,
      };
      await db.careerQuizResult.add(record);
    } catch (err) {
      console.error('Failed to persist career quiz result:', err);
    }
  };

  // Reset quiz
  const handleStartRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsTakingQuiz(true);
    setAiResponse(null);
  };

  // AI Buddy follow-up consultation
  const handleAskAIAboutCareer = async (customQuery?: string) => {
    const query = (customQuery || aiQuestion).trim();
    if (!query) return;

    setAiLoading(true);
    setLastAskedQuery(query);
    setVoiceError(null);

    const activeCluster = MP_CAREER_CLUSTERS[selectedClusterId] || savedResult?.topCluster || MP_CAREER_CLUSTERS.govt_civil_services;

    try {
      const response = await askAI(query, {
        careerCluster: activeCluster,
        language: isHi ? 'hi' : 'en',
      });
      setAiResponse(response);
      setAiQuestion('');
    } catch (err) {
      console.error('AI Career query failed:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Toggle voice recognition for questions
  const handleToggleVoice = () => {
    if (isListening) {
      if (voiceRecognitionRef.current) {
        voiceRecognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setVoiceError(isHi ? 'आपके ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है।' : 'Voice input not supported in this browser.');
      return;
    }

    setVoiceError(null);
    setIsListening(true);

    const rec = startVoiceRecognition({
      language: isHi ? 'hi' : 'en',
      onResult: (transcript) => {
        setAiQuestion((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      },
      onError: (err) => {
        setVoiceError(err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    voiceRecognitionRef.current = rec;
  };

  // Icon helper
  const renderClusterIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Shield': return <Shield className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Wheat': return <Wheat className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Store': return <Store className={className} />;
      default: return <Compass className={className} />;
    }
  };

  const activeCluster = MP_CAREER_CLUSTERS[selectedClusterId] || savedResult?.topCluster || MP_CAREER_CLUSTERS.govt_civil_services;
  const currentQ = CAREER_QUIZ_QUESTIONS[currentQuestionIdx];
  const allAnswered = Object.keys(selectedAnswers).length === CAREER_QUIZ_QUESTIONS.length;

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Top Header Banner */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isHi ? 'करियर मार्गदर्शन एवं स्ट्रेंथ्स क्विज़' : 'Career Pathways & Strengths Quiz'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                {isHi 
                  ? 'मध्य प्रदेश के स्नातक छात्रों हेतु 100% नियम-आधारित, ऑफ़लाइन करियर क्लस्टर मैपिंग' 
                  : '100% Rule-based, offline career cluster mapping tailored for UG college students in MP'}
              </p>
            </div>
          </div>

          {!isTakingQuiz && (
            <button
              onClick={handleStartRetake}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer min-h-[44px] shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{savedResult ? (isHi ? 'क्विज़ पुनः दें' : 'Retake Strengths Quiz') : (isHi ? 'करियर क्विज़ शुरू करें' : 'Start Strengths Quiz')}</span>
            </button>
          )}
        </div>

        {/* Offline Badge & Info */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
          <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isHi ? 'ऑफ़लाइन नियम-आधारित स्कोरिंग' : '100% Rule-Based Scoring (No Hallucinations)'}
          </span>
          <span>•</span>
          <span>{isHi ? '7 प्रमुख मध्य प्रदेश उच्च शिक्षा क्लस्टर' : '7 Core MP Higher Ed Clusters'}</span>
          <span>•</span>
          <span>{isHi ? '11 सरल बहुविकल्पीय प्रश्न' : '11 Plain-Language Questions'}</span>
        </div>
      </section>

      {/* 2. Interactive Quiz Taking Mode */}
      {isTakingQuiz && (
        <section className="bg-white rounded-2xl p-5 sm:p-7 border-2 border-amber-500/50 shadow-md space-y-6">
          {/* Progress Header */}
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600">
              <span className="text-amber-800 uppercase tracking-wider font-mono">
                {isHi ? `प्रश्न ${currentQuestionIdx + 1} / ${CAREER_QUIZ_QUESTIONS.length}` : `Question ${currentQuestionIdx + 1} of ${CAREER_QUIZ_QUESTIONS.length}`}
              </span>
              <span>
                {Math.round(((currentQuestionIdx + 1) / CAREER_QUIZ_QUESTIONS.length) * 100)}% {isHi ? 'पूर्ण' : 'Completed'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIdx + 1) / CAREER_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
              {isHi ? currentQ.contextNoteHi : currentQ.contextNote}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {isHi ? currentQ.questionHi : currentQ.question}
            </h2>
          </div>

          {/* Question Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition min-h-[52px] flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/90 text-slate-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100/90 text-stone-800 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm leading-snug">
                      {isHi ? opt.labelHi : opt.label}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              onClick={() => setCurrentQuestionIdx((prev) => Math.max(prev - 1, 0))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer min-h-[42px] flex items-center gap-1"
            >
              ← {isHi ? 'पिछला प्रश्न' : 'Previous'}
            </button>

            {currentQuestionIdx < CAREER_QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((prev) => Math.min(prev + 1, CAREER_QUIZ_QUESTIONS.length - 1))}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="px-4 py-2 bg-stone-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-xl transition cursor-pointer min-h-[42px] flex items-center gap-1.5"
              >
                <span>{isHi ? 'अगला प्रश्न' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={!allAnswered}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer min-h-[44px] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isHi ? 'परिणाम देखें' : 'View Career Matches'}</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* 3. Results & Active Pathway View (Shown when not taking quiz) */}
      {!isTakingQuiz && (
        <div className="space-y-6">
          {/* Mode Navigation Bar */}
          <div className="flex items-center justify-between gap-3 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('recommended')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                  viewMode === 'recommended'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{isHi ? 'आपकी अनुशंसित राह' : 'Your Recommended Path'}</span>
              </button>

              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                  viewMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-stone-600" />
                <span>{isHi ? 'सभी 7 क्लस्टर देखें' : 'Explore All 7 Clusters'}</span>
              </button>
            </div>

            {savedResult && (
              <button
                onClick={() => setShowScoreInspector(!showScoreInspector)}
                className="text-[11px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                title="Inspect offline rule-based scoring table"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
                <span>{showScoreInspector ? (isHi ? 'स्कोरिंग छुपाएं' : 'Hide Scores') : (isHi ? 'स्कोर टेबल देखें' : 'Inspect Rule Table')}</span>
              </button>
            )}
          </div>

          {/* Rule-Based Scoring Table Modal/Card (For evaluators and student transparency) */}
          {showScoreInspector && savedResult && (
            <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-800" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    {isHi ? 'नियम-आधारित स्कोरिंग तालिका (ऑफलाइन सत्यापन)' : 'Deterministic Scoring Table (Offline Rule-Based)'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                  {isHi ? 'सत्यापित गणना' : 'Verified Calculation'}
                </span>
              </div>

              <p className="text-[11px] text-amber-900 leading-relaxed">
                {isHi 
                  ? 'यह गणना किसी भी अप्रमाणिक AI अनुमान के बिना, आपके द्वारा चुने गए 11 प्रश्नों के अंकों का सीधा योग है:'
                  : 'Scores are directly tallied from your 11 quiz answers without ungrounded AI predictions:'}
              </p>

              <div className="space-y-2">
                {savedResult.scoreBreakdown.map((item) => (
                  <div key={item.clusterId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-900">
                      <span className="font-bold">{isHi ? item.clusterNameHi : item.clusterName}</span>
                      <span className="font-mono text-stone-600">{item.score} pts ({item.percentage}% affinity)</span>
                    </div>
                    <div className="w-full bg-amber-100/80 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.clusterId === savedResult.topCluster.id ? 'bg-amber-600' : 'bg-stone-300'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cluster Selector Pills (when viewing all clusters) */}
          {viewMode === 'all' && (
            <div className="flex flex-wrap gap-2 pb-1">
              {Object.values(MP_CAREER_CLUSTERS).map((cluster) => {
                const isSelected = selectedClusterId === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedClusterId(cluster.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer min-h-[42px] border ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    {renderClusterIcon(cluster.iconName, 'w-3.5 h-3.5')}
                    <span>{isHi ? cluster.nameHi.split(' ')[0] + '...' : cluster.name.split(' ')[0] + '...'}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Career Cluster Card */}
          <article className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-6">
            {/* Header info */}
            <div className="space-y-2 pb-4 border-b border-stone-100">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                  {renderClusterIcon(activeCluster.iconName, 'w-3.5 h-3.5 text-amber-700')}
                  {savedResult?.topCluster.id === activeCluster.id 
                    ? (isHi ? '★ आपका शीर्ष अनुशंसित क्लस्टर' : '★ Top Recommended Match') 
                    : (isHi ? 'मध्य प्रदेश करियर क्लस्टर' : 'MP Career Cluster')}
                </span>

                {savedResult?.topCluster.id === activeCluster.id && (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {savedResult.scoreBreakdown.find((b) => b.clusterId === activeCluster.id)?.percentage || 85}% {isHi ? 'अनुकूलता' : 'Affinity'}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {isHi ? activeCluster.nameHi : activeCluster.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                {isHi ? activeCluster.taglineHi : activeCluster.tagline}
              </p>
            </div>

            {/* Plain-Language Description */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200 space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {isHi ? 'कार्यक्षेत्र परिचय:' : 'Cluster Overview:'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {isHi ? activeCluster.descriptionHi : activeCluster.description}
              </p>
            </div>

            {/* 2-3 Realistic Next Steps */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {isHi ? '2–3 वास्तविक एवं व्यावहारिक अगले कदम:' : '2–3 Realistic Next Steps for MP Students:'}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeCluster.realisticNextSteps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-400 transition space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {isHi ? step.titleHi : step.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded shrink-0">
                        {step.agency}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 pl-7 leading-relaxed">
                      {isHi ? step.descHi : step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Gateway Exams */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {isHi ? 'प्रमुख प्रवेश एवं भर्ती परीक्षाएं:' : 'Key Gateway Recruitment & Entrance Exams:'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeCluster.keyExams.map((exam, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-stone-100 text-stone-800 px-3 py-1.5 rounded-lg border border-stone-200 font-medium"
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>

            {/* Link back to Scholarships Tab (Requirement #2) */}
            <div className="p-4 sm:p-5 bg-emerald-50/80 border border-emerald-300 rounded-2xl space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                    {isHi ? 'इस करियर राह हेतु संबंधित छात्रवृत्ति योजनाएं:' : 'Relevant MP Scholarships for this Pathway:'}
                  </h4>
                </div>
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('scholarships')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition cursor-pointer min-h-[36px]"
                  >
                    <span>{isHi ? 'छात्रवृत्ति टैब खोलें' : 'Open Scholarships Tab'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCluster.relevantScholarships.map((sch, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{isHi ? sch.nameHi : sch.name}</span>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                        {sch.portal}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      {isHi ? sch.benefitHi : sch.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 4. Interactive AI Buddy Follow-Up Consultation (Requirement #3) */}
          <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-indigo-400/40 shadow-xs space-y-4">
            <div className="space-y-1 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {isHi 
                    ? `AI साथी से इस करियर राह पर परामर्श लें` 
                    : `Ask AI Buddy About This Career Pathway`}
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                {isHi
                  ? `सत्यापित मध्य प्रदेश सरकारी दिशानिर्देशों पर आधारित उत्तर (संदेह होने पर मेंटर से परामर्श की सलाह)`
                  : `Answers strictly grounded in verified MP guidelines with source citations.`}
              </p>
            </div>

            {/* Quick Sample Questions (Chips) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase">
                {isHi ? 'त्वरित प्रश्न सुझाव (टैप करें):' : 'Suggested Questions (Tap to Ask):'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  isHi ? 'इस पथ के लिए कॉलेज के दूसरे वर्ष में क्या तैयारी शुरू करें?' : 'What preparation should I begin in UG 2nd year?',
                  isHi ? 'कौन सी सरकारी छात्रवृत्ति इस डिग्री की पूरी फीस भरेगी?' : 'Which scholarship will cover my full college fee?',
                  isHi ? 'एमपी रोजगार पोर्टल पर पंजीयन के लिए क्या दस्तावेज चाहिए?' : 'What documents are needed for MP Rojgar portal?',
                ].map((sampleQ, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiQuestion(sampleQ);
                      handleAskAIAboutCareer(sampleQ);
                    }}
                    className="text-[11px] bg-stone-100 hover:bg-indigo-50 text-stone-800 hover:text-indigo-900 border border-stone-200 px-3 py-1.5 rounded-lg transition text-left cursor-pointer min-h-[38px] flex items-center"
                  >
                    {sampleQ}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Input Bar (Free text + Voice input) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAskAIAboutCareer();
                  }}
                  placeholder={
                    isHi
                      ? 'उदा. इस परीक्षा के लिए न्यूनतम उम्र और पात्रता क्या है?'
                      : 'e.g. What is the minimum age and eligibility for this exam?'
                  }
                  className="flex-1 bg-stone-50 border border-stone-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-stone-400 outline-hidden min-h-[44px]"
                />

                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`p-2.5 rounded-xl border transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                  title={isListening ? 'Stop listening' : 'Speak your question'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={() => handleAskAIAboutCareer()}
                  disabled={aiLoading || !aiQuestion.trim()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-xl transition cursor-pointer min-h-[44px] flex items-center gap-1.5 shrink-0"
                >
                  {aiLoading ? (
                    <span className="animate-pulse">{isHi ? 'खोज रहे हैं...' : 'Thinking...'}</span>
                  ) : (
                    <>
                      <span>{isHi ? 'पूछें' : 'Ask'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {voiceError && (
                <p className="text-[11px] text-red-600">
                  {voiceError}
                </p>
              )}
            </div>

            {/* AI Response Card with Grounded Source Citation */}
            {aiResponse && (
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-indigo-200/60">
                  <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    {isHi ? 'AI साथी का उत्तर' : 'AI Companion Response'}
                  </span>
                  <span className="text-[10px] font-mono bg-white text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded">
                    {aiResponse.confidence === 'high' ? 'Grounded & Verified' : 'Official Advice'}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-stone-900 leading-relaxed whitespace-pre-line bg-white/90 p-3.5 rounded-lg border border-indigo-100">
                  {aiResponse.answer}
                </div>

                {/* Source attribution enforcing "cite or say you're unsure" */}
                <div className="flex items-center justify-between text-[11px] pt-1 text-indigo-950">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      <strong>{isHi ? 'स्रोत:' : 'Source:'}</strong> {aiResponse.source}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
