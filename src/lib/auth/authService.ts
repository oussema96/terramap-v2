import type { AuthProvider } from '@/types/auth';
import { MockAuthProvider } from './mockAuthProvider';
// import { FirebaseAuthProvider } from './firebaseAuthProvider';

/**
 * Authentication service singleton.
 *
 * To switch to real Firebase authentication:
 * 1. Uncomment the FirebaseAuthProvider import above
 * 2. Change the line below to: const authService: AuthProvider = new FirebaseAuthProvider();
 * 3. Enable Email/Password auth in your Firebase Console
 */
const authService: AuthProvider = new MockAuthProvider();
// const authService: AuthProvider = new FirebaseAuthProvider();

export { authService };
