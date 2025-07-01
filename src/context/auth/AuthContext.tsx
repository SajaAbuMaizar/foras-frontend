"use client";

import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContextType, User } from "./types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { logout, fetchUser } from "./authService";

export const AuthContext = createContext<AuthContextType>({} as any);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser,
}) => {
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // If we have an initialUser (either null or a user object), we're initialized
    if (initialUser !== undefined) {
      setIsInitialized(true);
      return;
    }

    // Otherwise, fetch the user client-side
    const initializeAuth = async () => {
      try {
        const res = await fetchUser();
        setUser(res);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [initialUser]);

  const refreshUser = async () => {
    try {
      const res = await fetchUser();
      setUser(res);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  const signout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      toast.error("فشل تسجيل الخروج");
    }
  };

  // Show loading only if we're not initialized yet
  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, refreshUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
