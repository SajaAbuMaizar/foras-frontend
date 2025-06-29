import React, { useState } from "react";
import { Language } from "@/types/CandidateDetails";

interface Props {
  show: boolean;
  onClose: () => void;
  onAdd: (lang: Language) => void;
  availableLanguages?: Language[];
}

export const LanguageModal: React.FC<Props> = ({
  show,
  onClose,
  onAdd,
  availableLanguages,
}) => {
  const [custom, setCustom] = useState("");
  if (!show) return null;
  const langs =
    availableLanguages && availableLanguages.length > 0
      ? availableLanguages
      : ["arabic", "hebrew", "english", "russian", "french"];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl border border-blue-100">
        <h3 className="text-xl font-bold mb-6 text-blue-800">أضف لغة</h3>
        <div className="space-y-2 mb-4">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => onAdd(l)}
              className="block w-full py-2 my-1 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-semibold transition"
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2 mb-4">
          <input
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="لغة أخرى..."
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && custom.trim()) {
                onAdd(custom.trim());
                setCustom("");
              }
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            disabled={!custom.trim()}
            onClick={() => {
              if (custom.trim()) {
                onAdd(custom.trim());
                setCustom("");
              }
            }}
          >
            إضافة
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-blue-600 hover:underline"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};
