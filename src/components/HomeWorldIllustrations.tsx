interface IllustrationProps {
  className?: string;
  size?: number;
}

export function SandwichIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Toast Crust */}
      <rect x="18" y="24" width="64" height="60" rx="14" fill="#D97706" />
      <rect x="20" y="22" width="60" height="58" rx="12" fill="#FDE68A" />
      {/* Inner Toast Bread */}
      <rect x="23" y="25" width="54" height="52" rx="10" fill="#FEF3C7" />

      {/* Lettuce Frills */}
      <path
        d="M15 48C12 45 14 38 18 39C22 40 25 36 29 38C33 40 37 36 41 38C46 40 48 35 53 37C58 39 61 35 66 37C71 39 74 35 79 38C84 41 87 46 84 49C81 52 75 51 72 49C68 47 64 50 60 48C56 46 52 50 48 48C44 46 40 50 36 48C32 46 28 50 24 48C20 46 17 50 15 48Z"
        fill="#22C55E"
      />

      {/* Cheddar Cheese Slice */}
      <polygon points="22,54 78,52 82,62 18,60" fill="#F59E0B" />
      <polygon points="50,60 56,70 64,60" fill="#FBBF24" />

      {/* Tomato slices */}
      <circle cx="32" cy="45" r="8" fill="#EF4444" />
      <circle cx="32" cy="45" r="5" fill="#DC2626" />
      <circle cx="68" cy="44" r="8" fill="#EF4444" />
      <circle cx="68" cy="44" r="5" fill="#DC2626" />

      {/* Eyes with catchlights */}
      <ellipse cx="38" cy="42" rx="4" ry="5.5" fill="#1E293B" />
      <circle cx="39.5" cy="40.5" r="1.8" fill="white" />
      <ellipse cx="62" cy="42" rx="4" ry="5.5" fill="#1E293B" />
      <circle cx="63.5" cy="40.5" r="1.8" fill="white" />

      {/* Rosy Blush Cheeks */}
      <circle cx="30" cy="49" r="4.5" fill="#F43F5E" opacity="0.4" />
      <circle cx="70" cy="49" r="4.5" fill="#F43F5E" opacity="0.4" />

      {/* Cute Smile */}
      <path
        d="M44 48C44 53 56 53 56 48"
        stroke="#1E293B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tongue */}
      <path
        d="M48 50C48 52.5 52 52.5 52 50Z"
        fill="#F43F5E"
      />

      {/* Waving Hands */}
      <ellipse cx="14" cy="54" rx="4.5" ry="3.5" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
      <ellipse cx="86" cy="54" rx="4.5" ry="3.5" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />

      {/* Sparkles */}
      <path d="M78 16L80 21L85 23L80 25L78 30L76 25L71 23L76 21L78 16Z" fill="#F59E0B" />
      <circle cx="22" cy="18" r="2.5" fill="#FBBF24" />
    </svg>
  );
}

export function FridgeIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fridge Body */}
      <rect x="22" y="14" width="56" height="74" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
      <rect x="26" y="18" width="48" height="26" rx="6" fill="#F8FAFC" />
      <rect x="26" y="48" width="48" height="34" rx="6" fill="#F1F5F9" />

      {/* Divider */}
      <line x1="22" y1="46" x2="78" y2="46" stroke="#94A3B8" strokeWidth="2.5" />

      {/* Handles */}
      <rect x="30" y="24" width="4" height="14" rx="2" fill="#3B82F6" />
      <rect x="30" y="52" width="4" height="20" rx="2" fill="#3B82F6" />

      {/* Inside items hint */}
      <rect x="42" y="26" width="7" height="12" rx="2" fill="#38BDF8" />
      <rect x="52" y="24" width="8" height="14" rx="2" fill="#FB923C" />
      <circle cx="67" cy="32" r="4.5" fill="#22C55E" />

      <rect x="38" y="56" width="10" height="16" rx="2" fill="#A855F7" />
      <rect x="52" y="60" width="18" height="12" rx="3" fill="#FCD34D" />

      {/* Magnets on door */}
      <circle cx="72" cy="24" r="2.5" fill="#EF4444" />
      <polygon points="68,52 71,57 65,57" fill="#EAB308" />

      {/* Ice Frost Sparkle */}
      <path d="M16 26L18 31L23 33L18 35L16 40L14 35L9 33L14 31L16 26Z" fill="#38BDF8" />
      <path d="M84 40L85.5 43.5L89 45L85.5 46.5L84 50L82.5 46.5L79 45L82.5 43.5L84 40Z" fill="#60A5FA" />
    </svg>
  );
}

