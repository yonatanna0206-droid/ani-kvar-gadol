interface IllustrationProps {
  className?: string;
  size?: number;
}

// 1. מערכת שעות צבעונית
export function ScheduleIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="72" height="74" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
      {/* Table Header */}
      <rect x="18" y="18" width="64" height="14" rx="6" fill="#F59E0B" />
      <rect x="24" y="23" width="52" height="4" rx="2" fill="white" />
      {/* Grid Lines */}
      <line x1="18" y1="44" x2="82" y2="44" stroke="#FCD34D" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="18" y1="58" x2="82" y2="58" stroke="#FCD34D" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="18" y1="72" x2="82" y2="72" stroke="#FCD34D" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="39" y1="32" x2="39" y2="82" stroke="#FDE68A" strokeWidth="2" />
      <line x1="60" y1="32" x2="60" y2="82" stroke="#FDE68A" strokeWidth="2" />
      {/* Colorful Subject Pills */}
      <rect x="22" y="36" width="13" height="5" rx="2" fill="#38BDF8" />
      <rect x="43" y="36" width="13" height="5" rx="2" fill="#F43F5E" />
      <rect x="64" y="36" width="14" height="5" rx="2" fill="#10B981" />
      <rect x="22" y="50" width="13" height="5" rx="2" fill="#A855F7" />
      <rect x="43" y="50" width="13" height="5" rx="2" fill="#FB923C" />
      <rect x="64" y="50" width="14" height="5" rx="2" fill="#EC4899" />
      {/* Cute Pencil */}
      <g transform="translate(62, 58) rotate(-35)">
        <polygon points="0,0 8,0 4,16" fill="#F59E0B" />
        <polygon points="2,12 6,12 4,16" fill="#1E293B" />
        <rect x="0" y="-20" width="8" height="20" fill="#FBBF24" />
        <rect x="0" y="-24" width="8" height="4" fill="#94A3B8" />
        <rect x="0" y="-30" width="8" height="6" rx="2" fill="#F43F5E" />
      </g>
      {/* Sparkle */}
      <circle cx="20" cy="25" r="2.5" fill="#FEF08A" />
      <circle cx="82" cy="78" r="3" fill="#F59E0B" />
    </svg>
  );
}

// 2. שעון מחוגים
export function ClockIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Alarm Bells */}
      <circle cx="28" cy="24" r="10" fill="#0284C7" />
      <circle cx="72" cy="24" r="10" fill="#0284C7" />
      <rect x="28" y="28" width="6" height="8" rx="2" fill="#0369A1" transform="rotate(-30 28 28)" />
      <rect x="66" y="25" width="6" height="8" rx="2" fill="#0369A1" transform="rotate(30 66 25)" />
      {/* Clock Feet */}
      <rect x="24" y="78" width="8" height="12" rx="3" fill="#0284C7" transform="rotate(25 24 78)" />
      <rect x="68" y="81" width="8" height="12" rx="3" fill="#0284C7" transform="rotate(-25 68 81)" />
      {/* Clock Outer Rim */}
      <circle cx="50" cy="52" r="36" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
      {/* Clock Dial Face */}
      <circle cx="50" cy="52" r="30" fill="white" />
      {/* Hour ticks */}
      <circle cx="50" cy="27" r="2" fill="#0369A1" />
      <circle cx="75" cy="52" r="2" fill="#0369A1" />
      <circle cx="50" cy="77" r="2" fill="#0369A1" />
      <circle cx="25" cy="52" r="2" fill="#0369A1" />
      {/* Numbers simplified */}
      <text x="50" y="32" fontSize="6" fontWeight="bold" fill="#0369A1" textAnchor="middle">12</text>
      <text x="71" y="54" fontSize="6" fontWeight="bold" fill="#0369A1" textAnchor="middle">3</text>
      <text x="50" y="76" fontSize="6" fontWeight="bold" fill="#0369A1" textAnchor="middle">6</text>
      <text x="29" y="54" fontSize="6" fontWeight="bold" fill="#0369A1" textAnchor="middle">9</text>
      {/* Short Hour Hand pointing to 3 */}
      <line x1="50" y1="52" x2="64" y2="52" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      {/* Long Minute Hand pointing to 12 */}
      <line x1="50" y1="52" x2="50" y2="34" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      {/* Center Pin */}
      <circle cx="50" cy="52" r="3.5" fill="#EF4444" />
      <circle cx="50" cy="52" r="1.5" fill="white" />
    </svg>
  );
}

