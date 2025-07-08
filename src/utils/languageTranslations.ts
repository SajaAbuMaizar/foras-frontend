const languageTranslations: Record<string, { ar: string; he: string }> = {
  arabic: { ar: "العربية", he: "ערבית" },
  hebrew: { ar: "العبرية", he: "עברית" },
  english: { ar: "الإنجليزية", he: "אנגלית" },
  russian: { ar: "الروسية", he: "רוסית" },
  french: { ar: "الفرنسية", he: "צרפתית" },
};

export function getLanguageTranslation(
  language: string,
  lang: "ar" | "he"
): string {
  return languageTranslations[language]?.[lang] || language;
}
