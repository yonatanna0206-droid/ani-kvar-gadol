import { useState, useId } from 'react';
import { Lock, Clock, BellRing, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ParentSidebarProps {
  onUnlockParentZone: () => void;
  screenTimeActive: boolean;
  morningReminderActive: boolean;
  positiveReinforcementActive: boolean;
  onToggleScreenTime: () => void;
  onToggleMorningReminder: () => void;
  onTogglePositiveReinforcement: () => void;
}

export function ParentSidebar({
  onUnlockParentZone,
  screenTimeActive,
  morningReminderActive,
  positiveReinforcementActive,
  onToggleScreenTime,
  onToggleMorningReminder,
  onTogglePositiveReinforcement,
}: ParentSidebarProps) {
  // Simple math challenge: 3 + 5
  const [num1] = useState(3);
  const [num2] = useState(5);
  const [mathAnswer, setMathAnswer] = useState('');
  const [hasError, setHasError] = useState(false);
  const mathInputId = useId();

  const handleOpenParentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(mathAnswer.trim(), 10) === num1 + num2) {
      setHasError(false);
      sounds.playCelebration();
      onUnlockParentZone();
      setMathAnswer('');
    } else {
      setHasError(true);
      sounds.playPop();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Card 1: אזור להורים בלבד */}
      <div className="bg-gradient-to-b from-[#0284c7] to-[#0369a1] text-white rounded-3xl p-5 shadow-lg border border-sky-300/30 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-sky-100" />
            </div>
            <h3 className="font-bold text-base md:text-lg">אזור להורים בלבד</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 border border-white/30 text-sky-100">
            נעול לילדים
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-sky-100/90 leading-relaxed mb-4">
          הורים יקרים, כאן תוכלו להגדיר יעדי עצמאות, שעות מסך, התראות חיזוק חיוביות ומעקב צמיחה.
        </p>

        {/* Parent Gate Math Form */}
        <form onSubmit={handleOpenParentSettings} className="bg-white rounded-2xl p-3 text-slate-800 shadow-sm mb-4">
          <label htmlFor={mathInputId} className="block text-xs font-bold text-slate-700 mb-1">
            שער כניסה מתמטי:
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-800 whitespace-nowrap">
              כמה זה: {num1} + {num2} ?
            </span>
            <input
              id={mathInputId}
              type="number"
              value={mathAnswer}
              onChange={(e) => {
                setMathAnswer(e.target.value);
                setHasError(false);
              }}
              placeholder="?"
              className={`w-14 h-9 text-center rounded-xl border font-bold text-base outline-none transition ${
                hasError
                  ? 'border-red-500 bg-red-50 text-red-600 ring-2 ring-red-200'
                  : 'border-slate-300 bg-slate-50 focus:border-sky-500 focus:bg-white'
              }`}
            />
            <button
              type="submit"
              className="flex-1 h-9 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>פתח הגדרות הורים</span>
            </button>
          </div>
          {hasError && (
            <p className="text-[11px] text-red-600 font-semibold mt-1.5 text-center">
              תשובה לא נכונה, נסו שוב :)
            </p>
          )}
        </form>

        {/* Status Toggles List */}
        <div className="space-y-2 text-xs">
          {/* Screen Time */}
          <div 
            onClick={() => {
              sounds.playPop();
              onToggleScreenTime();
            }}
            className="flex items-center justify-between bg-sky-800/40 hover:bg-sky-800/60 p-2.5 rounded-xl border border-sky-400/20 cursor-pointer transition"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-200" />
              <span className="text-sky-100 font-medium">הגבלת זמן שימוש (25 דק')</span>
            </div>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
              screenTimeActive ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-400/50 text-white'
            }`}>
              {screenTimeActive ? 'פעיל' : 'כבוי'}
            </span>
          </div>

          {/* Morning Reminder */}
          <div 
            onClick={() => {
              sounds.playPop();
              onToggleMorningReminder();
            }}
            className="flex items-center justify-between bg-sky-800/40 hover:bg-sky-800/60 p-2.5 rounded-xl border border-sky-400/20 cursor-pointer transition"
          >
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-sky-200" />
              <span className="text-sky-100 font-medium">תזכורות משימות בוקר</span>
            </div>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
              morningReminderActive ? 'bg-sky-300 text-sky-950' : 'bg-slate-400/50 text-white'
            }`}>
              {morningReminderActive ? 'פעיל' : 'כבוי'}
            </span>
          </div>

          {/* Positive Reinforcement */}
          <div 
            onClick={() => {
              sounds.playPop();
              onTogglePositiveReinforcement();
            }}
            className="flex items-center justify-between bg-sky-800/40 hover:bg-sky-800/60 p-2.5 rounded-xl border border-sky-400/20 cursor-pointer transition"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-200" />
              <span className="text-sky-100 font-medium">מדליות וחיזוקים חיוביים</span>
            </div>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
              positiveReinforcementActive ? 'bg-amber-300 text-amber-950' : 'bg-slate-400/50 text-white'
            }`}>
              {positiveReinforcementActive ? 'יומי' : 'שבועי'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
