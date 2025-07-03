"use client";

import { useLanguage } from "@/context/language/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg shadow-sm">
      <button
        onClick={() => setLang("ar")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          lang === "ar"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => setLang("he")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          lang === "he"
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        עברית
      </button>
    </div>
  );
}
