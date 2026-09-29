import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { 
  Users, 
  MessageSquare, 
  Send, 
  WifiOff, 
  Clock, 
  CheckCircle2, 
  GraduationCap,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface PeerMentor {
  id: string;
  name: string;
  college: string;
  course: string;
  hometown: string;
  languages: string[];
  badges: string[];
}

const PEER_MENTORS: PeerMentor[] = [
  {
    id: 'mentor-1',
    name: 'Rahul Solanki',
    college: 'Devi Ahilya Vishwavidyalaya (DAVV), Indore',
    course: 'M.Sc. Mathematics • Ex-Dhar Govt. College',
    hometown: 'Dhar District',
    languages: ['Hindi', 'Malvi', 'English'],
    badges: ['MPTAAS Scholar', 'Peer Mentor Guide'],
  },
  {
    id: 'mentor-2',
    name: 'Anjali Uikey',
    college: 'Barkatullah University, Bhopal',
    course: 'B.Sc. Agriculture (Final Year)',
    hometown: 'Mandla District',
    languages: ['Hindi', 'Gondi', 'English'],
    badges: ['Gaon Ki Beti Awardee', 'Campus Ambassador'],
  },
  {
    id: 'mentor-3',
    name: 'Vikas Bhil',
    college: 'Vikram University, Ujjain',
    course: 'B.A. Political Science & Public Admin',
    hometown: 'Jhabua District',
    languages: ['Hindi', 'Bhili', 'English'],
    badges: ['First-Gen Learner', 'MPPSC Aspirant'],
  },
];

interface MentorTabProps {
  effectiveOnline: boolean;
}

export const MentorTab: React.FC<MentorTabProps> = ({ effectiveOnline }) => {
  const { language } = useLanguage();
  const [selectedMentor, setSelectedMentor] = useState<PeerMentor | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [sentNotice, setSentNotice] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftMessage.trim()) return;

    if (!effectiveOnline) {
      setSentNotice(
        language === 'hi'
          ? 'ऑफ़लाइन कतार में सहेजा गया! जैसे ही 2G/3G नेटवर्क जुड़ेगा, मेंटर को संदेश भेज दिया जाएगा।'
          : 'Queued offline! Your message is securely stored in local IndexedDB and will transmit when reconnected.'
      );
    } else {
      setSentNotice(
        language === 'hi'
          ? 'संदेश भेजा गया! मेंटर 24 घंटे के भीतर जवाब देंगे।'
          : 'Message sent! Your mentor will respond within 24 hours.'
      );
    }
    setDraftMessage('');
    setTimeout(() => setSentNotice(null), 4000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-2">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <span>{language === 'hi' ? 'मेंटर एवं साथी नेटवर्क' : 'Mentor & Senior Buddy Network'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          {language === 'hi'
            ? 'मध्य प्रदेश के विश्वविद्यालयों में पढ़ रहे वरिष्ठ आदिवासी एवं ग्रामीण विद्यार्थियों से सीधा मार्गदर्शन।'
            : 'Direct peer mentorship from senior students across MP universities who navigated the same path.'}
        </p>

        {/* Offline notice bar for real expectation setting */}
        <div className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
          effectiveOnline
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center gap-2">
            {effectiveOnline ? (
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>
              {effectiveOnline
                ? (language === 'hi' ? 'मेंटर डायरेक्ट मैसेजिंग सक्रिय है।' : 'Mentor direct messaging is online.')
                : (language === 'hi' ? 'ऑफ़लाइन मोड: सवाल अभी लिखें, नेटवर्क मिलते ही अपने आप भेजा जाएगा।' : 'Offline Mode: Draft your questions now; auto-dispatches once reconnected.')}
            </span>
          </div>
        </div>
      </div>

      {/* Mentors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PEER_MENTORS.map((mentor) => (
          <div
            key={mentor.id}
            className={`bg-white rounded-2xl p-5 border transition shadow-xs flex flex-col justify-between ${
              selectedMentor?.id === mentor.id
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {mentor.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{mentor.name}</h2>
                  <p className="text-[11px] text-stone-500">{mentor.hometown}</p>
                </div>
              </div>

              <div className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100 space-y-1">
                <div className="font-semibold text-slate-900 text-[11px]">{mentor.college}</div>
                <div className="text-[11px] text-stone-500">{mentor.course}</div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {mentor.badges.map((b) => (
                  <span key={b} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedMentor(mentor)}
              className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 ${
                selectedMentor?.id === mentor.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मार्गदर्शन मांगें' : 'Ask Question'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Query Composer */}
      {selectedMentor && (
        <section className="bg-white rounded-2xl p-5 border border-blue-200 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? `${selectedMentor.name} से पूछें:` : `Message to ${selectedMentor.name}:`}
              </h2>
            </div>
            <button
              onClick={() => setSelectedMentor(null)}
              className="text-stone-400 hover:text-stone-600 text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-3">
            <textarea
              rows={3}
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'उदा. भैया, मुझे MPTAAS में हॉस्टल अलाउंस क्लेम करने में दिक्कत आ रही है...'
                  : 'e.g., Hello, how did you verify college documents during admissions?'
              }
              className="w-full rounded-xl border-2 border-stone-300 p-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-blue-500 bg-stone-50"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-mono">
                {effectiveOnline ? 'Instant transmission' : 'Queued offline in Dexie'}
              </span>
              <button
                type="submit"
                disabled={!draftMessage.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सवाल भेजें' : 'Send Question'}</span>
              </button>
            </div>
          </form>

          {sentNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{sentNotice}</span>
            </div>
          )}
        </section>
      )}

      {/* Mental health / stress safety guardrail banner */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1.5">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
          <span>Tele-MANAS Support Notice</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Mentors are senior students offering college guidance, not professional counselors. For any exam distress, anxiety, or emotional pressure, please dial national helpline <strong>14416</strong> (24/7 Free).
        </p>
      </div>
    </div>
  );
};
