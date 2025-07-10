"use client";

import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { JobApplicationWithCandidate } from "@/types/JobApplicationWithCandidate";
import {
  exportToExcel,
  exportToPDF,
  generatePrintHTML,
} from "@/utils/exportUtils";
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
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const printFrameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExcelExport = async () => {
    try {
      setIsExporting(true);
      await exportToExcel(applications, jobTitle, lang);
    } catch (error) {
      console.error("Excel export failed:", error);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  const handlePDFExport = async () => {
    try {
      setIsExporting(true);
      await exportToPDF(applications, jobTitle, lang);
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  const handlePrint = () => {
    try {
      setIsExporting(true);

      // Create hidden iframe for printing
      if (printFrameRef.current) {
        document.body.removeChild(printFrameRef.current);
      }

      const printFrame = document.createElement("iframe");
      printFrame.style.display = "none";
      printFrameRef.current = printFrame;
      document.body.appendChild(printFrame);

      const printDocument =
        printFrame.contentDocument || printFrame.contentWindow?.document;
      if (!printDocument) return;

      // Generate print HTML
      const printHTML = generatePrintHTML(applications, jobTitle, lang);

      printDocument.open();
      printDocument.write(printHTML);
      printDocument.close();

      // Wait for content to load then print
      printFrame.onload = () => {
        printFrame.contentWindow?.print();
        setTimeout(() => {
          if (printFrameRef.current) {
            document.body.removeChild(printFrameRef.current);
            printFrameRef.current = null;
          }
        }, 1000);
      };
    } catch (error) {
      console.error("Print failed:", error);
    } finally {
      setIsExporting(false);
      setShowDropdown(false);
    }
  };

  if (applications.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="h-4 w-4" />
        <span>{isExporting ? t.export.downloading : t.export.title}</span>
      </button>

      {showDropdown && !isExporting && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <button
            onClick={handleExcelExport}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-right"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>{t.export.excel}</span>
          </button>

          <button
            onClick={handlePDFExport}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-100 dark:border-gray-700 text-right"
          >
            <FileText className="h-4 w-4 text-red-600" />
            <span>{t.export.pdf}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-100 dark:border-gray-700 text-right"
          >
            <Printer className="h-4 w-4 text-blue-600" />
            <span>{t.export.print}</span>
          </button>
        </div>
      )}
    </div>
  );
}
