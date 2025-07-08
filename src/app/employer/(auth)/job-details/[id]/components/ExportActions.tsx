"use client";

import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { useState, useRef } from "react";
import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";

interface ExportActionsProps {
  applications: JobApplicationWithCandidate[];
  jobTitle: string;
}

export default function ExportActions({
  applications,
  jobTitle,
}: ExportActionsProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleExcelExport = () => {
    exportToExcel(applications, jobTitle, lang);
    setShowDropdown(false);
  };

  const handlePDFExport = () => {
    exportToPDF(applications, jobTitle, lang);
    setShowDropdown(false);
  };

  const handlePrint = () => {
    window.print();
    setShowDropdown(false);
  };

  if (applications.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>{t.export.title}</span>
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <button
            onClick={handleExcelExport}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>{t.export.excel}</span>
          </button>

          <button
            onClick={handlePDFExport}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-100 dark:border-gray-700"
          >
            <FileText className="h-4 w-4 text-red-600" />
            <span>{t.export.pdf}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-100 dark:border-gray-700"
          >
            <Printer className="h-4 w-4 text-blue-600" />
            <span>{t.export.print}</span>
          </button>
        </div>
      )}
    </div>
  );
}
