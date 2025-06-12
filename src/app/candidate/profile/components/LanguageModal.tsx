import React from "react";
import { Language } from "@/types/CandidateDetails";

interface Props {
  show: boolean;
  onClose: () => void;
  onAdd: (lang: Language) => void;
}

const langs: Language[] = ["arabic","hebrew","english","russian","french"];

export const LanguageModal: React.FC<Props> = ({ show, onClose, onAdd }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-80">
        <h3 className="text-lg mb-4">أضف لغة</h3>
        {langs.map(l => (
          <button
            key={l}
            onClick={() => onAdd(l)}
            className="block w-full py-2 hover:bg-gray-100">
            {l}
          </button>
        ))}
        <button onClick={onClose} className="mt-4 text-blue-600">إلغاء</button>
      </div>
    </div>
  );
};
