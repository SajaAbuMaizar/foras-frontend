import { ReactNode } from "react";
import { Sidebar } from "./components/layouts/Sidebar";
import Navbar from '@/components/home/Navbar';
import "@/styles/globals.css";
import '@/lib/fontawesome';

export default function EmployerLayout({ children }: { children: ReactNode }) {
    // Replace these with actual authentication checks
    const isAuthenticated = false;  // Replace with your logic
    const userType: 'user' | 'employer' | 'admin' | null = null;
    const userName = '';  // Replace with actual username if authenticated
    const variant="default";
    return (
        <html dir="rtl" lang="ar">
            <body className="font-poppin flex flex-col min-h-screen antialiased">
                <Navbar
                    isAuthenticated={isAuthenticated}
                    userType={userType}
                    userName={userName}
                    variant={variant}
                />

                <div className="flex min-h-screen">
                    {/* Main Content */}
                    <main className="flex-1 p-4 bg-gray-50 rtl:pr-64">
                        {children}
                    </main>

                    {/* Sidebar */}
                    <Sidebar />
                </div>
            </body>
        </html>
    );
}
