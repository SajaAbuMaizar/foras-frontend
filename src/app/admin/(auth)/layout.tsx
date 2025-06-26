import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Sidebar from "./components/Sidebar";
import "@/styles/globals.css";
import "@/lib/fontawesome";
import { OptionsProvider } from "@/context/options/OptionsContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const variant = "default";

  return (
    <OptionsProvider>
      <Navbar variant={variant} />

      {/* Layout: Sidebar + Main Content */}
      <div className="flex flex-1 min-h-screen" dir="rtl">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50 mt-16">{children}</main>
      </div>

      <Footer />
    </OptionsProvider>
  );
};

export default AdminLayout;
