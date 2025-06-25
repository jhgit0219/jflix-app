import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';
import { environment } from './environment';

// Use `environment.firebase` to pull config cleanly
const firebaseConfig = environment.firebase;

// Initialize Firebase app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export Firebase features
export { app };
export const storage = getStorage(app);
export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null
);
