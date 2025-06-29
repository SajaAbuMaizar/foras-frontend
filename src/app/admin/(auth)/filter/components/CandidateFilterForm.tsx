"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterOptions {
  availableGenders: Array<{
    name: string;
    id: string;
    arabic: string;
    hebrew: string;
  }>;
  availableSkills: string[];
  availableDriverLicenses: string[];
  availableLanguages: string[];
  availableCities: Record<string, string>;
}

interface CandidateFilter {
  genders?: string[];
  skills?: string[];
  driverLicenses?: string[];
  languages?: string[];
  cities?: string[];
  knowsHebrew?: boolean;
  needsHelp?: boolean;
  searchQuery?: string;
}

interface Props {
  options: FilterOptions;
  onFilter: (filters: CandidateFilter) => void;
  loading: boolean;
  initialValues?: CandidateFilter;
}

export default function CandidateFilterForm({
  options,
  onFilter,
  loading,
  initialValues,
}: Props) {
  const [filters, setFilters] = useState<CandidateFilter>(initialValues || {});
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    skills: false,
    licenses: false,
    languages: false,
  });

  // Skills mapping for better display
  const skillsMap: Record<string, string> = {
    cook: "طبخ",
    hotel: "فندقة",
    technology: "تكنولوجيا",
    management: "إدارة",
    construction: "بناء",
    customers: "خدمة عملاء",
    sales: "مبيعات",
    order: "تحضير طلبات",
    saver: "منقذ سباحة",
    barman: "بارمان",
    barista: "باريستا",
    electricity: "كهرباء",
    condition: "مكيّفات",
    cars: "سيارات",
  };

  // Driver licenses mapping
  const licensesMap: Record<string, string> = {
    A2: "A2",
    A1: "A1",
    A: "A",
    B: "B",
    C1: "C1",
    C: "C",
    D: "D",
    D1: "D1",
    D2: "D2",
    D3: "D3",
    E: "E",
    "1": "1",
    ".": "أخرى",
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleArrayFilter = (key: keyof CandidateFilter, value: string) => {
    setFilters((prev) => {
      const currentArray = (prev[key] as string[]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [key]: newArray.length > 0 ? newArray : undefined,
      };
    });
  };

  const handleBooleanFilter = (
    key: keyof CandidateFilter,
    value: boolean | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = (key: keyof CandidateFilter) => {
    setFilters((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.genders?.length) count++;
    if (filters.skills?.length) count++;
    if (filters.driverLicenses?.length) count++;
    if (filters.languages?.length) count++;
    if (filters.cities?.length) count++;
    if (filters.knowsHebrew !== undefined) count++;
    if (filters.needsHelp !== undefined) count++;
    return count;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Active Filters Count */}
      {getActiveFiltersCount() > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">
              {getActiveFiltersCount()} مرشح نشط
            </span>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              مسح الكل
            </button>
          </div>
        </div>
      )}

      {/* Basic Filters */}
      <div className="border border-gray-200 rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection("basic")}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
        >
          <span className="font-medium">المعايير الأساسية</span>
          {expandedSections.basic ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {expandedSections.basic && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الجنس
                {filters.genders?.length && (
                  <button
                    type="button"
                    onClick={() => clearFilter("genders")}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
              <div className="space-y-2">
                {options.availableGenders.map((gender) => (
                  <label key={gender.name} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.genders?.includes(gender.name) || false}
                      onChange={() => handleArrayFilter("genders", gender.name)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="mr-2 text-sm">{gender.arabic}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المدن
                {filters.cities?.length && (
                  <button
                    type="button"
                    onClick={() => clearFilter("cities")}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
              <div className="max-h-32 overflow-y-auto space-y-2 border border-gray-200 rounded p-2">
                {Object.entries(options.availableCities).map(([code, name]) => (
                  <label key={code} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.cities?.includes(code) || false}
                      onChange={() => handleArrayFilter("cities", code)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="mr-2 text-sm">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hebrew Knowledge */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                معرفة اللغة العبرية
                {filters.knowsHebrew !== undefined && (
                  <button
                    type="button"
                    onClick={() => clearFilter("knowsHebrew")}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="knowsHebrew"
                    checked={filters.knowsHebrew === true}
                    onChange={() => handleBooleanFilter("knowsHebrew", true)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">نعم</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="knowsHebrew"
                    checked={filters.knowsHebrew === false}
                    onChange={() => handleBooleanFilter("knowsHebrew", false)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">لا</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="knowsHebrew"
                    checked={filters.knowsHebrew === undefined}
                    onChange={() =>
                      handleBooleanFilter("knowsHebrew", undefined)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">الكل</span>
                </label>
              </div>
            </div>

            {/* Needs Help */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                يحتاج مساعدة
                {filters.needsHelp !== undefined && (
                  <button
                    type="button"
                    onClick={() => clearFilter("needsHelp")}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsHelp"
                    checked={filters.needsHelp === true}
                    onChange={() => handleBooleanFilter("needsHelp", true)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">نعم</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsHelp"
                    checked={filters.needsHelp === false}
                    onChange={() => handleBooleanFilter("needsHelp", false)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">لا</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsHelp"
                    checked={filters.needsHelp === undefined}
                    onChange={() => handleBooleanFilter("needsHelp", undefined)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">الكل</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skills Filter */}
      <div className="border border-gray-200 rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection("skills")}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
        >
          <span className="font-medium">
            المهارات{" "}
            {filters.skills?.length ? `(${filters.skills.length})` : ""}
          </span>
          {expandedSections.skills ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {expandedSections.skills && (
          <div className="border-t border-gray-200 p-4">
            {filters.skills?.length && (
              <button
                type="button"
                onClick={() => clearFilter("skills")}
                className="mb-2 text-red-500 hover:text-red-700 text-sm"
              >
                مسح جميع المهارات
              </button>
            )}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {options.availableSkills.map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.skills?.includes(skill) || false}
                    onChange={() => handleArrayFilter("skills", skill)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">
                    {skillsMap[skill] || skill}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Driver Licenses Filter */}
      <div className="border border-gray-200 rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection("licenses")}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
        >
          <span className="font-medium">
            رخص القيادة{" "}
            {filters.driverLicenses?.length
              ? `(${filters.driverLicenses.length})`
              : ""}
          </span>
          {expandedSections.licenses ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {expandedSections.licenses && (
          <div className="border-t border-gray-200 p-4">
            {filters.driverLicenses?.length && (
              <button
                type="button"
                onClick={() => clearFilter("driverLicenses")}
                className="mb-2 text-red-500 hover:text-red-700 text-sm"
              >
                مسح جميع الرخص
              </button>
            )}
            <div className="grid grid-cols-3 gap-2">
              {options.availableDriverLicenses.map((license) => (
                <label key={license} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.driverLicenses?.includes(license) || false}
                    onChange={() =>
                      handleArrayFilter("driverLicenses", license)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">
                    {licensesMap[license] || license}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Languages Filter */}
      <div className="border border-gray-200 rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection("languages")}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
        >
          <span className="font-medium">
            اللغات{" "}
            {filters.languages?.length ? `(${filters.languages.length})` : ""}
          </span>
          {expandedSections.languages ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {expandedSections.languages && (
          <div className="border-t border-gray-200 p-4">
            {filters.languages?.length && (
              <button
                type="button"
                onClick={() => clearFilter("languages")}
                className="mb-2 text-red-500 hover:text-red-700 text-sm"
              >
                مسح جميع اللغات
              </button>
            )}
            <div className="grid grid-cols-2 gap-2">
              {options.availableLanguages.map((language) => (
                <label key={language} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.languages?.includes(language) || false}
                    onChange={() => handleArrayFilter("languages", language)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm">{language}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "جاري البحث..." : "تطبيق التصفية"}
        </button>
      </div>
    </form>
  );
}
