import React from "react";
import Navbar from "@/components/home/Navbar";
import { OptionsProvider } from "@/context/options/OptionsContext";

const CandidateLayout = ({ children }: { children: React.ReactNode }) => {
  const variant = "default";

  return (
    <OptionsProvider>
      <Navbar variant={variant} />
      <div className="flex-grow mt-20">{children}</div>
    </OptionsProvider>
  );
};

export default CandidateLayout;
