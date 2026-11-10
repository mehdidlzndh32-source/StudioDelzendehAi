import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const runtimeConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId || '',
  databaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || '',
};

const hasRequiredConfig = Boolean(
  runtimeConfig.apiKey &&
    runtimeConfig.authDomain &&
    runtimeConfig.projectId &&
    runtimeConfig.appId,
);

export const firebaseConfigured = hasRequiredConfig;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (hasRequiredConfig) {
  app = getApps().length > 0 ? getApp() : initializeApp({
    apiKey: runtimeConfig.apiKey,
    authDomain: runtimeConfig.authDomain,
    projectId: runtimeConfig.projectId,
    storageBucket: runtimeConfig.storageBucket || undefined,
    messagingSenderId: runtimeConfig.messagingSenderId || undefined,
    appId: runtimeConfig.appId,
  });

  auth = getAuth(app);
  db = getFirestore(app, runtimeConfig.databaseId || undefined);
}

export { app, auth, db };

export async function validateFirestoreConnection(): Promise<boolean> {
  if (!db) {
    console.warn('Firebase is not configured. Firestore connectivity check skipped.');
    return false;
  }

  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection warning: client is offline or network restricted.');
      return false;
    }

    return true;
  }
}
