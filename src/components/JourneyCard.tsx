import { Sparkles, ShieldCheck } from 'lucide-react';
import type { ChildProfile } from '../types/adventure';
import { AVATARS_LIST, AvatarIllustration } from '../data/avatars';
import { sounds } from '../utils/soundEffects';

interface JourneyCardProps {
  profile: ChildProfile;
  onStartAdventure: () => void;
}

export function JourneyCard({ profile, onStartAdventure }: JourneyCardProps) {
  const currentAvatar = AVATARS_LIST.find((a) => a.id === profile.selectedAvatarId) || AVATARS_LIST[0];
  const isGirl = profile.gender === 'girl';

  const handleLaunch = () => {
    sounds.playCelebration();
    onStartAdventure();
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/70 flex flex-col gap-4">
      {/* Header */}
      <div className="text-right">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base md:text-lg">
            כרטיס המסע שלך מוכן ומותאם!
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          {isGirl ? 'מוכנה להרפתקה!' : 'מוכן להרפתקה!'} הכל הותאם בדיוק עבורך
        </p>
      </div>

      {/* Child Profile summary card */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-100 flex items-center gap-3.5 transition-all hover:shadow-md">
        {/* Avatar Graphic */}
        <div className="relative shrink-0">
          <AvatarIllustration id={currentAvatar.id} className="w-14 h-14" />
          <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white">
            ✓
          </div>
        </div>

        {/* Text details */}
        <div className="flex flex-col text-right flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-slate-800 truncate">
              {profile.name || (isGirl ? 'תמר' : 'איתי')}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-xs shadow-xs">
              {isGirl ? `בת ${profile.age}` : `בן ${profile.age}`}
            </span>
          </div>

          <p className="text-xs text-slate-500 truncate mt-0.5">
            שותף להרפתקה: {currentAvatar.name} ({currentAvatar.trait})
          </p>
        </div>
      </div>

      {/* Big Action CTA Button */}
      <button
        onClick={handleLaunch}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-base md:text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer cta-pulse"
      >
        <span>קדימה, יוצאים להרפתקה!</span>
        <span className="text-xl">🚀</span>
      </button>

      {/* Safe Space Footnote */}
      <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-medium pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>בונים ביטחון ועצמאות בקצב שלך</span>
      </div>
    </div>
  );
}