export function TshirtIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue T-Shirt */}
      <path
        d="M32 20C36 26 44 28 50 28C56 28 64 26 68 20L84 32L74 44L68 38V78C68 81 65 83 62 83H38C35 83 32 81 32 78V38L26 44L16 32L32 20Z"
        fill="#3B82F6"
        stroke="#1D4ED8"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Collar */}
      <path
        d="M40 21C42 27 58 27 60 21"
        stroke="#1D4ED8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Fold lines / Stitch details */}
      <path d="M42 42L42 75" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M58 42L58 75" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" />
      {/* Clean sparkles */}
      <path d="M82 18L84 22L88 24L84 26L82 30L80 26L76 24L80 22L82 18Z" fill="#FBBF24" />
      <circle cx="20" cy="56" r="2.5" fill="#60A5FA" />
      <circle cx="80" cy="68" r="3" fill="#FDE047" />
    </svg>
  );
}

export function BedIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Headboard */}
      <rect x="16" y="24" width="14" height="54" rx="4" fill="#B45309" />
      {/* Footboard */}
      <rect x="74" y="44" width="12" height="34" rx="4" fill="#B45309" />

      {/* Bed Base & Mattress */}
      <rect x="26" y="48" width="52" height="18" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      {/* Cozy Blanket */}
      <path
        d="M38 52H76C77.1046 52 78 52.8954 78 54V66H34V56C34 53.7909 35.7909 52 38 52Z"
        fill="#F97316"
      />
      <path d="M34 52H46V66H34V52Z" fill="#FDBA74" />

      {/* Fluffy Pillow */}
      <rect x="25" y="42" width="16" height="12" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Bed Legs */}
      <rect x="18" y="76" width="6" height="8" rx="2" fill="#78350F" />
      <rect x="76" y="76" width="6" height="8" rx="2" fill="#78350F" />

      {/* Teddy Bear on bed */}
      <circle cx="62" cy="46" r="6" fill="#D97706" />
      <circle cx="58" cy="41" r="2.5" fill="#D97706" />
      <circle cx="66" cy="41" r="2.5" fill="#D97706" />
      <circle cx="61" cy="45" r="0.8" fill="#1E293B" />
      <circle cx="63" cy="45" r="0.8" fill="#1E293B" />
      <circle cx="62" cy="48" r="1" fill="#78350F" />
    </svg>
  );
}

export function ChocolateIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chocolate Bar Body */}
      <g transform="rotate(-15 50 50)">
        {/* Red & Silver Wrapper */}
        <rect x="30" y="38" width="38" height="42" rx="4" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
        <rect x="30" y="32" width="38" height="10" fill="#E2E8F0" />
        {/* Shiny foil zigzag */}
        <path d="M30 32L34 36L38 32L42 36L46 32L50 36L54 32L58 36L62 32L66 36L68 32" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Exposed Chocolate blocks */}
        <rect x="32" y="16" width="34" height="18" rx="2" fill="#581C87" stroke="#3B0764" strokeWidth="1.5" />
        {/* 6 individual squares */}
        <rect x="34" y="18" width="9" height="7" rx="1.5" fill="#7E22CE" />
        <rect x="45" y="18" width="9" height="7" rx="1.5" fill="#7E22CE" />
        <rect x="56" y="18" width="9" height="7" rx="1.5" fill="#7E22CE" />
        <rect x="34" y="26" width="9" height="7" rx="1.5" fill="#6B21A8" />
        <rect x="45" y="26" width="9" height="7" rx="1.5" fill="#6B21A8" />
        <rect x="56" y="26" width="9" height="7" rx="1.5" fill="#6B21A8" />
      </g>

      {/* Chocolate Truffle Balls nearby */}
      <circle cx="76" cy="74" r="8" fill="#78350F" />
      <circle cx="76" cy="74" r="7" fill="#92400E" />
      {/* Colorful Sprinkles */}
      <line x1="73" y1="72" x2="75" y2="72" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="77" y1="71" x2="79" y2="73" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="74" y1="76" x2="76" y2="77" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="75" x2="79" y2="76" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />

      {/* Magic stars */}
      <path d="M18 24L20 28L24 30L20 32L18 36L16 32L12 30L16 28L18 24Z" fill="#F43F5E" />
    </svg>
  );
}

