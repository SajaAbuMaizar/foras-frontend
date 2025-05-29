'use client';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User } from './types';
import { fetchUser, loginUser, logoutUser } from './authService';
import LoadingSpinner from '@/components/LoadingSpinner';

export const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const init = async () => {
            try {
                const data = await fetchUser() as User | null;
                setUser(data ? { name: data.name, type: data.type } : null);
            } catch (error) {
                setUser(null);
                console.error('Error fetching user:', error);
            }
        };

        init();
    }, []);

    const signin = async (phone: string, password: string): Promise<boolean> => {
        try {
            const res = await loginUser(phone, password);
            const data = res.data as { name?: string; type?: string; message?: string };

            if (res.status === 200) {
                toast.success('تم تسجيل الدخول بنجاح');
                setUser({ name: data.name || '', type: data.type || 'user' });
                return true;
            }

            throw new Error(data?.message || 'بيانات الاعتماد غير صحيحة');
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                'حدث خطأ أثناء تسجيل الدخول';
            toast.error(message);
            return false;
        }
    };



    const signout = async () => {
        try {
            await logoutUser();
            setUser(null);
            window.location.href = '/'; // redirect to homepage
        } catch (err) {
            toast.error('فشل تسجيل الخروج');
        }
    };

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {user === undefined ? <LoadingSpinner /> : children}
        </AuthContext.Provider>
    );
};
