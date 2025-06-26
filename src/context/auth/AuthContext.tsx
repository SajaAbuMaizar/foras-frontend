'use client';

import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User } from './types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { logout, fetchUser } from './authService';

export const AuthContext = createContext<AuthContextType>({} as any);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser = undefined }) => {
  const [user, setUser] = useState<User | null | undefined>(initialUser);

  const refreshUser = async () => {
    try {
      const res = await fetchUser();
      setUser(res);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const signout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      toast.error('فشل تسجيل الخروج');
    }
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser, signout }}>
      {user === undefined ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
