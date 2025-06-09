'use client';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User } from './types';
import { fetchUser, loginCandidate, logout } from './authService';
import LoadingSpinner from '@/components/LoadingSpinner';

export const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        const init = async () => {
            try {
                const data = await fetchUser(); // returns User | null
                setUser(data); // no need to destructure or reconstruct
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        init();
    }, []);


    const candidateSignin = async (phone: string, password: string): Promise<boolean> => {
        try {
            const res = await loginCandidate(phone, password);

            if (res.status === 200) {
                // Safe to cast as User
                const data = res.data as User;
                toast.success('تم تسجيل الدخول بنجاح');
                setUser(data);
                return true;
            } else {
                // For non-200 responses, treat data as error
                const errorData = res.data as { message?: string };
                throw new Error(errorData.message || 'بيانات الاعتماد غير صحيحة');
            }
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
            await logout();
            setUser(null);
            window.location.href = '/'; // redirect to homepage
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
