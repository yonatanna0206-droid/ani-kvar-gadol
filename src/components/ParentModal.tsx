import { useState, useId } from 'react';
import { X, Lock, Save, CheckCircle, Cloud, LogOut, Check } from 'lucide-react';
import type { ParentSettings, ChildProfile } from '../types/adventure';
import { sounds } from '../utils/soundEffects';
import { useAuth } from '../context/AuthContext';

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ParentSettings;
  setSettings: React.Dispatch<React.SetStateAction<ParentSettings>>;
  profile: ChildProfile;
  onOpenAuthModal?: () => void;
}

export function ParentModal({
  isOpen,
  onClose,
  settings,
  setSettings,
  profile,
  onOpenAuthModal,
}: ParentModalProps) {
  const { user, logout } = useAuth();
  const [localSettings, setLocalSettings] = useState<ParentSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const screenTimeInputId = useId();
  const praiseMsgInputId = useId();

  if (!isOpen) return null;

  const handleSave = () => {
    sounds.playCelebration();
    setSettings(localSettings);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden text-right flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-sky-100" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">מרכז ניהול והגדרות הורים</h3>
              <p className="text-xs text-sky-100">התאמת יעדים, הגבלת זמן מסך וחיזוקים חיוביים</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Child overview */}
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">
                פרופיל פעיל: {profile.name} ({profile.gender === 'girl' ? 'בת' : 'בן'} {profile.age})
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                צברו עד כה: {profile.totalStars} כוכבים • רצף ימי: {profile.dailyStreak} ימים
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
              אזור מוגן ומאובטח ✓
            </span>
          </div>

          {/* Screen time management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={screenTimeInputId} className="font-bold text-sm text-slate-800">
                הגבלת זמן מסך יומית
              </label>
              <span className="font-extrabold text-sky-600 text-sm">
                {localSettings.screenTimeMinutes} דקות
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {[15, 25, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setLocalSettings({ ...localSettings, screenTimeMinutes: mins });
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    localSettings.screenTimeMinutes === mins
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {mins} דק'
                </button>
              ))}
            </div>

            <input
              id={screenTimeInputId}
              type="range"
              min="10"
              max="60"
              step="5"
              value={localSettings.screenTimeMinutes}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  screenTimeMinutes: parseInt(e.target.value, 10),
                })
              }
              className="w-full accent-sky-500"
            />
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-sm text-slate-800">התראות ותזכורות לילד/ה</h4>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-sm text-slate-800 block">הפעלת טיימר זמן מסך אוטומטי</span>
                <span className="text-xs text-slate-500">מציג התרעה נעימה 5 דקות לפני סיום</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.isScreenTimeActive}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, isScreenTimeActive: e.target.checked })
                }
                className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-sm text-slate-800 block">תזכורות משימות בוקר</span>
                <span className="text-xs text-slate-500">עוזר לילד/ה לזכור להתלבש ולצחצח שיניים בלי מאבקים</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.isMorningReminderActive}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, isMorningReminderActive: e.target.checked })
                }
                className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-sm text-slate-800 block">חיזוקים חיוביים יומיים</span>
                <span className="text-xs text-slate-500">משוב מעצים על כל התקדמות עצמאית</span>
              </div>
              <input
                type="checkbox"
                checked={localSettings.isPositiveReinforcementDaily}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    isPositiveReinforcementDaily: e.target.checked,
                  })
                }
                className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Custom Parent Encouragement Note */}
          <div>
            <label htmlFor={praiseMsgInputId} className="font-bold text-sm text-slate-800 block mb-1">
              הודעת חיזוק אישית מההורים (מופיעה בסיום משימה)
            </label>
            <input
              id={praiseMsgInputId}
              type="text"
              value={localSettings.customPraiseMessage}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, customPraiseMessage: e.target.value })
              }
              placeholder="לדוגמה: אלופה שלנו! גאים בך מאוד, אמא ואבא ❤️"
              className="w-full h-11 px-4 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 font-medium text-sm outline-none transition"
            />
          </div>

          {/* Cloud Account & Backup Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-sky-600" />
                <h4 className="font-extrabold text-sm text-slate-800">
                  גיבוי וסנכרון ענן (Firebase)
                </h4>
              </div>
              {user ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1">
                  <Check className="w-3 h-3" /> מחובר
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
                  לא מחובר
                </span>
              )}
            </div>

            {user ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                <div>
                  <p className="font-bold text-slate-700">
                    חשבון: <span className="font-medium text-slate-600">{user.email}</span>
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    הנתונים, המשימות והכוכבים מגובים בזמן אמת במסד הנתונים בענן.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    sounds.playPop();
                    await logout();
                  }}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition flex items-center gap-1 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>התנתק</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                <p className="text-slate-600">
                  התחברו כדי לשמור את הישגי הילדים וההגדרות בענן, ולגשת מכל מכשיר או מחשב.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    onClose();
                    onOpenAuthModal?.();
                  }}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl transition shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Cloud className="w-4 h-4" />
                  <span>התחברות / הרשמה</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-sm rounded-xl cursor-pointer"
          >
            ביטול
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold text-sm rounded-xl shadow flex items-center gap-2 cursor-pointer transition"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>נשמר בהצלחה!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>שמור שינויים</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
