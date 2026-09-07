import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import type { AuthProvider, AuthResult, AuthUser, LoginCredentials, SignupCredentials } from '@/types/auth';

/**
 * Firebase authentication provider.
 *
 * To activate:
 * 1. Enable Email/Password auth in Firebase Console → Authentication → Sign-in method
 * 2. In `src/lib/auth/authService.ts`, change the provider from MockAuthProvider to FirebaseAuthProvider
 *
 * Environment variables (optional, if you move config out of config.ts):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 */
export class FirebaseAuthProvider implements AuthProvider {
  private mapFirebaseUser(fbUser: { uid: string; email: string | null; displayName: string | null }): AuthUser {
    return {
      id: fbUser.uid,
      email: fbUser.email ?? '',
      displayName: fbUser.displayName,
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      return { success: true, user: this.mapFirebaseUser(result.user) };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      return { success: false, error: this.friendlyError(message) };
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResult> {
    try {
      const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

      // Set displayName
      if (credentials.fullName) {
        await updateProfile(result.user, { displayName: credentials.fullName });
      }

      return {
        success: true,
        user: {
          id: result.user.uid,
          email: result.user.email ?? '',
          displayName: credentials.fullName,
        },
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      return { success: false, error: this.friendlyError(message) };
    }
  }

  async resetPassword(email: string): Promise<AuthResult> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Password reset failed.';
      return { success: false, error: this.friendlyError(message) };
    }
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  getCurrentUser(): AuthUser | null {
    const user = auth.currentUser;
    if (!user) return null;
    return this.mapFirebaseUser(user);
  }

  /** Map Firebase error codes to user-friendly messages */
  private friendlyError(message: string): string {
    if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
      return 'Invalid email or password. Please try again.';
    }
    if (message.includes('auth/email-already-in-use')) {
      return 'An account with this email already exists.';
    }
    if (message.includes('auth/weak-password')) {
      return 'Password is too weak. Please use at least 8 characters.';
    }
    if (message.includes('auth/invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (message.includes('auth/too-many-requests')) {
      return 'Too many attempts. Please try again later.';
    }
    return message;
  }
}
