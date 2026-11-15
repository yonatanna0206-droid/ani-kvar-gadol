import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, AlertCircle, CheckCircle, Cloud, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/soundEffects';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, isFirebaseConnected } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const translateFirebaseError = (errMsg: string) => {
    if (errMsg.includes('invalid-credential') || errMsg.includes('wrong-password') || errMsg.includes('user-not-found')) {
      return 'כתובת האימייל או הסיסמה שגויים. אנא נסו שוב.';
    }
    if (errMsg.includes('email-already-in-use')) {
      return 'כתובת אימייל זו כבר רשומה במערכת. נסו להתחבר.';
    }
    if (errMsg.includes('weak-password')) {
      return 'הסיסמה חלשה מדי. יש להזין לפחות 6 תווים.';
    }
    if (errMsg.includes('invalid-email')) {
      return 'כתובת האימייל אינה תקינה.';
    }
    if (errMsg.includes('network-request-failed')) {
      return 'שגיאת רשת. אנא ודאו שאתם מחוברים לאינטרנט.';
    }
    return 'אירעה שגיאה. אנא נסו שוב מאוחר יותר.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        await signup(email, password, name);
        sounds.playCelebration();
        setSuccessMsg('החשבון נוצר בהצלחה! הנתונים נשמרים בענן.');
      } else {
        await login(email, password);
        sounds.playCelebration();
        setSuccessMsg('התחברת בהצלחה! הנתונים סונכרנו.');
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(translateFirebaseError(err.message));
      } else {
        setError('ההתחברות נכשלה. אנא בדקו את הפרטים.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 text-right"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-800 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Decoration */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {isSignUp ? 'הרשמה וגיבוי בענן' : 'כניסה לחשבון משפחתי'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              שמירת כוכבים, משימות והגדרות ב-Firebase
            </p>
          </div>
        </div>

        {/* Connection status pill */}
        <div className="mb-5 py-2 px-3 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-2 text-xs">
          {isFirebaseConnected ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-sky-900 font-medium">
                מחובר לענן מאובטח: <strong>i-am-all-grown-up</strong>
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-amber-800 font-medium">
                מצב הדגמה מקומי
              </span>
            </>
          )}
        </div>

        {/* Tab selection */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setIsSignUp(false);
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              !isSignUp ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            התחברות
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playPop();
              setIsSignUp(true);
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              isSignUp ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            יצירת חשבון חדש
          </button>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                שם ההורה / משפחה
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="לדוגמה: משפחת כהן או שירה"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-2xl py-3 pr-10 pl-3 text-sm text-slate-800 outline-none transition"
                />
                <UserIcon className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              כתובת אימייל
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-2xl py-3 pr-10 pl-3 text-sm text-slate-800 outline-none transition text-left"
              />
              <Mail className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              סיסמה (לפחות 6 תווים)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-2xl py-3 pr-10 pl-3 text-sm text-slate-800 outline-none transition text-left"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl transition cursor-pointer text-sm shadow-md flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>מתחבר...</span>
            ) : isSignUp ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>יצירת חשבון ושמירה</span>
              </>
            ) : (
              <>
                <Cloud className="w-4 h-4" />
                <span>התחבר לחשבון</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center text-xs text-slate-500">
          {isSignUp ? 'כבר יש לכם חשבון?' : 'אין לכם עדיין חשבון?'}{' '}
          <button
            onClick={() => {
              sounds.playPop();
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer mr-1"
          >
            {isSignUp ? 'להתחברות לחצו כאן' : 'להרשמה מהירה לחצו כאן'}
          </button>
        </div>
      </div>
    </div>
  );
};
