import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { UserData, ChildProfile, ParentSettings, Mission } from '../types/adventure';

export const USER_DATA_STORAGE_KEY = 'i_am_grown_up_user_data';

export async function fetchUserData(uid: string): Promise<UserData | null> {
  if (!db) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        profile: data.profile as ChildProfile,
        parentSettings: data.parentSettings as ParentSettings,
        missions: (data.missions || []) as Mission[],
        updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt || null,
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user data from Firestore:', error);
    return null;
  }
}

export async function saveUserDataToFirestore(
  uid: string,
  data: {
    profile: ChildProfile;
    parentSettings: ParentSettings;
    missions: Mission[];
    email?: string | null;
    displayName?: string | null;
  }
): Promise<void> {
  if (!db) {
    console.warn('Firestore is not initialized. Skipping cloud save.');
    return;
  }
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(
      userDocRef,
      {
        profile: data.profile,
        parentSettings: data.parentSettings,
        missions: data.missions,
        email: data.email || null,
        displayName: data.displayName || null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to save user data to Firestore:', error);
    throw error;
  }
}

