// src/app/layout.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import "@/styles/globals.css";
import '@/lib/fontawesome';
import AuthProviderWrapper from '@/context/auth/AuthProviderWrapper';
import { OptionsProvider } from '@/context/options/OptionsContext';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const variant = "transparent";

  return (
    <html lang="ar">
      <body className="font-poppin flex flex-col min-h-screen antialiased">
        <AuthProviderWrapper>
          <OptionsProvider>
            <Navbar variant={variant} />
            <div className="flex-grow">
              {children}
            </div>
          </OptionsProvider>
        </AuthProviderWrapper>
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
