// src/app/admin/(auth)/layout.tsx
import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Sidebar from "./components/Sidebar";
import { OptionsProvider } from "@/context/options/OptionsContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <OptionsProvider>
      {/* Fixed Navbar at top */}
      <Navbar variant="default" />

      {/* Main layout container */}
      <div className="min-h-screen flex" dir="rtl">
        {/* Fixed Sidebar */}
        <div className="fixed right-0 top-20 h-[calc(100vh-5rem)] w-64 z-40">
          <Sidebar />
        </div>

        {/* Main Content Area with proper spacing */}
        <div className="flex-1 mr-64">
          <main className="min-h-[calc(100vh-5rem)] bg-gray-50 mt-20">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="mr-64" dir="rtl">
        <Footer />
      </div>
    </OptionsProvider>
  );
};

export default AdminLayout;
