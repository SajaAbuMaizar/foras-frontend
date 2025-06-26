import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { OptionsProvider } from "@/context/options/OptionsContext";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const variant = "transparent";

  return (
    <OptionsProvider>
      <Navbar variant={variant} />
      <main className="font-poppin flex flex-col min-h-screen antialiased">
        <div className="flex-grow">{children}</div>
      </main>
      <Footer />
    </OptionsProvider>
  );
};

export default PublicLayout;
