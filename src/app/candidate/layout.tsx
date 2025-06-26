// src/app/layout.tsx
import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import "@/styles/globals.css";
import "@/lib/fontawesome";
import AuthProviderWrapper from "@/context/auth/AuthProviderWrapper";
import { OptionsProvider } from "@/context/options/OptionsContext";

const CandidateLayout = ({ children }: { children: React.ReactNode }) => {
  const variant = "default";

  return (
    <OptionsProvider>
      <Navbar variant={variant} />
      <div className="flex-grow">{children}</div>
    </OptionsProvider>
  );
};

export default CandidateLayout;
