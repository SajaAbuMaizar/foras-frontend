"use client";

import { useLanguage } from "@/context/language/LanguageContext";
import { useEmployerTranslations } from "@/context/language/useEmployerTranslations";
import { Search, Filter, Calendar } from "lucide-react";

interface ApplicationFiltersProps {
  filters: {
    status: string;
    search: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function ApplicationFilters({
  filters,
  onFiltersChange,
}: ApplicationFiltersProps) {
  const { lang } = useLanguage();
  const t = useEmployerTranslations();

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t.jobApplications.filters.searchPlaceholder}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">{t.jobApplications.filters.allStatus}</option>
            <option value="pending">{t.jobApplications.filters.pending}</option>
            <option value="accepted">
              {t.jobApplications.filters.accepted}
            </option>
            <option value="rejected">
              {t.jobApplications.filters.rejected}
            </option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="text-gray-400 h-5 w-5" />
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">{t.jobApplications.filters.allTime}</option>
            <option value="today">{t.jobApplications.filters.today}</option>
            <option value="week">{t.jobApplications.filters.thisWeek}</option>
            <option value="month">{t.jobApplications.filters.thisMonth}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
