import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Award } from 'lucide-react';
import type { ChildProfile, Mission } from '../types/adventure';
import { AVATARS_LIST, AvatarIllustration } from '../data/avatars';
import { sounds } from '../utils/soundEffects';
import { DEFAULT_MISSIONS } from '../data/missions';

interface ActivityBoardProps {
  profile: ChildProfile;
  setProfile: React.Dispatch<React.SetStateAction<ChildProfile>>;
  onCollectStars: (amount: number) => void;
  missions?: Mission[];
  setMissions?: React.Dispatch<React.SetStateAction<Mission[]>>;
}

export function ActivityBoard({
  profile,
  setProfile,
  onCollectStars,
  missions: propsMissions,
  setMissions: propsSetMissions,
}: ActivityBoardProps) {
  const [internalMissions, setInternalMissions] = useState<Mission[]>(DEFAULT_MISSIONS);
  const missions = propsMissions || internalMissions;
  const setMissions = propsSetMissions || setInternalMissions;
  const [avatarPraise, setAvatarPraise] = useState<string>('');

  // 25 minutes screen time countdown (1500 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const currentAvatar = AVATARS_LIST.find((a) => a.id === profile.selectedAvatarId) || AVATARS_LIST[0];
  const isGirl = profile.gender === 'girl';

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            sounds.playCelebration();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const toggleMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const nextCompleted = !m.completed;
          if (nextCompleted) {
            sounds.playStarDing();
            onCollectStars(m.stars);
            setProfile((p) => ({ ...p, totalStars: p.totalStars + m.stars }));

            const praiseMessages = isGirl
              ? [
                  `וואו ${profile.name}! איזה אלופה!`,
                  `כל הכבוד! ${currentAvatar.name} ממש גאה בך! 🌟`,
                  `עוד צעד ענקי לעצמאות! תמשיכי ככה! 💪`,
                  `נהדרת! את הופכת לאלופה אמיתית! 👑`,
                ]
              : [
                  `וואו ${profile.name}! איזה אלוף!`,
                  `כל הכבוד! ${currentAvatar.name} ממש גאה בך! 🌟`,
                  `עוד צעד ענקי לעצמאות! תמשיך ככה! 💪`,
                  `נהדר! אתה הופך לאלוף אמיתי! 👑`,
                ];

            setAvatarPraise(praiseMessages[Math.floor(Math.random() * praiseMessages.length)]);
          } else {
            sounds.playPop();
          }
          return { ...m, completed: nextCompleted };
        }
        return m;
      })
    );
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome & Avatar Greeting Header */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70 flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4 text-right">
          <div className="relative shrink-0">
            <AvatarIllustration id={currentAvatar.id} className="w-16 h-16 md:w-20 md:h-20" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-bold shadow">
              ⭐
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              {isGirl ? `היי ${profile.name}! מוכנה למשימות היום?` : `היי ${profile.name}! מוכן למשימות היום?`}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium mt-0.5">
              {avatarPraise || `השותף שלך ${currentAvatar.name} מלווה אותך! כל משימה מעניקה כוכבים זוהרים.`}
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="w-full md:w-64 bg-slate-50/90 rounded-2xl p-3 border border-slate-200 text-right">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span>התקדמות יומית:</span>
            <span className="text-amber-600 font-extrabold">{completedCount} / {missions.length} ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Screen Time Timer Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-right">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
            ⏱️
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg">טיימר זמן מסך חכם (25 דקות)</h3>
            <p className="text-xs text-sky-100">עוזר לדעת מתי מסיימים בנחת בלי הפתעות</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-3xl md:text-4xl font-black tracking-wider bg-black/20 px-4 py-1.5 rounded-2xl border border-white/20">
            {formatTimer(timeLeft)}
          </span>

          <button
            onClick={() => {
              sounds.playPop();
              setIsTimerRunning(!isTimerRunning);
            }}
            className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-100 text-indigo-700 font-bold flex items-center justify-center shadow transition cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setIsTimerRunning(false);
              setTimeLeft(25 * 60);
            }}
            title="איפוס טיימר"
            className="w-11 h-11 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Missions Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Morning Routine */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/70">
          <div className="flex items-center gap-2 mb-3 text-right">
            <span className="text-xl">🌅</span>
            <h3 className="font-extrabold text-base md:text-lg text-slate-800">
              שגרת בוקר של אלופים
            </h3>
          </div>

          <div className="space-y-2.5">
            {missions
              .filter((m) => m.category === 'morning')
              .map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    mission.completed
                      ? 'bg-emerald-50 border-emerald-300 text-slate-500 line-through'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mission.icon}</span>
                    <span className="font-bold text-sm md:text-base">{mission.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center gap-1">
                      <span>+{mission.stars}</span>
                      <span>⭐</span>
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                        mission.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {mission.completed && '✓'}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Afternoon & Evening Routine */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/70">
          <div className="flex items-center gap-2 mb-3 text-right">
            <span className="text-xl">🌙</span>
            <h3 className="font-extrabold text-base md:text-lg text-slate-800">
              משימות צהריים וערב
            </h3>
          </div>

          <div className="space-y-2.5">
            {missions
              .filter((m) => m.category !== 'morning')
              .map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => toggleMission(mission.id)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    mission.completed
                      ? 'bg-emerald-50 border-emerald-300 text-slate-500 line-through'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{mission.icon}</span>
                    <span className="font-bold text-sm md:text-base">{mission.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center gap-1">
                      <span>+{mission.stars}</span>
                      <span>⭐</span>
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                        mission.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {mission.completed && '✓'}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Motivational Bottom Banner */}
      <div className="bg-amber-100/90 border border-amber-300/80 rounded-2xl p-4 flex items-center justify-between text-slate-800">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-600" />
          <p className="text-xs md:text-sm font-bold">
            כל משימה שתשלימו לבד מקרבת אתכם למדליית העצמאות הגדולה!
          </p>
        </div>
        <span className="font-extrabold text-amber-700 text-sm">
          סה"כ כוכבים: {profile.totalStars} ⭐
        </span>
      </div>
    </div>
  );
}
