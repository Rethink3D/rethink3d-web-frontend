import {
  signInWithEmailAndPassword,
  type User,
  signOut as firebaseSignOut,
  OAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import { isAxiosError } from "axios";
import api from "./api";

export interface FirebaseUserData {
  name: string | null;
  email: string | null;
  photo: string | null;
  fireBaseUid: string;
}

export const SessionStatus = {
  COMPLETE: "COMPLETE",
  INCOMPLETE_PROFILE: "INCOMPLETE_PROFILE",
} as const;

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];

export interface SessionResult {
  status: SessionStatus;
  firebaseUserData?: FirebaseUserData;
}

export class AuthService {
  public async signInWithEmail(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  }

  public async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }

  public async signInWithApple(): Promise<User> {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }

  public async checkSessionStatus(user: User): Promise<SessionResult> {
    try {
      const response = await api.get("/users/profile");

      if (response.data && response.data.makerId) {
        return { status: SessionStatus.COMPLETE };
      }

      return { status: SessionStatus.INCOMPLETE_PROFILE };
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        (error.response.status === 404 || error.response.status === 401)
      ) {
        return {
          status: SessionStatus.INCOMPLETE_PROFILE,
          firebaseUserData: {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            fireBaseUid: user.uid,
          },
        };
      }
      throw error;
    }
  }

  public async signOut() {
    await firebaseSignOut(auth);
  }
}

export const authService = new AuthService();
