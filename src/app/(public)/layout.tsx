// src/app/layout.tsx
import React, { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import "@/styles/globals.css";
import '@/lib/fontawesome';
import { AuthProvider } from '@/context/auth/AuthContext';



const PublicLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const variant = "transparent";

  return (
    <html lang="ar">

      <body className="font-poppin flex flex-col min-h-screen antialiased">
        <AuthProvider>
          <Navbar variant={variant} />

          <div className="flex-grow">
            {children} {/* Next.js will inject the correct page here */}
          </div>
        </AuthProvider>
        <Footer />
        <Toaster
          toastOptions={{
            style: {
              zIndex: 9999,
              marginTop: '50px',
            },
          }}
        />
      </body>
    </html>
  );
};

export default PublicLayout;
