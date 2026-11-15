export { AVATARS_LIST } from './avatarsList';

export function AvatarIllustration({ id, className = "w-16 h-16" }: { id: string; className?: string }) {
  switch (id) {
    case 'simba':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <path d="M50 14 C36 14 26 26 26 40 C18 45 16 58 22 68 C18 78 28 88 40 86 C48 92 60 92 68 85 C80 88 88 78 84 66 C90 55 86 44 80 38 C78 24 64 14 50 14Z" fill="#F59E0B" opacity="0.3" />
          <circle cx="30" cy="30" r="12" fill="#F59E0B" />
          <circle cx="30" cy="30" r="7" fill="#FCD34D" />
          <circle cx="70" cy="30" r="12" fill="#F59E0B" />
          <circle cx="70" cy="30" r="7" fill="#FCD34D" />
          <ellipse cx="50" cy="54" rx="28" ry="24" fill="#FBBF24" />
          <ellipse cx="40" cy="62" rx="9" ry="7" fill="#FEF08A" />
          <ellipse cx="60" cy="62" rx="9" ry="7" fill="#FEF08A" />
          <ellipse cx="39" cy="46" rx="5.5" ry="7.5" fill="#451A03" />
          <circle cx="41" cy="43" r="2.2" fill="#FFFFFF" />
          <ellipse cx="61" cy="46" rx="5.5" ry="7.5" fill="#451A03" />
          <circle cx="63" cy="43" r="2.2" fill="#FFFFFF" />
          <polygon points="50,56 46,52 54,52" fill="#92400E" />
          <path d="M46 60 Q50 64 54 60" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 26 C50 20 54 22 53 28 C55 22 58 24 56 30" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'mickey':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEE2E2" />
          <circle cx="26" cy="28" r="16" fill="#18181B" />
          <circle cx="74" cy="28" r="16" fill="#18181B" />
          <circle cx="50" cy="56" r="24" fill="#18181B" />
          <ellipse cx="43" cy="54" rx="10" ry="15" fill="#FFEDD5" />
          <ellipse cx="57" cy="54" rx="10" ry="15" fill="#FFEDD5" />
          <ellipse cx="50" cy="65" rx="15" ry="10" fill="#FFEDD5" />
          <ellipse cx="45" cy="52" rx="3.5" ry="7" fill="#18181B" />
          <ellipse cx="55" cy="52" rx="3.5" ry="7" fill="#18181B" />
          <ellipse cx="50" cy="63" rx="4.5" ry="3" fill="#18181B" />
          <path d="M42 68 Q50 76 58 68" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'spongebob':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF9C3" />
          <rect x="26" y="24" width="48" height="52" rx="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="33" cy="32" r="3.5" fill="#EAB308" />
          <circle cx="67" cy="34" r="4" fill="#EAB308" />
          <circle cx="68" cy="66" r="3" fill="#EAB308" />
          <circle cx="41" cy="42" r="9" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="41" cy="42" r="4.5" fill="#0284C7" />
          <circle cx="41" cy="42" r="2" fill="#000000" />
          <circle cx="59" cy="42" r="9" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="59" cy="42" r="4.5" fill="#0284C7" />
          <circle cx="59" cy="42" r="2" fill="#000000" />
          <ellipse cx="50" cy="49" rx="3" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M36 56 Q50 67 64 56" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <rect x="46" y="60" width="3.5" height="4.5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
          <rect x="50.5" y="60" width="3.5" height="4.5" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
        </svg>
      );

    case 'princess':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#E0F2FE" />
          <path d="M38 28 L42 35 L50 25 L58 35 L62 28 L60 38 L40 38 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="50" cy="46" r="22" fill="#FDE047" />
          <ellipse cx="34" cy="54" rx="7" ry="12" fill="#FDE047" />
          <ellipse cx="66" cy="54" rx="7" ry="12" fill="#FDE047" />
          <circle cx="50" cy="50" r="16" fill="#FFEDD5" />
          <circle cx="44" cy="48" r="2.5" fill="#0284C7" />
          <circle cx="56" cy="48" r="2.5" fill="#0284C7" />
          <path d="M42 45 L40 43" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M58 45 L60 43" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="41" cy="53" r="2.5" fill="#FDA4AF" opacity="0.6" />
          <circle cx="59" cy="53" r="2.5" fill="#FDA4AF" opacity="0.6" />
          <path d="M47 56 Q50 59 53 56" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M36 72 C42 66 58 66 64 72 L68 85 L32 85 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      );

    case 'spiderman':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEE2E2" />
          <ellipse cx="50" cy="52" rx="24" ry="29" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <path d="M50 23 L50 81" stroke="#991B1B" strokeWidth="1.2" />
          <path d="M26 52 L74 52" stroke="#991B1B" strokeWidth="1.2" />
          <path d="M33 34 L67 70" stroke="#991B1B" strokeWidth="1.2" />
          <path d="M67 34 L33 70" stroke="#991B1B" strokeWidth="1.2" />
          <path d="M36 44 Q46 42 46 53 Q38 57 34 50 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
          <path d="M64 44 Q54 42 54 53 Q62 57 66 50 Z" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
        </svg>
      );

    case 'snowman':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#F0F9FF" />
          <path d="M46 16 L44 10 M50 16 L50 8 M54 16 L56 10" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="50" cy="44" rx="20" ry="24" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <circle cx="43" cy="38" r="4.5" fill="#18181B" />
          <circle cx="44.5" cy="36.5" r="1.5" fill="#FFFFFF" />
          <circle cx="57" cy="38" r="4.5" fill="#18181B" />
          <circle cx="58.5" cy="36.5" r="1.5" fill="#FFFFFF" />
          <polygon points="50,44 72,48 50,49" fill="#EA580C" stroke="#C2410C" strokeWidth="1" />
          <path d="M39 52 Q50 68 61 52 Z" fill="#1E293B" />
          <rect x="47" y="52" width="6" height="5" rx="1" fill="#FFFFFF" />
          <circle cx="50" cy="78" r="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <circle cx="50" cy="74" r="2.5" fill="#18181B" />
        </svg>
      );

    case 'patrick':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FFE4E6" />
          <path d="M50 16 C48 16 38 42 22 48 C30 58 32 68 34 82 L66 82 C68 68 70 58 78 48 C62 42 52 16 50 16 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
          <ellipse cx="45" cy="38" rx="4" ry="6" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.2" />
          <circle cx="45" cy="38" r="1.8" fill="#18181B" />
          <ellipse cx="55" cy="38" rx="4" ry="6" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.2" />
          <circle cx="55" cy="38" r="1.8" fill="#18181B" />
          <path d="M43 49 Q50 56 57 49" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" />
          <rect x="34" y="74" width="32" height="10" rx="3" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1.5" />
          <circle cx="44" cy="79" r="2" fill="#A855F7" />
          <circle cx="56" cy="79" r="2" fill="#A855F7" />
        </svg>
      );

    case 'tweety':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF08A" />
          <circle cx="50" cy="46" r="24" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M50 22 C49 14 47 16 46 12" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <path d="M52 22 C53 14 55 16 56 12" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="42" cy="44" rx="7" ry="11" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
          <ellipse cx="43" cy="45" rx="4" ry="7" fill="#0284C7" />
          <ellipse cx="43" cy="45" rx="2" ry="4" fill="#000000" />
          <ellipse cx="58" cy="44" rx="7" ry="11" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1" />
          <ellipse cx="58" cy="45" rx="4" ry="7" fill="#0284C7" />
          <ellipse cx="58" cy="45" rx="2" ry="4" fill="#000000" />
          <ellipse cx="50" cy="56" rx="4.5" ry="3" fill="#F97316" stroke="#C2410C" strokeWidth="1" />
          <path d="M47 57 Q50 61 53 57" stroke="#C2410C" strokeWidth="1.5" />
        </svg>
      );

    case 'giraffe':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FFEDD5" />
          <line x1="42" y1="26" x2="38" y2="16" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <circle cx="37" cy="15" r="3" fill="#92400E" />
          <line x1="58" y1="26" x2="62" y2="16" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <circle cx="63" cy="15" r="3" fill="#92400E" />
          <ellipse cx="50" cy="46" rx="18" ry="22" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <circle cx="40" cy="34" r="3" fill="#B45309" />
          <circle cx="58" cy="38" r="4" fill="#B45309" />
          <ellipse cx="30" cy="34" rx="6" ry="3.5" transform="rotate(-30 30 34)" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <ellipse cx="70" cy="34" rx="6" ry="3.5" transform="rotate(30 70 34)" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <circle cx="43" cy="44" r="3.5" fill="#451A03" />
          <circle cx="44" cy="43" r="1.2" fill="#FFFFFF" />
          <circle cx="57" cy="44" r="3.5" fill="#451A03" />
          <circle cx="58" cy="43" r="1.2" fill="#FFFFFF" />
          <ellipse cx="50" cy="58" rx="12" ry="8" fill="#FDE68A" />
          <circle cx="46" cy="56" r="1.2" fill="#78350F" />
          <circle cx="54" cy="56" r="1.2" fill="#78350F" />
          <path d="M47 60 Q50 63 53 60" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'arikele':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FEF3C7" />
          <circle cx="50" cy="50" r="30" fill="#EA580C" />
          <circle cx="50" cy="50" r="22" fill="#FDE047" />
          <circle cx="34" cy="28" r="6" fill="#F59E0B" />
          <circle cx="66" cy="28" r="6" fill="#F59E0B" />
          <circle cx="43" cy="46" r="3" fill="#18181B" />
          <circle cx="57" cy="46" r="3" fill="#18181B" />
          <polygon points="50,52 47,49 53,49" fill="#B45309" />
          <path d="M43 56 Q50 64 57 56" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="52" r="3" fill="#F87171" opacity="0.6" />
          <circle cx="62" cy="52" r="3" fill="#F87171" opacity="0.6" />
        </svg>
      );

    case 'poppy':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FCE7F3" />
          <path d="M50 10 C40 18 30 28 34 50 C44 54 56 54 66 50 C70 28 60 18 50 10 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
          <rect x="34" y="46" width="32" height="5" rx="2.5" fill="#22C55E" />
          <circle cx="42" cy="46" r="3.5" fill="#38BDF8" />
          <circle cx="50" cy="45" r="4" fill="#38BDF8" />
          <circle cx="58" cy="46" r="3.5" fill="#38BDF8" />
          <ellipse cx="50" cy="62" rx="18" ry="16" fill="#F472B6" />
          <circle cx="44" cy="60" r="3" fill="#831843" />
          <circle cx="56" cy="60" r="3" fill="#831843" />
          <ellipse cx="50" cy="65" rx="3" ry="2" fill="#DB2777" />
          <path d="M44 69 Q50 75 56 69" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'skye':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#FDF2F8" />
          <rect x="32" y="24" width="16" height="12" rx="6" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
          <rect x="52" y="24" width="16" height="12" rx="6" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
          <rect x="46" y="28" width="8" height="4" fill="#BE185D" />
          <ellipse cx="26" cy="48" rx="8" ry="16" transform="rotate(15 26 48)" fill="#D97706" />
          <ellipse cx="74" cy="48" rx="8" ry="16" transform="rotate(-15 74 48)" fill="#D97706" />
          <ellipse cx="50" cy="54" rx="20" ry="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="43" cy="50" rx="4" ry="5.5" fill="#E11D48" />
          <circle cx="44" cy="48" r="1.5" fill="#FFFFFF" />
          <ellipse cx="57" cy="50" rx="4" ry="5.5" fill="#E11D48" />
          <circle cx="58" cy="48" r="1.5" fill="#FFFFFF" />
          <polygon points="50,60 46,56 54,56" fill="#881337" />
          <path d="M46 63 Q50 66 54 63" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <div className={`rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 ${className}`}>
          🌟
        </div>
      );
  }
}
