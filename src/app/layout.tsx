// src/app/layout.tsx
import React, { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import "../styles/globals.css";
import '../lib/fontawesome';


const PublicLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  // Replace these with actual authentication checks
  const isAuthenticated = false;  // Replace with your logic
  const userType: 'user' | 'employer' | 'admin' | null = null;  // Replace with actual user type
  const userName = '';  // Replace with actual username if authenticated

  return (
    <html lang="ar">
      
      <body className="font-poppin flex flex-col min-h-screen antialiased">
        <Navbar
          isAuthenticated={isAuthenticated}
          userType={userType}
          userName={userName}
        />

        <div className="flex-grow">
          {children} {/* Next.js will inject the correct page here */}
        </div>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
};

export default PublicLayout;
