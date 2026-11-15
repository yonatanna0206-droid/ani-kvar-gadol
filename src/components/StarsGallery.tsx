import { Award, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ChildProfile } from '../types/adventure';
import { sounds } from '../utils/soundEffects';

interface StarsGalleryProps {
  profile: ChildProfile;
  onClaimReward: () => void;
}

export function StarsGallery({ profile, onClaimReward }: StarsGalleryProps) {
  const isGirl = profile.gender === 'girl';
  const targetStars = 20;
  const currentStars = profile.totalStars;
  const progress = Math.min(100, Math.round((currentStars / targetStars) * 100));

  const badges = [
    {
      id: 'b1',
      title: 'מדליית עצמאות זהב',
      desc: isGirl ? 'עושה פעולות בוקר לבד כמו גדולה!' : 'עושה פעולות בוקר לבד כמו גדול!',
      icon: '🏅',
      unlocked: currentStars >= 5,
    },
    {
      id: 'b2',
      title: 'אלוף הסדר והארגון',
      desc: 'חדר וילקוט מסודרים לתפארת',
      icon: '✨',
      unlocked: currentStars >= 10,
    },
    {
      id: 'b3',
      title: 'שומר הזמן החכם',
      desc: 'כיבוי מסכים בזמן עם חיוך',
      icon: '⏱️',
      unlocked: currentStars >= 15,
    },
    {
      id: 'b4',
      title: 'כוכב על בהרפתקה',
      desc: 'התמדה וביטחון עצמי יום אחרי יום',
      icon: '👑',
      unlocked: currentStars >= 20,
    },
  ];

  return (
    <div className="flex flex-col gap-6 text-right">
      {/* Big Golden Star Bank */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 md:p-8 shadow-xl text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center text-4xl shrink-0 cta-pulse">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-slate-900 text-amber-300 font-extrabold text-xs">
                בנק הכוכבים האישי
              </span>
              <Sparkles className="w-4 h-4 text-slate-800" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              יש לך {currentStars} כוכבים זוהרים!
            </h2>
            <p className="text-sm font-bold text-slate-800/80 mt-1">
              {isGirl ? 'כל כוכב הוא הוכחה לעצמאות והבגרות המדהימה שלך!' : 'כל כוכב הוא הוכחה לעצמאות והבגרות המדהימה שלך!'}
            </p>
          </div>
        </div>

        {/* Reward Goal Box */}
        <div className="w-full md:w-80 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-sm border border-amber-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span className="flex items-center gap-1">
              <Gift className="w-4 h-4 text-rose-500" />
              <span>יעד פרס: בילוי משפחתי בפארק</span>
            </span>
            <span className="font-extrabold text-amber-600">{currentStars} / {targetStars}</span>
          </div>

          <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          {currentStars >= targetStars ? (
            <button
              onClick={() => {
                sounds.playCelebration();
                onClaimReward();
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow transition cursor-pointer"
            >
              🎉 הגיע הזמן לקבל את הפרס!
            </button>
          ) : (
            <p className="text-[11px] text-slate-500 font-semibold text-center">
              עוד {targetStars - currentStars} כוכבים בלבד לפתיחת הפרס!
            </p>
          )}
        </div>
      </div>

      {/* Badges and Medals Showcase */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-amber-500" />
          <h3 className="font-extrabold text-lg md:text-xl text-slate-800">
            מדליות והישגים שפתחת
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl p-4 border-2 flex flex-col items-center text-center transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-extrabold text-slate-800 text-base mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-3">
                {badge.desc}
              </p>
              {badge.unlocked ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>נפתח בהצלחה!</span>
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 bg-slate-200 px-2.5 py-0.5 rounded-full">
                  🔒 נעול
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
