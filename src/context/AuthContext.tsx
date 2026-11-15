import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { fetchUserData, saveUserDataToFirestore } from '../services/userDataService';
import type { UserData, ChildProfile, ParentSettings, Mission } from '../types/adventure';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isFirebaseConnected: boolean;
  syncStatus: SyncStatus;
  lastSavedAt: Date | null;
  errorMessage: string | null;
  watchlist: string[];
  toggleWatchlist: (id: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  saveData: (data: { profile: ChildProfile; parentSettings: ParentSettings; missions: Mission[] }) => Promise<void>;
  loadData: () => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const toggleWatchlist = async (id: string) => {
    setWatchlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Keep a ref to the latest user to avoid stale closures in debounced saves
  const userRef = useRef<User | null>(null);
  userRef.current = user;

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase אינו מוגדר כראוי.');
    }
    setErrorMessage(null);
    const credential = await signInWithEmailAndPassword(auth, email, pass);
    setUser(credential.user);
  };

  const signup = async (email: string, pass: string, name: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase אינו מוגדר כראוי.');
    }
    setErrorMessage(null);
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (name.trim()) {
      await updateProfile(res.user, { displayName: name.trim() });
    }
    setUser(res.user);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setUser(null);
    setSyncStatus('idle');
  };

  const loadData = useCallback(async (): Promise<UserData | null> => {
    if (!userRef.current) return null;
    try {
      setSyncStatus('syncing');
      const cloudData = await fetchUserData(userRef.current.uid);
      setSyncStatus(cloudData ? 'synced' : 'idle');
      return cloudData;
    } catch (err) {
      console.error('Error loading cloud data:', err);
      setSyncStatus('error');
      return null;
    }
  }, []);

  const saveData = useCallback(
    async (data: { profile: ChildProfile; parentSettings: ParentSettings; missions: Mission[] }) => {
      if (!userRef.current) {
        return;
      }
      try {
        setSyncStatus('syncing');
        await saveUserDataToFirestore(userRef.current.uid, {
          ...data,
          email: userRef.current.email,
          displayName: userRef.current.displayName,
        });
        setSyncStatus('synced');
        setLastSavedAt(new Date());
      } catch (err: unknown) {
        console.error('Error saving data to Firestore:', err);
        setSyncStatus('error');
        if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseConnected: isFirebaseConfigured,
        syncStatus,
        lastSavedAt,
        errorMessage,
        watchlist,
        toggleWatchlist,
        login,
        signup,
        logout,
        saveData,
        loadData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
