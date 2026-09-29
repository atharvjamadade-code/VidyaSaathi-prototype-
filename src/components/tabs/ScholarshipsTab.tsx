import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';
import { db, ScholarshipRecord } from '../../db';
import { INITIAL_SCHOLARSHIPS } from '../../data/seedData';
import { 
  Award, 
  Bookmark, 
  ExternalLink, 
  Filter, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const ScholarshipsTab: React.FC = () => {
  const { language } = useLanguage();
  const [scholarships, setScholarships] = useState<ScholarshipRecord[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const loadScholarships = async () => {
    try {
      let data = await db.scholarships.toArray();
      if (data.length === 0) {
        await db.scholarships.bulkAdd(INITIAL_SCHOLARSHIPS);
        data = await db.scholarships.toArray();
      }
      setScholarships(data);
    } catch (err) {
      console.error('Failed to load scholarships:', err);
      setScholarships(INITIAL_SCHOLARSHIPS);
    }
  };

  useEffect(() => {
    loadScholarships();
    const handleDemoChange = () => loadScholarships();
    window.addEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    return () => {
      window.removeEventListener('vidyasaathi_demo_mode_changed', handleDemoChange);
    };
  }, []);

  const toggleBookmark = async (scheme: ScholarshipRecord) => {
    try {
      const updated = { ...scheme, isBookmarked: !scheme.isBookmarked };
      await db.scholarships.put(updated);
      await loadScholarships();
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const filtered = scholarships.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'BOOKMARKED') return item.isBookmarked;
    return item.targetCategory.some((c) => c.includes(selectedFilter));
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <span>{language === 'hi' ? 'मध्य प्रदेश छात्रवृत्ति मार्गदर्शिका' : 'MP Higher Ed Scholarships'}</span>
          </h1>
          <span className="text-[11px] font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
            Offline Directory
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-600">
          {language === 'hi'
            ? 'MPTAAS, मेधावी विद्यार्थी (MMVY), एवं राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) की प्रामाणिक जानकारी।'
            : 'Pre-cached eligibility and portal links for MP domicile, tribal, and rural undergraduate students.'}
        </p>

        {/* Filter Pills with min 48px touch friendly targets */}
        <div className="pt-2 flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: language === 'hi' ? 'सभी योजनाएं' : 'All Schemes' },
            { id: 'ST', label: 'ST (अनुसूचित जनजाति)' },
            { id: 'SC', label: 'SC (अनुसूचित जाति)' },
            { id: 'OBC', label: 'OBC (अन्य पिछड़ा वर्ग)' },
            { id: 'BOOKMARKED', label: language === 'hi' ? '★ सहेजी गई' : '★ Saved' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer min-h-[44px] flex items-center ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarship List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.department}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {language === 'hi' ? item.nameHi : item.name}
                </h2>
              </div>

              <button
                onClick={() => toggleBookmark(item)}
                className={`p-2.5 rounded-xl border transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  item.isBookmarked
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-stone-50 text-stone-400 hover:text-stone-600 border-stone-200'
                }`}
                title="Bookmark for offline reference"
              >
                <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md font-medium">
                Category: <strong>{item.targetCategory.join(', ')}</strong>
              </span>
              <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                Deadline: <strong>{item.deadline}</strong>
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1">
              <div className="font-semibold text-stone-800">
                {language === 'hi' ? 'पात्रता जिले:' : 'Eligible Districts:'}
              </div>
              <p className="text-[11px] text-stone-600">
                {item.eligibleDistricts.join(', ')}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'hi' ? 'नियम ऑफ़लाइन सहेजे हैं' : 'Rules saved locally'}
              </span>

              <a
                href={item.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-amber-700 hover:underline min-h-[44px]"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
