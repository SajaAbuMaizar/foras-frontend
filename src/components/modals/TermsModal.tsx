// components/modal/TermsModal.tsx
import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg text-right">
        <h2 className="text-xl font-semibold mb-4">الشروط والأحكام</h2>
        <p className="text-sm leading-6 max-h-[60vh] overflow-y-auto">
          {/* תנאי השירות כאן */}
          باستخدامك لهذا الموقع فإنك توافق على جميع الشروط والأحكام المقررة...
        </p>
        <div className="mt-6 text-left">
          <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
