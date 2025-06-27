// context/language/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { updateEmployerLanguage } from "@/services/languageService";

type Language = "ar" | "he";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
} | null>(null);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLang: Language;
}> = ({ children, initialLang }) => {
  const [lang, setLangState] = useState<Language>(initialLang);

  const setLang = async (newLang: Language) => {
    setLangState(newLang);
    Cookies.set("lang", newLang, {
      expires: 30,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    if (Cookies.get("jwt")) {
      try {
        await updateEmployerLanguage(newLang);
      } catch (error) {
        console.error("Error updating language on server:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
