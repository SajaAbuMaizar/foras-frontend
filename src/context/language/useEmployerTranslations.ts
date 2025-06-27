import { useLanguage } from "./LanguageContext";
import { translations } from "@/translations/index";

export const useEmployerTranslations = () => {
  const { lang } = useLanguage();
  return lang === "ar" ? translations.ar : translations.he;
};