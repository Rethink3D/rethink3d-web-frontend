import React, { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import { authService, SessionStatus } from "../services/authService";
import { PrinterLoader } from "../components/ui/PrinterLoader";
import { AuthContext } from "./useAuth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const session = await authService.checkSessionStatus(firebaseUser);
          if (session.status === SessionStatus.INCOMPLETE_PROFILE) {
            await authService.signOut();
            setUser(null);
          } else {
            setUser(firebaseUser);
          }
        } catch (error) {
          console.error("Error checking session status:", error);
          await authService.signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, pass: string) => {
    const firebaseUser = await authService.signInWithEmail(email, pass);
    const session = await authService.checkSessionStatus(firebaseUser);

    if (session.status === SessionStatus.INCOMPLETE_PROFILE) {
      
      
      
      
      throw new Error("INCOMPLETE_PROFILE");
    }
  };

  const signOut = async () => {
    await authService.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signInWithGoogle: async () => {
          const firebaseUser = await authService.signInWithGoogle();
          const session = await authService.checkSessionStatus(firebaseUser);
          if (session.status === SessionStatus.INCOMPLETE_PROFILE) {
            throw new Error("INCOMPLETE_PROFILE");
          }
        },
        signInWithApple: async () => {
          const firebaseUser = await authService.signInWithApple();
          const session = await authService.checkSessionStatus(firebaseUser);
          if (session.status === SessionStatus.INCOMPLETE_PROFILE) {
            throw new Error("INCOMPLETE_PROFILE");
          }
        },
        signOut,
      }}
    >
      {loading ? <PrinterLoader /> : children}
    </AuthContext.Provider>
  );
};