// 3. סימנייה מגניבה לספר
export function BookmarkIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open Book Pages */}
      <path d="M50 32C42 26 28 26 14 30V76C28 72 42 72 50 78C58 72 72 72 86 76V30C72 26 58 26 50 32Z" fill="#FDF4FF" stroke="#A21CAF" strokeWidth="2.5" />
      {/* Book Cover Edge */}
      <path d="M12 30V78C26 74 40 74 48 80H52C60 74 74 74 88 78V30" stroke="#701A75" strokeWidth="2" strokeLinecap="round" />
      {/* Page Lines */}
      <line x1="22" y1="42" x2="42" y2="40" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="50" x2="42" y2="48" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="58" x2="38" y2="56" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="40" x2="78" y2="42" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="48" x2="78" y2="50" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="56" x2="78" y2="58" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" />
      {/* Bookmark */}
      <rect x="44" y="16" width="12" height="42" rx="3" fill="#F43F5E" />
      <polygon points="44,58 50,52 56,58" fill="#FDF4FF" />
      {/* Yarn Ribbon / Tassel */}
      <path d="M50 16C50 10 56 8 52 4" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="52" cy="4" r="2.5" fill="#F59E0B" />
      {/* Star on Bookmark */}
      <polygon points="50,26 51.5,29.5 55,30 52.5,32.5 53,36 50,34 47,36 47.5,32.5 45,30 48.5,29.5" fill="#FDE047" />
    </svg>
  );
}

// 4. סידור החדר בצורה כיפית
export function RoomIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Room Wall & Floor */}
      <rect x="14" y="16" width="72" height="68" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.5" />
      {/* Cute Poster */}
      <rect x="22" y="22" width="16" height="20" rx="3" fill="#A7F3D0" stroke="#059669" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill="#F59E0B" />
      {/* Cozy Bed */}
      <rect x="42" y="44" width="40" height="34" rx="5" fill="#34D399" />
      <rect x="44" y="50" width="36" height="24" rx="3" fill="#6EE7B7" />
      {/* Pillow */}
      <rect x="62" y="38" width="16" height="10" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Toy Storage Box */}
      <rect x="18" y="58" width="22" height="22" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="29" cy="69" r="4" fill="#F59E0B" />
      {/* Teddy Bear Ears in Box */}
      <circle cx="24" cy="54" r="3.5" fill="#B45309" />
      <circle cx="34" cy="54" r="3.5" fill="#B45309" />
      <circle cx="29" cy="56" r="5" fill="#D97706" />
      {/* Sparkles of Cleanliness */}
      <path d="M36 20L37.5 24L41.5 25.5L37.5 27L36 31L34.5 27L30.5 25.5L34.5 24Z" fill="#F59E0B" />
      <circle cx="78" cy="26" r="2.5" fill="#34D399" />
    </svg>
  );
}

// 5. בדיקת מזג האוויר והתלבשות
export function WeatherIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun */}
      <circle cx="44" cy="40" r="18" fill="#FBBF24" />
      <circle cx="44" cy="40" r="14" fill="#F59E0B" />
      {/* Sun Rays */}
      <line x1="44" y1="16" x2="44" y2="20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="60" x2="44" y2="64" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="40" x2="24" y2="40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="40" x2="68" y2="40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      {/* Fluffy Cloud */}
      <path d="M48 64C48 58 54 53 60 54C62 48 70 48 74 53C79 53 82 57 82 62C82 67 78 70 72 70H52C48 70 48 66 48 64Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
      {/* Raindrops */}
      <path d="M54 74C54 76 52 78 52 78C52 78 50 76 50 74C50 73 51 72 52 72C53 72 54 73 54 74Z" fill="#0284C7" />
      <path d="M64 74C64 76 62 78 62 78C62 78 60 76 60 74C60 73 61 72 62 72C63 72 64 73 64 74Z" fill="#0284C7" />
      {/* Thermometer */}
      <rect x="18" y="34" width="8" height="38" rx="4" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="20" y="46" width="4" height="20" rx="2" fill="#EF4444" />
      <circle cx="22" cy="68" r="6" fill="#EF4444" />
    </svg>
  );
}

// 6. מיון צעצועים ובגדים לתרומה
export function DonationIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cardboard Box */}
      <path d="M20 48L50 36L80 48L50 60L20 48Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <path d="M20 48V76L50 88V60L20 48Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <path d="M80 48V76L50 88V60L80 48Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      {/* Heart Symbol on Box */}
      <path d="M50 72C50 72 42 66 42 61C42 58 45 56 48 57C49 57.5 50 58.5 50 58.5C50 58.5 51 57.5 52 57C55 56 58 58 58 61C58 66 50 72 50 72Z" fill="#EF4444" />
      {/* Teddy Bear Head Peeking Out */}
      <circle cx="36" cy="30" r="4" fill="#92400E" />
      <circle cx="48" cy="30" r="4" fill="#92400E" />
      <circle cx="42" cy="34" r="7" fill="#B45309" />
      <circle cx="42" cy="36" r="3" fill="#FDE68A" />
      <circle cx="42" cy="35" r="1.5" fill="#451A03" />
      {/* Colorful Shirt Peeking Out */}
      <path d="M52 28L68 34L62 46L54 42Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      {/* Sparkles */}
      <circle cx="74" cy="22" r="3" fill="#F43F5E" />
      <circle cx="22" cy="32" r="2" fill="#FBBF24" />
    </svg>
  );
}