export function LemonadeIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glass */}
      <path
        d="M32 28L38 80C38.5 83 41 85 44 85H58C61 85 63.5 83 64 80L70 28H32Z"
        fill="#FEF08A"
        stroke="#EAB308"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Lemonade Liquid */}
      <path
        d="M34 38L38.5 78C39 80 40.5 81.5 42.5 81.5H57.5C59.5 81.5 61 80 61.5 78L66 38H34Z"
        fill="#FACC15"
      />

      {/* Ice Cubes */}
      <rect x="42" y="44" width="10" height="10" rx="2" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="1" />
      <rect x="48" y="58" width="11" height="11" rx="2" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="1" />

      {/* Striped Straw */}
      <line x1="56" y1="12" x2="48" y2="75" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="56" y1="12" x2="48" y2="75" stroke="#FDE047" strokeWidth="4.5" strokeDasharray="5 5" strokeLinecap="round" />

      {/* Lemon Wheel on Rim */}
      <circle cx="68" cy="28" r="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="68" cy="28" r="11" fill="#FEF08A" />
      {/* Lemon Wedges */}
      <path d="M68 28L63 20" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M68 28L73 20" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M68 28L76 28" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M68 28L73 36" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M68 28L63 36" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M68 28L60 28" stroke="#CA8A04" strokeWidth="1.5" />

      {/* Mint Leaf */}
      <path d="M64 16C64 12 60 10 56 12C56 16 60 18 64 16Z" fill="#22C55E" />

      {/* Cheerful Bubbles */}
      <circle cx="43" cy="70" r="2" fill="#FEF9C3" />
      <circle cx="58" cy="48" r="2.5" fill="#FEF9C3" />
      <circle cx="40" cy="52" r="1.5" fill="#FEF9C3" />
    </svg>
  );
}

export function SocksIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Sock */}
      <path
        d="M26 18H40V48C40 54 36 62 44 68L50 74C53 77 52 82 48 83L42 84C35 84 26 78 26 68V18Z"
        fill="#EF4444"
        stroke="#B91C1C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Left Sock Stripes */}
      <rect x="26" y="24" width="14" height="4" fill="#FEF08A" />
      <rect x="26" y="34" width="14" height="4" fill="#FEF08A" />
      {/* Left Heel & Toe */}
      <circle cx="27" cy="67" r="5" fill="#FDE047" />
      <circle cx="48" cy="81" r="4.5" fill="#FDE047" />

      {/* Right Sock */}
      <path
        d="M58 18H72V48C72 54 68 62 76 68L82 74C85 77 84 82 80 83L74 84C67 84 58 78 58 68V18Z"
        fill="#EF4444"
        stroke="#B91C1C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Right Sock Stripes */}
      <rect x="58" y="24" width="14" height="4" fill="#FEF08A" />
      <rect x="58" y="34" width="14" height="4" fill="#FEF08A" />
      {/* Right Heel & Toe */}
      <circle cx="59" cy="67" r="5" fill="#FDE047" />
      <circle cx="80" cy="81" r="4.5" fill="#FDE047" />

      {/* Magic Sparkles */}
      <path d="M14 38L16 41L19 42L16 43L14 46L12 43L9 42L12 41L14 38Z" fill="#A855F7" />
      <path d="M86 30L88 33L91 34L88 35L86 38L84 35L81 34L84 33L86 30Z" fill="#A855F7" />
    </svg>
  );
}

