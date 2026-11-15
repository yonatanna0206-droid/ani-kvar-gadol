import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full mt-auto py-6 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      <div className="bg-white/75 backdrop-blur-md rounded-2xl py-3 px-6 shadow-sm border border-white/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 font-medium">
        {/* Right in RTL: Safe Space note */}
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>מרחב בטוח, מוגן ומעצים לילדים וילדות</span>
        </div>

        {/* Left in RTL: Copyright */}
        <div className="text-slate-500">
          © אני כבר גדול/ה • כל הזכויות שמורות
        </div>
      </div>
    </footer>
  );
}