// 7. הכנת שיעורי בית לבד וברוגע
export function HomeworkIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Desk Surface */}
      <rect x="12" y="66" width="76" height="12" rx="3" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* Desk Lamp */}
      <path d="M22 66V42C22 34 30 30 36 30" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 26L44 32L36 38Z" fill="#818CF8" />
      {/* Light glow */}
      <path d="M38 34L54 62H32L38 34Z" fill="#FEF08A" opacity="0.4" />
      {/* Open Notebook */}
      <rect x="42" y="52" width="22" height="16" rx="2" fill="white" stroke="#6366F1" strokeWidth="1.5" />
      <line x1="53" y1="52" x2="53" y2="68" stroke="#C7D2FE" strokeWidth="1.5" />
      <line x1="45" y1="56" x2="50" y2="56" stroke="#4338CA" strokeWidth="1.5" />
      <line x1="45" y1="60" x2="50" y2="60" stroke="#4338CA" strokeWidth="1.5" />
      <line x1="56" y1="56" x2="61" y2="56" stroke="#4338CA" strokeWidth="1.5" />
      <line x1="56" y1="60" x2="61" y2="60" stroke="#4338CA" strokeWidth="1.5" />
      {/* Pen in Pen Holder */}
      <rect x="70" y="56" width="10" height="12" rx="2" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1.5" />
      <line x1="73" y1="58" x2="71" y2="48" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="77" y1="58" x2="79" y2="46" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 8. הכנת הילקוט ערב מראש
export function BackpackIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Backpack Handle */}
      <path d="M38 28C38 18 62 18 62 28" stroke="#0891B2" strokeWidth="4" strokeLinecap="round" />
      {/* Main Backpack Body */}
      <rect x="24" y="26" width="52" height="58" rx="14" fill="#06B6D4" stroke="#0891B2" strokeWidth="2.5" />
      {/* Flap & Upper Pocket */}
      <path d="M26 38C26 32 74 32 74 38V50H26V38Z" fill="#22D3EE" />
      {/* Front Big Pocket */}
      <rect x="32" y="54" width="36" height="24" rx="6" fill="#67E8F9" stroke="#0891B2" strokeWidth="1.5" />
      {/* Zipper pulls */}
      <circle cx="50" cy="50" r="2.5" fill="#FBBF24" />
      <circle cx="50" cy="66" r="2" fill="#FBBF24" />
      {/* Side Pocket with Water Bottle */}
      <rect x="18" y="52" width="8" height="22" rx="3" fill="#0891B2" />
      <rect x="19" y="44" width="6" height="10" rx="2" fill="#38BDF8" />
      <rect x="20.5" y="40" width="3" height="4" fill="#EF4444" />
      {/* Reflective Stripes */}
      <line x1="36" y1="72" x2="64" y2="72" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="44" x2="64" y2="44" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 3D Style Alarm Clock for Hero Banner (from Stitch screenshot)
export function HeroAlarmClockIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="40" cy="72" rx="24" ry="5" fill="#000000" opacity="0.12" />
      {/* Alarm Bells */}
      <circle cx="22" cy="20" r="10" fill="#F43F5E" />
      <circle cx="22" cy="20" r="6" fill="#FDA4AF" />
      <circle cx="58" cy="20" r="10" fill="#F43F5E" />
      <circle cx="58" cy="20" r="6" fill="#FDA4AF" />
      {/* Feet */}
      <rect x="22" y="62" width="6" height="10" rx="3" fill="#0D9488" transform="rotate(20 22 62)" />
      <rect x="52" y="64" width="6" height="10" rx="3" fill="#0D9488" transform="rotate(-20 52 64)" />
      {/* Main Clock Body */}
      <circle cx="40" cy="44" r="28" fill="#14B8A6" />
      <circle cx="40" cy="44" r="25" fill="#2DD4BF" />
      <circle cx="40" cy="44" r="21" fill="white" />
      {/* Tick Marks */}
      <circle cx="40" cy="27" r="1.5" fill="#0F766E" />
      <circle cx="57" cy="44" r="1.5" fill="#0F766E" />
      <circle cx="40" cy="61" r="1.5" fill="#0F766E" />
      <circle cx="23" cy="44" r="1.5" fill="#0F766E" />
      {/* Hands */}
      <line x1="40" y1="44" x2="51" y2="44" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="44" x2="40" y2="31" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="44" r="2.5" fill="#F43F5E" />
    </svg>
  );
}

