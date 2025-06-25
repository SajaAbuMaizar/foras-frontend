import { ReactNode } from "react";
import { Sidebar } from "./components/layouts/Sidebar";
import Navbar from "@/components/home/Navbar";
import AuthProviderWrapper from "@/context/auth/AuthProviderWrapper";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "@/lib/fontawesome";
import { OptionsProvider } from "@/context/options/OptionsContext";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  const variant = "default";
  return (
    <html dir="rtl" lang="ar">
      <body className="font-poppin flex flex-col min-h-screen antialiased">
        <AuthProviderWrapper>
          <OptionsProvider>
            <Navbar variant={variant} />

            <div className="flex min-h-screen">
              {/* Main Content */}
              <main className="flex-1 p-4 bg-gray-50 rtl:pr-64 mt-16">
                {children}
              </main>

              {/* Sidebar */}
              <Sidebar />
            </div>
          </OptionsProvider>
        </AuthProviderWrapper>
        <Toaster containerStyle={{ top: 150 }} />
      </body>
    </html>
  );
}
