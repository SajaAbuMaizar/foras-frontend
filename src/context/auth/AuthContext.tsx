'use client';

import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User } from './types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { loginCandidate, logout } from './authService';

export const AuthContext = createContext<AuthContextType>({} as any);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser = undefined }) => {
  const [user, setUser] = useState<User | null | undefined>(initialUser);

  const candidateSignin = async (phone: string, password: string): Promise<boolean> => {
    try {
      const res = await loginCandidate(phone, password);
      if (res.status === 200) {
        const data = res.data as User;
        toast.success('تم تسجيل الدخول بنجاح');
        setUser(data);
        return true;
      } else {
        const errorData = res.data as { message?: string };
        throw new Error(errorData.message || 'بيانات الاعتماد غير صحيحة');
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'حدث خطأ أثناء تسجيل الدخول';
      toast.error(message);
      return false;
    }
  };

  const signout = async () => {
    try {
      await logout();
      setUser(null);
      window.location.href = '/'; // redirect homepage after logout
    } catch (err) {
      toast.error('فشل تسجيل الخروج');
    }
  };

  return (
    <AuthContext.Provider value={{ user, candidateSignin, signout }}>
      {user === undefined ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
