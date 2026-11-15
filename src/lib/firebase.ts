import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCVcR8h5j46rcrHNiq9kp3XQCzH3OVLtSI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'i-am-all-grown-up.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'i-am-all-grown-up',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'i-am-all-grown-up.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '339789893481',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:339789893481:web:9d3fec84f841bf74af37f8',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-MPK3BYPW04',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let app: FirebaseApp | undefined;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics if supported in the current environment
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch((err) => {
        console.warn('Firebase Analytics not supported in this environment:', err);
      });
    }

    console.info('Firebase initialized successfully for i-am-all-grown-up.');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.info('Firebase credentials not configured.');
}

export { app, auth, db, analytics };
