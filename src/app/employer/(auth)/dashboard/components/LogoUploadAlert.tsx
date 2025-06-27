"use client";

import React, { useState } from "react";
import { useLogoUploader } from "../hooks/useLogoUpload";
import { useLanguage } from "@/context/language/LanguageContext";
import { translations } from "@/translations";

type LogoUploadAlertProps = {
  onLogoUploaded: () => void;
};

const LogoUploadAlert: React.FC<LogoUploadAlertProps> = ({
  onLogoUploaded,
}) => {
  const { lang } = useLanguage();
  const t = translations[lang].jobListingsPage;
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { uploadLogo, loading } = useLogoUploader(lang, () => {
    setShowModal(false);
    setFile(null);
    onLogoUploaded(); // inform parent
  });

  return (
    <>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <div className="flex items-center justify-between">
          <p className="text-blue-700 font-medium">{t.companyLogoMissing}</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-1 px-3 rounded text-sm shadow-md transition-colors"
          >
            {t.uploadLogo}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t.uploadModal.title}</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {t.uploadModal.cancel}
              </button>
              <button
                onClick={() => uploadLogo(file)}
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded disabled:opacity-60"
              >
                {loading ? t.uploadModal.loading : t.uploadModal.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoUploadAlert;
