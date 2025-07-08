"use client";

import { Globe } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { getLanguageTranslation } from "@/utils/languageTranslations";
import { useLanguage } from "@/context/language/LanguageContext";

interface CandidateLanguagesProps {
  languages: string[];
}

export default function CandidateLanguages({
  languages,
}: CandidateLanguagesProps) {
  const t = useEmployerTranslations();
  const { lang } = useLanguage();

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t.filters.languages}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <span
            key={language}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
          >
            {getLanguageTranslation(language, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}
