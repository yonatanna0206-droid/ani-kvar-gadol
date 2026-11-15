import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Check,
  Star,
  CheckCircle2,
  ListTodo,
  BookOpen,
  Zap,
} from 'lucide-react';
import type { ChildProfile } from '../types/adventure';
import {
  RESPONSIBILITY_MISSIONS,
  type ResponsibilityMission,
} from '../data/responsibilityMissionsData';
import {
  ResponsibilityIconRenderer,
  HeroAlarmClockIllustration,
  HeroBackpackIllustration,
  TimetableWidget,
} from './ResponsibilityIllustrations';
import { sounds } from '../utils/soundEffects';

interface ResponsibilityWorldMissionsProps {
  profile: ChildProfile;
  setProfile: React.Dispatch<React.SetStateAction<ChildProfile>>;
  onCollectStars?: (amount: number) => void;
  onBack?: () => void;
  onOpenParentGate?: () => void;
}

const STORAGE_KEY_RESPONSIBILITY_STEPS = 'i_am_grown_up_responsibility_steps';
const STORAGE_KEY_RESPONSIBILITY_MISSIONS = 'i_am_grown_up_responsibility_missions';

export function ResponsibilityWorldMissions({
  profile,
  setProfile,
  onCollectStars,
}: ResponsibilityWorldMissionsProps) {
  // Currently selected mission (default to mission 1: schedule)
  const [selectedId, setSelectedId] = useState<string>('m-schedule');

  // Track checked steps across missions: key is `${missionId}-step-${stepNumber}`
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESPONSIBILITY_STEPS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track completed missions
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESPONSIBILITY_MISSIONS);
      return saved ? JSON.parse(saved) : { 'm-schedule': false, 'm-clock': true, 'm-bookmark': true, 'm-room': true };
    } catch {
      return { 'm-schedule': false, 'm-clock': true, 'm-bookmark': true, 'm-room': true };
    }
  });

  // Speech narration state
  const [isNarrating, setIsNarrating] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Success celebration toast message
  const [celebrationToast, setCelebrationToast] = useState<string | null>(null);

  const selectedMission: ResponsibilityMission =
    RESPONSIBILITY_MISSIONS.find((m) => m.id === selectedId) || RESPONSIBILITY_MISSIONS[0];

  // Persist progress in local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESPONSIBILITY_STEPS, JSON.stringify(checkedSteps));
    } catch {
      // storage error fallback
    }
  }, [checkedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESPONSIBILITY_MISSIONS, JSON.stringify(completedMissions));
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
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Calculate completed steps for selected mission
  const currentMissionCompletedStepsCount = selectedMission.steps.filter(
    (s) => checkedSteps[`${selectedMission.id}-step-${s.stepNumber}`]
  ).length;

  // Calculate total completed missions
  const totalCompletedMissionsCount = RESPONSIBILITY_MISSIONS.filter(
    (m) => completedMissions[m.id]
  ).length;

  // Toggle single step check
  const handleToggleStep = (stepNumber: number) => {
    const key = `${selectedMission.id}-step-${stepNumber}`;
    const nextState = !checkedSteps[key];

    sounds.playPop();

    setCheckedSteps((prev) => {
      const updated = { ...prev, [key]: nextState };

      // Check if all 4 steps for this mission are now checked
      const allDone = selectedMission.steps.every(
        (s) => (s.stepNumber === stepNumber ? nextState : updated[`${selectedMission.id}-step-${s.stepNumber}`])
      );

      if (allDone && !completedMissions[selectedMission.id]) {
        // Automatically celebrate mission completion!
        handleCompleteMission(false);
      }

      return updated;
    });
  };

  // Complete entire mission and earn stars
  const handleCompleteMission = (forceAward = true) => {
    if (completedMissions[selectedMission.id] && !forceAward) {
      return;
    }

    sounds.playCelebration();

    // Mark all steps of this mission as true
    const updatedSteps = { ...checkedSteps };
    selectedMission.steps.forEach((s) => {
      updatedSteps[`${selectedMission.id}-step-${s.stepNumber}`] = true;
    });
    setCheckedSteps(updatedSteps);

    // Mark mission as completed
    setCompletedMissions((prev) => ({
      ...prev,
      [selectedMission.id]: true,
    }));

    // Add stars to profile
    const reward = selectedMission.starsReward;
    setProfile((prev) => ({
      ...prev,
      totalStars: prev.totalStars + reward,
    }));

    if (onCollectStars) {
      onCollectStars(reward);
    }

    // Show celebration banner
    setCelebrationToast(`כל הכבוד ל${profile.name}! השלמת את "${selectedMission.title}" וקיבלת 10 כוכבי זהב! ⭐🎉`);
    setTimeout(() => {
      setCelebrationToast(null);
    }, 4500);
  };

  // Voice narration in Hebrew using Web Speech API
  const handleToggleNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('דפדפן זה אינו תומך בהקראה קולית');
      return;
    }

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedMission.narrationScript);
    utterance.lang = 'he-IL';
    utterance.rate = 0.92; // friendly cadence for kids
    utterance.pitch = 1.15; // cheerful warm tone

    utterance.onstart = () => setIsNarrating(true);
    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 select-none">
      {/* Celebration Toast Notice */}
      {celebrationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-full shadow-2xl border-2 border-white flex items-center gap-3">
          <Sparkles className="w-6 h-6 animate-spin text-yellow-200" />
          <span>{celebrationToast}</span>
          <span className="text-xl">🌟</span>
        </div>
      )}

      {/* TOP HERO BANNER: איך הופכים לילדים עצמאיים ואלופים? */}
      <section className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-lg border border-white/80 relative overflow-hidden transition-all">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Right in RTL: Badges, Title, 3D Icons, Subtitle */}
          <div className="flex-1 text-right">
            {/* Upper badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
                <span>עולם האחריות</span>
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-900 border border-sky-300 shadow-sm">
                <span>סופר עצמאי!</span>
                <Zap className="w-3.5 h-3.5 text-sky-600 fill-sky-500" />
              </span>
            </div>

            {/* Main Title with Alarm Clock & Backpack */}
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                איך הופכים לילדים עצמאיים ואלופים?
              </h1>
              <div className="flex items-center gap-1.5 animate-pulse">
                <HeroAlarmClockIllustration className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
                <HeroBackpackIllustration className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600 max-w-2xl">
              בחרו משימת אחריות, עקבו אחרי השלבים הפשוטים וצברו כוכבי זהב נוצצים!
            </p>
          </div>

          {/* Left in RTL: Progress Ring Card */}
          <div className="bg-slate-50/90 border-2 border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-inner min-w-[220px]">
            {/* Progress Circular Badge */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md border-2 border-white">
              <Star className="w-7 h-7 text-amber-900 fill-amber-900" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-slate-500">ההתקדמות שלי</span>
              <span className="text-lg font-black text-slate-800">
                {totalCompletedMissionsCount} מתוך 8
              </span>
              <span className="text-[11px] font-bold text-amber-700">
                משימות הושלמו 🎉
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN (In RTL): 8 Independence Missions List (5 of 12 cols) */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-3">
          {/* Greenish Header Bar */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl py-3 px-4 shadow-md flex items-center justify-between border border-emerald-500/40">
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-emerald-200" />
              <h2 className="font-black text-base sm:text-lg">
                רשימת המשימות לעצמאות
              </h2>
            </div>
            <span className="bg-emerald-950/40 text-emerald-100 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
              8 משימות סה״כ
            </span>
          </div>

          {/* The 8 Mission Cards */}
          <div className="flex flex-col gap-2.5">
            {RESPONSIBILITY_MISSIONS.map((mission) => {
              const isSelected = selectedId === mission.id;
              const isCompleted = completedMissions[mission.id];

              return (
                <div
                  key={mission.id}
                  onClick={() => {
                    sounds.playPop();
                    setSelectedId(mission.id);
                  }}
                  className={`group relative rounded-2xl p-3.5 transition-all duration-200 cursor-pointer border flex items-center justify-between gap-3 shadow-sm ${
                    isSelected
                      ? 'bg-white border-amber-400 ring-4 ring-amber-200/70 shadow-md scale-[1.01]'
                      : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 hover:shadow'
                  }`}
                >
                  {/* Left arrow indicator button */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </div>

                  {/* Middle Text: Title & Tag */}
                  <div className="flex-1 text-right flex flex-col items-end">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full mb-1 inline-flex items-center gap-1 ${mission.tagBg}`}
                    >
                      {mission.tag}
                    </span>
                    <h3
                      className={`text-sm sm:text-base font-extrabold transition-colors ${
                        isSelected ? 'text-amber-950' : 'text-slate-800'
                      }`}
                    >
                      {mission.title}
                    </h3>

                    {/* Completion Status */}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" />
                        <span>הושלם בהצלחה ⭐</span>
                      </span>
                    )}
                  </div>

                  {/* Right Side: Custom SVG Illustration */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-slate-50 rounded-xl p-1.5 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    <ResponsibilityIconRenderer
                      type={mission.iconType}
                      className="w-full h-full drop-shadow-sm"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LEFT COLUMN (In RTL): Active Selected Mission Details (7 of 12 cols) */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-5">
          {/* 1. Header Card of Active Mission */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/80 flex flex-col gap-4 relative overflow-hidden">
            {/* Top row with badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-sm">
                <span>{selectedMission.badgeText}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-300 shadow-sm">
                <span>10 כוכבים</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              </span>
            </div>

            {/* Mission Title & Subtitle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-right flex-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedMission.detailTitle}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {selectedMission.detailSubtitle}
                </p>
              </div>

              {/* Graphic Preview for Mission 1 or Current Mission */}
              <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                {selectedMission.id === 'm-schedule' ? (
                  <div className="scale-95 sm:scale-100 origin-top">
                    <TimetableWidget />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-2 flex items-center justify-center shadow-inner">
                    <ResponsibilityIconRenderer
                      type={selectedMission.iconType}
                      className="w-20 h-20 drop-shadow"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Golden Rules Bar (כללי זהב של אלופי אחריות) */}
          <div className="bg-[#451A03] text-amber-100 rounded-2xl px-5 py-3.5 shadow-md flex items-center gap-3.5 border-2 border-amber-700/60">
            <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-white flex-shrink-0 shadow">
              <span className="text-base">💡</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-black text-amber-300">
                כללי זהב של אלופי אחריות 💡
              </span>
              <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                {selectedMission.goldenRules}
              </span>
            </div>
          </div>

          {/* 3. The 4 Interactive Action Steps */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border border-white/80 flex flex-col gap-4">
            {/* Header: Steps progress */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-base sm:text-lg text-slate-800">
                  שלבי הפעולה: קל ופשוט 🎯
                </h3>
              </div>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full">
                הושלמו {currentMissionCompletedStepsCount} מתוך 4
              </span>
            </div>

            {/* Steps list */}
            <div className="flex flex-col gap-3">
              {selectedMission.steps.map((step) => {
                const isChecked = Boolean(
                  checkedSteps[`${selectedMission.id}-step-${step.stepNumber}`]
                );

                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => handleToggleStep(step.stepNumber)}
                    className={`rounded-2xl p-4 transition-all duration-200 cursor-pointer border flex items-center justify-between gap-4 ${
                      isChecked
                        ? 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                        : `${step.bgColor} ${step.borderColor} hover:shadow-md`
                    }`}
                  >
                    {/* Checkbox button */}
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow'
                          : 'border-slate-300 bg-white hover:border-amber-400'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    {/* Step Title & Description */}
                    <div className="flex-1 text-right">
                      <h4
                        className={`text-sm sm:text-base font-extrabold ${
                          isChecked ? 'text-emerald-950 line-through decoration-emerald-500/60' : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm font-medium mt-0.5 ${
                          isChecked ? 'text-emerald-700' : 'text-slate-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Number Badge */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${step.numberBg}`}
                    >
                      {step.stepNumber}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Speech Narration Bar (הקראת השלבים בקול) */}
          <div className="bg-sky-50/95 border-2 border-sky-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
            <button
              onClick={handleToggleNarration}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                isNarrating
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-sky-500 hover:bg-sky-600 text-white hover:scale-105'
              }`}
              title={isNarrating ? 'עצור הקראה' : 'הקרא בקול'}
            >
              {isNarrating ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="flex-1 text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-sm font-black text-sky-950">
                  הקראת השלבים בקול 🗣️
                </span>
                {isNarrating && (
                  <span className="flex gap-0.5">
                    <span className="w-1 h-3 bg-sky-500 rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-sky-600 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-sky-700">
                לחצו כאן כדי לשמוע את ההסבר בקול חביב ומעודד! 🪄
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-lg">
              ✨
            </div>
          </div>

          {/* 5. Bottom Prize Card (מוכנים לפרס הגדול?) */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-md border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Right side: Trophy & Message */}
            <div className="flex items-center gap-4 text-right order-2 sm:order-1">
              <div className="flex flex-col">
                <h4 className="text-base sm:text-lg font-black text-slate-800">
                  מוכנים לפרס הגדול? 🎉
                </h4>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  השלמתם את כל השלבים? קבלו את הכוכבים שלכם!
                </p>
              </div>
              <div className="w-13 h-13 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                <Trophy className="w-7 h-7 text-amber-600 fill-amber-500" />
              </div>
            </div>

            {/* Left side: Golden Claim Reward Button */}
            <button
              onClick={() => handleCompleteMission(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-yellow-200 order-1 sm:order-2"
            >
              <Star className="w-5 h-5 fill-yellow-200 text-yellow-100 animate-spin" />
              <span>סיימתי את המשימה! קבל 10 כוכבים</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
