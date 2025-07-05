"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  Languages,
  Award,
  Car,
} from "lucide-react";
import React from "react";

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

interface Props {
  candidates: PagedResponse;
  loading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, direction: string) => void;
  currentSort: { by: string; direction: string };
}

export default function CandidateResultsTable({
  candidates,
  loading,
  onPageChange,
  onSortChange,
  currentSort,
}: Props) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (candidateId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (column: string) => {
    const newDirection =
      currentSort.by === column && currentSort.direction === "asc"
        ? "desc"
        : "asc";
    onSortChange(column, newDirection);
  };

  const getSortIcon = (column: string) => {
    if (currentSort.by !== column) {
      return <ChevronDown size={16} className="text-gray-400" />;
    }
    return currentSort.direction === "asc" ? (
      <ChevronUp size={16} className="text-blue-600" />
    ) : (
      <ChevronDown size={16} className="text-blue-600" />
    );
  };

  const formatPhoneNumber = (phone: string) => {
    // Format Israeli phone numbers
    if (phone.length === 10 && phone.startsWith("05")) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone;
  };

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

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  الاسم
                  {getSortIcon("name")}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("phone")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  الهاتف
                  {getSortIcon("phone")}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("city")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  المدينة
                  {getSortIcon("city")}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort("gender")}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  الجنس
                  {getSortIcon("gender")}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العبرية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التفاصيل
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.content.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {candidate.avatarUrl ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={candidate.avatarUrl}
                            alt={candidate.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {candidate.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mr-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone size={16} className="text-gray-400 ml-2" />
                      <a
                        href={`tel:${candidate.phone}`}
                        className="hover:text-blue-600"
                      >
                        {formatPhoneNumber(candidate.phone)}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={16} className="text-gray-400 ml-2" />
                      {candidate.cityName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        candidate.gender === "MALE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {candidate.gender === "MALE" ? "ذكر" : "أنثى"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        candidate.knowsHebrew
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {candidate.knowsHebrew ? "نعم" : "لا"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleRowExpansion(candidate.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                    >
                      {expandedRows.has(candidate.id) ? "إخفاء" : "عرض"}
                      {expandedRows.has(candidate.id) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRows.has(candidate.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award size={16} className="text-gray-600" />
                            <h4 className="font-medium text-gray-900">
                              المهارات
                            </h4>
                          </div>
                          {candidate.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {skillsMap[skill] || skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              لا توجد مهارات
                            </p>
                          )}
                        </div>

                        {/* Driver Licenses */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Car size={16} className="text-gray-600" />
                            <h4 className="font-medium text-gray-900">
                              رخص القيادة
                            </h4>
                          </div>
                          {candidate.driverLicenses.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {candidate.driverLicenses.map(
                                (license, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                                  >
                                    {license}
                                  </span>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">لا توجد رخص</p>
                          )}
                        </div>

                        {/* Languages */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Languages size={16} className="text-gray-600" />
                            <h4 className="font-medium text-gray-900">
                              اللغات
                            </h4>
                          </div>
                          {candidate.languages.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {candidate.languages.map((language, index) => (
                                <span
                                  key={index}
                                  className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                                >
                                  {language}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              لا توجد لغات
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">
                              يحتاج مساعدة:{" "}
                            </span>
                            <span
                              className={
                                candidate.needsHelp
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }
                            >
                              {candidate.needsHelp ? "نعم" : "لا"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              رقم المرشح:{" "}
                            </span>
                            <span className="text-gray-900">
                              #{candidate.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {candidates.totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => onPageChange(candidates.pageNumber - 1)}
                disabled={candidates.pageNumber === 0}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              <button
                onClick={() => onPageChange(candidates.pageNumber + 1)}
                disabled={candidates.last}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  عرض{" "}
                  <span className="font-medium">
                    {candidates.pageNumber * candidates.pageSize + 1}
                  </span>{" "}
                  إلى{" "}
                  <span className="font-medium">
                    {Math.min(
                      (candidates.pageNumber + 1) * candidates.pageSize,
                      candidates.totalElements
                    )}
                  </span>{" "}
                  من{" "}
                  <span className="font-medium">
                    {candidates.totalElements}
                  </span>
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => onPageChange(candidates.pageNumber - 1)}
                    disabled={candidates.pageNumber === 0}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">السابق</span>
                    <ChevronUp className="h-5 w-5 rotate-90" />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(Math.min(5, candidates.totalPages))].map(
                    (_, index) => {
                      const pageNum = Math.max(
                        0,
                        Math.min(
                          candidates.pageNumber - 2 + index,
                          candidates.totalPages - 1
                        )
                      );

                      if (pageNum < 0 || pageNum >= candidates.totalPages)
                        return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => onPageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNum === candidates.pageNumber
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={() => onPageChange(candidates.pageNumber + 1)}
                    disabled={candidates.last}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">التالي</span>
                    <ChevronUp className="h-5 w-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