// 3D Style Backpack for Hero Banner (from Stitch screenshot)
export function HeroBackpackIllustration({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="40" cy="73" rx="22" ry="5" fill="#000000" opacity="0.12" />
      {/* Handle */}
      <path d="M32 24C32 16 48 16 48 24" stroke="#BE123C" strokeWidth="3.5" strokeLinecap="round" />
      {/* Body */}
      <rect x="20" y="22" width="40" height="48" rx="12" fill="#E11D48" />
      <rect x="22" y="24" width="36" height="44" rx="10" fill="#F43F5E" />
      {/* Top flap */}
      <path d="M22 34C22 28 58 28 58 34V42H22V34Z" fill="#FDA4AF" />
      {/* Front pocket */}
      <rect x="27" y="46" width="26" height="18" rx="5" fill="#FB7185" />
      <circle cx="40" cy="50" r="2" fill="#FEF08A" />
      {/* Straps / buckles */}
      <rect x="25" y="44" width="4" height="20" rx="2" fill="#BE123C" />
      <rect x="51" y="44" width="4" height="20" rx="2" fill="#BE123C" />
      <rect x="25" y="52" width="4" height="4" fill="#FDE047" />
      <rect x="51" y="52" width="4" height="4" fill="#FDE047" />
    </svg>
  );
}

// Interactive & Decorative Timetable Graphic Widget for Mission 1
export function TimetableWidget() {
  const days = [
    { name: 'ראשון', subjects: ['חשבון', 'עברית'], color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { name: 'שני', subjects: ['אמנות', 'תורה'], color: 'bg-rose-100 text-rose-900 border-rose-300' },
    { name: 'שלישי', subjects: ['ספורט', 'מדעים'], color: 'bg-sky-100 text-sky-900 border-sky-300' },
    { name: 'רביעי', subjects: ['חשבון', 'אנגלית'], color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { name: 'חמישי', subjects: ['עברית', 'מוזיקה'], color: 'bg-purple-100 text-purple-900 border-purple-300' },
    { name: 'שישי', subjects: ['חינוך', 'ספרייה'], color: 'bg-orange-100 text-orange-900 border-orange-300' },
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm p-3 max-w-sm w-full mx-auto relative overflow-hidden">
      {/* Status badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-800 text-white shadow-sm">
          <span>פעיל עכשיו</span>
          <span>☀️</span>
        </span>
        <span className="text-xs font-black text-amber-900 tracking-wide">
          מערכת שעות שבועית
        </span>
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-6 gap-1 text-center">
        {days.map((day) => (
          <div key={day.name} className="flex flex-col">
            <div className="bg-amber-600 text-white text-[10px] font-bold py-0.5 rounded-t">
              {day.name}
            </div>
            <div className={`p-1 flex flex-col gap-1 rounded-b border ${day.color} text-[9px] font-semibold min-h-[64px]`}>
              {day.subjects.map((sub, i) => (
                <span key={i} className="bg-white/80 rounded px-0.5 py-0.5 truncate">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cute Character & Pencil bottom bar */}
      <div className="flex items-center justify-between mt-2 pt-1 border-t border-amber-100">
        <span className="text-[10px] text-amber-700 font-medium">
          תלוי מעל שולחן הלמידה 📌
        </span>
        <div className="flex items-center gap-1">
          <span className="text-xs">🦊</span>
          <span className="text-xs">✏️</span>
          <span className="text-xs">⭐</span>
        </div>
      </div>
    </div>
  );
}

// Master Icon Renderer
export function ResponsibilityIconRenderer({
  type,
  className = 'w-14 h-14',
}: {
  type: string;
  className?: string;
}) {
  switch (type) {
    case 'schedule':
      return <ScheduleIllustration className={className} />;
    case 'clock':
      return <ClockIllustration className={className} />;
    case 'bookmark':
      return <BookmarkIllustration className={className} />;
    case 'room':
      return <RoomIllustration className={className} />;
    case 'weather':
      return <WeatherIllustration className={className} />;
    case 'donation':
      return <DonationIllustration className={className} />;
    case 'homework':
      return <HomeworkIllustration className={className} />;
    case 'backpack':
      return <BackpackIllustration className={className} />;
    default:
      return <ScheduleIllustration className={className} />;
  }
}

