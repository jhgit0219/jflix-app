import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import { environment } from './environment';

const firebaseConfig = environment.firebase;

// Initialize app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// Export Firebase services
export { app };
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null
);
