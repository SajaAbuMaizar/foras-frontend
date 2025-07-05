import React, { useState } from "react";
import { Language } from "@/types/CandidateDetails";
import { X, Plus, Globe } from "lucide-react";

interface Props {
  show: boolean;
  onClose: () => void;
  onAdd: (lang: Language) => void;
  currentLanguages: Language[];
}

const languageLabels: Record<string, string> = {
  arabic: "العربية",
  hebrew: "العبرية",
  english: "الإنجليزية",
  russian: "الروسية",
  french: "الفرنسية",
};

export const LanguageModal: React.FC<Props> = ({
  show,
  onClose,
  onAdd,
  currentLanguages,
}) => {
  const [custom, setCustom] = useState("");
  const availableLanguages = [
    "arabic",
    "hebrew",
    "english",
    "russian",
    "french",
  ].filter((lang) => !currentLanguages.includes(lang));

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-blue-100 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <Globe size={24} />
            إضافة لغة
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onAdd(lang);
                onClose();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl text-blue-700 font-semibold transition-all duration-200 text-right flex items-center justify-between group"
            >
              <span>{languageLabels[lang] || lang}</span>
              <Plus
                size={18}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">لغة أخرى:</p>
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="أدخل اللغة..."
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && custom.trim()) {
                  onAdd(custom.trim());
                  setCustom("");
                  onClose();
                }
              }}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              disabled={!custom.trim()}
              onClick={() => {
                if (custom.trim()) {
                  onAdd(custom.trim());
                  setCustom("");
                  onClose();
                }
              }}
            >
              إضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
