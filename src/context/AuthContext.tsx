'use client';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AuthContextType {
    user: { name: string; type: string } | null | undefined;
    signin: (phone: string, password: string) => Promise<boolean>;
    signout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthContextType['user'] | undefined>(undefined);


    const fetchUser = async () => {
        try {
            const res = await api.get('/api/auth/me', {
                validateStatus: status => status < 500, // Treat 401/403 as valid responses
            });

            if (res.status === 200) {
                const data = res.data as { name: string; type: string };
                setUser({ name: data.name, type: data.type });
            } else {
                // Optional: log quietly in dev mode
                if (process.env.NODE_ENV === 'development') {
                    console.log(`Not authenticated. Status: ${res.status}`);
                }
                setUser(null);
            }
        } catch (err) {
            console.error('Unexpected error calling /api/auth/me:', err);
            setUser(null);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    const signin = async (phone: string, password: string) => {
        try {
            const res = await api.post('/api/auth/login', { phone, password });
            const data = res.data as { name?: string; type?: string; message?: string };

            if (res.status === 200) {
                toast.success('تم تسجيل الدخول بنجاح');
                setUser({ name: data.name || '', type: data.type || 'user' });
                return true;
            }

            // This part should theoretically never be reached since 401 would throw an error
            if (res.status === 401) {
                throw new Error(data?.message || 'بيانات الاعتماد غير صحيحة');
            }

            throw new Error(data?.message || 'حدث خطأ غير متوقع');

        } catch (err: any) {
            // Handle Axios error response
            if (err.response) {
                // Backend returned an error response (4xx, 5xx)
                const errorMessage = err.response.data?.message || err.message;
                toast.error(errorMessage);
            } else if (err.request) {
                // Request was made but no response received
                toast.error('لا يوجد اتصال بالخادم');
            } else {
                // Something happened in setting up the request
                toast.error(err.message || 'حدث خطأ أثناء تسجيل الدخول');
            }
            return false;
        }
    };


    const signout = async () => {
        try {
            await api.post('/api/auth/logout');
            setUser(null);
            window.location.href = '/'; // ✅ redirect to homepage and force reload
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

export const useAuth = () => useContext(AuthContext);
