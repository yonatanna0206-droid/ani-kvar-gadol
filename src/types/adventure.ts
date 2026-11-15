export type Gender = 'girl' | 'boy';

export interface AvatarItem {
  id: string;
  name: string;
  trait: string;
  category?: string;
  color: string;
  accentColor: string;
  iconName: string;
}

export interface ChildProfile {
  name: string;
  gender: Gender;
  age: number | string;
  selectedAvatarId: string;
  totalStars: number;
  dailyStreak: number;
}

export interface Mission {
  id: string;
  title: string;
  category: 'morning' | 'day' | 'evening';
  stars: number;
  completed: boolean;
  icon: string;
}

export interface ParentSettings {
  screenTimeMinutes: number;
  isScreenTimeActive: boolean;
  isMorningReminderActive: boolean;
  isPositiveReinforcementDaily: boolean;
  customPraiseMessage: string;
}

export interface UserData {
  profile: ChildProfile;
  parentSettings: ParentSettings;
  missions: Mission[];
  updatedAt?: string | null;
}

