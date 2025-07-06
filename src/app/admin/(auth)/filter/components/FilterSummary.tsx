"use client";

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
  totalResults: number;
  currentPage: number;
  totalPages: number;
  filters: CandidateFilter;
}

export default function FilterSummary({
  totalResults,
  currentPage,
  totalPages,
  filters,
}: Props) {
  const getActiveFilters = () => {
    const activeFilters: Array<{ key: string; label: string; value: string }> =
      [];

    if (filters.genders?.length) {
      activeFilters.push({
        key: "genders",
        label: "الجنس",
        value: filters.genders
          .map((g) => (g === "MALE" ? "ذكر" : "أنثى"))
          .join(", "),
      });
    }

    if (filters.cities?.length) {
      activeFilters.push({
        key: "cities",
        label: "المدن",
        value: `${filters.cities.length} مدينة`,
      });
    }

    if (filters.skills?.length) {
      activeFilters.push({
        key: "skills",
        label: "المهارات",
        value: `${filters.skills.length} مهارة`,
      });
    }

    if (filters.driverLicenses?.length) {
      activeFilters.push({
        key: "driverLicenses",
        label: "رخص القيادة",
        value: filters.driverLicenses.join(", "),
      });
    }

    if (filters.languages?.length) {
      activeFilters.push({
        key: "languages",
        label: "اللغات",
        value: filters.languages.join(", "),
      });
    }

    if (filters.knowsHebrew !== undefined) {
      activeFilters.push({
        key: "knowsHebrew",
        label: "يعرف العبرية",
        value: filters.knowsHebrew ? "نعم" : "لا",
      });
    }

    if (filters.needsHelp !== undefined) {
      activeFilters.push({
        key: "needsHelp",
        label: "يحتاج مساعدة",
        value: filters.needsHelp ? "نعم" : "لا",
      });
    }

    if (filters.searchQuery) {
      activeFilters.push({
        key: "searchQuery",
        label: "البحث",
        value: filters.searchQuery,
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold text-blue-900">
            {totalResults.toLocaleString()} مرشح
          </div>
          <div className="text-sm text-blue-700">
            الصفحة {currentPage} من {totalPages}
          </div>
        </div>

        {/* Results per page info */}
        <div className="text-sm text-blue-600">
          {activeFilters.length} مرشح نشط
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div>
          <div className="text-sm font-medium text-blue-800 mb-2">
            المرشحات النشطة:
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter.key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-300 rounded-full text-sm"
              >
                <span className="font-medium text-blue-900">
                  {filter.label}:
                </span>
                <span className="text-blue-700">{filter.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-3 pt-3 border-t border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-900">{totalResults}</div>
            <div className="text-blue-600">إجمالي النتائج</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-900">{totalPages}</div>
            <div className="text-blue-600">عدد الصفحات</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-900">
              {activeFilters.length}
            </div>
            <div className="text-blue-600">مرشحات نشطة</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-900">
              {Math.round((totalResults / 1000) * 100) / 100}K
            </div>
            <div className="text-blue-600">معدل التطابق</div>
          </div>
        </div>
      </div>
    </div>
  );
}