export function RecycleIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue Bin */}
      <path d="M18 42L22 78H36L40 42H18Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="16" y="38" width="26" height="5" rx="2" fill="#60A5FA" />
      <circle cx="29" cy="58" r="4" fill="white" opacity="0.8" />

      {/* Orange Bin */}
      <path d="M40 40L44 78H58L62 40H40Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <rect x="38" y="36" width="26" height="5" rx="2" fill="#FB923C" />
      <circle cx="51" cy="57" r="4" fill="white" opacity="0.8" />

      {/* Green Bin */}
      <path d="M62 42L66 78H80L84 42H62Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <rect x="60" y="38" width="26" height="5" rx="2" fill="#34D399" />
      <circle cx="73" cy="58" r="4" fill="white" opacity="0.8" />

      {/* Smiling Happy Earth / Kids Badge */}
      <circle cx="50" cy="22" r="14" fill="#34D399" stroke="#059669" strokeWidth="2" />
      <path d="M44 19C45 15 50 14 53 16C55 18 58 17 60 21C58 24 53 25 50 24C46 25 43 23 44 19Z" fill="#3B82F6" />
      <circle cx="46" cy="21" r="1.5" fill="#1E293B" />
      <circle cx="54" cy="21" r="1.5" fill="#1E293B" />
      <path d="M47 26C47 29 53 29 53 26" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Leaves */}
      <path d="M26 22C26 18 30 16 34 18C34 22 30 24 26 22Z" fill="#10B981" />
      <path d="M74 22C74 18 70 16 66 18C66 22 70 24 74 22Z" fill="#10B981" />
    </svg>
  );
}

export function BasketIllustration({ className = 'w-14 h-14', size }: IllustrationProps) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Woven Wicker Basket */}
      <path
        d="M20 44L28 78C29 82 32 84 36 84H64C68 84 71 82 72 78L80 44H20Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Basket Rim */}
      <ellipse cx="50" cy="44" rx="31" ry="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />

      {/* Basket Weave Pattern */}
      <path d="M28 54H72" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M31 64H69" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M34 74H66" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="40" y1="48" x2="44" y2="82" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="50" y1="48" x2="50" y2="82" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="60" y1="48" x2="56" y2="82" stroke="#B45309" strokeWidth="2" strokeDasharray="4 4" />

      {/* Items popping out of basket */}
      {/* Blue folded towel / book */}
      <rect x="30" y="32" width="16" height="14" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      {/* Pink teddy bear head */}
      <circle cx="58" cy="34" r="8" fill="#F472B6" />
      <circle cx="52" cy="28" r="3" fill="#F472B6" />
      <circle cx="64" cy="28" r="3" fill="#F472B6" />
      <circle cx="56" cy="33" r="1" fill="#831843" />
      <circle cx="60" cy="33" r="1" fill="#831843" />
      <ellipse cx="58" cy="36" rx="2" ry="1.5" fill="#BE185D" />

      {/* Handle */}
      <path
        d="M24 44C24 22 76 22 76 44"
        stroke="#92400E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Sparkles */}
      <path d="M82 22L84 25L87 26L84 27L82 30L80 27L77 26L80 25L82 22Z" fill="#FBBF24" />
    </svg>
  );
}

export function MissionIconRenderer({
  type,
  className = 'w-14 h-14',
  size,
}: {
  type: string;
  className?: string;
  size?: number;
}) {
  switch (type) {
    case 'sandwich':
      return <SandwichIllustration className={className} size={size} />;
    case 'fridge':
      return <FridgeIllustration className={className} size={size} />;
    case 'tshirt':
      return <TshirtIllustration className={className} size={size} />;
    case 'bed':
      return <BedIllustration className={className} size={size} />;
    case 'chocolate':
      return <ChocolateIllustration className={className} size={size} />;
    case 'lemonade':
      return <LemonadeIllustration className={className} size={size} />;
    case 'socks':
      return <SocksIllustration className={className} size={size} />;
    case 'recycle':
      return <RecycleIllustration className={className} size={size} />;
    case 'basket':
      return <BasketIllustration className={className} size={size} />;
    default:
      return <SandwichIllustration className={className} size={size} />;
  }
}

