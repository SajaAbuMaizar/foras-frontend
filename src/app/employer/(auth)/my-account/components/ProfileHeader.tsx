import React from "react";
import { ArrowRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { useLanguage } from "@/context/language/LanguageContext";

export const ProfileHeader: React.FC = () => {
  const router = useRouter();
  const t = useEmployerTranslations();
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t.profile.title}
            </h1>
            <p className="text-gray-600 mt-1">{t.profile.subtitle}</p>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors ${
            lang === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <ArrowRight className="w-5 h-5" />
          <span>{t.common.back}</span>
        </button>
      </div>
    </div>
  );
};
