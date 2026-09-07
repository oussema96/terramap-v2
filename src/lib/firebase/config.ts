import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_He4JR-UMbuzk8iH9nwJ0Rfs115Nckgk",
  authDomain: "terralink-5b44a.firebaseapp.com",
  projectId: "terralink-5b44a",
  storageBucket: "terralink-5b44a.firebasestorage.app",
  messagingSenderId: "942497011029",
  appId: "1:942497011029:web:00f63bf2299660017d0bdc",
  measurementId: "G-C3D6MX9RLJ"
};

// Initialize Firebase only if it hasn't been initialized already (fixes Next.js hot reload issues)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
