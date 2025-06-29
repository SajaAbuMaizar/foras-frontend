"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CandidateFilterForm from "./CandidateFilterForm";
import CandidateResultsTable from "./CandidateResultsTable";
import CandidateCard from "./CandidateCard";
import FilterSummary from "./FilterSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

// Types
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
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}

interface CandidateResult {
  id: number;
  name: string;
  phone: string;
  cityName: string;
  gender: string;
  knowsHebrew: boolean;
  needsHelp: boolean;
  skills: string[];
  driverLicenses: string[];
  languages: string[];
  avatarUrl?: string;
}

interface PagedResponse {
  content: CandidateResult[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export default function AdminCandidateFilterPage() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [candidates, setCandidates] = useState<PagedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<CandidateFilter>({
    page: 0,
    size: 20,
    sortBy: "name",
    sortDirection: "asc",
  });
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Fetch filter options on component mount
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setOptionsLoading(true);
      const response = await fetch("/api/admin/candidates/filter/options", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch filter options");
      }

      const data = await response.json();
      setFilterOptions(data);
    } catch (error) {
      console.error("Error fetching filter options:", error);
      toast.error("فشل في تحميل خيارات التصفية");
    } finally {
      setOptionsLoading(false);
    }
  };

  const handleFilter = async (filters: CandidateFilter) => {
    try {
      setLoading(true);
      const filterRequest = {
        ...filters,
        page: currentFilter.page,
        size: currentFilter.size,
        sortBy: currentFilter.sortBy,
        sortDirection: currentFilter.sortDirection,
      };

      const response = await fetch("/api/admin/candidates/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(filterRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to filter candidates");
      }

      const data = await response.json();
      setCandidates(data);
      setCurrentFilter((prev) => ({ ...prev, ...filters }));

      toast.success(`تم العثور على ${data.totalElements} مرشح`);
    } catch (error) {
      console.error("Error filtering candidates:", error);
      toast.error("فشل في تصفية المرشحين");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const updatedFilter = { ...currentFilter, page: newPage };
    setCurrentFilter(updatedFilter);
    handleFilter(updatedFilter);
  };

  const handleSortChange = (sortBy: string, sortDirection: string) => {
    const updatedFilter = { ...currentFilter, sortBy, sortDirection };
    setCurrentFilter(updatedFilter);
    handleFilter(updatedFilter);
  };

  const handleClearFilters = () => {
    const clearedFilter = {
      page: 0,
      size: 20,
      sortBy: "name",
      sortDirection: "asc",
    };
    setCurrentFilter(clearedFilter);
    setCandidates(null);
  };

  const handleQuickSearch = async (query: string) => {
    if (!query.trim()) {
      setCandidates(null);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/candidates/search?query=${encodeURIComponent(
          query
        )}&page=0&size=20`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search candidates");
      }

      const data = await response.json();
      setCandidates(data);
      toast.success(`تم العثور على ${data.totalElements} مرشح`);
    } catch (error) {
      console.error("Error searching candidates:", error);
      toast.error("فشل في البحث");
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (!candidates || candidates.content.length === 0) {
      toast.error("لا توجد نتائج للتصدير");
      return;
    }

    const csvContent = convertToCsv(candidates.content);
    downloadCsv(csvContent, "filtered-candidates.csv");
    toast.success("تم تصدير النتائج بنجاح");
  };

  const convertToCsv = (data: CandidateResult[]): string => {
    const headers = [
      "الاسم",
      "الهاتف",
      "المدينة",
      "الجنس",
      "يعرف العبرية",
      "يحتاج مساعدة",
      "المهارات",
      "رخص القيادة",
      "اللغات",
    ];
    const rows = data.map((candidate) => [
      candidate.name,
      candidate.phone,
      candidate.cityName,
      candidate.gender === "MALE" ? "ذكر" : "أنثى",
      candidate.knowsHebrew ? "نعم" : "لا",
      candidate.needsHelp ? "نعم" : "لا",
      candidate.skills.join("; "),
      candidate.driverLicenses.join("; "),
      candidate.languages.join("; "),
    ]);

    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const downloadCsv = (content: string, filename: string) => {
    const blob = new Blob(["\uFEFF" + content], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (optionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل خيارات التصفية...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">تصفية المرشحين</h1>
            <div className="flex gap-3">
              <button
                onClick={exportResults}
                disabled={!candidates || candidates.content.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                تصدير النتائج
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                مسح التصفية
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="البحث السريع بالاسم أو رقم الهاتف..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length >= 2 || value.length === 0) {
                  handleQuickSearch(value);
                }
              }}
            />
          </div>

          {/* Filter Summary */}
          {candidates && (
            <FilterSummary
              totalResults={candidates.totalElements}
              currentPage={candidates.pageNumber + 1}
              totalPages={candidates.totalPages}
              filters={currentFilter}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">خيارات التصفية</h2>
              {filterOptions && (
                <CandidateFilterForm
                  options={filterOptions}
                  onFilter={handleFilter}
                  loading={loading}
                  initialValues={currentFilter}
                />
              )}
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {candidates ? (
              <div className="bg-white rounded-lg shadow-sm">
                {/* View Mode Toggle */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      النتائج ({candidates.totalElements} مرشح)
                    </h3>
                    <Tabs
                      value={viewMode}
                      onValueChange={(value) =>
                        setViewMode(value as "table" | "cards")
                      }
                    >
                      <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                        <TabsTrigger value="table">جدول</TabsTrigger>
                        <TabsTrigger value="cards">بطاقات</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Results Content */}
                <Tabs
                  value={viewMode}
                  onValueChange={(value) =>
                    setViewMode(value as "table" | "cards")
                  }
                >
                  <TabsContent value="table">
                    <CandidateResultsTable
                      candidates={candidates}
                      loading={loading}
                      onPageChange={handlePageChange}
                      onSortChange={handleSortChange}
                      currentSort={{
                        by: currentFilter.sortBy || "name",
                        direction: currentFilter.sortDirection || "asc",
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="cards">
                    <div className="p-6">
                      {candidates.content.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500">
                            لا توجد نتائج مطابقة للتصفية
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {candidates.content.map((candidate) => (
                              <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                              />
                            ))}
                          </div>

                          {/* Pagination for Cards View */}
                          {candidates.totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handlePageChange(candidates.pageNumber - 1)
                                  }
                                  disabled={candidates.pageNumber === 0}
                                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                                >
                                  السابق
                                </button>
                                <span className="px-3 py-1">
                                  {candidates.pageNumber + 1} من{" "}
                                  {candidates.totalPages}
                                </span>
                                <button
                                  onClick={() =>
                                    handlePageChange(candidates.pageNumber + 1)
                                  }
                                  disabled={candidates.last}
                                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                                >
                                  التالي
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ابدأ البحث
                </h3>
                <p className="text-gray-500">
                  استخدم النموذج على اليسار لتصفية المرشحين حسب المعايير
                  المطلوبة
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
