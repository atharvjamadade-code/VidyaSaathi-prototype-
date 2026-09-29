import React from 'react';
import { useLanguage } from '../i18n';
import { 
  Home, 
  BookOpen, 
  Award, 
  Users, 
  Compass, 
  UserCircle 
} from 'lucide-react';

export type AppTab = 'home' | 'learn' | 'scholarships' | 'mentor' | 'career' | 'profile';

interface BottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const tabs: Array<{
    id: AppTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'learn', label: t.navLearn, icon: BookOpen },
    { id: 'scholarships', label: t.navScholarships, icon: Award },
    { id: 'mentor', label: t.navMentor, icon: Users },
    { id: 'career', label: t.navCareer, icon: Compass },
    { id: 'profile', label: t.navProfile, icon: UserCircle },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Primary Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900 border-t-2 border-stone-800 text-stone-300 shadow-2xl safe-area-inset-bottom"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around px-1 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={isActive}
              className={`flex-1 flex flex-col items-center justify-center min-h-[54px] py-1 px-0.5 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'text-amber-400 font-bold bg-stone-800/80'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-1 leading-tight tracking-tight truncate max-w-full ${
                isActive ? 'font-bold text-amber-400' : 'font-normal'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
