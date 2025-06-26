"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type Language = "ar" | "he";

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
} | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>("ar");

  const setLang = async (newLang: Language) => {
    setLangState(newLang);
    Cookies.set("lang", newLang, { expires: 30 });

    const isAuthenticated = Cookies.get("jwt");
    if (isAuthenticated) {
      await fetch("/api/employer/change-lang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ lang: newLang }),
      });
    }
  };

  useEffect(() => {
    const storedLang = Cookies.get("lang");
    if (storedLang === "ar" || storedLang === "he") {
      setLangState(storedLang);
    }
  }, []);

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
