import { ReactNode } from "react";
import { Sidebar } from "./components/layouts/Sidebar";
import Navbar from "@/components/home/Navbar";
import { OptionsProvider } from "@/context/options/OptionsContext";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  const variant = "default";
  return (
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
  );
}
