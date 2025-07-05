"use client";

import {
  RefreshCw,
  Download,
  Settings,
  Plus,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { adminDashboardApi } from "@/lib/api/admin/dashboard";
import toast from "react-hot-toast";

interface QuickActionsProps {
  onRefresh: () => void;
}

export default function QuickActions({ onRefresh }: QuickActionsProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: "csv" | "xlsx") => {
    try {
      setExporting(true);
      toast.loading("جاري تصدير البيانات...", { id: "export" });

      const blob = await adminDashboardApi.exportData(format);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dashboard-stats-${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("تم تصدير البيانات بنجاح", { id: "export" });
    } catch (error) {
      toast.error("فشل تصدير البيانات", { id: "export" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"
        title="تحديث البيانات"
      >
        <RefreshCw className="h-5 w-5" />
      </button>

      <div className="relative group">
        <button
          disabled={exporting}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all hover:scale-110 disabled:opacity-50"
          title="تصدير البيانات"
        >
          <Download className="h-5 w-5" />
        </button>

        {/* Export dropdown */}
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
          >
            <FileText className="h-4 w-4" />
            تصدير CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
          >
            <FileSpreadsheet className="h-4 w-4" />
            تصدير Excel
          </button>
        </div>
      </div>

      <Link
        href="/admin/settings"
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all hover:scale-110"
        title="الإعدادات"
      >
        <Settings className="h-5 w-5" />
      </Link>

      <div className="h-6 w-px bg-gray-300 mx-1" />

      <Link
        href="/admin/jobs/new"
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:shadow-lg"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">إضافة وظيفة</span>
      </Link>
    </div>
  );
}
