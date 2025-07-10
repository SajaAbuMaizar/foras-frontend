import React from "react";
import { Globe } from "lucide-react";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
}) => {
  const t = useEmployerTranslations();

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Globe className="w-4 h-4" />
        {t.profile.fields.preferredLanguage}
      </label>

      <div className="flex gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="ar"
            checked={value === "ar"}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">العربية</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="he"
            checked={value === "he"}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">עברית</span>
        </label>
      </div>
    </div>
  );
};
