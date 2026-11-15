import { useState } from 'react';
import { Lock, Volume2, VolumeX, Cloud, CloudCheck, Loader2, LogOut, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useAuth } from '../context/AuthContext';

export type NavigationTab = 'responsibility-missions' | 'home-missions' | 'new-adventure' | 'activities' | 'stars';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenParentGate: () => void;
  onOpenAuthModal: () => void;
  avatarId?: string;
  childName?: string;
  totalStars?: number;
}

export function Header({
  activeTab,
  setActiveTab,
  onOpenParentGate,
  onOpenAuthModal,
  childName = 'תמר',
  totalStars = 14,
}: HeaderProps) {
  const [soundOn, setSoundOn] = useState(true);
  const { user, syncStatus, logout } = useAuth();

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    sounds.enabled = nextState;
    if (nextState) sounds.playPop();
  };

  const handleTabClick = (tab: NavigationTab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  return (
    <header className="w-full pt-3 px-3 md:px-6 max-w-7xl mx-auto z-30 select-none">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-md border border-white/80 py-2 px-3 md:px-5 flex items-center justify-between transition-all gap-2">
        {/* Right side in RTL: Brand & Logo */}
        <div 
          onClick={() => handleTabClick('responsibility-missions')}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-xl">
            🧸
          </div>
          <div className="flex flex-col text-right">
            <span className="font-black text-base md:text-lg text-slate-800 leading-tight">
              אני כבר גדול!
            </span>
            <span className="text-[11px] font-bold text-amber-700 leading-tight">
              מרחב ההעצמה שלי
            </span>
          </div>
        </div>

        {/* Center: Navigation Pills (from Stitch design) */}
        <nav className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner gap-1">
          <button
            onClick={() => handleTabClick('responsibility-missions')}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'responsibility-missions'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            עולם האחריות 🎒
          </button>

          <button
            onClick={() => handleTabClick('home-missions')}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-black transition-all cursor-pointer ${
              activeTab === 'home-missions'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            עולם הבית 🏠
          </button>

          <button
            onClick={() => handleTabClick('new-adventure')}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'new-adventure'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            הרפתקה חדשה
          </button>

          <button
            onClick={() => handleTabClick('activities')}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'activities'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            לוח הפעילויות
          </button>

          <button
            onClick={() => handleTabClick('stars')}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'stars'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
            }`}
          >
            הכוכבים שלי ⭐
          </button>
        </nav>

        {/* Left side in RTL: Profile, Stars Pill, Sound, Parent Zone, Cloud */}
        <div className="flex items-center gap-2">
          {/* Child Profile & Stars Pill (From Stitch Design) */}
          <div className="flex items-center gap-2 bg-sky-50/90 border border-sky-200/80 px-2.5 py-1 rounded-full shadow-sm">
            {/* User Avatar Circle */}
            <div 
              title={childName}
              className="w-7 h-7 rounded-full bg-amber-400 border border-amber-300 flex items-center justify-center text-amber-950 font-black text-xs shadow-sm cursor-pointer"
            >
              {childName.slice(0, 1) || 'ת'}
            </div>
            <span className="hidden sm:inline text-xs font-black text-slate-800">
              {childName} האלופ/ה
            </span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full text-[11px] font-black text-sky-900 shadow-inner border border-sky-100">
              <span>{totalStars}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            </div>
          </div>

          {/* Cloud Auth Status */}
          {user ? (
            <div className="hidden sm:flex items-center gap-1 bg-emerald-50 border border-emerald-200 py-1 px-2.5 rounded-full text-xs font-bold text-emerald-800">
              {syncStatus === 'syncing' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              ) : (
                <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span className="max-w-[80px] truncate" title={user.email || 'משתמש מחובר'}>
                {user.displayName || user.email?.split('@')[0]}
              </span>
              <button
                onClick={async () => {
                  sounds.playPop();
                  await logout();
                }}
                title="התנתק מהחשבון"
                className="hover:text-rose-600 transition p-0.5 rounded cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playPop();
                onOpenAuthModal();
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-full text-xs font-bold transition cursor-pointer border border-sky-200"
              title="שמירה וסנכרון ענן Firebase"
            >
              <Cloud className="w-3.5 h-3.5 text-sky-600" />
              <span>גיבוי ענן</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'השתק צלילים' : 'הפעל צלילים'}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer shadow-sm"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Parent Zone Button */}
          <button
            onClick={() => {
              sounds.playPop();
              onOpenParentGate();
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold transition cursor-pointer border border-slate-200 shadow-sm"
          >
            <Lock className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">פינת הורים</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="flex lg:hidden justify-center mt-2 overflow-x-auto pb-1">
        <div className="flex items-center bg-white/95 backdrop-blur-md p-1 rounded-full shadow border border-white/80 gap-1">
          <button
            onClick={() => handleTabClick('responsibility-missions')}
            className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
              activeTab === 'responsibility-missions'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            עולם האחריות 🎒
          </button>
          <button
            onClick={() => handleTabClick('home-missions')}
            className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
              activeTab === 'home-missions'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            עולם הבית 🏠
          </button>
          <button
            onClick={() => handleTabClick('new-adventure')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'new-adventure'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            הרפתקה
          </button>
          <button
            onClick={() => handleTabClick('activities')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'activities'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            פעילויות
          </button>
          <button
            onClick={() => handleTabClick('stars')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'stars'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            כוכבים ⭐
          </button>
        </div>
      </div>
    </header>
  );
}
