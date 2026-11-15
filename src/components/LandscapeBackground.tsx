export function LandscapeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2563eb] via-[#38bdf8] to-[#bae6fd]" />

      {/* Fluffy Animated Clouds */}
      <div className="absolute top-6 left-12 opacity-80 cloud-float-1">
        <svg width="220" height="90" viewBox="0 0 220 90" fill="#FFFFFF">
          <ellipse cx="60" cy="55" rx="45" ry="30" />
          <ellipse cx="110" cy="40" rx="55" ry="38" />
          <ellipse cx="165" cy="52" rx="45" ry="28" />
          <rect x="25" y="55" width="170" height="25" rx="12" />
        </svg>
      </div>

      <div className="absolute top-20 right-20 opacity-70 cloud-float-2">
        <svg width="280" height="110" viewBox="0 0 280 110" fill="#FFFFFF">
          <ellipse cx="80" cy="70" rx="55" ry="35" />
          <ellipse cx="145" cy="50" rx="70" ry="48" />
          <ellipse cx="215" cy="68" rx="55" ry="34" />
          <rect x="35" y="70" width="215" height="30" rx="15" />
        </svg>
      </div>

      <div className="absolute top-44 left-1/3 opacity-60 cloud-float-1">
        <svg width="180" height="70" viewBox="0 0 180 70" fill="#FFFFFF">
          <ellipse cx="50" cy="45" rx="35" ry="22" />
          <ellipse cx="90" cy="35" rx="45" ry="28" />
          <ellipse cx="135" cy="42" rx="35" ry="20" />
          <rect x="20" y="45" width="135" height="20" rx="10" />
        </svg>
      </div>

      {/* Sun glow in the distance */}
      <div className="absolute top-10 right-1/4 w-32 h-32 rounded-full bg-yellow-200/30 blur-2xl" />

      {/* Distant Hills Layer */}
      <div className="absolute bottom-28 left-0 right-0 h-96">
        <svg viewBox="0 0 1440 320" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            fill="#4ade80"
            fillOpacity="0.4"
            d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,240C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Mid Hills Layer with Trees */}
      <div className="absolute bottom-12 left-0 right-0 h-80">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#22c55e"
            fillOpacity="0.75"
            d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,213.3C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      {/* Fore-green Meadow Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-44">
        <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#16a34a"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"
          />
        </svg>
      </div>

      {/* Subtle Grass and Flower Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#15803d] to-transparent opacity-60" />
    </div>
  );
}
