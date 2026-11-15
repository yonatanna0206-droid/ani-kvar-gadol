import { useState, useEffect, useRef } from 'react';
import type { ChildProfile, ParentSettings, Mission } from './types/adventure';
import { Header, type NavigationTab } from './components/Header';
import { LandscapeBackground } from './components/LandscapeBackground';
import { AdventureSetup } from './components/AdventureSetup';
import { ParentSidebar } from './components/ParentSidebar';
import { JourneyCard } from './components/JourneyCard';
import { ActivityBoard } from './components/ActivityBoard';
import { HomeWorldMissions } from './components/HomeWorldMissions';
import { ResponsibilityWorldMissions } from './components/ResponsibilityWorldMissions';
import { StarsGallery } from './components/StarsGallery';
import { ParentModal } from './components/ParentModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Confetti } from './components/Confetti';
import { sounds } from './utils/soundEffects';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DEFAULT_MISSIONS } from './data/missions';

const STORAGE_KEY_PROFILE = 'i_am_grown_up_profile';
const STORAGE_KEY_SETTINGS = 'i_am_grown_up_settings';
const STORAGE_KEY_MISSIONS = 'i_am_grown_up_missions';

function AppContent() {
  const { user, loadData, saveData } = useAuth();

  // Child profile
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved
        ? JSON.parse(saved)
        : {
            name: 'תמר',
            gender: 'girl',
            age: 6,
            selectedAvatarId: 'simba',
            totalStars: 14,
            dailyStreak: 3,
          };
    } catch {
      return {
        name: 'תמר',
        gender: 'girl',
        age: 6,
        selectedAvatarId: 'simba',
        totalStars: 14,
        dailyStreak: 3,
      };
    }
  });

  // Navigation tab state (defaults to 'home-missions' for Stitch screen 0033030ee6854a5fa49ea27da5ac41ab)
  const [activeTab, setActiveTab] = useState<NavigationTab>('home-missions');

  // Parent settings & modal
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [parentSettings, setParentSettings] = useState<ParentSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved
        ? JSON.parse(saved)
        : {
            screenTimeMinutes: 25,
            isScreenTimeActive: true,
            isMorningReminderActive: true,
            isPositiveReinforcementDaily: true,
            customPraiseMessage: 'גאים בך מאוד! אמא ואבא ❤️',
          };
    } catch {
      return {
        screenTimeMinutes: 25,
        isScreenTimeActive: true,
        isMorningReminderActive: true,
        isPositiveReinforcementDaily: true,
        customPraiseMessage: 'גאים בך מאוד! אמא ואבא ❤️',
      };
    }
  });

  // Missions state
  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MISSIONS);
      return saved ? JSON.parse(saved) : DEFAULT_MISSIONS;
    } catch {
      return DEFAULT_MISSIONS;
    }
  });

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Confetti celebration state
  const [showConfetti, setShowConfetti] = useState(false);

  // Track initial load from cloud to prevent overwriting cloud data immediately on auth
  const isLoadedFromCloudRef = useRef(false);

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (!user) {
      isLoadedFromCloudRef.current = false;
      return;
    }

    let isSubscribed = true;
    (async () => {
      try {
        const cloudData = await loadData();
        if (!isSubscribed) return;

        if (cloudData && cloudData.profile) {
          setProfile(cloudData.profile);
          if (cloudData.parentSettings) setParentSettings(cloudData.parentSettings);
          if (cloudData.missions && cloudData.missions.length > 0) setMissions(cloudData.missions);
        } else {
          // First time user: save current initial state to their new cloud account
          await saveData({ profile, parentSettings, missions });
        }
        isLoadedFromCloudRef.current = true;
      } catch (err) {
        console.warn('Could not sync initial user data with cloud:', err);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, [user, loadData]);

  // Save to LocalStorage and debounced Firestore sync on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parentSettings));
      localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(missions));
    } catch {
      // LocalStorage error ignored
    }

    if (user) {
      const timer = setTimeout(() => {
        saveData({ profile, parentSettings, missions });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [profile, parentSettings, missions, user, saveData]);

  const handleStartAdventure = () => {
    setShowConfetti(true);
    // Switch to Responsibility World Independence Missions!
    setTimeout(() => {
      setActiveTab('responsibility-missions');
    }, 1000);
  };

  const handleCollectStars = (amount: number) => {
    if (amount >= 2) {
      setShowConfetti(true);
    }
  };

  const handleClaimReward = () => {
    setShowConfetti(true);
    sounds.playCelebration();
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-800 antialiased selection:bg-amber-400 selection:text-white">
      {/* Dynamic Animated Sky & Green Hills Landscape */}
      <LandscapeBackground />

      {/* Confetti Celebration Particle FX */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Top Floating Header & Nav Pills */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenParentGate={() => setIsParentModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        avatarId={profile.selectedAvatarId}
        childName={profile.name}
        totalStars={profile.totalStars}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 z-10">
        {activeTab === 'responsibility-missions' && (
          <ResponsibilityWorldMissions
            profile={profile}
            setProfile={setProfile}
            onCollectStars={handleCollectStars}
            onBack={() => setActiveTab('new-adventure')}
            onOpenParentGate={() => setIsParentModalOpen(true)}
          />
        )}
        {activeTab === 'new-adventure' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Right Column in RTL: Adventure Setup Form (8 of 12 cols) */}
            <div className="lg:col-span-8 order-1">
              <AdventureSetup
                profile={profile}
                setProfile={setProfile}
              />
            </div>

            {/* Left Column in RTL: Parent Zone & Journey Card (4 of 12 cols) */}
            <div className="lg:col-span-4 order-2 flex flex-col gap-5 sticky top-24">
              {/* Card 1: אזור להורים בלבד */}
              <ParentSidebar
                onUnlockParentZone={() => setIsParentModalOpen(true)}
                screenTimeActive={parentSettings.isScreenTimeActive}
                morningReminderActive={parentSettings.isMorningReminderActive}
                positiveReinforcementActive={parentSettings.isPositiveReinforcementDaily}
                onToggleScreenTime={() =>
                  setParentSettings((s) => ({ ...s, isScreenTimeActive: !s.isScreenTimeActive }))
                }
                onToggleMorningReminder={() =>
                  setParentSettings((s) => ({
                    ...s,
                    isMorningReminderActive: !s.isMorningReminderActive,
                  }))
                }
                onTogglePositiveReinforcement={() =>
                  setParentSettings((s) => ({
                    ...s,
                    isPositiveReinforcementDaily: !s.isPositiveReinforcementDaily,
                  }))
                }
              />

              {/* Card 2: כרטיס המסע שלך מוכן ומותאם! */}
              <JourneyCard
                profile={profile}
                onStartAdventure={handleStartAdventure}
              />
            </div>
          </div>
        )}

        {activeTab === 'home-missions' && (
          <HomeWorldMissions
            profile={profile}
            setProfile={setProfile}
            onCollectStars={handleCollectStars}
            onBack={() => setActiveTab('new-adventure')}
            onOpenParentGate={() => setIsParentModalOpen(true)}
          />
        )}

        {activeTab === 'activities' && (
          <ActivityBoard
            profile={profile}
            setProfile={setProfile}
            missions={missions}
            setMissions={setMissions}
            onCollectStars={handleCollectStars}
          />
        )}

        {activeTab === 'stars' && (
          <StarsGallery
            profile={profile}
            onClaimReward={handleClaimReward}
          />
        )}
      </main>

      {/* Parent Management Modal */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        settings={parentSettings}
        setSettings={setParentSettings}
        profile={profile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Firebase Cloud Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Footer (hidden when on home-missions since it has its own dedicated Stitch footer) */}
      {activeTab !== 'home-missions' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
