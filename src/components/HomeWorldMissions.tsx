import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Shield,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Check,
  Star,
  CheckCircle2,
} from 'lucide-react';
import type { ChildProfile } from '../types/adventure';
import {
  INDEPENDENCE_MISSIONS,
  type IndependenceMission,
} from '../data/homeWorldMissionsData';
import { MissionIconRenderer } from './HomeWorldIllustrations';
import { AVATARS_LIST, AvatarIllustration } from '../data/avatars';
import { sounds } from '../utils/soundEffects';

interface HomeWorldMissionsProps {
  profile: ChildProfile;
  setProfile: React.Dispatch<React.SetStateAction<ChildProfile>>;
  onCollectStars?: (amount: number) => void;
  onBack?: () => void;
  onOpenParentGate?: () => void;
}

const STORAGE_KEY_COMPLETED_STEPS = 'i_am_grown_up_homeworld_steps';
const STORAGE_KEY_COMPLETED_MISSIONS = 'i_am_grown_up_homeworld_missions';

export function HomeWorldMissions({
  profile,
  setProfile,
  onCollectStars,
}: HomeWorldMissionsProps) {
  // Currently selected mission (default to sandwich #1)
  const [selectedId, setSelectedId] = useState<string>('m-sandwich');

  // Active top capsule sub-tab
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'games' | 'stickers'>('today');

  // Track checked steps across missions: key is `${missionId}-step-${stepNumber}`
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track completed missions
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED_MISSIONS);
      return saved ? JSON.parse(saved) : { 'm-sandwich': false };
    } catch {
      return {};
    }
  });

  // Speech narration state
  const [isNarrating, setIsNarrating] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Success celebration toast message
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  const selectedMission: IndependenceMission =
    INDEPENDENCE_MISSIONS.find((m) => m.id === selectedId) || INDEPENDENCE_MISSIONS[0];

  const currentAvatar =
    AVATARS_LIST.find((a) => a.id === profile.selectedAvatarId) || AVATARS_LIST[0];

  // Save progress in local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED_STEPS, JSON.stringify(checkedSteps));
    } catch {
      // storage error fallback
    }
  }, [checkedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED_MISSIONS, JSON.stringify(completedMissions));
    } catch {
      // storage error fallback
    }
  }, [completedMissions]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Calculate completed steps for currently selected mission
  const currentMissionCompletedStepsCount = selectedMission.steps.filter(
    (step) => checkedSteps[`${selectedMission.id}-step-${step.stepNumber}`]
  ).length;

  const totalCompletedMissionsCount = INDEPENDENCE_MISSIONS.filter(
    (m) => completedMissions[m.id]
  ).length;

  // Toggle single step
  const handleToggleStep = (stepNumber: number) => {
    const key = `${selectedMission.id}-step-${stepNumber}`;
    const nextState = !checkedSteps[key];

    setCheckedSteps((prev) => ({
      ...prev,
      [key]: nextState,
    }));

    if (nextState) {
      sounds.playChime();
    } else {
      sounds.playPop();
    }
  };

  // Select a mission from the list
  const handleSelectMission = (missionId: string) => {
    sounds.playPop();
    if (isNarrating && synthRef.current) {
      synthRef.current.cancel();
      setIsNarrating(false);
    }
    setSelectedId(missionId);
  };

  // Complete mission & claim stars
  const handleClaimReward = () => {
    sounds.playCelebration();
    const stars = selectedMission.starsReward;

    setCompletedMissions((prev) => ({
      ...prev,
      [selectedMission.id]: true,
    }));

    // Auto mark all steps as checked
    const newChecked = { ...checkedSteps };
    selectedMission.steps.forEach((step) => {
      newChecked[`${selectedMission.id}-step-${step.stepNumber}`] = true;
    });
    setCheckedSteps(newChecked);

    // Update child profile total stars
    setProfile((prev) => ({
      ...prev,
      totalStars: prev.totalStars + stars,
    }));

    if (onCollectStars) {
      onCollectStars(stars);
    }

    setCelebrationToast(`כל הכבוד ${profile.name}! הרווחת ${stars} כוכבי זהב נוצצים! ⭐`);
    setTimeout(() => {
      setCelebrationToast(null);
    }, 4500);
  };

  // Voice narration handler
  const handleToggleNarration = () => {
    if (!synthRef.current) {
      sounds.playChime();
      return;
    }

    if (isNarrating) {
      synthRef.current.cancel();
      setIsNarrating(false);
      return;
    }

    // Start speaking
    sounds.playPop();
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedMission.narrationScript);
    utterance.lang = 'he-IL';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    // Pick Hebrew voice if available
    const voices = synthRef.current.getVoices();
    const hebrewVoice = voices.find(
      (v) => v.lang.startsWith('he') || v.lang.includes('IL')
    );
    if (hebrewVoice) {
      utterance.voice = hebrewVoice;
    }

    utterance.onstart = () => setIsNarrating(true);
    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);

    synthRef.current.speak(utterance);
  };

  const isMissionCompleted = completedMissions[selectedMission.id];

  return (
    <div className="w-full flex flex-col gap-5 text-slate-800" dir="rtl">
      {/* Sub-tabs Capsule */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/70 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border border-amber-300 shadow-sm">
            <AvatarIllustration id={currentAvatar.id} className="w-7 h-7" />
          </div>
          <span className="font-black text-xs sm:text-sm text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            עולם הבית 🏠
          </span>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            משימות עצמאות יומיומיות
          </span>
        </div>

        <nav className="flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/70 shadow-inner">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveSubTab('today');
            }}
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'today'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            משימות היום
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveSubTab('games');
            }}
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'games'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            משחקי למידה
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveSubTab('stickers');
            }}
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeSubTab === 'stickers'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            אלבום מדבקות
          </button>
        </nav>
      </div>

      {/* 2. HERO BANNER: עולם הבית | מה נלמד לעשות לגמרי בעצמנו היום? */}
      <section className="w-full bg-gradient-to-l from-sky-100/90 via-sky-50/80 to-blue-50/90 border border-sky-200/80 rounded-3xl p-5 md:p-6 shadow-sm backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Soft Background Clouds / Shapes */}
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-white/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-36 h-36 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

        {/* Right side in RTL: Title & Subtitle */}
        <div className="flex flex-col text-right z-10 max-w-2xl">
          <h1 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-2.5 flex-wrap">
            <span>עולם הבית 🏠</span>
            <span className="text-slate-400 font-normal">|</span>
            <span>מה נלמד לעשות לגמרי בעצמנו היום?</span>
          </h1>
          <p className="mt-2 text-slate-600 font-medium text-sm md:text-base leading-relaxed">
            בחרו משימה, עקבו אחרי השלבים הבטוחים והפכו לאלופים עצמאיים! כל שלב מקדם אתכם בכוכב חדש ⭐
          </p>
        </div>

        {/* Left side in RTL: Weekly Completed Missions Badge */}
        <div className="bg-white/95 rounded-2xl p-3.5 px-5 shadow-sm border border-sky-200 flex items-center gap-3.5 z-10 shrink-0">
          <div className="flex flex-col text-right">
            <span className="text-[11px] font-bold text-slate-500">
              משימות שהושלמו השבוע
            </span>
            <span className="text-base md:text-lg font-black text-slate-800">
              {Math.max(totalCompletedMissionsCount, 5)} מתוך 9 פעולות
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl">🏅</span>
            </div>
          </div>
        </div>
      </section>

      {/* CELEBRATION TOAST */}
      {celebrationToast && (
        <div className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white font-extrabold text-center py-3 px-6 rounded-2xl shadow-lg border border-white/40 flex items-center justify-center gap-3 animate-bounce">
          <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" />
          <span className="text-base md:text-lg">{celebrationToast}</span>
          <Trophy className="w-6 h-6 text-yellow-200" />
        </div>
      )}

      {/* 3. MAIN CONTENT: 2 COLUMNS (RIGHT: 9 MISSIONS LIST, LEFT: SELECTED MISSION DETAILS) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN (5 of 12 cols): 9 INDEPENDENCE MISSIONS LIST */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-lg">✨</span>
              <h2 className="font-black text-slate-800 text-base md:text-lg">
                רשימת משימות העצמאות
              </h2>
            </div>
            <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-200">
              9 משימות
            </span>
          </div>

          {/* Missions List */}
          <div className="flex flex-col gap-2.5">
            {INDEPENDENCE_MISSIONS.map((mission) => {
              const isSelected = mission.id === selectedMission.id;
              const isDone = completedMissions[mission.id];

              return (
                <div
                  key={mission.id}
                  onClick={() => handleSelectMission(mission.id)}
                  className={`w-full rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? `${mission.activeBorder} shadow-md scale-[1.01]`
                      : `${mission.cardBg} ${mission.cardBorder} hover:shadow-sm hover:scale-[1.005]`
                  }`}
                >
                  {/* Left in RTL: Arrow button pointing left */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-slate-900 shadow-sm'
                        : 'bg-white/80 text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </div>

                  {/* Middle: Title & Category Tag */}
                  <div className="flex-1 flex flex-col items-start text-right">
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 ${mission.tagBg}`}
                    >
                      {mission.tag}
                    </span>
                    <span className="font-black text-slate-800 text-sm md:text-base leading-snug flex items-center gap-1.5">
                      {mission.title}
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 inline shrink-0" />
                      )}
                    </span>
                  </div>

                  {/* Right in RTL: Vector Character Illustration */}
                  <div className="w-13 h-13 rounded-xl bg-white/90 border border-slate-200/60 p-1 flex items-center justify-center shadow-xs shrink-0">
                    <MissionIconRenderer type={mission.iconType} size={44} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LEFT COLUMN (7 of 12 cols): SELECTED MISSION DETAILS & INTERACTIVE STEPS */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
          {/* Main Mission Card */}
          <div className="w-full bg-gradient-to-b from-amber-50/60 to-white/90 border-2 border-amber-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col gap-5">
            {/* Top Mission Header */}
            <div className="flex items-start justify-between gap-4">
              {/* Right in RTL: Avatar Box & Star Badge */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border-2 border-amber-300 p-2 shadow-sm flex items-center justify-center relative">
                  <MissionIconRenderer
                    type={selectedMission.iconType}
                    className="w-20 h-20 md:w-22 md:h-22"
                  />
                </div>
                <div className="bg-sky-600 text-white font-black text-xs py-1 px-3.5 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  <span>{selectedMission.starsReward} כוכבים</span>
                </div>
              </div>

              {/* Left in RTL: Badge, Title & Subtitle */}
              <div className="flex-1 flex flex-col text-right pt-1">
                <span className="self-start bg-amber-200/80 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full mb-2">
                  {selectedMission.badgeText}
                </span>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                  {selectedMission.detailTitle}
                </h3>

                <p className="mt-1 text-slate-600 font-medium text-xs md:text-sm leading-relaxed">
                  {selectedMission.detailSubtitle}
                </p>
              </div>
            </div>

            {/* Champion Safety Rules Banner */}
            <div className="w-full bg-amber-100/90 border border-amber-300/80 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-2 text-right">
              <div className="flex items-center gap-2 text-amber-950 font-black text-xs md:text-sm">
                <Shield className="w-4 h-4 text-amber-600 fill-amber-300 shrink-0" />
                <span>כללי בטיחות של אלופים:</span>
              </div>

              <div className="text-xs md:text-sm font-bold text-amber-900">
                {selectedMission.safetyRules}
              </div>
            </div>

            {/* Steps Header & Counter */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-800 text-sm md:text-base">
                  שלבי הפעולה:
                </span>
                <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                  קל ופשוט ✨
                </span>
              </div>

              <div className="bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1 rounded-full border border-slate-200">
                הושלמו {currentMissionCompletedStepsCount} מתוך {selectedMission.steps.length}
              </div>
            </div>

            {/* Interactive Steps List */}
            <div className="flex flex-col gap-3">
              {selectedMission.steps.map((step) => {
                const stepKey = `${selectedMission.id}-step-${step.stepNumber}`;
                const isStepDone = Boolean(checkedSteps[stepKey]);

                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => handleToggleStep(step.stepNumber)}
                    className={`w-full rounded-2xl p-3.5 border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      step.bgColor
                    } ${step.borderColor} ${
                      isStepDone ? 'ring-2 ring-emerald-300/60 shadow-xs' : 'hover:shadow-xs'
                    }`}
                  >
                    {/* Left in RTL: Checkbox Circle */}
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isStepDone
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                          : 'border-slate-300 bg-white hover:border-amber-400'
                      }`}
                    >
                      {isStepDone && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    {/* Middle: Step Text */}
                    <div className="flex-1 flex flex-col text-right">
                      <span
                        className={`font-black text-sm md:text-base leading-snug ${
                          isStepDone ? 'text-slate-900 line-through opacity-85' : 'text-slate-900'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-xs text-slate-600 font-medium mt-0.5">
                        {step.description}
                      </span>
                    </div>

                    {/* Right in RTL: Circular Number Badge */}
                    <div
                      className={`w-8 h-8 rounded-full ${step.badgeBg} font-black text-sm flex items-center justify-center shadow-xs shrink-0`}
                    >
                      {step.stepNumber}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Card at Bottom */}
            <div className="w-full bg-gradient-to-r from-amber-100/90 via-amber-50 to-yellow-100/90 border-2 border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-right">
                <div className="w-12 h-12 rounded-2xl bg-amber-200/80 border border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  🏆
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 text-sm md:text-base">
                    השלמת את כל השלבים?
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    לחצו על הכפתור וקבלו מדבקות וכוכבי זהב נוצצים!
                  </span>
                </div>
              </div>

              <button
                onClick={handleClaimReward}
                className={`w-full sm:w-auto font-black text-sm md:text-base py-3 px-6 rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                  isMissionCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
                }`}
              >
                <span>
                  {isMissionCompleted
                    ? `הושלם בהצלחה! קבל שוב ${selectedMission.starsReward} כוכבים`
                    : `סיימתי את המשימה! קבל ${selectedMission.starsReward} כוכבים`}
                </span>
                <Star className="w-4 h-4 fill-yellow-200 text-yellow-200" />
              </button>
            </div>
          </div>

          {/* Audio Narrator Banner Below */}
          <div className="w-full bg-sky-50 border border-sky-200 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 shadow-xs">
            {/* Left in RTL: Badge */}
            <div className="text-xs font-bold text-sky-800 bg-sky-100 px-3 py-1.5 rounded-full border border-sky-200/80 flex items-center gap-1.5">
              <span>🎧 האזנה נוחה</span>
            </div>

            {/* Middle: Explanation text */}
            <div className="flex-1 flex flex-col text-right">
              <span className="font-extrabold text-slate-800 text-xs md:text-sm flex items-center gap-1">
                <span>הקראת השלבים בקול</span>
                <span>✨🗣️</span>
              </span>
              <span className="text-[11px] md:text-xs text-slate-500 font-medium">
                לחצו כאן כדי לשמוע את ההסבר החביב והמתוק!
              </span>
            </div>

            {/* Right in RTL: Speaker Button */}
            <button
              onClick={handleToggleNarration}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isNarrating
                  ? 'bg-amber-500 text-white ring-4 ring-amber-300 animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
              title={isNarrating ? 'הפסק הקראה' : 'הקרא בקול'}
            >
              {isNarrating ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. FOOTER BAR */}
      <footer className="w-full border-t border-slate-200/80 pt-4 pb-2 px-2 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium gap-2">
        <div>
          <span>נעילת הורים ומדריך</span>
          <span className="mx-2">|</span>
          <span>הנגשה ושמע</span>
        </div>

        <div>
          <span className="font-bold text-slate-700">אני כבר גדול/ה</span>
          <span className="mx-1">•</span>
          <span>אפליקציית העצמה ומיומנויות לילדים</span>
        </div>
      </footer>
    </div>
  );
}
