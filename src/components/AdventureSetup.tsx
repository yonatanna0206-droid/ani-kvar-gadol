import { useId } from 'react';
import { Heart, Sparkles, Check, Smile } from 'lucide-react';
import type { ChildProfile } from '../types/adventure';
import { AVATARS_LIST, AvatarIllustration } from '../data/avatars';
import { sounds } from '../utils/soundEffects';

interface AdventureSetupProps {
  profile: ChildProfile;
  setProfile: React.Dispatch<React.SetStateAction<ChildProfile>>;
}

export function AdventureSetup({ profile, setProfile }: AdventureSetupProps) {
  const isGirl = profile.gender === 'girl';
  const nameInputId = useId();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleGenderSelect = (gender: 'girl' | 'boy') => {
    sounds.playPop();
    setProfile((prev) => ({ ...prev, gender }));
  };

  const handleAgeSelect = (age: number | string) => {
    sounds.playPop();
    setProfile((prev) => ({ ...prev, age }));
  };

  const handleAvatarSelect = (avatarId: string) => {
    sounds.playChime();
    setProfile((prev) => ({ ...prev, selectedAvatarId: avatarId }));
  };

  const ageOptions: (number | string)[] = [6, 7, 8, 9, 10, '10+'];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. מה השם שלך? */}
      <section className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Smile className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-lg md:text-xl text-slate-800">
              מה השם שלך?
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-800 border border-amber-200/50">
            כינוי או שם אמיתי
          </span>
        </div>

        <p className="text-xs md:text-sm text-slate-500 font-medium mb-4">
          כדי שנוכל לעודד ולקרוא לך בשמך הפרטי בכל הרפתקה
        </p>

        {/* Input box */}
        <div className="relative">
          <label htmlFor={nameInputId} className="sr-only">הכנס שם</label>
          <input
            id={nameInputId}
            type="text"
            value={profile.name}
            onChange={handleNameChange}
            placeholder="לדוגמה: תמר, איתי, נועם..."
            className="w-full h-14 bg-white rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-200/50 pl-12 pr-12 text-slate-800 font-bold text-lg outline-none transition shadow-inner"
          />
          {/* Heart icon on left */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 pointer-events-none">
            <Heart className="w-5 h-5 fill-rose-100" />
          </div>
          {/* Sparkle icon on right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* 2. איך לפנות אליך? */}
      <section className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
              <span className="text-base">👤</span>
            </div>
            <h2 className="font-extrabold text-lg md:text-xl text-slate-800">
              איך לפנות אליך?
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100/70 text-sky-800 border border-sky-200/50">
            התאמה אישית
          </span>
        </div>

        <p className="text-xs md:text-sm text-slate-500 font-medium mb-4">
          כדי שנדבר אליך בדיוק בשפה שלך
        </p>

        {/* Two Options */}
        <div className="grid grid-cols-2 gap-4">
          {/* אני בת */}
          <button
            type="button"
            onClick={() => handleGenderSelect('girl')}
            className={`py-4 px-6 rounded-2xl font-extrabold text-base md:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer ${
              isGirl
                ? 'bg-[#f59e0b] text-white shadow-md ring-4 ring-amber-300/40 scale-[1.01]'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200'
            }`}
          >
            {isGirl && (
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
            <span>אני בת</span>
            <span className="text-2xl">👧</span>
          </button>

          {/* אני בן */}
          <button
            type="button"
            onClick={() => handleGenderSelect('boy')}
            className={`py-4 px-6 rounded-2xl font-extrabold text-base md:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer ${
              !isGirl
                ? 'bg-[#f59e0b] text-white shadow-md ring-4 ring-amber-300/40 scale-[1.01]'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200'
            }`}
          >
            {!isGirl && (
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
            <span>אני בן</span>
            <span className="text-2xl">👦</span>
          </button>
        </div>
      </section>

      {/* 3. בן/בת כמה את/ה? */}
      <section className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="text-base">🎂</span>
            </div>
            <h2 className="font-extrabold text-lg md:text-xl text-slate-800">
              {isGirl ? 'בת כמה את?' : 'בן כמה אתה?'}
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/50">
            הגיל הנבחר: {profile.age} שנים
          </span>
        </div>

        <p className="text-xs md:text-sm text-slate-500 font-medium mb-4">
          מתאים לילדים קוראים מגיל 6 ומעלה - לבחירת משימות בדיוק ברמה הנכונה
        </p>

        {/* Age button options */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ageOptions.map((age) => {
            const isSelected = profile.age === age;
            return (
              <button
                key={age}
                type="button"
                onClick={() => handleAgeSelect(age)}
                className={`py-4 px-2 rounded-2xl font-black text-xl md:text-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 border-3 border-amber-400 ring-4 ring-amber-300/40 shadow-md scale-105'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-xs'
                }`}
              >
                <span>{age}</span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-amber-600 mt-0.5">
                    נבחר ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. בחירת אווטאר אישי */}
      <section className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/70 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <span className="text-base">🎭</span>
            </div>
            <h2 className="font-extrabold text-lg md:text-xl text-slate-800">
              בחירת אווטאר אישי
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/70 text-purple-800 border border-purple-200/50">
            לחצו לבחירה
          </span>
        </div>

        <p className="text-xs md:text-sm text-slate-500 font-medium mb-5">
          מי יהיה החבר שילווה אותך בכל צעד?
        </p>

        {/* 12 Avatars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {AVATARS_LIST.map((avatar) => {
            const isSelected = profile.selectedAvatarId === avatar.id;
            return (
              <div
                key={avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                className={`relative rounded-2xl p-4 flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/90 border-3 border-amber-400 ring-4 ring-amber-300/40 shadow-md scale-[1.03]'
                    : 'bg-white hover:bg-slate-50/90 border-2 border-slate-200/80 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Checked Badge for selected avatar */}
                {isSelected && (
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}

                {/* Character Illustration */}
                <div className="mb-2 transition-transform group-hover:scale-105">
                  <AvatarIllustration id={avatar.id} className="w-16 h-16 md:w-20 md:h-20" />
                </div>

                {/* Name */}
                <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-tight mb-0.5">
                  {avatar.name}
                </h3>

                {/* Trait */}
                <p className="text-xs text-slate-500 font-medium">
                  {avatar.trait}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
